import { useSeo } from '../hooks/useSeo'
import { useLanguage, useSite } from '../i18n'
import PageHeader from '../components/ui/PageHeader'
import Button from '../components/ui/Button'
import Gallery from '../components/Gallery'
import CTASection from '../components/CTASection'
import Reveal from '../components/ui/Reveal'

/**
 * GalleryPage
 * ---------------------------------------------------------------------------
 * The full gallery behind the home-page teaser: category filters and the
 * fullscreen lightbox, driven entirely by src/data/gallery.js.
 */
export default function GalleryPage() {
  const { t } = useLanguage()
  const site = useSite()

  useSeo({
    title: t('meta.gallery.title'),
    description: t('meta.gallery.description'),
    path: '/gallery',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'ImageGallery',
        name: t('galleryPage.jsonLdName', { site: site.name }),
        url: `${site.url}/gallery`,
      },
    ],
  })

  return (
    <>
      <PageHeader
        eyebrow={t('galleryPage.eyebrow')}
        title={t('galleryPage.title')}
        lead={t('galleryPage.lead')}
        breadcrumb={[{ label: t('nav.home'), to: '/' }, { label: t('nav.gallery') }]}
        action={
          <Button to="/contact#inquiry" variant="accent" size="lg">
            {t('common.requestQuote')}
          </Button>
        }
      />

      <section className="section">
        <div className="shell">
          <Gallery />
          <Reveal variant="fade" className="mt-10">
            <p className="max-w-3xl text-xs leading-relaxed text-ink/50">{t('galleryPage.note')}</p>
          </Reveal>
        </div>
      </section>

      <CTASection />
    </>
  )
}
