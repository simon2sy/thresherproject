import { useSeo } from '../hooks/useSeo'
import { useLanguage } from '../i18n'
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
  const { t } = useLanguage()

  useSeo({
    title: t('meta.whyUs.title'),
    description: t('meta.whyUs.description'),
    path: '/why-us',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: t('whyUsPage.faqQuestion'),
            acceptedAnswer: {
              '@type': 'Answer',
              text: t('whyUsPage.faqAnswer'),
            },
          },
        ],
      },
    ],
  })

  return (
    <>
      <PageHeader
        eyebrow={t('whyUsPage.eyebrow')}
        title={t('whyUsPage.title')}
        lead={t('whyUsPage.lead')}
        breadcrumb={[{ label: t('nav.home'), to: '/' }, { label: t('nav.whyUs') }]}
        action={
          <Button to="/contact#inquiry" variant="accent" size="lg">
            {t('common.requestQuote')}
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
