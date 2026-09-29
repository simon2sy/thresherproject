import { useMemo } from 'react'
import { products } from '../../data/products'
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

/** Reads the warranty term out of a spec string, e.g. "1 year against …". */
function parseWarrantyTerm(value = '') {
  const years = value.match(/(\d+)\s*years?/i)
  if (years) return `${years[1]} year${years[1] === '1' ? '' : 's'}`
  const months = value.match(/(\d+)\s*months?/i)
  if (months) return `${months[1]} month${months[1] === '1' ? '' : 's'}`
  return null
}

export default function CapabilityStrip({ tone = 'dark', className = '' }) {
  const dark = tone === 'dark'

  const facts = useMemo(() => {
    const crops = new Set(products.flatMap((product) => product.crops))
    const warrantyValue = products[0]?.specs.find((spec) => spec.label === 'Warranty')?.value
    const warrantyTerm = parseWarrantyTerm(warrantyValue)

    return [
      { id: 'models', label: 'Thresher models', value: products.length, suffix: '' },
      { id: 'crops', label: 'Crops covered', value: crops.size, suffix: '' },
      {
        id: 'price',
        label: 'Price',
        text: products[0]?.price ?? 'On request',
        unit: 'all models',
      },
      {
        id: 'warranty',
        label: 'Warranty',
        text: warrantyTerm ?? 'On request',
        unit: 'standard',
      },
    ]
  }, [])

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
