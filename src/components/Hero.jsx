import { ChevronDown, PhoneCall } from 'lucide-react'
import { useLanguage, useProducts, useSite } from '../i18n'
import Button from './ui/Button'
import CapabilityStrip from './ui/CapabilityStrip'
import Reveal from './ui/Reveal'

/**
 * Hero
 * ---------------------------------------------------------------------------
 * First screen. Answers the five questions a buyer has before scrolling: who
 * this is, what they sell, that the machine is the product, where they are, and
 * how to get in touch.
 *
 * An illustrated thresher sits on the right: a static image keeps the first
 * paint fast, and the interactive 3D viewer is left to the product pages.
 */
export default function Hero() {
  const { t } = useLanguage()
  const site = useSite()
  const products = useProducts()
  const flagship = products[0]

  return (
    <section
      className="relative isolate overflow-hidden pt-28 sm:pt-32 lg:pt-36"
      style={{
        /* Clean white base. */
        background: '#FFFFFF',
      }}
    >

      {/* Faint technical grid, masked so it fades to the edges. Uses an
          explicit ink stroke tuned to match the shared `grid-tech` token. */}
      <div
        className="absolute inset-0 opacity-[0.16] [mask-image:radial-gradient(70%_60%_at_50%_40%,#000_0%,transparent_100%)]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(5,14,18,0.10) 1px, transparent 1px), linear-gradient(to bottom, rgba(5,14,18,0.10) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
        }}
        aria-hidden="true"
      />
      {/* Aqua→amber brand rail with a highlight travelling down it. */}
      <div className="rail-brand motion-safe:animate-hue-drift" aria-hidden="true">
        <span className="absolute inset-x-0 h-1/3 bg-gradient-to-b from-white/70 to-transparent motion-safe:animate-rail-sweep" />
      </div>

      <div className="shell relative">
        <div className="grid gap-10 pb-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.12fr)] lg:items-center lg:gap-12 lg:pb-14">
          {/* Mobile: the machine photo leads; desktop restores the original
              text-left / image-right arrangement. */}
          <div className="order-2 max-w-2xl lg:order-1">
            <Reveal variant="fade">
              <p className="eyebrow text-agri-600">
                <span className="pulse-dot" aria-hidden="true" />
                {t('hero.eyebrow', {
                  locality: site.address.locality,
                  district: site.address.district,
                })}
              </p>
            </Reveal>

            <Reveal delay={0.05}>
              <h1 className="h-display mt-5">
                <span className="text-ink">{t('hero.titleLead')}</span>
                {/*
                  The travelling gradient is a `transform` on an oversized inner
                  span (not `background-position`), so the headline animates on
                  the compositor instead of repainting every frame.
                */}
                <span className="relative inline-block overflow-hidden align-bottom">
                  <span className="text-brand-ink motion-safe:animate-gradient-pan inline-block w-[200%]">
                    {t('hero.titleAccent')}
                  </span>
                </span>
              </h1>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="lede mt-6 max-w-xl text-ink/75">
                {t('hero.lede')}
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-ink/60">
                {t('hero.sub')}
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button to="/threshers" variant="accent" size="lg">
                  {t('common.exploreThreshers')}
                </Button>
                <Button to="/contact#inquiry" variant="outline" size="lg">
                  {t('common.requestQuote')}
                </Button>
              </div>
            </Reveal>

            <Reveal variant="fade" delay={0.3}>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-2xs uppercase tracking-technical text-ink/60">
                <a
                  href={site.phone.href}
                  className="flex items-center gap-2 transition-colors hover:text-agri-600"
                >
                  <PhoneCall size={13} />
                  {site.phone.display}
                </a>
                <span className="hidden h-3 w-px bg-ink/15 sm:block" />
                {/* Availability chip — gently bobs to draw the eye without
                    shouting. The dot pulses to signal "open for business". */}
                <span className="flex items-center gap-2 motion-safe:animate-bob">
                  <span className="pulse-dot" aria-hidden="true" />
                  {t('hero.spareParts')}
                </span>
                <span className="hidden h-3 w-px bg-ink/15 sm:block" />
                <span>{t('hero.serviceFromJhapa')}</span>
              </div>
            </Reveal>
          </div>

          <div className="relative order-1 lg:order-2">
            <Reveal variant="fade" delay={0.1}>
              <div className="flex items-center justify-between gap-4 border-b border-ink/10 pb-3">
                <p className="flex items-center gap-2.5 text-2xs uppercase tracking-technical text-ink/55">
                  <span className="tabular font-semibold text-ink">{flagship.code}</span>
                  <span className="h-3 w-px bg-ink/15" />
                  {flagship.name}
                </p>
                <p className="hidden text-2xs uppercase tracking-technical text-ink/45 sm:block">
                  {t('hero.range', { count: products.length })}
                </p>
              </div>
            </Reveal>

            {/* Machine sits on a light card with a warm pool of light beneath
                it, so the product reads as the hero object. */}
            <div className="relative mt-4 overflow-hidden rounded-[4px] border border-ink/10 bg-white p-4 shadow-[0_30px_60px_-35px_rgba(11,11,12,0.35)] motion-safe:animate-float-soft sm:p-6">
              <span className="sheen" aria-hidden="true" />
              <div
                className="pointer-events-none absolute -bottom-24 left-1/2 h-48 w-[130%] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgba(52,203,219,0.28),transparent)]"
                aria-hidden="true"
              />
              <div className="relative h-[300px] sm:h-[400px] lg:h-[520px]">
                <img
                  src="/images/products/thresher1.jpeg"
                  alt={t('hero.imageAlt')}
                  loading="eager"
                  decoding="async"
                  className="h-full w-full object-contain drop-shadow-[0_28px_50px_rgba(11,11,12,0.25)]"
                />
              </div>
            </div>

            <Reveal variant="fade" delay={0.28}>
              <dl className="mt-4 grid grid-cols-3 gap-px overflow-hidden border border-ink/10 bg-ink/10">
                <div className="bg-paper px-3 py-3">
                  <dt className="text-2xs uppercase tracking-technical text-ink/45">
                    {t('hero.specDrive')}
                  </dt>
                  <dd className="mt-1 text-xs font-semibold text-ink">
                    {t('hero.specDriveValue')}
                  </dd>
                </div>
                <div className="bg-paper px-3 py-3">
                  <dt className="text-2xs uppercase tracking-technical text-ink/45">
                    {t('hero.specPrice')}
                  </dt>
                  <dd className="mt-1 text-xs font-semibold text-ink">{flagship.price}</dd>
                </div>
                <div className="bg-paper px-3 py-3">
                  <dt className="text-2xs uppercase tracking-technical text-ink/45">
                    {t('hero.specCrops')}
                  </dt>
                  <dd className="mt-1 text-xs font-semibold text-ink">
                    {t('hero.specCropsValue')}
                  </dd>
                </div>
              </dl>
            </Reveal>

            <div
              className="pointer-events-none mt-6 hidden items-center gap-2 text-2xs uppercase tracking-technical text-ink/45 lg:flex"
              aria-hidden="true"
            >
              <ChevronDown size={14} />
              {t('hero.scrollHint')}
            </div>
          </div>
        </div>

        <CapabilityStrip tone="light" className="border border-ink/10" />
      </div>
    </section>
  )
}
