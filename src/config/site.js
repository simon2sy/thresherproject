/**
 * ---------------------------------------------------------------------------
 * SINGLE SOURCE OF TRUTH FOR THE COMPANY IDENTITY
 * ---------------------------------------------------------------------------
 * This is the *temporary* identity supplied for the build. To rebrand the whole
 * website (header, footer, contact page, SEO schema, WhatsApp link) change the
 * values here — or better, set the matching VITE_* variables in `.env.local`
 * (see `.env.example`) and leave this file untouched.
 *
 * Nothing in this file is JSX, so it stays pure data and can be imported by
 * plain JavaScript modules, Node scripts or a future CMS adapter.
 */

const env = import.meta.env || {}

const envOr = (value, fallback) => (value && String(value).trim() !== '' ? String(value).trim() : fallback)

const PLACEHOLDER = {
  /** Confirmed contact: phone only — no public email address has been supplied yet. */
  phoneDisplay: '9825943105',
  phoneHref: '9825943105',
  email: '',
}

export const site = {
  name: envOr(env.VITE_COMPANY_NAME, 'Daju Bhai Grill Udyog'),
  shortName: envOr(env.VITE_COMPANY_SHORT_NAME, 'DAJU BHAI GRILL UDYOG'),
  tagline: envOr(env.VITE_COMPANY_TAGLINE, 'Agricultural Machinery & Thresher Solutions'),
  /** Used in the footer copyright line. */
  legalName: 'Daju Bhai Grill Udyog',
  /** Owner of the business. */
  proprietor: 'Dulal Shiekh',

  url: envOr(env.VITE_SITE_URL, 'https://www.shresthaagromachines.com'),

  /* ---- Contact -------------------------------------------------------- */
  phone: {
    display: envOr(env.VITE_COMPANY_PHONE, PLACEHOLDER.phoneDisplay),
    href: `tel:${envOr(env.VITE_COMPANY_PHONE_HREF, PLACEHOLDER.phoneHref)}`,
    /** Confirmed contact number — hides the "example number" note. */
    isPlaceholder: false,
  },
  /**
   * No public email address yet: `display` stays empty and every render site
   * hides the row instead of showing a made-up address.
   */
  email: {
    display: envOr(env.VITE_COMPANY_EMAIL, PLACEHOLDER.email),
    href: `mailto:${envOr(env.VITE_COMPANY_EMAIL, PLACEHOLDER.email)}`,
  },
  whatsapp: {
    /** International format, digits only. */
    number: envOr(env.VITE_WHATSAPP_NUMBER, '9779825943105'),
    get href() {
      return `https://wa.me/${this.number}`
    },
  },

  /* ---- Location ------------------------------------------------------- */
  address: {
    line1: 'Jhapa Gaupalika',
    line2: 'Jhapa',
    locality: 'Jhapa Gaupalika',
    district: 'Jhapa',
    province: 'Province No. 1',
    postalCode: '57204',
    country: 'Nepal',
    countryCode: 'NP',
    /** Approximate Jhapa district coordinates — replace with the exact workshop location. */
    lat: '26.6389',
    lng: '88.0896',
    get full() {
      return `${this.line1}, ${this.line2}, ${this.country}`
    },
    /** Address string used in the map panel / Google Maps embed. */
    mapsQuery: envOr(env.VITE_MAPS_QUERY, 'Jhapa Gaupalika, Jhapa, Nepal'),
  },

  /** Opening hours shown on the contact page. Adjust to the real workshop schedule. */
  hours: [
    { days: 'Sunday – Friday', time: '8:00 AM – 7:00 PM' },
    { days: 'Saturday', time: 'By appointment' },
  ],

  /**
   * Location map. `embedUrl` is the only thing needed to switch from the styled
   * placeholder to the real map: paste the `src` from the Google Maps
   * "Share → Embed a map" dialog into VITE_MAPS_EMBED_URL.
   */
  map: {
    embedUrl: envOr(env.VITE_MAPS_EMBED_URL, ''),
    query: envOr(env.VITE_MAPS_QUERY, 'Jhapa Gaupalika, Jhapa, Nepal'),
    get directionsUrl() {
      return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(this.query)}`
    },
  },

  /** Placeholder social profiles — swap the href values for the real pages. */
  socials: [
    { label: 'Facebook', icon: 'facebook', href: '#' },
    { label: 'Instagram', icon: 'instagram', href: '#' },
    { label: 'YouTube', icon: 'youtube', href: '#' },
    { label: 'TikTok', icon: 'tiktok', href: '#' },
  ],

  /**
   * Values that are not yet confirmed. They are rendered as explicit
   * placeholders in the interface instead of invented claims.
   */
  unconfirmed: {
    established: 'Year of establishment — to be confirmed',
    workshopSize: 'Workshop & service capacity — to be confirmed',
    certifications: 'Certifications & registrations — to be confirmed',
  },
}

/** Primary navigation. `end` marks a route that should only match exactly. */
export const navLinks = [
  { label: 'Home', to: '/', end: true },
  { label: 'Threshers', to: '/threshers' },
  { label: 'About', to: '/about' },
  { label: 'Why Us', to: '/why-us' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Contact', to: '/contact' },
]

/** Feature switches — also driven by environment variables. */
export const flags = {
  /** Master switch for the WebGL thresher presentation. */
  enable3D: envOr(env.VITE_ENABLE_3D, 'true') !== 'false',
  /** Endpoint the inquiry form posts to. Empty string = local demo mode. */
  inquiryEndpoint: envOr(env.VITE_INQUIRY_ENDPOINT, ''),
}

export default site
