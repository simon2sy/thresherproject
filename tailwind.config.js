/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        /* Harvest soil blacks — warm, earthy base for header, hero, footer ---- */
        ink: '#161006',
        graphite: '#1E160B',
        slate_steel: '#2A2012',
        /* Deep soil — premium dark surface ------------------------------------ */
        forest: {
          900: '#120D06',
          800: '#1A130A',
          700: '#241A0E',
          600: '#322515',
        },
        /* Warm paper — sun-bleached grain sack ------------------------------- */
        paper: '#FFFEF9',
        /* Metals -------------------------------------------------------------- */
        metal: {
          100: '#F1EDE3',
          200: '#DED6C4',
          300: '#C2B498',
          400: '#9A8B6F',
          500: '#766851',
          600: '#574D3B',
          700: '#3A342A',
        },
        /* Harvest gold — ripe wheat. THE brand colour. ------------------------ */
        harvest: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#F7B733',
          500: '#E39410',
          600: '#B87308',
          700: '#945C0A',
          800: '#783F0B',
          900: '#5C3008',
        },
        /* Paddy green — living crop ------------------------------------------- */
        paddy: {
          50: '#F2F9E8',
          100: '#E0F1D0',
          200: '#C2E3A6',
          300: '#9BD071',
          400: '#6FB83F',
          500: '#4E9626',
          600: '#3A761D',
          700: '#2E5C19',
          800: '#284C19',
          900: '#233F19',
        },
        /* Fired clay — thresher paint, Terai brick ---------------------------- */
        clay: {
          50: '#FDF3EC',
          100: '#F9E2D2',
          200: '#F2C2A1',
          300: '#E99868',
          400: '#DD6F35',
          500: '#C4541D',
          600: '#A63F16',
          700: '#843314',
          800: '#6B2D17',
          900: '#572716',
        },
        /* Straw / chaff neutrals ---------------------------------------------- */
        straw: {
          50: '#FFFEF9',
          100: '#FAF5E6',
          200: '#F1E7CC',
          300: '#E3D2A8',
          400: '#D2B87E',
        },
        /* Aqua — kept as secondary (sky / water) so old utilities keep working */
        aqua: {
          50: '#ECFCFD',
          100: '#CFF7FA',
          200: '#A3EEF4',
          300: '#6FE0EB',
          400: '#34CBDB',
          500: '#14AFC2',
          600: '#0A8B9E',
          700: '#0B6E7D',
          800: '#0D5763',
          900: '#0F4953',
        },
        /* `agri` now points at paddy green — every agri-* utility re-tints to
           living-crop green automatically. */
        agri: {
          50: '#F2F9E8',
          100: '#E0F1D0',
          200: '#C2E3A6',
          300: '#9BD071',
          400: '#6FB83F',
          500: '#4E9626',
          600: '#3A761D',
          700: '#2E5C19',
          800: '#284C19',
          900: '#233F19',
        },
        /* Warm neutrals — straw paper -------------------------------------------- */
        sand: {
          50: '#FFFEF9',
          100: '#FAF5E6',
          200: '#F1E7CC',
          300: '#DED2B2',
        },
        /* Machinery accent — harvest gold --------------------------------------- */
        amber_acc: {
          300: '#FDE68A',
          400: '#F7B733',
          500: '#E39410',
          600: '#B87308',
        },
      },
      fontFamily: {
        display: ['Manrope', 'Inter', 'Noto Sans Devanagari', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'Noto Sans Devanagari', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'sans-serif'],
      },
      fontSize: {
        '2xs': ['0.6875rem', { lineHeight: '1rem' }],
      },
      letterSpacing: {
        technical: '0.14em',
      },
      maxWidth: {
        shell: '1240px',
      },
      boxShadow: {
        plate: '0 1px 0 0 rgba(255,255,255,0.08) inset, 0 12px 32px -18px rgba(0,0,0,0.6)',
        lift: '0 18px 48px -22px rgba(22,16,6,0.5)',
        /* Layered, softer card shadow — reads as a lifted surface, not a sticker */
        card: '0 1px 2px rgba(22,16,6,0.06), 0 10px 24px -14px rgba(22,16,6,0.22)',
        'lift-lg': '0 2px 4px rgba(22,16,6,0.05), 0 26px 52px -20px rgba(22,16,6,0.32)',
        /* Harvest rim-light used on hover to make cards feel sun-lit */
        glow: '0 0 0 1px rgba(227,148,16,0.28), 0 24px 48px -20px rgba(227,148,16,0.5)',
        'glow-amber': '0 0 0 1px rgba(247,183,51,0.3), 0 24px 48px -20px rgba(247,183,51,0.45)',
        'glow-aqua': '0 12px 36px -14px rgba(227,148,16,0.8)',
        'glow-harvest': '0 14px 40px -14px rgba(227,148,16,0.65)',
        'glow-paddy': '0 14px 40px -16px rgba(78,150,38,0.55)',
        'glow-ink': '0 14px 40px -16px rgba(22,16,6,0.65)',
      },
      backgroundImage: {
        'hatch':
          'repeating-linear-gradient(45deg, rgba(255,255,255,0.05) 0 2px, transparent 2px 8px)',
        'grid-tech':
          'linear-gradient(to right, rgba(22,16,6,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(22,16,6,0.07) 1px, transparent 1px)',
        /* Warm harvest wash used behind dark sections — sunset over wheat */
        aurora:
          'radial-gradient(46% 44% at 16% 20%, rgba(247,183,51,0.34) 0%, rgba(22,16,6,0) 62%), radial-gradient(44% 42% at 86% 66%, rgba(78,150,38,0.20) 0%, rgba(22,16,6,0) 60%), radial-gradient(36% 34% at 62% 96%, rgba(196,84,29,0.22) 0%, rgba(22,16,6,0) 58%)',
        /* Golden wash for the hero — ripe field at golden hour */
        'aurora-bright':
          'radial-gradient(50% 46% at 74% 30%, rgba(247,183,51,0.4) 0%, rgba(22,16,6,0) 62%), radial-gradient(46% 44% at 10% 88%, rgba(78,150,38,0.22) 0%, rgba(22,16,6,0) 64%)',
        /* Harvest → paddy → clay brand gradient, used on rails, headings, chips */
        'brand-gradient': 'linear-gradient(100deg, #FCD34D 0%, #E39410 42%, #4E9626 78%, #C4541D 100%)',
        'brand-gradient-ink': 'linear-gradient(100deg, #161006 0%, #B87308 48%, #3A761D 82%, #A63F16 100%)',
        /* Specular streak for the button/card shine sweep */
        sheen:
          'linear-gradient(105deg, transparent 32%, rgba(255,255,255,0.38) 48%, rgba(255,255,255,0.08) 56%, transparent 72%)',
        /* Top rim-light for dark surfaces */
        'rim-light':
          'linear-gradient(to bottom, rgba(255,255,255,0.10), rgba(255,255,255,0) 60%)',

        /**
         * Harvest mesh — the site signature background.
         * Ripe-gold sun + paddy-green field + clay ember, drifting independently.
         */
        'aurora-mesh':
          'radial-gradient(38% 44% at 18% 24%, rgba(247,183,51,0.32) 0%, rgba(22,16,6,0) 60%), radial-gradient(34% 40% at 82% 20%, rgba(78,150,38,0.26) 0%, rgba(22,16,6,0) 62%), radial-gradient(40% 46% at 68% 86%, rgba(196,84,29,0.24) 0%, rgba(22,16,6,0) 60%), radial-gradient(46% 40% at 30% 74%, rgba(252,211,77,0.20) 0%, rgba(22,16,6,0) 64%)',
        /* Warm sun in one corner of a section */
        'glow-corner':
          'radial-gradient(60% 60% at 88% 12%, rgba(247,183,51,0.24) 0%, rgba(22,16,6,0) 65%)',
        /* Chaff drift — fine diagonal grain stalks */
        'chaff-lines':
          'repeating-linear-gradient(115deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 1.5px, transparent 1.5px, transparent 26px)',
        /* Sun rows — tilled-field furrows for light panels */
        'furrows':
          'repeating-linear-gradient(90deg, rgba(22,16,6,0.045) 0 2px, transparent 2px 26px)',
        /* Wheat stalk silhouette tile (SVG) for hero / CTA edges */
        'wheat':
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Cg fill='none' stroke='%23B87308' stroke-opacity='0.20' stroke-width='1.4'%3E%3Cpath d='M60 112 V44'/%3E%3Cpath d='M60 88 C48 84 42 74 42 62 C54 66 60 76 60 88 Z'/%3E%3Cpath d='M60 88 C72 84 78 74 78 62 C66 66 60 76 60 88 Z'/%3E%3Cpath d='M60 66 C50 62 45 54 45 44 C55 48 60 56 60 66 Z'/%3E%3Cpath d='M60 66 C70 62 75 54 75 44 C65 48 60 56 60 66 Z'/%3E%3C/g%3E%3C/svg%3E\")",
        /* Film grain — a 160px SVG-noise tile, keeps large flat gradients from
           banding on 8-bit displays and adds a tactile, printed quality. */
        grain:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='0.42'/%3E%3C/svg%3E\")",
      },
      keyframes: {
        'ticker-slide': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        /* Slow ambient drift behind dark sections. Long + linear so it never
           reads as "an animation" — just a living background. */
        'aurora-drift': {
          '0%, 100%': { transform: 'translate3d(0,0,0) scale(1)' },
          '50%': { transform: 'translate3d(2.5%, -2%, 0) scale(1.08)' },
        },
        'float-soft': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.9)', opacity: '0.7' },
          '70%': { transform: 'scale(1.5)', opacity: '0' },
          '100%': { transform: 'scale(1.5)', opacity: '0' },
        },
        /**
         * Brand gradient that travels.
         *
         * PERFORMANCE: this originally animated `background-position`, which is a
         * PAINT-only property — the browser had to re-rasterise the gradient on
         * every frame, and because it was on the *fixed* navbar that repaint ran
         * on every scroll frame. Rewritten to animate a `translate` on an
         * oversized inner element instead, which the compositor handles on the
         * GPU with no repaint at all. Requires `overflow: hidden` on the parent
         * (see `.brand-bar` in index.css).
         */
        'gradient-pan': {
          '0%': { transform: 'translate3d(0,0,0)' },
          '100%': { transform: 'translate3d(-50%,0,0)' },
        },
        /**
         * Slow hue drift on the section accent rails.
         * PERFORMANCE: `filter: hue-rotate` forced a full repaint of the rail
         * each frame. Replaced with a gentle scale/translate "breathe" that
         * looks almost identical on a 6px-wide gradient bar and is free.
         */
        'hue-drift': {
          '0%, 100%': { transform: 'translate3d(0,0,0) scaleY(1)' },
          '50%': { transform: 'translate3d(0,0,0) scaleY(1.08)' },
        },
        /* Expanding ring used behind "live"/status dots */
        'ring-out': {
          '0%': { transform: 'scale(0.8)', opacity: '0.65' },
          '100%': { transform: 'scale(2.6)', opacity: '0' },
        },
        /* Gentle bob used on floating stat chips */
        'bob': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        /* Sweeping shine for the accent rail */
        'rail-sweep': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(200%)' },
        },
        /**
         * Aurora mesh drift. A long, irregular keyframe set: the two colour
         * fields travel on different paths at different speeds so the pattern
         * does not visibly loop. `transform` only — no repaint.
         */
        'aurora-mesh': {
          '0%, 100%': { transform: 'translate3d(0,0,0) scale(1)' },
          '25%': { transform: 'translate3d(3%, -2.5%, 0) scale(1.06)' },
          '50%': { transform: 'translate3d(-2%, 2%, 0) scale(1.03)' },
          '75%': { transform: 'translate3d(2%, 2.5%, 0) scale(1.08)' },
        },
        /* Second mesh layer, offset phase, for depth */
        'aurora-mesh-alt': {
          '0%, 100%': { transform: 'translate3d(0,0,0) scale(1.04)' },
          '33%': { transform: 'translate3d(-3%, 2%, 0) scale(1)' },
          '66%': { transform: 'translate3d(2.5%, -2%, 0) scale(1.09)' },
        },
        /* Rotating conic sweep — very slow, reads as a light turning */
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        /* Drifting diagonal streaks, like light through a moving filter */
        'streak-drift': {
          '0%': { transform: 'translate3d(-10%,0,0)' },
          '100%': { transform: 'translate3d(10%,0,0)' },
        },
      },
      animation: {
        'ticker-slide': 'ticker-slide 32s linear infinite',
        'aurora-drift': 'aurora-drift 24s ease-in-out infinite',
        'float-soft': 'float-soft 7s ease-in-out infinite',
        'pulse-ring': 'pulse-ring 2.6s cubic-bezier(0.22, 0.61, 0.36, 1) infinite',
        'gradient-pan': 'gradient-pan 3.5s linear infinite',
        'hue-drift': 'hue-drift 12s ease-in-out infinite',
        'ring-out': 'ring-out 2.4s cubic-bezier(0.22, 0.61, 0.36, 1) infinite',
        bob: 'bob 6s ease-in-out infinite',
        'rail-sweep': 'rail-sweep 5s ease-in-out infinite',
        'aurora-mesh': 'aurora-mesh 26s ease-in-out infinite',
        'aurora-mesh-alt': 'aurora-mesh-alt 34s ease-in-out infinite',
        'spin-slow': 'spin-slow 90s linear infinite',
        'streak-drift': 'streak-drift 22s ease-in-out infinite alternate',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
      },
    },
  },
  plugins: [],
}
