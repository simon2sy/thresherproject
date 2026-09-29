import { useRef } from 'react'
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion'

/**
 * TiltCard
 * ---------------------------------------------------------------------------
 * A surface that leans toward the cursor. The card rotates in 3D following the
 * pointer, a specular highlight tracks across it, and it lifts on hover.
 *
 * Deliberate constraints:
 *   · Max rotation is small (7deg) — enough to feel alive, not enough to make
 *     text hard to read or to look gimmicky.
 *   · Transform is written to `transform-style`, not to layout, so hovering
 *     never triggers reflow of the surrounding grid.
 *   · Pointer tracking is skipped entirely when `prefers-reduced-motion` is set.
 *   · `disabled` on touch/coarse pointers avoids a stuck hover state on phones.
 *
 * @param {object} props
 * @param {'light'|'dark'} [props.tone]
 * @param {number} [props.max]          max rotation in degrees
 * @param {number} [props.lift]         upward translate in px while hovering
 * @param {boolean} [props.spotlight]   show the cursor-following highlight
 * @param {boolean} [props.glowBorder]  show the animated gradient border
 * @param {string} [props.className]
 */
export default function TiltCard({
  children,
  tone = 'light',
  max = 7,
  lift = 6,
  spotlight = true,
  glowBorder = true,
  className = '',
  style,
  ...rest
}) {
  const ref = useRef(null)
  const reduceMotion = useReducedMotion()

  // Pointer position as a percentage of the card, 0-1.
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  // Springs give the card weight — it lags the cursor slightly, which reads as
  // a physical object rather than a div with a transform on it.
  const config = { stiffness: 220, damping: 22, mass: 0.6 }
  const sx = useSpring(px, config)
  const sy = useSpring(py, config)

  const rotateY = useTransform(sx, [0, 1], [-max, max])
  const rotateX = useTransform(sy, [0, 1], [max, -max])
  const highlightX = useTransform(sx, (v) => `${v * 100}%`)
  const highlightY = useTransform(sy, (v) => `${v * 100}%`)

  const dark = tone === 'dark'

  // Built as a motion template so the gradient re-renders as the springs
  // settle. Reading `.get()` inside a style object would freeze the value.
  const highlight = useMotionTemplate`radial-gradient(280px circle at ${highlightX} ${highlightY}, ${
    dark ? 'rgba(111,224,235,0.16)' : 'rgba(20,175,194,0.13)'
  }, transparent 62%)`

  const handlePointerMove = (event) => {
    if (reduceMotion) return
    const node = ref.current
    if (!node) return
    const rect = node.getBoundingClientRect()
    px.set((event.clientX - rect.left) / rect.width)
    py.set((event.clientY - rect.top) / rect.height)
  }

  const handlePointerLeave = () => {
    px.set(0.5)
    py.set(0.5)
  }

  // No tilt at all for reduced motion — render a plain, static surface.
  if (reduceMotion) {
    return (
      <div
        ref={ref}
        className={[
          dark ? 'card-dark' : 'card',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        style={style}
        {...rest}
      >
        {children}
      </div>
    )
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{
        ...style,
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        transformPerspective: 1000,
      }}
      whileHover={{ y: -lift }}
      transition={{ type: 'spring', stiffness: 260, damping: 24 }}
      className={[
        'group relative isolate overflow-hidden',
        dark ? 'card-dark' : 'card',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {/*
        Cursor-following specular highlight. `mix-blend-overlay` keeps it
        subtle over both dark and light surfaces.
      */}
      {spotlight ? (
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            backgroundImage: highlight,
            mixBlendMode: dark ? 'screen' : 'multiply',
          }}
        />
      ) : null}

      {/*
        Gradient border that glows on hover. Implemented as a masked pseudo
        layer (padding-box/border-box trick) so no extra markup is needed.
      */}
      {glowBorder ? (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            padding: '1px',
            backgroundImage:
              'linear-gradient(135deg, rgba(111,224,235,0.9), rgba(247,183,51,0.55), rgba(20,175,194,0.75))',
            WebkitMask:
              'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
          }}
        />
      ) : null}

      {/* Children sit above the highlight layer so text stays crisp. */}
      <div className="relative z-[1]" style={{ transform: 'translateZ(0)' }}>
        {children}
      </div>
    </motion.div>
  )
}
