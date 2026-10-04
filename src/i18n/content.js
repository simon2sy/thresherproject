/**
 * ---------------------------------------------------------------------------
 * LOCALISED CONTENT RESOLVER
 * ---------------------------------------------------------------------------
 * Bridges the English data modules (src/data/*.js) with the Nepali overrides
 * in ./translations.ne.js and exposes React hooks that return the content for
 * the language currently selected by the LanguageProvider.
 *
 * The English files stay the single source of *structure*; Nepali only
 * overrides the human-readable strings, matched by index (arrays) or by id
 * (thresher parts). When `lang !== 'ne'` the English data is returned untouched,
 * so the English site is byte-for-byte what it was before i18n was added.
 */
import { useMemo } from 'react'
import { useLanguage } from './LanguageContext'
import { strings } from './strings'
import { site as siteConfig } from '../config/site'
import {
  products as enProducts,
  keyFeatures as enKeyFeatures,
  SAMPLE_NOTICE as enSampleNotice,
} from '../data/products'
import { galleryItems as enGalleryItems, galleryCategories as enGalleryCategories } from '../data/gallery'
import {
  whyUs as enWhyUs,
  processSteps as enProcessSteps,
  technicalSpecifications as enTechSpecs,
  fieldContext as enFieldContext,
  ctaSection as enCtaSection,
  aboutStory as enAboutStory,
  qualityNotes as enQualityNotes,
  inquiryOptions as enInquiryOptions,
} from '../data/content'
import { thresherParts as enParts } from '../data/thresherParts'
import { ne } from './translations.ne'

const isNe = (lang) => lang === 'ne'

/* ---- Pure resolvers (also useful outside React, e.g. tests) -------------- */

export function resolveSite(lang) {
  if (!isNe(lang)) return siteConfig
  const address = { ...siteConfig.address, ...ne.site.address }
  return {
    ...siteConfig,
    name: ne.site.name,
    shortName: ne.site.shortName,
    tagline: ne.site.tagline,
    legalName: ne.site.legalName,
    proprietor: ne.site.proprietor,
    hours: ne.site.hours,
    address: {
      ...address,
      get full() {
        return `${this.line1}, ${this.line2}, ${this.country}`
      },
    },
  }
}

export function resolveProducts(lang) {
  if (!isNe(lang)) return enProducts
  return enProducts.map((product, index) => ({ ...product, ...ne.products[index] }))
}

export function resolveKeyFeatures(lang) {
  if (!isNe(lang)) return enKeyFeatures
  return enKeyFeatures.map((feature, index) => ({ ...feature, ...ne.keyFeatures[index] }))
}

export function resolveCropFilters(lang, localizedProducts) {
  const all = strings.products.allCrops[lang] ?? strings.products.allCrops.en
  const crops = [...new Set(localizedProducts.flatMap((product) => product.crops))]
  return [all, ...crops]
}

export function resolveGallery(lang) {
  if (!isNe(lang)) return { categories: enGalleryCategories, items: enGalleryItems }
  const items = enGalleryItems.map((item, index) => ({ ...item, ...ne.galleryItems[index] }))
  const all = strings.gallery.all.ne
  const categories = [all, ...new Set(items.map((item) => item.category))]
  return { categories, items }
}

export function resolveWhyUs(lang) {
  if (!isNe(lang)) return enWhyUs
  return enWhyUs.map((item, index) => ({ ...item, ...ne.content.whyUs[index] }))
}

export function resolveProcessSteps(lang) {
  if (!isNe(lang)) return enProcessSteps
  return enProcessSteps.map((step, index) => ({ ...step, ...ne.content.processSteps[index] }))
}

export function resolveThresherParts(lang) {
  if (!isNe(lang)) return enParts
  return enParts.map((part) => ({ ...part, ...(ne.thresherParts[part.id] || {}) }))
}

/* ---- React hooks ------------------------------------------------------- */

export function useContent() {
  const { lang } = useLanguage()
  return useMemo(() => {
    const products = resolveProducts(lang)
    return {
      site: resolveSite(lang),
      products,
      keyFeatures: resolveKeyFeatures(lang),
      cropFilters: resolveCropFilters(lang, products),
      sampleNotice: isNe(lang) ? ne.sampleNotice : enSampleNotice,
      gallery: resolveGallery(lang),
      whyUs: resolveWhyUs(lang),
      processSteps: resolveProcessSteps(lang),
      technicalSpecifications: isNe(lang)
        ? { ...enTechSpecs, ...ne.content.technicalSpecifications }
        : enTechSpecs,
      fieldContext: isNe(lang)
        ? enFieldContext.map((item, index) => ({ ...item, ...ne.content.fieldContext[index] }))
        : enFieldContext,
      ctaSection: isNe(lang) ? { ...enCtaSection, ...ne.content.ctaSection } : enCtaSection,
      aboutStory: isNe(lang) ? { ...enAboutStory, ...ne.content.aboutStory } : enAboutStory,
      qualityNotes: isNe(lang) ? ne.content.qualityNotes : enQualityNotes,
      inquiryOptions: isNe(lang)
        ? { ...enInquiryOptions, ...ne.content.inquiryOptions }
        : enInquiryOptions,
      thresherParts: resolveThresherParts(lang),
      navLinks: buildNavLinks(lang),
    }
  }, [lang])
}

/** Navigation labels, in order, resolved from the UI string dictionary. */
function buildNavLinks(lang) {
  const keys = ['home', 'threshers', 'about', 'whyUs', 'gallery', 'contact']
  const paths = ['/', '/threshers', '/about', '/why-us', '/gallery', '/contact']
  return keys.map((key, index) => ({
    label: strings.nav[key][lang] ?? strings.nav[key].en,
    to: paths[index],
    end: paths[index] === '/',
  }))
}

export const useSite = () => useContent().site
export const useNavLinks = () => useContent().navLinks
export const useProducts = () => useContent().products
export const useKeyFeatures = () => useContent().keyFeatures
export const useGallery = () => useContent().gallery
export const useWhyUs = () => useContent().whyUs
export const useProcessSteps = () => useContent().processSteps
export const useThresherParts = () => useContent().thresherParts
export const useInquiryOptions = () => useContent().inquiryOptions
export const useCropFilters = () => useContent().cropFilters
export const useSampleNotice = () => useContent().sampleNotice
export const useFieldContext = () => useContent().fieldContext
export const useCtaSection = () => useContent().ctaSection
export const useAboutStory = () => useContent().aboutStory
export const useQualityNotes = () => useContent().qualityNotes
export const useTechnicalSpecifications = () => useContent().technicalSpecifications
