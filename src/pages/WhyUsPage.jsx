import { useSeo } from '../hooks/useSeo'
import PageHeader from '../components/ui/PageHeader'
import Button from '../components/ui/Button'
import WhyUs from '../components/WhyUs'
import Process from '../components/Process'
import CTASection from '../components/CTASection'

/**
 * WhyUsPage
 * ---------------------------------------------------------------------------
 * Dedicated page for the practical reasons to buy (the same section the home
 * page teasers), followed by how the machine actually works — the two questions
 * a buyer asks before requesting a quote.
 */
export default function WhyUsPage() {
  useSeo({
    title: 'Why Us — Practical Reasons to Buy a Thresher From Us',
    description:
      'Efficient crop processing, replaceable wear parts, belt drive simplicity, local service in Jhapa and configuration to your crop and power source — the practical reasons to buy a thresher from Daju Bhai Grill Udyog.',
    path: '/why-us',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Why buy a thresher from Daju Bhai Grill Udyog?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Machines are configured to your crop, land size and available power; wear parts are replaceable items; the belt drive is simple to maintain; and service is local to Jhapa.',
            },
          },
        ],
      },
    ],
  })

  return (
    <>
      <PageHeader
        eyebrow="Why choose us"
        title="Practical reasons to buy from us"
        lead="No claims we cannot back up — these are the things that matter when a machine has to work through the whole season."
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Why Us' }]}
        action={
          <Button to="/contact#inquiry" variant="accent" size="lg">
            Request a Quote
          </Button>
        }
      />

      <section className="section">
        <div className="shell">
          <WhyUs showHeading={false} />
        </div>
      </section>

      <section className="on-dark section border-y border-ink/10 bg-graphite">
        <div className="shell">
          <Process />
        </div>
      </section>

      <CTASection />
    </>
  )
}
