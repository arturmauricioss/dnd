import { tendenciasPermitidasPorClasse } from '@data/dnd/tendenciasClassesData'
import { divindades, deusesRaciais, deusesPorClasse, Divindade } from '@data/dnd/tendenciasData'

export function tendenciaPermitida(classeId: string, tendenciaId: string): boolean {
  const permitidas = tendenciasPermitidasPorClasse[classeId]
  if (!permitidas) return true

  if (permitidas.includes('non_lawful')) {
    return !tendenciaId.startsWith('lawful')
  }
  
  return permitidas.includes(tendenciaId)
}

export function getDivindadesPorAlinhamento(alinhamentoId: string): Divindade[] {
  return divindades.filter(d => d.alinhamento === alinhamentoId)
}

export function getPontuacaoDeus(deusId: string, racaId: string | null, tendenciaId: string | null, classeId: string | null): number {
  let pontos = 0
  
  if (racaId && deusesRaciais[racaId]?.includes(deusId)) {
    pontos += 1
  }
  
  if (classeId && deusesPorClasse[classeId]?.includes(deusId)) {
    pontos += 1
  }
  
  const deus = divindades.find(d => d.id === deusId)
  if (tendenciaId && deus) {
    const tendenciaEPermitida = tendenciaId === deus.alinhamento
    const tendenciaAdjacente = classeId === 'clerigo' && getTendenciasAdjacentes(tendenciaId).includes(deus.alinhamento)
    
    if (tendenciaEPermitida) {
      pontos += classeId === 'clerigo' ? 2 : 1
    } else if (tendenciaAdjacente) {
      pontos += 1
    }
  }
  
  return pontos
}

const tabuleiroTendencias: Record<number, string> = {
  1: 'lawful_good',
  2: 'lawful_neutral',
  3: 'lawful_evil',
  4: 'neutral_good',
  5: 'true_neutral',
  6: 'neutral_evil',
  7: 'chaotic_good',
  8: 'chaotic_neutral',
  9: 'chaotic_evil'
}

export function getTendenciasAdjacentes(tendenciaId: string): string[] {
  const posicao = Object.entries(tabuleiroTendencias).find(([, v]) => v === tendenciaId)
  if (!posicao) return []
  
  const pos = parseInt(posicao[0])
  const adjacentes: number[] = []
  
  if (pos > 3) adjacentes.push(pos - 3)
  if (pos < 7) adjacentes.push(pos + 3)
  if (pos % 3 !== 1) adjacentes.push(pos - 1)
  if (pos % 3 !== 0) adjacentes.push(pos + 1)
  
  return adjacentes.map(p => tabuleiroTendencias[p])
}

export function getDivindadesOrdenadas(tendenciaId: string, racaId: string | null, classeId: string | null): Divindade[] {
  let tendenciasPermitidas: string[] = [tendenciaId]
  if (classeId === 'clerigo') {
    tendenciasPermitidas = [tendenciaId, ...getTendenciasAdjacentes(tendenciaId)]
  }
  
  let deusesRaciaisAdicionais: string[] = []
  if (racaId && deusesRaciais[racaId]) {
    deusesRaciaisAdicionais = deusesRaciais[racaId]
  }
  
  const filtradas = divindades.filter(d => 
    tendenciasPermitidas.includes(d.alinhamento) || 
    deusesRaciaisAdicionais.includes(d.id)
  )
  
  return filtradas
    .map(d => ({
      ...d,
      pontos: getPontuacaoDeus(d.id, racaId, tendenciaId, classeId)
    }))
    .sort((a, b) => b.pontos - a.pontos)
}