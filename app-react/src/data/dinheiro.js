// CONVERTE qualquer moeda para COBRE (inteiro)
export function converterParaCobre(money = {}) {
  return (
    (Number(money.pl) || 0) * 1000 +
    (Number(money.po) || 0) * 100 +
    (Number(money.pp) || 0) * 10 +
    (Number(money.pc) || 0)
  )
}

// CONVERTE para PO (apenas para exibição)
export function converterParaPO(money = {}) {
  return converterParaCobre(money) / 100
}

// opcional: quebrar cobre de volta
export function converterDePO(po = 0) {
  const totalCobre = Math.floor(po * 100)

  return {
    po: Math.floor(totalCobre / 100),
    pp: Math.floor((totalCobre % 100) / 10),
    pc: totalCobre % 10
  }
}