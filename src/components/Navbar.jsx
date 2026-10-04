import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { Mail, MapPin, Menu, PhoneCall, X } from 'lucide-react'
import { useLanguage, useNavLinks, useSite } from '../i18n'
import Button from './ui/Button'
import LanguageToggle from './ui/LanguageToggle'
import AuroraBackdrop from './ui/AuroraBackdrop'
import { scrollToTop } from './SmoothScroll'

/**
 * Navbar — transparent over the dark hero, a compact solid charcoal bar once
 * the page scrolls (or immediately on inner pages). Mobile menu: animated
 * panel with staggered links, locked page behind it, Escape to close.
 */

function Logo({ compact = false, onNavigate }) {
  const { pathname } = useLocation()
  const { t } = useLanguage()
  const site = useSite()

  /** Already on the target page: the router would not fire, so scroll manually. */
  const handleClick = (event) => {
    if (pathname === '/') {
      event.preventDefault()
      scrollToTop()
    }
    onNavigate?.()
  }

  return (
    <Link
      to="/"
      onClick={handleClick}
      className="group flex items-center gap-3"
      aria-label={t('nav.homeAria', { name: site.name })}
    >
      <span className="relative grid h-10 w-10 place-items-center overflow-hidden rounded-[3px] bg-gradient-to-br from-harvest-300 via-harvest-500 to-clay-600 text-[0.8rem] font-extrabold tracking-tight text-ink shadow-glow-harvest transition-transform duration-300 ease-smooth group-hover:scale-105">
        <span className="relative flex items-center gap-px" aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M12 21 V9" />
            <path d="M12 13 C9.5 12.2 8 10.2 7.6 7.4 C10.2 8.2 11.7 10.2 12 13 Z" fill="currentColor" stroke="none" opacity="0.85" />
            <path d="M12 13 C14.5 12.2 16 10.2 16.4 7.4 C13.8 8.2 12.3 10.2 12 13 Z" fill="currentColor" stroke="none" opacity="0.85" />
            <path d="M4 21 H20" />
          </svg>
        </span>
        {/* Harvest bar that travels across the mark. */}
        <span className="brand-bar absolute inset-x-0 bottom-0 h-[3px]">
          <span className="motion-safe:animate-gradient-pan" />
        </span>
      </span>
      <span className="leading-none">
        <span className="block font-display text-[0.85rem] font-extrabold uppercase tracking-[0.06em] text-sand-50 sm:text-[1.02rem] sm:tracking-[0.08em]">
          {site.shortName}
        </span>
        {!compact ? (
          <span className="mt-1 hidden text-2xs uppercase tracking-technical text-sand-100/55 sm:block">
            {t('nav.tagline')}
          </span>
        ) : null}
      </span>
    </Link>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const { t } = useLanguage()
  const site = useSite()
  const navLinks = useNavLinks()

  /* Reading-progress bar. `useScroll` tracks the document; the spring keeps it
     smooth under fast scroll and on touch devices. */
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 26, mass: 0.3 })

  /*
   * PERFORMANCE: the `scrolled` flag only drives a className, but it was
   * calling setState on *every* scroll event. That re-rendered the whole
   * Navbar — logo, links, progress bar and backdrop — dozens of times per
   * scroll gesture. Ref-counting inside a single frame means at most one
   * render per frame, and only when the boolean actually flips.
   */
  const scrolledRef = useRef(false)
  const scrollTicking = useRef(false)

  useEffect(() => {
    const onScroll = () => {
      if (scrollTicking.current) return
      scrollTicking.current = true
      requestAnimationFrame(() => {
        const next = window.scrollY > 24
        if (next !== scrolledRef.current) {
          scrolledRef.current = next
          setScrolled(next)
        }
        scrollTicking.current = false
      })
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the mobile menu on route change.
  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  // Lock the page while the mobile panel is open; Escape closes it.
  useEffect(() => {
    if (!open) return undefined
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  /*
   * The home hero is straw-paper, so the bar stays solid soil-brown at all times.
   */
  const solid = true

  return (
    <header
      className={[
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        /*
         * PERFORMANCE: no `backdrop-filter` here on purpose.
         * A backdrop-filter on a *fixed* element forces the browser to re-blur
         * the whole viewport on every scroll frame, which drops frames on
         * integrated GPUs and low-end phones. The frosted look is instead
         * faked with an opaque layered gradient, which is free to composite.
         */
        solid
          ? 'border-b border-harvest-500/20 bg-[#1A130A]/95 shadow-[0_10px_40px_-24px_rgba(0,0,0,0.9)]'
          : 'bg-transparent',
      ].join(' ')}
    >
      {/*
        Header: a reduced backdrop (mesh only, no conic sweep / streaks) at low
        opacity. It is a 64px strip, so the expensive full-bleed layers would be
        invisible here while still costing a full-width composite on every frame.
      */}
      <AuroraBackdrop
        variant="header"
        sweep={false}
        streaks={false}
        className={[
          'transition-opacity duration-500',
          solid ? 'opacity-60' : 'opacity-90',
        ].join(' ')}
      />

      {/* Harvest hairline — golden glow along the bar's edge */}
      <span
        aria-hidden="true"
        className={[
          'pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-harvest-400/70 to-transparent transition-opacity duration-300',
          solid ? 'opacity-100' : 'opacity-0',
        ].join(' ')}
      />

      {/* Reading-progress bar — gives a sense of momentum on long pages. */}
      <motion.div
        aria-hidden="true"
        style={{ scaleX: progress }}
        className={[
          'pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[2px] origin-left overflow-hidden',
          solid ? 'opacity-100' : 'opacity-0',
        ].join(' ')}
      >
        <span className="brand-bar motion-safe:animate-gradient-pan absolute inset-0" />
      </motion.div>

      {/* Utility strip — contact details, hidden once the visitor scrolls */}
      <div
        className={[
          'hidden overflow-hidden border-b border-harvest-500/10 bg-[#120D06]/70 transition-all duration-300 lg:block',
          scrolled ? 'max-h-0 opacity-0' : 'max-h-12 opacity-100',
        ].join(' ')}
      >
        <div className="shell flex h-10 items-center justify-between text-2xs uppercase tracking-technical text-sand-100/60">
          <p className="flex items-center gap-2">
            <MapPin size={13} strokeWidth={1.8} />
            {site.address.full}
          </p>
          <div className="flex items-center gap-6">
            <a href={site.phone.href} className="flex items-center gap-2 transition-colors hover:text-sand-50">
              <PhoneCall size={13} strokeWidth={1.8} />
              {site.phone.display}
            </a>
            {site.email.display ? (
              <a href={site.email.href} className="flex items-center gap-2 transition-colors hover:text-sand-50">
                <Mail size={13} strokeWidth={1.8} />
                {site.email.display}
              </a>
            ) : null}
          </div>
        </div>
      </div>

      <nav className="shell flex items-center justify-between py-3.5" aria-label={t('nav.primaryLabel')}>
        <Logo compact={scrolled} onNavigate={() => setOpen(false)} />

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.end}
                onClick={(event) => {
                  // Same-page link (e.g. "Home" while already home): React
                  // Router would not navigate, so send the page to the top.
                  if (location.pathname === link.to) {
                    event.preventDefault()
                    scrollToTop()
                  }
                }}
                className={({ isActive }) =>
                  [
                    'group relative block rounded-[3px] px-3.5 py-2 text-[0.86rem] font-medium transition-colors duration-200',
                    isActive
                      ? 'text-sand-50'
                      : 'text-sand-100/70 hover:bg-white/[0.06] hover:text-sand-50',
                  ].join(' ')
                }
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    {/* Soft glow pill behind the active link, drawn with a
                        shared layoutId so it slides between items. */}
                    {isActive ? (
                      <motion.span
                        layoutId="nav-active-pill"
                        className="absolute inset-0 -z-10 rounded-[3px] bg-white/[0.07]"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    ) : null}
                    <span
                      className={[
                        'absolute inset-x-3.5 -bottom-0.5 h-[2px] origin-left bg-gradient-to-r from-amber_acc-500 to-amber_acc-300 transition-transform duration-300',
                        isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100',
                      ].join(' ')}
                    />
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageToggle tone="dark" />
          <Button href={site.phone.href} variant="accent" size="sm">
            {t('common.callUs')}
          </Button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <LanguageToggle tone="dark" />
          <Button href={site.phone.href} variant="accent" size="sm" className="hidden sm:inline-flex">
            {t('common.callUs')}
          </Button>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t('nav.closeMenu') : t('nav.openMenu')}
            className="grid h-11 w-11 place-items-center rounded-[2px] border border-white/20 text-sand-50 transition-colors hover:border-white/50"
          >
            {open ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.24, ease: [0.22, 0.61, 0.36, 1] }}
            className="border-t border-harvest-500/15 bg-forest-800 lg:hidden"
          >
            <ul className="shell flex flex-col py-2">
              {navLinks.map((link, index) => (
                <motion.li
                  key={link.to}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * index + 0.05, duration: 0.25 }}
                  className="border-b border-white/[0.07] last:border-0"
                >
                  <NavLink
                    to={link.to}
                    end={link.end}
                    onClick={(event) => {
                      if (location.pathname === link.to) {
                        event.preventDefault()
                        scrollToTop()
                      }
                      setOpen(false)
                    }}
                    className={({ isActive }) =>
                      [
                        'flex items-center justify-between py-4 font-display text-lg font-bold uppercase tracking-[0.06em]',
                        isActive ? 'text-sand-50' : 'text-sand-100/75',
                      ].join(' ')
                    }
                  >
                    {link.label}
                    <span className="tech-label !text-sand-100/40">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </NavLink>
                </motion.li>
              ))}
            </ul>

            <div className="shell grid gap-3 pb-7 pt-4">
              <Button href={site.phone.href} variant="accent" size="lg" full>
                {t('common.callUs')}
              </Button>
              <a
                href={site.phone.href}
                className="flex items-center justify-center gap-2 rounded-[3px] border border-white/20 py-3.5 text-sm font-semibold text-sand-50"
              >
                <PhoneCall size={16} />
                {site.phone.display}
              </a>
              <p className="text-center text-2xs uppercase tracking-technical text-sand-100/45">
                {site.address.full}
              </p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
