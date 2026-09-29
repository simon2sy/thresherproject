import { MAT } from './materials'

/**
 * THRESHING / CLEANING CHAMBER BODY
 * ---------------------------------------------------------------------------
 * Rendered as part of the chassis sub-assembly (see machine/registry.jsx) so
 * the body, frame and wheels move together in the exploded view.
 * Local origin is identical to Chassis.jsx (frame rail top face).
 */
export default function Chamber({ shadows = true }) {
  return (
    <group>
      {/* Side walls */}
      {[-0.37, 0.37].map((z) => (
        <mesh key={`wall-${z}`} position={[0, 0.38, z]} castShadow={shadows} receiveShadow={shadows}>
          <boxGeometry args={[1.06, 0.62, 0.035]} />
          <meshStandardMaterial {...MAT.paintGreen} />
        </mesh>
      ))}

      {/* Top cover — stops short of the feed opening so the hopper sits over it */}
      <mesh position={[-0.165, 0.69, 0]} castShadow={shadows} receiveShadow={shadows}>
        <boxGeometry args={[0.73, 0.03, 0.76]} />
        <meshStandardMaterial {...MAT.sheetGreen} />
      </mesh>

      {/* Formed top edges */}
      {[-0.365, 0.365].map((z) => (
        <mesh key={`edge-${z}`} position={[-0.18, 0.712, z]}>
          <boxGeometry args={[0.7, 0.035, 0.04]} />
          <meshStandardMaterial {...MAT.paintGreen} />
        </mesh>
      ))}

      {/* Chamber floor — stops short at the rear where the blower duct enters */}
      <mesh position={[0.17, 0.07, 0]} receiveShadow={shadows}>
        <boxGeometry args={[0.74, 0.03, 0.76]} />
        <meshStandardMaterial {...MAT.sheet} />
      </mesh>

      {/* Drum shaft bearing housings on the chamber walls */}
      {[-0.405, 0.405].map((z) => (
        <group key={`bearing-${z}`} position={[0.05, 0.38, z]}>
          <mesh castShadow={shadows}>
            <boxGeometry args={[0.14, 0.14, 0.05]} />
            <meshStandardMaterial {...MAT.castIron} />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.05, 0.05, 0.09, 16]} />
            <meshStandardMaterial {...MAT.steelDark} />
          </mesh>
        </group>
      ))}

      {/* Rear wall (straw end) */}
      <mesh position={[-0.53, 0.38, 0]} castShadow={shadows}>
        <boxGeometry args={[0.035, 0.62, 0.76]} />
        <meshStandardMaterial {...MAT.paintGreenDark} />
      </mesh>

      {/* Front lower wall — feed opening stays open above it */}
      <mesh position={[0.53, 0.215, 0]} castShadow={shadows}>
        <boxGeometry args={[0.035, 0.29, 0.76]} />
        <meshStandardMaterial {...MAT.paintGreen} />
      </mesh>

      {/* Internal grain pan sloping toward the blower side */}
      <mesh position={[-0.05, 0.15, 0]} rotation={[0, 0, 0.16]} receiveShadow={shadows}>
        <boxGeometry args={[0.92, 0.02, 0.6]} />
        <meshStandardMaterial {...MAT.steelDark} />
      </mesh>

      {/* Model name plate on the operating side */}
      <mesh position={[0.14, 0.46, 0.389]}>
        <boxGeometry args={[0.26, 0.07, 0.008]} />
        <meshStandardMaterial {...MAT.amber} />
      </mesh>

      {/* Frame bolts */}
      {[
        [-0.72, -0.06, -0.33],
        [-0.72, -0.06, 0.33],
        [0.72, -0.06, -0.33],
        [0.72, -0.06, 0.33],
      ].map((position, index) => (
        <mesh key={`bolt-${index}`} position={position} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.018, 0.018, 0.12, 6]} />
          <meshStandardMaterial {...MAT.steel} />
        </mesh>
      ))}
    </group>
  )
}
