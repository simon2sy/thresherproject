import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { strings } from './strings'

/**
 * ---------------------------------------------------------------------------
 * LanguageProvider / useLanguage
 * ---------------------------------------------------------------------------
 * Holds the active UI language ('en' | 'ne') and exposes:
 *   lang      → current language code
 *   setLang   → set an explicit language
 *   toggle    → flip between English and Nepali
 *   isNepali  → convenience boolean
 *   t(key, v) → look a UI string up by dotted key, with {token} interpolation
 *
 * The choice is remembered in localStorage and the <html lang> attribute is
 * kept in sync so screen readers, hyphenation and the Devanagari font all
 * follow the selected language.
 */
const STORAGE_KEY = 'dbg:lang'
const SUPPORTED = ['en', 'ne']

const LanguageContext = createContext(null)

function readInitialLang() {
  if (typeof window === 'undefined') return 'en'
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (SUPPORTED.includes(stored)) return stored
  } catch {
    /* storage can be blocked — fall through to the browser hint */
  }
  return (window.navigator?.language || '').toLowerCase().startsWith('ne') ? 'ne' : 'en'
}

/** Replace `{token}` placeholders in a translated string. */
function interpolate(template, vars) {
  if (!vars) return template
  return template.replace(/\{(\w+)\}/g, (match, key) =>
    Object.prototype.hasOwnProperty.call(vars, key) ? String(vars[key]) : match,
  )
}

/** Walk a dotted path into the string dictionary and pick the language value. */
function lookup(dictionary, path, lang) {
  const entry = path.split('.').reduce((acc, part) => (acc == null ? acc : acc[part]), dictionary)
  if (entry == null) return undefined
  if (typeof entry === 'string') return entry
  return entry[lang] ?? entry.en
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(readInitialLang)

  useEffect(() => {
    const root = document.documentElement
    root.lang = lang
    root.setAttribute('data-lang', lang)
    try {
      window.localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      /* ignore persistence failures */
    }
  }, [lang])

  const setLang = useCallback((next) => {
    if (SUPPORTED.includes(next)) setLangState(next)
  }, [])

  const toggle = useCallback(() => {
    setLangState((current) => (current === 'ne' ? 'en' : 'ne'))
  }, [])

  const t = useCallback(
    (key, vars) => {
      const value = lookup(strings, key, lang)
      if (value == null) return key
      return interpolate(value, vars)
    },
    [lang],
  )

  const value = useMemo(
    () => ({ lang, setLang, toggle, isNepali: lang === 'ne', t }),
    [lang, setLang, toggle, t],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used inside a <LanguageProvider>')
  }
  return context
}

export default LanguageProvider
