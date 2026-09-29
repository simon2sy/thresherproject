import { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { MathUtils } from 'three'
import { thresherParts } from '../../data/thresherParts'
import { partRenderers } from './machine/registry'

const HIGHLIGHT = 0x3a2a08 // warm amber tint on the active sub-assembly

/**
 * THE THRESHER
 * ---------------------------------------------------------------------------
 * Renders every sub-assembly described in `src/data/thresherParts.js`, animates
 * the exploded view and highlights the sub-assembly that is currently selected
 * in the technical component list.
 *
 * Props
 *   explodeTarget  0 = assembled, 1 = fully exploded (animated internally)
 *   activePart     id of the highlighted sub-assembly
 *   running        machine switched on (drum, fan and pulleys rotate)
 *   shadows        enable shadow casting/receiving on the meshes
 *   interactive    enable 3D picking (hover/select a sub-assembly)
 */
export default function ThresherMachine({
  explodeTarget = 0,
  activePart = null,
  running = true,
  shadows = true,
  interactive = false,
  onPartHover,
  onPartClick,
}) {
  const partRefs = useRef([])
  const amount = useRef(0)

  // Exploded view: positions are driven here rather than by React state so the
  // movement stays smooth without re-rendering the whole machine each frame.
  useFrame((_, delta) => {
    amount.current = MathUtils.damp(amount.current, explodeTarget, 3.2, delta)
    const t = amount.current
    thresherParts.forEach((part, index) => {
      const group = partRefs.current[index]
      if (!group) return
      group.position.set(
        part.position[0] + part.explode[0] * t,
        part.position[1] + part.explode[1] * t,
        part.position[2] + part.explode[2] * t,
      )
    })
  })

  // Highlight the selected sub-assembly. Every mesh owns its own material
  // instance (see machine/materials.js), so this never leaks to other parts.
  useEffect(() => {
    thresherParts.forEach((part, index) => {
      const group = partRefs.current[index]
      if (!group) return
      const isActive = part.id === activePart
      group.traverse((object) => {
        if (object.isMesh && object.material && object.material.emissive) {
          object.material.emissive.setHex(isActive ? HIGHLIGHT : 0x000000)
          object.material.emissiveIntensity = isActive ? 1 : 0
        }
      })
    })
  }, [activePart])

  return (
    <group>
      {thresherParts.map((part, index) => {
        const render = partRenderers[part.id]
        return (
          <group
            key={part.id}
            ref={(element) => {
              partRefs.current[index] = element
            }}
            position={part.position}
            onPointerOver={
              interactive
                ? (event) => {
                    event.stopPropagation()
                    onPartHover?.(part.id)
                  }
                : undefined
            }
            onPointerOut={
              interactive
                ? (event) => {
                    event.stopPropagation()
                    onPartHover?.(null)
                  }
                : undefined
            }
            onClick={
              interactive
                ? (event) => {
                    event.stopPropagation()
                    onPartClick?.(part.id)
                  }
                : undefined
            }
          >
            {render ? render({ running, shadows }) : null}
          </group>
        )
      })}
    </group>
  )
}
