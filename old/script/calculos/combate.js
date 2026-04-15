import { ajustarDanoPorTamanho } from "./danoportamanho.js";

// ==========================
// ATAQUE
// ==========================
export function calcularAtaque(arma, bba, modFor, modDex, raca) {
    if (!arma) return 0;

    let bonus = bba;

    if (arma.tipo_ataque === "corpo") {
        bonus += modFor;
    } else {
        bonus += modDex;
    }

    // bônus racial halfling (arremesso)
    if (raca === "halfling" && arma.subtipo === "arremesso") {
        bonus += 1;
    }

    return bonus;
}

// ==========================
// DANO (MODIFICADOR)
// ==========================
export function calcularModDano(arma, modFor, raca) {
    if (!arma) return 0;

    let mod = 0;

    if (arma.tipo_ataque === "corpo") {
        if (arma.categoria === "duas_maos") {
            mod = Math.floor(modFor * 1.5);
        } else {
            mod = modFor;
        }
    } else if (arma.subtipo === "arremesso") {
        mod = modFor;
    }

    // bônus halfling
    if (raca === "halfling" && arma.subtipo === "arremesso") {
        mod += 1;
    }

    return mod;
}

// ==========================
// DANO FINAL (STRING)
// ==========================
export function calcularDanoCompleto(arma, modFor, modDex, raca) {
    if (!arma) return "";

    const modDano = calcularModDano(arma, modFor, raca);
    const danoBase = ajustarDanoPorTamanho(arma.dano, raca);

    if (!danoBase) return "";

    if (modDano === 0) return danoBase;

    return modDano > 0
        ? `${danoBase} +${modDano}`
        : `${danoBase} ${modDano}`;
}