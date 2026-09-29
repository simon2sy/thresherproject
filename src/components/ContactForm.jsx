import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { CheckCircle2, Loader2, Send } from 'lucide-react'
import { flags, site } from '../config/site'
import { products } from '../data/products'
import { inquiryOptions } from '../data/content'
import Button from './ui/Button'

/**
 * ContactForm
 * ---------------------------------------------------------------------------
 * Inquiry form for machine quotes.
 *
 * Where it sends data:
 *   VITE_INQUIRY_ENDPOINT set  → POST JSON to that URL (e.g. a Django REST
 *                                endpoint) and show the result state
 *   empty (the default)        → "demo mode": validates, shows the confirmation
 *                                panel and offers phone / email instead, so the
 *                                site is fully usable before a backend exists
 *
 * A machine can be pre-selected from the URL (?product=SAM-1000) — that is how
 * the "Enquire" buttons on the product cards behave.
 */

const EMPTY_FORM = {
  name: '',
  phone: '',
  email: '',
  location: '',
  machine: '',
  capacity: '',
  power: '',
  message: '',
}

const PHONE_PATTERN = /^[+]?[\d][\d\s\-()]{6,19}$/
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function validate(values) {
  const errors = {}

  if (!values.name.trim()) errors.name = 'Please enter your name.'

  if (!values.phone.trim()) errors.phone = 'Please enter a phone number we can call you back on.'
  else if (!PHONE_PATTERN.test(values.phone.trim()))
    errors.phone = 'Use digits only, for example 98XXXXXXXX or +977 98XXXXXXXX.'

  if (values.email.trim() && !EMAIL_PATTERN.test(values.email.trim()))
    errors.email = 'Check the email address, or leave it empty.'

  if (!values.message.trim()) errors.message = 'Tell us the crop and machine you need.'

  return errors
}

export default function ContactForm() {
  const [searchParams] = useSearchParams()
  const [values, setValues] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [serverMessage, setServerMessage] = useState('')

  // Flat [field, message] pairs for the summary banner at the top of the form.
  // Fields cleared while typing are stored as `undefined`, so drop them here.
  const errorList = Object.entries(errors).filter(([, message]) => Boolean(message))

  const machineOptions = useMemo(
    () => [
      ...products.map((product) => `${product.code} — ${product.name}`),
      inquiryOptions.machineHelp,
    ],
    [],
  )

  // Pre-select the machine when the visitor arrives from a product page.
  useEffect(() => {
    const requested = searchParams.get('product')
    if (!requested) return
    const match = machineOptions.find((option) =>
      option.toLowerCase().startsWith(requested.toLowerCase()),
    )
    if (match) setValues((current) => ({ ...current, machine: match }))
  }, [searchParams, machineOptions])

  const update = (field) => (event) => {
    const { value } = event.target
    setValues((current) => ({ ...current, [field]: value }))
    setErrors((current) => (current[field] ? { ...current, [field]: undefined } : current))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      const firstField = Object.keys(nextErrors)[0]
      document.getElementById(`inquiry-${firstField}`)?.focus()
      return
    }

    setStatus('sending')
    setServerMessage('')

    const payload = {
      ...values,
      product: values.machine,
      source: 'website-inquiry-form',
      submittedAt: new Date().toISOString(),
    }

    if (!flags.inquiryEndpoint) {
      // Demo mode: no backend to post to yet. The payload is logged in dev so
      // the form can be tested end to end.
      if (import.meta.env.DEV) console.info('[inquiry] demo submission', payload)
      setStatus('sent')
      return
    }

    try {
      const response = await fetch(flags.inquiryEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!response.ok) throw new Error(`Request failed with ${response.status}`)
      setStatus('sent')
    } catch (error) {
      setStatus('error')
      setServerMessage(
        'The inquiry could not be sent automatically. Please call or email us directly — the details are on this page.',
      )
      if (import.meta.env.DEV) console.warn('[inquiry] submission failed', error)
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Inquiry form">
      {status === 'sent' ? (
        <div className="border border-agri-200 bg-agri-50 p-6 sm:p-8" role="status" aria-live="polite">
          <CheckCircle2 className="text-agri-600" size={28} />
          <h3 className="h-card mt-4">Inquiry recorded</h3>
          <p className="mt-3 text-sm leading-relaxed text-ink/70">
            Thank you — your details have been recorded
            {flags.inquiryEndpoint ? ' and sent to our team.' : ' for this demonstration build.'} We
            normally reply with machine options and pricing during business hours.
          </p>

          <dl className="mt-6 grid gap-3 border-t border-agri-200 pt-5 text-sm sm:grid-cols-2">
            <div>
              <dt className="tech-label">Phone</dt>
              <dd className="mt-1 font-semibold">
                <a href={site.phone.href} className="tabular">
                  {site.phone.display}
                </a>
              </dd>
            </div>
            {site.email.display ? (
              <div>
                <dt className="tech-label">Email</dt>
                <dd className="mt-1 font-semibold">
                  <a href={site.email.href} className="break-all">
                    {site.email.display}
                  </a>
                </dd>
              </div>
            ) : null}
          </dl>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button href={site.phone.href} variant="primary" size="sm">
              Call the workshop
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setValues(EMPTY_FORM)
                setStatus('idle')
              }}
            >
              Send another inquiry
            </Button>
          </div>
        </div>
      ) : (
        <>
          {errorList.length > 0 ? (
            <div role="alert" className="mb-6 border border-red-300 bg-red-50 p-4 text-sm text-red-800">
              <p className="font-semibold">Please check the highlighted fields:</p>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                {errorList.map(([field, message]) => (
                  <li key={field}>{message}</li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="field-label" htmlFor="inquiry-name">
                Name *
              </label>
              <input
                id="inquiry-name"
                name="name"
                type="text"
                autoComplete="name"
                className="field"
                value={values.name}
                onChange={update('name')}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? 'inquiry-name-error' : undefined}
                placeholder="Your full name"
              />
              {errors.name ? (
                <span id="inquiry-name-error" className="field-error">
                  {errors.name}
                </span>
              ) : null}
            </div>

            <div>
              <label className="field-label" htmlFor="inquiry-phone">
                Phone *
              </label>
              <input
                id="inquiry-phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                inputMode="tel"
                className="field tabular"
                value={values.phone}
                onChange={update('phone')}
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={errors.phone ? 'inquiry-phone-error' : undefined}
                placeholder="98XXXXXXXX"
              />
              {errors.phone ? (
                <span id="inquiry-phone-error" className="field-error">
                  {errors.phone}
                </span>
              ) : null}
            </div>

            <div>
              <label className="field-label" htmlFor="inquiry-email">
                Email
              </label>
              <input
                id="inquiry-email"
                name="email"
                type="email"
                autoComplete="email"
                className="field"
                value={values.email}
                onChange={update('email')}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'inquiry-email-error' : undefined}
                placeholder="name@example.com"
              />
              {errors.email ? (
                <span id="inquiry-email-error" className="field-error">
                  {errors.email}
                </span>
              ) : null}
            </div>

            <div>
              <label className="field-label" htmlFor="inquiry-location">
                Location
              </label>
              <input
                id="inquiry-location"
                name="location"
                type="text"
                className="field"
                value={values.location}
                onChange={update('location')}
                placeholder="Village / Municipality, District"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="field-label" htmlFor="inquiry-machine">
                Machine / Product
              </label>
              <select
                id="inquiry-machine"
                name="machine"
                className="field"
                value={values.machine}
                onChange={update('machine')}
              >
                <option value="">Select a thresher model</option>
                {machineOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="field-label" htmlFor="inquiry-capacity">
                Required capacity
              </label>
              <select
                id="inquiry-capacity"
                name="capacity"
                className="field"
                value={values.capacity}
                onChange={update('capacity')}
              >
                <option value="">Select a capacity range</option>
                {inquiryOptions.capacityBands.map((band) => (
                  <option key={band} value={band}>
                    {band}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="field-label" htmlFor="inquiry-power">
                Power available
              </label>
              <select
                id="inquiry-power"
                name="power"
                className="field"
                value={values.power}
                onChange={update('power')}
              >
                <option value="">Select a power source</option>
                {inquiryOptions.powerSources.map((source) => (
                  <option key={source} value={source}>
                    {source}
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="field-label" htmlFor="inquiry-message">
                Message *
              </label>
              <textarea
                id="inquiry-message"
                name="message"
                rows={5}
                className="field resize-y"
                value={values.message}
                onChange={update('message')}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? 'inquiry-message-error' : undefined}
                placeholder="Crop, land size, expected quantity, and anything else we should know."
              />
              {errors.message ? (
                <span id="inquiry-message-error" className="field-error">
                  {errors.message}
                </span>
              ) : null}
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Button type="submit" variant="primary" size="lg" disabled={status === 'sending'}>
              {status === 'sending' ? (
                <Loader2 size={17} className="animate-spin" />
              ) : (
                <Send size={16} />
              )}
              {status === 'sending' ? 'Sending…' : 'Send Inquiry'}
            </Button>
            <p className="text-xs text-ink/50 sm:max-w-xs">
              We use your details only to answer this inquiry.
              {!flags.inquiryEndpoint ? ' This build runs in demo mode — nothing is submitted.' : ''}
            </p>
          </div>

          {status === 'error' ? (
            <p role="alert" className="mt-4 text-sm font-medium text-red-700">
              {serverMessage}
            </p>
          ) : null}
        </>
      )}
    </form>
  )
}
