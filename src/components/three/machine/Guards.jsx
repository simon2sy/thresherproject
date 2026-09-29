import { MAT } from './materials'

/**
 * SAFETY GUARDS
 * ---------------------------------------------------------------------------
 * Sheet-metal covers over both belt runs. On a real machine these are bolted on
 * before delivery and removed for belt changes — so grouping them as a single
 * sub-assembly makes the exploded view read the way a fitter would take the
 * machine apart.
 */

const GUARD_Z = -0.53 // outer cover plane

export default function Guards({ shadows = true }) {
  return (
    <group>
      {/* ---------- Cover over the main drive pulley ---------- */}
      <mesh position={[0.05, 1.0, GUARD_Z]} castShadow={shadows}>
        <boxGeometry args={[0.64, 0.4, 0.02]} />
        <meshStandardMaterial {...MAT.sheetGreen} />
      </mesh>
      {[
        [0.05, 1.2, 0.14],
        [0.05, 0.8, 0.14],
      ].map(([x, y, depth]) => (
        <mesh key={`lip-${y}`} position={[x, y, -0.465]} castShadow={shadows}>
          <boxGeometry args={[0.64, 0.02, depth]} />
          <meshStandardMaterial {...MAT.sheetGreen} />
        </mesh>
      ))}
      {[-0.27, 0.37].map((x) => (
        <mesh key={`end-${x}`} position={[x, 1.0, -0.465]} castShadow={shadows}>
          <boxGeometry args={[0.02, 0.4, 0.14]} />
          <meshStandardMaterial {...MAT.sheetGreen} />
        </mesh>
      ))}

      {/* ---------- Cover over the blower belt ---------- */}
      <mesh position={[-0.16, 0.82, GUARD_Z]} castShadow={shadows}>
        <boxGeometry args={[0.42, 0.36, 0.02]} />
        <meshStandardMaterial {...MAT.sheetGreen} />
      </mesh>
      <mesh position={[-0.16, 0.99, -0.468]} castShadow={shadows}>
        <boxGeometry args={[0.42, 0.02, 0.13]} />
        <meshStandardMaterial {...MAT.sheetGreen} />
      </mesh>
      <mesh position={[-0.16, 0.65, -0.468]} castShadow={shadows}>
        <boxGeometry args={[0.42, 0.02, 0.13]} />
        <meshStandardMaterial {...MAT.sheetGreen} />
      </mesh>

      {/* ---------- Guard bolts ---------- */}
      {[
        [-0.24, 1.16],
        [0.05, 1.16],
        [0.34, 1.16],
        [-0.24, 0.84],
        [0.05, 0.84],
        [0.34, 0.84],
      ].map(([x, y]) => (
        <mesh key={`bolt-${x}-${y}`} position={[x, y, -0.545]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.011, 0.011, 0.014, 8]} />
          <meshStandardMaterial {...MAT.steel} />
        </mesh>
      ))}

      {/* ---------- Inspection label plate ---------- */}
      <mesh position={[0.05, 1.16, -0.542]}>
        <boxGeometry args={[0.14, 0.03, 0.004]} />
        <meshStandardMaterial {...MAT.amber} />
      </mesh>
    </group>
  )
}
