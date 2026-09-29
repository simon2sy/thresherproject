import { useMemo } from 'react'
import { MAT } from './materials'
import { useSpinning } from './useSpinning'

/**
 * THRESHING DRUM (rasp-bar cylinder)
 * ---------------------------------------------------------------------------
 * Local origin = drum axis centre. The axis runs across the machine (z), the
 * same arrangement used on a through-flow multi-crop thresher: crop is fed from
 * the top, travels around the drum and leaves as straw at the rear.
 */

const BAR_COUNT = 6
const BAR_RADIUS = 0.228
const DRUM_LENGTH = 0.62

export default function ThreshingDrum({ running = true, shadows = true }) {
  const groupRef = useSpinning({ running, speed: 1.25 })

  const bars = useMemo(
    () =>
      Array.from({ length: BAR_COUNT }, (_, i) => {
        const phi = ((i * (360 / BAR_COUNT) + 25) * Math.PI) / 180
        return {
          key: `bar-${i}`,
          position: [Math.sin(phi) * BAR_RADIUS, Math.cos(phi) * BAR_RADIUS, 0],
          rotation: [0, 0, -phi],
        }
      }),
    [],
  )

  return (
    <group ref={groupRef}>
      {/* shaft, protruding to both bearing housings and the drive pulley */}
      <mesh rotation={[Math.PI / 2, 0, 0]} castShadow={shadows}>
        <cylinderGeometry args={[0.028, 0.028, 0.99, 16]} />
        <meshStandardMaterial {...MAT.steel} />
      </mesh>

      {/* end plates (spider discs) with arms */}
      {[-0.3, 0.3].map((z) => (
        <group key={`spider-${z}`} position={[0, 0, z]}>
          <mesh rotation={[Math.PI / 2, 0, 0]} castShadow={shadows}>
            <cylinderGeometry args={[0.232, 0.232, 0.018, 24]} />
            <meshStandardMaterial {...MAT.castIron} />
          </mesh>
          {[0, 1, 2, 3].map((arm) => {
            const phi = (arm * Math.PI) / 2
            return (
              <mesh key={arm} position={[Math.sin(phi) * 0.11, Math.cos(phi) * 0.11, 0]} rotation={[0, 0, -phi]}>
                <boxGeometry args={[0.04, 0.24, 0.028]} />
                <meshStandardMaterial {...MAT.castIron} />
              </mesh>
            )
          })}
        </group>
      ))}

      {/* drum core */}
      <mesh rotation={[Math.PI / 2, 0, 0]} castShadow={shadows}>
        <cylinderGeometry args={[0.148, 0.148, DRUM_LENGTH, 22]} />
        <meshStandardMaterial {...MAT.sheet} />
      </mesh>

      {/* rasp bars */}
      {bars.map((bar) => (
        <mesh
          key={bar.key}
          position={bar.position}
          rotation={bar.rotation}
          castShadow={shadows}
        >
          <boxGeometry args={[0.05, 0.042, 0.645]} />
          <meshStandardMaterial {...MAT.steelDark} />
        </mesh>
      ))}

      {/* shaft collars either side of the drum core */}
      {[-0.33, 0.33].map((z) => (
        <mesh key={`collar-${z}`} position={[0, 0, z]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.045, 0.045, 0.03, 14]} />
          <meshStandardMaterial {...MAT.steel} />
        </mesh>
      ))}
    </group>
  )
}
