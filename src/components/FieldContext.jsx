import { useFieldContext, useLanguage } from '../i18n'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'

/**
 * FieldContext
 * ---------------------------------------------------------------------------
 * Shows the machines in the environment they are actually used in — the Jhapa
 * and Terai farming context, not generic stock photography. Images and copy come
 * from `fieldContext` in src/data/content.js.
 */
export default function FieldContext() {
  const { t } = useLanguage()
  const fieldContext = useFieldContext()

  return (
    <div>
      <SectionHeading
        eyebrow={t('fieldContext.eyebrow')}
        title={t('fieldContext.title')}
        lead={t('fieldContext.lead')}
      />

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {fieldContext.map((item, index) => (
          <Reveal
            key={item.id}
            delay={Math.min(index * 0.08, 0.24)}
            className={index === 0 ? 'sm:col-span-2 lg:col-span-1' : ''}
          >
            <figure className="grain-card group h-full overflow-hidden rounded-[6px]">
              <div className="overflow-hidden border-b border-ink/10">
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </div>
              <figcaption className="p-5 sm:p-6">
                <p className="text-2xs font-semibold uppercase tracking-technical text-harvest-700">
                  Jhapa · Terai
                </p>
                <h3 className="mt-1.5 font-display text-lg font-bold tracking-[-0.015em]">{item.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-ink/65">{item.text}</p>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </div>
  )
}
