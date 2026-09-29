import { useEffect } from 'react'
import Lenis from 'lenis'
import { useLocation } from 'react-router-dom'
import { usePrefersReducedMotion } from '../hooks/useMediaQuery'

/**
 * SmoothScroll
 * ---------------------------------------------------------------------------
 * Lenis-driven inertial scrolling. Disabled entirely when the visitor asks for
 * reduced motion (the browser's own scrolling is used instead).
 */
export function SmoothScroll({ children }) {
  const reduceMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (reduceMotion || typeof window === 'undefined') return undefined

    const lenis = new Lenis({
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
      smoothWheel: true,
      /*
       * PERFORMANCE: Lenis lerps toward the scroll target every frame, so the
       * page keeps easing after the wheel stops. `lerp: 0.1` at 60fps means
       * roughly 30+ frames of motion per gesture — with an animated background
       * compositing underneath, that tail is where jank shows most. A slightly
       * stiffer lerp settles in fewer frames while keeping the smooth feel.
       */
      lerp: 0.14,
      /*
       * Let the browser handle touch scrolling natively instead of feeding
       * synthetic wheel events through the animation loop — smoother on
       * phones, and it stops Lenis competing with native momentum.
       */
      syncTouch: false,
    })

    let frame = requestAnimationFrame(function loop(time) {
      lenis.raf(time)
      frame = requestAnimationFrame(loop)
    })

    // Exposed so anchor links can reuse the same easing.
    window.__lenis = lenis

    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
      delete window.__lenis
    }
  }, [reduceMotion])

  return children
}

/**
 * ScrollManager
 * ---------------------------------------------------------------------------
 * Resets the scroll position on navigation and scrolls to `#hash` targets
 * (e.g. /contact#inquiry) with the header offset taken into account.
 */
export function ScrollManager({ headerOffset = 88 }) {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const target = document.querySelector(hash)
      if (target) {
        const top = target.getBoundingClientRect().top + window.scrollY - headerOffset
        if (window.__lenis) window.__lenis.scrollTo(top, { duration: 0.9 })
        else window.scrollTo({ top, behavior: 'smooth' })
        return
      }
    }
    if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true })
    else window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname, hash, headerOffset])

  return null
}

/**
 * Scrolls the page to the very top — shared by the navbar logo, the nav links
 * and the footer so same-page clicks always return to the top of the page.
 */
export function scrollToTop() {
  if (typeof window === 'undefined') return
  // Lenis handles the animation while active; without it (reduced motion /
  // not yet mounted) the browser's native instant jump is used instead.
  if (window.__lenis) window.__lenis.scrollTo(0, { duration: 0.7 })
  else window.scrollTo(0, 0)
}

export default SmoothScroll
