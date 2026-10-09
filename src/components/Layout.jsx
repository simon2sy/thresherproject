import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Outlet, useLocation } from 'react-router-dom'
import { ChevronUp, MessageCircle, PhoneCall } from 'lucide-react'
import { useLanguage, useSite } from '../i18n'
import Navbar from './Navbar'
import Footer from './Footer'
import { ScrollManager, SmoothScroll } from './SmoothScroll'

/**
 * Layout
 * ---------------------------------------------------------------------------
 * Navbar + routed content + footer, plus the two site-wide behaviours that
 * belong to every page:
 *   · Lenis smooth scrolling and scroll position management on navigation
 *   · a sticky call / quote bar on small screens (the fastest route to contact
 *     on a phone, which is how most Nepali customers will arrive)
 */
export default function Layout() {
  const location = useLocation()
  const reduceMotion = useReducedMotion()
  const { t } = useLanguage()
  const site = useSite()

  /**
   * Route transitions. A short fade-and-rise is enough to signal "new page"
   * without making navigation feel slow — the key change on `pathname` remounts
   * the outlet so the exit/enter pair can play.
   */
  const pageMotion = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -8 },
        transition: { duration: 0.32, ease: [0.22, 0.61, 0.36, 1] },
      }

  return (
    <SmoothScroll>
      <ScrollManager />

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-[3px] focus:bg-ink focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-sand-50"
      >
        {t('layout.skip')}
      </a>

      <Navbar />

      <main id="main" className="pb-20 lg:pb-0">
        {/* Sync (not "wait") mode is deliberate: the outgoing page exits while
            the incoming one enters, so the new page's useSeo metadata is
            applied immediately rather than after the exit animation. */}
        <AnimatePresence initial={false}>
          <motion.div key={location.pathname} {...pageMotion}>
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />

      {/* Sticky contact bar — small screens only. Sits above the safe-area
          inset on phones with a home indicator. */}
      <a
        href="#main"
        aria-label={t('layout.backToTop')}
        className="grid place-items-center rounded-[3px] border border-white/10 bg-[#120D06]/80 px-3 py-2.5 text-2xs font-semibold text-sand-100/80 transition-colors hover:border-harvest-500/30 hover:text-harvest-300 lg:hidden"
      >
        <ChevronUp size={16} />
        <span className="ml-1.5">{t('layout.backToTop')}</span>
      </a>
      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-px border-t border-harvest-500/20 bg-[#120D06]/95 pb-[env(safe-area-inset-bottom)] lg:hidden">
        <a
          href={site.phone.href}
          className="flex items-center justify-center gap-2 py-3.5 text-sm font-semibold text-sand-50 transition-colors active:bg-white/10"
        >
          <PhoneCall size={16} />
          {t('layout.call')}
        </a>
        <a
          href={site.whatsapp.href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-harvest-600 via-harvest-500 to-harvest-400 py-3.5 text-sm font-semibold text-ink shadow-[0_-10px_30px_-16px_rgba(227,148,16,0.9)] transition-colors active:from-harvest-700 active:to-harvest-600"
        >
          <MessageCircle size={16} />
          {t('common.whatsapp')}
        </a>
      </div>
    </SmoothScroll>
  )
}
