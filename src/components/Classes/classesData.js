export const classes = [
  { id: 'selecione', nome: 'SELECIONE...' },
  { id: 'barbaro', nome: 'BÁRBARO', dadoVida: 12, fort: 2, ref: 0, von: 0, bba: 1, alfabetizacao: true },
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

export const niveis = Array.from({ length: 21 }, (_, i) => i + 1)

export const dinheiroInicialClasse = {
  barbaro: { po: 100, pl: 0, pp: 0, pc: 0 },
  bardo: { po: 100, pl: 0, pp: 0, pc: 0 },
  clerigo: { po: 125, pl: 0, pp: 0, pc: 0 },
  druida: { po: 50, pl: 0, pp: 0, pc: 0 },
  feiticeiro: { po: 75, pl: 0, pp: 0, pc: 0 },
  guerreiro: { po: 150, pl: 0, pp: 0, pc: 0 },
  ladino: { po: 125, pl: 0, pp: 0, pc: 0 },
  mago: { po: 75, pl: 0, pp: 0, pc: 0 },
  monge: { po: 12, pl: 0, pp: 5, pc: 0 },
  paladino: { po: 150, pl: 0, pp: 0, pc: 0 },
  ranger: { po: 150, pl: 0, pp: 0, pc: 0 }
}

export const bonusDeslocamentoPorClasse = {
  barbaro: 3
}

export const alinhamentosPorClasse = {
  paladino: ["lawful_good"],
  monge: ["lawful_good", "lawful_neutral", "lawful_evil"],
  barbaro: ["non_lawful"],
  bardo: ["non_lawful"],
  druida: ["true_neutral", "neutral_good", "neutral_evil", "lawful_neutral", "chaotic_neutral"]
}

export const deusesPorClasse = {
  barbaro: ['kord', 'obad_hai', 'erythnul'],
  bardo: ['pelor', 'fharlanghn', 'olidammara'],
  clerigo: [],
  druida: ['obad_hai'],
  guerreiro: ['heironeous', 'kord', 'st_cuthbert', 'hextor', 'erythnul'],
  ladino: ['olidammara', 'nerull', 'vecna', 'erythnul'],
  mago: ['wee_jas', 'boccob', 'vecna'],
  monge: ['heironeous', 'st_cuthbert', 'hextor'],
  paladino: ['heironeous'],
  ranger: ['ehlonna', 'obad_hai'],
  feiticeiro: ['wee_jas', 'boccob', 'vecna'],
}

export function getClasse(id) {
  return classes.find(c => c.id === id) || classes[0]
}

export function getDinheiroInicial(classe) {
  if (!classe) return { po: 0, pl: 0, pp: 0, pc: 0 };
  return dinheiroInicialClasse[classe.toLowerCase()] || { po: 0, pl: 0, pp: 0, pc: 0 };
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

export function podeUsarAlfabetizacao(classeId) {
  const classe = getClasse(classeId)
  return classe?.alfabetizacao || false
}

export function getDeusesPorClasse(classeId) {
  return deusesPorClasse[classeId] || []
}

export const idiomasFixosPorClasse = {
  druida: ["Druídico"]
}

export const idiomasExtrasPorClasse = {
  clerigo: ["Abissal", "Celestial", "Infernal"],
  mago: ["Dracônico"],
  druida: ["Silvestre"]
}

export function getIdiomasFixosClasse(classeId) {
  return idiomasFixosPorClasse[classeId] || []
}

export function getIdiomasExtrasPorClasse(classeId) {
  return idiomasExtrasPorClasse[classeId] || []
}