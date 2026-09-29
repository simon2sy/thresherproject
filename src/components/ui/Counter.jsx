import { motion, useInView, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import { useEffect, useRef } from 'react'

/**
 * Counter
 * ---------------------------------------------------------------------------
 * Counts a number up once when it scrolls into view. Only use it for figures
 * that mean something (machine counts, capacity ranges) — never for invented
 * statistics. Renders the final value immediately when motion is reduced.
 *
 * @param {object} props
 * @param {number} props.value    final value
 * @param {number} [props.decimals]
 * @param {string} [props.suffix]
 * @param {string} [props.prefix]
 */
export default function Counter({ value, decimals = 0, prefix = '', suffix = '', className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reduceMotion = useReducedMotion()
  const spring = useSpring(0, { stiffness: 60, damping: 18, mass: 0.7 })
  const display = useTransform(spring, (latest) =>
    `${prefix}${latest.toFixed(decimals)}${suffix}`,
  )

  useEffect(() => {
    if (inView) spring.set(value)
  }, [inView, spring, value])

  if (reduceMotion) {
    return (
      <span ref={ref} className={className}>
        {`${prefix}${value.toFixed(decimals)}${suffix}`}
      </span>
    )
  }

  return (
    <span ref={ref} className={className}>
      <motion.span>{display}</motion.span>
    </span>
  )
}
