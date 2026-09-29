import { useMemo } from 'react'
import { MAT } from './materials'
import { useSpinning } from './useSpinning'

/**
 * BLOWER / CLEANING FAN
 * ---------------------------------------------------------------------------
 * Scroll casing with an open throat at the top, a multi-blade fan on a
 * transverse shaft, and an air duct carrying the airstream up into the
 * cleaning section. The fan is visible through the casing throat, which is what
 * you would check on a real machine before a day's work.
 *
 * Local origin = fan shaft centre.
 */

const BLADE_COUNT = 7

export default function Blower({ running = true, shadows = true }) {
  const fanRef = useSpinning({ running, speed: 2.1 })

  const blades = useMemo(
    () =>
      Array.from({ length: BLADE_COUNT }, (_, i) => {
        const phi = ((i * (360 / BLADE_COUNT) + 18) * Math.PI) / 180
        return {
          key: `blade-${i}`,
          position: [Math.sin(phi) * 0.105, Math.cos(phi) * 0.105, 0],
          rotation: [0, 0, -phi],
        }
      }),
    [],
  )

  return (
    <group>
      {/* casing side plates */}
      {[-0.135, 0.135].map((z) => (
        <mesh key={`plate-${z}`} position={[0, 0, z]} rotation={[Math.PI / 2, 0, 0]} castShadow={shadows}>
          <cylinderGeometry args={[0.23, 0.23, 0.016, 28]} />
          <meshStandardMaterial {...MAT.sheetGreen} />
        </mesh>
      ))}

      {/* scroll shell — open at the top where the air leaves the casing */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, 2.199]}>
        <torusGeometry args={[0.2, 0.042, 10, 40, Math.PI * 1.6]} />
        <meshStandardMaterial {...MAT.paintGreenDark} />
      </mesh>

      {/* fan */}
      <group ref={fanRef}>
        <mesh rotation={[Math.PI / 2, 0, 0]} castShadow={shadows}>
          <cylinderGeometry args={[0.05, 0.05, 0.2, 16]} />
          <meshStandardMaterial {...MAT.steelDark} />
        </mesh>
        {blades.map((blade) => (
          <mesh key={blade.key} position={blade.position} rotation={blade.rotation} castShadow={shadows}>
            <boxGeometry args={[0.035, 0.2, 0.17]} />
            <meshStandardMaterial {...MAT.steel} />
          </mesh>
        ))}
      </group>

      {/* shaft out to the drive pulley on the machine's drive side */}
      <mesh position={[0, 0, -0.3]} rotation={[Math.PI / 2, 0, 0]} castShadow={shadows}>
        <cylinderGeometry args={[0.022, 0.022, 0.42, 12]} />
        <meshStandardMaterial {...MAT.steel} />
      </mesh>
      <mesh position={[0, 0, -0.235]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.042, 0.042, 0.06, 14]} />
        <meshStandardMaterial {...MAT.castIron} />
      </mesh>

      {/* air duct up into the cleaning section */}
      <mesh position={[0.07, 0.21, 0]} rotation={[0, 0, 0.28]} castShadow={shadows}>
        <boxGeometry args={[0.16, 0.24, 0.34]} />
        <meshStandardMaterial {...MAT.sheetGreen} />
      </mesh>

      {/* adjustable air gate on the throat */}
      <mesh position={[-0.14, 0.3, 0]} rotation={[0, 0, -0.5]} castShadow={shadows}>
        <boxGeometry args={[0.16, 0.02, 0.36]} />
        <meshStandardMaterial {...MAT.steelDark} />
      </mesh>

      {/* support brackets down to the frame */}
      {[-0.24, 0.24].map((z) => (
        <mesh key={`support-${z}`} position={[-0.05, -0.19, z]} rotation={[0, 0, 0.25]}>
          <boxGeometry args={[0.06, 0.16, 0.05]} />
          <meshStandardMaterial {...MAT.steelDark} />
        </mesh>
      ))}
    </group>
  )
}
