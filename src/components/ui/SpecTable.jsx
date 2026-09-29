import Icon from './Icon'

/**
 * SpecTable
 * ---------------------------------------------------------------------------
 * Data-driven specification table used by the technical section and by every
 * product detail page. Rows are plain `{ label, value }` objects, so real
 * machine data can be dropped straight in from src/data/products.js.
 *
 * On small screens the table collapses into stacked label/value cards, which
 * stays readable at 375px.
 *
 * @param {object} props
 * @param {Array<{label:string,value:string}>} props.rows
 * @param {string} [props.notice]  sample-data note shown under the table
 * @param {'light'|'dark'} [props.tone]
 * @param {string} [props.caption]
 */
export default function SpecTable({ rows = [], notice, tone = 'light', caption }) {
  const dark = tone === 'dark'

  return (
    <div>
      <div className={`overflow-hidden rounded-[3px] border ${dark ? 'border-white/12 bg-white/[0.03]' : 'border-ink/10 bg-paper'}`}>
        <table className="table-spec hidden sm:table">
          {caption ? <caption className="sr-only">{caption}</caption> : null}
          <thead>
            <tr>
              <th scope="col" className={dark ? '!text-sand-100/45' : ''}>
                Specification
              </th>
              <th scope="col" className={dark ? '!text-sand-100/45' : ''}>
                Details
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label} className={dark ? 'border-white/10' : ''}>
                <th scope="row" className={dark ? '!text-sand-100/60' : ''}>
                  {row.label}
                </th>
                <td className={dark ? '!text-sand-50' : ''}>{row.value}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Small screens: stacked cards */}
        <dl className="divide-y divide-ink/10 sm:hidden">
          {rows.map((row) => (
            <div key={row.label} className="px-4 py-3">
              <dt className={`tech-label ${dark ? '!text-sand-100/50' : ''}`}>{row.label}</dt>
              <dd className={`mt-1 text-sm font-semibold ${dark ? 'text-sand-50' : 'text-ink'}`}>
                {row.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {notice ? (
        <p
          className={`mt-4 flex items-start gap-2.5 text-xs leading-relaxed ${
            dark ? 'text-sand-100/55' : 'text-ink/55'
          }`}
        >
          <Icon name="info" size={15} className="mt-0.5 shrink-0" />
          <span>{notice}</span>
        </p>
      ) : null}
    </div>
  )
}
