/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        /* Deep teal-blacks — base surfaces for the header, hero and footer --- */
        ink: '#050E12',
        graphite: '#0A181E',
        slate_steel: '#0F222A',
        /* Deep teal — premium dark surface for the header and hero ------------ */
        forest: {
          900: '#040D11',
          800: '#07161B',
          700: '#0A1E25',
          600: '#0E2A33',
        },
        /* Warm off-white card surface (matches --paper in index.css) ----------- */
        paper: '#FBFDFD',
        /* Metals -------------------------------------------------------------- */
        metal: {
          100: '#EFF4F5',
          200: '#DBE4E6',
          300: '#C2CFD2',
          400: '#9BA9AD',
          500: '#788689',
          600: '#576467',
          700: '#3A4548',
        },
        /* Aqua — the primary brand accent. Reads as water + crop together. ---- */
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
        /* Kept as an alias of aqua so existing `agri-*` utilities (hero rails,
           icon chips, checkmarks) re-tint automatically with the new palette. */
        agri: {
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
        /* Warm neutrals — 50 doubles as the crisp section background -------- */
        sand: {
          50: '#FFFFFF',
          100: '#F6F4EE',
          200: '#EBE7DC',
          300: '#D8D2C2',
        },
        /* Machinery accent — warm amber keeps the industrial note ------------- */
        amber_acc: {
          300: '#FFD98A',
          400: '#F7B733',
          500: '#E39410',
          600: '#B87308',
        },
      },
      fontFamily: {
        display: ['Manrope', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'sans-serif'],
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
        plate: '0 1px 0 0 rgba(255,255,255,0.06) inset, 0 12px 32px -18px rgba(0,0,0,0.55)',
        lift: '0 18px 48px -22px rgba(5,14,18,0.45)',
        /* Layered, softer card shadow — reads as a lifted surface, not a sticker */
        card: '0 1px 2px rgba(5,14,18,0.04), 0 8px 20px -12px rgba(5,14,18,0.16)',
        'lift-lg': '0 2px 4px rgba(5,14,18,0.04), 0 24px 48px -20px rgba(5,14,18,0.28)',
        /* Aqua rim-light used on hover to make cards feel lit */
        glow: '0 0 0 1px rgba(20,175,194,0.22), 0 22px 46px -20px rgba(20,175,194,0.45)',
        'glow-amber': '0 0 0 1px rgba(247,183,51,0.24), 0 22px 46px -20px rgba(247,183,51,0.38)',
        'glow-aqua': '0 10px 34px -14px rgba(20,175,194,0.75)',
        'glow-ink': '0 14px 40px -16px rgba(5,14,18,0.6)',
      },
      backgroundImage: {
        'hatch':
          'repeating-linear-gradient(45deg, rgba(255,255,255,0.05) 0 2px, transparent 2px 8px)',
        'grid-tech':
          'linear-gradient(to right, rgba(5,14,18,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(5,14,18,0.06) 1px, transparent 1px)',
        /* Drifting colour wash used behind dark sections */
        aurora:
          'radial-gradient(46% 44% at 16% 20%, rgba(20,175,194,0.40) 0%, rgba(5,14,18,0) 62%), radial-gradient(44% 42% at 86% 66%, rgba(52,203,219,0.22) 0%, rgba(5,14,18,0) 60%), radial-gradient(36% 34% at 62% 96%, rgba(247,183,51,0.14) 0%, rgba(5,14,18,0) 58%)',
        /* Brighter aqua wash for the hero — the signature of the new palette */
        'aurora-bright':
          'radial-gradient(50% 46% at 74% 34%, rgba(52,203,219,0.38) 0%, rgba(5,14,18,0) 62%), radial-gradient(46% 44% at 10% 88%, rgba(20,175,194,0.26) 0%, rgba(5,14,18,0) 64%)',
        /* Aqua → amber brand gradient, used on rails, headings and chips */
        'brand-gradient': 'linear-gradient(100deg, #6FE0EB 0%, #14AFC2 45%, #F7B733 100%)',
        'brand-gradient-ink': 'linear-gradient(100deg, #0A1E25 0%, #0A8B9E 52%, #B87308 100%)',
        /* Specular streak for the button/card shine sweep */
        sheen:
          'linear-gradient(105deg, transparent 32%, rgba(255,255,255,0.38) 48%, rgba(255,255,255,0.08) 56%, transparent 72%)',
        /* Top rim-light for dark surfaces */
        'rim-light':
          'linear-gradient(to bottom, rgba(255,255,255,0.10), rgba(255,255,255,0) 60%)',

        /**
         * Aurora mesh — the site signature background.
         * Three offset colour fields (aqua, cyan, amber) plus a conic sweep.
         * Each layer is animated independently by `animate-aurora-mesh`, so the
         * whole composition never repeats visibly.
         */
        'aurora-mesh':
          'radial-gradient(38% 44% at 18% 24%, rgba(52,203,219,0.34) 0%, rgba(5,14,18,0) 60%), radial-gradient(34% 40% at 82% 20%, rgba(20,175,194,0.30) 0%, rgba(5,14,18,0) 62%), radial-gradient(40% 46% at 68% 86%, rgba(247,183,51,0.16) 0%, rgba(5,14,18,0) 60%), radial-gradient(46% 40% at 30% 74%, rgba(111,224,235,0.18) 0%, rgba(5,14,18,0) 64%)',
        /* A single soft light source, used to lift one corner of a section */
        'glow-corner':
          'radial-gradient(60% 60% at 88% 12%, rgba(52,203,219,0.22) 0%, rgba(5,14,18,0) 65%)',
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
