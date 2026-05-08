export interface Alinhamento {
  id: string
  nome: string
}

export const alinhamentos: Alinhamento[] = [
  { id: 'lawful_good', nome: 'LEAL BOM' },
  { id: 'neutral_good', nome: 'NEUTRAL BOM' },
  { id: 'chaotic_good', nome: 'CAÓTICO BOM' },
  { id: 'lawful_neutral', nome: 'LEAL NEUTRAL' },
  { id: 'true_neutral', nome: 'NEUTRAL VERDADEIRO' },
  { id: 'chaotic_neutral', nome: 'CAÓTICO NEUTRAL' },
  { id: 'lawful_evil', nome: 'LEAL MALIGNO' },
  { id: 'neutral_evil', nome: 'NEUTRAL MALIGNO' },
  { id: 'chaotic_evil', nome: 'CAÓTICO MALIGNO' }
]

export interface Divindade {
  nome: string
  id: string
  alinhamento: string
}

export const divindades: Divindade[] = [
  { nome: 'PELOR', id: 'pelor', alinhamento: 'neutral_good' },
  { nome: 'HEIRONEOUS', id: 'heironeous', alinhamento: 'lawful_good' },
  { nome: 'KORD', id: 'kord', alinhamento: 'chaotic_good' },
  { nome: 'EHLONNA', id: 'ehlonna', alinhamento: 'neutral_good' },
  { nome: 'YONDALLA', id: 'yondalla', alinhamento: 'lawful_good' },
  { nome: 'BOCCOB', id: 'boccob', alinhamento: 'true_neutral' },
  { nome: 'WEE JAS', id: 'wee_jas', alinhamento: 'lawful_neutral' },
  { nome: 'OBAD-HAI', id: 'obad_hai', alinhamento: 'true_neutral' },
  { nome: 'GARL GLITTERGOLD', id: 'garl', alinhamento: 'neutral_good' },
  { nome: 'FHARLANGHN', id: 'fharlanghn', alinhamento: 'neutral_good' },
  { nome: 'OLIDAMMARA', id: 'olidammara', alinhamento: 'chaotic_neutral' },
  { nome: 'VECNA', id: 'vecna', alinhamento: 'neutral_evil' },
  { nome: 'HEXTOR', id: 'hextor', alinhamento: 'lawful_evil' },
  { nome: 'ERYTHNUL', id: 'erythnul', alinhamento: 'chaotic_evil' },
  { nome: 'NERULL', id: 'nerull', alinhamento: 'neutral_evil' },
  { nome: 'ST. CUTHBERT', id: 'st_cuthbert', alinhamento: 'lawful_good' },
  { nome: 'CORELLON LARETHIAN', id: 'corellon', alinhamento: 'chaotic_good' },
  { nome: 'MORADIN', id: 'moradin', alinhamento: 'lawful_good' },
  { nome: 'GRUUMSH', id: 'gruumsh', alinhamento: 'chaotic_evil' }
]

export const deusesRaciais: Record<string, string[]> = {
  'anao': ['moradin'],
  'elfo': ['corellon', 'ehlonna'],
  'gnomo': ['garl', 'ehlonna'],
  'meio-elfo': ['corellon', 'ehlonna'],
  'meio-orc': ['gruumsh'],
  'halfling': ['yondalla', 'ehlonna']
}

export const deusesPorClasse: Record<string, string[]> = {
  'barbaro': ['kord', 'obad_hai', 'erythnul'],
  'bardo': ['pelor', 'fharlanghn', 'olidammara'],
  'druida': ['obad_hai'],
  'guerreiro': ['heironeous', 'kord', 'st_cuthbert', 'hextor', 'erythnul'],
  'ladino': ['olidammara', 'nerull', 'vecna', 'erythnul'],
  'mago': ['wee_jas', 'boccob', 'vecna'],
  'monge': ['heironeous', 'st_cuthbert', 'hextor'],
  'paladino': ['heironeous'],
  'ranger': ['ehlonna', 'obad_hai'],
  'feiticeiro': ['wee_jas', 'boccob', 'vecna']
}

export function getDivindadesPorAlinhamento(alinhamentoId: string): Divindade[] {
  return divindades.filter(d => d.alinhamento === alinhamentoId)
}

export function getPontuacaoDeus(deusId: string, racaId: string | null, tendenciaId: string | null, classeId: string | null): number {
  let pontos = 0
  
  // Ponto racial (1★ sempre)
  if (racaId && deusesRaciais[racaId]?.includes(deusId)) {
    pontos += 1
  }
  
  // Ponto de classe (1★)
  if (classeId && deusesPorClasse[classeId]?.includes(deusId)) {
    pontos += 1
  }
  
  // Ponto de tendência
  const deus = divindades.find(d => d.id === deusId)
  if (tendenciaId && deus) {
    const tendenciaEPermitida = tendenciaId === deus.alinhamento
    const tendenciaAdjacente = classeId === 'clerigo' && getTendenciasAdjacentes(tendenciaId).includes(deus.alinhamento)
    
    if (tendenciaEPermitida) {
      // Clérigo na tendência exata = 2★, outros = 1★
      pontos += classeId === 'clerigo' ? 2 : 1
    } else if (tendenciaAdjacente) {
      // Adjacente só para clérigo = 1★
      pontos += 1
    }
  }
  
  return pontos
}

// Tabuleiro 3x3 de tendências
// 1 2 3
// 4 5 6
// 7 8 9
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
  
  // Cima/baixo
  if (pos > 3) adjacentes.push(pos - 3) // cima
  if (pos < 7) adjacentes.push(pos + 3) // baixo
  
  // Esquerda/direita
  if (pos % 3 !== 1) adjacentes.push(pos - 1) // esquerda
  if (pos % 3 !== 0) adjacentes.push(pos + 1) // direita
  
  return adjacentes.map(p => tabuleiroTendencias[p])
}

export function getDivindadesOrdenadas(tendenciaId: string, racaId: string | null, classeId: string | null): Divindade[] {
  // Para clérigo, incluir deuses das tendências adjacentes
  let tendenciasPermitidas: string[] = [tendenciaId]
  if (classeId === 'clerigo') {
    tendenciasPermitidas = [tendenciaId, ...getTendenciasAdjacentes(tendenciaId)]
  }
  
  // Sempre incluir TODOS os deuses raciais independente da tendência
  let deusesRaciaisAdicionais: string[] = []
  if (racaId && deusesRaciais[racaId]) {
    deusesRaciaisAdicionais = deusesRaciais[racaId]
  }
  
  // Filtrar: tendências permitidas OU deuses raciais
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