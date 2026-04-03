import { divindades } from "./divindades.js";

const classeSelect = document.getElementById("class");
const alignmentSelect = document.getElementById("alignment");
const deitySelect = document.getElementById("deity");
const raceSelect = document.getElementById("race");
const sizeInput = document.getElementById("size");
const idadeInput = document.getElementById("idade");

// =========================
// CLASSE → TRAVA ALINHAMENTO
// =========================
classeSelect.addEventListener("change", () => {
    const classe = classeSelect.value;

    // libera tudo
    for (let option of alignmentSelect.options) {
        option.disabled = false;
    }

    function disableAllExcept(valids) {
        for (let option of alignmentSelect.options) {
            if (!valids.includes(option.value) && option.value !== "selecione") {
                option.disabled = true;
            }
        }
    }

    function disable(values) {
        for (let option of alignmentSelect.options) {
            if (values.includes(option.value)) {
                option.disabled = true;
            }
        }
    }

    // regras
    if (classe === "paladino") {
        disableAllExcept(["lawful_good"]);
    }

    else if (classe === "monge") {
        disableAllExcept([
            "lawful_good",
            "lawful_neutral",
            "lawful_evil"
        ]);
    }

    else if (classe === "barbaro" || classe === "bardo") {
        disable([
            "lawful_good",
            "lawful_neutral",
            "lawful_evil"
        ]);
    }

    else if (classe === "druida") {
        disableAllExcept([
            "lawful_neutral",
            "true_neutral",
            "chaotic_neutral",
            "neutral_good",
            "neutral_evil"
        ]);
    }

    // limpa alinhamento inválido
    const selected = alignmentSelect.selectedOptions[0];
    if (selected && selected.disabled) {
        alignmentSelect.value = "selecione";
    }

    // limpa divindade
    deitySelect.innerHTML = '<option value="selecione">SELECIONE...</option>';
    atualizarTudo();
});


// =========================
// ALINHAMENTO → FILTRA DEUS
// =========================
alignmentSelect.addEventListener("change", () => {
    const alinhamento = alignmentSelect.value;

    // limpa select
    deitySelect.innerHTML = '<option value="selecione">SELECIONE...</option>';

    if (alinhamento === "selecione") return;

    const filtradas = divindades.filter(d =>
        d.alinhamentos.includes(alinhamento)
    );

    filtradas.forEach(d => {
        const opt = document.createElement("option");
        opt.value = d.value;
        opt.textContent = d.nome;
        deitySelect.appendChild(opt);
    });
});


// =========================
// RAÇA → TAMANHO + IDADE
// =========================

const idadePorRaca = {
    humano: { min: 15, max: 80 },
    elfo: { min: 100, max: 750 },
    anao: { min: 40, max: 350 },
    gnomo: { min: 40, max: 400 },
    "meio-elfo": { min: 20, max: 180 },
    "meio-orc": { min: 14, max: 60 },
    halfling: { min: 20, max: 150 }
};

raceSelect.addEventListener("change", () => {
    const raca = raceSelect.value;

    // =================
    // TAMANHO
    // =================
    if (raca === "halfling" || raca === "gnomo") {
        sizeInput.value = "PEQUENO";
    } else if (raca === "selecione") {
        sizeInput.value = "";
    } else {
        sizeInput.value = "MÉDIO";
    }

    // =================
    // IDADE (min/max)
    // =================
    if (idadePorRaca[raca]) {
        idadeInput.min = idadePorRaca[raca].min;
        idadeInput.max = idadePorRaca[raca].max;
    } else {
        idadeInput.min = 0;
        idadeInput.max = 9999;
    }

    // limpa valor inválido
    const idade = parseInt(idadeInput.value);
    const min = parseInt(idadeInput.min);
    const max = parseInt(idadeInput.max);

    if (!isNaN(idade) && (idade < min || idade > max)) {
        idadeInput.value = "";
    }

    // UX melhor
    idadeInput.placeholder = `${idadeInput.min} - ${idadeInput.max}`;
    atualizarTudo();
});
const sexoSelect = document.getElementById("sex");
const heightInput = document.getElementById("height");
const weightInput = document.getElementById("weight");

const fisicoPorRaca = {
    humano: {
        masculino: { altura: "1.65m - 1.90m", peso: "60 - 100kg" },
        feminino: { altura: "1.55m - 1.80m", peso: "50 - 80kg" }
    },
    elfo: {
        masculino: { altura: "1.70m - 2.00m", peso: "55 - 80kg" },
        feminino: { altura: "1.60m - 1.90m", peso: "45 - 70kg" }
    },
    anao: {
        masculino: { altura: "1.20m - 1.40m", peso: "70 - 100kg" },
        feminino: { altura: "1.10m - 1.30m", peso: "60 - 90kg" }
    },
    halfling: {
        masculino: { altura: "0.90m - 1.10m", peso: "30 - 40kg" },
        feminino: { altura: "0.85m - 1.05m", peso: "25 - 35kg" }
    },
    gnomo: {
        masculino: { altura: "0.90m - 1.10m", peso: "35 - 45kg" },
        feminino: { altura: "0.85m - 1.05m", peso: "30 - 40kg" }
    },
    "meio-elfo": {
        masculino: { altura: "1.65m - 1.95m", peso: "55 - 90kg" },
        feminino: { altura: "1.55m - 1.85m", peso: "45 - 75kg" }
    },
    "meio-orc": {
        masculino: { altura: "1.80m - 2.10m", peso: "80 - 120kg" },
        feminino: { altura: "1.70m - 2.00m", peso: "70 - 100kg" }
    }
};
function atualizarFisico() {
    const raca = raceSelect.value;
    const sexo = sexoSelect.value;

    if (fisicoPorRaca[raca] && fisicoPorRaca[raca][sexo]) {
        const dados = fisicoPorRaca[raca][sexo];

        heightInput.placeholder = dados.altura;
        weightInput.placeholder = dados.peso;
    } else {
        heightInput.placeholder = "";
        weightInput.placeholder = "";
    }
}
raceSelect.addEventListener("change", atualizarFisico);
sexoSelect.addEventListener("change", atualizarFisico);

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

function calcularAtributos(event) {
    const raca = raceSelect.value;
    const bonusDaRaca = bonusRacial[raca] || {};

    habilidades.forEach(hab => {
        const inputBase = document.getElementById(hab);
        const inputRacial = document.getElementById(`mod_racial_${hab}`);
        const inputTotal = document.getElementById(`total_${hab}`);

        if (!inputBase) return;

        let valorBase = parseInt(inputBase.value);

        // --- CORREÇÃO DA REGRA DO MÍNIMO 3 ---
        // Só forçamos o "3" se o evento for 'blur' (perda de foco).
        // No 'input' (digitação), deixamos o usuário digitar livremente.
        if (event && event.type === "blur") {
            if (!isNaN(valorBase) && valorBase < 3 && inputBase.value !== "") {
                valorBase = 3;
                inputBase.value = 3;
            }
        }

        const valorBaseCalculo = valorBase || 0;
        const valorRacial = bonusDaRaca[hab] || 0;
        inputRacial.value = valorRacial;

        let soma = valorBaseCalculo + valorRacial;

        if (valorBaseCalculo > 0) {
            if (hab === "inteligencia") {
                inputTotal.value = Math.max(3, soma);
            } else {
                inputTotal.value = soma;
            }
        } else {
            inputTotal.value = 0;
        }
    });
}

// Listeners
raceSelect.addEventListener("change", calcularAtributos);
habilidades.forEach(hab => {
    const el = document.getElementById(hab);
    // 'input' calcula enquanto digita, 'blur' garante a correção visual ao sair do campo
    el.addEventListener("input", atualizarTudo); // <--- Mudado aqui
    el.addEventListener("blur", atualizarTudo);  // <--- Mudado aqui
});

const dadosVidaPorClasse = {
    barbaro: 12,
    guerreiro: 10, paladino: 10, 
    ranger: 8, clerigo: 8,
    druida: 8, monge: 8, 
    bardo: 6, ladino: 6,
    feiticeiro: 4, mago: 4
};

const deslocamentoPorRaca = {
    humano: 9, elfo: 9, "meio-elfo": 9, "meio-orc": 9,
    anao: 6, gnomo: 6, halfling: 6
};
function getMod(valor) {
    if (!valor || valor < 1) return 0;
    return Math.floor((valor - 10) / 2);
}
function atualizarTudo() {
    calcularAtributos(); // Roda sua lógica já existente
    
    const raca = raceSelect.value;
    const classe = classeSelect.value;
    
    // ==========================
    // 1. DESLOCAMENTO & TAMANHO
    // ==========================
    const deslocInput = document.getElementById("deslocamento");
    if (deslocamentoPorRaca[raca]) {
        deslocInput.value = `${deslocamentoPorRaca[raca]}m`;
    } else {
        deslocInput.value = "";
    }

    // ==========================
    // 2. PONTOS DE VIDA (HP)
    // ==========================
    const vidaInput = document.getElementById("vida");
    const totalCon = parseInt(document.getElementById("total_constituicao").value) || 0;
    const modCon = getMod(totalCon);
    const dadoVida = dadosVidaPorClasse[classe] || 0;

    if (dadoVida > 0 && totalCon >= 3) {
        // Vida = Dado Cheio + Modificador de CON
        vidaInput.value = dadoVida + modCon;
    } else {
        vidaInput.value = "";
    }

    // ==========================
    // 3. CLASSE DE ARMADURA (CA)
    // ==========================
    const caBase = 10;
    const totalDex = parseInt(document.getElementById("total_destreza").value) || 0;
    const modDex = getMod(totalDex);
    
    // Modificador de Tamanho na CA (Pequeno +1, Médio 0)
    let modTamanho = 0;
    if (raca === "gnomo" || raca === "halfling") modTamanho = 1;

    // Preenchendo os campos da CA
    document.getElementById("ca_dex").value = modDex;
    document.getElementById("ca_size").value = modTamanho;
    document.getElementById("ca_armor").value = 0; // Inicialmente sem armadura
    document.getElementById("ca_shield").value = 0; // Inicialmente sem escudo
    document.getElementById("ca_natural").value = 0; // Inicialmente 0

    // CA Final = 10 + DEX + TAM + ARMOR + SHIELD + NATURAL
    if (totalDex >= 3) {
        document.getElementById("ca_final").value = caBase + modDex + modTamanho;
    } else {
        document.getElementById("ca_final").value = "";
    }
}