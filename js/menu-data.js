/* =========================================================
   Shared product data — used by menu.html, order.html, home page
   ========================================================= */
const MENU_ITEMS = [
  { id: 'esp01', name: 'Classic Espresso', cat: 'coffee', price: 350, cal: 5, tag: 'Bestseller',
    desc: 'A concentrated shot pulled from our signature dark roast blend.',
    img: 'assets/menu/espresso.jpg' },
  { id: 'esp02', name: 'Caramel Macchiato', cat: 'coffee', price: 620, cal: 210, tag: 'Popular',
    desc: 'Steamed milk, vanilla syrup and espresso, finished with caramel drizzle.',
    img: 'assets/menu/macchiato.jpg' },
  { id: 'esp03', name: 'Flat White', cat: 'coffee', price: 550, cal: 170, tag: '',
    desc: 'Velvety micro-foam poured over a double ristretto shot.',
    img: 'assets/menu/flatwhite.jpg' },
  { id: 'esp04', name: 'Iced Americano', cat: 'coffee', price: 480, cal: 15, tag: 'Cold',
    desc: 'Bold espresso over ice, topped with chilled water for a crisp finish.',
    img: 'assets/menu/icedamericano.jpg' },
  { id: 'esp05', name: 'Mocha Freeze', cat: 'coffee', price: 690, cal: 320, tag: 'Cold',
    desc: 'Blended espresso, chocolate and ice crowned with whipped cream.',
    img: 'assets/menu/mochafreeze.jpg' },
  { id: 'esp06', name: 'Pour-Over Single Origin', cat: 'coffee', price: 590, cal: 5, tag: 'New',
    desc: 'Ethically sourced single-origin beans, hand-brewed to order.',
    img: 'assets/menu/pourover.jpg' },

  { id: 'tea02', name: 'Peach Iced Tea', cat: 'tea', price: 420, cal: 120, tag: 'Cold',
    desc: 'Black tea, fresh peach syrup, served chilled over ice.',
    img: 'assets/menu/peachtea.jpg' },
  { id: 'tea03', name: 'Matcha Latte', cat: 'tea', price: 590, cal: 190, tag: '',
    desc: 'Ceremonial-grade matcha whisked with steamed oat milk.',
    img: 'assets/menu/matchalatte.jpg' },

  { id: 'pas01', name: 'Butter Croissant', cat: 'bakery', price: 320, cal: 280, tag: '',
    desc: 'Flaky, laminated pastry baked fresh every morning.',
    img: 'assets/menu/croissant.jpg' },
  { id: 'pas02', name: 'Chocolate Chip Cookie', cat: 'bakery', price: 220, cal: 340, tag: 'Bestseller',
    desc: 'Thick, chewy cookie loaded with Belgian chocolate chunks.',
    img: 'assets/menu/cookie.jpg' },
  { id: 'pas03', name: 'Blueberry Muffin', cat: 'bakery', price: 290, cal: 310, tag: '',
    desc: 'Moist muffin studded with wild blueberries and a sugar crust.',
    img: 'assets/menu/muffin.jpg' },
  { id: 'pas04', name: 'New York Cheesecake', cat: 'bakery', price: 480, cal: 410, tag: 'New',
    desc: 'Creamy baked cheesecake on a buttery biscuit base.',
    img: 'assets/menu/cheesecake.jpg' },

  { id: 'snk01', name: 'Chicken Panini', cat: 'food', price: 750, cal: 480, tag: 'Popular',
    desc: 'Grilled chicken, mozzarella and pesto pressed between ciabatta.',
    img: 'assets/menu/panini.jpg' },
  { id: 'snk02', name: 'Avocado Toast', cat: 'food', price: 680, cal: 340, tag: 'New',
    desc: 'Smashed avocado, chili flakes and feta on toasted sourdough.',
    img: 'assets/menu/avocadotoast.jpg' },
  { id: 'snk03', name: 'Garden Wrap', cat: 'food', price: 590, cal: 260, tag: '',
    desc: 'Fresh greens, hummus and roasted vegetables in a spinach wrap.',
    img: 'assets/menu/gardenwrap.jpg' },
];

const CATEGORY_LABELS = {
  all: 'All Items', coffee: 'Coffee', tea: 'Tea & Matcha', bakery: 'Bakery', food: 'Food',
};
