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
  /** Harvest-clay red paint (like the red threshers in the gallery) + paddy green. */
  paint: '#A63F16',
  paintDeep: '#843314',
  paintGreen: '#3A761D',
  /** Dark machine frame / sheet-metal parts — warm soil steel. */
  paintCharcoal: '#2A2012',
  sheet: '#3A2E1A',
  /** Metals. */
  steel: '#C9BFA8',
  steelDark: '#6B5F46',
  castIron: '#3D342A',
  /** Rubber: tyres and the v-belt. */
  rubber: '#1A130A',
  belt: '#241A0E',
  /** Small machinery accents — harvest gold. */
  amber: '#F7B733',
  grain: '#FCD34D',
}

export const MAT = {
  paintGreen: { color: COLORS.paint, metalness: 0.3, roughness: 0.48 },
  paintGreenDark: { color: COLORS.paintDeep, metalness: 0.3, roughness: 0.52 },
  paintPaddy: { color: COLORS.paintGreen, metalness: 0.28, roughness: 0.52 },
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
