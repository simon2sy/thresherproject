/**
 * ---------------------------------------------------------------------------
 * UI STRING DICTIONARY  (English / नेपाली)
 * ---------------------------------------------------------------------------
 * Every piece of interface copy that is not part of the product catalogue,
 * gallery, or section data lives here, keyed by a dotted path and looked up
 * with `t('some.key')` from `useLanguage()`.
 *
 * Each key maps to `{ en, ne }`. A missing Nepali value falls back to the
 * English one, so translators can land keys incrementally without ever
 * rendering an empty interface.
 *
 * Interpolation: wrap a token in braces and pass it via the second argument of
 * `t` — e.g. `t('hero.range', { count: 3 })` for "Range · {count} machines".
 */

export const strings = {
  /* ---- Common actions / repeated labels ---------------------------------- */
  common: {
    callUs: { en: 'Call Us', ne: 'हामीलाई फोन गर्नुहोस्' },
    callWorkshop: { en: 'Call the workshop', ne: 'कारखानामा फोन गर्नुहोस्' },
    exploreThreshers: { en: 'Explore Threshers', ne: 'थ्रेसरहरू हेर्नुहोस्' },
    viewAllThreshers: { en: 'View all threshers', ne: 'सबै थ्रेसर हेर्नुहोस्' },
    allThreshers: { en: 'All threshers', ne: 'सबै थ्रेसर' },
    talkToUs: { en: 'Talk to us', ne: 'हामीसँग कुरा गर्नुहोस्' },
    viewDetails: { en: 'View Details', ne: 'विवरण हेर्नुहोस्' },
    enquire: { en: 'Enquire', ne: 'सोधपुछ गर्नुहोस्' },
    compareModels: { en: 'Compare models', ne: 'मोडेल तुलना गर्नुहोस्' },
    backToRange: { en: 'Back to the range', ne: 'रेन्जमा फर्कनुहोस्' },
    backToHome: { en: 'Back to home', ne: 'गृहपृष्ठमा फर्कनुहोस्' },
    openGallery: { en: 'Open full gallery', ne: 'पूरा ग्यालरी खोल्नुहोस्' },
    messageWhatsApp: { en: 'Message on WhatsApp', ne: 'व्हाट्सएपमा सन्देश पठाउनुहोस्' },
    whatsapp: { en: 'WhatsApp', ne: 'व्हाट्सएप' },
  },

  /* ---- Navbar / footer --------------------------------------------------- */
  nav: {
    footerLabel: { en: 'Footer', ne: 'फुटर' },
    primaryLabel: { en: 'Primary', ne: 'मुख्य' },
    home: { en: 'Home', ne: 'गृहपृष्ठ' },
    threshers: { en: 'Threshers', ne: 'थ्रेसरहरू' },
    about: { en: 'About', ne: 'हाम्रोबारे' },
    whyUs: { en: 'Why Us', ne: 'किन हामी' },
    gallery: { en: 'Gallery', ne: 'ग्यालरी' },
    contact: { en: 'Contact', ne: 'सम्पर्क' },
    openMenu: { en: 'Open menu', ne: 'मेनु खोल्नुहोस्' },
    breadcrumb: { en: 'Breadcrumb', ne: 'ब्रेडक्रम' },
    closeMenu: { en: 'Close menu', ne: 'मेनु बन्द गर्नुहोस्' },
    homeAria: { en: '{name} — home', ne: '{name} — गृहपृष्ठ' },
    tagline: {
      en: 'Threshers & Farm Machinery · Jhapa Gaupalika',
      ne: 'थ्रेसर तथा कृषि मेसिनरी · झापा गाउँपालिका',
    },
  },

  layout: {
    skip: { en: 'Skip to content', ne: 'मुख्य सामग्रीमा जानुहोस्' },
    backToTop: { en: 'Back to top', ne: 'माथि पुग्नुहोस्' },
    call: { en: 'Call', ne: 'फोन' },
  },

  footer: {
    description: {
      en: 'Thresher machines and farm machinery for paddy, wheat, maize and other crops — assembled and serviced in Jhapa Gaupalika, Jhapa.',
      ne: 'धान, गहुँ, मकै तथा अन्य बालीका लागि थ्रेसर मेसिन र कृषि उपकरण — झापा गाउँपालिका, झापामा जडान तथा मर्मत सेवा।',
    },
    navigate: { en: 'Navigate', ne: 'नेभिगेसन' },
    threshers: { en: 'Threshers', ne: 'थ्रेसरहरू' },
    contact: { en: 'Contact', ne: 'सम्पर्क' },
    proprietor: { en: 'Proprietor', ne: 'सञ्चालक' },
    rights: { en: 'All rights reserved.', ne: 'सर्वाधिकार सुरक्षित।' },
    onSocialAria: { en: '{name} on {label}', ne: '{name} — {label}' },
    placeholderNote: {
      en: 'Some images and the specification values on this site are placeholders and will be replaced with the verified catalogue data.',
      ne: 'यो वेबसाइटका केही तस्बिर तथा विवरणका मानहरू नमुना हुन् र प्रमाणित सूची विवरणबाट प्रतिस्थापन गरिनेछ।',
    },
  },

  /* ---- Language switch --------------------------------------------------- */
  language: {
    label: { en: 'Language', ne: 'भाषा' },
    english: { en: 'English', ne: 'English' },
    nepali: { en: 'नेपाली', ne: 'नेपाली' },
    switchTo: { en: 'Switch language to Nepali', ne: 'भाषा अंग्रेजीमा परिवर्तन गर्नुहोस्' },
  },
  /* ---- Hero -------------------------------------------------------------- */
  hero: {
    eyebrow: {
      en: 'Agricultural machinery · {locality}, {district}',
      ne: 'कृषि मेसिनरी · {locality}, {district}',
    },
    titleLead: { en: 'Powering ', ne: 'सशक्त बनाउँदै ' },
    titleAccent: { en: 'Better Harvests.', ne: 'अझ राम्रो बाली उत्पादन।' },
    lede: {
      en: 'Reliable agricultural threshers engineered for efficient grain processing, built for the demands of modern farming.',
      ne: 'प्रभावकारी अन्न प्रशोधनका लागि निर्मित भरपर्दो कृषि थ्रेसर — आधुनिक खेतीको आवश्यकताअनुसार बनाइएको।',
    },
    sub: {
      en: 'Multi-crop threshers for paddy, wheat and maize — assembled, demonstrated and serviced from our workshop in Jhapa Gaupalika, Jhapa.',
      ne: 'धान, गहुँ र मकैका लागि बहुबाली थ्रेसर — झापा गाउँपालिका, झापास्थित हाम्रो कारखानामा जडान, प्रदर्शन तथा मर्मत।',
    },
    spareParts: { en: 'Spare parts kept in stock', ne: 'स्पेयर पार्ट्स सधैं मौजुद' },
    serviceFromJhapa: { en: 'Service from Jhapa', ne: 'झापाबाटै सेवा' },
    range: { en: 'Range · {count} machines', ne: 'रेन्ज · {count} मेसिन' },
    scrollHint: { en: 'Scroll for the full range', ne: 'पूरा रेन्ज हेर्न स्क्रोल गर्नुहोस्' },
    specDrive: { en: 'Drive', ne: 'ड्राइभ' },
    specPrice: { en: 'Price', ne: 'मूल्य' },
    specCrops: { en: 'Crops', ne: 'बाली' },
    specDriveValue: { en: 'Belt drive', ne: 'बेल्ट ड्राइभ' },
    specCropsValue: { en: 'Paddy · Wheat · Maize', ne: 'धान · गहुँ · मकै' },
    imageAlt: {
      en: 'Workers feeding a heap of harvested paddy straw into an orange thresher machine in an open field in the Terai, with grain being bagged at the outlet',
      ne: 'तराईको खुला खेतमा काटिएको धानको परालको थुप्रोबाट सुन्तला रंगको थ्रेसर मेसिनमा दाना हाल्दै गरेका कामदार, आउटलेटमा अन्न बोरामा हाल्दै',
    },
  },

  /* ---- Capability strip -------------------------------------------------- */
  capability: {
    models: { en: 'Thresher models', ne: 'थ्रेसर मोडेल' },
    crops: { en: 'Crops covered', ne: 'समेटिएका बाली' },
    price: { en: 'Price', ne: 'मूल्य' },
    warranty: { en: 'Warranty', ne: 'वारेन्टी' },
    allModels: { en: 'all models', ne: 'सबै मोडेल' },
    standard: { en: 'standard', ne: 'मानक' },
    onRequest: { en: 'On request', ne: 'अनुरोधमा' },
    yearOne: { en: '1 year', ne: '1 वर्ष' },
    years: { en: '{count} years', ne: '{count} वर्ष' },
    monthOne: { en: '1 month', ne: '1 महिना' },
    months: { en: '{count} months', ne: '{count} महिना' },
  },

  /* ---- CTA section ------------------------------------------------------- */
  cta: {
    eyebrow: { en: 'Talk to us', ne: 'हामीसँग कुरा गर्नुहोस्' },
    phone: { en: 'Phone', ne: 'फोन' },
    email: { en: 'Email', ne: 'इमेल' },
    workshop: { en: 'Workshop', ne: 'कारखाना' },
    district: { en: 'District', ne: 'जिल्ला' },
  },

  /* ---- Contact ----------------------------------------------------------- */
  contact: {
    eyebrow: { en: 'Contact', ne: 'सम्पर्क' },
    title: { en: 'Talk to the workshop', ne: 'कारखानासँग कुरा गर्नुहोस्' },
    lead: {
      en: 'Send the inquiry form with your crop, land size and the power you have available, or simply call. We will tell you which machine fits and what it costs.',
      ne: 'तपाईंको बाली, जमिनको आकार र उपलब्ध शक्तिको विवरण सहित जिज्ञासा फारम पठाउनुहोस्, वा सिधै फोन गर्नुहोस्। कुन मेसिन उपयुक्त हुन्छ र कति खर्च लाग्छ, हामी बताउँछौं।',
    },
    address: { en: 'Address', ne: 'ठेगाना' },
    proprietor: { en: 'Proprietor', ne: 'सञ्चालक' },
    phone: { en: 'Phone', ne: 'फोन' },
    email: { en: 'Email', ne: 'इमेल' },
    hours: { en: 'Opening hours', ne: 'खुल्ने समय' },
    placeholderNumber: {
      en: 'Example number in this build — replace with the real contact number.',
      ne: 'यो संस्करणमा नमुना नम्बर — वास्तविक सम्पर्क नम्बर राख्नुहोस्।',
    },
    preferTalk: { en: 'Prefer to talk first?', ne: 'पहिले कुरा गर्न चाहनुहुन्छ?' },
    preferTalkText: {
      en: 'Call the workshop during opening hours, or send a message on WhatsApp with a photo of your crop and a note about where the machine will be used.',
      ne: 'खुल्ने समयमा कारखानामा फोन गर्नुहोस्, वा तपाईंको बालीको फोटो र मेसिन कहाँ प्रयोग हुनेछ भन्ने जानकारीसहित व्हाट्सएपमा सन्देश पठाउनुहोस्।',
    },
    endpointNote: {
      en: 'Fastest reply: phone or WhatsApp during working hours.',
      ne: 'छिटो जवाफ: कामको समयमा फोन वा व्हाट्सएप।',
    },
    demoNote: {
      en: 'Fastest reply: phone or WhatsApp during working hours.',
      ne: 'छिटो जवाफ: कामको समयमा फोन वा व्हाट्सएप।',
    },
    visitTitle: {
      en: 'Visit the workshop or give us a call',
      ne: 'कारखानामा आउनुहोस् वा फोन गर्नुहोस्',
    },
    visitText: {
      en: 'See the New Super Manku Thresher running before you decide. Call the workshop or message on WhatsApp — we answer during working hours.',
      ne: 'निर्णय गर्नुअघि न्यु सुपर मान्कु थ्रेसर चलेको हेर्नुहोस्। कारखानामा फोन गर्नुहोस् वा व्हाट्सएपमा सन्देश पठाउनुहोस् — कामको समयमा हामी जवाफ दिन्छौं।',
    },
    visitNote: {
      en: 'Sunday – Friday, 8:00 AM – 7:00 PM · Jhapa Gaupalika, Jhapa.',
      ne: 'आइतबार – शुक्रबार, बिहान 8:00 – साँझ 7:00 · झापा गाउँपालिका, झापा।',
    },
    visitSmallNote: {
      en: 'Fastest reply: phone or WhatsApp during working hours.',
      ne: 'छिटो जवाफ: कामको समयमा फोन वा व्हाट्सएप।',
    },
    formTitle: { en: 'Visit the workshop or call', ne: 'कारखानामा आउनुहोस् वा फोन गर्नुहोस्' },
    formHint: {
      en: 'No online form — call or WhatsApp us and we will answer during working hours.',
      ne: 'अनलाइन फारम छैन — हामीलाई फोन वा व्हाट्सएप गर्नुहोस्, कामको समयमा हामी जवाफ दिन्छौं।',
    },
  },
  /* ---- Inquiry form ------------------------------------------------------ */
  form: {
    ariaLabel: { en: 'Inquiry form', ne: 'जिज्ञासा फारम' },
    name: { en: 'Name *', ne: 'नाम *' },
    namePlaceholder: { en: 'Your full name', ne: 'तपाईंको पूरा नाम' },
    phone: { en: 'Phone *', ne: 'फोन *' },
    phonePlaceholder: { en: '98XXXXXXXX', ne: '98XXXXXXXX' },
    email: { en: 'Email', ne: 'इमेल' },
    emailPlaceholder: { en: 'name@example.com', ne: 'name@example.com' },
    location: { en: 'Location', ne: 'स्थान' },
    locationPlaceholder: { en: 'Village / Municipality, District', ne: 'गाउँ / नगरपालिका, जिल्ला' },
    capacity: { en: 'Required capacity', ne: 'आवश्यक क्षमता' },
    capacityPlaceholder: { en: 'Select a capacity range', ne: 'क्षमता दायरा छान्नुहोस्' },
    power: { en: 'Power available', ne: 'उपलब्ध शक्ति' },
    powerPlaceholder: { en: 'Select a power source', ne: 'शक्तिको स्रोत छान्नुहोस्' },
    message: { en: 'Message *', ne: 'सन्देश *' },
    messagePlaceholder: {
      en: 'Crop, land size, expected quantity, and anything else we should know.',
      ne: 'बाली, जमिनको आकार, अपेक्षित परिमाण, र अन्य जान्न योग्य कुराहरू।',
    },
    checkFields: { en: 'Please check the highlighted fields:', ne: 'कृपया औंल्याइएका फाँटहरू जाँच्नुहोस्:' },
    title: { en: 'Machine inquiry', ne: 'मेसिन जिज्ञासा' },
    lead: {
      en: 'Tell us your crop, land size and available power — we reply with the right model and its price.',
      ne: 'तपाईंको बाली, जमिनको आकार र उपलब्ध शक्ति बताउनुहोस् — हामी उपयुक्त मोडेल र मूल्यसहित जवाफ दिन्छौं।',
    },
    fieldName: {
      name: { en: 'Name', ne: 'नाम' },
      phone: { en: 'Phone', ne: 'फोन' },
      email: { en: 'Email', ne: 'इमेल' },
      message: { en: 'Message', ne: 'सन्देश' },
    },
    send: { en: 'Send Inquiry', ne: 'जिज्ञासा पठाउनुहोस्' },
    sending: { en: 'Sending…', ne: 'पठाउँदै…' },
    privacy: {
      en: 'We use your details only to answer this inquiry.',
      ne: 'हामी तपाईंको विवरण यो जिज्ञासाको जवाफ दिन मात्र प्रयोग गर्छौं।',
    },
    demoMode: {
      en: ' This build runs in demo mode — nothing is submitted.',
      ne: ' यो संस्करण डेमो मोडमा चल्छ — केही पनि पठाइँदैन।',
    },
    sentTitle: { en: 'Inquiry recorded', ne: 'जिज्ञासा दर्ता भयो' },
    sentBodyRecorded: { en: 'Thank you — your details have been recorded', ne: 'धन्यवाद — तपाईंको विवरण दर्ता भयो' },
    sentBodyToTeam: { en: ' and sent to our team.', ne: ' र हाम्रो टोलीलाई पठाइयो।' },
    sentBodyDemo: { en: ' for this demonstration build.', ne: ' (यो प्रदर्शन संस्करणका लागि)।' },
    sentBodyReply: {
      en: ' We normally reply with machine options and pricing during business hours.',
      ne: ' हामी सामान्यतया कार्यालय समयमा मेसिनका विकल्प र मूल्यसहित जवाफ दिन्छौं।',
    },
    sendAnother: { en: 'Send another inquiry', ne: 'अर्को जिज्ञासा पठाउनुहोस्' },
    errorSend: {
      en: 'The inquiry could not be sent automatically. Please call or email us directly — the details are on this page.',
      ne: 'जिज्ञासा स्वतः पठाउन सकिएन। कृपया सिधै फोन वा इमेल गर्नुहोस् — विवरण यही पृष्ठमा छ।',
    },
    errName: { en: 'Please enter your name.', ne: 'कृपया तपाईंको नाम लेख्नुहोस्।' },
    errPhoneEmpty: {
      en: 'Please enter a phone number we can call you back on.',
      ne: 'कृपया फिर्ता फोन गर्न सकिने नम्बर लेख्नुहोस्।',
    },
    errPhoneFormat: {
      en: 'Use digits only, for example 98XXXXXXXX or +977 98XXXXXXXX.',
      ne: 'अंक मात्र प्रयोग गर्नुहोस्, जस्तै 98XXXXXXXX वा +977 98XXXXXXXX।',
    },
    errEmail: { en: 'Check the email address, or leave it empty.', ne: 'इमेल ठेगाना जाँच्नुहोस्, वा खाली छोड्नुहोस्।' },
    errMessage: { en: 'Tell us the crop and machine you need.', ne: 'तपाईंलाई आवश्यक बाली र मेसिन बताउनुहोस्।' },
  },

  /* ---- Gallery + lightbox ------------------------------------------------ */
  gallery: {
    categoriesAria: { en: 'Gallery categories', ne: 'ग्यालरी कोटीहरू' },
    all: { en: 'All', ne: 'सबै' },
    threshersCat: { en: 'Threshers', ne: 'थ्रेसरहरू' },
    fieldWorkCat: { en: 'Field Work', ne: 'खेतको काम' },
    view: { en: 'View', ne: 'हेर्नुहोस्' },
    openAria: { en: 'Open larger view of {title}', ne: '{title} को ठूलो दृश्य खोल्नुहोस्' },
    closeViewerAria: { en: 'Close image viewer', ne: 'तस्बिर दर्शक बन्द गर्नुहोस्' },
    prevAria: { en: 'Previous image', ne: 'अघिल्लो तस्बिर' },
    nextAria: { en: 'Next image', ne: 'अर्को तस्बिर' },
  },

  /* ---- Map panel --------------------------------------------------------- */
  map: {
    iframeTitle: {
      en: 'Map showing {name} in {locality}, {district}',
      ne: '{locality}, {district} मा {name} देखाउने नक्सा',
    },
    placeholder: { en: 'Map placeholder — replace with the exact workshop location', ne: 'नक्सा नमुना — वास्तविक कारखाना स्थान राख्नुहोस्' },
    searchRef: { en: 'Search reference:', ne: 'खोज सन्दर्भ:' },
    openMaps: { en: 'Open in Google Maps', ne: 'गुगल म्याप्समा खोल्नुहोस्' },
  },
  /* ---- Process / why us / field context ---------------------------------- */
  process: {
    eyebrow: { en: 'How it works', ne: 'यो कसरी चल्छ' },
    title: { en: 'From standing crop to bagged grain', ne: 'खेतमा उभिएको बालीबाट बोराभरि अन्नसम्म' },
    lead: {
      en: 'Four stages, in the order the crop passes through them. Every adjustment on the machine belongs to one of these stages.',
      ne: 'बाली प्रवेश गर्ने क्रमअनुसार चार चरण। मेसिनको प्रत्येक समायोजन यीमध्ये एक चरणसँग सम्बन्धित हुन्छ।',
    },
  },
  whyUs: {
    eyebrow: { en: 'Why choose us', ne: 'किन हामीलाई छान्नुहोस्' },
    title: { en: 'Practical reasons to buy from us', ne: 'हामीसँग किन्नुका व्यावहारिक कारण' },
    lead: {
      en: 'No claims we cannot back up — these are the things that matter when a machine has to work through the whole season.',
      ne: 'प्रमाण दिन नसकिने दाबी होइन — मेसिनले पूरा सिजन काम गर्नुपर्दा महत्त्वपूर्ण हुने कुराहरू यी हुन्।',
    },
  },
  fieldContext: {
    eyebrow: { en: 'In the field', ne: 'खेतमा' },
    title: { en: 'Built for how harvest actually happens here', ne: 'यहाँको वास्तविक कटनी अनुसार बनाइएको' },
    lead: {
      en: 'Machines are bought for a specific crop, a specific field and a specific month. These are the working conditions the range is designed around.',
      ne: 'मेसिन निश्चित बाली, निश्चित खेत र निश्चित महिनाका लागि किनिन्छ। यो रेन्ज यिनै कार्य अवस्थाअनुसार डिजाइन गरिएको हो।',
    },
  },

  /* ---- Product card ------------------------------------------------------ */
  productCard: {
    price: { en: 'Price', ne: 'मूल्य' },
    crops: { en: 'Crops', ne: 'बाली' },
  },

  /* ---- Product viewer (3D / photos) -------------------------------------- */
  viewer: {
    tabPhotos: { en: 'Photos', ne: 'तस्बिरहरू' },
    tabRotate: { en: 'Rotate & Inspect', ne: 'घुमाएर हेर्नुहोस्' },
    tabExploded: { en: 'Exploded View', ne: 'पार्ट्स छुट्ट्याइएको दृश्य' },
    tablistAria: { en: 'Machine presentation', ne: 'मेसिन प्रस्तुति' },
    presetPerspective: { en: '3/4 view', ne: '३/४ दृश्य' },
    presetOperating: { en: 'Operating side', ne: 'सञ्चालन तर्फ' },
    presetDrive: { en: 'Drive side', ne: 'ड्राइभ तर्फ' },
    presetFeed: { en: 'Feed end', ne: 'फिड गर्ने छेउ' },
    separated: { en: 'Assemblies separated for inspection', ne: 'निरीक्षणका लागि पार्ट्स छुट्ट्याइएका' },
    running: { en: 'Running', ne: 'चलिरहेको' },
    stopped: { en: 'Stopped', ne: 'रोकिएको' },
    reset: { en: 'Reset', ne: 'रिसेट' },
    exitFullscreen: { en: 'Exit fullscreen', ne: 'पूरा स्क्रिनबाट बाहिर' },
    viewFullscreen: { en: 'View fullscreen', ne: 'पूरा स्क्रिनमा हेर्नुहोस्' },
    showViewAria: { en: 'Show view {index} of {total}', ne: '{total} मध्ये दृश्य {index} देखाउनुहोस्' },
    componentsHeading: { en: 'Machine components', ne: 'मेसिनका भागहरू' },
    componentsHint: { en: 'Hover or tap a component to locate it on the machine.', ne: 'मेसिनमा पत्ता लगाउन कुनै भागमा होभर वा ट्याप गर्नुहोस्।' },
    whyMachine: { en: 'Why this machine', ne: 'यो मेसिन किन' },
    priceLabel: { en: 'Price', ne: 'मूल्य' },
    loading3d: { en: 'Loading 3D model…', ne: '३डी मोडेल लोड हुँदै…' },
    unavailable3d: { en: '3D view unavailable', ne: '३डी दृश्य उपलब्ध छैन' },
    unavailable3dNote: {
      en: 'The interactive 3D viewer is unavailable on this device. Photos and the full specification table are shown instead.',
      ne: 'यो यन्त्रमा अन्तरक्रियात्मक ३डी दर्शक उपलब्ध छैन। यसको सट्टा तस्बिर र पूरा विवरण तालिका देखाइएको छ।',
    },
    failed3d: {
      en: 'The 3D view could not start on this device. Use the Photos tab for the machine views.',
      ne: 'यो यन्त्रमा ३डी दृश्य सुरु हुन सकेन। मेसिनका दृश्यका लागि तस्बिर ट्याब प्रयोग गर्नुहोस्।',
    },
    modelAria: { en: 'Interactive 3D model of the {code} {name}', ne: '{code} {name} को अन्तरक्रियात्मक ३डी मोडेल' },
    viewAlt: { en: '{code} {name} — view {index}', ne: '{code} {name} — दृश्य {index}' },
  },
  /* ---- Technical specifications section ---------------------------------- */
  specs: {
    eyebrow: { en: 'Technical specifications', ne: 'प्राविधिक विवरण' },
    title: { en: 'Numbers you can plan around', ne: 'योजना बनाउन सकिने तथ्याङ्क' },
    lead: {
      en: 'Construction, drive and crop suitability decide whether a machine suits your land and your harvest window. The table shows the format we publish for every model in the range.',
      ne: 'निर्माण, ड्राइभ र बाली अनुकूलताले मेसिन तपाईंको जमिन र कटनी समयसँग मिल्छ कि मिल्दैन भन्ने निर्धारण गर्छ। तालिकाले रेन्जका प्रत्येक मोडेलका लागि प्रकाशित गर्ने ढाँचा देखाउँछ।',
    },
    checkHeading: { en: 'What we check before recommending a machine', ne: 'मेसिन सिफारिस गर्नुअघि हामी के जाँच्छौं' },
    check1: { en: 'Your main crop and expected tonnage per season', ne: 'तपाईंको मुख्य बाली र प्रति सिजन अपेक्षित उत्पादन' },
    check2: { en: 'Where the machine will stand — field edge, farmyard or threshing floor', ne: 'मेसिन कहाँ राखिन्छ — खेतको छेउ, खलिया वा थ्रेसिङ फ्लोर' },
    check3: { en: 'Access to the field or yard — width of the track and turning space', ne: 'खेत वा आँगनमा पुग्ने बाटो — बाटोको चौडाई र घुम्ने ठाउँ' },
    check4: { en: 'Sacks, trolley or trailer arrangement at the grain outlet', ne: 'अन्न निस्कने ठाउँमा बोरा, ठेला वा ट्रेलरको व्यवस्था' },
    note: {
      en: 'Call {phone} or send the inquiry form with your crop and land size and we will confirm what fits.',
      ne: 'बाली र जमिनको आकारसहित {phone} मा फोन गर्नुहोस् वा जिज्ञासा फारम पठाउनुहोस् — के उपयुक्त हुन्छ हामी पुष्टि गर्छौं।',
    },
    caption: { en: 'Sample thresher technical specifications', ne: 'नमुना थ्रेसर प्राविधिक विवरण' },
  },
  specTable: {
    caption: { en: '{code} specifications', ne: '{code} विवरण' },
    specification: { en: 'Specification', ne: 'विवरण' },
    details: { en: 'Details', ne: 'विस्तृत विवरण' },
  },
  /* Labels that must stay identical to the ones stored in the product specs,
     so table rows can be located by label after translation. */
  specLabels: {
    machineType: { en: 'Machine type', ne: 'मेसिनको प्रकार' },
    operatingSpeed: { en: 'Operating speed', ne: 'सञ्चालन गति' },
    drum: { en: 'Threshing drum', ne: 'थ्रेसिङ ड्रम' },
    drive: { en: 'Drive', ne: 'ड्राइभ' },
    crops: { en: 'Compatible crops', ne: 'अनुकूल बाली' },
    construction: { en: 'Construction', ne: 'निर्माण' },
    dimensions: { en: 'Dimensions (L × W × H)', ne: 'आकार (ल × चौ × उ)' },
    weight: { en: 'Approximate weight', ne: 'अनुमानित तौल' },
    cleaning: { en: 'Cleaning system', ne: 'सफाई प्रणाली' },
    outlets: { en: 'Outlets', ne: 'निकास' },
    warranty: { en: 'Warranty', ne: 'वारेन्टी' },
  },

  /* ---- About page -------------------------------------------------------- */
  about: {
    eyebrow: { en: 'About the company', ne: 'कम्पनीको बारेमा' },
    lead: {
      en: 'Thresher machines, built and serviced in Jhapa Gaupalika, Jhapa — designed around the crops, the land sizes and the harvest calendar of Nepali farms.',
      ne: 'झापा गाउँपालिका, झापामा निर्मित र मर्मत हुने थ्रेसर मेसिन — नेपाली खेतका बाली, जमिनको आकार र कटनी समयलाई ध्यानमा राखी डिजाइन गरिएको।',
    },
    figCaption: {
      en: 'Frames are cut, welded and drilled before assembly. Wear parts are made as replaceable items so a machine can be kept in service for years.',
      ne: 'जडान गर्नुअघि फ्रेम काटिन्छ, वेल्डिङ र ड्रिलिङ गरिन्छ। घिसिने भागहरू फेर्न मिल्ने गरी बनाइन्छन्, जसले गर्दा मेसिन वर्षौंसम्म सेवामा राख्न सकिन्छ।',
    },
    figAlt: {
      en: 'A row of thresher machines painted blue, green, red and orange, lined up in a line on grass at a machinery yard',
      ne: 'मेसिनरी आँगनमा घाँसमाथि लहरै राखिएका निलो, हरियो, रातो र सुन्तला रङका थ्रेसर मेसिनहरू',
    },
    askNote: {
      en: 'Ask whether the machine can be brought to your field or when it can be set up — ask before you buy. It is the cheapest conversation in the whole process.',
      ne: 'मेसिन तपाईंको खेतमा ल्याउन सकिन्छ कि वा कहिले जडान हुन्छ सोध्नुहोस् — किन्नुअघि सोध्नुहोस्। यो पूरा प्रक्रियाको सबैभन्दा सस्तो कुराकानी हो।',
    },
    detailsHeading: { en: 'Company details', ne: 'कम्पनी विवरण' },
    address: { en: 'Address', ne: 'ठेगाना' },
    detailsNote: {
      en: 'Details marked “to be confirmed” are intentionally left blank rather than filled with invented figures. They will be published once verified.',
      ne: '“पुष्टि हुन बाँकी” भनिएका विवरण जानाजान खाली छोडिएका हुन्, मनगढन्ते आँकडाले भरिएका होइनन्। प्रमाणित भएपछि प्रकाशित गरिनेछ।',
    },
    howWeWork: { en: 'How we work', ne: 'हामी कसरी काम गर्छौं' },
    visiting: { en: 'Visiting the workshop', ne: 'कारखाना भ्रमण' },
    visitingText: {
      en: 'Machines can be seen and run at the workshop in {locality}. Bring your crop sample if you can — it makes the sieve and drum setting decision straightforward.',
      ne: '{locality} स्थित कारखानामा मेसिन हेर्न र चलाउन सकिन्छ। सम्भव भए बालीको नमुना ल्याउनुहोस् — यसले चल्नी र ड्रम सेटिङको निर्णय सजिलो बनाउँछ।',
    },
    callBefore: { en: 'Call before visiting', ne: 'भ्रमण गर्नुअघि फोन गर्नुहोस्' },
  },
  /* ---- Home page --------------------------------------------------------- */
  home: {
    webSiteDescription: {
      en: 'Agricultural machinery manufacturer and supplier specialising in thresher machines for Nepal.',
      ne: 'नेपालमा थ्रेसर मेसिनका लागि कृषि मेसिनरी निर्माता र आपूर्तिकर्ता।',
    },
    itemListName: { en: 'Thresher machine range', ne: 'थ्रेसर मेसिन रेन्ज' },
    rangeEyebrow: { en: 'Thresher range', ne: 'थ्रेसर रेन्ज' },
    rangeTitle: { en: 'Built for the Harvest', ne: 'कटनीका लागि निर्मित' },
    rangeLead: {
      en: 'Three frame sizes covering smallholdings through to commercial and custom-hiring work — every model priced at Rs. 360,000.',
      ne: 'सानो जोतदेखि व्यावसायिक र भाडामा दिने कामसम्मका लागि तीन आकारका फ्रेम — हरेक मोडेलको मूल्य रु. ३,६०,०००।',
    },
    galleryEyebrow: { en: 'Gallery', ne: 'ग्यालरी' },
    galleryTitle: { en: 'Machines, components and field work', ne: 'मेसिन, भागहरू र खेतको काम' },
    galleryLead: {
      en: 'Assembled machines, sub-assemblies, workshop work and machines in use during harvest.',
      ne: 'जडान गरिएका मेसिन, उप-भागहरू, कारखानाको काम र कटनीमा प्रयोग हुँदै गरेका मेसिनहरू।',
    },
  },

  /* ---- Products (threshers) listing page --------------------------------- */
  products: {
    itemListName: { en: 'Thresher machines', ne: 'थ्रेसर मेसिनहरू' },
    eyebrow: { en: 'Thresher range', ne: 'थ्रेसर रेन्ज' },
    title: { en: 'Thresher machines for Nepali farms', ne: 'नेपाली खेतका लागि थ्रेसर मेसिन' },
    lead: {
      en: 'Every model is a belt-driven machine with a rasp-bar drum, adjustable concave and blower cleaning — and every model is Rs. 360,000. What changes between models is the frame size and the crops it is set up for.',
      ne: 'हरेक मोडेल रास्प-बार ड्रम, समायोज्य कन्केभ र ब्लोअर सफाईसहित बेल्ट-ड्राइभ मेसिन हो — र हरेक मोडेलको मूल्य रु. ३,६०,००० हो। मोडेलबीच फरक पर्ने भनेको फ्रेमको आकार र तय गरिएका बाली हुन्।',
    },
    filterLabel: { en: 'Filter by crop', ne: 'बाली अनुसार छान्नुहोस्' },
    countOne: { en: '{n} machine', ne: '{n} मेसिन' },
    countMany: { en: '{n} machines', ne: '{n} मेसिन' },
    clear: { en: 'Clear', ne: 'हटाउनुहोस्' },
    allCrops: { en: 'All crops', ne: 'सबै बाली' },
    noMatchTitle: { en: 'No machine matches that combination', ne: 'यो संयोजनसँग मिल्ने मेसिन भेटिएन' },
    noMatchText: {
      en: 'Tell us the crop and the work you have in mind — machines are set up to order, so an unusual combination is usually possible.',
      ne: 'तपाईंले सोचेको बाली र काम हामीलाई बताउनुहोस् — मेसिन अर्डर अनुसार तयार पारिन्छ, त्यसैले असामान्य संयोजन पनि सम्भव हुन्छ।',
    },
    askConfig: { en: 'Ask about a configuration', ne: 'कन्फिगरेसनबारे सोध्नुहोस्' },
    chooseEyebrow: { en: 'Choosing a machine', ne: 'मेसिन छनोट' },
    chooseTitle: { en: 'Three questions decide the model', ne: 'तीन प्रश्नले मोडेल निर्धारण गर्छ' },
    chooseLead: {
      en: 'Your harvest sets the pace, the crop sets the sieve, and every model in the range is Rs. 360,000.',
      ne: 'तपाईंको कटनीले गति निर्धारण गर्छ, बालीले चल्नी निर्धारण गर्छ, र रेन्जको हरेक मोडेलको मूल्य रु. ३,६०,००० हो।',
    },
    q1Title: { en: 'How much crop, and how fast?', ne: 'कति बाली, कति छिटो?' },
    q1Text: {
      en: 'A household threshing a few bigha needs a different machine from a custom-hiring operator covering several villages in one season.',
      ne: 'केही बिघा मात्र थ्रेसिङ गर्ने घरपरिवारलाई चाहिने मेसिन र एकै सिजनमा धेरै गाउँ ओगट्ने भाडाको सञ्चालकलाई चाहिने मेसिन फरक हुन्छ।',
    },
    q2Title: { en: 'Which crops, in which order?', ne: 'कुन बाली, कुन क्रममा?' },
    q2Text: {
      en: 'Paddy, wheat and maize need different sieve and drum settings. Machines re-set between crops are quoted with the extra sieve set.',
      ne: 'धान, गहुँ र मकैलाई फरक चल्नी र ड्रम सेटिङ चाहिन्छ। बाली फेर्दा पुनः सेट गरिने मेसिनको मूल्य अतिरिक्त चल्नी सेटसहित हुन्छ।',
    },
    q3Title: { en: 'What does it cost?', ne: 'यसको खर्च कति?' },
    q3Text: {
      en: 'Every model in the range is Rs. 360,000, and accessories are quoted separately with your order.',
      ne: 'रेन्जको हरेक मोडेलको मूल्य रु. ३,६०,००० हो, र सहायक उपकरणको मूल्य तपाईंको अर्डरसँगै छुट्टै हुन्छ।',
    },
  },
  /* ---- Product detail page ----------------------------------------------- */
  productDetails: {
    notFoundEyebrow: { en: 'Not found', ne: 'भेटिएन' },
    notFoundTitle: { en: 'That machine is not in the catalogue', ne: 'त्यो मेसिन सूचीमा छैन' },
    notFoundText: {
      en: 'The model you followed may have been renamed or replaced. The current range is listed under Threshers.',
      ne: 'तपाईंले खोल्नुभएको मोडेलको नाम परिवर्तन वा प्रतिस्थापन भएको हुन सक्छ। हालको रेन्ज “थ्रेसरहरू” अन्तर्गत राखिएको छ।',
    },
    
    eyebrowTemplate: { en: '{category} thresher', ne: '{category} थ्रेसर' },
    mediaNote: {
      en: 'Rotate the machine, open the exploded view to see how the assemblies separate, or step through the photographs. Specifications are listed further down this page.',
      ne: 'मेसिन घुमाउनुहोस्, भागहरू कसरी छुट्टिन्छन् हेर्न पार्ट्स छुट्ट्याइएको दृश्य खोल्नुहोस्, वा तस्बिरहरू हेर्नुहोस्। प्राविधिक विवरण यही पृष्ठमा तल सूचीबद्ध छ।',
    },
    overviewEyebrow: { en: 'Overview', ne: 'सिंहावलोकन' },
    overviewTitle: { en: 'What this machine is for', ne: 'यो मेसिन कसका लागि हो' },
    applications: { en: 'Applications', ne: 'प्रयोग क्षेत्र' },
    price: { en: 'Price', ne: 'मूल्य' },
    priceNote: { en: 'The same fixed price for every model in the range.', ne: 'रेन्जको हरेक मोडेलको मूल्य एउटै तय भएको छ।' },
    compatibleCrops: { en: 'Compatible crops', ne: 'अनुकूल बाली' },
    accessories: { en: 'Available accessories', ne: 'उपलब्ध सहायक उपकरण' },
    accessoriesNote: {
      en: 'Accessories are quoted per machine. Ask for the list with the current prices when you request a quotation.',
      ne: 'सहायक उपकरणको मूल्य प्रति मेसिन फरक हुन्छ। मूल्य जानकारी माग्दा हालको मूल्यसहितको सूची सोध्नुहोस्।',
    },
    glanceEyebrow: { en: 'At a glance', ne: 'एकै नजरमा' },
    glanceTitle: { en: 'Key Features & Benefits', ne: 'मुख्य विशेषता र फाइदा' },
    glanceLead: {
      en: 'The six practical points that matter in the field — from the fan and the throw distance to speed, safety, warranty and easy bearing service.',
      ne: 'खेतमा महत्त्वपूर्ण छ व्यावहारिक बुँदा — फन र फाल्ने दूरीदेखि गति, सुरक्षा, वारेन्टी र सजिलो बेयरिङ सेवासम्म।',
    },
    specEyebrow: { en: 'Technical specifications', ne: 'प्राविधिक विवरण' },
    specTitleTemplate: { en: '{code} specification table', ne: '{code} को विवरण तालिका' },
    specLead: {
      en: 'Construction, drive, crops and dimensions for this model. Values marked as samples are placeholders until the machine data is confirmed.',
      ne: 'यो मोडेलको निर्माण, ड्राइभ, बाली र आकार। नमुना भनिएका मानहरू मेसिनको विवरण पुष्टि नहुन्जेल अस्थायी हुन्।',
    },
    dimensionsWeight: { en: 'Dimensions & weight', ne: 'आकार र तौल' },
    warrantyService: { en: 'Warranty & service', ne: 'वारेन्टी र सेवा' },
    warrantyText: {
      en: 'Warranty terms are stated in the quotation for each machine. Service and spare parts are handled from Jhapa Gaupalika, Jhapa.',
      ne: 'वारेन्टीका सर्तहरू प्रत्येक मेसिनको कोटेसनमा उल्लेख हुन्छन्। सेवा र स्पेयर पार्ट्स झापा गाउँपालिका, झापाबाट व्यवस्थापन गरिन्छ।',
    },
    askWarranty: { en: 'Ask about warranty', ne: 'वारेन्टीबारे सोध्नुहोस्' },
    alsoEyebrow: { en: 'Also in the range', ne: 'रेन्जमा अन्य' },
    alsoTitle: { en: 'Other models to compare', ne: 'तुलना गर्न अन्य मोडेल' },
    alsoLead: {
      en: 'Every model is the same price, so the choice is only about which frame suits the work.',
      ne: 'हरेक मोडेलको मूल्य एउटै भएकाले छनोट भनेको कुन फ्रेम कामका लागि उपयुक्त हुन्छ भन्नेमा मात्र हो।',
    },
  },

  /* ---- Gallery page ------------------------------------------------------ */
  galleryPage: {
    jsonLdName: { en: '{site} gallery', ne: '{site} ग्यालरी' },
    eyebrow: { en: 'Gallery', ne: 'ग्यालरी' },
    title: { en: 'Machines, components and field work', ne: 'मेसिन, भागहरू र खेतको काम' },
    lead: {
      en: 'Assembled machines, sub-assemblies, workshop work and machines in use during harvest. Filter by category — open any image for the full view.',
      ne: 'जडान गरिएका मेसिन, उप-भागहरू, कारखानाको काम र कटनीमा प्रयोग हुँदै गरेका मेसिनहरू। कोटी अनुसार छान्नुहोस् — पूरा दृश्यका लागि कुनै पनि तस्बिर खोल्नुहोस्।',
    },
    note: {
      en: 'These are photographs of threshing work and of the machines themselves, taken in the field and on the yard. Machine names in the captions are the brands visible on the bodywork in each photo.',
      ne: 'यी कटनीको काम र आफैं मेसिनहरूका तस्बिर हुन्, खेत र आँगनमा खिचिएका। क्याप्सनमा उल्लेख मेसिनका नामहरू प्रत्येक तस्बिरमा बडीवर्कमा देखिने ब्रान्ड हुन्।',
    },
  },

  /* ---- Contact page ------------------------------------------------------ */
  contactPage: {
    eyebrow: { en: 'Contact', ne: 'सम्पर्क' },
    title: { en: 'Thresher sales, specifications and support', ne: 'थ्रेसर बिक्री, विवरण र सहयोग' },
    lead: {
      en: 'Based in {locality}, {district}, serving farmers, cooperatives and agri-businesses across eastern Nepal. Call, email, or send the form below with the details of your harvest.',
      ne: '{locality}, {district} मा अवस्थित — पूर्वी नेपालका किसान, सहकारी र कृषि व्यवसायलाई सेवा। फोन, इमेल गर्नुहोस्, वा तपाईंको कटनीको विवरणसहित तलको फारम पठाउनुहोस्।',
    },
    callWorkshop: { en: 'Call the workshop', ne: 'कारखानामा फोन गर्नुहोस्' },
  },
  /* ---- Why-us page ------------------------------------------------------- */
  whyUsPage: {
    faqQuestion: {
      en: 'Why buy a thresher from Daju Bhai Grill Udyog?',
      ne: 'दाजु भाइ ग्रिल उद्योगबाट थ्रेसर किन किन्ने?',
    },
    faqAnswer: {
      en: 'Machines are configured to your crop, land size and available power; wear parts are replaceable items; the belt drive is simple to maintain; and service is local to Jhapa.',
      ne: 'मेसिन तपाईंको बाली, जमिनको आकार र उपलब्ध शक्तिअनुसार कन्फिगर गरिन्छ; घस्ने भागहरू फेर्न मिल्ने हुन्छन्; बेल्ट ड्राइभ मर्मत गर्न सजिलो छ; र सेवा झापामै उपलब्ध छ।',
    },
    eyebrow: { en: 'Why choose us', ne: 'किन हामीलाई छान्नुहोस्' },
    title: { en: 'Practical reasons to buy from us', ne: 'हामीसँग किन्नुका व्यावहारिक कारण' },
    lead: {
      en: 'No claims we cannot back up — these are the things that matter when a machine has to work through the whole season.',
      ne: 'प्रमाण दिन नसकिने दाबी होइन — मेसिनले पूरा सिजन काम गर्नुपर्दा महत्त्वपूर्ण हुने कुराहरू यी हुन्।',
    },
  },

  /* ---- 404 / error states ------------------------------------------------ */
  notFound: {
    eyebrow: { en: 'Error 404', ne: 'त्रुटि ४०४' },
    title: { en: 'This page is not in the workshop', ne: 'यो पृष्ठ कारखानामा छैन' },
    text: {
      en: 'The link may be out of date. The thresher lineup and our contact details are always one click away.',
      ne: 'लिंक पुरानो हुन सक्छ। थ्रेसर लाइनअप र हाम्रो सम्पर्क विवरण सधैं एक क्लिकको दूरीमा छ।',
    },
    viewThreshers: { en: 'View threshers', ne: 'थ्रेसरहरू हेर्नुहोस्' },
  },
  error: {
    eyebrow: { en: 'Something went wrong', ne: 'केही त्रुटि भयो' },
    title: { en: 'The page could not be displayed', ne: 'पृष्ठ देखाउन सकिएन' },
    text: {
      en: 'Please reload the page, or contact {name} on {phone}.',
      ne: 'कृपया पृष्ठ पुनः लोड गर्नुहोस्, वा {name} लाई {phone} मा सम्पर्क गर्नुहोस्।',
    },
  },
  /* ---- Document <title> / meta description per route --------------------- */
  meta: {
    home: {
      title: {
        en: 'Affordable Thresher Price in Nepal — Jhapa',
        ne: 'झापामा किफायती थ्रेसर मूल्य — नेपाल',
      },
      description: {
        en: 'Looking for an affordable thresher in Jhapa, Nepal? Daju Bhai Grill Udyog offers rice, wheat and maize threshers at Rs. 360,000 per model. Call 9825943105.',
        ne: 'झापा, नेपालमा किफायती थ्रेसर खोज्दै हुनुहुन्छ? दाजु भाइ ग्रिल उद्योगमा धान, गहुँ र मकै थ्रेसर प्रति मोडेल रु. ३,६०,००० मा। ९८२५९४३१०५ मा फोन गर्नुहोस्।',
      },
    },
    products: {
      title: { en: 'Thresher Price in Nepal — Rice, Wheat & Maize', ne: 'नेपालमा थ्रेसरको मूल्य — धान, गहुँ र मकै' },
      description: {
        en: 'Compare rice, wheat and multi-crop threshers from Jhapa, Nepal. Every listed model costs Rs. 360,000. Contact Daju Bhai Grill Udyog to check availability.',
        ne: 'झापा, नेपालका धान, गहुँ र बहुबाली थ्रेसर तुलना गर्नुहोस्। सूचीमा रहेका हरेक मोडेलको मूल्य रु. ३,६०,००० हो। उपलब्धता बुझ्न दाजु भाइ ग्रिल उद्योगमा सम्पर्क गर्नुहोस्।',
      },
    },
    product: {
      title: {
        en: '{code} Thresher for Sale in Jhapa',
        ne: '{code} थ्रेसर — झापामा बिक्रीका लागि',
      },
      description: {
        en: 'Affordable {code} thresher in Jhapa, Nepal: {price}. Call Daju Bhai Grill Udyog on {phone} to confirm availability and details.',
        ne: 'झापा, नेपालमा {code} थ्रेसरको मूल्य {price}। उपलब्धता र विवरण पुष्टि गर्न दाजु भाइ ग्रिल उद्योगमा {phone} मा फोन गर्नुहोस्।',
      },
      fallbackTitle: { en: 'Thresher machine', ne: 'थ्रेसर मेसिन' },
      fallbackDescription: {
        en: 'Thresher machines from Daju Bhai Grill Udyog, Jhapa Gaupalika, Jhapa, Nepal.',
        ne: 'दाजु भाइ ग्रिल उद्योग, झापा गाउँपालिका, झापा, नेपालबाट थ्रेसर मेसिनहरू।',
      },
    },
    about: {
      title: { en: 'About Us — Agricultural Machinery in Jhapa', ne: 'हाम्रोबारे — झापामा कृषि मेसिनरी' },
      description: {
        en: 'Daju Bhai Grill Udyog builds and supplies thresher machines for Nepali farms from Jhapa Gaupalika, Jhapa. Practical engineering, replaceable wear parts and local service.',
        ne: 'दाजु भाइ ग्रिल उद्योगले झापा गाउँपालिका, झापाबाट नेपाली खेतका लागि थ्रेसर मेसिन निर्माण र वितरण गर्छ। व्यावहारिक इन्जिनियरिङ, फेर्न मिल्ने घिसिने भाग र स्थानीय सेवा।',
      },
    },
    whyUs: {
      title: { en: 'Why Us — Practical Reasons to Buy a Thresher From Us', ne: 'किन हामी — हामीसँग थ्रेसर किन्नुका व्यावहारिक कारण' },
      description: {
        en: 'Efficient crop processing, replaceable wear parts, belt drive simplicity, local service in Jhapa and configuration to your crop and power source — the practical reasons to buy a thresher from Daju Bhai Grill Udyog.',
        ne: 'प्रभावकारी बाली प्रशोधन, फेर्न मिल्ने घिसिने भाग, सरल बेल्ट ड्राइभ, झापामा स्थानीय सेवा र तपाईंको बाली र शक्तिस्रोत अनुसार कन्फिगरेसन — दाजु भाइ ग्रिल उद्योगसँग थ्रेसर किन्नुका व्यावहारिक कारण।',
      },
    },
    gallery: {
      title: { en: 'Gallery — Threshers, Workshop and Field Work in Jhapa', ne: 'ग्यालरी — झापामा थ्रेसर, कारखाना र खेतको काम' },
      description: {
        en: 'Photos of assembled thresher machines, sub-assemblies, workshop fabrication and threshing work in the fields around Jhapa, Nepal.',
        ne: 'झापा, नेपाल वरपरका खेतमा जडान गरिएका थ्रेसर मेसिन, उप-भागहरू, कारखानाको निर्माण र थ्रेसिङ कामका तस्बिरहरू।',
      },
    },
    contact: {
      title: { en: 'Contact — Thresher Sales & Support in Jhapa', ne: 'सम्पर्क — झापामा थ्रेसर बिक्री र सहयोग' },
      description: {
        en: 'Contact Daju Bhai Grill Udyog about thresher pricing, crop compatibility and availability. Call {phone}, send a WhatsApp message or use the inquiry form. Jhapa Gaupalika, Jhapa, Nepal.',
        ne: 'थ्रेसरको मूल्य, बाली अनुकूलता र उपलब्धताबारे दाजु भाइ ग्रिल उद्योगलाई सम्पर्क गर्नुहोस्। {phone} मा फोन गर्नुहोस्, व्हाट्सएप सन्देश पठाउनुहोस् वा जिज्ञासा फारम प्रयोग गर्नुहोस्। झापा गाउँपालिका, झापा, नेपाल।',
      },
    },
    notFound: {
      title: { en: 'Page not found', ne: 'पृष्ठ भेटिएन' },
      description: {
        en: 'The page you were looking for does not exist. Browse the thresher range or contact Daju Bhai Grill Udyog in Jhapa Gaupalika, Jhapa.',
        ne: 'तपाईंले खोज्नुभएको पृष्ठ अवस्थित छैन। थ्रेसर रेन्ज हेर्नुहोस् वा झापा गाउँपालिका, झापास्थित दाजु भाइ ग्रिल उद्योगलाई सम्पर्क गर्नुहोस्।',
      },
    },
  },
}
