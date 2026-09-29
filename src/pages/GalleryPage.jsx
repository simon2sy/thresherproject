import { useSeo } from '../hooks/useSeo'
import { site } from '../config/site'
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
  useSeo({
    title: 'Gallery — Threshers, Workshop and Field Work in Jhapa',
    description:
      'Photos of assembled thresher machines, sub-assemblies, workshop fabrication and threshing work in the fields around Jhapa, Nepal.',
    path: '/gallery',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'ImageGallery',
        name: 'Daju Bhai Grill Udyog gallery',
        url: `${site.url}/gallery`,
      },
    ],
  })

  return (
    <>
      <PageHeader
        eyebrow="Gallery"
        title="Machines, components and field work"
        lead="Assembled machines, sub-assemblies, workshop work and machines in use during harvest. Filter by category — open any image for the full view."
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Gallery' }]}
        action={
          <Button to="/contact#inquiry" variant="accent" size="lg">
            Request a Quote
          </Button>
        }
      />

      <section className="section">
        <div className="shell">
          <Gallery />
          <Reveal variant="fade" className="mt-10">
            <p className="max-w-3xl text-xs leading-relaxed text-ink/50">
              These are photographs of threshing work and of the machines themselves, taken
              in the field and on the yard. Machine names in the captions are the brands
              visible on the bodywork in each photo.
            </p>
          </Reveal>
        </div>
      </section>

      <CTASection />
    </>
  )
}
