export const restricoesClasse = {
    paladino: ["lawful_good"],
    monge: ["lawful_good", "lawful_neutral", "lawful_evil"],
    barbaro: ["non_lawful"],
    bardo: ["non_lawful"],
    druida: ["true_neutral", "neutral_good", "neutral_evil", "lawful_neutral", "chaotic_neutral"]
}

export function podeSelecionarAlinhamento(classeId, alinhamentoId) {
    if (!classeId || classeId === 'selecione') return true
    
    const restricoes = restricoesClasse[classeId] || []
    
    if (restricoes.length === 0) return true
    
    if (restricoes.includes('non_lawful')) {
        return !alinhamentoId.startsWith('lawful')
    }
    
    if (restricoes.includes('true_neutral') || restricoes.includes('neutral')) {
        return alinhamentoId.includes('neutral')
    }
    
    return restricoes.includes(alinhamentoId)
}