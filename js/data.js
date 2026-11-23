/*
 * Marlowby site data
 * ------------------------------------------------------------------
 * The twelve 2027 city boxes and the search index live here, so the
 * route page, city pages, and site search all read from one place.
 * To change a city, edit it here and every page updates.
 */
var MB = window.MB = window.MB || {};

MB.cities = [
  {
    slug: 'new-orleans', file: 'beignets.jpg', photo: '1668356852725-05a0ceb2b60e', photoAlt: 'A plate of beignets dusted with powdered sugar', credit: 'Keesha\'s Kitchen', creditId: '8V_W_mDO-60', n: '001', city: 'New Orleans', st: 'LA', month: 'January', season: 'winter', color: '#7a3b4a',
    lon: -90.07, lat: 29.95,
    theme: 'Brass bands, chicory, and a little sugar',
    finds: [
      ['Chicory coffee', 'Something to taste', 'A dark roast cut with roasted chicory root, the way the city has made coffee since the 1800s.'],
      ['Pecan pralines', 'Something sweet', 'Brown sugar, butter, and Louisiana pecans, cooled on wax paper.'],
      ['Creole seasoning', 'For the pantry', 'A small-batch spice blend for gumbo, red beans, and anything that needs a kick.'],
      ['Letterpress art', 'Something made', 'A second-line parade print pulled by hand in a neighborhood print shop.']
    ],
    story: [
      'New Orleans runs on rituals: a café au lait with chicory, a Sunday second line rolling past the porch, and a praline wrapped in wax paper at the corner store. Our first box starts here because few American cities wear their culture so openly.',
      'Box 001 pairs pantry staples from family kitchens with a print made a few blocks from Frenchmen Street. The field guide maps a walk from the Marigny to the Bywater and introduces the people who keep these traditions going.'
    ],
    walk: 'Faubourg Marigny to the Bywater, along the riverfront',
    sound: 'Second-line brass bands and traditional jazz'
  },
  {
    slug: 'detroit', file: 'cherries.jpg', photo: '1421494756418-72f0f89c6bfd', photoAlt: 'A basket of ripe red cherries', credit: 'Neha Deshmukh', creditId: 'GoKXJaQoLQs', n: '002', city: 'Detroit', st: 'MI', month: 'February', season: 'winter', color: '#3d4f5c',
    lon: -83.05, lat: 42.33,
    theme: 'Eastern Market and Motor City design',
    finds: [
      ['Hot sauce', 'Something to taste', 'A pepper sauce bottled by a Corktown cook who started at the Saturday market.'],
      ['Poppy seed cookies', 'Something sweet', 'A recipe carried over by the Polish bakeries of nearby Hamtramck.'],
      ['Tart cherry preserves', 'For the pantry', 'Made from Michigan tart cherries, the state’s signature fruit.'],
      ['Enamel pin', 'Something made', 'Motor City design history you can wear, from a local studio.']
    ],
    story: [
      'Detroit built the American car, and today its makers build just about everything else. Eastern Market, one of the oldest public markets in the country, still fills its sheds with growers and food makers every Saturday.',
      'This box leans into Michigan tart cherries, a Polish bakery tradition, and a design studio that turns the city’s industrial history into something you can wear.'
    ],
    walk: 'Eastern Market on a Saturday morning, then on to Corktown',
    sound: 'Motown classics and Detroit techno'
  },
  {
    slug: 'santa-fe', file: 'red-chiles.jpg', photo: '1602237514002-c2d8ae2da393', photoAlt: 'A pile of dried red chiles', credit: 'Abhishek Hajare', creditId: 'Ia40W5jhINA', n: '003', city: 'Santa Fe', st: 'NM', month: 'March', season: 'spring', color: '#a4502f',
    lon: -105.94, lat: 35.69,
    theme: 'Red chile and high-desert craft',
    finds: [
      ['Red chile', 'For the pantry', 'Sun-dried New Mexico chile, ground for sauces and stews.'],
      ['Piñon coffee', 'Something to taste', 'Coffee roasted with piñon, the pine nut of the high desert.'],
      ['Juniper candle', 'Something to keep', 'Hand-poured with the scent of juniper and desert sage.'],
      ['Hand-glazed coaster', 'Something made', 'Clay thrown and glazed by a potter just outside town.']
    ],
    story: [
      'At 7,000 feet, Santa Fe has a light that has drawn artists for a century. It is also the oldest state capital in the United States, with adobe streets that reward a slow afternoon.',
      'Red or green? This box answers “red,” with sun-dried chile, a piñon roast that smells like the hills after rain, and a coaster glazed by a local potter.'
    ],
    walk: 'Up Canyon Road’s galleries, ending at the Plaza',
    sound: 'New Mexico folk and Spanish guitar'
  },
  {
    slug: 'portland-me', file: 'blueberries.jpg', photo: '1594002348772-bc0cb57ade8b', photoAlt: 'A close-up of fresh blueberries', credit: 'Melissa Belanger', creditId: 'usE0kpV_yLo', n: '004', city: 'Portland', st: 'ME', month: 'April', season: 'spring', color: '#3f5e57',
    lon: -70.26, lat: 43.66,
    theme: 'A working waterfront in spring',
    finds: [
      ['Wild berry jam', 'For the pantry', 'Maine wild blueberries and raspberries, cooked in small batches.'],
      ['Maple candy', 'Something sweet', 'Pure maple sugar pressed into leaf-shaped molds.'],
      ['Smoked sea salt', 'Something to taste', 'Harvested from the Gulf of Maine and smoked over hardwood.'],
      ['Wool coasters', 'Something made', 'Woven from wool raised and spun in Maine.']
    ],
    story: [
      'Portland’s fishing boats still unload a short walk from cobblestone streets full of bakeries and wool shops. Spring is when the city shakes off winter and the maple season wraps up.',
      'Expect wild berries, sea salt smoked over local hardwood, and coasters woven from Maine wool.'
    ],
    walk: 'The Old Port wharves, then up Munjoy Hill for the view',
    sound: 'Coastal folk and fiddle'
  },
  {
    slug: 'asheville', file: 'honey.jpg', photo: '1679941279735-b3b35e8bc476', photoAlt: 'A jar of golden honey with spring blossoms', credit: 'Anita Austvika', creditId: 'JwTJ4t4aKPc', n: '005', city: 'Asheville', st: 'NC', month: 'May', season: 'spring', color: '#5b6b3a',
    lon: -82.55, lat: 35.60,
    theme: 'Blue Ridge ferments and pottery',
    finds: [
      ['Sourwood honey', 'For the pantry', 'A rare, buttery honey from the sourwood trees of the Blue Ridge.'],
      ['Apple butter', 'Something to taste', 'Mountain apples cooked down slowly until dark and spreadable.'],
      ['Stoneware mug', 'Something made', 'Thrown by hand in a riverside studio.'],
      ['Mountain chai', 'Something to taste', 'A loose-leaf blend from a local tea shop.']
    ],
    story: [
      'Tucked into the Blue Ridge Mountains, Asheville is a city of potters, beekeepers, and fermenters. Its River Arts District packs dozens of working studios into old warehouses by the water.',
      'Sourwood honey, a mountain specialty, anchors this box. It is joined by slow-cooked apple butter and a mug thrown by hand in one of those riverside studios.'
    ],
    walk: 'The River Arts District studios along the French Broad River',
    sound: 'Bluegrass and old-time string bands'
  },
  {
    slug: 'tucson', file: 'prickly-pear.jpg', photo: '1563422156298-c778a278f9a5', photoAlt: 'Ripe red prickly pear fruit on a cactus in Tucson', credit: 'Frankie Lopez', creditId: '9I0OzMrdqd0', n: '006', city: 'Tucson', st: 'AZ', month: 'June', season: 'summer', color: '#b5633a',
    lon: -110.97, lat: 32.22,
    theme: 'A Sonoran desert pantry',
    finds: [
      ['Prickly pear syrup', 'Something to taste', 'Bright pink syrup made from the fruit of the prickly pear cactus.'],
      ['Mesquite cookies', 'Something sweet', 'Baked with flour ground from mesquite pods.'],
      ['Chiltepin sauce', 'For the pantry', 'Made with the tiny wild chiltepin, a native desert pepper.'],
      ['Saguaro print', 'Something made', 'A screen print of the cactus that only grows in the Sonoran Desert.']
    ],
    story: [
      'Tucson was the first U.S. city named a UNESCO City of Gastronomy, thanks to a food history that stretches back thousands of years. Desert plants like mesquite, prickly pear, and the chiltepin pepper are still part of everyday cooking.',
      'This box is a taste of that pantry, plus a print of the saguaro, the giant cactus that defines the landscape.'
    ],
    walk: 'The adobe rowhouses of Barrio Viejo, then Fourth Avenue',
    sound: 'Mariachi and borderlands rock'
  },
  {
    slug: 'milwaukee', file: 'cheese-board.jpg', photo: '1700760933443-84ef4f5feac4', photoAlt: 'A cheese board with grapes and honeycomb', credit: 'Farhad Ibrahimzade', creditId: 'UQ50GwZLwX8', n: '007', city: 'Milwaukee', st: 'WI', month: 'July', season: 'summer', color: '#8a6a2e',
    lon: -87.91, lat: 43.04,
    theme: 'Lakefront summers and old-world craft',
    finds: [
      ['Aged cheddar crisps', 'Something to taste', 'Baked Wisconsin cheddar, aged for a sharp finish.'],
      ['Bratwurst spice', 'For the pantry', 'A family butcher’s blend for summer grilling.'],
      ['Tart cherry soda syrup', 'Something to taste', 'A small-batch soda syrup made with Door County cherries. Stir it into sparkling water.'],
      ['Lake Michigan print', 'Something made', 'Sailboats on the lake, printed by a Bay View studio.']
    ],
    story: [
      'Milwaukee summers are made for the lakefront, and the city’s German, Polish, and Serbian roots still show up at neighborhood butchers and bakeries.',
      'This box brings Wisconsin cheese, a family butcher’s spice blend, and cherry soda syrup from the city whose cream-colored bricks earned it the nickname “Cream City.”'
    ],
    walk: 'The Historic Third Ward, out to the Lake Michigan shore',
    sound: 'Summer festival rock and polka, side by side'
  },
  {
    slug: 'seattle', file: 'smoked-salmon.jpg', photo: '1546970361-407ddc8053fc', photoAlt: 'Smoked salmon on a wooden plank', credit: 'Janeris Marte', creditId: 'RbE7eW-C8oU', n: '008', city: 'Seattle', st: 'WA', month: 'August', season: 'summer', color: '#2f4b55',
    lon: -122.33, lat: 47.61,
    theme: 'Saltwater, cedar, and a strong cup',
    finds: [
      ['Dark roast coffee', 'Something to taste', 'Roasted in small batches a few blocks from the waterfront.'],
      ['Smoked salmon jerky', 'Something to taste', 'Pacific salmon smoked the traditional Northwest way.'],
      ['Cedar candle', 'Something to keep', 'Western red cedar and rain, poured by hand.'],
      ['Ferry print', 'Something made', 'The ferry ride across Puget Sound, in ink.']
    ],
    story: [
      'Seattle sits between saltwater and mountains, and its ferries, fish markets, and coffee roasters are part of daily life. August is the city at its sunniest.',
      'This box pairs a small-batch dark roast with salmon smoked the traditional Northwest way and a print of the ferry ride across Puget Sound.'
    ],
    walk: 'Ballard’s fishing docks and the locks at golden hour',
    sound: 'Indie rock, and the grunge that started here'
  },
  {
    slug: 'savannah', file: 'peaches.jpg', photo: '1692561796478-3c43d6656e42', photoAlt: 'A box of fresh peaches', credit: 'Ayla Meinberg', creditId: '9Hj_9qDLYVw', n: '009', city: 'Savannah', st: 'GA', month: 'September', season: 'fall', color: '#6d6a3a',
    lon: -81.09, lat: 32.08,
    theme: 'Live oaks, shady squares, and sweet tea',
    finds: [
      ['Benne wafers', 'Something sweet', 'Thin, crisp cookies made with sesame, a Lowcountry tradition.'],
      ['Peach preserves', 'For the pantry', 'Georgia peaches at the end of their season.'],
      ['Sweet tea syrup', 'Something to taste', 'Just add cold water and ice.'],
      ['Live oak print', 'Something made', 'A Savannah square under its live oaks, letterpress printed.']
    ],
    story: [
      'Savannah was laid out in 1733 around a grid of public squares, and many of them are still shaded by live oaks draped in Spanish moss. It is a city built for walking slowly.',
      'Benne wafers, a Lowcountry treat made with sesame seeds, lead this box alongside Georgia peaches and a syrup for the South’s favorite drink.'
    ],
    walk: 'Square to square through the Historic District to Forsyth Park',
    sound: 'Southern soul and front-porch jazz'
  },
  {
    slug: 'burlington', file: 'maple-pancakes.jpg', photo: '1604649414311-4fa144002b00', photoAlt: 'Pancakes with maple syrup and autumn acorns', credit: 'Tamas Pap', creditId: '-qdc4SU3K08', n: '010', city: 'Burlington', st: 'VT', month: 'October', season: 'fall', color: '#9a3f2c',
    lon: -73.21, lat: 44.48,
    theme: 'Peak foliage on Lake Champlain',
    finds: [
      ['Maple candy', 'Something sweet', 'Vermont maple sugar pressed into leaves.'],
      ['Cider apple butter', 'For the pantry', 'Fall apples cooked down in fresh cider.'],
      ['Cheddar bites', 'Something to taste', 'Sharp Vermont cheddar from a Champlain Valley creamery.'],
      ['Wool-wrapped camp mug', 'Something made', 'An enamel mug with a wool sleeve for cold mornings.']
    ],
    story: [
      'Vermont produces more maple syrup than any other state, and Burlington is where it meets a lively college-town food scene on the shore of Lake Champlain.',
      'October brings peak foliage and apple season. This box captures both, with cider-cooked apple butter, sharp cheddar, and maple candy pressed into leaves.'
    ],
    walk: 'Church Street Marketplace, then down to the waterfront bike path',
    sound: 'Jam bands and New England folk'
  },
  {
    slug: 'austin', file: 'brisket.jpg', photo: '1623174025518-b49000fb653d', photoAlt: 'Sliced smoked brisket on a cutting board', credit: 'Luis Santoyo', creditId: 'IePWXTF3-0Y', n: '011', city: 'Austin', st: 'TX', month: 'November', season: 'fall', color: '#8c4a2b',
    lon: -97.74, lat: 30.27,
    theme: 'Smoke, salsa, and live music',
    finds: [
      ['Brisket rub', 'For the pantry', 'Salt, pepper, and a little more, the Central Texas way.'],
      ['Tomatillo salsa', 'Something to taste', 'Roasted green salsa from a South Congress kitchen.'],
      ['Cowboy cookies', 'Something sweet', 'Oats, pecans, chocolate, and coconut in one cookie.'],
      ['Gig poster', 'Something made', 'A hand-pulled screen print from a music venue print shop.']
    ],
    story: [
      'Austin calls itself the Live Music Capital of the World, and on any night you can hear a band on a patio, in a dance hall, or in a record shop. The barbecue is taken just as seriously.',
      'This box brings the smoke with a brisket rub, the heat with a roasted salsa, and the music with a gig poster pulled by hand.'
    ],
    walk: 'South Congress at dusk, then the bat bridge over Lady Bird Lake',
    sound: 'Texas country, blues, and everything in between'
  },
  {
    slug: 'minneapolis', file: 'coffee-beans.jpg', photo: '1611888379005-6bbfae9cb745', photoAlt: 'Freshly roasted coffee beans on a white plate', credit: 'FlyD', creditId: '61PkFHKil1g', n: '012', city: 'Minneapolis', st: 'MN', month: 'December', season: 'winter', color: '#44536a',
    lon: -93.27, lat: 44.98,
    theme: 'Snow on the river and a warm kitchen',
    finds: [
      ['Wild rice', 'For the pantry', 'Hand-harvested wild rice, Minnesota’s official state grain.'],
      ['Lingonberry jam', 'Something to taste', 'A Scandinavian favorite, tart and bright.'],
      ['Cardamom bun mix', 'Something to bake', 'Everything you need for a snowy weekend morning.'],
      ['Felted wool coasters', 'Something made', 'Felted by hand in a riverside studio.']
    ],
    story: [
      'Minneapolis grew up around the flour mills on the Mississippi River, and its Scandinavian kitchens know how to make winter cozy.',
      'Our final box brings wild rice, lingonberry jam, and a cardamom bun mix for a snowy weekend. Full-route members also get a collector’s map of the year’s twelve stops.'
    ],
    walk: 'Across the Stone Arch Bridge to the Mill District',
    sound: 'The Minneapolis sound, from Prince to today'
  }
];

/* Plans and launch prices. Change a price here and every page updates. */
MB.plans = [
  { key: 'monthly', name: 'Monthly', tag: 'Try a city', boxes: 1, price: 45, billing: 'Billed each month' },
  { key: 'season', name: 'Seasonal', tag: 'Three cities', boxes: 3, price: 129, billing: 'Billed once for 3 boxes', featured: true },
  { key: 'route', name: 'Full Route', tag: 'All twelve', boxes: 12, price: 468, billing: 'Billed once for the year' }
];

/* Pages for site search: title, address, and the words people might search for. */
MB.pages = [
  { title: 'Home', url: 'index.html', text: 'Marlowby monthly subscription box one U.S. city each month local finds field guide independent makers New Orleans January 2027 waitlist', blurb: 'A curated monthly box featuring items from a different U.S. city, plus a printed field guide.' },
  { title: 'How It Works', url: 'how-it-works.html', text: 'shipping ships dietary allergies ingredients skip how it works pick your pace curator monthly schedule skip deadline ships arrives 15th field guide maker stories neighborhood walk playlist recipes', blurb: 'Four steps, the monthly schedule, the field guide, and shipping details.' },
  { title: 'The 2027 Route', url: 'route.html', text: 'route twelve cities map winter spring summer fall boxes calendar', blurb: 'All twelve 2027 cities on an interactive map, with a season filter.' },
  { title: 'Plans & Pricing', url: 'plans.html', text: 'plans pricing price cost monthly season full route annual gift subscription shipping included contiguous alaska hawaii compare skip cancel start month', blurb: 'Monthly, Seasonal, and Full Route plans, prices, a comparison table, and gifting.' },
  { title: 'For Local Makers', url: 'makers.html', text: 'makers small business partner wholesale paid 15 days independent locally owned 50 employees 500 2000 units nominate', blurb: 'Our standards for partner food makers and how a partnership works.' },
  { title: 'About Marlowby', url: 'about.html', text: 'about mission story values supporting local communities small businesses curators', blurb: 'Our story, our mission, and what we commit to.' },
  { title: 'Join the Waitlist', url: 'join.html', text: 'join waitlist sign up signup email founding members subscribe launch pricing', blurb: 'Join the founding waitlist for launch details and Box 001.' },
  { title: 'Works Cited', url: 'works-cited.html', text: 'works cited sources credits photos fonts AI team', blurb: 'Photography, fonts, sources, and team credits.' }
];
