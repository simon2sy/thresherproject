import { useMemo, useState } from 'react'
import { useGallery, useLanguage } from '../i18n'
import Lightbox from './Lightbox'
import Reveal from './ui/Reveal'

/**
 * Gallery
 * ---------------------------------------------------------------------------
 * Masonry-style machinery gallery with category filters and a fullscreen
 * lightbox. Filtering keeps the original index so the lightbox can walk through
 * the visible set in order.
 *
 * @param {object} props
 * @param {boolean} [props.showFilters]
 * @param {number} [props.limit]  show only the first N items (home page teaser)
 */

/**
 * Masonry footprints, each matched to the real aspect ratio of the photo it is
 * used for (see `shape` on each item in src/data/gallery.js) so that
 * `object-cover` crops as little of the subject as possible.
 */
const ASPECT = {
  panorama: 'aspect-[21/9]',
  wide: 'aspect-[16/9]',
  classic: 'aspect-[4/3]',
  square: 'aspect-square',
  tall: 'aspect-[3/4]',
}

export default function Gallery({ showFilters = true, limit, heading }) {
  const { t } = useLanguage()
  const gallery = useGallery()
  const { categories: galleryCategories, items: galleryItems } = gallery
  // The category is tracked by position (0 = All) so the selection survives a
  // language switch, where the category labels themselves are reworded.
  const [categoryIndex, setCategoryIndex] = useState(0)
  const [openIndex, setOpenIndex] = useState(null)
  const category = galleryCategories[categoryIndex] ?? galleryCategories[0]

  const items = useMemo(() => {
    const filtered =
      categoryIndex === 0
        ? galleryItems
        : galleryItems.filter((item) => item.category === category)
    return typeof limit === 'number' ? filtered.slice(0, limit) : filtered
  }, [categoryIndex, category, galleryItems, limit])

  return (
    <div>
      {showFilters ? (
        <Reveal variant="fade">
          <div
            className="mb-8 flex flex-wrap items-center gap-2 sm:mb-10"
            role="tablist"
            aria-label={t('gallery.categoriesAria')}
          >
            {galleryCategories.map((entry, index) => {
              const active = index === categoryIndex
              return (
                <button
                  key={entry}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => {
                    setCategoryIndex(index)
                    setOpenIndex(null)
                  }}
                  className={[
                    'rounded-[3px] border px-3.5 py-2 text-2xs font-semibold uppercase tracking-technical transition-all duration-200 ease-smooth',
                    active
                      ? 'border-transparent bg-ink text-sand-50 shadow-card'
                      : 'border-ink/15 text-ink/60 hover:-translate-y-0.5 hover:border-aqua-500/50 hover:bg-aqua-500/[0.07] hover:text-aqua-700',
                  ].join(' ')}
                >
                  {entry}
                </button>
              )
            })}
          </div>
        </Reveal>
      ) : null}

      <div className="columns-2 gap-2.5 sm:gap-4 lg:columns-3 [&>*]:mb-2.5 sm:[&>*]:mb-4">
        {items.map((item, index) => (
          <Reveal
            key={item.id}
            variant="fade"
            delay={Math.min(index * 0.04, 0.24)}
            className="break-inside-avoid"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(index)}
              className="group relative block w-full overflow-hidden rounded-[3px] border border-ink/10 bg-sand-200 text-left shadow-card transition-[transform,box-shadow,border-color] duration-300 ease-smooth hover:-translate-y-1.5 hover:border-aqua-500/40 hover:shadow-glow focus-visible:-translate-y-1.5"
              aria-label={t('gallery.openAria', { title: item.title })}
            >
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                decoding="async"
                className={`w-full object-cover transition-transform duration-700 ease-smooth group-hover:scale-[1.08] ${ASPECT[item.shape] || ASPECT.square}`}
              />

              <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/25 to-transparent opacity-95 transition-opacity duration-300 group-hover:opacity-100" />

              {/* Aqua rim that traces the tile on hover. */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-[3px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  boxShadow: 'inset 0 0 0 1.5px rgba(52,203,219,0.85)',
                }}
              />

              {/* Speck of light that travels across the frame on hover. */}
              <span className="sheen" aria-hidden="true" />

              <span className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-2.5 sm:gap-3 sm:p-4">
                <span className="block min-w-0">
                  <span className="block text-[0.58rem] font-semibold uppercase tracking-technical text-amber_acc-300 sm:text-2xs">
                    {item.category}
                  </span>
                  <span className="mt-0.5 block font-display text-[0.78rem] font-bold leading-snug text-sand-50 sm:mt-1 sm:text-[0.95rem]">
                    {item.title}
                  </span>
                  {item.caption ? (
                    <span className="mt-1 hidden text-xs text-sand-100/65 sm:block">
                      {item.caption}
                    </span>
                  ) : null}
                </span>
                <span className="tech-label shrink-0 pb-1 !text-sand-100/60 opacity-0 transition-opacity group-hover:opacity-100">
                  {t('gallery.view')}
                </span>
              </span>
            </button>
          </Reveal>
        ))}
      </div>

      {heading ? <p className="mt-6 text-xs text-ink/50">{heading}</p> : null}

      <Lightbox
        items={items}
        index={openIndex}
        onClose={setOpenIndex}
        category={categoryIndex === 0 ? undefined : category}
      />
    </div>
  )
}
