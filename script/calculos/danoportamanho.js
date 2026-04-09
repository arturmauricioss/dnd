// ==========================
// TABELA DE AJUSTE POR TAMANHO
// ==========================

const tabelaDanoPorTamanho = {
    "1d12": { pequeno: "1d10" },
    "1d10": { pequeno: "1d8" },
    "1d8": { pequeno: "1d6" },
    "1d6": { pequeno: "1d4" },
    "1d4": { pequeno: "1d3" },
    "1d3": { pequeno: "1d2" }
};

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