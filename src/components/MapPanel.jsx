import { MapPin, Navigation } from 'lucide-react'
import { useLanguage, useSite } from '../i18n'

/**
 * MapPanel
 * ---------------------------------------------------------------------------
 * Location panel for Jhapa Gaupalika, Jhapa.
 *
 * Renders the real Google Maps embed as soon as `VITE_MAPS_EMBED_URL` is set in
 * `.env.local`. Until then it draws a deliberately neutral, styled placeholder
 * that still gives the visitor the address, the coordinates and a link to open
 * directions — so the section is useful, not decorative.
 */
export default function MapPanel({ className = '' }) {
  const { t } = useLanguage()
  const site = useSite()
  const { embedUrl, query, directionsUrl } = site.map

  return (
    <div className={`border border-ink/10 bg-paper ${className}`}>
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-graphite sm:aspect-[16/9]">
        {embedUrl ? (
          <iframe
            title={t('map.iframeTitle', {
              name: site.name,
              locality: site.address.locality,
              district: site.address.district,
            })}
            src={embedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-full w-full border-0"
            allowFullScreen
          />
        ) : (
          <div className="absolute inset-0" aria-hidden="true">
            {/* Styled placeholder: grid, roads and a marker over Jhapa */}
            <div className="absolute inset-0 bg-[#1b1f21]" />
            <div
              className="absolute inset-0 opacity-[0.35]"
              style={{
                backgroundImage:
                  'linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)',
                backgroundSize: '46px 46px',
              }}
            />
            <div className="absolute left-0 right-0 top-[58%] h-[7px] -rotate-3 bg-white/10" />
            <div className="absolute bottom-0 left-[34%] top-0 w-[6px] rotate-6 bg-white/[0.08]" />
            <div className="absolute left-0 right-0 top-[36%] h-[3px] -rotate-1 bg-agri-500/40" />
            <div className="absolute bottom-10 right-10 h-24 w-24 rounded-full bg-white/[0.04]" />

            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
              <span className="grid h-12 w-12 place-items-center rounded-full border border-amber_acc-400/60 bg-ink/80">
                <MapPin size={20} className="text-amber_acc-300" />
              </span>
              <span className="mt-3 block font-display text-sm font-bold text-sand-50">
                {site.address.locality}
              </span>
              <span className="mt-1 block text-2xs uppercase tracking-technical text-sand-100/55">
                {site.address.lat}° N, {site.address.lng}° E
              </span>
            </div>

            <p className="absolute bottom-3 left-3 right-3 text-2xs uppercase tracking-technical text-sand-100/40">
              {t('map.placeholder')}
            </p>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-4 border-t border-ink/10 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="font-display text-base font-bold">{site.name}</h3>
          <p className="mt-1 text-sm text-ink/65">
            {site.address.line1}, {site.address.line2}
          </p>
          <p className="mt-1 text-xs text-ink/45">
            {t('map.searchRef')} <span className="font-medium text-ink/60">{query}</span>
          </p>
        </div>

        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-[3px] border border-ink/25 px-4 py-2.5 text-sm font-semibold transition-colors hover:border-ink hover:bg-ink/[0.04]"
        >
          <Navigation size={15} />
          {t('map.openMaps')}
        </a>
      </div>
    </div>
  )
}
