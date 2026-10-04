import { motion, useReducedMotion } from 'framer-motion'
import { useLanguage, useProcessSteps } from '../i18n'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'

/**
 * Process
 * ---------------------------------------------------------------------------
 * Four-step walkthrough of what actually happens inside the machine. The
 * connecting rail draws itself in as the section scrolls into view; each step
 * then reveals in sequence.
 */
export default function Process({ tone = 'dark' }) {
  const { t } = useLanguage()
  const processSteps = useProcessSteps()
  const dark = tone === 'dark'
  const reduceMotion = useReducedMotion()

  return (
    <div>
      <SectionHeading
        tone={tone}
        eyebrow={t('process.eyebrow')}
        title={t('process.title')}
        lead={t('process.lead')}
      />

      <div className="relative mt-14">
        {/* Connecting rail — harvest gold */}
        <div
          className={`absolute left-0 right-0 top-[26px] hidden h-[2px] lg:block ${
            dark ? 'bg-white/10' : 'bg-ink/10'
          }`}
        >
          <motion.span
            className="block h-[2px] origin-left bg-gradient-to-r from-harvest-300 via-harvest-500 to-paddy-600"
            initial={reduceMotion ? { scaleX: 1 } : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1.1, ease: [0.22, 0.61, 0.36, 1] }}
          />
        </div>

        <ol className="grid grid-cols-2 gap-5 sm:gap-8 lg:grid-cols-4 lg:gap-8">
          {processSteps.map((step, index) => (
            <Reveal
              key={step.step}
              as="li"
              delay={0.1 + index * 0.1}
              className="paint-plate group relative rounded-[6px] p-4 sm:p-5 lg:p-6"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4 lg:block">
                <span
                  className={`grid h-11 w-11 shrink-0 place-items-center rounded-full border font-display text-[0.85rem] font-extrabold tabular transition-transform duration-300 ease-smooth group-hover:scale-105 sm:h-[52px] sm:w-[52px] sm:text-[0.95rem] ${
                    dark
                      ? 'border-harvest-400/40 bg-gradient-to-br from-harvest-400 to-harvest-600 text-ink shadow-glow-harvest'
                      : 'border-harvest-600/25 bg-harvest-100 text-harvest-800'
                  }`}
                >
                  {step.step}
                </span>
                <h3
                  className={`font-display text-base font-bold tracking-[-0.02em] lg:mt-6 lg:text-xl ${
                    dark ? 'text-sand-50' : 'text-ink'
                  }`}
                >
                  {step.title}
                </h3>
              </div>

              <p
                className={`mt-3 text-xs leading-relaxed sm:mt-4 sm:max-w-sm sm:text-sm lg:max-w-none ${
                  dark ? 'text-sand-100/65' : 'text-ink/65'
                }`}
              >
                {step.text}
              </p>

              <p
                className={`mt-4 inline-flex border px-2 py-1 text-[0.6rem] uppercase tracking-technical sm:mt-5 sm:px-2.5 sm:py-1.5 sm:text-2xs ${
                  dark
                    ? 'border-white/10 text-sand-100/50'
                    : 'border-ink/10 text-ink/50'
                }`}
              >
                {step.spec}
              </p>
            </Reveal>
          ))}
        </ol>
      </div>
    </div>
  )
}
