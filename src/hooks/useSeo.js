import { useEffect } from 'react'
import { site as englishSite } from '../config/site'
import { useSite } from '../i18n'

/**
 * Minimal dependency-free document head manager.
 *
 * Keeps the SPA SEO-friendly: title, description, canonical, robots, Open
 * Graph / Twitter tags and JSON-LD structured data are all replaced per route.
 * The static values in `index.html` act as the crawlable fallback.
 *
 * Titles/descriptions are passed in already localised by the calling page
 * (typically `t('meta.<route>.title')`), so switching language re-runs this
 * hook and the whole head follows.
 *
 * @param {object} seo
 * @param {string} seo.title        full <title> (site name appended when omitted)
 * @param {string} seo.description  meta description
 * @param {string} seo.path         route path used to build the canonical URL
 * @param {string} [seo.image]      social share image (absolute path or URL)
 * @param {string} [seo.type]       og:type, defaults to 'website'
 * @param {string} [seo.robots]     robots directive, defaults to index,follow
 * @param {Array}  [seo.jsonLd]     array of structured-data objects
 */

const SITE_URL = englishSite.url.replace(/\/$/, '')
const DEFAULT_IMAGE = `${SITE_URL}/images/og-cover.jpg`

const absolute = (value) => {
  if (!value) return DEFAULT_IMAGE
  return /^https?:\/\//i.test(value) ? value : `${SITE_URL}${value.startsWith('/') ? '' : '/'}${value}`
}

const upsertMeta = (attr, key, content) => {
  if (!content) return
  let tag = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute(attr, key)
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', content)
}

const upsertLink = (rel, href) => {
  if (!href) return
  let link = document.head.querySelector(`link[rel="${rel}"]`)
  if (!link) {
    link = document.createElement('link')
    link.setAttribute('rel', rel)
    document.head.appendChild(link)
  }
  link.setAttribute('href', href)
}

/** Structured data blocks are keyed so replacing a route's schema is idempotent. */
const upsertJsonLd = (blocks) => {
  const existing = document.head.querySelectorAll('script[data-seo-jsonld]')
  existing.forEach((node) => node.remove())
  blocks.filter(Boolean).forEach((block) => {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.setAttribute('data-seo-jsonld', 'true')
    script.textContent = JSON.stringify(block)
    document.head.appendChild(script)
  })
}

export function useSeo(seo = {}) {
  const site = useSite()
  const {
    title,
    description,
    path = '/',
    image,
    type = 'website',
    robots = 'index, follow',
    jsonLd = [],
  } = seo

  // The dependency list is intentionally flat: every route passes a new object.
  const jsonLdKey = JSON.stringify(jsonLd)
  const fullTitle = title ? `${title} | ${site.name}` : site.name
  const canonical = `${SITE_URL}${path === '/' ? '/' : path.replace(/\/$/, '')}`
  const ogImage = absolute(image || DEFAULT_IMAGE)

  useEffect(() => {
    document.title = fullTitle

    upsertMeta('name', 'description', description)
    upsertMeta('name', 'robots', robots)
    upsertLink('canonical', canonical)

    upsertMeta('property', 'og:type', type)
    upsertMeta('property', 'og:title', fullTitle)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:url', canonical)
    upsertMeta('property', 'og:image', ogImage)
    upsertMeta('property', 'og:site_name', site.name)

    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', fullTitle)
    upsertMeta('name', 'twitter:description', description)
    upsertMeta('name', 'twitter:image', ogImage)

    upsertJsonLd(jsonLd)
  }, [fullTitle, description, robots, canonical, type, ogImage, jsonLdKey, jsonLd])
}

/** Reusable LocalBusiness schema — used on the home and contact routes. */
export const localBusinessSchema = () => ({
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'Store'],
  name: englishSite.name,
  description:
    'Agricultural machinery manufacturer and supplier specialising in thresher machines for paddy, wheat and maize.',
  url: SITE_URL,
  telephone: englishSite.phone.display,
  ...(englishSite.email.display ? { email: englishSite.email.display } : {}),
  priceRange: 'Rs. 360,000',
  image: DEFAULT_IMAGE,
  address: {
    '@type': 'PostalAddress',
    streetAddress: englishSite.address.line1,
    addressLocality: englishSite.address.district,
    addressRegion: `${englishSite.address.district}, ${englishSite.address.province}`,
    postalCode: englishSite.address.postalCode,
    addressCountry: englishSite.address.countryCode,
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: englishSite.address.lat,
    longitude: englishSite.address.lng,
  },
  areaServed: {
    '@type': 'AdministrativeArea',
    name: `${englishSite.address.district}, ${englishSite.address.country}`,
  },
  openingHoursSpecification: englishSite.hours.map((slot) => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek:
      slot.days === 'Saturday'
        ? 'Saturday'
        : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    description: slot.time,
  })),
})

export default useSeo
