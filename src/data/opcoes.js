import { getDeusesPorAlinhamento } from './divindades'
import { podeSelecionarAlinhamento as podeSelecionarAlinhamentoOriginal } from './restricoesClasse'
import { bonusRacialAtributos, bonusRacialResistencia } from './bonusRaciais'

export { getDeusesPorAlinhamento }

/* =========================
   RAÇAS
========================= */
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

/* =========================
   CLASSES
========================= */
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

/* =========================
   ALINHAMENTOS
========================= */
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

/* =========================
   SEXO
========================= */
export const sexos = [
  { id: 'selecione', nome: 'SELECIONE...' },
  { id: 'masculino', nome: 'MASCULINO' },
  { id: 'feminino', nome: 'FEMININO' },
]

/* =========================
   ATRIBUTOS (NOVO PADRÃO)
========================= */
export const atributos = [
  { id: 'forca', nome: 'FORÇA', curto: 'FOR' },
  { id: 'destreza', nome: 'DESTREZA', curto: 'DES' },
  { id: 'constituicao', nome: 'CONSTITUIÇÃO', curto: 'CON' },
  { id: 'inteligencia', nome: 'INTELIGÊNCIA', curto: 'INT' },
  { id: 'sabedoria', nome: 'SABEDORIA', curto: 'SAB' },
  { id: 'carisma', nome: 'CARISMA', curto: 'CAR' },
]

export const atributosFormatados = {
  forca: 'Força',
  destreza: 'Destreza',
  constituicao: 'Constituição',
  inteligencia: 'Inteligência',
  sabedoria: 'Sabedoria',
  carisma: 'Carisma',
}

/* =========================
   NÍVEIS
========================= */
export const niveis = Array.from({ length: 21 }, (_, i) => i)

/* =========================
   GETTERS
========================= */
export function getRaca(id) {
  return racas.find(r => r.id === id) || racas[0]
}

export function getClasse(id) {
  return classes.find(c => c.id === id) || classes[0]
}

export function getAlinhamento(id) {
  return alinhamentos.find(a => a.id === id) || alinhamentos[0]
}

/* =========================
   BÔNUS RACIAIS
========================= */
export function getBonusRacial(racaId) {
  return bonusRacialAtributos[racaId] || {}
}

export function getBonusSaveRacial(racaId) {
  return bonusRacialResistencia[racaId] || { fort: 0, ref: 0, von: 0 }
}

/* =========================
   REGRAS
========================= */
export function podeSelecionarAlinhamento(classeId, alinhamentoId) {
  return podeSelecionarAlinhamentoOriginal(classeId, alinhamentoId)
}

/* =========================
   CÁLCULOS
========================= */
export function calcularModificador(valor) {
  return Math.floor((valor - 10) / 2)
}

export function calcularBBA(nivel, classeId) {
  const classe = getClasse(classeId)
  if (!classe || !classe.bba) return 0
  return Math.floor(classe.bba * nivel)
}

export function calcularHP(dadoVida, nivel, constituicaoMod) {
  return dadoVida + (constituicaoMod * nivel)
}

export function calcularSaveBase(classeId, tipo) {
  const classe = getClasse(classeId)
  if (!classe) return 0

  const saves = {
    fort: classe.fort,
    ref: classe.ref,
    von: classe.von,
  }

  return saves[tipo] || 0
}