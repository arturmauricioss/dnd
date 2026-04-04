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
    limparItens();
    preencherItensClasse(classe);
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
    calcularAtributos();
    
    const raca = raceSelect.value;
    const classe = classeSelect.value;

    // ==========================
    // 1. DESLOCAMENTO
    // ==========================
    const deslocInput = document.getElementById("deslocamento");
    deslocInput.value = deslocamentoPorRaca[raca] 
        ? `${deslocamentoPorRaca[raca]}m` 
        : "";

    // ==========================
    // 2. VIDA (HP)
    // ==========================
    const vidaInput = document.getElementById("vida");
    const totalCon = parseInt(document.getElementById("total_constituicao").value) || 0;
    const modCon = getMod(totalCon);
    const dadoVida = dadosVidaPorClasse[classe] || 0;

    vidaInput.value = (dadoVida > 0 && totalCon >= 3)
        ? dadoVida + modCon
        : "";

    // ==========================
    // 3. CA (BASE)
    // ==========================
    const caBase = 10;

    const totalDex = parseInt(document.getElementById("total_destreza").value) || 0;
    const modDex = getMod(totalDex);

    let modTamanho = 0;
    if (raca === "gnomo" || raca === "halfling") modTamanho = 1;

    // futuros (equipamento etc)
    const armor = 0;
    const shield = 0;
    const natural = 0;

    // ==========================
    // PREENCHER COLUNAS
    // ==========================
    document.querySelectorAll(".ca_base").forEach(el => el.value = caBase);
    document.querySelectorAll(".ca_armor").forEach(el => el.value = armor);
    document.querySelectorAll(".ca_shield").forEach(el => el.value = shield);
    document.querySelectorAll(".ca_natural").forEach(el => el.value = natural);
    document.querySelectorAll(".ca_dex").forEach(el => el.value = modDex);
    document.querySelectorAll(".ca_size").forEach(el => el.value = modTamanho);

    // ==========================
    // TOQUE (ignora armadura, escudo, natural)
    // ==========================
    document.querySelectorAll(".ca_toque_armor").forEach(el => el.value = "X");
    document.querySelectorAll(".ca_toque_shield").forEach(el => el.value = "X");
    document.querySelectorAll(".ca_toque_natural").forEach(el => el.value = "X");

    // ==========================
    // SURPRESA (perde DEX)
    // ==========================
    document.querySelectorAll(".ca_surpresa_dex").forEach(el => el.value = "X");

    // ==========================
    // TOTAIS
    // ==========================
    const caNormal = caBase + armor + shield + natural + modDex + modTamanho;
    const caToque = caBase + modDex + modTamanho;
    const caSurpresa = caBase + armor + shield + natural + modTamanho;

    document.getElementById("ca_final").value = caNormal;
    document.getElementById("ca_toque_total").value = caToque;
    document.getElementById("ca_surpresa_total").value = caSurpresa;


    // ==========================
    // Iniciativa
    // ==========================

    document.getElementById("iniciativa").value = modDex;
}
function marcarInativo(id) {
    const el = document.getElementById(id);
    el.value = "X";
    el.classList.add("inativo");
}

const itensPorClasse = {
    barbaro: {
        armas: [
            {
                nome: "Machado grande",
                bonus: "",
                dano: "1d12",
                critico: "x3",
                alcance: "-",
                tipo: "Cortante",
                peso: "6kg"
            },
            {
                nome: "Arco curto",
                bonus: "",
                dano: "1d6",
                critico: "x3",
                alcance: "18m",
                tipo: "Perfurante",
                peso: "1kg"
            },
            {
                nome: "Adaga",
                bonus: "",
                dano: "1d4",
                critico: "19-20/x2",
                alcance: "3m",
                tipo: "Perfurante",
                peso: "0.5kg"
            }
        ],
        armadura: {
            nome: "Corselete de couro batido",
            tipo: "Leve",
            bonus_ca: 3,
            penalidade: -1,
            deslocamento: "12m",
            peso: "10kg"
        }
    }
};

function preencherItensClasse(classe) {
    const dados = itensPorClasse[classe];

    if (!dados) return;

    // =====================
    // ARMAS
    // =====================
    const armas = document.querySelectorAll("#weapons .weapon");

    dados.armas.forEach((arma, index) => {
        if (!armas[index]) return;

        const container = armas[index];

        container.querySelector(".wp_atack").value = arma.nome;
        container.querySelector(".wp_bonus_atack").value = arma.bonus;
        container.querySelector(".wp_damage").value = arma.dano;
        container.querySelector(".wp_decisive_success").value = arma.critico;
        container.querySelector(".wp_range").value = arma.alcance;
        container.querySelector(".wp_type").value = arma.tipo;
        container.querySelector(".wp_weight").value = arma.peso;
    });

    // =====================
    // ARMADURA
    // =====================
    const armadura = document.querySelector("#armory");

    if (dados.armadura && armadura) {
        armadura.querySelector(".ar_armour").value = dados.armadura.nome;
        armadura.querySelector(".ar_type").value = dados.armadura.tipo;
        armadura.querySelector(".ar_bonus_ca").value = dados.armadura.bonus_ca;
        armadura.querySelector(".ar_penal_armour").value = dados.armadura.penalidade;
        armadura.querySelector(".ar_moviment").value = dados.armadura.deslocamento;
        armadura.querySelector(".ar_weight").value = dados.armadura.peso;
    }
}

function limparItens() {
    document.querySelectorAll("#weapons input").forEach(el => el.value = "");
    document.querySelectorAll("#armours input").forEach(el => el.value = "");
}

// script.js

const btnExportar = document.getElementById('btn_exportar');

if (btnExportar) {
    btnExportar.addEventListener('click', exportarFicha);
}

// 1. Defina a função (certifique-se que o nome é este)
async function exportarFicha() {
    console.log("Iniciando exportação...");
    try {
        const url = './ficha.pdf'; 
        const bytes = await fetch(url).then(res => res.arrayBuffer());
        const pdfDoc = await PDFLib.PDFDocument.load(bytes);
        const form = pdfDoc.getForm();

        // 1. IMPORTANTE: Usar o mapeamentoCompleto aqui!
        for (const [idHtml, nomePdf] of Object.entries(mapeamentoCompleto)) {
            const elemento = document.getElementById(idHtml);
            
            if (elemento) {
                let valor = "";

                // Lógica para pegar o texto de SELECTs ou o valor de INPUTs
                if (elemento.tagName === 'SELECT') {
                    valor = elemento.options[elemento.selectedIndex].text;
                    if (valor.includes("SELECIONE")) valor = ""; 
                } else {
                    valor = elemento.value;
                }

                // Tenta inserir no PDF
                try {
                    const campoPdf = form.getTextField(nomePdf);
                    campoPdf.setText(valor.toString());
                } catch (err) {
                    // Isso ajuda a debugar: se o nome no PDF estiver errado, ele avisa no console
                    console.warn(`Campo PDF "${nomePdf}" não encontrado. Verifique o nome no PDF.`);
                }
            }
        }

        // 2. Gerar e baixar o arquivo
        const pdfBytes = await pdfDoc.save();
        const blob = new Blob([pdfBytes], { type: "application/pdf" });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        
        const nomeChar = document.getElementById('character_name').value || "Ficha_D&D";
        link.download = `${nomeChar}.pdf`;
        link.click();
        
        console.log("Exportação concluída!");
    } catch (error) {
        console.error("Erro detalhado na exportação:", error);
    }
}

// 2. O PULO DO GATO: Ligue o botão do seu HTML à função aqui no JS
// No seu HTML o id é "btn_exportar"
document.addEventListener('DOMContentLoaded', () => {
    const botao = document.getElementById('btn_exportar');
    if (botao) {
        botao.addEventListener('click', exportarFicha);
    } else {
        console.error("Não achei o botão com id 'btn_exportar'");
    }
});
// Este objeto traduz: ID DO HTML -> NOME EXATO NO PDF
const mapeamentoCompleto = {
    // --- CABEÇALHO / IDENTIDADE ---
    'character_name': 'Nome do Personagem',
    'player': 'Jogador',
    'class': 'Classe',
    'level_class': 'Nível',
    'race': 'Raça',
    'alignment': 'Tendência',
    'sex': 'Sexo',
    'idade': 'Idade',
    'height': 'Altura',
    'weight': 'Peso',
    'eyes': 'Olhos',
    'hair': 'Cabelo',
    'skin': 'Pele',
    'profession': 'Profissão',
    'level_profession': 'Nível Profissão', // Verifique se o nome no PDF é esse

    // --- ATRIBUTOS (Habilidades) ---
    'total_forca': 'For',
    'total_destreza': 'Des',
    'total_constituicao': 'Con',
    'total_inteligencia': 'Int',
    'total_sabedoria': 'Sab',
    'total_carisma': 'Car',

    // --- STATUS DE COMBATE ---
    'vida': 'PV',
    'deslocamento': 'Deslocamento',
    'iniciativa': 'Iniciativa',
    'ca_final': 'CA',
    'ca_toque_total': 'Toque',
    'ca_surpresa_total': 'Surpresa',

    // --- CARGA E DINHEIRO ---
    'weight_total_carried': 'Peso Total',
    'weight_light': 'Carga Leve',
    'weight_medium': 'Carga Média',
    'weight_hard': 'Carga Pesada'
};