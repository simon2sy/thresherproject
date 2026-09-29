import { useMemo, useState } from 'react'
import { ArrowRight, RotateCcw } from 'lucide-react'
import { cropFilters, products, SAMPLE_NOTICE } from '../data/products'
import { useSeo, localBusinessSchema } from '../hooks/useSeo'
import { site } from '../config/site'
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
  const [crop, setCrop] = useState('All crops')

  useSeo({
    title: 'Thresher Machines — Rice, Wheat & Maize Threshers in Nepal',
    description:
      'Explore the thresher range from Daju Bhai Grill Udyog, Jhapa Gaupalika: heavy-duty grain threshers, multi-crop threshers and compact farm threshers — every model Rs. 360,000.',
    path: '/threshers',
    jsonLd: [
      localBusinessSchema(),
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Thresher machines',
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
      products.filter((product) => crop === 'All crops' || product.crops.includes(crop)),
    [crop],
  )

  const isFiltered = crop !== 'All crops'

  const filterGroups = [
    { label: 'Filter by crop', value: crop, set: setCrop, options: cropFilters },
  ]

  return (
    <>
      <PageHeader
        eyebrow="Thresher range"
        title="Thresher machines for Nepali farms"
        lead="Every model is a belt-driven machine with a rasp-bar drum, adjustable concave and blower cleaning — and every model is Rs. 360,000. What changes between models is the frame size and the crops it is set up for."
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Threshers' }]}
        action={
          <Button to="/contact#inquiry" variant="accent" size="lg">
            Request a Quote
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
                    {group.options.map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => group.set(option)}
                        aria-pressed={group.value === option}
                        className={`${CHIP} ${group.value === option ? CHIP_ON : CHIP_OFF}`}
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
                {String(filtered.length).padStart(2, '0')} machine
                {filtered.length === 1 ? '' : 's'}
              </p>
              {isFiltered ? (
                <button
                  type="button"
                  onClick={() => {
                    setCrop('All crops')
                  }}
                  className="flex items-center gap-2 text-2xs font-semibold uppercase tracking-technical text-ink/60 transition-colors hover:text-ink"
                >
                  <RotateCcw size={13} />
                  Clear
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
            <div className="mt-10 border border-ink/12 bg-paper p-8 text-center">
              <p className="font-display text-lg font-bold">No machine matches that combination</p>
              <p className="mx-auto mt-2 max-w-lg text-sm text-ink/65">
                Tell us the crop and the work you have in mind — machines are set up to order, so
                an unusual combination is usually possible.
              </p>
              <Button to="/contact#inquiry" variant="primary" size="sm" className="mt-5">
                Ask about a configuration
              </Button>
            </div>
          )}

          <Reveal variant="fade" className="mt-8">
            <p className="max-w-3xl text-xs leading-relaxed text-ink/50">{SAMPLE_NOTICE}</p>
          </Reveal>

          <div className="mt-16 border-t border-ink/10 pt-14">
            <SectionHeading
              eyebrow="Choosing a machine"
              title="Three questions decide the model"
              lead="Your harvest sets the pace, the crop sets the sieve, and every model in the range is Rs. 360,000."
              action={
                <Button to="/contact#inquiry" variant="outline" size="sm">
                  Talk to us
                  <ArrowRight size={15} />
                </Button>
              }
            />

            <div className="mt-10 grid gap-px overflow-hidden border border-ink/12 bg-ink/12 sm:grid-cols-3">
              {[
                {
                  title: 'How much crop, and how fast?',
                  text: 'A household threshing a few bigha needs a different machine from a custom-hiring operator covering several villages in one season.',
                },
                {
                  title: 'Which crops, in which order?',
                  text: 'Paddy, wheat and maize need different sieve and drum settings. Machines re-set between crops are quoted with the extra sieve set.',
                },
                {
                  title: 'What does it cost?',
                  text: 'Every model in the range is Rs. 360,000, and accessories are quoted separately with your order.',
                },
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
