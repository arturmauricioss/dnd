export { bonusRacialResistencia } from '../Racas/racasData'

export const bbaPorClasse = {
  barbaro: "bom",
  guerreiro: "bom",
  paladino: "bom",
  ranger: "bom",
  monge: "medio",
  clerigo: "medio",
  druida: "medio",
  ladino: "medio",
  bardo: "medio",
  mago: "ruim",
  feiticeiro: "ruim"
}

export function getBBABase(tipo, nivel) {
  let base = 0
  if (tipo === "bom") base = nivel
  else if (tipo === "medio") base = Math.floor(nivel * 0.75)
  else if (tipo === "ruim") base = Math.floor(nivel * 0.5)
  
  return base
}

export function getBBATamanho(tamanho = 'media') {
  return tamanho === 'pequena' ? 1 : 0
}

export function getProgressaoBBA(classeId) {
  return bbaPorClasse[classeId] || "ruim"
}