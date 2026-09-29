import Reveal from './Reveal'

/**
 * SectionHeading
 * ---------------------------------------------------------------------------
 * Consistent section header: technical eyebrow, headline, optional lead text
 * and an optional right-hand action slot (button or technical note).
 *
 * @param {'light'|'dark'} tone  colour treatment (dark = on charcoal sections)
 */
export default function SectionHeading({
  eyebrow,
  title,
  lead,
  align = 'left',
  tone = 'light',
  action = null,
  className = '',
  titleClassName = '',
  /** Number of trailing characters of `title` to wrap in <em> for emphasis. */
  highlight = 0,
  as: Tag = 'h2',
}) {
  const dark = tone === 'dark'
  const centered = align === 'center'

  return (
    <div
      className={[
        'flex flex-col gap-6',
        centered ? 'items-center text-center' : 'sm:flex-row sm:items-end sm:justify-between',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className={centered ? 'max-w-3xl' : 'max-w-3xl'}>
        {eyebrow ? (
          <Reveal variant="fade">
            <p className={`eyebrow ${dark ? 'text-aqua-300' : 'text-agri-600'}`}>{eyebrow}</p>
          </Reveal>
        ) : null}

        {/*
          `title` accepts a plain string or a React node, so a caller can wrap
          one word in a gradient span without this component knowing about it.
          Gradient styling is applied through `titleClassName` rather than
          `dangerouslySetInnerHTML`.
        */}
        <Reveal>
          <Tag className={`h-section mt-4 ${dark ? 'text-sand-50' : 'text-ink'} ${titleClassName}`}>
            {typeof title === 'string' ? (
              // Highlight a trailing keyword with <em> when the caller opts in
              // via `highlight`. Keeps emphasis out of the copy itself.
              highlight ? (
                <>
                  {title.slice(0, title.length - highlight.length).trimEnd()}
                  {' '}
                  <em className="not-italic">{title.slice(-highlight.length)}</em>
                </>
              ) : (
                title
              )
            ) : (
              title
            )}
          </Tag>
        </Reveal>

        {lead ? (
          <Reveal delay={0.06}>
            <div className={`lede mt-5 max-w-2xl ${dark ? 'text-sand-100/70' : ''}`}>
              {typeof lead === 'string' ? <p>{lead}</p> : lead}
            </div>
          </Reveal>
        ) : null}
      </div>

      {action ? (
        <Reveal variant="fade" delay={0.1} className={centered ? 'mt-2' : 'shrink-0'}>
          {action}
        </Reveal>
      ) : null}
    </div>
  )
}
