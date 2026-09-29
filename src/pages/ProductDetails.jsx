import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Check, PhoneCall } from 'lucide-react'
import { SAMPLE_NOTICE, getProductBySlug, getRelatedProducts, keyFeatures } from '../data/products'
import { site } from '../config/site'
import { useSeo, localBusinessSchema } from '../hooks/useSeo'
import PageHeader from '../components/ui/PageHeader'
import ProductViewer from '../components/ProductViewer'
import ProductCard from '../components/ProductCard'
import SpecTable from '../components/ui/SpecTable'
import Button from '../components/ui/Button'
import Icon from '../components/ui/Icon'
import Reveal from '../components/ui/Reveal'
import SectionHeading from '../components/ui/SectionHeading'
import CTASection from '../components/CTASection'

/**
 * ProductDetails
 * ---------------------------------------------------------------------------
 * One page per machine, generated entirely from the catalogue entry: media
 * (photos / 3D / exploded view), overview, applications, the full technical
 * table, accessories and the other models in the range.
 *
 * Product structured data is emitted for search with the fixed catalogue price
 * (Rs. 360,000 in NPR) as the offer state.
 */
export default function ProductDetails() {
  const { slug } = useParams()
  const product = getProductBySlug(slug)
  const related = product ? getRelatedProducts(product.slug, 2) : []

  const productUrl = `${site.url}/threshers/${slug}`

  useSeo({
    title: product
      ? `${product.code} ${product.name} — Thresher Machine in Nepal`
      : 'Thresher machine',
    description: product
      ? `${product.code} ${product.name}: ${product.short} Available from Daju Bhai Grill Udyog, Jhapa Gaupalika, Jhapa, Nepal.`
      : 'Thresher machines from Daju Bhai Grill Udyog, Jhapa Gaupalika, Jhapa, Nepal.',
    path: `/threshers/${slug}`,
    image: product?.imagery.card,
    type: 'product',
    jsonLd: product
      ? [
          {
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: `${product.code} ${product.name}`,
            sku: product.code,
            category: `Agricultural machinery — ${product.category}`,
            description: product.summary,
            url: productUrl,
            image: `${site.url}${product.imagery.card}`,
            brand: { '@type': 'Brand', name: site.name },
            manufacturer: { '@type': 'Organization', name: site.name },
            additionalProperty: product.specs.map((spec) => ({
              '@type': 'PropertyValue',
              name: spec.label,
              value: spec.value,
            })),
            offers: {
              '@type': 'Offer',
              url: productUrl,
              availability: 'https://schema.org/InStock',
              price: Number(product.price.replace(/[^\d]/g, '')),
              priceCurrency: 'NPR',
              seller: { '@type': 'Organization', name: site.name },
            },
          },
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: `${site.url}/` },
              { '@type': 'ListItem', position: 2, name: 'Threshers', item: `${site.url}/threshers` },
              { '@type': 'ListItem', position: 3, name: product.code, item: productUrl },
            ],
          },
          localBusinessSchema(),
        ]
      : [localBusinessSchema()],
  })

  if (!product) {
    return (
      <section className="section pt-36">
        <div className="shell max-w-xl">
          <p className="eyebrow text-agri-600">Not found</p>
          <h1 className="h-section mt-4">That machine is not in the catalogue</h1>
          <p className="lede mt-5">
            The model you followed may have been renamed or replaced. The current range is listed
            under Threshers.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button to="/threshers" variant="primary">
              <ArrowLeft size={16} />
              Back to the range
            </Button>
            <Button to="/contact#inquiry" variant="outline">
              Ask about a machine
            </Button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <>
      <PageHeader
        eyebrow={`${product.category} thresher`}
        title={`${product.code} ${product.name}`}
        lead={product.summary}
        breadcrumb={[
          { label: 'Home', to: '/' },
          { label: 'Threshers', to: '/threshers' },
          { label: product.code },
        ]}
        action={
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button to={`/contact?product=${encodeURIComponent(product.code)}#inquiry`} variant="accent" size="lg">
              Request a Quote
            </Button>
            <Button href={site.phone.href} variant="outlineLight" size="lg">
              <PhoneCall size={16} />
              Call Us
            </Button>
          </div>
        }
      />

      {/* ---------------- Media: photos, 3D, exploded view ---------------- */}
      <section className="section-tight">
        <div className="shell">
          <ProductViewer product={product} />

          <div className="mt-8 flex flex-col gap-4 border-t border-ink/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-2xl text-xs leading-relaxed text-ink/55">
              Rotate the machine, open the exploded view to see how the assemblies separate, or step
              through the photographs. Specifications are listed further down this page.
            </p>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              <Button
                to={`/contact?product=${encodeURIComponent(product.code)}#inquiry`}
                variant="primary"
                size="sm"
              >
                Request a Quote
                <ArrowRight size={15} />
              </Button>
              <Button to="/threshers" variant="outline" size="sm">
                Compare models
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Overview, applications, accessories ---------------- */}
      <section className="section border-y border-ink/10 bg-sand-50">
        <div className="shell grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
          <div>
            <Reveal variant="fade">
              <p className="eyebrow text-agri-600">Overview</p>
            </Reveal>
            <Reveal>
              <h2 className="h-section mt-4">What this machine is for</h2>
            </Reveal>
            <Reveal delay={0.06}>
              <p className="lede mt-5">{product.summary}</p>
            </Reveal>

            <ul className="mt-8 grid gap-px overflow-hidden border border-ink/12 bg-ink/12 sm:grid-cols-2">
              {product.features.map((feature) => (
                <li key={feature} className="flex gap-3 bg-paper p-4 text-sm leading-relaxed">
                  <Check size={16} className="mt-0.5 shrink-0 text-agri-600" />
                  {feature}
                </li>
              ))}
            </ul>

            <div className="mt-12">
              <h3 className="text-2xs font-semibold uppercase tracking-technical text-ink/50">
                Applications
              </h3>
              <ul className="mt-4 divide-y divide-ink/10 border-y border-ink/10">
                {product.applications.map((application) => (
                  <li key={application} className="py-3.5 text-sm text-ink/70">
                    {application}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-8">
            <div className="border border-ink/12 bg-paper p-6">
              <h3 className="text-2xs font-semibold uppercase tracking-technical text-ink/50">
                Price
              </h3>
              <p className="mt-4 font-display text-3xl font-extrabold tracking-[-0.03em] text-ink tabular">
                {product.price}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink/65">
                The same fixed price for every model in the range.
              </p>
            </div>

            <div className="border border-ink/12 bg-paper p-6">
              <h3 className="text-2xs font-semibold uppercase tracking-technical text-ink/50">
                Compatible crops
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {product.crops.map((crop) => (
                  <li
                    key={crop}
                    className="rounded-[2px] border border-agri-200 bg-agri-50 px-3 py-1.5 text-xs font-semibold text-agri-700"
                  >
                    {crop}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-ink/12 bg-paper p-6">
              <h3 className="text-2xs font-semibold uppercase tracking-technical text-ink/50">
                Available accessories
              </h3>
              <ul className="mt-4 space-y-2 text-sm text-ink/70">
                {product.accessories.map((accessory) => (
                  <li key={accessory} className="flex gap-2.5">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-ink/25" />
                    {accessory}
                  </li>
                ))}
              </ul>
              <p className="mt-5 border-t border-ink/10 pt-4 text-xs text-ink/50">
                Accessories are quoted per machine. Ask for the list with the current prices when you
                request a quotation.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* ---------------- Key features & benefits ---------------- */}
      <section className="section">
        <div className="shell">
          <SectionHeading
            eyebrow="At a glance"
            title="Key Features & Benefits"
            lead="The six practical points that matter in the field — from the fan and the throw distance to speed, safety, warranty and easy bearing service."
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {keyFeatures.map((feature, index) => (
              <Reveal
                key={feature.title}
                variant="fade"
                delay={Math.min(index * 0.06, 0.3)}
                className="h-full"
              >
                <article
                  className={[
                    'flex h-full flex-col rounded-[3px] border p-6 transition-shadow duration-300',
                    feature.highlight
                      ? 'border-ink bg-ink shadow-plate hover:shadow-lift'
                      : 'border-ink/12 bg-paper hover:shadow-lift',
                  ].join(' ')}
                >
                  <span
                    className={[
                      'grid h-12 w-12 shrink-0 place-items-center rounded-[3px]',
                      feature.highlight
                        ? 'bg-amber_acc-400 text-ink'
                        : 'border border-agri-100 bg-agri-50 text-agri-600',
                    ].join(' ')}
                  >
                    <Icon name={feature.icon} size={22} />
                  </span>

                  <h3
                    className={`mt-5 font-display text-lg font-bold ${
                      feature.highlight ? 'text-sand-50' : 'text-ink'
                    }`}
                  >
                    {feature.title}
                  </h3>

                  {feature.value ? (
                    <p
                      className={`mt-2 font-display text-3xl font-extrabold tracking-[-0.03em] tabular ${
                        feature.highlight ? 'text-amber_acc-300' : 'text-agri-600'
                      }`}
                    >
                      {feature.value}
                    </p>
                  ) : null}

                  <p
                    className={`mt-2.5 text-sm leading-relaxed ${
                      feature.highlight ? 'text-sand-100/70' : 'text-ink/65'
                    }`}
                  >
                    {feature.text}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Technical specification table ---------------- */}
      <section className="on-dark section bg-graphite">
        <div className="shell">
          <SectionHeading
            tone="dark"
            eyebrow="Technical specifications"
            title={`${product.code} specification table`}
            lead="Construction, drive, crops and dimensions for this model. Values marked as samples are placeholders until the machine data is confirmed."
          />

          <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-14">
            <SpecTable rows={product.specs} notice={SAMPLE_NOTICE} tone="dark" caption={`${product.code} specifications`} />

            <div className="space-y-6">
              <div className="border border-white/12 bg-white/[0.03] p-6">
                <h3 className="text-2xs font-semibold uppercase tracking-technical text-sand-100/50">
                  Dimensions &amp; weight
                </h3>
                <dl className="mt-4 space-y-3 text-sm">
                  {product.specs
                    .filter((spec) =>
                      ['Dimensions (L × W × H)', 'Approximate weight', 'Threshing drum'].includes(
                        spec.label,
                      ),
                    )
                    .map((spec) => (
                      <div
                        key={spec.label}
                        className="flex flex-col gap-1 border-b border-white/10 pb-3 last:border-0"
                      >
                        <dt className="text-xs text-sand-100/50">{spec.label}</dt>
                        <dd className="tabular font-semibold text-sand-50">{spec.value}</dd>
                      </div>
                    ))}
                </dl>
              </div>

              <div className="border border-white/12 bg-white/[0.03] p-6">
                <h3 className="text-2xs font-semibold uppercase tracking-technical text-sand-100/50">
                  Warranty &amp; service
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-sand-100/65">
                  Warranty terms are stated in the quotation for each machine. Service and spare
                  parts are handled from Jhapa Gaupalika, Jhapa.
                </p>
                <Button
                  to={`/contact?product=${encodeURIComponent(product.code)}#inquiry`}
                  variant="accent"
                  size="sm"
                  className="mt-5"
                >
                  Ask about warranty
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Related machines ---------------- */}
      <section className="section">
        <div className="shell">
          <SectionHeading
            eyebrow="Also in the range"
            title="Other models to compare"
            lead="Every model is the same price, so the choice is only about which frame suits the work."
            action={
              <Button to="/threshers" variant="outline" size="sm">
                All threshers
                <ArrowRight size={15} />
              </Button>
            }
          />

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {related.map((item, index) => (
              <ProductCard key={item.id} product={item} index={index} />
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            {related.map((item) => (
              <Link key={item.id} to={`/threshers/${item.slug}`} className="link-quiet text-sm">
                {item.code} {item.name}
              </Link>
            ))}
            <Link to="/threshers" className="link-quiet text-sm">
              Back to the range
            </Link>
          </div>
        </div>
      </section>
      <CTASection />
    </>
  )
}
