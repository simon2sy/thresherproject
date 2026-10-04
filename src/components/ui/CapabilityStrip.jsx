import { useMemo } from 'react'
import { useLanguage, useProducts } from '../../i18n'
import Counter from './Counter'

/**
 * CapabilityStrip
 * ---------------------------------------------------------------------------
 * The machine facts a visitor wants in the first few seconds: how many models,
 * which crops, the fixed price and the warranty.
 *
 * Every figure is *derived from the catalogue* in src/data/products.js, so the
 * strip can never show an invented statistic — and it updates automatically when
 * real machine data replaces the samples.
 */

/**
 * Reads the warranty term out of a spec string, e.g. "1 year against …" (EN)
 * or "1 वर्ष — निर्माणजन्य त्रुटिविरुद्ध" (NE). Returns `{ unit, count }`.
 */
function parseWarrantyTerm(value = '') {
  const years = value.match(/(\d+)\s*(years?|वर्ष)/i)
  if (years) return { unit: 'year', count: Number(years[1]) }
  const months = value.match(/(\d+)\s*(months?|महिना)/i)
  if (months) return { unit: 'month', count: Number(months[1]) }
  return null
}

/** Localises the parsed warranty term ("1 year" / "2 years" …). */
function formatWarrantyTerm(term, t) {
  if (!term) return t('capability.onRequest')
  if (term.unit === 'year') {
    return term.count === 1
      ? t('capability.yearOne')
      : t('capability.years', { count: term.count })
  }
  return term.count === 1
    ? t('capability.monthOne')
    : t('capability.months', { count: term.count })
}

export default function CapabilityStrip({ tone = 'dark', className = '' }) {
  const { t } = useLanguage()
  const products = useProducts()
  const dark = tone === 'dark'

  const facts = useMemo(() => {
    const crops = new Set(products.flatMap((product) => product.crops))
    // Spec labels are localised, so match either language's label for Warranty.
    const warrantyValue = products[0]?.specs.find(
      (spec) => spec.label === 'Warranty' || spec.label === 'वारेन्टी',
    )?.value
    const warrantyTerm = parseWarrantyTerm(warrantyValue)

    return [
      { id: 'models', label: t('capability.models'), value: products.length, suffix: '' },
      { id: 'crops', label: t('capability.crops'), value: crops.size, suffix: '' },
      {
        id: 'price',
        label: t('capability.price'),
        text: products[0]?.price ?? t('capability.onRequest'),
        unit: t('capability.allModels'),
      },
      {
        id: 'warranty',
        label: t('capability.warranty'),
        text: formatWarrantyTerm(warrantyTerm, t),
        unit: t('capability.standard'),
      },
    ]
  }, [products, t])

  return (
    <div
      className={[
        'grid grid-cols-2 gap-px lg:grid-cols-4',
        dark ? 'bg-white/12' : 'bg-ink/12',
        className,
      ].join(' ')}
    >
      {facts.map((fact) => (
        <div
          key={fact.id}
          className={[
            'px-4 py-5 sm:px-6 sm:py-6',
            dark ? 'bg-ink' : 'bg-paper',
          ].join(' ')}
        >
          <p
            className={[
              'font-display text-[1.75rem] font-extrabold leading-none tracking-[-0.03em] tabular sm:text-[2.1rem]',
              dark ? 'text-sand-50' : 'text-ink',
            ].join(' ')}
          >
            {fact.text ? (
              <>
                {fact.text}
                <span
                  className={[
                    'mt-1 block text-[0.62rem] font-semibold uppercase tracking-technical',
                    dark ? 'text-sand-100/50' : 'text-ink/45',
                  ].join(' ')}
                >
                  {fact.unit}
                </span>
              </>
            ) : (
              <Counter value={fact.value} suffix={fact.suffix} />
            )}
          </p>
          <p
            className={[
              'mt-3 text-2xs font-semibold uppercase tracking-technical',
              dark ? 'text-sand-100/50' : 'text-ink/50',
            ].join(' ')}
          >
            {fact.label}
          </p>
        </div>
      ))}
    </div>
  )
}
