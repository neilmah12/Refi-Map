// Edmonton Multifamily Sales Data
// Westmount / West Central submarket
// Coverage: 2019-03-01 to 2026-01-26
// Source: Gettel
//
// Fields:
//   address      - civic address
//   saleDate     - display string (e.g. "Jan 2026")
//   saleDateIso  - ISO date string for filtering (YYYY-MM-DD)
//   salePrice    - formatted string
//   totalUnits   - string (number of suites)
//   ppu          - price per unit, formatted string
//   capRate      - formatted string
//   yearBuilt    - string
//   buyer        - registered buyer entity
//   buyerDir     - buyer director/principal
//   seller       - registered seller entity
//   sellerDir    - seller director/principal
//   refiDate     - estimated mortgage maturity (5yr from sale)
//   monthsOut    - approximate months until refi from map build date
//   isRefi       - boolean; true = within ~18mo refi window at time of build
//   lat / lng    - WGS84 coordinates

const DATE_MIN = "2019-03-01";
const DATE_MAX = "2026-01-26";

const allProps = [
  {
    address: "10139 158 St",
    saleDate: "Jan 2026", saleDateIso: "2026-01-26",
    salePrice: "$7,074,000", totalUnits: "54", ppu: "$131,000", capRate: "6.1%",
    yearBuilt: "1983",
    buyer: "2716984 Alberta Ltd", buyerDir: "Richard Varadi",
    seller: "2016074 Alberta Ltd", sellerDir: "Aileen Jung",
    refiDate: "Jan 2031", monthsOut: "~57 months", isRefi: false,
    lat: 53.542522379915, lng: -113.59336852729
  },
  {
    address: "9748 149 St",
    saleDate: "Nov 2025", saleDateIso: "2025-11-26",
    salePrice: "$2,228,000", totalUnits: "17", ppu: "$131,059", capRate: "3.8%",
    yearBuilt: "1968",
    buyer: "Kairmar Inc", buyerDir: "Kariri Pawlina",
    seller: "Schmalz Holdings Ltd", sellerDir: "Michael Schmalz",
    refiDate: "Nov 2030", monthsOut: "~55 months", isRefi: false,
    lat: 53.535938311152, lng: -113.578514118483
  },
  {
    address: "10129 163 St",
    saleDate: "Nov 2025", saleDateIso: "2025-11-18",
    salePrice: "$9,884,000", totalUnits: "56", ppu: "$176,500", capRate: "5.5%",
    yearBuilt: "1970",
    buyer: "XS Properties One GP Inc", buyerDir: "Shane Unruh",
    seller: "BPCL Holdings Inc", sellerDir: "Sam Kolias",
    refiDate: "Nov 2030", monthsOut: "~55 months", isRefi: false,
    lat: 53.542545304421, lng: -113.602172878386
  },
  {
    address: "10144 154 St",
    saleDate: "Oct 2025", saleDateIso: "2025-10-23",
    salePrice: "$889,000", totalUnits: "7", ppu: "$127,000", capRate: "4.6%",
    yearBuilt: "1979",
    buyer: "2728122 Alberta Ltd", buyerDir: "Allen Cooper",
    seller: "1101527 Alberta Ltd", sellerDir: "Grigori Klymkiv",
    refiDate: "Oct 2030", monthsOut: "~54 months", isRefi: false,
    lat: 53.542736118446, lng: -113.587295503163
  },
  {
    address: "9612 156 St",
    saleDate: "Oct 2025", saleDateIso: "2025-10-23",
    salePrice: "$2,311,000", totalUnits: "18", ppu: "$128,389", capRate: "0.0%",
    yearBuilt: "1970",
    buyer: "2716984 Alberta Ltd", buyerDir: "Richard Varadi",
    seller: "749683 Alberta Ltd", sellerDir: "Jagtar Deol",
    refiDate: "Oct 2030", monthsOut: "~54 months", isRefi: false,
    lat: 53.533374789885, lng: -113.590827888619
  },
  {
    address: "10125 154 St",
    saleDate: "Oct 2025", saleDateIso: "2025-10-06",
    salePrice: "$765,000", totalUnits: "6", ppu: "$127,500", capRate: "4.3%",
    yearBuilt: "1964",
    buyer: "2703108 Alberta Ltd", buyerDir: "James Smith",
    seller: "2146824 Alberta Ltd", sellerDir: "Aye Myae",
    refiDate: "Oct 2030", monthsOut: "~53 months", isRefi: false,
    lat: 53.542598697144, lng: -113.586311300093
  },
  {
    address: "15616 100 Ave",
    saleDate: "Sep 2025", saleDateIso: "2025-09-19",
    salePrice: "$2,240,000", totalUnits: "14", ppu: "$160,000", capRate: "5.4%",
    yearBuilt: "1976",
    buyer: "Toniq Estates And Management Limited", buyerDir: "N/A",
    seller: "Triumph Properties Inc", sellerDir: "Rod Robertson",
    refiDate: "Sep 2030", monthsOut: "~53 months", isRefi: false,
    lat: 53.539498482616, lng: -113.591387464475
  },
  {
    address: "10131 159 St",
    saleDate: "Aug 2025", saleDateIso: "2025-08-08",
    salePrice: "$5,533,000", totalUnits: "43", ppu: "$128,674", capRate: "5.3%",
    yearBuilt: "1981",
    buyer: "Bannatyne Asset Management Inc", buyerDir: "Chase Allen",
    seller: "Cherie Jung Chiu", sellerDir: "N/A",
    refiDate: "Aug 2030", monthsOut: "~51 months", isRefi: false,
    lat: 53.542331691618, lng: -113.595138533784
  },
  {
    address: "10006 154 St",
    saleDate: "Jul 2025", saleDateIso: "2025-07-07",
    salePrice: "$730,000", totalUnits: "6", ppu: "$121,667", capRate: "4.4%",
    yearBuilt: "1961",
    buyer: "Zun Heng Huang", buyerDir: "N/A",
    seller: "1737036 Alberta Ltd", sellerDir: "Paul Gillanders",
    refiDate: "Jul 2030", monthsOut: "~50 months", isRefi: false,
    lat: 53.539569896431, lng: -113.587287875631
  },
  {
    address: "9610 149 St",
    saleDate: "Jul 2025", saleDateIso: "2025-07-04",
    salePrice: "$2,130,000", totalUnits: "15", ppu: "$142,000", capRate: "4.9%",
    yearBuilt: "1968",
    buyer: "2662395 Alberta Ltd", buyerDir: "Michael Volpov",
    seller: "956739 Alberta Ltd", sellerDir: "Rami Kemaleddine",
    refiDate: "Jul 2030", monthsOut: "~50 months", isRefi: false,
    lat: 53.533570088229, lng: -113.57846935912
  },
  {
    address: "9625 156 St",
    saleDate: "Jul 2025", saleDateIso: "2025-07-02",
    salePrice: "$2,850,000", totalUnits: "21", ppu: "$135,714", capRate: "6.6%",
    yearBuilt: "1969",
    buyer: "2676091 Alberta Ltd", buyerDir: "Lev Osipian",
    seller: "Kompass Investments Inc", sellerDir: "Vincent Rajakone",
    refiDate: "Jul 2030", monthsOut: "~50 months", isRefi: false,
    lat: 53.53378298857, lng: -113.589805631707
  },
  {
    address: "9740 149 St",
    saleDate: "Jun 2025", saleDateIso: "2025-06-02",
    salePrice: "$1,895,000", totalUnits: "15", ppu: "$126,333", capRate: "4.1%",
    yearBuilt: "1969",
    buyer: "Adom Real Estate Ltd", buyerDir: "Fred Ackah",
    seller: "Rene Wong", sellerDir: "N/A",
    refiDate: "Jun 2030", monthsOut: "~49 months", isRefi: false,
    lat: 53.535663594276, lng: -113.578552172323
  },
  {
    address: "10225 156 St",
    saleDate: "May 2025", saleDateIso: "2025-05-26",
    salePrice: "$1,548,000", totalUnits: "12", ppu: "$129,000", capRate: "5.2%",
    yearBuilt: "1976",
    buyer: "2662395 Alberta Ltd", buyerDir: "Michael Volpov",
    seller: "2119536 Alberta Ltd", sellerDir: "Fred Bosch",
    refiDate: "May 2030", monthsOut: "~49 months", isRefi: false,
    lat: 53.54408191682, lng: -113.589811079944
  },
  {
    address: "15723 102 Ave",
    saleDate: "Mar 2025", saleDateIso: "2025-03-24",
    salePrice: "$2,150,000", totalUnits: "14", ppu: "$153,571", capRate: "7.2%",
    yearBuilt: "1976",
    buyer: "2660248 Alberta Inc", buyerDir: "Norman Chan",
    seller: "Triple Crown Property Management Ltd", sellerDir: "Ahmed Ben Ahmed",
    refiDate: "Mar 2030", monthsOut: "~47 months", isRefi: false,
    lat: 53.543079399291, lng: -113.59336852729
  },
  {
    address: "10008 162 St",
    saleDate: "Feb 2025", saleDateIso: "2025-02-11",
    salePrice: "$1,950,000", totalUnits: "8", ppu: "$243,750", capRate: "5.4%",
    yearBuilt: "2024",
    buyer: "ANP Investments Ltd.", buyerDir: "Thi Phuong Dung Pham",
    seller: "Sogy Homes Ltd.", sellerDir: "Sunita Sogy",
    refiDate: "Feb 2030", monthsOut: "~45 months", isRefi: false,
    lat: 53.540327896114, lng: -113.600938078509
  },
  {
    address: "9640 156 St",
    saleDate: "Feb 2025", saleDateIso: "2025-02-11",
    salePrice: "$3,200,000", totalUnits: "24", ppu: "$133,333", capRate: "5.8%",
    yearBuilt: "1970",
    buyer: "2632604 Alberta Ltd", buyerDir: "Isnanik Viswanathan",
    seller: "Gala Apartments Ltd", sellerDir: "John Crocker",
    refiDate: "Feb 2030", monthsOut: "~45 months", isRefi: false,
    lat: 53.534267420664, lng: -113.590827888619
  },
  {
    address: "15525 103 Ave",
    saleDate: "Jan 2025", saleDateIso: "2025-01-25",
    salePrice: "$2,440,000", totalUnits: "20", ppu: "$122,000", capRate: "4.2%",
    yearBuilt: "1971",
    buyer: "Semiya Ivy Corp.", buyerDir: "Elias Ergas",
    seller: "The City of Edmonton Non-Profit Housing Corporation", sellerDir: "N/A",
    refiDate: "Jan 2030", monthsOut: "~45 months", isRefi: false,
    lat: 53.5445433825, lng: -113.58992490619
  },
  {
    address: "14903 102 Ave",
    saleDate: "Jan 2025", saleDateIso: "2025-01-23",
    salePrice: "$1,440,000", totalUnits: "12", ppu: "$120,000", capRate: "5.1%",
    yearBuilt: "1969",
    buyer: "2236077 Alberta Ltd", buyerDir: "Isnanik Viswanathan",
    seller: "Blue Ridge Financial Corp.", sellerDir: "Warren Bamber",
    refiDate: "Jan 2030", monthsOut: "~45 months", isRefi: false,
    lat: 53.543067916084, lng: -113.578537001078
  },
  {
    address: "15516 104 Ave",
    saleDate: "Oct 2024", saleDateIso: "2024-10-18",
    salePrice: "$1,585,000", totalUnits: "12", ppu: "$132,083", capRate: "0.0%",
    yearBuilt: "1970",
    buyer: "2601354 Alberta Ltd", buyerDir: "Parmeet Roopra",
    seller: "Harmani Sale Inc", sellerDir: "Manita Gill",
    refiDate: "Oct 2029", monthsOut: "~42 months", isRefi: false,
    lat: 53.546634709251, lng: -113.589851396899
  },
  {
    address: "10040 151 St",
    saleDate: "Oct 2024", saleDateIso: "2024-10-05",
    salePrice: "$1,515,000", totalUnits: "15", ppu: "$101,000", capRate: "6.2%",
    yearBuilt: "1969",
    buyer: "1306231 B.C. Ltd", buyerDir: "Magesh Chandren",
    seller: "Westside Place Apartments Ltd", sellerDir: "John Crocker",
    refiDate: "Oct 2029", monthsOut: "~41 months", isRefi: false,
    lat: 53.540317520285, lng: -113.582023621342
  },
  {
    address: "16210 103 Ave",
    saleDate: "Sep 2024", saleDateIso: "2024-09-19",
    salePrice: "$1,850,000", totalUnits: "8", ppu: "$231,250", capRate: "5.5%",
    yearBuilt: "2022",
    buyer: "Skylight Industries Ltd.", buyerDir: "Muhammed Khan",
    seller: "Pushp Nath", sellerDir: "N/A",
    refiDate: "Sep 2029", monthsOut: "~41 months", isRefi: false,
    lat: 53.54502550957, lng: -113.601472821832
  },
  {
    address: "9522 149 St",
    saleDate: "Jul 2024", saleDateIso: "2024-07-20",
    salePrice: "$2,360,000", totalUnits: "21", ppu: "$112,381", capRate: "5.8%",
    yearBuilt: "1968",
    buyer: "Hercules Properties GP Inc", buyerDir: "Triponas Geramanis",
    seller: "Sorrento Holdings Incorporated", sellerDir: "David Tassone",
    refiDate: "Jul 2029", monthsOut: "~39 months", isRefi: false,
    lat: 53.532363890452, lng: -113.578514118483
  },
  {
    address: "9230 149 St",
    saleDate: "Apr 2024", saleDateIso: "2024-04-19",
    salePrice: "$3,978,000", totalUnits: "36", ppu: "$110,500", capRate: "5.0%",
    yearBuilt: "1968",
    buyer: "1000510490 Ontario Inc.", buyerDir: "Abbas Esufali",
    seller: "El Prado Apartments Ltd", sellerDir: "John Crocker",
    refiDate: "Apr 2029", monthsOut: "~36 months", isRefi: false,
    lat: 53.527713820118, lng: -113.578537001078
  },
  {
    address: "9424 149 St",
    saleDate: "Apr 2024", saleDateIso: "2024-04-19",
    salePrice: "$4,068,000", totalUnits: "36", ppu: "$113,000", capRate: "5.2%",
    yearBuilt: "1967",
    buyer: "1000510490 Ontario Inc.", buyerDir: "Abbas Esufali",
    seller: "Spanish Villa Apartments Ltd", sellerDir: "John Crocker",
    refiDate: "Apr 2029", monthsOut: "~36 months", isRefi: false,
    lat: 53.530600002748, lng: -113.578550998857
  },
  {
    address: "15516 104 Ave",
    saleDate: "Apr 2024", saleDateIso: "2024-04-17",
    salePrice: "$913,000", totalUnits: "12", ppu: "$76,083", capRate: "0.0%",
    yearBuilt: "1970",
    buyer: "Harmani Sale Inc", buyerDir: "Manita Gill",
    seller: "1847828 Alberta Ltd", sellerDir: "Darcy Marler",
    refiDate: "Apr 2029", monthsOut: "~35 months", isRefi: false,
    lat: 53.546634709251, lng: -113.589851396899
  },
  {
    address: "10225 156 St",
    saleDate: "Apr 2024", saleDateIso: "2024-04-11",
    salePrice: "$1,260,000", totalUnits: "12", ppu: "$105,000", capRate: "5.0%",
    yearBuilt: "1971",
    buyer: "2561058 Alberta Ltd", buyerDir: "Jameson Labuguen",
    seller: "Triumph Properties Inc", sellerDir: "Rod Robertson",
    refiDate: "Apr 2029", monthsOut: "~35 months", isRefi: false,
    lat: 53.54408191682, lng: -113.589811079944
  },
  {
    address: "15404 100 Ave",
    saleDate: "Jan 2024", saleDateIso: "2024-01-18",
    salePrice: "$750,000", totalUnits: "6", ppu: "$125,000", capRate: "5.4%",
    yearBuilt: "1971",
    buyer: "Silver Crescent Holdings Ltd", buyerDir: "Hamze Younis",
    seller: "Kona 55 Development Corp.", sellerDir: "Dennis Bedard",
    refiDate: "Jan 2029", monthsOut: "~33 months", isRefi: false,
    lat: 53.539432517038, lng: -113.587287875631
  },
  {
    address: "10156 150 St",
    saleDate: "Dec 2023", saleDateIso: "2023-12-19",
    salePrice: "$999,000", totalUnits: "7", ppu: "$142,714", capRate: "3.2%",
    yearBuilt: "1977",
    buyer: "1426365 B.C. Ltd", buyerDir: "Harvinder Rehal",
    seller: "Terry Paranych Group Ltd", sellerDir: "Terry Paranych",
    refiDate: "Dec 2028", monthsOut: "~32 months", isRefi: false,
    lat: 53.542728407096, lng: -113.580276497444
  },
  {
    address: "10140 152 St",
    saleDate: "Nov 2023", saleDateIso: "2023-11-29",
    salePrice: "$1,150,000", totalUnits: "9", ppu: "$127,778", capRate: "4.8%",
    yearBuilt: "1969",
    buyer: "2520834 Alberta Inc", buyerDir: "Seifi Armando",
    seller: "927676 Alberta Ltd", sellerDir: "George Nokes",
    refiDate: "Nov 2028", monthsOut: "~31 months", isRefi: false,
    lat: 53.542610180351, lng: -113.583786000304
  },
  {
    address: "9030 149 St",
    saleDate: "Nov 2023", saleDateIso: "2023-11-29",
    salePrice: "$2,835,000", totalUnits: "21", ppu: "$135,000", capRate: "4.0%",
    yearBuilt: "1969",
    buyer: "2520834 Alberta Inc", buyerDir: "Seifi Armando",
    seller: "927676 Alberta Ltd", sellerDir: "George Nokes",
    refiDate: "Nov 2028", monthsOut: "~31 months", isRefi: false,
    lat: 53.524211819062, lng: -113.578397190933
  },
  {
    address: "10129 160 St",
    saleDate: "Nov 2023", saleDateIso: "2023-11-14",
    salePrice: "$4,586,871", totalUnits: "41", ppu: "$111,875", capRate: "4.8%",
    yearBuilt: "1982",
    buyer: "2513637 Alberta Ltd", buyerDir: "Darcy White",
    seller: "Cromwell Properties Ltd", sellerDir: "Neil Eccleston",
    refiDate: "Nov 2028", monthsOut: "~30 months", isRefi: false,
    lat: 53.542526193681, lng: -113.596916167809
  },
  {
    address: "9848 149 St",
    saleDate: "Nov 2023", saleDateIso: "2023-11-03",
    salePrice: "$1,425,000", totalUnits: "15", ppu: "$95,000", capRate: "5.6%",
    yearBuilt: "1970",
    buyer: "Hope Street Investments Ltd", buyerDir: "Shamon Kureshi",
    seller: "Cromwell Properties Ltd", sellerDir: "Neil Eccleston",
    refiDate: "Nov 2028", monthsOut: "~30 months", isRefi: false,
    lat: 53.537490807258, lng: -113.578552172323
  },
  {
    address: "9836 149 St",
    saleDate: "Nov 2023", saleDateIso: "2023-11-03",
    salePrice: "$1,425,000", totalUnits: "15", ppu: "$95,000", capRate: "5.8%",
    yearBuilt: "1968",
    buyer: "Hope Street Investments Ltd", buyerDir: "Shamon Kureshi",
    seller: "Cromwell Properties Ltd", sellerDir: "Neil Eccleston",
    refiDate: "Nov 2028", monthsOut: "~30 months", isRefi: false,
    lat: 53.536941499234, lng: -113.578552172323
  },
  {
    address: "10021 154 St",
    saleDate: "Oct 2023", saleDateIso: "2023-10-26",
    salePrice: "$950,000", totalUnits: "9", ppu: "$105,556", capRate: "0.0%",
    yearBuilt: "1964",
    buyer: "Silvia & Eric Menna", buyerDir: "N/A",
    seller: "Jimani Holdings Inc", sellerDir: "Samantha Foo",
    refiDate: "Oct 2028", monthsOut: "~30 months", isRefi: false,
    lat: 53.540016190866, lng: -113.586303672561
  },
  {
    address: "10128 158 St",
    saleDate: "Oct 2023", saleDateIso: "2023-10-13",
    salePrice: "$1,683,000", totalUnits: "17", ppu: "$99,000", capRate: "4.8%",
    yearBuilt: "1983",
    buyer: "Fasttrack Technologies Inc", buyerDir: "Surrey Kim",
    seller: "Marquis Capital Investments Ltd", sellerDir: "Jerry Poon",
    refiDate: "Oct 2028", monthsOut: "~29 months", isRefi: false,
    lat: 53.542263001922, lng: -113.594360441712
  },
  {
    address: "10125 157 St",
    saleDate: "Oct 2023", saleDateIso: "2023-10-13",
    salePrice: "$1,697,500", totalUnits: "14", ppu: "$121,250", capRate: "5.3%",
    yearBuilt: "1978",
    buyer: "Sympatico Developments Ltd", buyerDir: "John Oplanich",
    seller: "Amy Ma", sellerDir: "N/A",
    refiDate: "Oct 2028", monthsOut: "~29 months", isRefi: false,
    lat: 53.542263001922, lng: -113.591590893265
  },
  {
    address: "9625 156 St",
    saleDate: "Oct 2023", saleDateIso: "2023-10-11",
    salePrice: "$2,130,000", totalUnits: "21", ppu: "$101,429", capRate: "0.0%",
    yearBuilt: "1969",
    buyer: "Kompass Investments Inc", buyerDir: "Vincent Rajakone",
    seller: "Nevicia Holdings Ltd", sellerDir: "Neville Case",
    refiDate: "Oct 2028", monthsOut: "~29 months", isRefi: false,
    lat: 53.53378298857, lng: -113.589805631707
  },
  {
    address: "15430 100 Ave",
    saleDate: "Aug 2023", saleDateIso: "2023-08-28",
    salePrice: "$645,000", totalUnits: "6", ppu: "$107,500", capRate: "4.1%",
    yearBuilt: "1962",
    buyer: "Mausam Estates Corp.", buyerDir: "Vinaykumar Patel",
    seller: "Tsion & Kelly Anderson", sellerDir: "N/A",
    refiDate: "Aug 2028", monthsOut: "~28 months", isRefi: false,
    lat: 53.539436288895, lng: -113.588058507809
  },
  {
    address: "10008 153 St",
    saleDate: "Jun 2023", saleDateIso: "2023-06-14",
    salePrice: "$1,850,000", totalUnits: "17", ppu: "$108,824", capRate: "5.2%",
    yearBuilt: "1968",
    buyer: "Shelly Manor Inc", buyerDir: "Adam Merrett",
    seller: "Oak Ridge Asset Management Inc", sellerDir: "Conrad Langier",
    refiDate: "Jun 2028", monthsOut: "~25 months", isRefi: false,
    lat: 53.539707192005, lng: -113.585533124202
  },
  {
    address: "10116 154 St",
    saleDate: "May 2023", saleDateIso: "2023-05-19",
    salePrice: "$660,000", totalUnits: "8", ppu: "$82,500", capRate: "5.6%",
    yearBuilt: "1969",
    buyer: "2475133 Alberta Ltd", buyerDir: "Michael Lal",
    seller: "729127 Alberta Ltd", sellerDir: "Phylliz Lui",
    refiDate: "May 2028", monthsOut: "~25 months", isRefi: false,
    lat: 53.541915907311, lng: -113.587287875631
  },
  {
    address: "10048 154 St",
    saleDate: "Mar 2023", saleDateIso: "2023-03-17",
    salePrice: "$1,160,000", totalUnits: "12", ppu: "$96,667", capRate: "5.4%",
    yearBuilt: "1962",
    buyer: "Mausam Estates Corporation", buyerDir: "Vinaykumar Patel",
    seller: "1093277 B.C. Ltd", sellerDir: "Ervin Leung",
    refiDate: "Mar 2028", monthsOut: "~22 months", isRefi: false,
    lat: 53.540596009018, lng: -113.587287875631
  },
  {
    address: "10136 161 St",
    saleDate: "Jan 2023", saleDateIso: "2023-01-11",
    salePrice: "$3,100,000", totalUnits: "26", ppu: "$119,231", capRate: "5.3%",
    yearBuilt: "1981",
    buyer: "1306231 B.C. Ltd", buyerDir: "Magesh Chandren",
    seller: "1258607 Alberta Ltd", sellerDir: "Danesh Tebyanian",
    refiDate: "Jan 2028", monthsOut: "~20 months", isRefi: false,
    lat: 53.542472800958, lng: -113.599685716256
  },
  {
    address: "10140 156 St",
    saleDate: "Dec 2022", saleDateIso: "2022-12-03",
    salePrice: "$2,500,000", totalUnits: "21", ppu: "$119,048", capRate: "5.2%",
    yearBuilt: "1969",
    buyer: "Ecoconnect Equities Inc", buyerDir: "N/A",
    seller: "Triumph Properties Inc", sellerDir: "Rod Robertson",
    refiDate: "Dec 2027", monthsOut: "~19 months", isRefi: false,
    lat: 53.542739890303, lng: -113.59083559997
  },
  {
    address: "10236 156 St",
    saleDate: "Aug 2022", saleDateIso: "2022-08-18",
    salePrice: "$882,000", totalUnits: "9", ppu: "$98,000", capRate: "4.5%",
    yearBuilt: "1963",
    buyer: "Fasttrack Technologies Inc", buyerDir: "Trevor Kourizin",
    seller: "Citycasa Ventures Inc", sellerDir: "Fernando Araujo",
    refiDate: "Aug 2027", monthsOut: "~15 months", isRefi: true,
    lat: 53.544391586233, lng: -113.590827888619
  },
  {
    address: "9821 156 St",
    saleDate: "Aug 2022", saleDateIso: "2022-08-10",
    salePrice: "$1,405,000", totalUnits: "15", ppu: "$93,667", capRate: "6.4%",
    yearBuilt: "1978",
    buyer: "Miknina Enterprises Ltd", buyerDir: "Greg Uhryn",
    seller: "Gary Bruce Edmonds", sellerDir: "N/A",
    refiDate: "Aug 2027", monthsOut: "~15 months", isRefi: true,
    lat: 53.536952982441, lng: -113.589798004175
  },
  {
    address: "10141 162 St",
    saleDate: "Jul 2022", saleDateIso: "2022-07-05",
    salePrice: "$4,875,000", totalUnits: "44", ppu: "$110,795", capRate: "4.4%",
    yearBuilt: "1982",
    buyer: "Stony44 GP Inc", buyerDir: "Jeff Mayhew",
    seller: "857553 Alberta Ltd", sellerDir: "Raymond Trang",
    refiDate: "Jul 2027", monthsOut: "~14 months", isRefi: true,
    lat: 53.542743704069, lng: -113.600463892147
  },
  {
    address: "16316 106A Ave",
    saleDate: "May 2022", saleDateIso: "2022-05-30",
    salePrice: "$5,513,785", totalUnits: "46", ppu: "$119,865", capRate: "0.0%",
    yearBuilt: "1964",
    buyer: "Mainstreet Equity Corp.", buyerDir: "Navjeet Dhillon",
    seller: "1241172 Alberta Ltd", sellerDir: "Jasvinder Sahota",
    refiDate: "May 2027", monthsOut: "~13 months", isRefi: true,
    lat: 53.550930015534, lng: -113.604708990829
  },
  {
    address: "15723 102 Ave",
    saleDate: "Jan 2022", saleDateIso: "2022-01-22",
    salePrice: "$1,350,000", totalUnits: "14", ppu: "$96,429", capRate: "7.6%",
    yearBuilt: "1976",
    buyer: "Surewealth Holdings Inc", buyerDir: "Fathi Elloumi",
    seller: "Vantage Wealth Group Inc", sellerDir: "Mark Onaba",
    refiDate: "Jan 2027", monthsOut: "~9 months", isRefi: false,
    lat: 53.543079399291, lng: -113.59336852729
  },
  {
    address: "9505 165 St",
    saleDate: "Nov 2021", saleDateIso: "2021-11-20",
    salePrice: "$6,370,000", totalUnits: "52", ppu: "$122,500", capRate: "6.1%",
    yearBuilt: "1975",
    buyer: "2359998 Alberta Ltd", buyerDir: "Benjamin Yu",
    seller: "Triumph Properties Inc", sellerDir: "Rod Robertson",
    refiDate: "Nov 2026", monthsOut: "~7 months", isRefi: false,
    lat: 53.532065285152, lng: -113.606765574593
  },
  {
    address: "10019 152 St",
    saleDate: "Oct 2021", saleDateIso: "2021-10-20",
    salePrice: "$2,050,000", totalUnits: "24", ppu: "$85,417", capRate: "5.2%",
    yearBuilt: "1965",
    buyer: "Lafrance Investments Inc", buyerDir: "Jesse Lafrance",
    seller: "125748 Alberta Ltd", sellerDir: "Randy Madsen",
    refiDate: "Oct 2026", monthsOut: "~6 months", isRefi: false,
    lat: 53.539874997707, lng: -113.582794169701
  },
  {
    address: "10021 154 St",
    saleDate: "Jul 2021", saleDateIso: "2021-07-29",
    salePrice: "$651,000", totalUnits: "9", ppu: "$72,333", capRate: "0.0%",
    yearBuilt: "1964",
    buyer: "Jimani Holdings Inc", buyerDir: "Justin Foo",
    seller: "Vantage Wealth Group Inc", sellerDir: "Mark Onaba",
    refiDate: "Jul 2026", monthsOut: "~3 months", isRefi: false,
    lat: 53.540016190866, lng: -113.586303672561
  },
  {
    address: "10010 154 St",
    saleDate: "Jun 2021", saleDateIso: "2021-06-10",
    salePrice: "$680,000", totalUnits: "6", ppu: "$113,333", capRate: "4.8%",
    yearBuilt: "1964",
    buyer: "Maria De Lurdes Alcantara", buyerDir: "N/A",
    seller: "Legacy Value Capital Inc", sellerDir: "Faraz Siddiqi",
    refiDate: "Jun 2026", monthsOut: "~1 months", isRefi: false,
    lat: 53.539707192005, lng: -113.587287875631
  },
  {
    address: "15304 100 Ave",
    saleDate: "Mar 2021", saleDateIso: "2021-03-18",
    salePrice: "$1,380,000", totalUnits: "17", ppu: "$81,176", capRate: "5.1%",
    yearBuilt: "1968",
    buyer: "Oak Ridge Assest Management Inc", buyerDir: "Conrad Langier",
    seller: "Ruth Pakes", sellerDir: "N/A",
    refiDate: "Mar 2026", monthsOut: "~-2 months", isRefi: false,
    lat: 53.539500410454, lng: -113.585399768122
  },
  {
    address: "9712 149 St",
    saleDate: "Mar 2021", saleDateIso: "2021-03-03",
    salePrice: "$1,680,000", totalUnits: "18", ppu: "$93,333", capRate: "5.8%",
    yearBuilt: "1967",
    buyer: "Oak Ridge Asset Management Inc", buyerDir: "Conrad Langier",
    seller: "1712350 Alberta Ltd", sellerDir: "Lee Weaver Tyrrell",
    refiDate: "Mar 2026", monthsOut: "~-2 months", isRefi: false,
    lat: 53.534980804443, lng: -113.578552172323
  },
  {
    address: "15803 102 Ave",
    saleDate: "Feb 2021", saleDateIso: "2021-02-03",
    salePrice: "$2,055,000", totalUnits: "19", ppu: "$108,158", capRate: "6.5%",
    yearBuilt: "1978",
    buyer: "1469479 Alberta Ltd", buyerDir: "Kit Poon",
    seller: "1184825 Alberta Ltd", sellerDir: "Earl Minichiello",
    refiDate: "Feb 2026", monthsOut: "~-3 months", isRefi: false,
    lat: 53.543083213057, lng: -113.594367985425
  },
  {
    address: "10121 162 St",
    saleDate: "Dec 2020", saleDateIso: "2020-12-21",
    salePrice: "$2,557,953", totalUnits: "27", ppu: "$94,739", capRate: "0.0%",
    yearBuilt: "1980",
    buyer: "Bannatyne Asset Management Inc.", buyerDir: "Chase Allen",
    seller: "Cypress Hills Management Corp.", sellerDir: "Lyle Mortimer",
    refiDate: "Dec 2025", monthsOut: "~-4 months", isRefi: false,
    lat: 53.542129520114, lng: -113.600463892147
  },
  {
    address: "10048 154 St",
    saleDate: "Feb 2020", saleDateIso: "2020-02-13",
    salePrice: "$1,150,000", totalUnits: "12", ppu: "$95,833", capRate: "6.0%",
    yearBuilt: "1962",
    buyer: "1093277 B.C. Ltd", buyerDir: "Ervin Leung",
    seller: "PGX Ventures Inc", sellerDir: "Kelvin Gieck",
    refiDate: "Feb 2025", monthsOut: "~-15 months", isRefi: false,
    lat: 53.540596009018, lng: -113.587287875631
  },
  {
    address: "10010 154 St",
    saleDate: "Feb 2020", saleDateIso: "2020-02-03",
    salePrice: "$558,000", totalUnits: "6", ppu: "$93,000", capRate: "6.6%",
    yearBuilt: "1964",
    buyer: "Legacy Value Capital Inc", buyerDir: "Faraz Siddiqi",
    seller: "PGX Ventures Inc", sellerDir: "Kelvin Gieck",
    refiDate: "Feb 2025", monthsOut: "~-15 months", isRefi: false,
    lat: 53.539707192005, lng: -113.587287875631
  },
  {
    address: "15525 103 Ave",
    saleDate: "Jan 2020", saleDateIso: "2020-01-16",
    salePrice: "$2,350,000", totalUnits: "20", ppu: "$117,500", capRate: "6.3%",
    yearBuilt: "1971",
    buyer: "The City of Edmonton Non-Profit Housing Corporation", buyerDir: "N/A",
    seller: "Triumph Properties Inc", sellerDir: "Rod Robertson",
    refiDate: "Jan 2025", monthsOut: "~-16 months", isRefi: false,
    lat: 53.5445433825, lng: -113.58992490619
  },
  {
    address: "10131 154 St",
    saleDate: "Nov 2019", saleDateIso: "2019-11-29",
    salePrice: "$3,170,135", totalUnits: "28", ppu: "$113,219", capRate: "0.0%",
    yearBuilt: "1966",
    buyer: "McLeod Rental Communities GP Ltd", buyerDir: "Robert McLeod",
    seller: "Shivani Bobal", sellerDir: "N/A",
    refiDate: "Nov 2024", monthsOut: "~-17 months", isRefi: false,
    lat: 53.542951994363, lng: -113.58616696372
  },
  {
    address: "9560/70 163 St",
    saleDate: "Oct 2019", saleDateIso: "2019-10-25",
    salePrice: "$8,535,000", totalUnits: "60", ppu: "$142,250", capRate: "5.5%",
    yearBuilt: "1968",
    buyer: "Westgate Partners GP Ltd", buyerDir: "Scott Mason",
    seller: "1507811 Alberta Ltd", sellerDir: "AJ Slivinski",
    refiDate: "Oct 2024", monthsOut: "~-18 months", isRefi: false,
    lat: 53.533485389097, lng: -113.603561424466
  },
  {
    address: "9910 156 St",
    saleDate: "Sep 2019", saleDateIso: "2019-09-11",
    salePrice: "$1,830,000", totalUnits: "15", ppu: "$122,000", capRate: "6.0%",
    yearBuilt: "1972",
    buyer: "10000988 Manitoba Ltd", buyerDir: "Wesley Siemens",
    seller: "Triumph Properties Inc", sellerDir: "Rod Robertson",
    refiDate: "Sep 2024", monthsOut: "~-20 months", isRefi: false,
    lat: 53.537735014007, lng: -113.590850771214
  },
  {
    address: "14926 102 Ave",
    saleDate: "Jul 2019", saleDateIso: "2019-07-15",
    salePrice: "$612,000", totalUnits: "6", ppu: "$102,000", capRate: "6.3%",
    yearBuilt: "1960",
    buyer: "Philfam Holdings Ltd", buyerDir: "Todd Phillips",
    seller: "Vedran Jakovljevic", sellerDir: "N/A",
    refiDate: "Jul 2024", monthsOut: "~-22 months", isRefi: false,
    lat: 53.543579086449, lng: -113.579299921905
  },
  {
    address: "14904 96 Ave",
    saleDate: "May 2019", saleDateIso: "2019-05-08",
    salePrice: "$1,742,500", totalUnits: "15", ppu: "$116,167", capRate: "5.6%",
    yearBuilt: "1966",
    buyer: "Boulevard Real Estate Equities Ltd", buyerDir: "Carl Diodati",
    seller: "Gill Apartments Ltd", sellerDir: "Gurinder Gill",
    refiDate: "May 2024", monthsOut: "~-24 months", isRefi: false,
    lat: 53.533298514566, lng: -113.578537001078
  },
  {
    address: "10159 155 St",
    saleDate: "May 2019", saleDateIso: "2019-05-08",
    salePrice: "$1,620,000", totalUnits: "12", ppu: "$135,000", capRate: "6.0%",
    yearBuilt: "1970",
    buyer: "Boulevard Real Estate Equities Ltd", buyerDir: "Carl Diodati",
    seller: "Gill Apartments Ltd", sellerDir: "Gurinder Gill",
    refiDate: "May 2024", monthsOut: "~-24 months", isRefi: false,
    lat: 53.543079399291, lng: -113.588073679054
  },
  {
    address: "10139 155 St",
    saleDate: "May 2019", saleDateIso: "2019-05-08",
    salePrice: "$2,835,000", totalUnits: "21", ppu: "$135,000", capRate: "6.3%",
    yearBuilt: "1968",
    buyer: "Boulevard Real Estate Equities Ltd", buyerDir: "Carl Diodati",
    seller: "Gill Apartments Ltd", sellerDir: "Gurinder Gill",
    refiDate: "May 2024", monthsOut: "~-24 months", isRefi: false,
    lat: 53.542477411005, lng: -113.588180296863
  },
  {
    address: "10125 154 St",
    saleDate: "Mar 2019", saleDateIso: "2019-03-15",
    salePrice: "$690,000", totalUnits: "6", ppu: "$115,000", capRate: "5.3%",
    yearBuilt: "1964",
    buyer: "2146724 Alberta Ltd", buyerDir: "Aye Myae",
    seller: "Temo & Elena Surmava", sellerDir: "N/A",
    refiDate: "Mar 2024", monthsOut: "~-26 months", isRefi: false,
    lat: 53.542598697144, lng: -113.586311300093
  },
  {
    address: "15605 98 Ave",
    saleDate: "Mar 2019", saleDateIso: "2019-03-01",
    salePrice: "$1,062,000", totalUnits: "12", ppu: "$88,500", capRate: "3.7%",
    yearBuilt: "1969",
    buyer: "Miknina Enterprises Ltd", buyerDir: "Gregory Uhryn",
    seller: "1879792 Alberta Ltd", sellerDir: "Colleen Van Keulen",
    refiDate: "Mar 2024", monthsOut: "~-26 months", isRefi: false,
    lat: 53.535953482397, lng: -113.590827888619
  },
  {
    address: "9720 156 St",
    saleDate: "Mar 2019", saleDateIso: "2019-03-01",
    salePrice: "$1,080,000", totalUnits: "12", ppu: "$90,000", capRate: "6.0%",
    yearBuilt: "1971",
    buyer: "Miknina Enterprises Ltd", buyerDir: "Gregory Uhryn",
    seller: "1879792 Alberta Ltd", sellerDir: "Colleen Van Keulen",
    refiDate: "Mar 2024", monthsOut: "~-26 months", isRefi: false,
    lat: 53.535266920708, lng: -113.590827888619
  }
];
