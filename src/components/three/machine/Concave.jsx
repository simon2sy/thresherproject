import { useMemo } from 'react'
import { DoubleSide } from 'three'
import { MAT } from './materials'

/**
 * CONCAVE / SIEVE GRATE
 * ---------------------------------------------------------------------------
 * Curved grate that wraps the lower half of the threshing drum. Grain passes
 * between the bars and falls to the grain pan; long straw rides over the top
 * towards the straw outlet.
 *
 * Local origin matches the drum axis centre, so the grate stays concentric
 * with the drum in every view.
 */

const SLAT_COUNT = 11
const SLAT_RADIUS = 0.306
const SLAT_SPAN = 68 // degrees either side of bottom dead centre

export default function Concave({ shadows = true }) {
  const slats = useMemo(() => {
    const step = (SLAT_SPAN * 2) / (SLAT_COUNT - 1)
    return Array.from({ length: SLAT_COUNT }, (_, i) => {
      const theta = ((-SLAT_SPAN + i * step) * Math.PI) / 180
      return {
        key: `slat-${i}`,
        position: [Math.sin(theta) * SLAT_RADIUS, -Math.cos(theta) * SLAT_RADIUS, 0],
        rotation: [0, 0, Math.PI + theta],
      }
    })
  }, [])

  const arc = (2 * SLAT_SPAN * Math.PI) / 180

  return (
    <group>
      {/* curved end frames */}
      {[-0.335, 0.335].map((z) => (
        <mesh key={`arc-${z}`} position={[0, 0, z]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry
            args={[SLAT_RADIUS + 0.012, SLAT_RADIUS + 0.012, 0.028, 40, 1, true, -arc / 2, arc]}
          />
          <meshStandardMaterial {...MAT.steelDark} side={DoubleSide} />
        </mesh>
      ))}

      {/* grate bars */}
      {slats.map((slat) => (
        <mesh
          key={slat.key}
          position={slat.position}
          rotation={slat.rotation}
          castShadow={shadows}
        >
          <boxGeometry args={[0.042, 0.03, 0.68]} />
          <meshStandardMaterial {...MAT.steelDark} />
        </mesh>
      ))}

      {/* longitudinal support strip under the grate */}
      <mesh position={[0, -SLAT_RADIUS - 0.03, 0]}>
        <boxGeometry args={[0.1, 0.03, 0.7]} />
        <meshStandardMaterial {...MAT.steelDark} />
      </mesh>
    </group>
  )
}
