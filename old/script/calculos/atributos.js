import { getMod } from "./utils.js";
import { bonusRacialAtributos } from "../data/bonusRaciais.js";

export function calcularAtributos(event, raceSelect) {
    const raca = raceSelect.value;

    const habilidades = ["forca", "destreza", "constituicao", "inteligencia", "sabedoria", "carisma"];

    const bonusDaRaca = bonusRacialAtributos[raca] || {};

    habilidades.forEach(hab => {
        const inputBase = document.getElementById(hab);
        const inputRacial = document.getElementById(`mod_racial_${hab}`);
        const inputTotal = document.getElementById(`total_${hab}`);
        const inputModificador = document.getElementById(`mod_habilidade_${hab}`);

        if (!inputBase) return;

        let valorBase = parseInt(inputBase.value);

        if (event && event.type === "blur") {
            if (!isNaN(valorBase) && inputBase.value !== "") {

                if (valorBase < 3) {
                    valorBase = 3;
                }

                if (valorBase > 18) {
                    valorBase = 18;
                }

                inputBase.value = valorBase;
            }
        }

        const valorBaseCalculo = valorBase || 0;
        const valorRacial = bonusDaRaca[hab] || 0;

        // SEMPRE mostrar o modificador racial
        if (inputRacial) {
            inputRacial.value = valorRacial;
        }

        let soma = valorBaseCalculo + valorRacial;

        if (valorBaseCalculo > 0) {
            // Se há valor base, calcula total e modificador
            let valorFinal = (hab === "inteligencia") ? Math.max(3, soma) : soma;

            if (inputTotal) {
                inputTotal.value = valorFinal;
            }

            const modificador = getMod(valorFinal);

            if (inputModificador) {
                if (inputModificador.type === "text") {
                    inputModificador.value = modificador > 0 ? `+${modificador}` : modificador;
                } else {
                    inputModificador.value = modificador;
                }
            }
        } else {
            // Se não há valor base, limpa total e modificador
            if (inputTotal) inputTotal.value = "";
            if (inputModificador) inputModificador.value = "";
        }
    });
}