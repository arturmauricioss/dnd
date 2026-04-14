export function converterParaPO({ pl = 0, po = 0, pp = 0, pc = 0 }) {
  return (
    (Number(pl) || 0) * 10 +
    (Number(po) || 0) +
    (Number(pp) || 0) * 0.1 +
    (Number(pc) || 0) * 0.01
  )
}

export function converterDePO(total) {
  let resto = Number(total) || 0

  const pl = Math.floor(resto / 10)
  resto -= pl * 10

  const po = Math.floor(resto)
  resto -= po

  const pp = Math.floor(resto * 10)
  resto -= pp / 10

  const pc = Math.round(resto * 100)

  return {
    pl: String(pl),
    po: String(po),
    pp: String(pp),
    pc: String(pc),
  }
}