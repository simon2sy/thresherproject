/**
 * ---------------------------------------------------------------------------
 * THRESHER PRODUCT CATALOGUE
 * ---------------------------------------------------------------------------
 * PLACEHOLDER DATA. Every machine, figure and specification below is an
 * example used to design and demonstrate the site. Replace the values with
 * verified machine data before publishing.
 *
 * Because every component reads from this file, replacing a product means
 * editing one object here — no markup changes are required anywhere else.
 *
 * Field reference
 *   id / slug ........ stable identifiers used in URLs and 3D state
 *   code ............. model designation shown in technical labels
 *   name ............. marketing name
 *   short / summary .. card + list copy
 *   price ............ fixed price shown on cards, detail pages and in search data
 *   imagery .......... { hero, card, gallery[] } — photos live in
 *                      `public/images/products/`
 *   features ......... bullet highlights ("what it does")
 *   specs ............ the simple specification table, in display order.
 *                      Keep it simple: no power or capacity figures.
 *   crops ............ machine-compatible crops (also used for list filtering)
 *   applications ..... where the machine is normally used
 *   accessories ...... optional equipment available with the machine
 */

export const SAMPLE_NOTICE =
  'Sample specification — shown for illustration. Confirm the details of the machine you intend to buy.'

export const products = [
  {
    id: 'p1',
    slug: 'sam-1000-heavy-duty-grain-thresher',
    code: 'SAM-1000',
    name: 'Heavy-Duty Grain Thresher',
    category: 'Heavy-duty',
    badge: 'Largest frame',
    price: 'Rs. 360,000',
    short:
      'A large-frame thresher for commercial farms, cooperatives and custom hiring work.',
    summary:
      'The SAM-1000 is our largest frame. Built around a wide threshing drum and a heavy belt drive, it is intended for long working days during peak harvest, when machine downtime costs the most.',
    features: [
      'Wide threshing drum built for long working days',
      'Heavy-duty belt drive with guarded pulleys',
      'Reinforced chassis with transport wheels',
      'Adjustable sieve set for rice, wheat and maize',
      'Straightforward access for daily cleaning and belt adjustment',
    ],
    imagery: {
      hero: '/images/products/thresher1.jpeg',
      card: '/images/products/thresher1.jpeg',
      gallery: ['/images/products/thresher1.jpeg', '/images/products/thresher2.jpeg'],
    },
    specs: [
      { label: 'Machine type', value: 'Heavy-duty multi-crop thresher (sample)' },
      { label: 'Operating speed', value: '750 RPM' },
      { label: 'Threshing drum', value: 'Rasp-bar drum, 600 mm width (sample)' },
      { label: 'Drive', value: 'V-belt drive with steel pulley guard' },
      { label: 'Compatible crops', value: 'Paddy, wheat, maize (shelled), millet, mustard' },
      { label: 'Construction', value: 'Heavy-duty steel frame, sheet metal covers' },
      { label: 'Dimensions (L × W × H)', value: '2200 × 1150 × 1450 mm (sample)' },
      { label: 'Approximate weight', value: '420 kg (sample)' },
      { label: 'Cleaning system', value: 'Blower fan with adjustable air gate' },
      { label: 'Outlets', value: 'Grain outlet + straw outlet' },
      { label: 'Warranty', value: '1 year against manufacturing defects' },
    ],
    crops: ['Paddy / Rice', 'Wheat', 'Maize', 'Millet', 'Mustard'],
    applications: [
      'Commercial farms harvesting large areas in a single season',
      'Cooperative and custom-hiring operators threshing for multiple households',
      'Seed and grain traders cleaning harvested material at purchase points',
    ],
    accessories: [
      'Spare sieve / screen set for alternate crops',
      'Additional v-belt and pulley set',
      'Bagging chute extension for grain sacks',
      'Straw collection chute',
      'Transport wheel kit and towing hitch',
      'Tool kit and maintenance manual',
    ],
  },
  {
    id: 'p2',
    slug: 'sam-750-multi-crop-thresher',
    code: 'SAM-750',
    name: 'Multi-Crop Thresher',
    category: 'Multi-crop',
    badge: 'Most versatile',
    price: 'Rs. 360,000',
    short:
      'One machine for paddy, wheat and maize — the practical choice for mixed-crop holdings.',
    summary:
      'The SAM-750 is configured so that a single machine can be re-set for different crops between seasons. Sieves and drum settings are changed with basic hand tools, which keeps a mixed-crop holding running with one unit.',
    features: [
      'Reversible sieve set for paddy, wheat and maize',
      'Medium drum suitable for one- to two-person feeding',
      'Balanced frame that can be moved on its own wheels',
      'Blower with adjustable air gate for cleaner grain',
      'Belt drive sized for standard agricultural engines',
    ],
    imagery: {
      hero: '/images/products/thresher3.jpeg',
      card: '/images/products/thresher3.jpeg',
      gallery: ['/images/products/thresher3.jpeg', '/images/products/thresher4.jpeg'],
    },
    specs: [
      { label: 'Machine type', value: 'Multi-crop thresher (sample)' },
      { label: 'Operating speed', value: '750 RPM' },
      { label: 'Threshing drum', value: 'Rasp-bar drum, 500 mm width (sample)' },
      { label: 'Drive', value: 'V-belt drive with steel pulley guard' },
      { label: 'Compatible crops', value: 'Paddy, wheat, maize, soybean, buckwheat' },
      { label: 'Construction', value: 'Steel frame with bolt-on sheet metal panels' },
      { label: 'Dimensions (L × W × H)', value: '1850 × 1000 × 1350 mm (sample)' },
      { label: 'Approximate weight', value: '310 kg (sample)' },
      { label: 'Cleaning system', value: 'Blower fan with adjustable air gate' },
      { label: 'Outlets', value: 'Grain outlet + straw outlet' },
      { label: 'Warranty', value: '1 year against manufacturing defects' },
    ],
    crops: ['Paddy / Rice', 'Wheat', 'Maize', 'Soybean', 'Buckwheat'],
    applications: [
      'Family farms growing more than one crop in a year',
      'Rental and service providers covering several villages',
      'Agricultural training and demonstration centres',
    ],
    accessories: [
      'Crop-specific sieve set',
      'Spare belt set',
      'Grain bagging chute',
      'Machine cover',
      'Tool kit and maintenance manual',
    ],
  },
  {
    id: 'p3',
    slug: 'sam-500-compact-farm-thresher',
    code: 'SAM-500',
    name: 'Compact Farm Thresher',
    category: 'Compact',
    badge: 'Smallholding',
    price: 'Rs. 360,000',
    short:
      'A compact, economical thresher for smallholdings and terrace plots where access is limited.',
    summary:
      'The SAM-500 keeps the same threshing principle in a smaller frame. It can be carried on a small pickup or trolley, set up at the field edge, and powered by a small diesel engine or an electric motor where supply is available.',
    features: [
      'Compact frame suited to small and terraced plots',
      'Single or two-person feeding position',
      'Available with a small diesel engine or electric motor',
      'Simple mechanical layout — no electronics to fail in the field',
      'Low running cost: one belt and one pulley set as consumables',
    ],
    imagery: {
      hero: '/images/products/thresher5.jpeg',
      card: '/images/products/thresher5.jpeg',
      gallery: ['/images/products/thresher5.jpeg', '/images/products/thresher6.jpeg'],
    },
    specs: [
      { label: 'Machine type', value: 'Compact farm thresher (sample)' },
      { label: 'Operating speed', value: '750 RPM' },
      { label: 'Threshing drum', value: 'Rasp-bar drum, 400 mm width (sample)' },
      { label: 'Drive', value: 'Single v-belt drive' },
      { label: 'Compatible crops', value: 'Paddy, wheat, millet, mustard' },
      { label: 'Construction', value: 'Fabricated steel frame with sheet metal covers' },
      { label: 'Dimensions (L × W × H)', value: '1450 × 850 × 1200 mm (sample)' },
      { label: 'Approximate weight', value: '185 kg (sample)' },
      { label: 'Cleaning system', value: 'Blower fan' },
      { label: 'Outlets', value: 'Grain outlet + straw outlet' },
      { label: 'Warranty', value: '1 year against manufacturing defects' },
    ],
    crops: ['Paddy / Rice', 'Wheat', 'Millet', 'Mustard'],
    applications: [
      'Smallholdings of a few bigha where a large machine is not economical',
      'Hilly and terraced plots that larger machines cannot reach',
      'Village-level shared ownership between neighbouring households',
    ],
    accessories: [
      'Sieve set for alternate crops',
      'Spare belt',
      'Transport trolley bracket',
      'Tool kit and maintenance manual',
    ],
  },
]

/** Crops across the whole catalogue — used to build the list filters. */
export const cropFilters = ['All crops', ...new Set(products.flatMap((p) => p.crops))]

/**
 * Key features & benefits — shown on every product page.
 * Only claims confirmed by the workshop. Do not add figures that are not
 * verified: `value` is rendered as a highlighted spec, `highlight: true` gives
 * the card its dark treatment.
 */
export const keyFeatures = [
  {
    icon: 'fan',
    title: 'Powerful Fan',
    text: 'High-performance fan for efficient operation.',
  },
  {
    icon: 'wind',
    title: 'Long-Distance Throw',
    text: 'Throws the processed material a long distance for easier collection and separation.',
  },
  {
    icon: 'gauge',
    title: 'Speed',
    value: '750 RPM',
    text: 'Runs at a steady operating speed of 750 RPM.',
    highlight: true,
  },
  {
    icon: 'shield',
    title: 'Safety',
    text: 'Designed with safety features for secure and reliable operation.',
  },
  {
    icon: 'award',
    title: 'Warranty',
    value: '1 Year',
    text: 'Backed by a 1-year warranty.',
    highlight: true,
  },
  {
    icon: 'wrench',
    title: 'Bearing Service',
    text: 'Reliable bearing system with easy maintenance and servicing.',
  },
]

export const getProductBySlug = (slug) => products.find((product) => product.slug === slug)

export const getRelatedProducts = (slug, limit = 2) =>
  products.filter((product) => product.slug !== slug).slice(0, limit)

export default products
