import { Component } from 'react'

/**
 * ErrorBoundary
 * ---------------------------------------------------------------------------
 * Wraps the WebGL stage so a device without working graphics context (or a
 * driver crash mid-session) degrades to the illustrated presentation instead of
 * taking the page down. It also makes the rest of the site resilient.
 */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { failed: false }
  }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch(error) {
    // Kept as a console warning on purpose — no third-party telemetry here.
    if (import.meta.env.DEV) {
      console.warn('[Daju Bhai Grill Udyog] WebGL stage failed, using fallback:', error)
    }
  }

  render() {
    const { failed } = this.state
    const { children, fallback = null, onError } = this.props

    if (failed) {
      // The fallback may be a render function (used by App.jsx so it can read
      // translated strings via hooks) — it takes no arguments now.
      if (typeof fallback === 'function') return fallback()
      return fallback
    }

    return children
  }
}
