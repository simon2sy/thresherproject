import { motion, useReducedMotion } from 'framer-motion'

/**
 * Reveal
 * ---------------------------------------------------------------------------
 * Scroll-reveal wrapper used across the site. Deliberately small movement
 * (18px, one direction, one pass) so the page feels engineered rather than
 * animated. Honours `prefers-reduced-motion` by rendering statically.
 *
 * Variants
 *   up    — default, rises into place
 *   fade  — opacity only
 *   left  — slides in from the left
 *   right — slides in from the right
 */

const OFFSETS = {
  up: { y: 18, x: 0 },
  fade: { y: 0, x: 0 },
  left: { y: 0, x: -22 },
  right: { y: 0, x: 22 },
}

export default function Reveal({
  children,
  variant = 'up',
  delay = 0,
  duration = 0.55,
  amount = 0.25,
  as = 'div',
  className = '',
  ...rest
}) {
  const reduceMotion = useReducedMotion()
  const offset = OFFSETS[variant] || OFFSETS.up
  const MotionTag = motion[as] || motion.div

  if (reduceMotion) {
    const Tag = as
    return (
      <Tag className={className} {...rest}>
        {children}
      </Tag>
    )
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration, delay, ease: [0.22, 0.61, 0.36, 1] }}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}
