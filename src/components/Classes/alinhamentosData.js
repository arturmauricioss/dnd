export const alinhamentos = [
  { id: 'selecione', nome: 'SELECIONE...' },
  { id: 'lawful_good', nome: 'LEAL BOM' },
  { id: 'neutral_good', nome: 'NEUTRAL BOM' },
  { id: 'chaotic_good', nome: 'CAÓTICO BOM' },
  { id: 'lawful_neutral', nome: 'LEAL NEUTRAL' },
  { id: 'true_neutral', nome: 'NEUTRAL VERDADEIRO' },
  { id: 'chaotic_neutral', nome: 'CAÓTICO NEUTRAL' },
  { id: 'lawful_evil', nome: 'LEAL MALIGNO' },
  { id: 'neutral_evil', nome: 'NEUTRAL MALIGNO' },
  { id: 'chaotic_evil', nome: 'CAÓTICO MALIGNO' },
]

export const alinhamentosPorClasse = {
    paladino: ["lawful_good"],
    monge: ["lawful_good", "lawful_neutral", "lawful_evil"],
    barbaro: ["non_lawful"],
    bardo: ["non_lawful"],
    druida: ["true_neutral", "neutral_good", "neutral_evil", "lawful_neutral", "chaotic_neutral"]
}

export function getAlinhamento(id) {
  return alinhamentos.find(a => a.id === id) || alinhamentos[0]
}

export function podeSelecionarAlinhamento(classeId, alinhamentoId) {
    if (!classeId || classeId === 'selecione') return true
    
    const restricoes = alinhamentosPorClasse[classeId] || []
    
    if (restricoes.length === 0) return true
    
    if (restricoes.includes('non_lawful')) {
        return !alinhamentoId.startsWith('lawful')
    }
    
    if (restricoes.includes('true_neutral') || restricoes.includes('neutral')) {
        return alinhamentoId.includes('neutral')
    }
    
    return restricoes.includes(alinhamentoId)
}

export function alinhamentoValidoParaClasse(classeId, alinhamentoId) {
    if (!alinhamentoId || alinhamentoId === 'selecione') return true
    return podeSelecionarAlinhamento(classeId, alinhamentoId)
}