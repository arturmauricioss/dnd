// ==========================
// CÁLCULO DE PONTOS DE PERÍCIA
// ==========================

export function calcularPontosPericia({ classe, nivel, intMod, raca, pontosPorClasse }) {
    const base = pontosPorClasse[classe] || 2;

    let total = (base + intMod) * 4; // nível 1

    if (nivel > 1) {
        total += (nivel - 1) * (base + intMod);
    }

    // humano
    if (raca === "humano") {
        total += 4 + (nivel - 1);
    }

    return Math.max(1, total);
}


// ==========================
// LIMITE DE GRADUAÇÃO
// ==========================

export function calcularMaxGraduacao(nivel, isClasse) {
    return isClasse ? (nivel + 3) : Math.floor((nivel + 3) / 2);
}


// ==========================
// CUSTO DA PERÍCIA
// ==========================

export function calcularCustoPericia(graduacao, isClasse) {
    return isClasse ? graduacao : graduacao * 2;
}


// ==========================
// VALOR REAL DA GRADUAÇÃO
// ==========================

export function calcularValorGraduacao(graduacao, isClasse) {
    return graduacao; 
}


// ==========================
// PENALIDADE DE ARMADURA
// ==========================

export function calcularPenalidade(pericia, penalArmor, penalShield) {
    const penalTotal = (penalArmor || 0) + (penalShield || 0);

    // 0 = não usa
    // 1 = normal
    // 2 = dobro
    return penalTotal * (pericia.penalidade || 0);
}


// ==========================
// TOTAL FINAL DA PERÍCIA
// ==========================

export function calcularTotalPericia({
    pericia,
    graduacao,
    isClasse,
    modHab,
    outros,
    penalArmor,
    penalShield
}) {
    // bloqueio: somente treinado
    if (pericia.somente_treinado && graduacao === 0) {
        return "—";
    }

    const valorGraduacao = calcularValorGraduacao(graduacao, isClasse);
    const penalidade = calcularPenalidade(pericia, penalArmor, penalShield);

    return modHab + valorGraduacao + outros + penalidade;
}