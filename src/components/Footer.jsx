import { Link, useLocation } from 'react-router-dom'
import { Mail, MapPin, PhoneCall, User } from 'lucide-react'
import { navLinks, site } from '../config/site'
import { products } from '../data/products'
import { brandIcons } from './icons/BrandIcons'
import Icon from './ui/Icon'
import { scrollToTop } from './SmoothScroll'

/**
 * Footer
 * ---------------------------------------------------------------------------
 * Industrial footer: brand block, navigation, product list (generated from the
 * catalogue so it never drifts out of date), contact details and social links.
 */
export default function Footer() {
  const year = new Date().getFullYear()
  const { pathname } = useLocation()

  /** Same-page link: scroll to the top instead of doing a no-op navigation. */
  const handleSamePage = (event, to) => {
    if (pathname === to) {
      event.preventDefault()
      scrollToTop()
    }
  }

  return (
    <footer className="on-dark hatch-dark bg-ink text-sand-100/70">
      <div className="shell py-14 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_0.8fr_1fr_1.1fr]">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <span className="relative grid h-11 w-11 place-items-center overflow-hidden rounded-[3px] bg-gradient-to-br from-aqua-400 to-aqua-600 text-sm font-extrabold text-white shadow-glow-aqua">
                DB
                <span className="brand-bar absolute inset-x-0 bottom-0 h-[3px]">
                  <span className="motion-safe:animate-gradient-pan" />
                </span>
              </span>
              <span>
                <span className="block font-display text-lg font-extrabold uppercase tracking-[0.08em] text-sand-50">
                  {site.shortName}
                </span>
                <span className="text-2xs uppercase tracking-technical text-sand-100/50">
                  {site.tagline}
                </span>
              </span>
            </div>

            <p className="mt-5 max-w-sm text-sm leading-relaxed">
              Thresher machines and farm machinery for paddy, wheat, maize and other crops —
              assembled and serviced in Jhapa Gaupalika, Jhapa.
            </p>

            <ul className="mt-6 flex items-center gap-2">
              {site.socials.map((social) => {
                const Glyph = brandIcons[social.icon]
                return (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      aria-label={`${site.name} on ${social.label}`}
                      className="grid h-10 w-10 place-items-center rounded-[2px] border border-white/15 text-sand-100/70 transition-colors hover:border-white/40 hover:text-sand-50"
                    >
                      {Glyph ? <Glyph size={17} /> : null}
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer">
            <h2 className="text-2xs font-semibold uppercase tracking-technical text-sand-100/45">
              Navigate
            </h2>
            <ul className="mt-5 space-y-3 text-sm">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    onClick={(event) => handleSamePage(event, link.to)}
                    className="link-on-dark"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Products — generated from the catalogue */}
          <div>
            <h2 className="text-2xs font-semibold uppercase tracking-technical text-sand-100/45">
              Threshers
            </h2>
            <ul className="mt-5 space-y-3 text-sm">
              {products.map((product) => (
                <li key={product.slug}>
                  <Link
                    to={`/threshers/${product.slug}`}
                    onClick={(event) => handleSamePage(event, `/threshers/${product.slug}`)}
                    className="link-on-dark"
                  >
                    <span className="tabular font-semibold text-sand-50">{product.code}</span>
                    <span className="block text-xs text-sand-100/55">{product.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h2 className="text-2xs font-semibold uppercase tracking-technical text-sand-100/45">
              Contact
            </h2>
            <address className="mt-5 space-y-4 text-sm not-italic">
              <p className="flex gap-3">
                <MapPin size={17} className="mt-0.5 shrink-0 text-agri-300" />
                <span>
                  {site.address.line1}
                  <br />
                  {site.address.line2}
                  <br />
                  {site.address.country}
                </span>
              </p>
              <p className="flex gap-3">
                <User size={17} className="mt-0.5 shrink-0 text-agri-300" />
                <span>
                  <span className="text-sand-100/50">Proprietor </span>
                  <span className="font-semibold text-sand-50">{site.proprietor}</span>
                </span>
              </p>
              <p className="flex gap-3">
                <PhoneCall size={17} className="mt-0.5 shrink-0 text-agri-300" />
                <a href={site.phone.href} className="link-on-dark tabular">
                  {site.phone.display}
                </a>
              </p>
              {site.email.display ? (
                <p className="flex gap-3">
                  <Mail size={17} className="mt-0.5 shrink-0 text-agri-300" />
                  <a href={site.email.href} className="link-on-dark break-all">
                    {site.email.display}
                  </a>
                </p>
              ) : null}
            </address>

            <dl className="mt-6 space-y-1 text-xs">
              {site.hours.map((slot) => (
                <div
                  key={slot.days}
                  className="flex justify-between gap-4 border-t border-white/10 pt-2"
                >
                  <dt className="text-sand-100/50">{slot.days}</dt>
                  <dd className="tabular text-sand-100/80">{slot.time}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName}. All rights reserved.
          </p>
          <p className="flex items-start gap-2 text-sand-100/45 sm:max-w-xl sm:text-right">
            <Icon name="info" size={14} className="mt-0.5 shrink-0" />
            <span>
              Some images and the specification values on this site are placeholders and will be
              replaced with the verified catalogue data.
            </span>
          </p>
        </div>
      </div>
    </footer>
  )
}
