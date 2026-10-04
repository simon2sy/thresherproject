import { PhoneCall, MessageCircle } from 'lucide-react'
import { useCtaSection, useLanguage, useSite } from '../i18n'
import Button from './ui/Button'
import Reveal from './ui/Reveal'
import AuroraBackdrop from './ui/AuroraBackdrop'

/**
 * CTASection
 * ---------------------------------------------------------------------------
 * Final call to action. Carries the two routes a real buyer uses: the inquiry
 * form and a direct phone call. WhatsApp is offered as a third, low-friction
 * option on touch devices.
 */
export default function CTASection() {
  const { t } = useLanguage()
  const site = useSite()
  const ctaSection = useCtaSection()

  return (
    <section className="on-dark relative isolate overflow-hidden bg-ink">
      <AuroraBackdrop variant="section" sweep={false} />
      {/* Wheat field silhouette */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-wheat opacity-[0.14] [mask-image:radial-gradient(70%_60%_at_50%_60%,#000_0%,transparent_80%)]"
      />
      <div
        className="absolute inset-0 opacity-[0.16] [mask-image:radial-gradient(60%_60%_at_50%_50%,#000_0%,transparent_100%)]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(115deg, rgba(255,248,230,0.06) 0 1.5px, transparent 1.5px 26px)',
        }}
        aria-hidden="true"
      />
      {/* Harvest rail */}
      <div className="rail-brand motion-safe:animate-hue-drift" aria-hidden="true">
        <span className="absolute inset-x-0 h-1/3 bg-gradient-to-b from-white/70 to-transparent motion-safe:animate-rail-sweep" />
      </div>

      <div className="shell relative py-16 lg:py-20">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-harvest-300">{t('cta.eyebrow')}</p>
            <h2 className="h-section mt-4 text-sand-50">
              {ctaSection.title.split(' ').slice(0, -2).join(' ')}{' '}
              <span className="text-gradient">{ctaSection.title.split(' ').slice(-2).join(' ')}</span>
            </h2>
            <p className="lede mt-5 text-sand-100/70">{ctaSection.text}</p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href={site.phone.href} variant="accent" size="lg">
                <PhoneCall size={16} />
                {t('common.callUs')}
              </Button>
            </div>
          </Reveal>

          <Reveal variant="fade" delay={0.1} className="shrink-0">
            <dl className="glass-static rim-top grid w-full max-w-sm gap-px overflow-hidden rounded-[3px] bg-white/10 sm:grid-cols-2 lg:w-[22rem]">
              <div className="bg-ink px-5 py-4">
                <dt className="text-2xs uppercase tracking-technical text-sand-100/45">
                  {t('cta.phone')}
                </dt>
                <dd className="mt-1.5">
                  <a href={site.phone.href} className="tabular text-sm font-semibold text-sand-50">
                    {site.phone.display}
                  </a>
                </dd>
              </div>
              {site.email.display ? (
                <div className="bg-ink px-5 py-4">
                  <dt className="text-2xs uppercase tracking-technical text-sand-100/45">
                    {t('cta.email')}
                  </dt>
                  <dd className="mt-1.5">
                    <a href={site.email.href} className="break-all text-sm font-semibold text-sand-50">
                      {site.email.display}
                    </a>
                  </dd>
                </div>
              ) : null}
              <div className="bg-ink px-5 py-4">
                <dt className="text-2xs uppercase tracking-technical text-sand-100/45">
                  {t('cta.workshop')}
                </dt>
                <dd className="mt-1.5 text-sm font-semibold text-sand-50">{site.address.line1}</dd>
              </div>
              <div className="bg-ink px-5 py-4">
                <dt className="text-2xs uppercase tracking-technical text-sand-100/45">
                  {t('cta.district')}
                </dt>
                <dd className="mt-1.5 text-sm font-semibold text-sand-50">{site.address.district}</dd>
              </div>
            </dl>

            <a
              href={site.whatsapp.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex items-center justify-center gap-2 rounded-[3px] border border-white/20 py-3 text-sm font-semibold text-sand-100/80 transition-colors hover:border-white/50 hover:text-sand-50"
            >
              <MessageCircle size={16} />
              {t('common.messageWhatsApp')}
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
