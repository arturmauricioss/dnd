import { modificadoresRaciais } from '@systems/races/data/racasData'
import type { Modificador } from '@systems/attributes/types'

export function getImagemPath(racaId: string, genero: 'm' | 'f', numero: number): string {
  const raca = racaId
  const caminho = `/racas/${raca}_${genero}${numero.toString().padStart(2, '0')}.png`
  return caminho
}

export function getModificadoresRaciais(racaId: string | null): Modificador[] {
  if (!racaId || !modificadoresRaciais[racaId]) return []
  
  const modificadoresRaca = modificadoresRaciais[racaId]
  const modificadores: Modificador[] = []
  
  for (const [atributo, valor] of Object.entries(modificadoresRaca)) {
    modificadores.push({
      atributo: atributo as keyof typeof modificadoresRaca,
      valor,
      origem: 'raca'
    })
  }
  
  return modificadores
}