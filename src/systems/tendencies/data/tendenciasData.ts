import type { Alinhamento, Divindade } from '../types'

export type { Alinhamento, Divindade }

export const alinhamentos: Alinhamento[] = [
  { id: 'lawful_good', nome: 'LEAL BOM', eixo: 'ordem' },
  { id: 'neutral_good', nome: 'NEUTRAL BOM', eixo: 'neutro' },
  { id: 'chaotic_good', nome: 'CAÓTICO BOM', eixo: 'caos' },
  { id: 'lawful_neutral', nome: 'LEAL NEUTRAL', eixo: 'ordem' },
  { id: 'true_neutral', nome: 'NEUTRAL VERDADEIRO', eixo: 'neutro' },
  { id: 'chaotic_neutral', nome: 'CAÓTICO NEUTRAL', eixo: 'caos' },
  { id: 'lawful_evil', nome: 'LEAL MALIGNO', eixo: 'ordem' },
  { id: 'neutral_evil', nome: 'NEUTRAL MALIGNO', eixo: 'neutro' },
  { id: 'chaotic_evil', nome: 'CAÓTICO MALIGNO', eixo: 'caos' }
]

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