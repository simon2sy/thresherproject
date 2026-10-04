import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useLanguage } from '../i18n'

/**
 * Lightbox
 * ---------------------------------------------------------------------------
 * Fullscreen image viewer for the machinery gallery. Keyboard accessible
 * (Escape closes, arrow keys move) and focus is moved to the close control when
 * it opens, then returned to the originating thumbnail when it closes.
 *
 * @param {object} props
 * @param {Array<{src:string,title:string,caption?:string,alt:string}>} props.items
 * @param {number|null} props.index   open index, or null when closed
 * @param {(index:number|null)=>void} props.onClose
 * @param {string} [props.category]   label shown in the technical caption bar
 */
export default function Lightbox({ items = [], index = null, onClose, category }) {
  const { t } = useLanguage()
  const closeRef = useRef(null)
  const lastFocused = useRef(null)
  const open = index !== null && index >= 0 && items[index]

  useEffect(() => {
    if (!open) return undefined
    lastFocused.current = document.activeElement
    closeRef.current?.focus()

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKey = (event) => {
      if (event.key === 'Escape') onClose(null)
      if (event.key === 'ArrowRight') onClose((index + 1) % items.length)
      if (event.key === 'ArrowLeft') onClose((index - 1 + items.length) % items.length)
    }
    window.addEventListener('keydown', onKey)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKey)
      if (lastFocused.current instanceof HTMLElement) lastFocused.current.focus()
    }
  }, [open, index, items.length, onClose])

  const current = open ? items[index] : null

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={current.title}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[80] flex flex-col bg-ink/95 backdrop-blur-sm"
        >
          {/* Top bar */}
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 sm:px-6">
            <p className="flex items-center gap-3 text-2xs uppercase tracking-technical text-sand-100/60">
              <span className="tabular text-sand-50">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="hidden sm:inline">/ {String(items.length).padStart(2, '0')}</span>
              {category ? <span className="hidden text-sand-100/40 sm:inline">{category}</span> : null}
            </p>
            <button
              ref={closeRef}
              type="button"
              onClick={() => onClose(null)}
              aria-label={t('gallery.closeViewerAria')}
              className="grid h-10 w-10 place-items-center rounded-[2px] border border-white/20 text-sand-50 transition-colors hover:border-white/60"
            >
              <X size={18} />
            </button>
          </div>

          {/* Image */}
          <div className="flex flex-1 items-center justify-center overflow-hidden p-3 sm:p-8">
            <motion.img
              key={current.src}
              src={current.src}
              alt={current.alt}
              initial={{ opacity: 0, scale: 0.985 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.28, ease: [0.22, 0.61, 0.36, 1] }}
              className="max-h-full max-w-full object-contain"
            />
          </div>

          {/* Caption + controls */}
          <div className="flex flex-col gap-4 border-t border-white/10 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div className="max-w-2xl">
              <h2 className="font-display text-base font-bold text-sand-50 sm:text-lg">
                {current.title}
              </h2>
              {current.caption ? (
                <p className="mt-1 text-sm text-sand-100/60">{current.caption}</p>
              ) : null}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onClose((index - 1 + items.length) % items.length)}
                aria-label={t('gallery.prevAria')}
                className="grid h-11 w-11 place-items-center rounded-[2px] border border-white/20 text-sand-50 transition-colors hover:border-white/60"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={() => onClose((index + 1) % items.length)}
                aria-label={t('gallery.nextAria')}
                className="grid h-11 w-11 place-items-center rounded-[2px] border border-white/20 text-sand-50 transition-colors hover:border-white/60"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
