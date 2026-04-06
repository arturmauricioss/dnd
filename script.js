import { divindades } from "./divindades.js";
import { itensPorClasse } from "./itensporclasse.js";
import { mapeamentoCompleto } from "./mapeamentocompleto.js";

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
        
        // --- SEU NOVO PADRÃO DE ID ---
        const inputModificador = document.getElementById(`mod_habilidade_${hab}`); 

        if (!inputBase) return;

        let valorBase = parseInt(inputBase.value);

        // Regra do mínimo 3 no blur (perda de foco)
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
            // Regra de inteligência mínima
            valorFinal = (hab === "inteligencia") ? Math.max(3, soma) : soma;
            if (inputTotal) inputTotal.value = valorFinal;
            
            // --- CÁLCULO E EXIBIÇÃO DO MODIFICADOR ---
            const modificador = getMod(valorFinal);
            
            if (inputModificador) {
                const modificador = getMod(valorFinal);

                // Se o input for do tipo TEXT, ele aceita o +
                // Se for do tipo NUMBER, ele só aceita o número puro
                if (inputModificador.type === "text") {
                    inputModificador.value = modificador > 0 ? `+${modificador}` : modificador;
                } else {
                    inputModificador.value = modificador;
                }
            }
        } else {
            // Limpa os campos se não houver valor base
            if (inputTotal) inputTotal.value = "";
            if (inputModificador) inputModificador.value = "";
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
    atualizarIdiomas();
    
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

    // ==========================
    // EQUIPAMENTO (ARMADURA / ESCUDO)
    // ==========================
    function parseBonus(valor) {
        if (!valor) return 0;

        // remove qualquer coisa que não seja número ou sinal
        const numero = parseInt(valor.toString().replace(/[^\d-]/g, ""));
        
        return isNaN(numero) ? 0 : numero;
    }
    // ARMADURA
    const armorInput = document.querySelector("#armory .ar_bonus_ca");
    const armor = parseBonus(armorInput?.value);
    

    // ESCUDO
    const shieldInput = document.querySelector("#shield .ar_bonus_ca");
    const shield = parseBonus(shieldInput?.value);
    const natural = 0;

    const protecoes = document.querySelectorAll(".protect .ar_bonus_ca");

    let bonusProtecao = 0;

    protecoes.forEach(el => {
        bonusProtecao += parseBonus(el.value);
    });

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
    const caNormal = caBase + armor + shield + natural + modDex + modTamanho + bonusProtecao;
    const caToque = caBase + modDex + modTamanho;
    const caSurpresa = caBase + armor + shield + natural + modTamanho + bonusProtecao;

    document.getElementById("ca_final").value = caNormal;
    document.getElementById("ca_toque_total").value = caToque;
    document.getElementById("ca_surpresa_total").value = caSurpresa;


    // ==========================
    // 4. Iniciativa
    // ==========================
    const iniciativaTotalInput = document.getElementById("iniciativa_total");
    const iniciativaHiddenInput = document.getElementById("iniciativa");    
    const iniciativaOutrosHiddenInput = document.getElementById("iniciativa_outros");

    if (iniciativaTotalInput && iniciativaHiddenInput && iniciativaOutrosHiddenInput) {
        // 1. Pegamos o valor de 'outros'. Se estiver vazio ou não for número, vira 0
        const outros = parseInt(iniciativaOutrosHiddenInput.value) || 0;
        
        // 2. Somamos o modificador de Destreza (que já é número) com o bônus de outros
        const somaTotal = modDex + outros;

        // 3. Formatamos para exibição (colocando o + se for positivo)
        const valFormatado = somaTotal > 0 ? `+${somaTotal}` : somaTotal;
        
        // 4. Distribuímos os valores
        iniciativaTotalInput.value = valFormatado; // Visível no HTML
        iniciativaHiddenInput.value = modDex > 0 ? `+${modDex}` : modDex; // Modificador puro para o PDF
        
        // Se você quiser que o 'outros' também tenha o sinal no PDF:
        // iniciativaOutrosHiddenInput.value = outros; 
    }
} // <--- Fecha a função atualizarTudo aqui

function marcarInativo(id) {
    const el = document.getElementById(id);
    if (el) {
        el.value = "X";
        el.classList.add("inativo");
    }
}

function preencherItensClasse(classe) {
    const dados = itensPorClasse[classe];

    if (!dados) return;

    // =====================
    // ARMAS
    // =====================
    const armas = document.querySelectorAll("#weapons .weapon");

     dados.armas.forEach((arma, index) => {
        const container = armas[index];
        if (!container) return;

        container.querySelector(".wp_atack").value = arma.nome || "";
        container.querySelector(".wp_bonus_atack").value = arma.bonus || "";
        container.querySelector(".wp_damage").value = arma.dano || "";
        container.querySelector(".wp_decisive_success").value = arma.critico || "";
        container.querySelector(".wp_range").value = arma.alcance || "";
        container.querySelector(".wp_type").value = arma.tipo || "";
        container.querySelector(".wp_weight").value = arma.peso || "";

        // 🔥 CAMPOS QUE FALTAVAM
        container.querySelector(".wp_ammo").value = arma.municao || "";
        container.querySelector(".wp_quantity").value = arma.quantidade || "";
        container.querySelector(".wp_observation").value = arma.observacao || "";
    });

    // =====================
    // ARMADURA
    // =====================
    const armadura = document.querySelector("#armory");

    if (dados.armadura && armadura) {
        armadura.querySelector(".ar_armour").value = dados.armadura.nome || "";
        armadura.querySelector(".ar_type").value = dados.armadura.tipo || "";
        armadura.querySelector(".ar_bonus_ca").value = dados.armadura.bonus_ca || "";
        armadura.querySelector(".ar_dex_max").value = dados.armadura.dex_max || "";
        armadura.querySelector(".ar_penal_armour").value = dados.armadura.penalidade || "";
        armadura.querySelector(".ar_chance_mag_fail").value = dados.armadura.falha_magia || "";
        armadura.querySelector(".ar_moviment").value = dados.armadura.deslocamento || "";
        armadura.querySelector(".ar_weight").value = dados.armadura.peso || "";
        armadura.querySelector(".ar_proprieties").value = dados.armadura.propriedades || "";
    }

    // ESCUDO
    const escudo = document.querySelector("#shield");

    if (dados.escudo && escudo) {
        escudo.querySelector(".ar_shield").value = dados.escudo.nome || "";
        escudo.querySelector(".ar_bonus_ca").value = dados.escudo.bonus_ca || "";
        escudo.querySelector(".ar_weight").value = dados.escudo.peso || "";
        escudo.querySelector(".ar_penal_armour").value = dados.escudo.penalidade || "";
        escudo.querySelector(".ar_chance_mag_fail").value = dados.escudo.falha_magia || "";
        escudo.querySelector(".ar_proprieties").value = dados.escudo.propriedades || "";
    }

    // ITENS DE PROTEÇÃO
    const protecoes = document.querySelectorAll(".protect");

    if (dados.protecoes) {
        dados.protecoes.forEach((item, index) => {
            const container = protecoes[index];
            if (!container) return;

            container.querySelector(".ar_protection").value = item.nome || "";
            container.querySelector(".ar_bonus_ca").value = item.bonus_ca || "";
            container.querySelector(".ar_weight").value = item.peso || "";
            container.querySelector(".ar_proprieties").value = item.propriedades || "";
        });
    }

    const itens = document.querySelectorAll("#other_itens .item");

    if (dados.itens) {
        dados.itens.forEach((item, index) => {
            const container = itens[index];
            if (!container) return;

            container.querySelector(".ot_item").value = item.nome || "";
            container.querySelector(".ot_page").value = item.pagina || "";
            container.querySelector(".ot_weight").value = item.peso || "";
        });
    }
    // =====================
    // DINHEIRO
    // =====================
    const dinheiro = dados.dinheiro;

    if (dinheiro) {
        const setMoney = (selector, value) => {
            const el = document.querySelector(selector);
            if (el) el.value = value || "";
        };

        setMoney(".pl_money", dinheiro.pl);
        setMoney(".po_money", dinheiro.po);
        setMoney(".pp_money", dinheiro.pp);
        setMoney(".pc_money", dinheiro.pc);
    }
}

function limparItens() {
    // Armas
    document.querySelectorAll("#weapons input").forEach(el => el.value = "");

    // Armaduras (corrigido)
    document.querySelectorAll("#armours input").forEach(el => el.value = "");

    // Bag
    document.querySelectorAll("#other_itens input").forEach(el => el.value = "");
}

// script.js


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

        function marcarMunicao(ataqueIndex, quantidade) {
            const qtd = parseInt(quantidade) || 0;

            for (let i = 0; i < 30; i++) {
                try {
                    const campo = form.getCheckBox(`Zbox Ataque ${ataqueIndex} Munição ${i}`);
                    
                    if (i < qtd) {
                        campo.check();
                    } else {
                        campo.uncheck();
                    }

                } catch (err) {
                    console.warn(`Checkbox não encontrado: Ataque ${ataqueIndex} Munição ${i}`);
                }
            }
        }
        const armas = document.querySelectorAll("#weapons .weapon");

        armas.forEach((armaEl, index) => {
            const quantidade = armaEl.querySelector(".wp_quantity")?.value;

            marcarMunicao(index + 1, quantidade);
        });
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
function atualizarIdiomas() {
    const raca = raceSelect.value;
    const classe = classeSelect.value;

    const leitura = document.getElementById("leitura_escrita");

    const idioma1 = document.getElementById("idioma_1");

    // TODOS selects do 2 ao 7
    const selects = [];
    for (let i = 2; i <= 7; i++) {
        selects.push(document.getElementById(`idioma_${i}`));
    }

    // =========================
    // LEITURA / ESCRITA
    // =========================
    leitura.value = (classe === "barbaro")
        ? "Analfabeto"
        : "Alfabetizado";

    // =========================
    // IDIOMA 1 → COMUM
    // =========================
    idioma1.value = "Comum";
    idioma1.readOnly = true;

    // =========================
    // IDIOMA RACIAL
    // =========================
    const idiomasPorRaca = {
        humano: null,
        elfo: "Élfico",
        anao: "Anão",
        halfling: "Halfling",
        gnomo: "Gnomo",
        "meio-elfo": "Élfico",
        "meio-orc": "Orc"
    };

    const racial = idiomasPorRaca[raca];

    // =========================
    // POOL BASE
    // =========================
    let pool = [

        'Comum', // Humanos, halflings, meio-elfos, meio-orcs Comum
        'Anão', // Anões Anão
        'Gnomo', // Gnomos Anão
        'Goblin', // Goblins, robgoblins, bugbears Anão
        'Gigante', // Ettins, ogros, gigantes Anão
        'Terran', // Xorn e outras criaturas terrestres Anão
        'Ore', // Orcs Anão
        'Gnoll', // Gnoll Comum
        'Halfling', // Halflings Comum
        'Élfico', // Elfos Élfico
        'Aquan', // Criaturas aquáticas Élfico
        'Subterrânea', // Drow, ilitíde Élfico
        'Auran', // Criaturas aéreas Dracônico
        'Ignan' // Criaturas do fogo Dracônico   
    ];

    const idiomasClasse = {
        clerigo: ["Abissal", "Celestial", "Infernal"],
        druida: ["Silvestre"],
        mago: ["Dracônico"]
    };

    if (idiomasClasse[classe]) {
        pool.push(...idiomasClasse[classe]);
    }

    pool = [...new Set(pool)];

    // =========================
    // FUNÇÃO DE SELECT
    // =========================
    function preencherSelect(select, opcoes) {
        select.innerHTML = "";

        const opDefault = document.createElement("option");
        opDefault.value = "";
        opDefault.textContent = "Selecione";
        select.appendChild(opDefault);

        opcoes.forEach(id => {
            const opt = document.createElement("option");
            opt.value = id;
            opt.textContent = id;
            select.appendChild(opt);
        });
    }

    // =========================
    // INT + RACIAL (LÓGICA FINAL)
    // =========================
    const totalInt = parseInt(document.getElementById("total_inteligencia").value) || 0;
    const modInt = getMod(totalInt);

    const temRacial = !!racial;
    const qtdExtras = Math.max(0, modInt);

    // =========================
    // RESET
    // =========================
    selects.forEach(select => {
        select.innerHTML = "";
        select.disabled = true;
    });

    // =========================
    // DISTRIBUIÇÃO
    // =========================
    let slotIndex = 0;

    // 👉 1. RACIAL ocupa idioma_2 (se existir)
    if (temRacial) {
        const select = selects[slotIndex];

        preencherSelect(select, [racial]);
        select.value = racial;
        select.disabled = true;

        slotIndex++;
    }

    // 👉 2. Idiomas de INT (inclui humano aqui)
    for (let i = 0; i < qtdExtras; i++) {
        const select = selects[slotIndex];
        if (!select) break;

        preencherSelect(select, pool);
        select.disabled = false;

        slotIndex++;
    }

    // =========================
    // BLOQUEAR DUPLICADOS
    // =========================
    selects.forEach(select => {
        select.onchange = () => {
            const selecionados = selects.map(s => s.value).filter(v => v);

            selects.forEach(s => {
                if (s.disabled) return;

                const valorAtual = s.value;

                preencherSelect(
                    s,
                    pool.filter(id => !selecionados.includes(id) || id === valorAtual)
                );

                s.value = valorAtual;
            });
        };
    });
}
raceSelect.addEventListener("change", atualizarIdiomas);
classeSelect.addEventListener("change", atualizarIdiomas);
document.getElementById("inteligencia").addEventListener("input", () => {
    atualizarTudo();
});

document.getElementById("inteligencia").addEventListener("blur", () => {
    atualizarTudo();
});