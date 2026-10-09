import { Link } from 'react-router-dom'
import { ArrowRight, Wheat } from 'lucide-react'
import { useLanguage } from '../i18n'
import Button from './ui/Button'
import Reveal from './ui/Reveal'
import TiltCard from './ui/TiltCard'

/**
 * ProductCard
 * ---------------------------------------------------------------------------
 * Reads everything from a catalogue entry in src/data/products.js: image,
 * model code, name, description, price and crops.
 *
 * @param {object} props
 * @param {import('../data/products').products[number]} props.product
 * @param {number} [props.index] used for the reveal stagger
 */
export default function ProductCard({ product, index = 0 }) {
  const { t } = useLanguage()

  /*
   * The card advertises only the two headline crops (paddy and wheat); the
   * full compatibility list stays on the product detail page. Matched in both
   * languages so the filter still applies after an EN→NE toggle.
   */
  const CARD_CROPS = ['Paddy / Rice', 'Wheat', 'धान / चामल', 'गहुँ']
  const cardCrops = product.crops.filter((crop) => CARD_CROPS.includes(crop))

  const facts = [
    { icon: Wheat, label: t('productCard.price'), value: product.price, hot: true },
    { icon: Wheat, label: t('productCard.crops'), value: cardCrops.join(', '), hot: false },
  ]

  return (
    <Reveal delay={Math.min(index * 0.08, 0.24)} className="h-full">
      <TiltCard className="h-full" max={6} lift={8}>
        <article className="grain-card flex h-full flex-col overflow-hidden rounded-[6px]">
          {/* Media — thresher paint backdrop */}
          <Link
            to={`/threshers/${product.slug}`}
            className="relative block overflow-hidden border-b border-ink/10 bg-gradient-to-br from-harvest-100 via-[#FFF8E6] to-paddy-100"
            tabIndex={-1}
            aria-hidden="true"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-60"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(90deg, rgba(22,16,6,0.05) 0 2px, transparent 2px 26px)',
              }}
            />
            <img
              src={product.imagery.card}
              alt={`${product.code} ${product.name}`}
              loading="lazy"
              decoding="async"
              className="relative aspect-[4/3] w-full object-contain p-2 transition-transform duration-500 ease-smooth group-hover:scale-[1.06] sm:p-5"
            />
            {product.badge ? (
              <span className="absolute left-0 top-2 bg-gradient-to-r from-harvest-500 to-harvest-400 px-1.5 py-1 text-[0.58rem] font-bold uppercase leading-tight tracking-technical text-ink shadow-glow-harvest sm:top-3 sm:px-2.5 sm:py-1.5 sm:text-2xs">
                {product.badge}
              </span>
            ) : null}
            {/* Golden sun that rises from the base of the image on hover. */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-harvest-400/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
            <span className="sheen" aria-hidden="true" />
          </Link>

        {/* Body */}
        <div className="flex flex-1 flex-col p-3.5 sm:p-5 lg:p-6">
          <p className="flex items-center gap-2 text-2xs uppercase tracking-technical text-ink/45 sm:gap-3">
            <span className="rounded-[3px] bg-paddy-700 px-1.5 py-0.5 tabular font-semibold text-white sm:px-2 sm:py-1">{product.code}</span>
            <span className="h-px flex-1 bg-gradient-to-r from-harvest-500/50 to-transparent" />
            <span className="hidden sm:inline">{product.category}</span>
          </p>

          <h3 className="h-card mt-2.5 text-[0.95rem] sm:mt-3 sm:text-2xl">
            <Link
              to={`/threshers/${product.slug}`}
              className="transition-colors hover:text-harvest-700"
            >
              {product.name}
            </Link>
          </h3>

          <p className="mt-3 hidden text-sm leading-relaxed text-ink/65 sm:block">{product.short}</p>

          {/* Technical facts */}
          <dl className="mt-3.5 grid grid-cols-1 gap-px overflow-hidden rounded-[4px] border border-ink/10 bg-ink/10 sm:mt-5 sm:grid-cols-2">
            {facts.map((fact) => (
              <div key={fact.label} className={`px-2.5 py-2.5 sm:px-3.5 sm:py-3 ${fact.hot ? 'bg-harvest-100/70' : 'bg-paper'}`}>
                <dt className="flex items-center gap-1.5 text-[0.58rem] font-semibold uppercase tracking-technical text-ink/45 sm:gap-2 sm:text-2xs">
                  <fact.icon size={12} strokeWidth={1.8} aria-hidden="true" className={`shrink-0 ${fact.hot ? 'text-harvest-600' : 'text-paddy-600'}`} />
                  <span className="truncate">{fact.label}</span>
                </dt>
                <dd className={`mt-1 text-[0.72rem] font-semibold leading-snug sm:text-[0.8rem] ${fact.hot ? 'text-harvest-800' : 'text-ink'}`}>
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>

          {/* Actions */}
          <div className="mt-auto flex flex-col gap-2.5 pt-4 sm:pt-6">
            <Button
              to={`/threshers/${product.slug}`}
              variant="primary"
              className="w-full !gap-1.5 !py-3 !px-2 text-[0.82rem] sm:!py-3.5 sm:!px-4 sm:text-[0.82rem]"
            >
              <span className="truncate">{t('common.viewDetails')}</span>
              <ArrowRight size={14} className="shrink-0" />
            </Button>
          </div>
        </div>
        </article>
      </TiltCard>
    </Reveal>
  )
}
