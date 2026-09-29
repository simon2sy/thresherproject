import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { MathUtils } from 'three'

/**
 * Smoothly ramps a rotating sub-assembly up to operating speed and back to
 * rest, then applies the rotation on the requested axis.
 *
 * The machine's drum, blower and pulleys all share one transverse shaft axis
 * (z), so a single hook covers every rotating part.
 *
 * @param {object}  options
 * @param {boolean} options.running  whether the machine is switched on
 * @param {number}  options.speed    target angular velocity (rad/s)
 * @param {string}  options.axis     rotation axis, 'z' by default
 * @param {number}  options.damping  how quickly the speed ramps (higher = faster)
 * @returns {import('react').MutableRefObject} ref for the rotating group
 */
export function useSpinning({ running = true, speed = 1.1, axis = 'z', damping = 1.6 } = {}) {
  const ref = useRef(null)
  const current = useRef(0)

  useFrame((_, delta) => {
    const target = running ? speed : 0
    current.current = MathUtils.damp(current.current, target, damping, delta)
    if (ref.current) ref.current.rotation[axis] += current.current * delta
  })

  return ref
}

export default useSpinning
