import { useSeo, localBusinessSchema } from '../hooks/useSeo'
import { site } from '../config/site'
import PageHeader from '../components/ui/PageHeader'
import Button from '../components/ui/Button'
import Contact from '../components/Contact'
import CTASection from '../components/CTASection'

/**
 * ContactPage
 * ---------------------------------------------------------------------------
 * The conversion page. The Contact section carries the company details, the
 * inquiry form (anchored at #inquiry — every "Request a Quote" button on the
 * site deep-links here, optionally with ?product=CODE) and the location map.
 */
export default function ContactPage() {
  useSeo({
    title: 'Contact — Thresher Sales & Support in Jhapa',
    description: `Contact ${site.name} about thresher pricing, crop compatibility and availability. Call ${site.phone.display}, send a WhatsApp message or use the inquiry form. Jhapa Gaupalika, Jhapa, Nepal.`,
    path: '/contact',
    jsonLd: [
      localBusinessSchema(),
      {
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        name: `Contact ${site.name}`,
        url: `${site.url}/contact`,
      },
    ],
  })

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Thresher sales, specifications and support"
        lead={`Based in ${site.address.line1}, ${site.address.district}, serving farmers, cooperatives and agri-businesses across eastern Nepal. Call, email, or send the form below with the details of your harvest.`}
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Contact' }]}
        action={
          <Button href={site.phone.href} variant="accent" size="lg">
            Call the workshop
          </Button>
        }
      />

      <section className="section">
        <div className="shell">
          <Contact showHeading={false} />
        </div>
      </section>

      <CTASection />
    </>
  )
}
