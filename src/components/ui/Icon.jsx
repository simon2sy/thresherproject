import {
  ArrowRight,
  Award,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleAlert,
  Cog,
  Fan,
  Fuel,
  Gauge,
  Info,
  Layers,
  Loader2,
  Mail,
  MapPin,
  Maximize2,
  Menu,
  Minimize2,
  Package,
  Pause,
  PhoneCall,
  Play,
  RotateCcw,
  Ruler,
  Scale,
  ShieldCheck,
  Sprout,
  Timer,
  Truck,
  Wheat,
  Wind,
  Wrench,
  X,
  Zap,
} from 'lucide-react'

/**
 * Icon registry.
 * ---------------------------------------------------------------------------
 * Data files (data/content.js) reference icons by name so they stay plain
 * JavaScript. Add the imported icon to this map when a new name is used.
 */
const icons = {
  arrowRight: ArrowRight,
  award: Award,
  check: Check,
  checkCircle: CheckCircle2,
  chevronDown: ChevronDown,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  alert: CircleAlert,
  cog: Cog,
  fan: Fan,
  fuel: Fuel,
  gauge: Gauge,
  info: Info,
  layers: Layers,
  loader: Loader2,
  mail: Mail,
  mapPin: MapPin,
  expand: Maximize2,
  menu: Menu,
  collapse: Minimize2,
  package: Package,
  pause: Pause,
  phone: PhoneCall,
  play: Play,
  reset: RotateCcw,
  ruler: Ruler,
  scale: Scale,
  shield: ShieldCheck,
  sprout: Sprout,
  timer: Timer,
  truck: Truck,
  wheat: Wheat,
  wind: Wind,
  wrench: Wrench,
  close: X,
  power: Zap,
}

/**
 * @param {object} props
 * @param {keyof typeof icons} props.name  registry name
 * @param {number} [props.size]            pixel size (defaults to 20)
 * @param {number} [props.strokeWidth]
 */
export default function Icon({ name, size = 20, strokeWidth = 1.75, className = '', ...rest }) {
  const Glyph = icons[name]
  if (!Glyph) return null
  return (
    <Glyph
      size={size}
      strokeWidth={strokeWidth}
      className={className}
      aria-hidden="true"
      focusable="false"
      {...rest}
    />
  )
}
