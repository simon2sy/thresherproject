import { aboutStory, qualityNotes } from '../data/content'
import { site } from '../config/site'
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
  useSeo({
    title: 'About Us — Agricultural Machinery in Jhapa',
    description:
      'Daju Bhai Grill Udyog builds and supplies thresher machines for Nepali farms from Jhapa Gaupalika, Jhapa. Practical engineering, replaceable wear parts and local service.',
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
        eyebrow="About the company"
        title={aboutStory.title}
        lead="Thresher machines, built and serviced in Jhapa Gaupalika, Jhapa — designed around the crops, the land sizes and the harvest calendar of Nepali farms."
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'About' }]}
        action={
          <Button to="/contact#inquiry" variant="accent" size="lg">
            Request a Quote
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
              <figure className="border border-ink/12 bg-paper">
                <img
                  src="/images/gallery/thresher-range-lineup.jpg"
                  alt="A row of thresher machines painted blue, green, red and orange, lined up in a line on grass at a machinery yard"
                  loading="lazy"
                  decoding="async"
                  className="aspect-[16/9] w-full object-cover"
                />
                <figcaption className="border-t border-ink/10 px-5 py-4 text-sm text-ink/60">
                  Frames are cut, welded and drilled before assembly. Wear parts are made as
                  replaceable items so a machine can be kept in service for years.
                </figcaption>
              </figure>
            </Reveal>

            <Reveal variant="fade" className="mt-10">
              <div className="border-l-2 border-agri-500 bg-sand-50 p-5 sm:p-6">
                <p className="text-sm leading-relaxed text-ink/70">
                  If something about a machine is not clear — crop suitability, how it will be moved
                  to your field or when it can be set up — ask before you buy. It is the
                  cheapest conversation in the whole process.
                </p>
              </div>
            </Reveal>
          </div>

          {/* ---------- Facts + how we work ---------- */}
          <div className="space-y-8">
            <Reveal className="border border-ink/12 bg-paper">
              <div className="border-b border-ink/10 px-5 py-4">
                <h2 className="text-2xs font-semibold uppercase tracking-technical text-ink/50">
                  Company details
                </h2>
              </div>
              <dl className="divide-y divide-ink/10">
                <div className="flex items-start justify-between gap-6 px-5 py-3.5">
                  <dt className="text-xs text-ink/55">Address</dt>
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
                Details marked “to be confirmed” are intentionally left blank rather than filled with
                invented figures. They will be published once verified.
              </p>
            </Reveal>

            <Reveal variant="fade" className="border border-ink/12 bg-paper p-5 sm:p-6">
              <h2 className="text-2xs font-semibold uppercase tracking-technical text-ink/50">
                How we work
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

            <Reveal variant="fade" className="border border-ink/12 bg-paper p-5 sm:p-6">
              <h2 className="text-2xs font-semibold uppercase tracking-technical text-ink/50">
                Visiting the workshop
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-ink/70">
                Machines can be seen and run at the workshop in {site.address.locality}. Bring your
                crop sample if you can — it makes the sieve and drum setting decision straightforward.
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
                Call before visiting
              </Button>
            </Reveal>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  )
}
