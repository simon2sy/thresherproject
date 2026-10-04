import { useSeo, localBusinessSchema } from '../hooks/useSeo'
import { useLanguage, useSite } from '../i18n'
import PageHeader from '../components/ui/PageHeader'
import Button from '../components/ui/Button'
import Contact from '../components/Contact'
import CTASection from '../components/CTASection'

/**
 * ContactPage
 * ---------------------------------------------------------------------------
 * The contact page. The Contact section carries the company details, a
 * call/WhatsApp visit panel and the location map.
 */
export default function ContactPage() {
  const { t } = useLanguage()
  const site = useSite()

  useSeo({
    title: t('meta.contact.title'),
    description: t('meta.contact.description', { phone: site.phone.display }),
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
        eyebrow={t('contactPage.eyebrow')}
        title={t('contactPage.title')}
        lead={t('contactPage.lead', {
          locality: site.address.line1,
          district: site.address.district,
        })}
        breadcrumb={[{ label: t('nav.home'), to: '/' }, { label: t('nav.contact') }]}
        action={
          <Button href={site.phone.href} variant="accent" size="lg">
            {t('contactPage.callWorkshop')}
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
