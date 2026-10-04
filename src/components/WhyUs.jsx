import { useLanguage, useWhyUs } from '../i18n'
import Icon from './ui/Icon'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'

/**
 * WhyUs
 * ---------------------------------------------------------------------------
 * Practical reasons to buy, written as plain statements rather than marketing
 * slogans. Content lives in src/data/content.js → `whyUs`.
 */
export default function WhyUs({ tone = 'light', showHeading = true }) {
  const { t } = useLanguage()
  const whyUs = useWhyUs()
  const dark = tone === 'dark'

  return (
    <div>
      {showHeading ? (
        <SectionHeading
          tone={tone}
          eyebrow={t('whyUs.eyebrow')}
          title={t('whyUs.title')}
          lead={t('whyUs.lead')}
        />
      ) : null}

      <div className="mt-12 grid gap-px overflow-hidden rounded-[6px] border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-3">
        {whyUs.map((item, index) => (
          <Reveal
            key={item.id}
            variant="fade"
            delay={Math.min(index * 0.06, 0.3)}
            className={`group p-6 transition-colors duration-300 sm:p-7 ${
              dark
                ? 'bg-graphite hover:bg-[#2A2012]'
                : 'bg-paper hover:bg-harvest-50'
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <span
                className={`grid h-11 w-11 place-items-center rounded-full transition-all duration-300 ease-smooth group-hover:scale-110 group-hover:shadow-glow-harvest ${
                  dark
                    ? 'bg-gradient-to-br from-harvest-400 to-harvest-600 text-ink'
                    : 'bg-gradient-to-br from-paddy-100 to-harvest-100 text-paddy-700 ring-1 ring-harvest-500/30'
                }`}
              >
                <Icon name={item.icon} size={19} />
              </span>
              <span className={`tabular text-2xs ${dark ? 'text-sand-100/35' : 'text-ink/30'}`}>
                {String(index + 1).padStart(2, '0')}
              </span>
            </div>

            <h3
              className={`mt-5 font-display text-lg font-bold tracking-[-0.015em] ${
                dark ? 'text-sand-50' : 'text-ink'
              }`}
            >
              {item.title}
            </h3>
            <p className={`mt-3 text-sm leading-relaxed ${dark ? 'text-sand-100/65' : 'text-ink/65'}`}>
              {item.text}
            </p>

            <ul
              className={`mt-5 space-y-2 border-t border-dashed pt-4 text-xs ${
                dark ? 'border-harvest-400/25 text-sand-100/55' : 'border-ink/15 text-ink/55'
              }`}
            >
              {item.points.map((point) => (
                <li key={point} className="flex items-start gap-2">
                  <Icon name="wheat" size={13} className="mt-0.5 shrink-0 text-paddy-600" />
                  {point}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </div>
  )
}
