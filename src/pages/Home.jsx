import { ArrowRight } from 'lucide-react'
import { useLanguage, useProducts, useSampleNotice, useSite } from '../i18n'
import { useSeo, localBusinessSchema } from '../hooks/useSeo'
import Hero from '../components/Hero'
import ProductCard from '../components/ProductCard'
import WhyUs from '../components/WhyUs'
import Process from '../components/Process'
import FieldContext from '../components/FieldContext'
import Specifications from '../components/Specifications'
import Gallery from '../components/Gallery'
import CTASection from '../components/CTASection'
import Contact from '../components/Contact'
import SectionHeading from '../components/ui/SectionHeading'
import Button from '../components/ui/Button'
import Reveal from '../components/ui/Reveal'

/**
 * Home
 * ---------------------------------------------------------------------------
 * The five-second page: hero with the machine, the model range, the practical
 * reasons to buy, how the machine works, the farming context, the technical
 * table, the gallery and the contact route.
 */
export default function Home() {
  const { t } = useLanguage()
  const site = useSite()
  const products = useProducts()
  const sampleNotice = useSampleNotice()

  useSeo({
    title: t('meta.home.title'),
    description: t('meta.home.description'),
    path: '/',
    jsonLd: [
      localBusinessSchema(),
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: site.name,
        url: site.url,
        description: t('home.webSiteDescription'),
      },
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: t('home.itemListName'),
        itemListElement: products.map((product, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: `${product.code} ${product.name}`,
          url: `${site.url}/threshers/${product.slug}`,
        })),
      },
    ],
  })

  return (
    <>
      <Hero />

      {/* ---------------- Product range ---------------- */}
      <section id="range" className="section">
        <div className="shell">
          <SectionHeading
            eyebrow={t('home.rangeEyebrow')}
            title={t('home.rangeTitle')}
            highlight={7}
            titleClassName="[&>em]:bg-clip-text [&>em]:text-transparent [&>em]:bg-gradient-to-r [&>em]:from-ink [&>em]:via-agri-600 [&>em]:to-amber_acc-600"
            lead={t('home.rangeLead')}
            action={
              <Button to="/threshers" variant="outline" size="sm">
                {t('common.viewAllThreshers')}
                <ArrowRight size={15} />
              </Button>
            }
          />

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>

          <Reveal variant="fade" className="mt-8">
            <p className="max-w-3xl text-xs leading-relaxed text-ink/50">{sampleNotice}</p>
          </Reveal>
        </div>
      </section>

      {/* ---------------- Why us ---------------- */}
      <section className="section-tight border-y border-ink/10 bg-sand-50">
        <div className="shell">
          <WhyUs />
        </div>
      </section>

      {/* ---------------- How it works ---------------- */}
      <section className="on-dark section bg-graphite">
        <div className="shell">
          <Process />
        </div>
      </section>

      {/* ---------------- Field context ---------------- */}
      <section className="section">
        <div className="shell">
          <FieldContext />
        </div>
      </section>

      {/* ---------------- Technical specifications ---------------- */}
      <section className="on-dark section bg-ink">
        <div className="shell">
          <Specifications />
        </div>
      </section>

      {/* ---------------- Gallery ---------------- */}
      <section className="section border-b border-ink/10">
        <div className="shell">
          <SectionHeading
            eyebrow={t('home.galleryEyebrow')}
            title={t('home.galleryTitle')}
            lead={t('home.galleryLead')}
            action={
              <Button to="/gallery" variant="outline" size="sm">
                {t('common.openGallery')}
                <ArrowRight size={15} />
              </Button>
            }
          />
          <div className="mt-12">
            <Gallery showFilters={false} limit={6} />
          </div>
        </div>
      </section>

      <CTASection />

      <section className="section">
        <div className="shell">
          <Contact />
        </div>
      </section>
    </>
  )
}
