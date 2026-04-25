export const PESO_MOEDA = 0.01 // 10g por moeda = 0.01kg

export function getPesoDinheiro(money = {}) {
  const totalMoedas = 
    (Number(money.po) || 0) + 
    (Number(money.pl) || 0) + 
    (Number(money.pp) || 0) + 
    (Number(money.pc) || 0)
  return totalMoedas * PESO_MOEDA
}

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