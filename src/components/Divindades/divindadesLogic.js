import { divindades, passoPorAlinhamento } from './divindadesData'

export function calcularPassos(alinhamento1, alinhamento2) {
    const pos1 = passoPorAlinhamento[alinhamento1]
    const pos2 = passoPorAlinhamento[alinhamento2]
    if (!pos1 || !pos2) return 99
    return Math.abs(pos1[0] - pos2[0]) + Math.abs(pos1[1] - pos2[1])
}

export function getDeusesPorAlinhamento(alinhamentoId) {
    if (!alinhamentoId || alinhamentoId === 'selecione') return divindades
    
    return divindades.filter(d => {
        const passos = calcularPassos(alinhamentoId, d.alinhamento)
        return passos <= 1
    })
}

export function getDeusPorId(deusId) {
    return divindades.find(d => d.value === deusId) || null
}