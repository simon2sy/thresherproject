import { useMemo } from 'react'
import { ExtrudeGeometry, Shape } from 'three'
import { MAT } from './materials'

/**
 * FEEDING HOPPER
 * ---------------------------------------------------------------------------
 * Sheet-metal funnel that guides crop into the threshing chamber at a
 * controlled rate. Built from a side profile extruded into two walls, so the
 * interior stays open like a real hopper.
 *
 * Local origin = model origin (ground level, machine centre line).
 */

/** Side profile of the hopper as seen from the operating side. */
const PROFILE = [
  [-0.14, 1.29],
  [0.3, 1.29],
  [0.52, 1.62],
  [-0.14, 1.62],
]

const WALL_THICKNESS = 0.04
const WALL_Z = [0.18, -0.22] // extrusion start planes for the two walls

export default function Hopper({ shadows = true }) {
  const wallGeometry = useMemo(() => {
    const shape = new Shape()
    shape.moveTo(PROFILE[0][0], PROFILE[0][1])
    PROFILE.slice(1).forEach(([x, y]) => shape.lineTo(x, y))
    shape.closePath()
    return new ExtrudeGeometry(shape, { depth: WALL_THICKNESS, bevelEnabled: false })
  }, [])

  // Sloped apron: from the hopper rim down to the chamber opening.
  const apronAngle = -2.173 // radians, matches the B→C edge of the profile
  const apronCenter = [0.41, 1.455]

  return (
    <group>
      {/* Side walls */}
      {WALL_Z.map((z) => (
        <mesh key={`hopper-wall-${z}`} geometry={wallGeometry} position={[0, 0, z]} castShadow={shadows} receiveShadow={shadows}>
          <meshStandardMaterial {...MAT.paintGreen} />
        </mesh>
      ))}

      {/* Rear wall */}
      <mesh position={[-0.13, 1.455, -0.02]} castShadow={shadows}>
        <boxGeometry args={[0.035, 0.33, 0.4]} />
        <meshStandardMaterial {...MAT.paintGreen} />
      </mesh>

      {/* Sloped front apron */}
      <mesh position={[apronCenter[0], apronCenter[1], -0.02]} rotation={[0, 0, apronAngle]} castShadow={shadows}>
        <boxGeometry args={[0.4, 0.028, 0.42]} />
        <meshStandardMaterial {...MAT.paintGreenDark} />
      </mesh>

      {/* Bottom flange that bolts to the chamber top */}
      <mesh position={[0.08, 1.285, -0.02]} castShadow={shadows}>
        <boxGeometry args={[0.46, 0.032, 0.42]} />
        <meshStandardMaterial {...MAT.sheetGreen} />
      </mesh>

      {/* Rolled top edges */}
      {[0.205, -0.245].map((z) => (
        <mesh key={`rim-${z}`} position={[0.19, 1.635, z]}>
          <boxGeometry args={[0.68, 0.03, 0.04]} />
          <meshStandardMaterial {...MAT.paintGreenDark} />
        </mesh>
      ))}

      {/* Feed guard grid across the opening */}
      {[0, 1, 2, 3, 4].map((i) => (
        <mesh key={`guard-${i}`} position={[-0.02 + i * 0.11, 1.58, -0.02]}>
          <boxGeometry args={[0.022, 0.022, 0.4]} />
          <meshStandardMaterial {...MAT.steel} />
        </mesh>
      ))}

      {/* Feed tray in front of the hopper */}
      <mesh position={[0.63, 1.6, -0.02]} rotation={[0, 0, -0.22]} castShadow={shadows}>
        <boxGeometry args={[0.3, 0.025, 0.36]} />
        <meshStandardMaterial {...MAT.sheetGreen} />
      </mesh>
      {[0.2, -0.24].map((z) => (
        <mesh key={`tray-strut-${z}`} position={[0.66, 1.44, z]} rotation={[0, 0, -0.24]}>
          <boxGeometry args={[0.025, 0.34, 0.025]} />
          <meshStandardMaterial {...MAT.steelDark} />
        </mesh>
      ))}
    </group>
  )
}
