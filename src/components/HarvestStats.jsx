/**
 * HarvestStats
 * ---------------------------------------------------------------------------
 * Sun-disc stat band: animated counters on harvest-gold discs over a soil
 * panel with chaff texture. Figures are derived from the catalogue + gallery
 * so nothing is invented.
 */
import { useProducts, useGallery, useLanguage } from '../i18n'
import Counter from './ui/Counter'
import Reveal from './ui/Reveal'

export default function HarvestStats() {
  const { t } = useLanguage()
  const products = useProducts()
  const gallery = useGallery()
  const crops = new Set(products.flatMap((p) => p.crops || []))

  const stats = [
    { value: products.length, suffix: '', label: t('capability.models'), sub: 'SAM range' },
    { value: crops.size, suffix: '', label: t('capability.crops'), sub: 'sieve sets' },
    { value: 750, suffix: '', label: 'RPM drum speed', sub: 'steady threshing' },
    { value: 1, suffix: ' yr', label: t('capability.warranty'), sub: t('capability.standard') },
  ]

  return (
    <div className="paint-plate chaff-dark relative overflow-hidden rounded-[8px] px-6 py-10 sm:px-10">
      <div className="pointer-events-none absolute inset-0 bg-aurora opacity-60" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-harvest-500/15 to-transparent" aria-hidden="true" />
      <div className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={Math.min(i * 0.07, 0.21)} variant="fade">
            <div className="flex items-center gap-4">
              <span className="harvest-disc h-16 w-16 shrink-0 text-xl font-extrabold tabular">
                <Counter value={s.value} suffix={s.suffix} />
              </span>
              <span>
                <span className="block font-display text-sm font-bold uppercase tracking-[0.08em] text-sand-50">
                  {s.label}
                </span>
                <span className="mt-1 block text-xs uppercase tracking-technical text-harvest-300/80">
                  {s.sub}
                </span>
              </span>
            </div>
          </Reveal>
        ))}
      </div>
      <div className="sack-stitch-light relative mt-8" aria-hidden="true" />
      <p className="relative mt-4 text-center text-2xs uppercase tracking-technical text-sand-100/45">
        {gallery.items.length} field photos · Jhapa · Terai — no invented figures
      </p>
    </div>
  )
}
