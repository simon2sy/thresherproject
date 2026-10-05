import { ChevronDown, PhoneCall, Tractor, Wheat, Cog, BadgeCheck } from 'lucide-react'
import { useLanguage, useProducts, useSite } from '../i18n'
import Button from './ui/Button'
import CapabilityStrip from './ui/CapabilityStrip'
import Reveal from './ui/Reveal'

/**
 * Hero — golden-hour harvest theme.
 * Left: wheat eyebrow pill, soil→harvest headline, crop chips, gold CTAs.
 * Right: the machine framed like thresher paintwork + floating price sun.
 */
const CROP_CHIPS = ['Paddy', 'Wheat', 'Maize', 'Mustard', 'Millet']

export default function Hero() {
  const { t } = useLanguage()
  const site = useSite()
  const products = useProducts()
  const flagship = products[0]

  return (
    <section
      className="relative isolate overflow-hidden pt-28 sm:pt-32 lg:pt-36"
      style={{ background: '#FFFEF9' }}
    >
      {/* Golden-hour sun wash */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(52% 44% at 78% 8%, rgba(247,183,51,0.32) 0%, rgba(255,254,249,0) 62%), radial-gradient(40% 36% at 8% 90%, rgba(78,150,38,0.14) 0%, rgba(255,254,249,0) 60%)',
        }}
      />
      {/* Tilled furrows, masked so they fade to the edges. */}
      <div
        className="absolute inset-0 [mask-image:radial-gradient(75%_65%_at_50%_38%,#000_0%,transparent_100%)]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(90deg, rgba(22,16,6,0.055) 0 2px, transparent 2px 30px)',
        }}
        aria-hidden="true"
      />
      {/* Wheat tile, very faint */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-wheat opacity-[0.35] [mask-image:radial-gradient(60%_55%_at_50%_30%,#000_0%,transparent_78%)]"
      />
      {/* Harvest rail */}
      <div className="rail-brand motion-safe:animate-hue-drift" aria-hidden="true">
        <span className="absolute inset-x-0 h-1/3 bg-gradient-to-b from-white/70 to-transparent motion-safe:animate-rail-sweep" />
      </div>

      <div className="shell relative">
        <div className="grid gap-10 pb-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.12fr)] lg:items-center lg:gap-12 lg:pb-14">
          {/* Mobile: the machine photo leads; desktop restores the original
              text-left / image-right arrangement. */}
          <div className="order-2 max-w-2xl lg:order-1">
            <Reveal variant="fade">
              <p className="inline-flex items-center gap-2.5 rounded-full border border-harvest-600/25 bg-harvest-100/70 py-1.5 pl-2 pr-4 text-2xs font-semibold uppercase tracking-technical text-harvest-800 shadow-[0_6px_20px_-10px_rgba(184,115,8,0.5)]">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-gradient-to-br from-harvest-400 to-harvest-600 text-ink">
                  <Wheat size={13} strokeWidth={2.2} />
                </span>
                <span className="pulse-dot-green" aria-hidden="true" />
                {t('hero.eyebrow', {
                  locality: site.address.locality,
                  district: site.address.district,
                })}
              </p>
            </Reveal>

            <Reveal delay={0.05}>
              <h1 className="h-display mt-5">
                <span className="text-ink">{t('hero.titleLead')}</span>
                <span className="text-brand-ink">{t('hero.titleAccent')}</span>
              </h1>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="lede mt-6 max-w-xl text-ink/75">
                {t('hero.lede')}
              </p>
            </Reveal>

            <Reveal delay={0.16}>
              <ul className="mt-5 flex flex-wrap gap-2" aria-label="Crops">
                {CROP_CHIPS.map((crop) => (
                  <li
                    key={crop}
                    className="inline-flex items-center gap-1.5 rounded-full border border-paddy-700/20 bg-paddy-50 px-3 py-1.5 text-xs font-semibold text-paddy-800"
                  >
                    <Wheat size={12} strokeWidth={2} className="text-paddy-600" />
                    {crop}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.18}>
              <p className="mt-5 max-w-xl border-l-2 border-harvest-400 pl-4 text-sm leading-relaxed text-ink/60">
                {t('hero.sub')}
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button to="/threshers" variant="accent" size="lg">
                  <Tractor size={17} />
                  {t('common.exploreThreshers')}
                </Button>
              </div>
            </Reveal>

            <Reveal variant="fade" delay={0.3}>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-2xs uppercase tracking-technical text-ink/60">
                <a
                  href={site.phone.href}
                  className="flex items-center gap-2 transition-colors hover:text-harvest-700"
                >
                  <PhoneCall size={13} />
                  {site.phone.display}
                </a>
                <span className="hidden h-3 w-px bg-ink/15 sm:block" />
                <span className="flex items-center gap-2 motion-safe:animate-bob">
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-paddy-100 text-paddy-700">
                    <Cog size={12} />
                  </span>
                  {t('hero.spareParts')}
                </span>
                <span className="hidden h-3 w-px bg-ink/15 sm:block" />
                <span className="flex items-center gap-1.5">
                  <BadgeCheck size={13} className="text-harvest-600" />
                  {t('hero.serviceFromJhapa')}
                </span>
              </div>
            </Reveal>
          </div>

          <div className="relative order-1 lg:order-2">
            <Reveal variant="fade" delay={0.1}>
              <div className="flex items-center justify-between gap-4 border-b-2 border-harvest-500/40 pb-3">
                <p className="flex items-center gap-2.5 text-2xs uppercase tracking-technical text-ink/55">
                  <span className="rounded-[3px] bg-ink px-2 py-1 tabular font-semibold text-harvest-300">
                    {flagship.code}
                  </span>
                  <span className="h-3 w-px bg-ink/15" />
                  {flagship.name}
                </p>
                <p className="hidden text-2xs uppercase tracking-technical text-ink/45 sm:block">
                  {t('hero.range', { count: products.length })}
                </p>
              </div>
            </Reveal>

            {/* Machine — grain-sack card with sun pool + floating price sun */}
            <div className="grain-card group relative mt-4 overflow-hidden rounded-[6px] p-4 shadow-[0_30px_60px_-35px_rgba(22,16,6,0.45)] sm:p-5">
              <span className="sheen" aria-hidden="true" />
              <div
                className="pointer-events-none absolute -bottom-24 left-1/2 h-48 w-[130%] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgba(247,183,51,0.35),transparent)]"
                aria-hidden="true"
              />
              <div className="relative h-[300px] overflow-hidden rounded-[4px] border border-ink/10 sm:h-[400px] lg:h-[500px]">
                <img
                  src="/images/gallery/terai-paddy-season.jpg"
                  alt={t('hero.imageAlt')}
                  loading="eager"
                  decoding="async"
                  fetchpriority="high"
                  className="h-full w-full object-cover drop-shadow-[0_28px_50px_rgba(22,16,6,0.3)] transition-transform duration-700 ease-smooth group-hover:scale-[1.03]"
                />
                <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent" />
                <span className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 p-4">
                  <span className="text-left">
                    <span className="block text-2xs font-semibold uppercase tracking-technical text-harvest-300">
                      Terai · Paddy season
                    </span>
                    <span className="mt-0.5 block font-display text-sm font-bold text-white">
                      Grain in. Grain out. Straw aside.
                    </span>
                  </span>
                  <span className="harvest-disc h-20 w-20 shrink-0 flex-col !text-center leading-none">
                    <span className="text-[0.6rem] font-bold uppercase tracking-wider">Rs.</span>
                    <span className="text-sm font-extrabold">360K</span>
                    <span className="text-[0.58rem] font-semibold">all models</span>
                  </span>
                </span>
              </div>
              <div className="sack-stitch mt-4" aria-hidden="true" />
            </div>

            <Reveal variant="fade" delay={0.28}>
              <dl className="mt-4 grid grid-cols-3 gap-px overflow-hidden rounded-[4px] border border-ink/10 bg-ink/10">
                <div className="border-t-2 border-paddy-600 bg-paper px-3 py-3">
                  <dt className="flex items-center gap-1.5 text-2xs uppercase tracking-technical text-ink/45">
                    <Cog size={11} className="text-paddy-600" />
                    {t('hero.specDrive')}
                  </dt>
                  <dd className="mt-1 text-xs font-semibold text-ink">
                    {t('hero.specDriveValue')}
                  </dd>
                </div>
                <div className="border-t-2 border-harvest-500 bg-paper px-3 py-3">
                  <dt className="text-2xs uppercase tracking-technical text-ink/45">
                    {t('hero.specPrice')}
                  </dt>
                  <dd className="mt-1 text-xs font-semibold text-harvest-700">{flagship.price}</dd>
                </div>
                <div className="border-t-2 border-clay-500 bg-paper px-3 py-3">
                  <dt className="flex items-center gap-1.5 text-2xs uppercase tracking-technical text-ink/45">
                    <Wheat size={11} className="text-clay-500" />
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

        <CapabilityStrip tone="light" className="rounded-[6px] border border-ink/10" />
      </div>
    </section>
  )
}
