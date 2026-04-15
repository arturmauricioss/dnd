// /calculos/bba.js
import { getMod } from "./utils.js";
import { bbaPorClasse } from "../data/bbaPorClasse.js";

// ==========================
// AUXILIARES
// ==========================
function getBBABase(tipo, nivel) {
    if (tipo === "bom") return nivel;
    if (tipo === "medio") return Math.floor(nivel * 0.75);
    if (tipo === "ruim") return Math.floor(nivel * 0.5);
    return 0;
}

function getValor(id) {
    const el = document.getElementById(id);
    if (!el) return 0;
    const val = parseInt(el.value);
    return isNaN(val) ? 0 : val;
}

// ==========================
// FUNÇÕES PRINCIPAIS
// ==========================

/**
 * Inicializa os ouvintes de evento para os campos de combate
 */
export function inicializarBBA() {
    const camposManuais = [
        "resistencia_a_magia",
        "agarrar_tamanho",
        "agarrar_outros"
    ];

    camposManuais.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            // Valor inicial padrão
            if (el.value === "") el.value = 0;

            // Se apagar ou deixar vazio, volta para 0
            el.addEventListener("blur", () => {
                if (el.value === "" || el.value === "-") {
                    el.value = 0;
                }
            });
        }
    });
}

/**
 * Executa todos os cálculos de BBA, RM e Agarrar
 * @param {string} classe - O ID ou value da classe selecionada
 */
export function calcularBBA(classe) {
    // 1. Pega o nível diretamente do seu SELECT
    const nivel = getValor("level_class");

    // 2. Cálculo do BBA Base
    const tipoBBA = bbaPorClasse[classe];
    const bba = (tipoBBA && nivel > 0) ? getBBABase(tipoBBA, nivel) : 0;

    // 3. Captura de Modificadores para Agarrar
    // Certifique-se que o ID "total_forca" existe no seu HTML de atributos
    const modForca = getMod(getValor("total_forca"));
    const tamMod = getValor("agarrar_tamanho");
    const outrosAgarrar = getValor("agarrar_outros");

    // 4. Cálculo do Total Agarrar
    const totalAgarrar = bba + modForca + tamMod + outrosAgarrar;

    // 5. Atribuição de Valores no HTML
    
    // BBA e RM (Combate-grid1)
    document.getElementById("bonus_base_de_ataque").value = bba;
    
    const elRM = document.getElementById("resistencia_a_magia");
    if (elRM.value === "") elRM.value = 0;

    // Agarrar (Combate-grid2)
    document.getElementById("agarrar_base").value = bba;
    document.getElementById("agarrar_mod").value = modForca;
    document.getElementById("agarrar_total").value = totalAgarrar;

    // Garantia visual: impede campos vazios se a função rodar por trigger
    if (document.getElementById("agarrar_tamanho").value === "") {
        document.getElementById("agarrar_tamanho").value = 0;
    }
    if (document.getElementById("agarrar_outros").value === "") {
        document.getElementById("agarrar_outros").value = 0;
    }
}