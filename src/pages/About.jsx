import { useAboutStory, useLanguage, useQualityNotes, useSite } from '../i18n'
import { useSeo, localBusinessSchema } from '../hooks/useSeo'
import PageHeader from '../components/ui/PageHeader'
import Button from '../components/ui/Button'
import Reveal from '../components/ui/Reveal'
import Icon from '../components/ui/Icon'
import CTASection from '../components/CTASection'

/**
 * About
 * ---------------------------------------------------------------------------
 * The company story. Only claims that can be stood behind are published — where
 * a fact is not yet available (year of establishment, registrations, workshop
 * area) the interface says "to be confirmed" instead of inventing a value.
 */
export default function About() {
  const { t } = useLanguage()
  const site = useSite()
  const aboutStory = useAboutStory()
  const qualityNotes = useQualityNotes()

  useSeo({
    title: t('meta.about.title'),
    description: t('meta.about.description'),
    path: '/about',
    jsonLd: [
      localBusinessSchema(),
      {
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        name: `About ${site.name}`,
        url: `${site.url}/about`,
      },
    ],
  })

  return (
    <>
      <PageHeader
        eyebrow={t('about.eyebrow')}
        title={aboutStory.title}
        lead={t('about.lead')}
        breadcrumb={[{ label: t('nav.home'), to: '/' }, { label: t('nav.about') }]}
        action={
          <Button to="/threshers" variant="accent" size="lg">
            {t('common.exploreThreshers')}
          </Button>
        }
      />

      <section className="section">
        <div className="shell grid gap-12 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] lg:gap-16">
          <div>
            {aboutStory.paragraphs.map((paragraph, index) => (
              <Reveal key={paragraph.slice(0, 24)} delay={index * 0.04}>
                <p
                  className={[
                    'text-ink/75',
                    index === 0
                      ? 'text-lg leading-relaxed sm:text-xl'
                      : 'mt-6 text-base leading-relaxed',
                  ].join(' ')}
                >
                  {paragraph}
                </p>
              </Reveal>
            ))}

            <Reveal variant="fade" className="mt-10">
              <figure className="border border-ink/10 bg-paper">
                <img
                  src="/images/gallery/thresher-range-lineup.jpg"
                  alt={t('about.figAlt')}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[16/9] w-full object-cover"
                />
                <figcaption className="border-t border-ink/10 px-5 py-4 text-sm text-ink/60">
                  {t('about.figCaption')}
                </figcaption>
              </figure>
            </Reveal>

            <Reveal variant="fade" className="mt-10">
              <div className="border-l-2 border-agri-500 bg-sand-50 p-5 sm:p-6">
                <p className="text-sm leading-relaxed text-ink/70">{t('about.askNote')}</p>
              </div>
            </Reveal>
          </div>

          {/* ---------- Facts + how we work ---------- */}
          <div className="space-y-8">
            <Reveal className="border border-ink/10 bg-paper">
              <div className="border-b border-ink/10 px-5 py-4">
                <h2 className="text-2xs font-semibold uppercase tracking-technical text-ink/50">
                  {t('about.detailsHeading')}
                </h2>
              </div>
              <dl className="divide-y divide-ink/10">
                <div className="flex items-start justify-between gap-6 px-5 py-3.5">
                  <dt className="text-xs text-ink/55">{t('about.address')}</dt>
                  <dd className="text-right text-sm font-semibold text-ink">
                    {site.address.line1}, {site.address.line2}
                  </dd>
                </div>
                {aboutStory.facts.map((fact) => (
                  <div key={fact.label} className="flex items-start justify-between gap-6 px-5 py-3.5">
                    <dt className="text-xs text-ink/55">{fact.label}</dt>
                    <dd className="text-right text-sm font-medium text-ink/45">{fact.value}</dd>
                  </div>
                ))}
              </dl>
              <p className="border-t border-ink/10 px-5 py-4 text-xs leading-relaxed text-ink/50">
                {t('about.detailsNote')}
              </p>
            </Reveal>

            <Reveal variant="fade" className="border border-ink/10 bg-paper p-5 sm:p-6">
              <h2 className="text-2xs font-semibold uppercase tracking-technical text-ink/50">
                {t('about.howWeWork')}
              </h2>
              <ul className="mt-4 space-y-3.5">
                {qualityNotes.map((note) => (
                  <li key={note} className="flex gap-3 text-sm leading-relaxed text-ink/70">
                    <Icon name="check" size={16} className="mt-0.5 shrink-0 text-agri-600" />
                    {note}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal variant="fade" className="border border-ink/10 bg-paper p-5 sm:p-6">
              <h2 className="text-2xs font-semibold uppercase tracking-technical text-ink/50">
                {t('about.visiting')}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-ink/70">
                {t('about.visitingText', { locality: site.address.locality })}
              </p>
              <dl className="mt-5 space-y-2 text-sm">
                {site.hours.map((slot) => (
                  <div key={slot.days} className="flex justify-between gap-4">
                    <dt className="text-ink/55">{slot.days}</dt>
                    <dd className="tabular font-medium text-ink">{slot.time}</dd>
                  </div>
                ))}
              </dl>
              <Button href={site.phone.href} variant="outline" size="sm" className="mt-5">
                {t('about.callBefore')}
              </Button>
            </Reveal>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  )
}
