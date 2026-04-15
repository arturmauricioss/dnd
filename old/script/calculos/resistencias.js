// /calculos/resistencias.js
import { getMod } from "./utils.js";
import { savesPorClasse } from "../data/savesPorClasse.js";
import { bonusRacialResistencia } from "../data/bonusRaciais.js";

// ==========================
// ARMAZENAMENTO LIMPO
// ==========================
const outrosManuais = {
    fort: 0,
    ref: 0,
    von: 0
};

// ==========================
// AUX
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
// 🔥 INICIALIZA INPUTS (CHAMA UMA VEZ)
// ==========================
export function inicializarResistencias() {
    ["fort", "ref", "von"].forEach(tipo => {
        ["magico", "outros", "temp"].forEach(campo => {
            const el = document.getElementById(`${tipo}_${campo}`);
            
            if (el) {
                // valor inicial
                if (el.value === "") {
                    el.value = 0;
                }

                // captura manual
                if (campo === "outros") {
                    outrosManuais[tipo] = parseInt(el.value) || 0;

                    el.addEventListener("input", () => {
                        outrosManuais[tipo] = parseInt(el.value) || 0;
                    });
                }

                // se apagar → volta pra 0
                el.addEventListener("blur", () => {
                    if (el.value === "" || el.value === "-") {
                        el.value = 0;
                    }
                });
            }
        });
    });
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
        const temp = getValor(`${tipo}_temp`);

        const outrosInput = outrosManuais[tipo] || 0;
        const bonusRacial = bonusRacialResistencia[raca]?.[tipo] || 0;

        const outrosFinal = outrosInput + bonusRacial;
        const total = base + mod + magico + outrosFinal + temp;

        // ATUALIZAÇÃO: Garante que os campos não fiquem vazios ao renderizar
        document.getElementById(`${tipo}_base`).value = base || 0;
        document.getElementById(`${tipo}_mod`).value = mod || 0;
        document.getElementById(`${tipo}_total`).value = total || 0;
        document.getElementById(`${tipo}_outros`).value = outrosFinal || 0;
        
        // Garante que campos editáveis não fiquem em branco se já estiverem vazios
        const elMagico = document.getElementById(`${tipo}_magico`);
        if (elMagico.value === "") elMagico.value = 0;
        
        const elTemp = document.getElementById(`${tipo}_temp`);
        if (elTemp.value === "") elTemp.value = 0;
    });
}