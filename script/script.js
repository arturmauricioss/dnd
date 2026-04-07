import { divindades } from "./divindades.js";
import { itensPorClasse } from "./itensporclasse.js";
import { mapeamentoCompleto } from "./mapeamentocompleto.js";
import { getMod } from "./calculos/utils.js";
import { calcularAtributos } from "./calculos/atributos.js";
import { atualizarIdiomas } from "./calculos/idiomas.js";

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

    const restricoes = {
        paladino: ["lawful_good"],
        monge: ["lawful_good", "lawful_neutral", "lawful_evil"],
        barbaro: ["non_lawful"],
        bardo: ["non_lawful"],
        druida: ["neutral_only"]
    };

    for (let option of alignmentSelect.options) {
        if (option.value === "selecione") {
            option.disabled = false;
            continue;
        }

        // padrão: tudo liberado
        option.disabled = false;

        const regra = restricoes[classe];

        if (!regra) continue;

        // regras especiais
        if (regra[0] === "non_lawful") {
            if (option.value.includes("lawful")) option.disabled = true;
        }
        else if (regra[0] === "neutral_only") {
            if (!option.value.includes("neutral")) option.disabled = true;
        }
        else {
            if (!regra.includes(option.value)) option.disabled = true;
        }
    }

    // limpa inválido
    const selected = alignmentSelect.selectedOptions[0];
    if (selected && selected.disabled) {
        alignmentSelect.value = "selecione";
    }

    deitySelect.innerHTML = '<option value="selecione">SELECIONE...</option>';

    limparItens();
    preencherItensClasse(classe);
    atualizarHabilidadesEspeciais();
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

sexoSelect.addEventListener("change", atualizarFisico);
classeSelect.addEventListener("change", () => atualizarIdiomas(raceSelect, classeSelect));

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

// Listeners
raceSelect.addEventListener("change", () => {
    atualizarFisico();
    atualizarHabilidadesEspeciais();
    atualizarTudo();
});

habilidades.forEach(hab => {
    const el = document.getElementById(hab);
    // 'input' calcula enquanto digita, 'blur' garante a correção visual ao sair do campo
    el.addEventListener("input", atualizarTudo);
    el.addEventListener("blur", atualizarTudo);  
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
function atualizarTudo() {
    calcularAtributos(null, raceSelect);
    atualizarIdiomas(raceSelect, classeSelect);
    
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
    function setAll(selector, value) {
        document.querySelectorAll(selector).forEach(el => el.value = value);
    }
    setAll(".ca_base", caBase);
    setAll(".ca_armor", armor);
    setAll(".ca_shield", shield);
    setAll(".ca_natural", natural);
    setAll(".ca_dex", modDex);
    setAll(".ca_size", modTamanho);

    // ==========================
    // TOQUE (ignora armadura, escudo, natural)
    // ==========================
    setAll(".ca_toque_armor", "X");
    setAll(".ca_toque_shield", "X");
    setAll(".ca_toque_natural", "X");

    // ==========================
    // SURPRESA (perde DEX)
    // ==========================
    setAll(".ca_surpresa_dex", "X");

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
                    if (elemento.selectedIndex >= 0) {
                        valor = elemento.options[elemento.selectedIndex].text;
                    } else {
                        valor = "";
                    }
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

const habilidadesEspeciaisData = {
    classes: {
        barbaro: ["Fúria 1/dia (Ext)", "Movimento Rápido (Ext)"],
        bardo: ["Conhecimento de Bardo", "Música de Bardo", "*Música de Proteção", "*Fascinar (Psi)", "*Inspirar Coragem +1 (Sob)", "**Atuação minimo 3"],
        clerigo: ["Expul/Fasci Mortos-Vivos (Su)", "Aura (Ext)"],
        druida: ["Senso da Natureza (Ext)", "Empatia com Animais (Ext)", "Companheiro Animal", "Idioma Druídico Adicional"],
        guerreiro: ["+Talento Guerreiro"],
        ladino: ["Ataque Furtivo +1d6", "Encontrar Armadilhas (Ext)"],
        monge: ["Bônus na CA (Sab)", "Rajada de Golpes (Ext)", "Dano Desarmado 1d6", "+Talento Monge"],
        paladino: ["Aura do Bem (Ext)", "Detectar o Mal (Psi)", "Destruir o Mal 1/dia (Su)"],
        ranger: ["1º Inimigo Favorito (Ext)", "Rastrear (Talento)", "Empatia com Natureza (Ext)"],
        mago: ["Invocação de Familiar", "Escrever Pergaminho (Talento)"],
        feiticeiro: ["Invocação de Familiar"]
    },
    racas: {
        anao: ["Visão no Escuro 18m", "Estabilidade (+4 vs Derrubar)", "Afinidade com Pedras"],
        elfo: ["Imunidade a Sono", "+2 vs Encantamentos", "Visão na Penumbra"],
        gnomo: ["Visão na Penumbra", "+2 vs Ilusões", "Conversar com Animais (1/dia)"],
        halfling: ["+1 em Resistências", "+2 vs Medo", "+1 Ataque (Arremesso)"],
        "meio-elfo": ["Sangue Élfico", "Visão na Penumbra", "+2 em Diplomacia/Obter Informação"],
        "meio-orc": ["Visão no Escuro 18m"],
        humano: ["+Talento Humano", "+1 Perícia por Nível"]
    }
};

function atualizarHabilidadesEspeciais() {
    // 1. Pegar dados
    const raca = raceSelect.value;
    const classe = classeSelect.value;
    const listaFinal = [...(habilidadesEspeciaisData.racas[raca] || []), ...(habilidadesEspeciaisData.classes[classe] || [])];

    // 2. LIMPEZA TOTAL (Use o ID máximo que você tem no HTML)
    // Se o seu HTML vai até o 11, limpe até o 11.
    for (let i = 0; i <= 11; i++) {
        const input = document.getElementById(`hab_especial_${i}`);
        if (input) input.value = "";
    }

    // 3. PREENCHIMENTO
    listaFinal.forEach((texto, index) => {
        const input = document.getElementById(`hab_especial_${index}`);
        if (input) {
            input.value = texto;
        }
    });
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


document.getElementById("inteligencia").addEventListener("input", () => {
    atualizarTudo();
});

document.getElementById("inteligencia").addEventListener("blur", () => {
    atualizarTudo();
});