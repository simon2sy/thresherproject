import { useEffect, useMemo, useState } from 'react'
import { flags } from '../config/site'
import { useMediaQuery, usePrefersReducedMotion } from './useMediaQuery'

/** One-time WebGL probe. Returns null until the check has run in the browser. */
export function detectWebGL() {
  if (typeof window === 'undefined') return false
  try {
    const canvas = document.createElement('canvas')
    const context =
      canvas.getContext('webgl2') ||
      canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl')
    return Boolean(context && window.WebGLRenderingContext)
  } catch {
    return false
  }
}

/**
 * Decides how much presentation the visitor's device should receive.
 *
 * tiers
 *   'desktop' — full interactive 3D, shadows, environment reflections
 *   'tablet'  — 3D with reduced DPR and simplified shadows
 *   'mobile'  — illustration/photography first, 3D only on explicit request
 */
export function useDeviceCapability() {
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const isTablet = useMediaQuery('(min-width: 768px)')
  const reducedMotion = usePrefersReducedMotion()
  const [webgl, setWebgl] = useState(null)

  useEffect(() => {
    setWebgl(detectWebGL())
  }, [])

  const tier = isDesktop ? 'desktop' : isTablet ? 'tablet' : 'mobile'

  const lowPower = useMemo(() => {
    if (typeof navigator === 'undefined') return false
    const cores = navigator.hardwareConcurrency || 8
    const memory = navigator.deviceMemory || 8
    return cores <= 4 || memory <= 4
  }, [])

  const ready = webgl !== null

  return {
    tier,
    ready,
    webglSupported: webgl === true,
    reducedMotion,
    lowPower,
    /** 3D allowed at all (feature flag + working WebGL + not a very weak device) */
    canRender3D: flags.enable3D && webgl === true && !lowPower && !reducedMotion,
    /** Auto-mount the 3D view: desktop/tablet only — mobile starts with artwork. */
    autoMount3D: flags.enable3D && webgl === true && !lowPower && tier !== 'mobile',
    /**
     * Full-screen animated backgrounds (the aurora mesh) are beautiful but cost
     * real GPU time on every composited frame. Weak devices get a single,
     * still layer instead of several drifting ones.
     */
    richBackgrounds: !lowPower && !reducedMotion,
    /** Quality settings consumed by the canvas. */
    quality: {
      dpr: tier === 'desktop' ? [1, 1.75] : [1, 1.25],
      shadows: tier === 'desktop',
      environmentResolution: tier === 'desktop' ? 256 : 128,
      contactShadowScale: tier === 'desktop' ? 7 : 5,
    },
  }
}

export default useDeviceCapability
