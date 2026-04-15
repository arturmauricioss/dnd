// ==========================
// TABELA DE AJUSTE POR TAMANHO
// ==========================

import { tabelaDanoPorTamanho } from "../data/tabelaDano.js";

// ==========================
// UTIL
// ==========================

function ehPequeno(raca) {
    return raca === "halfling" || raca === "gnomo";
}

// ==========================
// FUNÇÃO PRINCIPAL
// ==========================

export function ajustarDanoPorTamanho(danoBase, raca) {
    if (!danoBase) return "";

    // Se não for pequeno, não muda nada
    if (!ehPequeno(raca)) return danoBase;

    // Caso especial: armas com múltiplos dados (ex: "1d6/1d6")
    if (danoBase.includes("/")) {
        return danoBase
            .split("/")
            .map(d => tabelaDanoPorTamanho[d]?.pequeno || d)
            .join("/");
    }

    // Caso normal
    return tabelaDanoPorTamanho[danoBase]?.pequeno || danoBase;
}