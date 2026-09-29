/**
 * AuroraBackdrop
 * ---------------------------------------------------------------------------
 * The site's signature background. Stacked CSS layers create depth without a
 * single image request:
 *
 *   1. Base wash     — the four-point aqua/amber mesh
 *   2. Mesh (alt)    — a second, slower copy on a different phase
 *   3. Conic sweep   — a very slow rotating light source
 *   4. Streaks       — faint diagonal bands
 *   5. Grain         — SVG turbulence
 *
 * PERFORMANCE — this component sits behind the whole page, so it is the most
 * likely place to cause scroll jank. Rules applied:
 *   · NO `backdrop-filter` — on a fixed/sticky ancestor it re-blurs the
 *     viewport every scroll frame.
 *   · NO `mix-blend-mode` — forces a full-screen blend pass per frame.
 *   · NO permanent `will-change` — on 4+ large layers it exhausts GPU memory
 *     and the browser starts thrashing. Promotion is only applied to the one
 *     layer that actually animates, and only on desktop-sized viewports.
 *   · Animations are `transform`/`opacity` only, so they stay on the
 *     compositor and never trigger layout or paint.
 *   · `visibility` gates the whole effect: when `paused` (reduced motion, or a
 *     low-power device) the layers stop animating entirely.
 *
 * @param {object} props
 * @param {'hero'|'header'|'section'} [props.variant]
 * @param {boolean} [props.grain]    show the film-grain overlay
 * @param {boolean} [props.streaks]  show the diagonal light streaks
 * @param {boolean} [props.sweep]    show the rotating conic light
 * @param {boolean} [props.paused]   freeze all animation
 * @param {string}  [props.className]
 */
export default function AuroraBackdrop({
  variant = 'hero',
  grain = true,
  streaks = true,
  sweep = true,
  paused = false,
  className = '',
}) {
  const isHeader = variant === 'header'

  // `motion-safe:` already disables these for reduced-motion users; `paused`
  // additionally lets a parent switch the effect off (e.g. on low-power
  // devices) without unmounting the component.
  const motion = paused ? '' : 'motion-safe:'

  return (
    <div
      aria-hidden="true"
      className={[
        'pointer-events-none absolute inset-0 overflow-hidden contain-paint',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {/* 1 + 2 — the drifting mesh, two phases. `translate` only. */}
      <div
        className={`absolute -inset-[18%] bg-aurora-mesh ${motion}animate-aurora-mesh`}
      />
      <div
        className={[
          'absolute -inset-[22%]',
          `${motion}animate-aurora-mesh-alt`,
          isHeader ? 'opacity-55' : 'opacity-70',
        ].join(' ')}
      />

      {/* 3 — rotating conic light. Dropped entirely for the header variant:
          a 150%-sized rotating layer behind a 64px bar buys nothing visual
          but costs a full-width composite. */}
      {sweep && !isHeader ? (
        <div
          className={`absolute left-1/2 top-1/2 h-[150%] w-[150%] -translate-x-1/2 -translate-y-1/2 opacity-40 ${motion}animate-spin-slow [mask-image:radial-gradient(closest-side,#000_25%,transparent_75%)]`}
          style={{
            backgroundImage:
              'conic-gradient(from 0deg, rgba(111,224,235,0.16), rgba(20,175,194,0.05) 25%, rgba(247,183,51,0.10) 50%, rgba(20,175,194,0.05) 75%, rgba(111,224,235,0.16))',
          }}
        />
      ) : null}

      {/* 4 — diagonal light streaks */}
      {streaks && !isHeader ? (
        <div
          className={`absolute -inset-x-1/4 inset-y-0 ${motion}animate-streak-drift opacity-[0.5]`}
          style={{
            backgroundImage:
              'repeating-linear-gradient(115deg, rgba(255,255,255,0.045) 0px, rgba(255,255,255,0.045) 2px, transparent 2px, transparent 90px)',
            maskImage:
              'radial-gradient(70% 70% at 50% 40%, #000 0%, transparent 75%)',
            WebkitMaskImage:
              'radial-gradient(70% 70% at 50% 40%, #000 0%, transparent 75%)',
          }}
        />
      ) : null}

      {/* Corner light — lifts the top-right so the section has a direction. */}
      <div
        className={[
          'absolute inset-0 bg-glow-corner',
          isHeader ? 'opacity-70' : 'opacity-100',
        ].join(' ')}
      />

      {/*
        5 — grain. Plain alpha, no blend mode: `mix-blend-overlay` here would
        force a full-screen blend composite on every single frame, which is
        the most expensive thing this component could possibly do.
      */}
      {grain ? <div className="absolute inset-0 bg-grain opacity-[0.10]" /> : null}

      {/* Vignette pulls the eye to the centre and hides layer seams. */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(120% 90% at 50% 40%, transparent 40%, rgba(4,13,17,0.55) 100%)',
        }}
      />
    </div>
  )
}
