import { Clock, Mail, MapPin, MessageCircle, PhoneCall, User } from 'lucide-react'
import { flags, site } from '../config/site'
import ContactForm from './ContactForm'
import MapPanel from './MapPanel'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'
import Button from './ui/Button'

/**
 * Contact
 * ---------------------------------------------------------------------------
 * Contact section used on the home page and on the Contact page: company
 * details, the inquiry form (anchored at #inquiry so every "Request a Quote"
 * button can deep-link to it) and the location map.
 */
export default function Contact({ tone = 'light', showHeading = true, id = 'inquiry' }) {
  const dark = tone === 'dark'
  const card = dark ? 'border-white/12 bg-white/[0.03]' : 'border-ink/12 bg-paper'
  const heading = dark ? 'text-sand-50' : 'text-ink'
  const body = dark ? 'text-sand-100/65' : 'text-ink/65'
  const accent = dark ? 'text-aqua-300' : 'text-agri-600'
  const label = dark ? '!text-sand-100/45' : ''

  return (
    <div>
      {showHeading ? (
        <SectionHeading
          tone={tone}
          eyebrow="Contact"
          title="Talk to the workshop"
          lead="Send the inquiry form with your crop, land size and the power you have available, or simply call. We will tell you which machine fits and what it costs."
        />
      ) : null}

      <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14">
        <Reveal className="space-y-6">
          <div className={`border p-6 ${card}`}>
            <h3 className={`font-display text-xl font-bold ${heading}`}>{site.name}</h3>
            <p className={`mt-1.5 text-sm ${body}`}>{site.tagline}</p>

            <address className="mt-7 space-y-5 text-sm not-italic">
              <div className="flex gap-3.5">
                <MapPin size={18} className={`mt-0.5 shrink-0 ${accent}`} />
                <div>
                  <p className={`tech-label ${label}`}>Address</p>
                  <p className={`mt-1 font-medium ${heading}`}>
                    {site.address.line1}
                    <br />
                    {site.address.line2}
                    <br />
                    {site.address.country}
                  </p>
                </div>
              </div>

              <div className="flex gap-3.5">
                <User size={18} className={`mt-0.5 shrink-0 ${accent}`} />
                <div>
                  <p className={`tech-label ${label}`}>Proprietor</p>
                  <p className={`mt-1 font-medium ${heading}`}>{site.proprietor}</p>
                </div>
              </div>

              <div className="flex gap-3.5">
                <PhoneCall size={18} className={`mt-0.5 shrink-0 ${accent}`} />
                <div>
                  <p className={`tech-label ${label}`}>Phone</p>
                  <p className="mt-1">
                    <a href={site.phone.href} className={`tabular font-semibold ${heading}`}>
                      {site.phone.display}
                    </a>
                  </p>
                  {site.phone.isPlaceholder ? (
                    <p className={`mt-1 text-xs ${body}`}>
                      Example number in this build — replace with the real contact number.
                    </p>
                  ) : null}
                </div>
              </div>

              {site.email.display ? (
                <div className="flex gap-3.5">
                  <Mail size={18} className={`mt-0.5 shrink-0 ${accent}`} />
                  <div>
                    <p className={`tech-label ${label}`}>Email</p>
                    <p className="mt-1">
                      <a href={site.email.href} className={`break-all font-semibold ${heading}`}>
                        {site.email.display}
                      </a>
                    </p>
                  </div>
                </div>
              ) : null}

              <div className="flex gap-3.5">
                <Clock size={18} className={`mt-0.5 shrink-0 ${accent}`} />
                <div className="w-full">
                  <p className={`tech-label ${label}`}>Opening hours</p>
                  <dl className="mt-2 space-y-1.5">
                    {site.hours.map((slot) => (
                      <div key={slot.days} className="flex justify-between gap-4 text-sm">
                        <dt className={body}>{slot.days}</dt>
                        <dd className={`tabular font-medium ${heading}`}>{slot.time}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </address>
          </div>
          <div className={`border p-6 ${card}`}>
            <h3 className={`text-2xs font-semibold uppercase tracking-technical ${label || 'text-ink/50'}`}>
              Prefer to talk first?
            </h3>
            <p className={`mt-3 text-sm leading-relaxed ${body}`}>
              Call the workshop during opening hours, or send a message on WhatsApp with a photo of
              your crop and a note about where the machine will be used.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Button href={site.phone.href} variant={dark ? 'light' : 'primary'} size="sm">
                <PhoneCall size={15} />
                Call Us
              </Button>
              <Button href={site.whatsapp.href} external variant="outline" size="sm">
                <MessageCircle size={15} />
                WhatsApp
              </Button>
            </div>
            <p className={`mt-4 text-xs ${dark ? 'text-sand-100/40' : 'text-ink/45'}`}>
              {flags.inquiryEndpoint
                ? 'Inquiries submitted here are delivered to our team inbox.'
                : 'This build runs without a backend: the form validates and confirms, but does not send.'}
            </p>
          </div>
        </Reveal>
        <Reveal variant="right" delay={0.08}>
          <div id={id} className="scroll-mt-28 border border-ink/12 bg-paper p-6 sm:p-8">
            <h3 className="h-card">Request a quote</h3>
            <p className="mt-2 text-sm text-ink/65">
              Required fields are marked with an asterisk. Everything else helps us answer faster.
            </p>
            <div className="mt-7">
              <ContactForm />
            </div>
          </div>
        </Reveal>
      </div>
      <Reveal variant="fade" className="mt-10">
        <MapPanel />
      </Reveal>
    </div>
  )
}
