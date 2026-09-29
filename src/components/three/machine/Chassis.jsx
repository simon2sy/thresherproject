import { useMemo } from 'react'
import { MAT } from './materials'

/**
 * CHASSIS, WHEELS AND THRESHING CHAMBER
 * ---------------------------------------------------------------------------
 * Origin: top face of the main frame rails. The chamber body is bolted to the
 * frame, so it travels with the chassis in the exploded view.
 *
 * Local coordinates (metres):
 *   x  -0.78 (rear / straw end) … +0.78 (front / feed end)
 *   y   0 at the frame rails, wheels below, chamber above
 *   z  ±0.37 chamber side walls (drive train on the −z side)
 */

const WHEEL_OFFSET = 0.42
const WHEEL_RADIUS = 0.31
const TREAD_COUNT = 12

function Wheel({ z, shadows }) {
  const treads = useMemo(
    () =>
      Array.from({ length: TREAD_COUNT }, (_, i) => {
        const angle = (i / TREAD_COUNT) * Math.PI * 2
        return {
          key: `tread-${i}`,
          position: [Math.cos(angle) * 0.265, Math.sin(angle) * 0.265, 0],
          rotation: [0, 0, angle],
        }
      }),
    [],
  )

  return (
    <group position={[0.58, -WHEEL_RADIUS, z]}>
      <mesh castShadow={shadows} receiveShadow={shadows}>
        <torusGeometry args={[0.205, 0.077, 12, 30]} />
        <meshStandardMaterial {...MAT.rubber} />
      </mesh>
      {treads.map((tread) => (
        <mesh
          key={tread.key}
          position={tread.position}
          rotation={tread.rotation}
          castShadow={shadows}
        >
          <boxGeometry args={[0.055, 0.062, 0.115]} />
          <meshStandardMaterial {...MAT.rubber} />
        </mesh>
      ))}
      <mesh rotation={[Math.PI / 2, 0, 0]} castShadow={shadows}>
        <cylinderGeometry args={[0.2, 0.2, 0.11, 26]} />
        <meshStandardMaterial {...MAT.steelDark} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.13, 16]} />
        <meshStandardMaterial {...MAT.castIron} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.035, 0.035, 0.2, 12]} />
        <meshStandardMaterial {...MAT.steel} />
      </mesh>
    </group>
  )
}

export default function Chassis({ shadows = true }) {
  return (
    <group>
      {/* ---------- Frame rails ---------- */}
      {[-0.33, 0.33].map((z) => (
        <mesh key={`rail-${z}`} position={[0, 0, z]} castShadow={shadows} receiveShadow={shadows}>
          <boxGeometry args={[1.56, 0.09, 0.09]} />
          <meshStandardMaterial {...MAT.paintCharcoal} />
        </mesh>
      ))}
      {[-0.6, 0, 0.6].map((x) => (
        <mesh key={`cross-${x}`} position={[x, -0.02, 0]} castShadow={shadows}>
          <boxGeometry args={[0.08, 0.08, 0.7]} />
          <meshStandardMaterial {...MAT.paintCharcoal} />
        </mesh>
      ))}

      {/* ---------- Front support leg + foot ---------- */}
      <mesh position={[0.72, -0.31, 0]} castShadow={shadows}>
        <boxGeometry args={[0.085, 0.62, 0.085]} />
        <meshStandardMaterial {...MAT.steelDark} />
      </mesh>
      <mesh position={[0.72, -0.6, 0]} rotation={[0, 0.4, 0]} castShadow={shadows}>
        <boxGeometry args={[0.26, 0.045, 0.16]} />
        <meshStandardMaterial {...MAT.steelDark} />
      </mesh>

      {/* ---------- Axle, brackets, wheels ---------- */}
      <mesh
        position={[0.58, -WHEEL_RADIUS, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        castShadow={shadows}
      >
        <cylinderGeometry args={[0.032, 0.032, 0.9, 14]} />
        <meshStandardMaterial {...MAT.steel} />
      </mesh>
      {[-0.33, 0.33].map((z) => (
        <mesh key={`bracket-${z}`} position={[0.58, -0.2, z]} castShadow={shadows}>
          <boxGeometry args={[0.11, 0.26, 0.1]} />
          <meshStandardMaterial {...MAT.paintCharcoal} />
        </mesh>
      ))}
      {[-WHEEL_OFFSET, WHEEL_OFFSET].map((z) => (
        <Wheel key={`wheel-${z}`} z={z} shadows={shadows} />
      ))}

      {/* ---------- Towing hitch ---------- */}
      <mesh position={[0.88, -0.05, 0]} castShadow={shadows}>
        <boxGeometry args={[0.34, 0.07, 0.07]} />
        <meshStandardMaterial {...MAT.steelDark} />
      </mesh>
      <mesh position={[1.03, -0.05, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.055, 0.014, 8, 18]} />
        <meshStandardMaterial {...MAT.steel} />
      </mesh>
    </group>
  )
}

