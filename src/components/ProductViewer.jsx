import { Suspense, lazy, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Maximize2, Minimize2, Pause, Play, RotateCcw } from 'lucide-react'
import { useLanguage, useThresherParts } from '../i18n'
import useDeviceCapability from '../hooks/useDeviceCapability'
import ErrorBoundary from './ErrorBoundary'

const ThresherScene = lazy(() => import('./three/ThresherScene'))

/**
 * ProductViewer
 * ---------------------------------------------------------------------------
 * The product detail media panel. Three presentations of the same machine:
 *
 *   Photos   — the gallery from product.imagery.gallery
 *   Rotate   — interactive 3D: orbit, zoom, view presets, running/stopped
 *   Exploded — technical view: sub-assemblies separate along the drive axis and
 *              the component list identifies each one (hover or tap to
 *              highlight it on the model)
 *
 * 3D is only mounted when a tab asks for it, and only when the device reports
 * working WebGL — elsewhere the photo view is shown with a short note.
 */

const VIEW_PRESETS = [
  { key: 'perspective', labelKey: 'viewer.presetPerspective' },
  { key: 'operating', labelKey: 'viewer.presetOperating' },
  { key: 'drive', labelKey: 'viewer.presetDrive' },
  { key: 'feed', labelKey: 'viewer.presetFeed' },
]

export default function ProductViewer({ product }) {
  const { t } = useLanguage()
  const thresherParts = useThresherParts()
  const capability = useDeviceCapability()
  const [mode, setMode] = useState('photos')
  const [imageIndex, setImageIndex] = useState(0)
  const [running, setRunning] = useState(true)
  const [presetKey, setPresetKey] = useState('perspective')
  const [activePart, setActivePart] = useState(null)
  const [ready, setReady] = useState(false)
  const [fullscreen, setFullscreen] = useState(false)
  const stageRef = useRef(null)

  const gallery = product.imagery.gallery
  const is3D = mode === 'rotate' || mode === 'exploded'
  const show3D = is3D && capability.canRender3D && capability.ready

  const tabs = useMemo(
    () => [
      { key: 'photos', label: t('viewer.tabPhotos') },
      { key: 'rotate', label: t('viewer.tabRotate') },
      { key: 'exploded', label: t('viewer.tabExploded') },
    ],
    [t],
  )

  // Keep the fullscreen flag in sync when fullscreen is left with the Esc key.
  useEffect(() => {
    const onChange = () => setFullscreen(Boolean(document.fullscreenElement))
    document.addEventListener('fullscreenchange', onChange)
    return () => document.removeEventListener('fullscreenchange', onChange)
  }, [])

  const toggleFullscreen = async () => {
    const node = stageRef.current
    if (!node) return
    try {
      if (document.fullscreenElement) await document.exitFullscreen()
      else await node.requestFullscreen()
    } catch {
      // Fullscreen can be blocked by the browser; the layout stays usable.
      setFullscreen((value) => !value)
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)]">
      <div>
        <div role="tablist" aria-label={t('viewer.tablistAria')} className="mb-3 flex flex-wrap gap-2">
          {tabs.map((tab) => {
            const active = mode === tab.key
            return (
              <button
                key={tab.key}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setMode(tab.key)}
                className={[
                  'rounded-[2px] border px-3.5 py-2 text-2xs font-semibold uppercase tracking-technical transition-colors',
                  active
                    ? 'border-ink bg-ink text-sand-50'
                    : 'border-ink/15 text-ink/60 hover:border-ink/40 hover:text-ink',
                ].join(' ')}
              >
                {tab.label}
              </button>
            )
          })}
        </div>

        <div
          ref={stageRef}
          className={[
            'relative overflow-hidden border border-ink/10',
            fullscreen ? 'bg-ink' : is3D ? 'bg-graphite' : 'bg-sand-200',
          ].join(' ')}
        >
          <div className={fullscreen ? 'h-screen' : 'aspect-[4/3] sm:aspect-[16/11]'}>
            {mode === 'photos' ? (
              <img
                key={gallery[imageIndex]}
                src={gallery[imageIndex]}
                alt={t('viewer.viewAlt', {
                  code: product.code,
                  name: product.name,
                  index: imageIndex + 1,
                })}
                className="h-full w-full object-contain p-6 sm:p-10"
                decoding="async"
              />
            ) : null}
            {is3D && show3D ? (
              <div className="relative h-full w-full">
                <ErrorBoundary
                  fallback={
                    <div className="grid h-full w-full place-items-center px-6">
                      <p className="max-w-sm text-center text-xs uppercase tracking-technical text-sand-100/55">
                        {t('viewer.failed3d')}
                      </p>
                    </div>
                  }
                >
                  <Suspense fallback={null}>
                    <ThresherScene
                      explode={mode === 'exploded'}
                      activePart={activePart}
                      running={running}
                      interactive
                      onPartHover={(id) => setActivePart(id)}
                      onPartClick={(id) => setActivePart(id)}
                      presetKey={mode === 'exploded' ? 'drive' : presetKey}
                      quality={capability.quality}
                      onReady={() => setReady(true)}
                      ariaLabel={t('viewer.modelAria', { code: product.code, name: product.name })}
                    />
                  </Suspense>
                </ErrorBoundary>

                <AnimatePresence>
                  {!ready ? (
                    <motion.div
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="pointer-events-none absolute inset-0 grid place-items-center bg-graphite"
                    >
                      <p className="text-2xs uppercase tracking-technical text-sand-100/60">
                        {t('viewer.loading3d')}
                      </p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            ) : null}

            {is3D && !show3D ? (
              <div className="grid h-full w-full place-items-center px-6 text-center">
                <div className="max-w-sm">
                  <p className="text-2xs uppercase tracking-technical text-ink/45">
                    {t('viewer.unavailable3d')}
                  </p>
                  <p className="mt-3 text-sm text-ink/65">{t('viewer.unavailable3dNote')}</p>
                </div>
              </div>
            ) : null}
          </div>
          {is3D && show3D ? (
            <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 bg-ink/70 px-3 py-2.5 backdrop-blur-sm">
              <div className="flex flex-wrap items-center gap-2">
                {mode === 'rotate' ? (
                  VIEW_PRESETS.map((preset) => (
                    <button
                      key={preset.key}
                      type="button"
                      onClick={() => setPresetKey(preset.key)}
                      className={[
                        'rounded-[2px] border px-2.5 py-1.5 text-2xs uppercase tracking-technical transition-colors',
                        presetKey === preset.key
                          ? 'border-amber_acc-400 text-amber_acc-300'
                          : 'border-white/15 text-sand-100/65 hover:border-white/40 hover:text-sand-50',
                      ].join(' ')}
                    >
                      {t(preset.labelKey)}
                    </button>
                  ))
                ) : (
                  <span className="text-2xs uppercase tracking-technical text-sand-100/60">
                    {t('viewer.separated')}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                {mode === 'rotate' ? (
                  <>
                    <button
                      type="button"
                      onClick={() => setRunning((value) => !value)}
                      aria-pressed={running}
                      className="flex items-center gap-2 rounded-[2px] border border-white/15 px-2.5 py-1.5 text-2xs uppercase tracking-technical text-sand-100/70 transition-colors hover:border-white/40 hover:text-sand-50"
                    >
                      {running ? <Pause size={13} /> : <Play size={13} />}
                      {running ? t('viewer.running') : t('viewer.stopped')}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setPresetKey('perspective')
                        setActivePart(null)
                      }}
                      className="flex items-center gap-2 rounded-[2px] border border-white/15 px-2.5 py-1.5 text-2xs uppercase tracking-technical text-sand-100/70 transition-colors hover:border-white/40 hover:text-sand-50"
                    >
                      <RotateCcw size={13} />
                      {t('viewer.reset')}
                    </button>
                  </>
                ) : null}

                <button
                  type="button"
                  onClick={toggleFullscreen}
                  aria-label={
                    fullscreen ? t('viewer.exitFullscreen') : t('viewer.viewFullscreen')
                  }
                  className="grid h-8 w-8 place-items-center rounded-[2px] border border-white/15 text-sand-100/70 transition-colors hover:border-white/40 hover:text-sand-50"
                >
                  {fullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
                </button>
              </div>
            </div>
          ) : null}
        </div>
        {mode === 'photos' ? (
          <ul className="mt-3 grid grid-cols-5 gap-2">
            {gallery.map((src, index) => (
              <li key={src}>
                <button
                  type="button"
                  onClick={() => setImageIndex(index)}
                  aria-label={t('viewer.showViewAria', { index: index + 1, total: gallery.length })}
                  aria-current={index === imageIndex}
                  className={[
                    'block w-full overflow-hidden border bg-sand-100 transition-colors',
                    index === imageIndex ? 'border-ink' : 'border-ink/10 hover:border-ink/40',
                  ].join(' ')}
                >
                  <img
                    src={src}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    decoding="async"
                    className="aspect-[4/3] w-full object-contain p-1.5"
                  />
                </button>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
      <div>
        {mode === 'exploded' ? (
          <div className="border border-ink/10 bg-paper">
            <div className="border-b border-ink/10 px-4 py-3">
              <h2 className="text-2xs font-semibold uppercase tracking-technical text-ink/55">
                {t('viewer.componentsHeading')}
              </h2>
              <p className="mt-1 text-xs text-ink/55">{t('viewer.componentsHint')}</p>
            </div>
            <ul className="divide-y divide-ink/10">
              {thresherParts.map((part) => {
                const active = part.id === activePart
                return (
                  <li key={part.id}>
                    <button
                      type="button"
                      onMouseEnter={() => setActivePart(part.id)}
                      onFocus={() => setActivePart(part.id)}
                      onClick={() =>
                        setActivePart((current) => (current === part.id ? null : part.id))
                      }
                      aria-pressed={active}
                      className={[
                        'w-full px-4 py-3 text-left transition-colors',
                        active ? 'bg-agri-50' : 'hover:bg-sand-100',
                      ].join(' ')}
                    >
                      <span className="flex items-center gap-2.5">
                        <span
                          className={[
                            'h-1.5 w-1.5 rounded-full',
                            active ? 'bg-amber_acc-500' : 'bg-ink/25',
                          ].join(' ')}
                        />
                        <span className="font-display text-sm font-bold text-ink">{part.label}</span>
                      </span>
                      <span className="mt-1.5 block pl-4 text-xs leading-relaxed text-ink/60">
                        {part.description}
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
        ) : (
          <div className="border border-ink/10 bg-paper p-5">
            <h2 className="text-2xs font-semibold uppercase tracking-technical text-ink/55">
              {t('viewer.whyMachine')}
            </h2>
            <ul className="mt-4 space-y-3">
              {product.features.map((feature) => (
                <li key={feature} className="flex gap-3 text-sm leading-relaxed text-ink/70">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-agri-500" />
                  {feature}
                </li>
              ))}
            </ul>

            <div className="mt-6 border-t border-ink/10 pt-5">
              <h3 className="text-2xs font-semibold uppercase tracking-technical text-ink/55">
                {t('viewer.priceLabel')}
              </h3>
              <p className="mt-3 font-display text-xl font-extrabold tracking-[-0.02em] text-ink tabular">
                {product.price}
              </p>
            </div>

            {capability.ready && !capability.canRender3D ? (
              <p className="mt-6 border-t border-ink/10 pt-5 text-xs text-ink/50">
                {t('viewer.unavailable3dNote')}
              </p>
            ) : null}
          </div>
        )}
      </div>
    </div>
  )
}
