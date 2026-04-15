export const deslocamentoPorRaca = {
  humano: 9,
  elfo: 9,
  "meio-elfo": 9,
  "meio-orc": 9,
  anao: 6,
  gnomo: 6,
  halfling: 6
}

export const bonusDeslocamentoPorClasse = {
  barbaro: 3
}

export function getDeslocamento(raca, classe) {
  const base = deslocamentoPorRaca[raca] || 6
  const bonus = bonusDeslocamentoPorClasse[classe] || 0
  return base + bonus
}