import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Check, PhoneCall } from 'lucide-react'
import {
  useKeyFeatures,
  useLanguage,
  useProducts,
  useSampleNotice,
  useSite,
} from '../i18n'
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
  const { t } = useLanguage()
  const site = useSite()
  const allProducts = useProducts()
  const keyFeatures = useKeyFeatures()
  const sampleNotice = useSampleNotice()

  const { slug } = useParams()
  const product = allProducts.find((item) => item.slug === slug)
  const related = product
    ? allProducts.filter((item) => item.slug !== product.slug).slice(0, 2)
    : []

  const productUrl = `${site.url}/threshers/${slug}`

  useSeo({
    title: product
      ? t('meta.product.title', { code: product.code, name: product.name })
      : t('meta.product.fallbackTitle'),
    description: product
      ? t('meta.product.description', {
          code: product.code,
          name: product.name,
          short: product.short,
        })
      : t('meta.product.fallbackDescription'),
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
              { '@type': 'ListItem', position: 1, name: t('nav.home'), item: `${site.url}/` },
              { '@type': 'ListItem', position: 2, name: t('nav.threshers'), item: `${site.url}/threshers` },
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
          <p className="eyebrow text-agri-600">{t('productDetails.notFoundEyebrow')}</p>
          <h1 className="h-section mt-4">{t('productDetails.notFoundTitle')}</h1>
          <p className="lede mt-5">{t('productDetails.notFoundText')}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button to="/threshers" variant="primary">
              <ArrowLeft size={16} />
              {t('common.backToRange')}
            </Button>
            <Button href={site.phone.href} variant="outline">
              <PhoneCall size={16} />
              {t('common.callWorkshop')}
            </Button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <>
      <PageHeader
        eyebrow={t('productDetails.eyebrowTemplate', { category: product.category })}
        title={`${product.code} ${product.name}`}
        lead={product.summary}
        breadcrumb={[
          { label: t('nav.home'), to: '/' },
          { label: t('nav.threshers'), to: '/threshers' },
          { label: product.code },
        ]}
        action={
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href={site.phone.href} variant="accent" size="lg">
              <PhoneCall size={16} />
              {t('common.callUs')}
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
              {t('productDetails.mediaNote')}
            </p>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              <Button href={site.phone.href} variant="primary" size="sm">
                <PhoneCall size={15} />
                {t('common.callUs')}
              </Button>
              <Button to="/threshers" variant="outline" size="sm">
                {t('common.compareModels')}
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
              <p className="eyebrow text-agri-600">{t('productDetails.overviewEyebrow')}</p>
            </Reveal>
            <Reveal>
              <h2 className="h-section mt-4">{t('productDetails.overviewTitle')}</h2>
            </Reveal>
            <Reveal delay={0.06}>
              <p className="lede mt-5">{product.summary}</p>
            </Reveal>

            <ul className="mt-8 grid grid-cols-2 gap-px overflow-hidden border border-ink/10 bg-ink/10 sm:grid-cols-2">
              {product.features.map((feature) => (
                <li key={feature} className="flex gap-2 bg-paper p-3 text-[0.72rem] leading-relaxed sm:gap-3 sm:p-4 sm:text-sm">
                  <Check size={14} className="mt-0.5 shrink-0 text-agri-600 sm:h-4 sm:w-4" />
                  {feature}
                </li>
              ))}
            </ul>

            <div className="mt-12">
              <h3 className="text-2xs font-semibold uppercase tracking-technical text-ink/50">
                {t('productDetails.applications')}
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
            <div className="border border-ink/10 bg-paper p-6">
              <h3 className="text-2xs font-semibold uppercase tracking-technical text-ink/50">
                {t('productDetails.price')}
              </h3>
              <p className="mt-4 font-display text-3xl font-extrabold tracking-[-0.03em] text-ink tabular">
                {product.price}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink/65">
                {t('productDetails.priceNote')}
              </p>
            </div>

            <div className="border border-ink/10 bg-paper p-6">
              <h3 className="text-2xs font-semibold uppercase tracking-technical text-ink/50">
                {t('productDetails.compatibleCrops')}
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

            <div className="border border-ink/10 bg-paper p-6">
              <h3 className="text-2xs font-semibold uppercase tracking-technical text-ink/50">
                {t('productDetails.accessories')}
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
                {t('productDetails.accessoriesNote')}
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* ---------------- Key features & benefits ---------------- */}
      <section className="section">
        <div className="shell">
          <SectionHeading
            eyebrow={t('productDetails.glanceEyebrow')}
            title={t('productDetails.glanceTitle')}
            lead={t('productDetails.glanceLead')}
          />

          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {keyFeatures.map((feature, index) => (
              <Reveal
                key={feature.title}
                variant="fade"
                delay={Math.min(index * 0.06, 0.3)}
                className="h-full"
              >
                <article
                  className={[
                    'flex h-full flex-col rounded-[3px] border p-3.5 transition-shadow duration-300 sm:p-6',
                    feature.highlight
                      ? 'border-ink bg-ink shadow-plate hover:shadow-lift'
                      : 'border-ink/10 bg-paper hover:shadow-lift',
                  ].join(' ')}
                >
                  <span
                    className={[
                      'grid h-9 w-9 shrink-0 place-items-center rounded-[3px] sm:h-12 sm:w-12',
                      feature.highlight
                        ? 'bg-amber_acc-400 text-ink'
                        : 'border border-agri-100 bg-agri-50 text-agri-600',
                    ].join(' ')}
                  >
                    <Icon name={feature.icon} size={22} />
                  </span>

                  <h3
                    className={`mt-4 font-display text-base font-bold sm:mt-5 sm:text-lg ${
                      feature.highlight ? 'text-sand-50' : 'text-ink'
                    }`}
                  >
                    {feature.title}
                  </h3>

                  {feature.value ? (
                    <p
                      className={`mt-1.5 font-display text-2xl font-extrabold tracking-[-0.03em] tabular sm:mt-2 sm:text-3xl ${
                        feature.highlight ? 'text-amber_acc-300' : 'text-agri-600'
                      }`}
                    >
                      {feature.value}
                    </p>
                  ) : null}

                  <p
                    className={`mt-2 text-xs leading-relaxed sm:mt-2.5 sm:text-sm ${
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
            eyebrow={t('productDetails.specEyebrow')}
            title={t('productDetails.specTitleTemplate', { code: product.code })}
            lead={t('productDetails.specLead')}
          />

          <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-14">
            <SpecTable
              rows={product.specs}
              notice={sampleNotice}
              tone="dark"
              caption={t('specTable.caption', { code: product.code })}
            />

            <div className="space-y-6">
              <div className="border border-white/10 bg-white/[0.03] p-6">
                <h3 className="text-2xs font-semibold uppercase tracking-technical text-sand-100/50">
                  {t('productDetails.dimensionsWeight')}
                </h3>
                <dl className="mt-4 space-y-3 text-sm">
                  {product.specs
                    .filter((spec) =>
                      [
                        t('specLabels.drum'),
                        t('specLabels.dimensions'),
                        t('specLabels.weight'),
                      ].includes(spec.label),
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

              <div className="border border-white/10 bg-white/[0.03] p-6">
                <h3 className="text-2xs font-semibold uppercase tracking-technical text-sand-100/50">
                  {t('productDetails.warrantyService')}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-sand-100/65">
                  {t('productDetails.warrantyText')}
                </p>
                <Button href={site.phone.href} variant="accent" size="sm" className="mt-5">
                  <PhoneCall size={15} />
                  {t('common.callWorkshop')}
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
            eyebrow={t('productDetails.alsoEyebrow')}
            title={t('productDetails.alsoTitle')}
            lead={t('productDetails.alsoLead')}
            action={
              <Button to="/threshers" variant="outline" size="sm">
                {t('common.allThreshers')}
                <ArrowRight size={15} />
              </Button>
            }
          />

          <div className="mt-12 grid grid-cols-2 gap-3.5 sm:gap-6 md:grid-cols-2">
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
              {t('common.backToRange')}
            </Link>
          </div>
        </div>
      </section>
      <CTASection />
    </>
  )
}
