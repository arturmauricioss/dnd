import { deslocamentoPorRaca } from '../Racas/racasData'

export { deslocamentoPorRaca }

export const bonusDeslocamentoPorClasse = {
  barbaro: 3
}

export function getDeslocamento(raca, classe) {
  const base = deslocamentoPorRaca[raca] || 6
  const bonus = bonusDeslocamentoPorClasse[classe] || 0
  return base + bonus
}