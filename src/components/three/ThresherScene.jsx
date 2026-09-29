import { useEffect, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { ContactShadows, Environment, Lightformer, OrbitControls } from '@react-three/drei'
import { ACESFilmicToneMapping, MathUtils, Vector3 } from 'three'
import ThresherMachine from './ThresherMachine'

/**
 * THE 3D STAGE
 * ---------------------------------------------------------------------------
 * A single lighting and controls rig for the product viewer.
 * The scene is intentionally restrained: one key light with shadows, soft fill
 * lights, an offline environment for metal reflections and a contact shadow
 * under the machine. No post-processing, no particles, no bloom.
 *
 * The scene is code-split by its parent (ProductViewer), so
 * three.js is only downloaded when a visitor actually gets the 3D view.
 */

/** Camera positions used by the view buttons in the product viewer. */
export const CAMERA_PRESETS = {
  perspective: [2.5, 1.62, 2.7],
  operating: [0.15, 1.05, 3.35],
  drive: [0.05, 1.15, -3.3],
  feed: [3.3, 1.35, 0.3],
}

const CAMERA_TARGET = [0, 0.86, -0.1]

/** Cursor-driven sway — reads as slow camera movement without fighting orbit. */
function PointerSway({ strength = 1, children }) {
  const ref = useRef(null)

  useFrame((state, delta) => {
    const group = ref.current
    if (!group) return
    group.rotation.y = MathUtils.damp(group.rotation.y, state.pointer.x * 0.085 * strength, 2.4, delta)
    group.position.y = MathUtils.damp(group.position.y, state.pointer.y * 0.02 * strength, 2.4, delta)
  })

  return <group ref={ref}>{children}</group>
}

/** Eases the camera to a requested preset and yields as soon as the user drags. */
function CameraRig({ presetKey, controlsRef }) {
  const { camera } = useThree()
  const destination = useRef(new Vector3())
  const animating = useRef(false)

  useEffect(() => {
    const position = CAMERA_PRESETS[presetKey]
    if (!position) return
    destination.current.set(position[0], position[1], position[2])
    animating.current = true
  }, [presetKey])

  useEffect(() => {
    const controls = controlsRef.current
    if (!controls) return undefined
    const stop = () => {
      animating.current = false
    }
    controls.addEventListener('start', stop)
    return () => controls.removeEventListener('start', stop)
  }, [controlsRef])

  useFrame((_, delta) => {
    if (!animating.current) return
    camera.position.lerp(destination.current, 1 - Math.exp(-4.2 * delta))
    controlsRef.current?.update()
    if (camera.position.distanceTo(destination.current) < 0.03) animating.current = false
  })

  return null
}

/** Fires once after the first rendered frame (used to fade out the poster). */
function ReadySignal({ onReady }) {
  const fired = useRef(false)
  useFrame(() => {
    if (fired.current) return
    fired.current = true
    onReady?.()
  })
  return null
}


function Scene({
  explode,
  activePart,
  running,
  shadows,
  interactive,
  onPartHover,
  onPartClick,
  quality,
  presetKey,
  onReady,
}) {
  const controlsRef = useRef(null)

  return (
    <>
      <CameraRig presetKey={presetKey} controlsRef={controlsRef} />

      {/* ---------- Lighting ---------- */}
      <hemisphereLight args={['#f2f0e6', '#22261f', 0.5]} />
      <directionalLight
        position={[3.4, 5.4, 3.2]}
        intensity={2.15}
        castShadow={shadows}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-left={-3}
        shadow-camera-right={3}
        shadow-camera-top={3}
        shadow-camera-bottom={-3}
        shadow-bias={-0.0007}
        shadow-normalBias={0.02}
      />
      <directionalLight position={[-3.6, 2.4, -2.6]} intensity={0.45} color="#dfe7ec" />
      <directionalLight position={[0, 1.2, -4]} intensity={0.25} color="#f4e6c8" />

      {/* Offline environment map: reflections for painted and bare steel. */}
      <Environment resolution={quality.environmentResolution} frames={1}>
        <color attach="background" args={['#2c3134']} />
        <Lightformer intensity={2.4} position={[0, 3.2, 1.4]} scale={[7, 3, 1]} color="#ffffff" />
        <Lightformer intensity={0.9} position={[-4, 1.4, -2]} scale={[5, 4, 1]} color="#cfe0e6" />
        <Lightformer intensity={0.7} position={[4, 1.1, -3]} scale={[5, 3, 1]} color="#f6e7c8" />
        <Lightformer intensity={0.4} position={[0, -2, 2]} scale={[8, 3, 1]} color="#8d949a" />
      </Environment>

      {/* ---------- Machine ---------- */}
      <PointerSway strength={interactive ? 1 : 0.5}>
        <ThresherMachine
          explodeTarget={explode ? 1 : 0}
          activePart={activePart}
          running={running}
          shadows={shadows}
          interactive={interactive}
          onPartHover={onPartHover}
          onPartClick={onPartClick}
        />
      </PointerSway>

      <ContactShadows
        position={[0, 0.002, 0]}
        scale={quality.contactShadowScale}
        resolution={quality.shadows ? 512 : 256}
        opacity={0.5}
        blur={2.1}
        far={1.6}
        color="#0b0d0e"
      />

      <OrbitControls
        ref={controlsRef}
        makeDefault
        target={CAMERA_TARGET}
        enablePan={false}
        minDistance={2.3}
        maxDistance={6.5}
        minPolarAngle={0.45}
        maxPolarAngle={1.46}
        enableDamping
        dampingFactor={0.075}
        rotateSpeed={0.65}
      />

      <ReadySignal onReady={onReady} />
    </>
  )
}

export default function ThresherScene({
  explode = false,
  activePart = null,
  running = true,
  interactive = false,
  onPartHover,
  onPartClick,
  presetKey = 'perspective',
  quality = { dpr: [1, 1.75], shadows: true, environmentResolution: 256, contactShadowScale: 7 },
  frameloop = 'always',
  className = '',
  ariaLabel = 'Interactive 3D thresher machine',
  onReady,
}) {
  return (
    <Canvas
      className={className}
      dpr={quality.dpr}
      shadows={quality.shadows ? 'soft' : false}
      frameloop={frameloop}
      role="img"
      aria-label={ariaLabel}
      camera={{ position: CAMERA_PRESETS.perspective, fov: 30, near: 0.1, far: 60 }}
      gl={{ antialias: true, powerPreference: 'high-performance', alpha: true }}
      onCreated={({ gl }) => {
        gl.toneMapping = ACESFilmicToneMapping
        gl.toneMappingExposure = 1.05
      }}
    >
      <Scene
        explode={explode}
        activePart={activePart}
        running={running}
        shadows={quality.shadows}
        interactive={interactive}
        onPartHover={onPartHover}
        onPartClick={onPartClick}
        quality={quality}
        presetKey={presetKey}
        onReady={onReady}
      />
    </Canvas>
  )
}
