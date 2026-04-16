import { getDeusesPorAlinhamento } from './divindades'
import { podeSelecionarAlinhamento as podeSelecionarAlinhamentoOriginal } from './restricoesClasse'
import { bonusRacialAtributos, bonusRacialResistencia } from './bonusRaciais'

export { getDeusesPorAlinhamento }

export const racas = [
  { id: 'selecione', nome: 'SELECIONE...', bonus: {} },
  { id: 'humano', nome: 'HUMANO' },
  { id: 'elfo', nome: 'ELFO' },
  { id: 'anao', nome: 'ANÃO' },
  { id: 'gnomo', nome: 'GNOMO' },
  { id: 'meio-elfo', nome: 'MEIO-ELFO' },
  { id: 'meio-orc', nome: 'MEIO-ORC' },
  { id: 'halfling', nome: 'HALFLING' },
]

export const classes = [
  { id: 'selecione', nome: 'SELECIONE...' },
  { id: 'barbaro', nome: 'BÁRBARO', dadoVida: 12, fort: 2, ref: 0, von: 0, bba: 1 },
  { id: 'bardo', nome: 'BARDO', dadoVida: 6, fort: 0, ref: 2, von: 2, bba: 0.75 },
  { id: 'clerigo', nome: 'CLÉRIGO', dadoVida: 8, fort: 2, ref: 0, von: 2, bba: 0.75 },
  { id: 'druida', nome: 'DRUIDA', dadoVida: 8, fort: 2, ref: 0, von: 2, bba: 0.75 },
  { id: 'feiticeiro', nome: 'FEITICEIRO', dadoVida: 4, fort: 0, ref: 0, von: 2, bba: 0.5 },
  { id: 'guerreiro', nome: 'GUERREIRO', dadoVida: 10, fort: 2, ref: 0, von: 0, bba: 1 },
  { id: 'ladino', nome: 'LADINO', dadoVida: 6, fort: 0, ref: 2, von: 0, bba: 0.75 },
  { id: 'mago', nome: 'MAGO', dadoVida: 4, fort: 0, ref: 0, von: 2, bba: 0.5 },
  { id: 'monge', nome: 'MONGE', dadoVida: 8, fort: 2, ref: 2, von: 2, bba: 0.75 },
  { id: 'paladino', nome: 'PALADINO', dadoVida: 10, fort: 2, ref: 0, von: 2, bba: 1 },
  { id: 'ranger', nome: 'RANGER', dadoVida: 8, fort: 2, ref: 2, von: 0, bba: 0.75 },
]

export const alinhamentos = [
  { id: 'selecione', nome: 'SELECIONE...', deity: null },
  { id: 'lawful_good', nome: 'LEAL BOM', deity: ['lawful'] },
  { id: 'neutral_good', nome: 'NEUTRAL BOM', deity: ['good', 'neutral'] },
  { id: 'chaotic_good', nome: 'CAÓTICO BOM', deity: ['chaotic'] },
  { id: 'lawful_neutral', nome: 'LEAL NEUTRAL', deity: ['lawful'] },
  { id: 'true_neutral', nome: 'NEUTRAL VERDADEIRO', deity: ['neutral', 'good', 'evil'] },
  { id: 'chaotic_neutral', nome: 'CAÓTICO NEUTRAL', deity: ['chaotic', 'neutral'] },
  { id: 'lawful_evil', nome: 'LEAL MALIGNO', deity: ['lawful'] },
  { id: 'neutral_evil', nome: 'NEUTRAL MALIGNO', deity: ['evil', 'neutral'] },
  { id: 'chaotic_evil', nome: 'CAÓTICO MALIGNO', deity: ['chaotic'] },
]

export const sexos = [
  { id: 'selecione', nome: 'SELECIONE...' },
  { id: 'masculino', nome: 'MASCULINO' },
  { id: 'feminino', nome: 'FEMININO' },
]

export const atributos = [
  { id: 'forca', nome: 'FORÇA' },
  { id: 'destreza', nome: 'DESTREZA' },
  { id: 'constituicao', nome: 'CONSTITUIÇÃO' },
  { id: 'inteligencia', nome: 'INTELIGÊNCIA' },
  { id: 'sabedoria', nome: 'SABEDORIA' },
  { id: 'carisma', nome: 'CARISMA' },
]

export const atributosFormatados = {
  forca: 'Força',
  destreza: 'Destreza',
  constituicao: 'Constituição',
  inteligencia: 'Inteligência',
  sabedoria: 'Sabedoria',
  carisma: 'Carisma',
}

export const niveis = Array.from({ length: 21 }, (_, i) => i)

export function getRaca(id) {
  return racas.find(r => r.id === id) || racas[0]
}

export function getClasse(id) {
  return classes.find(c => c.id === id) || classes[0]
}

export function getAlinhamento(id) {
  return alinhamentos.find(a => a.id === id) || alinhamentos[0]
}

export function getBonusRacial(racaId) {
  return bonusRacialAtributos[racaId] || {}
}

export function getBonusSaveRacial(racaId) {
  return bonusRacialResistencia[racaId] || { fort: 0, ref: 0, von: 0 }
}

export function podeSelecionarAlinhamento(classeId, alinhamentoId) {
  return podeSelecionarAlinhamentoOriginal(classeId, alinhamentoId)
}

export function calcularModificador(valor) {
  return Math.floor((valor - 10) / 2)
}

export function calcularBBA(nivel, classeId) {
  const classe = getClasse(classeId)
  if (!classe || !classe.bba) return 0
  return Math.floor(classe.bba * nivel)
}

export function calcularHP(dadoVida, nivel, constituicaoMod) {
  const hpBase = dadoVida
  return hpBase + (constituicaoMod * nivel)
}

export function calcularSaveBase(classeId, tipo) {
  const classe = getClasse(classeId)
  if (!classe) return 0
  const saves = { fort: classe.fort, ref: classe.ref, von: classe.von }
  return saves[tipo] || 0
}