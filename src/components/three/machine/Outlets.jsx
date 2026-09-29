import { MAT } from './materials'

/**
 * STRAW OUTLET + GRAIN OUTLET
 * ---------------------------------------------------------------------------
 * Two discharges, modelled in the local space defined by thresherParts.js:
 *   StrawOutlet — origin at the rear upper corner of the chamber
 *   GrainOutlet — origin at the lower operating side of the chamber
 */

/** Rear duct that carries threshed straw clear of the grain stream. */
export function StrawOutlet({ shadows = true }) {
  const angle = -2.789 // radians: points back and slightly down

  return (
    <group>
      {/* duct body */}
      <mesh position={[-0.155, -0.11, 0]} rotation={[0, 0, angle]} castShadow={shadows}>
        <boxGeometry args={[0.53, 0.32, 0.6]} />
        <meshStandardMaterial {...MAT.paintGreen} />
      </mesh>

      {/* discharge lip */}
      <mesh position={[-0.456, -0.22, 0]} rotation={[0, 0, angle]} castShadow={shadows}>
        <boxGeometry args={[0.07, 0.38, 0.66]} />
        <meshStandardMaterial {...MAT.paintGreenDark} />
      </mesh>

      {/* internal straw guides */}
      {[
        [-0.124, -0.196],
        [-0.188, -0.026],
      ].map(([x, y]) => (
        <mesh key={`baffle-${x}`} position={[x, y, 0]} rotation={[0, 0, angle]}>
          <boxGeometry args={[0.42, 0.02, 0.56]} />
          <meshStandardMaterial {...MAT.steelDark} />
        </mesh>
      ))}

      {/* reinforcing angles along the duct sides */}
      {[-0.31, 0.31].map((z) => (
        <mesh key={`rib-${z}`} position={[-0.155, -0.11, z]} rotation={[0, 0, angle]}>
          <boxGeometry args={[0.53, 0.03, 0.03]} />
          <meshStandardMaterial {...MAT.paintGreenDark} />
        </mesh>
      ))}
    </group>
  )
}

/** Auger-style chute that delivers cleaned grain to a sack or trolley. */
export function GrainOutlet({ shadows = true }) {
  const angle = 0.728 // radians: points outward and down

  return (
    <group>
      {/* chute */}
      <mesh position={[0, -0.04, 0.525]} rotation={[angle, 0, 0]} castShadow={shadows}>
        <boxGeometry args={[0.27, 0.16, 0.38]} />
        <meshStandardMaterial {...MAT.sheetGreen} />
      </mesh>

      {/* chute cheeks */}
      {[-0.145, 0.145].map((x) => (
        <mesh key={`cheek-${x}`} position={[x, -0.04, 0.525]} rotation={[angle, 0, 0]} castShadow={shadows}>
          <boxGeometry args={[0.02, 0.19, 0.38]} />
          <meshStandardMaterial {...MAT.paintGreen} />
        </mesh>
      ))}

      {/* outlet lip */}
      <mesh position={[0, -0.175, 0.665]} rotation={[angle, 0, 0]} castShadow={shadows}>
        <boxGeometry args={[0.31, 0.022, 0.14]} />
        <meshStandardMaterial {...MAT.sheetGreen} />
      </mesh>

      {/* sack hook bars */}
      {[-0.135, 0.135].map((x) => (
        <mesh key={`hook-${x}`} position={[x, -0.235, 0.66]} rotation={[angle, 0, 0]}>
          <boxGeometry args={[0.022, 0.022, 0.2]} />
          <meshStandardMaterial {...MAT.steel} />
        </mesh>
      ))}

      {/* support strut back to the frame */}
      <mesh position={[-0.16, -0.24, 0.46]} rotation={[0.42, 0, 0]}>
        <boxGeometry args={[0.05, 0.36, 0.05]} />
        <meshStandardMaterial {...MAT.steelDark} />
      </mesh>
    </group>
  )
}

export default { StrawOutlet, GrainOutlet }
