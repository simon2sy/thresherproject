/**
 * CropMarquee
 * ---------------------------------------------------------------------------
 * Infinite harvest ticker: crop names separated by wheat glyphs, on a soil
 * strip with golden top/bottom rules. Pure CSS animation (see
 * `ticker-slide`), duplicated list for a seamless loop.
 */
import { Wheat } from 'lucide-react'

const CROPS = [
  'Paddy',
  'धान',
  'Wheat',
  'गहुँ',
  'Maize',
  'मकै',
  'Mustard',
  'तोरी',
  'Millet',
  'कोदो',
]

export default function CropMarquee() {
  const row = [...CROPS, ...CROPS]
  return (
    <div className="relative overflow-hidden border-y border-harvest-500/25 bg-ink py-3">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-harvest-400/70 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-harvest-400/40 to-transparent" />
      <div className="flex w-max motion-safe:animate-ticker-slide items-center gap-8 pr-8">
        {row.map((crop, i) => (
          <span
            key={`${crop}-${i}`}
            className="flex items-center gap-8 text-xs font-semibold uppercase tracking-[0.22em] text-harvest-200/90"
            aria-hidden={i >= CROPS.length}
          >
            {crop}
            <Wheat size={14} className="text-harvest-400" strokeWidth={2} />
          </span>
        ))}
      </div>
    </div>
  )
}
