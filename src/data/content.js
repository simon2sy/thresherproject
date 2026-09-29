/**
 * ---------------------------------------------------------------------------
 * EDITORIAL CONTENT
 * ---------------------------------------------------------------------------
 * All section copy lives here so wording can be reviewed and replaced without
 * touching component markup. `icon` values are looked up in
 * src/components/ui/Icon.jsx — if you add an icon name, add it there too.
 */

export const whyUs = [
  {
    id: 'efficient-processing',
    icon: 'timer',
    title: 'Efficient Processing',
    text: 'Feeding, threshing, cleaning and discharge are sized to work together, so harvested crop moves through the machine without waiting between stages.',
    points: ['Sized drum and blower matching', 'Continuous feeding position'],
  },
  {
    id: 'durable-construction',
    icon: 'shield',
    title: 'Durable Construction',
    text: 'Frames are built from steel channel and sheet. The parts that wear out — drum bars, concave grates, sieves and pulleys — are made as replaceable items.',
    points: ['Steel channel frame', 'Replaceable wear parts'],
  },
  {
    id: 'multi-crop',
    icon: 'layers',
    title: 'Multi-Crop Capability',
    text: 'Sieve sets and drum settings are changed between seasons, so one machine can cover paddy, wheat, maize, millet and mustard depending on the configuration.',
    points: ['Crop-specific sieve sets', 'Settings changed with hand tools'],
  },
  {
    id: 'local-support',
    icon: 'map-pin',
    title: 'Local Support',
    text: 'We are based in Jhapa Gaupalika, Jhapa. Machines are demonstrated, supplied and serviced from here, and spare parts stay within reach of the farms that use them.',
    points: ['Demonstration before purchase', 'Spares kept in stock'],
  },
  {
    id: 'easy-maintenance',
    icon: 'wrench',
    title: 'Easy Maintenance',
    text: 'Daily work is limited to cleaning, greasing and checking belt tension. Worn parts are unbolted and replaced rather than cut out and re-welded.',
    points: ['Standard bearings and belts', 'Bolt-on panels for access'],
  },
]

export const processSteps = [
  {
    step: '01',
    title: 'Feed',
    text: 'Crop material is fed into the hopper by hand or from bundles. The slope of the hopper controls how quickly material enters the threshing chamber.',
    spec: 'Hopper: sloped sheet metal',
  },
  {
    step: '02',
    title: 'Thresh',
    text: 'The rasp-bar drum rotates at working speed and rubs the crop against the concave grate, separating grain from straw and husk.',
    spec: 'Drum: belt driven, rasp bars',
  },
  {
    step: '03',
    title: 'Clean',
    text: 'Grain drops through the concave and passes the blower airstream, which lifts chaff and light material out of the grain stream before it reaches the outlet.',
    spec: 'Blower: adjustable air gate',
  },
  {
    step: '04',
    title: 'Collect',
    text: 'Cleaned grain leaves through the outlet chute into a sack, trolley or collection tray. Straw is discharged at the rear of the machine.',
    spec: 'Outlets: grain + straw',
  },
]

/** Site-wide technical table. Rows are rendered in order. */
export const technicalSpecifications = {
  notice:
    'Sample specification — the figures below are examples used for layout. Confirm them per machine before publishing.',
  rows: [
    { label: 'Machine type', value: 'Multi-Crop Thresher' },
    { label: 'Price', value: 'Rs. 360,000' },
    { label: 'Drive', value: 'Belt Drive' },
    { label: 'Crops', value: 'Rice, Wheat, Maize' },
    { label: 'Construction', value: 'Heavy-Duty Steel' },
    { label: 'Cleaning', value: 'Blower fan with adjustable air gate' },
    { label: 'Outlets', value: 'Grain outlet + straw outlet' },
    { label: 'Location', value: 'Jhapa Gaupalika, Jhapa' },
  ],
}

export const fieldContext = [
  {
    id: 'f1',
    src: '/images/gallery/terai-paddy-season.jpg',
    title: 'Paddy season in the Terai',
    text: 'In the plains around Jhapa, paddy is threshed within days of cutting. The crop is stacked beside the machine and fed in by hand, so nothing has to be carried far.',
    alt: 'Workers feeding a heap of harvested paddy straw into an orange thresher machine in an open field, with two women bagging the threshed grain beside it',
  },
  {
    id: 'f2',
    src: '/images/gallery/working-on-field.jpg',
    title: 'One machine, a full crew',
    text: 'A threshing run takes a team: people on the stack feeding, people at the outlet filling sacks, and someone watching the flow the whole time.',
    alt: 'A red thresher machine beside a tall stack of straw, with a crew feeding bundles from the top and women collecting threshed grain into baskets below',
  },
  {
    id: 'f3',
    src: '/images/gallery/field-threshing-tractor.jpg',
    title: 'Machines that move',
    text: 'Many operators hire a machine out to several households in one season. Wheels, a support leg and a compact frame decide whether a machine can move between farms.',
    alt: 'A red thresher machine being towed by a tractor through a harvested field, straw and chaff flying from the drum as workers feed the standing crop',
  },
]

export const ctaSection = {
  title: 'Need the Right Thresher for Your Farm?',
  text: 'Talk to our team about crop compatibility, availability and the right frame for your farm — every model is Rs. 360,000.',
}

export const aboutStory = {
  title: 'Machinery Built for the People Who Feed Us.',
  paragraphs: [
    'Daju Bhai Grill Udyog works on one thing: thresher machines for Nepali farms — from small family plots to the larger holdings in the Terai. The machines are assembled part by part in our workshop in Jhapa Gaupalika, Jhapa, and adjusted before they are sent out.',
    'Most of the farms we work with measure land in bigha and kattha rather than hectares, and the harvest window is short. That shapes the design: simple mechanical layouts, standard bearings and belts, and wear parts that can be bought and replaced locally instead of waiting on imports.',
    'A thresher has to keep working for the seasons after it is sold. That is why drum bars, concave grates, sieves and pulleys are made as replaceable items, and why we keep spares in stock at the workshop.',
    'If something is not clear about crop suitability or the setup at your site, ask before you buy — the right machine is usually the one that matches the crop and the land.',
  ],
  /**
   * Shown as an explicit "to be confirmed" panel rather than invented facts.
   * Replace each value once the real information is available.
   */
  facts: [
    { label: 'Proprietor', value: 'Dulal Shiekh' },
    { label: 'Year of establishment', value: 'To be confirmed' },
    { label: 'Workshop area', value: 'To be confirmed' },
    { label: 'Registrations & certifications', value: 'To be confirmed' },
    { label: 'Team size', value: 'To be confirmed' },
  ],
}

export const qualityNotes = [
  'Machines are run and adjusted before dispatch.',
  'Wear parts are replaceable and locally available.',
  'Belt guards and rotating-part covers fitted as standard.',
  'Assembly and service handled from Jhapa Gaupalika, Jhapa.',
]

/**
 * Options offered by the inquiry form. The machine list is generated from the
 * catalogue; capacities are bands rather than exact figures so a farmer can
 * answer without knowing machine specifications.
 */
export const inquiryOptions = {
  capacityBands: [
    'Up to 500 kg / hour',
    '500 – 1000 kg / hour',
    '1000 – 1500 kg / hour',
    'Larger than 1500 kg / hour',
    'Not sure — please advise',
  ],
  machineHelp: 'Not sure — please advise',
  powerSources: ['Diesel engine', 'Electric motor', 'Both available', 'Not decided yet'],
}

export default {
  whyUs,
  processSteps,
  technicalSpecifications,
  fieldContext,
  ctaSection,
  aboutStory,
  qualityNotes,
}

