// /calculos/resistencias.js
import { getMod } from "./utils.js";

// ==========================
// CONFIGURAÇÕES
// ==========================
const savesPorClasse = {
    barbaro: { fort: "bom", ref: "ruim", von: "ruim" },
    guerreiro: { fort: "bom", ref: "ruim", von: "ruim" },
    ladino: { fort: "ruim", ref: "bom", von: "ruim" },
    monge: { fort: "bom", ref: "bom", von: "bom" },
    clerigo: { fort: "bom", ref: "ruim", von: "bom" },
    druida: { fort: "bom", ref: "ruim", von: "bom" },
    mago: { fort: "ruim", ref: "ruim", von: "bom" },
    feiticeiro: { fort: "ruim", ref: "ruim", von: "bom" },
    bardo: { fort: "ruim", ref: "bom", von: "bom" },
    paladino: { fort: "bom", ref: "ruim", von: "bom" },
    ranger: { fort: "bom", ref: "bom", von: "ruim" }
};

// bônus racial (expansível)
const bonusRacialResistencia = {
    halfling: { fort: 1, ref: 1, von: 1 }
};

// ==========================
// FUNÇÕES AUXILIARES
// ==========================
function getSaveBase(tipo, nivel) {
    return tipo === "bom"
        ? 2 + Math.floor(nivel / 2)
        : Math.floor(nivel / 3);
}

function getValor(id) {
    return parseInt(document.getElementById(id)?.value) || 0;
}

// ==========================
// FUNÇÃO PRINCIPAL
// ==========================
export function calcularResistencias(classe, nivel, raca) {
    const saves = savesPorClasse[classe];
    if (!saves) return;

    const mods = {
        fort: getMod(getValor("total_constituicao")),
        ref: getMod(getValor("total_destreza")),
        von: getMod(getValor("total_sabedoria"))
    };

    ["fort", "ref", "von"].forEach(tipo => {
        const base = getSaveBase(saves[tipo], nivel);
        const mod = mods[tipo];

        const magico = getValor(`${tipo}_magico`);
        const outrosInput = getValor(`${tipo}_outros`);
        const temp = getValor(`${tipo}_temp`);

        // ✅ PRIMEIRO pega o bônus racial
        const bonusRacial = bonusRacialResistencia[raca]?.[tipo] || 0;

        // ✅ depois soma
        const outrosTotal = outrosInput + bonusRacial;

        const total = base + mod + magico + outrosTotal + temp;

        // escreve no HTML
        document.getElementById(`${tipo}_base`).value = base;
        document.getElementById(`${tipo}_mod`).value = mod;
        document.getElementById(`${tipo}_total`).value = total;

        // 👉 MOSTRA o racial no campo "outros"
        document.getElementById(`${tipo}_outros`).value = outrosTotal || "";
    });
}