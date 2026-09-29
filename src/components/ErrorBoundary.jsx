import { Component } from 'react'
import { site } from '../config/site'

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
      if (typeof fallback === 'function') return fallback({ site })
      return fallback
    }

    return children
  }
}
