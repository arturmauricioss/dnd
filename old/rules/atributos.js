export function calcularModificador(valor) {
  return Math.floor((valor - 10) / 2)
}

export function getValorBase(personagem, attrId) {
  return personagem.atributos?.[attrId] || 10
}

export function getTotalAtributo(valorBase, bonusRaca, attrId) {
  let total = valorBase + bonusRaca
  if (attrId === 'inteligencia' && total < 3) total = 3
  return total
}

export function formatModificador(mod) {
  return mod >= 0 ? `+${mod}` : `${mod}`
}