import { useMemo } from 'react'
import { ExtrudeGeometry, Shape, Vector2 } from 'three'
import { MAT } from './materials'
import { useSpinning } from './useSpinning'

/**
 * BELT DRIVE & PULLEYS
 * ---------------------------------------------------------------------------
 * V-belt drive train. Both belts are extruded directly around their two
 * pulleys, using the true external tangent geometry, so the belt sits on the
 * rims of different-diameter pulleys instead of floating in space.
 *
 * Layout (client-side drive):
 *   drum shaft  ← large pulley ← belt ← engine pulley   (main drive)
 *   drum shaft  → small pulley → belt → blower pulley   (cleaning fan drive)
 */

const MAIN_BELT_Z = -0.4
const FAN_BELT_Z = -0.445
const BELT_WIDTH = 0.045

const DRUM_SHAFT = { x: 0.05, y: 1.0 }
const ENGINE_SHAFT = { x: -0.32, y: 0.75 }
const BLOWER_SHAFT = { x: -0.34, y: 0.62 }

/**
 * Builds a closed belt loop around two pulleys of different diameter.
 * @param {{x:number,y:number}} a  first pulley centre
 * @param {number} r1              first pulley radius
 * @param {{x:number,y:number}} b  second pulley centre
 * @param {number} r2              second pulley radius
 * @param {number} width           belt width (extruded depth)
 */
function makeBeltGeometry(a, r1, b, r2, width) {
  const c1 = new Vector2(a.x, a.y)
  const c2 = new Vector2(b.x, b.y)
  const centreLine = c2.clone().sub(c1)
  const distance = centreLine.length()
  const theta = Math.atan2(centreLine.y, centreLine.x)

  // Radius of the pulleys must differ; clamp for safety on degenerate input.
  const ratio = Math.max(-1, Math.min(1, (r1 - r2) / distance))
  const psi = Math.acos(ratio) // normal angle offset for the external tangents

  const upperOnA = new Vector2(
    c1.x + r1 * Math.cos(theta + psi),
    c1.y + r1 * Math.sin(theta + psi),
  )
  const upperOnB = new Vector2(
    c2.x + r2 * Math.cos(theta + psi),
    c2.y + r2 * Math.sin(theta + psi),
  )
  const lowerOnB = new Vector2(
    c2.x + r2 * Math.cos(theta - psi),
    c2.y + r2 * Math.sin(theta - psi),
  )
  const lowerOnA = new Vector2(
    c1.x + r1 * Math.cos(theta - psi),
    c1.y + r1 * Math.sin(theta - psi),
  )

  const shape = new Shape()
  shape.moveTo(upperOnA.x, upperOnA.y)
  shape.lineTo(upperOnB.x, upperOnB.y)
  // wrap around the driven pulley, passing on the far side of the driving one
  shape.absarc(c2.x, c2.y, r2, theta + psi, theta - psi, true)
  shape.lineTo(lowerOnA.x, lowerOnA.y)
  // wrap around the driving pulley
  shape.absarc(c1.x, c1.y, r1, theta - psi, theta + psi, false)
  shape.closePath()

  return new ExtrudeGeometry(shape, { depth: width, bevelEnabled: false })
}

function Pulley({ position, radius, width = 0.05, running, shadows = true }) {
  const ref = useSpinning({ running, speed: 1.25 })

  return (
    <group position={[position.x, position.y, position.z]} ref={ref}>
      <mesh rotation={[Math.PI / 2, 0, 0]} castShadow={shadows}>
        <cylinderGeometry args={[radius, radius, width, 28]} />
        <meshStandardMaterial {...MAT.castIron} />
      </mesh>
      {[-1, 1].map((side) => (
        <mesh
          key={`flange-${side}`}
          position={[0, 0, (side * (width + 0.012)) / 2]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <cylinderGeometry args={[radius + 0.007, radius + 0.007, 0.012, 28]} />
          <meshStandardMaterial {...MAT.steelDark} />
        </mesh>
      ))}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.034, 0.034, width + 0.07, 14]} />
        <meshStandardMaterial {...MAT.steel} />
      </mesh>
    </group>
  )
}

export default function BeltDrive({ running = true, shadows = true }) {
  const mainBelt = useMemo(
    () => makeBeltGeometry(DRUM_SHAFT, 0.17, ENGINE_SHAFT, 0.085, BELT_WIDTH),
    [],
  )
  const fanBelt = useMemo(
    () => makeBeltGeometry({ x: DRUM_SHAFT.x, y: DRUM_SHAFT.y }, 0.085, BLOWER_SHAFT, 0.075, BELT_WIDTH),
    [],
  )

  return (
    <group>
      {/* driving pulley on the drum shaft */}
      <Pulley position={{ x: DRUM_SHAFT.x, y: DRUM_SHAFT.y, z: MAIN_BELT_Z }} radius={0.17} width={0.055} running={running} shadows={shadows} />
      {/* engine pulley */}
      <Pulley position={{ x: ENGINE_SHAFT.x, y: ENGINE_SHAFT.y, z: MAIN_BELT_Z }} radius={0.085} width={0.05} running={running} shadows={shadows} />
      {/* fan drive take-off and blower pulley */}
      <Pulley position={{ x: DRUM_SHAFT.x, y: DRUM_SHAFT.y, z: FAN_BELT_Z }} radius={0.085} width={0.045} running={running} shadows={shadows} />
      <Pulley position={{ x: BLOWER_SHAFT.x, y: BLOWER_SHAFT.y, z: FAN_BELT_Z }} radius={0.075} width={0.045} running={running} shadows={shadows} />

      {/* main drive belt */}
      <mesh geometry={mainBelt} position={[0, 0, MAIN_BELT_Z - BELT_WIDTH / 2]} castShadow={shadows}>
        <meshStandardMaterial {...MAT.belt} />
      </mesh>

      {/* cleaning-fan belt */}
      <mesh geometry={fanBelt} position={[0, 0, FAN_BELT_Z - BELT_WIDTH / 2]} castShadow={shadows}>
        <meshStandardMaterial {...MAT.belt} />
      </mesh>

      {/* belt tensioner bracket between the two drives */}
      <mesh position={[0.02, 0.9, -0.47]} rotation={[0, 0, 0.5]}>
        <boxGeometry args={[0.16, 0.035, 0.03]} />
        <meshStandardMaterial {...MAT.steelDark} />
      </mesh>
    </group>
  )
}

export { makeBeltGeometry }
