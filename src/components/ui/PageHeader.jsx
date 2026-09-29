import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import Reveal from './Reveal'
import AuroraBackdrop from './AuroraBackdrop'

/**
 * PageHeader
 * ---------------------------------------------------------------------------
 * Compact dark header for inner pages. Keeps the same industrial treatment as
 * the hero (hatch texture, green rail) so navigation between pages feels like
 * one site, not a set of templates.
 *
 * @param {object} props
 * @param {string} props.eyebrow
 * @param {string} props.title
 * @param {string} [props.lead]
 * @param {Array<{label:string,to?:string}>} [props.breadcrumb]
 * @param {React.ReactNode} [props.action]
 */
export default function PageHeader({ eyebrow, title, lead, breadcrumb = [], action = null }) {
  return (
    <header className="on-dark relative isolate overflow-hidden bg-ink pt-28 sm:pt-32 lg:pt-36">
      {/* Same aurora language as the hero, so inner pages feel like part of
          the same world rather than a different template. The conic sweep is
          disabled here — on a short header strip it is invisible but still
          costs a full-width composite. */}
      <AuroraBackdrop variant="section" sweep={false} />
      <div
        className="absolute inset-0 opacity-[0.14] [mask-image:radial-gradient(65%_70%_at_30%_40%,#000_0%,transparent_100%)]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.10) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.10) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
        aria-hidden="true"
      />
      <div className="rail-brand motion-safe:animate-hue-drift" aria-hidden="true">
        <span className="absolute inset-x-0 h-1/3 bg-gradient-to-b from-white/70 to-transparent motion-safe:animate-rail-sweep" />
      </div>

      <div className="shell relative pb-12 sm:pb-14 lg:pb-16">
        {breadcrumb.length > 0 ? (
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-2 text-2xs uppercase tracking-technical text-sand-100/50">
              {breadcrumb.map((crumb, index) => (
                <li key={`${crumb.label}-${index}`} className="flex items-center gap-2">
                  {crumb.to ? (
                    <Link to={crumb.to} className="transition-colors hover:text-sand-50">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-sand-100/80">{crumb.label}</span>
                  )}
                  {index < breadcrumb.length - 1 ? (
                    <ChevronRight size={12} strokeWidth={2} />
                  ) : null}
                </li>
              ))}
            </ol>
          </nav>
        ) : null}

        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            {eyebrow ? (
              <Reveal variant="fade">
                <p className="eyebrow text-aqua-300">{eyebrow}</p>
              </Reveal>
            ) : null}
            <Reveal>
              <h1 className="h-display mt-4 text-sand-50">{title}</h1>
            </Reveal>
            {lead ? (
              <Reveal delay={0.06}>
                <p className="lede mt-5 max-w-2xl text-sand-100/70">{lead}</p>
              </Reveal>
            ) : null}
          </div>

          {action ? (
            <Reveal variant="fade" delay={0.1} className="shrink-0">
              {action}
            </Reveal>
          ) : null}
        </div>
      </div>
    </header>
  )
}
