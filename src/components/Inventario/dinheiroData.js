export function converterParaCobre(money = {}) {
  return (
    (Number(money.pl) || 0) * 1000 +
    (Number(money.po) || 0) * 100 +
    (Number(money.pp) || 0) * 10 +
    (Number(money.pc) || 0)
  )
}

export function converterParaPO(money = {}) {
  return converterParaCobre(money) / 100
}

export function converterDePO(po = 0) {
  const totalCobre = Math.floor(po * 100)

  return {
    po: Math.floor(totalCobre / 100),
    pp: Math.floor((totalCobre % 100) / 10),
    pc: totalCobre % 10
  }
}