import { divindades } from "./divindades.js";
import { itensPorClasse } from "./itensporclasse.js";
import { mapeamentoCompleto } from "./mapeamentocompleto.js";
import { getMod } from "./calculos/utils.js";
import { calcularAtributos } from "./calculos/atributos.js";
import { atualizarIdiomas } from "./calculos/idiomas.js";
import { calcularResistencias } from "./calculos/resistencias.js";
import { inicializarBBA, calcularBBA } from "./calculos/bba.js";
import { calcularCA } from "./calculos/ca.js";
import { calcularAtaque, calcularDanoCompleto } from "./calculos/combate.js";

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
    marcarInativoClasse(classe);
    atualizarHabilidadesEspeciais();
    atualizarEquipamentos();
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
    let modTamanhoAgarrar = 0;
    // =================
    // TAMANHO
    // =================
    if (raca === "halfling" || raca === "gnomo") {
        sizeInput.value = "PEQUENO";
        modTamanhoAgarrar = -4; // Penalidade por ser Pequeno
    } else if (raca === "selecione") {
        sizeInput.value = "";
        modTamanhoAgarrar = 0;
    } else {
        sizeInput.value = "MÉDIO";
        modTamanhoAgarrar = 0; // Bônus 0 para Médio
    }
    const agarrarTamanhoInput = document.getElementById("agarrar_tamanho");
    if (agarrarTamanhoInput) {
        agarrarTamanhoInput.value = modTamanhoAgarrar;
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
document.getElementById("level_class").addEventListener("change", atualizarTudo);
habilidades.forEach(hab => {
    const el = document.getElementById(hab);
    // 'input' calcula enquanto digita, 'blur' garante a correção visual ao sair do campo
    el.addEventListener("input", (e) => calcularAtributos(e, raceSelect));
    el.addEventListener("blur", (e) => atualizarTudo(e));
    
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
const bonusDeslocamentoPorClasse = {
    barbaro: 3
};

function formatarTexto(valor) {
  if (!valor) return "";

  const mapa = {
    duas_maos: "Duas Mãos",
    uma_mao: "Uma Mão",
    leve: "Leve",
    corpo: "Corpo a Corpo",
    distancia: "À Distância",
    perfurante: "Perfurante",
    cortante: "Cortante",
    concussao: "Concussão",
    arremesso: "Arremesso",
    disparo: "Disparo"
  };

  if (mapa[valor]) return mapa[valor];

  // fallback genérico (capitaliza)
  return valor
    .replace(/_/g, " ")
    .replace(/\b\w/g, l => l.toUpperCase());
}

function atualizarTudo(event) {
    // 1. Cálculos de Base (Atributos, Idiomas, Resistências e BBA)
    calcularAtributos(event, raceSelect);
    atualizarIdiomas(raceSelect, classeSelect);

    const raca = raceSelect.value;
    const classe = classeSelect.value;
    const nivel = parseInt(document.getElementById("level_class").value) || 1;

    calcularResistencias(classe, nivel, raca);
    calcularBBA(classe);

    // 2. Variáveis de Atributos e Modificadores
    const totalFor = parseInt(document.getElementById("total_forca")?.value) || 0;
    const totalDex = parseInt(document.getElementById("total_destreza")?.value) || 0;
    const totalCon = parseInt(document.getElementById("total_constituicao")?.value) || 0;
    
    const modFor = getMod(totalFor);
    const modDex = getMod(totalDex);
    const modCon = getMod(totalCon);
    
    const bba = parseInt(document.getElementById("bonus_base_de_ataque")?.value) || 0;
    const usarKit = document.getElementById('usarKit')?.checked;

    // 3. CÁLCULO DE ATAQUE E DANO (Armas)
    const armasContainers = document.querySelectorAll("#weapons .weapon");
    
    armasContainers.forEach((container, index) => {
        const inputNome = container.querySelector(".wp_atack");
        const inputBonus = container.querySelector(".wp_bonus_atack");
        const inputDano = container.querySelector(".wp_damage");
        if (!inputBonus || !inputDano) return;

        // Se estiver em modo "apenas dinheiro" ou o campo estiver vazio, limpa e pula
        if (!usarKit || !inputNome || !inputNome.value) {
            if (inputBonus) inputBonus.value = "";
            if (inputDano) inputDano.value = "";
            return;
        }

        // Recupera os dados da arma da sua base para saber se é corpo ou distância
        const dadosClasse = itensPorClasse[classe];
        const armaDados = dadosClasse?.armas ? dadosClasse.armas[index] : null;

        if (!armaDados) return;

        // Bônus de Ataque
        let bonusAtk = calcularAtaque(armaDados, bba, modFor, modDex, raca);
        inputBonus.value = bonusAtk >= 0 ? `+${bonusAtk}` : bonusAtk;

        // Dano
        inputDano.value = calcularDanoCompleto(armaDados, modFor, modDex, raca);
});

    // 4. VIDA (HP)
    const vidaInput = document.getElementById("vida");
    const dadoVida = dadosVidaPorClasse[classe] || 0;
    if (dadoVida > 0) {
        vidaInput.value = Math.max(1, dadoVida + modCon);
    }

    // 5. DESLOCAMENTO
    const deslocInput = document.getElementById("deslocamento");
    const deslocBase = deslocamentoPorRaca[raca] || 0;
    let bonusClasse = bonusDeslocamentoPorClasse[classe] || 0;
    const armorType = document.querySelector("#armory .ar_type")?.value;

    if (classe === "barbaro" && (armorType === "Média" || armorType === "Pesada")) {
        bonusClasse = 0;
    }
    const deslocFinal = deslocBase + bonusClasse;
    deslocInput.value = deslocFinal ? `${deslocFinal}m` : "";

    // 6. CA
    calcularCA({ raca, modDex });

    // 7. INICIATIVA
    const iniciativaTotalInput = document.getElementById("iniciativa_total");
    const iniciativaOutrosInput = document.getElementById("iniciativa_outros");
    const outrosIni = parseInt(iniciativaOutrosInput?.value) || 0;
    const iniTotal = modDex + outrosIni;
    
    if (iniciativaTotalInput) {
        iniciativaTotalInput.value = iniTotal >= 0 ? `+${iniTotal}` : iniTotal;
    }
}

// Função auxiliar para "rolar" os dados (opcional, mas útil)
function rolarDados(expressao) {
    if (!expressao) return 0;
    const [qtd, faces] = expressao.split('d').map(Number);
    let total = 0;
    for (let i = 0; i < qtd; i++) {
        total += Math.floor(Math.random() * faces) + 1;
    }
    return total * 10; // No D&D 3.5, multiplica-se o resultado por 10 para o ouro inicial
}


function limparCamposEquipamento() {
    // Limpa armas
    document.querySelectorAll("#weapons input").forEach(el => el.value = "");
    // Limpa armaduras
    document.querySelectorAll("#armory input, #shield input").forEach(el => el.value = "");
    // Limpa dinheiro para não somar com o novo cálculo
    document.querySelectorAll(".pl_money, .po_money, .pp_money, .pc_money").forEach(el => el.value = "");
}

document.getElementById('usarKit').addEventListener('change', () => {
    const classe = classeSelect.value;
    if (classe !== "selecione") {
        preencherItensClasse(classe);
    }
    atualizarTudo();
});


function preencherItensClasse(classe) {
    const dados = itensPorClasse[classe];
    if (!dados) return;

    const usarKit = document.getElementById('usarKit')?.checked;

    // 1. Limpeza total antes de começar
    limparItens();

    if (!usarKit) {
        // ==========================================
        // MODO: DINHEIRO SEM KIT (Texto: "6d4 x 10")
        // ==========================================
        if (dados.dinheiro_sem_kit) {
            const campoPO = document.querySelector(".po_money");
            if (campoPO) {
                // Injeta o texto puro da sua base de dados
                campoPO.value = dados.dinheiro_sem_kit.po || "";
            }
            // Limpa as outras moedas
            document.querySelectorAll(".pl_money, .pp_money, .pc_money").forEach(el => el.value = "");
        }
        return; // Para aqui para não preencher armas
    }

    // ==========================================
    // MODO: KIT PRONTO (Itens + Dinheiro do Kit)
    // ==========================================

    // 2. PREENCHER ARMAS
    const armasContainer = document.querySelectorAll("#weapons .weapon");
    if (dados.armas && dados.armas.length > 0) {
        dados.armas.forEach((arma, index) => {
            const container = armasContainer[index];
            if (!container) return;

            container.querySelector(".wp_atack").value = arma.nome || "";
            container.querySelector(".wp_damage").value = arma.dano || "";
            container.querySelector(".wp_decisive_success").value = arma.critico || "";
            container.querySelector(".wp_range").value = arma.alcance || "";
            container.querySelector(".wp_type").value = formatarTexto(arma.tipo_dano);
            container.querySelector(".wp_weight").value = arma.peso || "";
            container.querySelector(".wp_ammo").value = arma.municao || "";
            container.querySelector(".wp_quantity").value = arma.quantidade || "";
            
            // Observações (Categoria + Subtipo)
            let obs = formatarTexto(arma.categoria);

            if (arma.subtipo) {
                obs += `, ${formatarTexto(arma.subtipo)}`;
            }

            container.querySelector(".wp_observation").value = obs;
        });
    }

    // 3. PREENCHER ARMADURA
    const armaduraEl = document.querySelector("#armory");
    if (dados.armadura && armaduraEl) {
        armaduraEl.querySelector(".ar_armour").value = dados.armadura.nome || "";
        armaduraEl.querySelector(".ar_type").value = dados.armadura.tipo || "";
        armaduraEl.querySelector(".ar_bonus_ca").value = dados.armadura.bonus_ca || "";
        armaduraEl.querySelector(".ar_dex_max").value = dados.armadura.dex_max || "";
        armaduraEl.querySelector(".ar_penal_armour").value = dados.armadura.penalidade || "";
        armaduraEl.querySelector(".ar_chance_mag_fail").value = dados.armadura.falha_magia || "";
        armaduraEl.querySelector(".ar_moviment").value = dados.armadura.deslocamento || "";
        armaduraEl.querySelector(".ar_weight").value = dados.armadura.peso || "";
    }

    // 4. PREENCHER ESCUDO
    const escudoEl = document.querySelector("#shield");
    if (dados.escudo && escudoEl) {
        escudoEl.querySelector(".ar_shield").value = dados.escudo.nome || "";
        escudoEl.querySelector(".ar_bonus_ca").value = dados.escudo.bonus_ca || "";
        escudoEl.querySelector(".ar_weight").value = dados.escudo.peso || "";
    }

    // 5. PREENCHER DINHEIRO DO KIT (Pode ser string "2d4" ou número)
    if (dados.dinheiro_kit) {
        const campoPO = document.querySelector(".po_money");
        if (campoPO) campoPO.value = dados.dinheiro_kit.po || "";
        
        const campoPP = document.querySelector(".pp_money");
        if (campoPP) campoPP.value = dados.dinheiro_kit.pp || "";
    }

    // 6. OUTROS ITENS
    const outrosItensContainer = document.querySelectorAll("#other_itens .item");
    if (dados.itens) {
        dados.itens.forEach((item, index) => {
            const container = outrosItensContainer[index];
            if (!container) return;
            container.querySelector(".ot_item").value = item.nome || "";
            container.querySelector(".ot_weight").value = item.peso || "---";
        });
    }
    atualizarTudo();
}


function limparItens() {
    // Armas
    document.querySelectorAll("#weapons input").forEach(el => el.value = "");

    // Armadura
    document.querySelectorAll("#armory input").forEach(el => el.value = "");

    // Escudo
    document.querySelectorAll("#shield input").forEach(el => el.value = "");

    // Itens de proteção
    document.querySelectorAll(".protect input").forEach(el => el.value = "");

    // Outros itens
    document.querySelectorAll("#other_itens input").forEach(el => el.value = "");
}

async function exportarFicha() {
    console.log("Iniciando processo de exportação para PDF...");
    try {
        const url = './ficha.pdf'; 
        const response = await fetch(url);
        if (!response.ok) throw new Error("Arquivo ficha.pdf não encontrado.");
        
        const bytes = await response.arrayBuffer();
        const pdfDoc = await PDFLib.PDFDocument.load(bytes);
        const form = pdfDoc.getForm();

        // 1. Preenchimento via Mapeamento
        for (const [idHtml, nomePdf] of Object.entries(mapeamentoCompleto)) {
            const elemento = document.getElementById(idHtml);
            if (!elemento) continue;

            let valor = "";
            if (elemento.tagName === 'SELECT') {
                // Se for nível, pega o valor numérico, senão o texto
                valor = (idHtml === "level_class") ? elemento.value : elemento.options[elemento.selectedIndex]?.text;
                if (!valor || valor.includes("SELECIONE")) valor = ""; 
            } else {
                valor = elemento.value || "";
            }

            try {
                const campoPdf = form.getTextField(nomePdf);
                campoPdf.setText(valor.toString());
            } catch (err) {
                console.warn(`Campo PDF "${nomePdf}" não encontrado.`);
            }
        }

        // 2. Lógica de Munição
        try {
            const armas = document.querySelectorAll("#weapons .weapon");
            armas.forEach((armaEl, index) => {
                const qtd = parseInt(armaEl.querySelector(".wp_quantity")?.value) || 0;
                for (let i = 0; i < 30; i++) {
                    try {
                        const cb = form.getCheckBox(`Zbox Ataque ${index + 1} Munição ${i}`);
                        i < qtd ? cb.check() : cb.uncheck();
                    } catch(e) {}
                }
            });
        } catch(e) {}

        // --- A CORREÇÃO AQUI ---
        // Esse é o método correto da biblioteca para atualizar o visual dos campos
        form.updateFieldAppearances(); 

        // 3. Gerar e baixar
        const pdfBytes = await pdfDoc.save();
        const blob = new Blob([pdfBytes], { type: "application/pdf" });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        
        const nomeChar = document.getElementById('character_name')?.value || "Ficha_D&D";
        link.download = `${nomeChar.replace(/\s+/g, '_')}.pdf`;
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        console.log("Exportação finalizada com sucesso!");

    } catch (error) {
        console.error("ERRO NA EXPORTAÇÃO:", error);
        alert("Falha ao exportar: " + error.message);
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
        anao: ["Visão no Escuro 18m", "Estabilidade (+4 vs Derrubar)", "+2 RES vs Magia", "+2 res vs Veneno", "Sem penal mov. peso/armadura", "+1 BA vs orcs e goblinoides", "+4 CA vs monstros tipo gigante","+2 Procurar alvenaria", "+2 Avaliação obj metal/pedra", "+2 Ofício obj metal/pedra"],
        elfo: ["Imunidade a Sono", "+2 vs Encantamentos", "Visão na Penumbra"],
        gnomo: ["Visão na Penumbra", "+2 vs Ilusões", "+1 CD Ilusões","Falar com Animais (1/dia)", "+1 BA tamanho", "+4 esconder-se", "armas menores", "lev e carregar peso 3/4", "+1 BA vs Koblods e goblinoides", "+4 CA vs monstros tipo gigante", "+2 Ouvir", "+2 Oficio (Alquimia)"],
        halfling: ["+1 em Resistências*", "+2 vs Medo", "+1 Ataque (Arremesso)*", "+1 bonus ataque tamanho", "+4 esconder-se", "armas menores", "lev e carregar peso 3/4", "+2 Escalar", "+2 Saltar", "+2 Furtividade", "+2 resistencia contra o medo", "+2 Ouvir"],
        "meio-elfo": ["Imunidade a Sono", "+2 vs Encantamentos", "Visão na Penumbra", "Sangue Élfico", "+2 em Diplomacia", "+2 Obter Informação", "+1 Ouvir", "+1 Procurar", "+1 Observar"],
        "meio-orc": ["Visão no Escuro 18m", "Sangue Orc"],
        humano: ["+Talento Humano@", "+4 Perícia Nivel 1","+1 Perícia por Nível adicional@"]
    }
};

function atualizarHabilidadesEspeciais() {
    // 1. Pegar dados
    const raca = raceSelect.value;
    const classe = classeSelect.value;
    const listaFinal = [...(habilidadesEspeciaisData.racas[raca] || []), ...(habilidadesEspeciaisData.classes[classe] || [])];

    // 2. LIMPEZA TOTAL (24 habilidades)
    for (let i = 0; i <= 23; i++) {
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

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM carregado. Inicializando sistemas...");
    
    // Inicializa lógica de BBA
    if (typeof inicializarBBA === "function") {
        inicializarBBA();
    }

    const botao = document.getElementById('btn_exportar');
    if (botao) {
        console.log("Botão 'btn_exportar' encontrado e pronto.");
        // Usamos uma função anônima para facilitar o debug
        botao.addEventListener('click', (e) => {
            e.preventDefault();
            console.log("Clique no botão exportar detectado!");
            exportarFicha();
        });
    } else {
        console.error("ERRO: O botão com id 'btn_exportar' não existe no HTML.");
    }
});


function getSaveBase(tipo, nivel) {
    if (tipo === "bom") {
        return 2 + Math.floor(nivel / 2);
    } else {
        return Math.floor(nivel / 3);
    }
}


["fort", "ref", "von"].forEach(tipo => {
    ["magico", "outros", "temp"].forEach(campo => {
        const el = document.getElementById(`${tipo}_${campo}`);
        if (el) {
            el.addEventListener("input", atualizarTudo);
        }
    });
});