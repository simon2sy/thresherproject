import { Clock, Mail, MapPin, MessageCircle, PhoneCall, User } from 'lucide-react'
import { useLanguage, useSite } from '../i18n'
import MapPanel from './MapPanel'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'
import Button from './ui/Button'

/**
 * Contact
 * ---------------------------------------------------------------------------
 * Contact section used on the home page and on the Contact page: company
 * details, a call/WhatsApp visit panel and the location map.
 */
export default function Contact({ tone = 'light', showHeading = true }) {
  const { t } = useLanguage()
  const site = useSite()
  const dark = tone === 'dark'
  const card = dark ? 'border-harvest-400/20 bg-white/[0.03]' : 'grain-card rounded-[6px]'
  const heading = dark ? 'text-sand-50' : 'text-ink'
  const body = dark ? 'text-sand-100/65' : 'text-ink/65'
  const accent = dark ? 'text-aqua-300' : 'text-agri-600'
  const label = dark ? '!text-sand-100/45' : ''

  return (
    <div>
      {showHeading ? (
        <SectionHeading
          tone={tone}
          eyebrow={t('contact.eyebrow')}
          title={t('contact.title')}
          lead={t('contact.lead')}
        />
      ) : null}

      <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14">
        <Reveal className="space-y-6">
          <div className={`border p-6 ${card}`}>
            <h3 className={`font-display text-xl font-bold ${heading}`}>{site.name}</h3>
            <p className={`mt-1.5 flex items-center gap-2 text-sm ${body}`}>
              <span className="inline-block h-1.5 w-8 rounded-full bg-gradient-to-r from-harvest-400 to-paddy-500" aria-hidden="true" />
              {site.tagline}
            </p>

            <address className="mt-7 space-y-5 text-sm not-italic">
              <div className="flex gap-3.5">
                <MapPin size={18} className={`mt-0.5 shrink-0 ${accent}`} />
                <div>
                  <p className={`tech-label ${label}`}>{t('contact.address')}</p>
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
                  <p className={`tech-label ${label}`}>{t('contact.proprietor')}</p>
                  <p className={`mt-1 font-medium ${heading}`}>{site.proprietor}</p>
                </div>
              </div>

              <div className="flex gap-3.5">
                <PhoneCall size={18} className={`mt-0.5 shrink-0 ${accent}`} />
                <div>
                  <p className={`tech-label ${label}`}>{t('contact.phone')}</p>
                  <p className="mt-1">
                    <a href={site.phone.href} className={`tabular font-semibold ${heading}`}>
                      {site.phone.display}
                    </a>
                  </p>
                  {site.phone.isPlaceholder ? (
                    <p className={`mt-1 text-xs ${body}`}>{t('contact.placeholderNumber')}</p>
                  ) : null}
                </div>
              </div>

              {site.email.display ? (
                <div className="flex gap-3.5">
                  <Mail size={18} className={`mt-0.5 shrink-0 ${accent}`} />
                  <div>
                    <p className={`tech-label ${label}`}>{t('contact.email')}</p>
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
                  <p className={`tech-label ${label}`}>{t('contact.hours')}</p>
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
              {t('contact.preferTalk')}
            </h3>
            <p className={`mt-3 text-sm leading-relaxed ${body}`}>{t('contact.preferTalkText')}</p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Button href={site.phone.href} variant={dark ? 'light' : 'primary'} size="sm">
                <PhoneCall size={15} />
                {t('common.callUs')}
              </Button>
              <Button href={site.whatsapp.href} external variant="outline" size="sm">
                <MessageCircle size={15} />
                {t('common.whatsapp')}
              </Button>
            </div>
            <p className={`mt-4 text-xs ${dark ? 'text-sand-100/40' : 'text-ink/45'}`}>
              {t('contact.visitSmallNote')}
            </p>
          </div>
        </Reveal>
        <Reveal variant="right" delay={0.08}>
          <div className="grain-card scroll-mt-28 rounded-[6px] p-6 sm:p-8">
            <h3 className="h-card">{t('contact.visitTitle')}</h3>
            <p className="mt-2 text-sm text-ink/65">{t('contact.visitText')}</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button href={site.phone.href} variant="accent" size="lg">
                <PhoneCall size={16} />
                {t('common.callWorkshop')}
              </Button>
              <Button href={site.whatsapp.href} external variant="outline" size="lg">
                <MessageCircle size={16} />
                {t('common.messageWhatsApp')}
              </Button>
            </div>
            <p className="mt-5 text-xs text-ink/50">{t('contact.visitNote')}</p>
          </div>
        </Reveal>
      </div>
      <Reveal variant="fade" className="mt-10">
        <MapPanel />
      </Reveal>
    </div>
  )
}
