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
            <figure className="group h-full border border-ink/10 bg-paper">
              <div className="overflow-hidden border-b border-ink/10 bg-sand-200">
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <figcaption className="p-5 sm:p-6">
                <h3 className="font-display text-lg font-bold tracking-[-0.015em]">{item.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-ink/65">{item.text}</p>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </div>
  )
}
