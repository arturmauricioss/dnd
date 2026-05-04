export function getArmorPenalty(armor) {
  if (!armor) return 0
  const val = Number(armor.penalidade)
  return isNaN(val) ? 0 : Math.abs(val)
}

export function getShieldPenalty(shield) {
  if (!shield) return 0
  const val = Number(shield.penalidade)
  return isNaN(val) ? 0 : Math.abs(val)
}

export function getTotalArmorPenalty(armor, shield) {
  return getArmorPenalty(armor) + getShieldPenalty(shield)
}