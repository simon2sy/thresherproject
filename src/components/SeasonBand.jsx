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
      <div className="grid grid-cols-2 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
        {STAGES.map((s, i) => (
          <Reveal key={s.title} delay={Math.min(i * 0.06, 0.18)} variant="fade">
            <div className="flex items-start gap-2.5 sm:gap-4">
              <span className="relative grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-harvest-300 to-harvest-600 text-ink shadow-glow-harvest sm:h-12 sm:w-12">
                <s.icon size={16} strokeWidth={2} className="sm:hidden" />
                <s.icon size={20} strokeWidth={2} className="hidden sm:block" />
                <span className="absolute -right-1 -top-1 grid h-4 w-4 place-items-center rounded-full bg-ink text-[0.55rem] font-extrabold text-harvest-300 sm:h-5 sm:w-5 sm:text-[0.6rem]">
                  {i + 1}
                </span>
              </span>
              <span className="min-w-0">
                <span className="block font-display text-[0.82rem] font-bold leading-tight text-ink sm:text-[0.95rem]">{s.title}</span>
                <span className="mt-1 hidden text-xs leading-relaxed text-ink/60 sm:block">{s.text}</span>
              </span>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  )
}
