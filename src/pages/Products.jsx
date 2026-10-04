import { useMemo, useState } from 'react'
import { ArrowRight, RotateCcw } from 'lucide-react'
import { useCropFilters, useLanguage, useProducts, useSampleNotice, useSite } from '../i18n'
import { useSeo, localBusinessSchema } from '../hooks/useSeo'
import PageHeader from '../components/ui/PageHeader'
import ProductCard from '../components/ProductCard'
import Button from '../components/ui/Button'
import Reveal from '../components/ui/Reveal'
import SectionHeading from '../components/ui/SectionHeading'
import CTASection from '../components/CTASection'

/**
 * Products (Threshers)
 * ---------------------------------------------------------------------------
 * The full range with a crop filter. Filter options are derived from
 * the catalogue in src/data/products.js, so a new machine shows up in the
 * filters as soon as it is added to the data file.
 */

const CHIP = 'rounded-[2px] border px-3 py-2 text-2xs font-semibold uppercase tracking-technical transition-colors'
const CHIP_OFF = 'border-ink/15 text-ink/60 hover:border-ink/40 hover:text-ink'
const CHIP_ON = 'border-ink bg-ink text-sand-50'

export default function Products() {
  const { t } = useLanguage()
  const site = useSite()
  const products = useProducts()
  const cropFilters = useCropFilters()
  const sampleNotice = useSampleNotice()
  // The selected filter is tracked by position (0 = all crops) so it survives
  // a language switch, where both the filter labels and the crop names change.
  const [cropIndex, setCropIndex] = useState(0)
  const crop = cropFilters[cropIndex] ?? cropFilters[0]

  useSeo({
    title: t('meta.products.title'),
    description: t('meta.products.description'),
    path: '/threshers',
    jsonLd: [
      localBusinessSchema(),
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: t('products.itemListName'),
        itemListElement: products.map((product, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: `${product.code} ${product.name}`,
          url: `${site.url}/threshers/${product.slug}`,
        })),
      },
    ],
  })

  const filtered = useMemo(
    () =>
      products.filter(
        (product) => cropIndex === 0 || product.crops.includes(crop),
      ),
    [products, cropIndex, crop],
  )

  const isFiltered = cropIndex !== 0

  const filterGroups = [{ label: t('products.filterLabel'), options: cropFilters }]

  return (
    <>
      <PageHeader
        eyebrow={t('products.eyebrow')}
        title={t('products.title')}
        lead={t('products.lead')}
        breadcrumb={[{ label: t('nav.home'), to: '/' }, { label: t('nav.threshers') }]}
        action={
          <Button to="/contact#inquiry" variant="accent" size="lg">
            {t('common.requestQuote')}
          </Button>
        }
      />

      <section className="section">
        <div className="shell">
          <div className="flex flex-col gap-6 border-b border-ink/10 pb-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex flex-1 flex-col gap-5 sm:flex-row sm:gap-8">
              {filterGroups.map((group) => (
                <div key={group.label}>
                  <p className="tech-label mb-2">{group.label}</p>
                  <div className="flex flex-wrap gap-2">
                    {group.options.map((option, optionIndex) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setCropIndex(optionIndex)}
                        aria-pressed={optionIndex === cropIndex}
                        className={`${CHIP} ${optionIndex === cropIndex ? CHIP_ON : CHIP_OFF}`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <p className="tabular text-2xs uppercase tracking-technical text-ink/45">
                {t(filtered.length === 1 ? 'products.countOne' : 'products.countMany', {
                  n: String(filtered.length).padStart(2, '0'),
                })}
              </p>
              {isFiltered ? (
                <button
                  type="button"
                  onClick={() => {
                    setCropIndex(0)
                  }}
                  className="flex items-center gap-2 text-2xs font-semibold uppercase tracking-technical text-ink/60 transition-colors hover:text-ink"
                >
                  <RotateCcw size={13} />
                  {t('products.clear')}
                </button>
              ) : null}
            </div>
          </div>

          {filtered.length > 0 ? (
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          ) : (
            <div className="mt-10 border border-ink/10 bg-paper p-8 text-center">
              <p className="font-display text-lg font-bold">{t('products.noMatchTitle')}</p>
              <p className="mx-auto mt-2 max-w-lg text-sm text-ink/65">
                {t('products.noMatchText')}
              </p>
              <Button to="/contact#inquiry" variant="primary" size="sm" className="mt-5">
                {t('products.askConfig')}
              </Button>
            </div>
          )}

          <Reveal variant="fade" className="mt-8">
            <p className="max-w-3xl text-xs leading-relaxed text-ink/50">{sampleNotice}</p>
          </Reveal>

          <div className="mt-16 border-t border-ink/10 pt-14">
            <SectionHeading
              eyebrow={t('products.chooseEyebrow')}
              title={t('products.chooseTitle')}
              lead={t('products.chooseLead')}
              action={
                <Button to="/contact#inquiry" variant="outline" size="sm">
                  {t('common.talkToUs')}
                  <ArrowRight size={15} />
                </Button>
              }
            />

            <div className="mt-10 grid gap-px overflow-hidden border border-ink/10 bg-ink/10 sm:grid-cols-3">
              {[
                { title: t('products.q1Title'), text: t('products.q1Text') },
                { title: t('products.q2Title'), text: t('products.q2Text') },
                { title: t('products.q3Title'), text: t('products.q3Text') },
              ].map((item, index) => (
                <Reveal key={item.title} variant="fade" delay={index * 0.06} className="bg-paper p-6">
                  <span className="tabular text-2xs text-ink/30">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-3 font-display text-base font-bold">{item.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-ink/65">{item.text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  )
}
