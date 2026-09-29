/**
 * ---------------------------------------------------------------------------
 * MACHINE MATERIALS
 * ---------------------------------------------------------------------------
 * Shared material presets for the thresher model. Kept as plain prop objects
 * so they can be spread onto <meshStandardMaterial> — each mesh then owns its
 * own material instance, which lets the technical view highlight a single
 * sub-assembly by changing only that assembly's emissive values.
 */

export const COLORS = {
  /** Agricultural green paint used on the body panels and hopper. */
  paint: '#2E6B3F',
  paintDeep: '#23512F',
  /** Dark machine frame / sheet-metal parts. */
  paintCharcoal: '#23272A',
  sheet: '#2B3033',
  /** Metals. */
  steel: '#A9AFB5',
  steelDark: '#5B6167',
  castIron: '#3D4246',
  /** Rubber: tyres and the v-belt. */
  rubber: '#16181A',
  belt: '#1B1D20',
  /** Small machinery accents — kept deliberately limited. */
  amber: '#E5A72B',
  grain: '#D9A93F',
}

export const MAT = {
  paintGreen: { color: COLORS.paint, metalness: 0.28, roughness: 0.52 },
  paintGreenDark: { color: COLORS.paintDeep, metalness: 0.28, roughness: 0.55 },
  paintCharcoal: { color: COLORS.paintCharcoal, metalness: 0.35, roughness: 0.5 },
  sheet: { color: COLORS.sheet, metalness: 0.45, roughness: 0.45 },
  sheetGreen: { color: COLORS.paint, metalness: 0.3, roughness: 0.48 },
  steel: { color: COLORS.steel, metalness: 0.85, roughness: 0.35 },
  steelDark: { color: COLORS.steelDark, metalness: 0.8, roughness: 0.45 },
  castIron: { color: COLORS.castIron, metalness: 0.6, roughness: 0.62 },
  rubber: { color: COLORS.rubber, metalness: 0.04, roughness: 0.92 },
  belt: { color: COLORS.belt, metalness: 0.1, roughness: 0.82 },
  amber: { color: COLORS.amber, metalness: 0.3, roughness: 0.42 },
  grain: { color: COLORS.grain, metalness: 0.05, roughness: 0.6 },
}

export default MAT
