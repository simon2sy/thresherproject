import { PhoneCall, MessageCircle } from 'lucide-react'
import { ctaSection } from '../data/content'
import { site } from '../config/site'
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
  return (
    <section className="on-dark relative isolate overflow-hidden bg-ink">
      <AuroraBackdrop variant="section" sweep={false} />
      <div
        className="absolute inset-0 opacity-[0.16] [mask-image:radial-gradient(60%_60%_at_50%_50%,#000_0%,transparent_100%)]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.10) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.10) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
        aria-hidden="true"
      />
      {/* Aqua→amber brand rail with a highlight travelling down it. */}
      <div className="rail-brand motion-safe:animate-hue-drift" aria-hidden="true">
        <span className="absolute inset-x-0 h-1/3 bg-gradient-to-b from-white/70 to-transparent motion-safe:animate-rail-sweep" />
      </div>

      <div className="shell relative py-16 lg:py-20">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-aqua-300">Request a quote</p>
            <h2 className="h-section mt-4 text-sand-50">{ctaSection.title}</h2>
            <p className="lede mt-5 text-sand-100/70">{ctaSection.text}</p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button to="/contact#inquiry" variant="accent" size="lg">
                Request a Quote
              </Button>
              <Button href={site.phone.href} variant="outlineLight" size="lg">
                <PhoneCall size={16} />
                Call Us
              </Button>
            </div>
          </Reveal>

          <Reveal variant="fade" delay={0.1} className="shrink-0">
            <dl className="glass-static rim-top grid w-full max-w-sm gap-px overflow-hidden rounded-[3px] bg-white/10 sm:grid-cols-2 lg:w-[22rem]">
              <div className="bg-ink px-5 py-4">
                <dt className="text-2xs uppercase tracking-technical text-sand-100/45">Phone</dt>
                <dd className="mt-1.5">
                  <a href={site.phone.href} className="tabular text-sm font-semibold text-sand-50">
                    {site.phone.display}
                  </a>
                </dd>
              </div>
              {site.email.display ? (
                <div className="bg-ink px-5 py-4">
                  <dt className="text-2xs uppercase tracking-technical text-sand-100/45">Email</dt>
                  <dd className="mt-1.5">
                    <a href={site.email.href} className="break-all text-sm font-semibold text-sand-50">
                      {site.email.display}
                    </a>
                  </dd>
                </div>
              ) : null}
              <div className="bg-ink px-5 py-4">
                <dt className="text-2xs uppercase tracking-technical text-sand-100/45">Workshop</dt>
                <dd className="mt-1.5 text-sm font-semibold text-sand-50">{site.address.line1}</dd>
              </div>
              <div className="bg-ink px-5 py-4">
                <dt className="text-2xs uppercase tracking-technical text-sand-100/45">District</dt>
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
              Message on WhatsApp
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
