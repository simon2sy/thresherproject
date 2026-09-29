/**
 * Brand glyphs
 * ---------------------------------------------------------------------------
 * Small inline SVG set so social links do not depend on an icon package that
 * may or may not ship brand marks. Each glyph is a single path drawn on a
 * 24 × 24 grid and inherits `currentColor`.
 */

const base = {
  viewBox: '0 0 24 24',
  fill: 'currentColor',
  'aria-hidden': 'true',
  focusable: 'false',
}

export function FacebookIcon({ size = 18, className = '' }) {
  return (
    <svg {...base} width={size} height={size} className={className}>
      <path d="M13.5 21v-7.2h2.5l.4-2.9h-2.9V9.05c0-.84.24-1.42 1.45-1.42h1.55V5.03c-.27-.04-1.2-.11-2.28-.11-2.26 0-3.8 1.34-3.8 3.8v2.18H8v2.9h2.42V21h3.08Z" />
    </svg>
  )
}

export function InstagramIcon({ size = 18, className = '' }) {
  return (
    <svg {...base} width={size} height={size} className={className}>
      <path d="M12 2.9c2.96 0 3.31.01 4.48.06 1.08.05 1.66.23 2.05.38.51.2.88.44 1.26.82.38.38.62.75.82 1.26.15.39.33.97.38 2.05.05 1.17.06 1.52.06 4.48s-.01 3.31-.06 4.48c-.05 1.08-.23 1.66-.38 2.05-.2.51-.44.88-.82 1.26-.38.38-.75.62-1.26.82-.39.15-.97.33-2.05.38-1.17.05-1.52.06-4.48.06s-3.31-.01-4.48-.06c-1.08-.05-1.66-.23-2.05-.38a3.4 3.4 0 0 1-1.26-.82 3.4 3.4 0 0 1-.82-1.26c-.15-.39-.33-.97-.38-2.05C2.91 15.31 2.9 14.96 2.9 12s.01-3.31.06-4.48c.05-1.08.23-1.66.38-2.05.2-.51.44-.88.82-1.26.38-.38.75-.62 1.26-.82.39-.15.97-.33 2.05-.38C8.69 2.91 9.04 2.9 12 2.9Zm0 3.44a5.66 5.66 0 1 0 0 11.32 5.66 5.66 0 0 0 0-11.32Zm0 9.33a3.67 3.67 0 1 1 0-7.34 3.67 3.67 0 0 1 0 7.34Zm7.2-9.55a1.32 1.32 0 1 1-2.64 0 1.32 1.32 0 0 1 2.64 0Z" />
    </svg>
  )
}

export function YoutubeIcon({ size = 18, className = '' }) {
  return (
    <svg {...base} width={size} height={size} className={className}>
      <path d="M21.6 7.9a2.5 2.5 0 0 0-1.75-1.77C18.28 5.7 12 5.7 12 5.7s-6.28 0-7.85.43A2.5 2.5 0 0 0 2.4 7.9C2 9.48 2 12 2 12s0 2.52.4 4.1a2.5 2.5 0 0 0 1.75 1.77c1.57.43 7.85.43 7.85.43s6.28 0 7.85-.43a2.5 2.5 0 0 0 1.75-1.77C22 14.52 22 12 22 12s0-2.52-.4-4.1ZM10.1 15V9l5.06 3-5.06 3Z" />
    </svg>
  )
}

export function TiktokIcon({ size = 18, className = '' }) {
  return (
    <svg {...base} width={size} height={size} className={className}>
      <path d="M16.3 2h-2.9v12.1a2.6 2.6 0 0 1-2.6 2.5 2.6 2.6 0 0 1 0-5.2c.28 0 .55.05.8.13V8.6a5.6 5.6 0 0 0-.8-.06 5.55 5.55 0 1 0 5.55 5.55V8.6a6.6 6.6 0 0 0 3.75 1.17V6.85A3.75 3.75 0 0 1 16.3 3.1V2Z" />
    </svg>
  )
}

export function WhatsappIcon({ size = 18, className = '' }) {
  return (
    <svg {...base} width={size} height={size} className={className}>
      <path d="M12.04 2.5a9.4 9.4 0 0 0-8.1 14.16L2.5 21.5l4.95-1.4a9.4 9.4 0 1 0 4.59-17.6Zm0 1.9a7.5 7.5 0 1 1-3.9 13.9l-.3-.18-2.9.82.8-2.83-.19-.31A7.5 7.5 0 0 1 12.04 4.4Zm-3.6 3.5c-.19 0-.5.07-.76.36-.26.28-.99.96-.99 2.34 0 1.38 1 2.71 1.15 2.9.14.19 1.95 3.11 4.8 4.24 2.36.93 2.84.75 3.35.7.51-.05 1.65-.67 1.88-1.32.24-.65.24-1.2.17-1.32-.07-.11-.26-.18-.55-.32-.28-.14-1.65-.81-1.9-.9-.26-.1-.45-.14-.64.14-.19.28-.73.94-.9 1.13-.16.19-.33.21-.61.07-.28-.14-1.2-.44-2.28-1.41-.85-.75-1.4-1.68-1.57-1.96-.16-.28-.02-.44.12-.58.14-.14.28-.33.42-.5.14-.16.19-.28.28-.47.1-.19.05-.35-.02-.5-.07-.14-.63-1.53-.86-2.09-.19-.45-.38-.44-.53-.44h-.36Z" />
    </svg>
  )
}

export const brandIcons = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  youtube: YoutubeIcon,
  tiktok: TiktokIcon,
  whatsapp: WhatsappIcon,
}

export default brandIcons
