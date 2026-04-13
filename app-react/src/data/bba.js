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
  if (tipo === "bom") return nivel
  if (tipo === "medio") return Math.floor(nivel * 0.75)
  if (tipo === "ruim") return Math.floor(nivel * 0.5)
  return 0
}

export function getProgressaoBBA(classeId) {
  return bbaPorClasse[classeId] || "ruim"
}