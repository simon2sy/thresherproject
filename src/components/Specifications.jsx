import { technicalSpecifications } from '../data/content'
import { site } from '../config/site'
import SpecTable from './ui/SpecTable'
import Reveal from './ui/Reveal'
import Icon from './ui/Icon'

/**
 * Specifications
 * ---------------------------------------------------------------------------
 * Site-wide technical table. Rows come from `technicalSpecifications` in
 * src/data/content.js and are explicitly marked as samples — the real values go
 * in the same place, with no component changes.
 */
export default function Specifications({ tone = 'dark' }) {
  const dark = tone === 'dark'

  const checks = [
    'Your main crop and expected tonnage per season',
    'Where the machine will stand — field edge, farmyard or threshing floor',
    'Access to the field or yard — width of the track and turning space',
    'Sacks, trolley or trailer arrangement at the grain outlet',
  ]

  return (
    <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
      <div>
        <Reveal variant="fade">
          <p className={`eyebrow ${dark ? 'text-aqua-300' : 'text-agri-600'}`}>
            Technical specifications
          </p>
        </Reveal>

        <Reveal>
          <h2 className={`h-section mt-4 ${dark ? 'text-sand-50' : 'text-ink'}`}>
            Numbers you can plan around
          </h2>
        </Reveal>

        <Reveal delay={0.06}>
          <p className={`lede mt-5 ${dark ? 'text-sand-100/70' : ''}`}>
            Construction, drive and crop suitability decide whether a machine suits your land and
            your harvest window. The table shows the format we publish for every model in the range.
          </p>
        </Reveal>

        <Reveal variant="fade" delay={0.1}>
          <div
            className={`mt-8 border p-5 ${dark ? 'border-white/12 bg-white/[0.03]' : 'border-ink/12 bg-paper'}`}
          >
            <h3
              className={`text-2xs font-semibold uppercase tracking-technical ${
                dark ? 'text-sand-100/50' : 'text-ink/50'
              }`}
            >
              What we check before recommending a machine
            </h3>
            <ul className="mt-4 space-y-3">
              {checks.map((check) => (
                <li
                  key={check}
                  className={`flex gap-3 text-sm leading-relaxed ${
                    dark ? 'text-sand-100/70' : 'text-ink/70'
                  }`}
                >
                  <Icon
                    name="check"
                    size={16}
                    className={`mt-0.5 shrink-0 ${dark ? 'text-aqua-300' : 'text-agri-600'}`}
                  />
                  {check}
                </li>
              ))}
            </ul>
            <p className={`mt-5 text-xs ${dark ? 'text-sand-100/45' : 'text-ink/50'}`}>
              Call {site.phone.display} or send the inquiry form with your crop and land size and we
              will confirm what fits.
            </p>
          </div>
        </Reveal>
      </div>

      <Reveal variant="fade" delay={0.08}>
        <SpecTable
          rows={technicalSpecifications.rows}
          notice={technicalSpecifications.notice}
          tone={tone}
          caption="Sample thresher technical specifications"
        />
      </Reveal>
    </div>
  )
}
