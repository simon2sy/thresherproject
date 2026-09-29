import { MAT } from './materials'

/**
 * ENGINE / MOTOR UNIT
 * ---------------------------------------------------------------------------
 * Single-cylinder agricultural diesel set on an adjustable bed plate — the
 * arrangement used so that belt tension is set by sliding the engine, not by
 * moving the drum. The same platform accepts an electric motor.
 *
 * Local origin = model origin (ground level, machine centre line).
 * The unit is mounted outboard on the −z side so the belt runs inside a guard.
 */

const FIN_COUNT = 7
const CRANK_Z = -0.74 // engine centre line (along z)

export default function EngineUnit({ shadows = true }) {
  const fins = Array.from({ length: FIN_COUNT }, (_, i) => 0.79 + i * 0.03)

  return (
    <group>
      {/* ---------- Bed plate and mounting rails ---------- */}
      <mesh position={[-0.32, 0.53, CRANK_Z]} castShadow={shadows}>
        <boxGeometry args={[0.54, 0.04, 0.4]} />
        <meshStandardMaterial {...MAT.steelDark} />
      </mesh>
      {[-0.6, -0.88].map((z) => (
        <mesh key={`rail-${z}`} position={[-0.32, 0.49, z]} castShadow={shadows}>
          <boxGeometry args={[0.56, 0.06, 0.07]} />
          <meshStandardMaterial {...MAT.paintCharcoal} />
        </mesh>
      ))}
      {[-0.14, -0.5].map((x) => (
        <mesh key={`arm-${x}`} position={[x, 0.46, -0.44]} castShadow={shadows}>
          <boxGeometry args={[0.07, 0.07, 0.24]} />
          <meshStandardMaterial {...MAT.paintCharcoal} />
        </mesh>
      ))}

      {/* ---------- Crankcase and cylinder block ---------- */}
      <mesh position={[-0.32, 0.67, CRANK_Z]} castShadow={shadows}>
        <boxGeometry args={[0.46, 0.22, 0.34]} />
        <meshStandardMaterial {...MAT.paintCharcoal} />
      </mesh>
      <mesh position={[-0.34, 0.87, CRANK_Z]} castShadow={shadows}>
        <boxGeometry args={[0.26, 0.26, 0.24]} />
        <meshStandardMaterial {...MAT.castIron} />
      </mesh>

      {/* cooling fins */}
      {fins.map((y) => (
        <mesh key={`fin-${y}`} position={[-0.34, y, CRANK_Z]} castShadow={shadows}>
          <boxGeometry args={[0.31, 0.013, 0.29]} />
          <meshStandardMaterial {...MAT.steel} />
        </mesh>
      ))}

      {/* cylinder head + rocker cover */}
      <mesh position={[-0.34, 1.02, CRANK_Z]} castShadow={shadows}>
        <boxGeometry args={[0.3, 0.1, 0.26]} />
        <meshStandardMaterial {...MAT.castIron} />
      </mesh>
      <mesh position={[-0.34, 1.08, CRANK_Z]} castShadow={shadows}>
        <boxGeometry args={[0.24, 0.05, 0.22]} />
        <meshStandardMaterial {...MAT.paintCharcoal} />
      </mesh>

      {/* ---------- Flywheel housing (outboard face) ---------- */}
      <mesh position={[-0.32, 0.67, -0.93]} rotation={[Math.PI / 2, 0, 0]} castShadow={shadows}>
        <cylinderGeometry args={[0.115, 0.115, 0.05, 22]} />
        <meshStandardMaterial {...MAT.sheet} />
      </mesh>

      {/* ---------- Crank shaft out to the drive pulley ---------- */}
      <mesh position={[-0.32, 0.75, -0.46]} rotation={[Math.PI / 2, 0, 0]} castShadow={shadows}>
        <cylinderGeometry args={[0.03, 0.03, 0.26, 14]} />
        <meshStandardMaterial {...MAT.steel} />
      </mesh>

      {/* ---------- Fuel tank ---------- */}
      <mesh position={[-0.3, 1.16, CRANK_Z]} castShadow={shadows}>
        <boxGeometry args={[0.3, 0.16, 0.3]} />
        <meshStandardMaterial {...MAT.paintGreenDark} />
      </mesh>
      <mesh position={[-0.3, 1.255, -0.68]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.035, 0.035, 0.03, 12]} />
        <meshStandardMaterial {...MAT.steelDark} />
      </mesh>

      {/* ---------- Exhaust and muffler ---------- */}
      <mesh position={[-0.22, 1.12, -0.66]} castShadow={shadows}>
        <cylinderGeometry args={[0.032, 0.032, 0.24, 12]} />
        <meshStandardMaterial {...MAT.steelDark} />
      </mesh>
      <mesh position={[-0.22, 1.3, -0.66]} castShadow={shadows}>
        <cylinderGeometry args={[0.05, 0.05, 0.22, 16]} />
        <meshStandardMaterial {...MAT.steelDark} />
      </mesh>
      <mesh position={[-0.22, 1.42, -0.66]}>
        <cylinderGeometry args={[0.056, 0.056, 0.02, 16]} />
        <meshStandardMaterial {...MAT.steel} />
      </mesh>

      {/* ---------- Air filter, dipstick, breather ---------- */}
      <mesh position={[-0.48, 1.04, -0.88]} rotation={[Math.PI / 2, 0, 0]} castShadow={shadows}>
        <cylinderGeometry args={[0.062, 0.062, 0.18, 16]} />
        <meshStandardMaterial {...MAT.steelDark} />
      </mesh>
      <mesh position={[-0.5, 0.81, -0.64]}>
        <cylinderGeometry args={[0.016, 0.016, 0.08, 10]} />
        <meshStandardMaterial {...MAT.steel} />
      </mesh>

      {/* ---------- Bed plate bolts ---------- */}
      {[
        [-0.5, -0.6],
        [-0.14, -0.6],
        [-0.5, -0.88],
        [-0.14, -0.88],
      ].map(([x, z]) => (
        <mesh key={`bolt-${x}-${z}`} position={[x, 0.57, z]} castShadow={shadows}>
          <cylinderGeometry args={[0.014, 0.014, 0.06, 8]} />
          <meshStandardMaterial {...MAT.steel} />
        </mesh>
      ))}
    </group>
  )
}
