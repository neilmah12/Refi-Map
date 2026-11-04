/**
 * draw-filter.js
 * Standalone rectangle + polygon "filter by drawn area" tool for Leaflet.
 * Pure Leaflet (1.x), no leaflet-draw plugin. Extracted from the Refi Map.
 *
 * Usage:
 *   const drawFilter = createDrawFilter(map, {
 *     onChange: () => renderMyList()      // called when a shape is committed or cleared
 *   });
 *
 *   // inside your filtering pipeline:
 *   rows = rows.filter(r => drawFilter.contains(r.lat, r.lng));
 *
 * API:
 *   drawFilter.contains(lat, lng)  -> true if no shape drawn, else point-in-shape
 *   drawFilter.isActive()          -> boolean
 *   drawFilter.clear()             -> remove shape, fire onChange
 *   drawFilter.getShape()          -> { type, layer } | null
 *
 * Interaction:
 *   Rectangle button: press, drag, release.
 *   Polygon button:   click vertices, double-click to close (last click counts as a vertex).
 *   Escape cancels an in-progress draw. X button clears the committed shape.
 */
function createDrawFilter(map, opts) {
  opts = opts || {};
  const style    = opts.style    || { color: '#4a9eff', weight: 2, fillOpacity: 0.08 };
  const onChange = opts.onChange || function () {};
  const position = opts.position || 'bottomright';

  let mode = null;          // 'rectangle' | 'polygon' | null
  let committed = null;     // { type, layer }
  let polyVerts = [], polyPreview = null;
  let rectStart = null, rectPreview = null;
  let btnRect, btnPoly, btnClear;

  // ── Control (3 stacked buttons) ──
  const ctrl = L.control({ position });
  ctrl.onAdd = function () {
    const c = L.DomUtil.create('div', 'leaflet-bar leaflet-control draw-ctrl');
    c.innerHTML =
      '<a href="#" data-b="rect"  title="Draw rectangle to filter by area">&#9645;</a>' +
      '<a href="#" data-b="poly"  title="Draw polygon to filter by area">&#11039;</a>' +
      '<a href="#" data-b="clear" title="Clear drawn filter" style="display:none;color:#e67e00;">&#10005;</a>';
    L.DomEvent.disableClickPropagation(c);
    btnRect  = c.querySelector('[data-b=rect]');
    btnPoly  = c.querySelector('[data-b=poly]');
    btnClear = c.querySelector('[data-b=clear]');
    btnRect.addEventListener('click',  e => { e.preventDefault(); mode === 'rectangle' ? exit() : enter('rectangle'); });
    btnPoly.addEventListener('click',  e => { e.preventDefault(); mode === 'polygon'   ? exit() : enter('polygon'); });
    btnClear.addEventListener('click', e => { e.preventDefault(); clear(); });
    return c;
  };
  ctrl.addTo(map);

  // Minimal CSS so it works without the host page's stylesheet
  if (!document.getElementById('draw-filter-css')) {
    const s = document.createElement('style');
    s.id = 'draw-filter-css';
    s.textContent =
      '.draw-ctrl a{display:flex;align-items:center;justify-content:center;width:30px;height:30px;' +
      'font-size:17px;text-decoration:none;color:#444;background:#fff;border-bottom:1px solid #ccc}' +
      '.draw-ctrl a:last-child{border-bottom:none}' +
      '.draw-ctrl a:hover{background:#f4f4f4;color:#4a9eff}' +
      '.draw-ctrl a.active{color:#4a9eff;background:#eaf3ff}';
    document.head.appendChild(s);
  }

  // ── Mode handling ──
  function enter(m) {
    exit(false);
    mode = m;
    map.getContainer().style.cursor = 'crosshair';
    map.dragging.disable();
    btnRect.classList.toggle('active', m === 'rectangle');
    btnPoly.classList.toggle('active', m === 'polygon');
    if (m === 'rectangle') {
      map.once('mousedown', rectStartFn);
    } else {
      map.doubleClickZoom.disable();
      map.on('click', polyClick);
      map.on('dblclick', polyFinish);
    }
  }

  function exit(restore) {
    if (restore !== false) {
      map.getContainer().style.cursor = '';
      map.dragging.enable();
      map.doubleClickZoom.enable();
    }
    mode = null;
    map.off('mousedown', rectStartFn);
    map.off('mousemove', rectMove);
    map.off('mouseup',   rectEnd);
    map.off('click',     polyClick);
    map.off('dblclick',  polyFinish);
    if (rectPreview) { map.removeLayer(rectPreview); rectPreview = null; }
    if (polyPreview) { map.removeLayer(polyPreview); polyPreview = null; }
    polyVerts = []; rectStart = null;
    if (btnRect) btnRect.classList.remove('active');
    if (btnPoly) btnPoly.classList.remove('active');
  }

  document.addEventListener('keydown', e => { if (e.key === 'Escape' && mode) exit(); });

  function commit(layer, type) {
    if (committed) map.removeLayer(committed.layer);
    committed = { type, layer };
    btnClear.style.display = '';
    map.getContainer().style.cursor = '';
    map.dragging.enable();
    map.doubleClickZoom.enable();
    onChange();
  }

  function clear() {
    exit();
    if (committed) { map.removeLayer(committed.layer); committed = null; }
    btnClear.style.display = 'none';
    onChange();
  }

  // ── Rectangle ──
  function rectStartFn(e) {
    rectStart = e.latlng;
    map.on('mousemove', rectMove);
    map.on('mouseup',   rectEnd);
  }
  function rectMove(e) {
    if (!rectStart) return;
    if (rectPreview) map.removeLayer(rectPreview);
    rectPreview = L.rectangle([rectStart, e.latlng], style).addTo(map);
  }
  function rectEnd() {
    map.off('mousemove', rectMove);
    map.off('mouseup',   rectEnd);
    if (!rectStart || !rectPreview) return;
    const shape = rectPreview; rectPreview = null;
    exit();
    commit(shape, 'rectangle');
  }

  // ── Polygon ──
  function polyClick(e) {
    polyVerts.push(e.latlng);
    if (polyPreview) map.removeLayer(polyPreview);
    if (polyVerts.length >= 2)
      polyPreview = L.polyline(polyVerts, { color: style.color, weight: style.weight, dashArray: '5 4' }).addTo(map);
  }
  function polyFinish() {
    // dblclick fires after two clicks at the same spot -> drop the duplicate vertex
    if (polyVerts.length >= 2) polyVerts.pop();
    if (polyVerts.length < 3) { exit(); return; }
    if (polyPreview) { map.removeLayer(polyPreview); polyPreview = null; }
    const shape = L.polygon(polyVerts, style).addTo(map);
    polyVerts = [];
    exit();
    commit(shape, 'polygon');
  }

  // ── Point-in-shape (ray casting; x = lat, y = lng) ──
  function raycast(lat, lng, poly) {
    let inside = false;
    for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
      const xi = poly[i].lat, yi = poly[i].lng;
      const xj = poly[j].lat, yj = poly[j].lng;
      if (((yi > lng) !== (yj > lng)) &&
          (lat < (xj - xi) * (lng - yi) / (yj - yi) + xi)) inside = !inside;
    }
    return inside;
  }

  function contains(lat, lng) {
    if (!committed) return true;
    if (lat == null || lng == null) return false;
    if (committed.type === 'rectangle') return committed.layer.getBounds().contains([lat, lng]);
    return raycast(lat, lng, committed.layer.getLatLngs()[0]);
  }

  return { contains, clear, isActive: () => !!committed, getShape: () => committed };
}
