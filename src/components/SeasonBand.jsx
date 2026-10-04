/**
 * SeasonBand
 * ---------------------------------------------------------------------------
 * "From field to sack" strip: four harvest stages with icons on a straw
 * panel that sits between sections like a sewn sack seam.
 */
import { Wheat, Cog, Wind, PackageCheck } from 'lucide-react'
import Reveal from './ui/Reveal'

const STAGES = [
  { icon: Wheat, title: 'Cut & Stack', text: 'Paddy bundled in the Terai sun' },
  { icon: Cog, title: 'Feed & Thresh', text: 'Rasp-bar drum at 750 RPM' },
  { icon: Wind, title: 'Winnow', text: 'Blower lifts chaff away' },
  { icon: PackageCheck, title: 'Sack & Store', text: 'Clean grain, ready for market' },
]

export default function SeasonBand() {
  return (
    <div className="grain-card rounded-[8px] px-6 py-8 sm:px-8">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {STAGES.map((s, i) => (
          <Reveal key={s.title} delay={Math.min(i * 0.06, 0.18)} variant="fade">
            <div className="flex items-start gap-4">
              <span className="relative grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gradient-to-br from-harvest-300 to-harvest-600 text-ink shadow-glow-harvest">
                <s.icon size={20} strokeWidth={2} />
                <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-ink text-[0.6rem] font-extrabold text-harvest-300">
                  {i + 1}
                </span>
              </span>
              <span>
                <span className="block font-display text-[0.95rem] font-bold text-ink">{s.title}</span>
                <span className="mt-1 block text-xs leading-relaxed text-ink/60">{s.text}</span>
              </span>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  )
}
