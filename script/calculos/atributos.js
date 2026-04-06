import { getMod } from "./utils.js";

export function calcularAtributos(event, raceSelect) {
    const raca = raceSelect.value;

    const bonusRacial = {
        humano: { forca: 0, destreza: 0, constituicao: 0, inteligencia: 0, sabedoria: 0, carisma: 0 },
        anao: { constituicao: 2, carisma: -2 },
        elfo: { destreza: 2, constituicao: -2 },
        gnomo: { constituicao: 2, forca: -2 },
        "meio-elfo": { inteligencia: 0},
        "meio-orc": { forca: 2, inteligencia: -2, carisma: -2},
        halfling: { destreza: 2, forca: -2 }
    };

    const habilidades = ["forca", "destreza", "constituicao", "inteligencia", "sabedoria", "carisma"];

    const bonusDaRaca = bonusRacial[raca] || {};

    habilidades.forEach(hab => {
        const inputBase = document.getElementById(hab);
        const inputRacial = document.getElementById(`mod_racial_${hab}`);
        const inputTotal = document.getElementById(`total_${hab}`);
        const inputModificador = document.getElementById(`mod_habilidade_${hab}`);

        if (!inputBase) return;

        let valorBase = parseInt(inputBase.value);

        if (event && event.type === "blur") {
            if (!isNaN(valorBase) && valorBase < 3 && inputBase.value !== "") {
                valorBase = 3;
                inputBase.value = 3;
            }
        }

        const valorBaseCalculo = valorBase || 0;
        const valorRacial = bonusDaRaca[hab] || 0;

        if (inputRacial) inputRacial.value = valorRacial;

        let soma = valorBaseCalculo + valorRacial;
        let valorFinal = 0;

        if (valorBaseCalculo > 0) {
            valorFinal = (hab === "inteligencia") ? Math.max(3, soma) : soma;

            if (inputTotal) inputTotal.value = valorFinal;

            const modificador = getMod(valorFinal);

            if (inputModificador) {
                if (inputModificador.type === "text") {
                    inputModificador.value = modificador > 0 ? `+${modificador}` : modificador;
                } else {
                    inputModificador.value = modificador;
                }
            }
        } else {
            if (inputTotal) inputTotal.value = "";
            if (inputModificador) inputModificador.value = "";
        }
    });
}