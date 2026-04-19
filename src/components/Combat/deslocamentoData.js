import { deslocamentoPorRaca } from '../Racas/racasData'
import { bonusDeslocamentoPorClasse } from '../Classes/classesData'

export { deslocamentoPorRaca, bonusDeslocamentoPorClasse }

export function getDeslocamento(raca, classe) {
  const base = deslocamentoPorRaca[raca] || 6
  const bonus = bonusDeslocamentoPorClasse[classe] || 0
  return base + bonus
}