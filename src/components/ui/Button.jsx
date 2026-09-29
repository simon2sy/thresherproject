import { forwardRef } from 'react'
import { Link } from 'react-router-dom'

/**
 * Button
 * ---------------------------------------------------------------------------
 * One button component that renders as:
 *   <Link>   when `to` is given (internal navigation)
 *   <a>      when `href` is given (external link, phone, mail, WhatsApp)
 *   <button> otherwise
 *
 * Variants map onto the classes defined in index.css, so hover/focus states and
 * the industrial corner radius stay consistent across the site.
 */

const VARIANTS = {
  primary: 'btn-primary',
  accent: 'btn-accent',
  outline: 'btn-outline',
  outlineLight: 'btn-outline-light',
  light: 'btn-light',
  amber: 'btn-amber',
  quiet: 'btn-outline border-transparent',
}

const SIZES = {
  sm: 'px-4 py-2.5 text-[0.82rem]',
  md: '',
  lg: 'btn-lg',
}

const Button = forwardRef(function Button(
  {
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    to,
    href,
    external = false,
    type = 'button',
    full = false,
    ...rest
  },
  ref,
) {
  const classes = [
    'btn',
    VARIANTS[variant] || VARIANTS.primary,
    SIZES[size] || '',
    full ? 'w-full' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  if (to) {
    return (
      <Link ref={ref} to={to} className={classes} {...rest}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a
        ref={ref}
        href={href}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...rest}
      >
        {children}
      </a>
    )
  }

  return (
    <button ref={ref} type={type} className={classes} {...rest}>
      {children}
    </button>
  )
})

export default Button
