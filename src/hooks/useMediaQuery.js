import { useCallback, useEffect, useState } from 'react'

/** Tailwind-aligned breakpoints so JS and CSS agree on layout tiers. */
export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
}

/**
 * Subscribe to a CSS media query.
 * @param {string} query e.g. '(min-width: 1024px)'
 */
export function useMediaQuery(query) {
  const getMatch = useCallback(
    () => (typeof window === 'undefined' ? false : window.matchMedia(query).matches),
    [query],
  )

  const [matches, setMatches] = useState(getMatch)

  useEffect(() => {
    const list = window.matchMedia(query)
    const onChange = (event) => setMatches(event.matches)
    setMatches(list.matches)
    list.addEventListener('change', onChange)
    return () => list.removeEventListener('change', onChange)
  }, [query])

  return matches
}

/** True when the visitor asked the operating system to reduce motion. */
export function usePrefersReducedMotion() {
  return useMediaQuery('(prefers-reduced-motion: reduce)')
}

/** True on devices where the pointer is coarse (touch) — no hover interactions. */
export function useIsTouch() {
  return useMediaQuery('(hover: none)')
}

export default useMediaQuery
