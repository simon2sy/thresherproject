import { Link } from 'react-router-dom'
import { ArrowRight, IndianRupee, Sprout } from 'lucide-react'
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
    { icon: IndianRupee, label: t('productCard.price'), value: product.price },
    { icon: Sprout, label: t('productCard.crops'), value: cardCrops.join(', ') },
  ]

  return (
    <Reveal delay={Math.min(index * 0.08, 0.24)} className="h-full">
      <TiltCard className="h-full" max={6} lift={8}>
        <article className="flex h-full flex-col">
          {/* Media */}
          <Link
            to={`/threshers/${product.slug}`}
            className="relative block overflow-hidden border-b border-ink/10 bg-gradient-to-br from-aqua-50 via-white to-sand-100"
            tabIndex={-1}
            aria-hidden="true"
          >
            <img
              src={product.imagery.card}
              alt={`${product.code} ${product.name}`}
              loading="lazy"
              decoding="async"
              className="aspect-[4/3] w-full object-contain p-3 transition-transform duration-500 ease-smooth group-hover:scale-[1.06] sm:p-5"
            />
            {product.badge ? (
              <span className="absolute left-0 top-0 bg-ink px-2.5 py-1.5 text-2xs font-semibold uppercase tracking-technical text-sand-50">
                {product.badge}
              </span>
            ) : null}
            {/* Aqua glow that rises from the base of the image on hover. */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-aqua-400/25 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
            <span className="sheen" aria-hidden="true" />
          </Link>

        {/* Body */}
        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <p className="flex items-center gap-3 text-2xs uppercase tracking-technical text-ink/45">
            <span className="tabular font-semibold text-agri-600">{product.code}</span>
            <span className="h-px flex-1 bg-ink/10" />
            <span>{product.category}</span>
          </p>

          <h3 className="h-card mt-3">
            <Link
              to={`/threshers/${product.slug}`}
              className="transition-colors hover:text-agri-600"
            >
              {product.name}
            </Link>
          </h3>

          <p className="mt-3 text-sm leading-relaxed text-ink/65">{product.short}</p>

          {/* Technical facts */}
          <dl className="mt-5 grid grid-cols-1 gap-px overflow-hidden border border-ink/10 bg-ink/10 sm:grid-cols-2">
            {facts.map((fact) => (
              <div key={fact.label} className="bg-paper px-3.5 py-3">
                <dt className="flex items-center gap-2 text-2xs font-semibold uppercase tracking-technical text-ink/45">
                  <fact.icon size={13} strokeWidth={1.8} aria-hidden="true" />
                  {fact.label}
                </dt>
                <dd className="mt-1 text-[0.8rem] font-semibold leading-snug text-ink">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>

          {/* Actions */}
          <div className="mt-auto flex flex-col gap-2.5 pt-6 sm:flex-row">
            <Button to={`/threshers/${product.slug}`} variant="primary" size="sm" className="flex-1">
              {t('common.viewDetails')}
              <ArrowRight size={15} />
            </Button>
            <Button
              to={`/contact?product=${encodeURIComponent(product.code)}#inquiry`}
              variant="outline"
              size="sm"
              className="flex-1"
            >
              {t('common.enquire')}
            </Button>
          </div>
        </div>
        </article>
      </TiltCard>
    </Reveal>
  )
}
