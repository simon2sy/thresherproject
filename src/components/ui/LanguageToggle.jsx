import { useLanguage } from '../../i18n'

/**
 * LanguageToggle
 * ---------------------------------------------------------------------------
 * Segmented English / नेपाली switch. Persists the choice through the
 * LanguageProvider and marks the active option for assistive tech with
 * `aria-pressed`. `lang` on each option keeps the button label in its own
 * script regardless of the current UI language.
 *
 * @param {object} props
 * @param {'light'|'dark'} [props.tone]  colour treatment (dark = on charcoal)
 * @param {string} [props.className]
 */
export default function LanguageToggle({ tone = 'dark', className = '' }) {
  const { lang, setLang, t } = useLanguage()
  const dark = tone === 'dark'

  const options = [
    { code: 'en', short: 'EN', label: t('language.english') },
    { code: 'ne', short: 'नेपाली', label: t('language.nepali') },
  ]

  return (
    <div
      role="group"
      aria-label={t('language.label')}
      className={[
        'inline-flex items-center rounded-[3px] border p-0.5',
        dark ? 'border-white/20' : 'border-ink/20',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {options.map((option) => {
        const active = lang === option.code
        return (
          <button
            key={option.code}
            type="button"
            lang={option.code}
            onClick={() => setLang(option.code)}
            aria-pressed={active}
            aria-label={option.label}
            className={[
              'rounded-[2px] px-2.5 py-1 text-2xs font-semibold uppercase tracking-technical transition-colors',
              active
                ? dark
                  ? 'bg-sand-50 text-ink'
                  : 'bg-ink text-sand-50'
                : dark
                  ? 'text-sand-100/70 hover:text-sand-50'
                  : 'text-ink/60 hover:text-ink',
            ].join(' ')}
          >
            {option.short}
          </button>
        )
      })}
    </div>
  )
}
