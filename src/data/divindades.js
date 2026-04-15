export const divindades = [
    { nome: "PELOR", value: "pelor", alinhamentos: ["neutral_good"] },
    { nome: "HEIRONEOUS", value: "heironeous", alinhamentos: ["lawful_good"] },
    { nome: "KORD", value: "kord", alinhamentos: ["chaotic_good"] },
    { nome: "EHLONNA", value: "ehlonna", alinhamentos: ["neutral_good"] },
    { nome: "YONDALLA", value: "yondalla", alinhamentos: ["lawful_good"] },
    { nome: "BOCCOB", value: "boccob", alinhamentos: ["true_neutral"] },
    { nome: "WEE JAS", value: "wee_jas", alinhamentos: ["lawful_neutral"] },
    { nome: "OBAD-HAI", value: "obad_hai", alinhamentos: ["true_neutral"] },
    { nome: "GARL GLITTERGOLD", value: "garl", alinhamentos: ["neutral_good"] },
    { nome: "FHARLANGHN", value: "fharlanghn", alinhamentos: ["neutral_good", "true_neutral", "chaotic_neutral"] },
    { nome: "OLIDAMMARA", value: "olidammara", alinhamentos: ["chaotic_neutral"] },
    { nome: "VECNA", value: "vecna", alinhamentos: ["neutral_evil"] },
    { nome: "HEXTOR", value: "hextor", alinhamentos: ["lawful_evil"] },
    { nome: "ERYTHNUL", value: "erythnul", alinhamentos: ["chaotic_evil"] },
    { nome: "NERULL", value: "nerull", alinhamentos: ["neutral_evil"] },
    { nome: "ST. CUTHBERT", value: "st_cuthbert", alinhamentos: ["lawful_good", "lawful_neutral"] },
    { nome: "CORELLON LARETHIAN", value: "corellon", alinhamentos: ["chaotic_good"] },
    { nome: "MORADIN", value: "moradin", alinhamentos: ["lawful_good"] },
    { nome: "GRUUMSH", value: "gruumsh", alinhamentos: ["chaotic_evil"] }
]

// Passos de diferença entre alinhamentos (0 = mesmo, 1 = um passo)
const passoPorAlinhamento = {
    lawful_good: [0, 0],
    neutral_good: [0, 2],
    chaotic_good: [0, 4],
    lawful_neutral: [2, 0],
    true_neutral: [2, 2],
    chaotic_neutral: [2, 4],
    lawful_evil: [4, 0],
    neutral_evil: [4, 2],
    chaotic_evil: [4, 4],
}

function calcularPassos(alinhamento1, alinhamento2) {
    const pos1 = passoPorAlinhamento[alinhamento1]
    const pos2 = passoPorAlinhamento[alinhamento2]
    if (!pos1 || !pos2) return 99
    return Math.abs(pos1[0] - pos2[0]) + Math.abs(pos1[1] - pos2[1])
}

export function getDeusesPorAlinhamento(alinhamentoId) {
    if (!alinhamentoId || alinhamentoId === 'selecione') return divindades
    
    return divindades.filter(d => {
        return d.alinhamentos.some(deusAlign => 
            calcularPassos(alinhamentoId, deusAlign) <= 1
        )
    })
}