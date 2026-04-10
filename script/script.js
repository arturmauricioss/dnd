import { divindades } from "./data/divindades.js";
import { itensPorClasse } from "./data/itensporclasse.js";
import { mapeamentoCompleto } from "./data/mapeamentocompleto.js";
import { getMod } from "./calculos/utils.js";
import { calcularAtributos } from "./calculos/atributos.js";
import { atualizarIdiomas } from "./calculos/idiomas.js";
import { calcularResistencias } from "./calculos/resistencias.js";
import { inicializarBBA, calcularBBA } from "./calculos/bba.js";
import { calcularCA } from "./calculos/ca.js";
import { restricoesClasse } from "./data/restricoesClasse.js";
import { idadePorRaca } from "./data/idadePorRaca.js";
import { fisicoPorRaca } from "./data/fisicoPorRaca.js";
import { dadosVidaPorClasse } from "./data/dadosVidaPorClasse.js";
import { deslocamentoPorRaca, bonusDeslocamentoPorClasse } from "./data/deslocamentoConfig.js";
import { mapaTextos } from "./data/mapaTextos.js";
import { camposInativosPorClasse } from "./data/camposInativosPorClasse.js";
import { habilidadesEspeciaisData } from "./data/habilidadesEspeciais.js";
import { tabelaDanoPorTamanho } from "./data/tabelaDano.js";
import { calcularAtaque, calcularDanoCompleto } from "./calculos/combate.js";

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM carregado. Inicializando sistemas...");
    
    // ========== DECLARAÇÕES DE VARIÁVEIS DOM ==========
    const classeSelect = document.getElementById("classe");
    const alignmentSelect = document.getElementById("alignment");
    const deitySelect = document.getElementById("deity");
    const raceSelect = document.getElementById("race");
    const sizeInput = document.getElementById("size");
    const idadeInput = document.getElementById("idade");
    
    const sexoSelect = document.getElementById("sex");
    const heightInput = document.getElementById("height");
    const weightInput = document.getElementById("weight");
    
    const habilidades = ["forca", "destreza", "constituicao", "inteligencia", "sabedoria", "carisma"];
    
    // ========== FUNÇÕES ==========
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
    function atualizarArmas() {
        const raca = raceSelect.value;

        const totalFor = parseInt(document.getElementById("total_forca")?.value) || 0;
        const totalDex = parseInt(document.getElementById("total_destreza")?.value) || 0;

        const modFor = getMod(totalFor);
        const modDex = getMod(totalDex);

        const bba = parseInt(document.getElementById("bonus_base_de_ataque")?.value) || 0;

        const weapons = document.querySelectorAll("#weapons .weapon");

        weapons.forEach(container => {
            const nome = container.querySelector(".wp_atack")?.value;

            if (!nome) return; // slot vazio

            // ⚠️ AQUI ESTÁ O PULO DO GATO
            // você precisa ter guardado a arma original!
            const arma = container._armaData;
            if (!arma) return;

            const inputBonus = container.querySelector(".wp_bonus_atack");
            const inputDano = container.querySelector(".wp_damage");

            if (inputBonus) {
                const bonus = calcularAtaque(arma, bba, modFor, modDex, raca);
                inputBonus.value = bonus >= 0 ? `+${bonus}` : bonus;
            }

            if (inputDano) {
                inputDano.value = calcularDanoCompleto(arma, modFor, modDex, raca);
            }
        });
    }
    function formatarTexto(valor) {
      if (!valor) return "";

      if (mapaTextos[valor]) return mapaTextos[valor];

      // fallback genérico (capitaliza)
      return valor
        .replace(/_/g, " ")
        .replace(/\b\w/g, l => l.toUpperCase());
    }
    
    function atualizarTudo(event = null){
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
        // Nota: Os cálculos de armas são feitos manualmente pois as armas são valores de texto
        // e não objetos de estrutura definida no banco de dados

        // 4. DESLOCAMENTO
        const deslocBase = deslocamentoPorRaca[raca] || 9;
        const bonusClasse = bonusDeslocamentoPorClasse[classe] || 0;
        const deslocFinal = deslocBase + bonusClasse;
        const deslocInput = document.getElementById("deslocamento");
        if (deslocInput) {
            deslocInput.value = deslocFinal ? `${deslocFinal}m` : "";
        }

        // 5. CA
        calcularCA({ raca, modDex });

        // 6. PONTOS DE VIDA (HP)
        const hpBase = dadosVidaPorClasse[classe] || 6;
        const hpTotal = hpBase + (modCon * nivel);
        const vidaInput = document.getElementById("vida");
        if (vidaInput) {
            vidaInput.value = Math.max(1, hpTotal); // Mínimo 1 HP
        }

        // 7. INICIATIVA
        const iniciativaTotalInput = document.getElementById("iniciativa_total");
        const iniciativaOutrosInput = document.getElementById("iniciativa_outros");
        const outrosIni = parseInt(iniciativaOutrosInput?.value) || 0;
        const iniTotal = modDex + outrosIni;
        
        if (iniciativaTotalInput) {
            iniciativaTotalInput.value = iniTotal >= 0 ? `+${iniTotal}` : iniTotal;
        }
        atualizarArmas();
    }
    function ajustarDanoPorTamanho(dano, tamanho) {
        if (!dano) return dano;

        const t = tamanho.toLowerCase();

        if (t === "pequeno" && tabelaDanoPorTamanho[dano]) {
            return tabelaDanoPorTamanho[dano].pequeno || dano;
        }

        return dano; // médio ou não mapeado
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

    function preencherItensClasse(classe) {
        const dados = itensPorClasse[classe];
        const raca = raceSelect.value;

        const totalFor = parseInt(document.getElementById("total_forca")?.value) || 0;
        const totalDex = parseInt(document.getElementById("total_destreza")?.value) || 0;

        const modFor = getMod(totalFor);
        const modDex = getMod(totalDex);

        const bba = parseInt(document.getElementById("bonus_base_de_ataque")?.value) || 0;
        if (!dados) return;

        const usarKit = document.getElementById('usarKit')?.checked;

        // 1. Limpeza total antes de começar
        limparItens();

        // ==========================================
        // DINHEIRO (independente do modo)
        // ==========================================
        let dinheiroUsado = usarKit ? dados.dinheiro_kit : dados.dinheiro_sem_kit;
        if (dinheiroUsado && dinheiroUsado.po) {
            const poInput = document.getElementById("po_money");
            if (poInput) {
                poInput.value = dinheiroUsado.po; // armazena a string de rolagem (ex: "2d4" ou "6d4 x 10")
            }
        }

        if (!usarKit) {
            // Modo sem kit: mostra apenas ouro
            return;
        }

        // ==========================================
        // MODO: KIT DE EQUIPAMENTO
        // ==========================================

        // 2. ARMAS
        if (dados.armas) {
            dados.armas.forEach((arma, index) => {
                const weapons = document.querySelectorAll("#weapons .weapon");
                const container = weapons[index];
                if (!container) return;
                container._armaData = arma;
                const inputNome = container.querySelector(".wp_atack");
                const inputBonus = container.querySelector(".wp_bonus_atack");
                const inputDano = container.querySelector(".wp_damage");
                const inputCritico = container.querySelector(".wp_decisive_success");
                const inputAlcance = container.querySelector(".wp_range");
                const inputTipo = container.querySelector(".wp_type");
                const inputPeso = container.querySelector(".wp_weight");
                const inputMunicao = container.querySelector(".wp_ammo");
                const inputQuantidade = container.querySelector(".wp_quantity");
                const inputObs = container.querySelector(".wp_notes");

                // Nome
                if (inputNome) inputNome.value = arma.nome || "";

                // Bonus de ataque
                if (inputBonus) {
                    const bonus = calcularAtaque(arma, bba, modFor, modDex, raca);
                    inputBonus.value = bonus >= 0 ? `+${bonus}` : bonus;
                }

                // Observações
                let obs = [];
                if (arma.categoria) obs.push(mapaTextos[arma.categoria] || arma.categoria);
                if (arma.subtipo) obs.push(mapaTextos[arma.subtipo] || arma.subtipo);
                if (inputObs) inputObs.value = obs.join(", ");

                // Dano completo (já com tamanho + força)
                if (inputDano) {
                    inputDano.value = calcularDanoCompleto(arma, modFor, modDex, raca);
                }

                if (inputCritico) inputCritico.value = arma.critico || "";
                if (inputAlcance) inputAlcance.value = arma.alcance || "";
                if (inputTipo) inputTipo.value = arma.tipo_dano || "";
                if (inputPeso) inputPeso.value = arma.peso || "";
                if (inputMunicao) inputMunicao.value = arma.municao || "";
                if (inputQuantidade) inputQuantidade.value = arma.quantidade || "";
            });
        }

        // 3. ARMADURAS
        if (dados.armadura) {
            const a = dados.armadura;

            document.getElementById("armor_name").value = a.nome || "";
            document.getElementById("armor_type").value = a.tipo || "";
            document.getElementById("armor_bonus").value = a.bonus_ca || "";
            document.getElementById("armor_dex_max").value = a.dex_max || "";
            document.getElementById("armor_penalty").value = a.penalidade || "";
            document.getElementById("armor_spell_fail").value = a.falha_magia || "";
            document.getElementById("armor_speed").value = a.deslocamento || "";
            document.getElementById("armor_weight").value = a.peso || "";
            document.getElementById("armor_notes").value = a.propriedades || "";
        }

        // 4. ESCUDOS
        if (dados.escudo) {
            const s = dados.escudo;

            document.getElementById("shield_name").value = s.nome || "";
            document.getElementById("shield_bonus").value = s.bonus_ca || "";
            document.getElementById("shield_penalty").value = s.penalidade || "";
            document.getElementById("shield_spell_fail").value = s.falha_magia || "";
            document.getElementById("shield_weight").value = s.peso || "";
            document.getElementById("shield_notes").value = s.propriedades || "";
        }

        // 5. ITENS DIVERSOS
        if (dados.itens && dados.itens.length > 0) {
            dados.itens.forEach((item, index) => {
                const input = document.getElementById(`itens_${index}`);
                if (input) {
                    input.value = item.nome || "";
                }
            });
        }
        // Limpa slots de armas não usados
        const weapons = document.querySelectorAll("#weapons .weapon");
        for (let i = dados.armas?.length || 0; i < weapons.length; i++) {
            weapons[i].querySelectorAll("input").forEach(el => el.value = "");
        }
    }
    
    function limparItens() {
        // Limpa armas
        document.querySelectorAll("#weapons input").forEach(el => el.value = "");
        // Limpa armaduras
        document.querySelectorAll("#armory input, #shield input").forEach(el => el.value = "");
        // Limpa dinheiro
        document.querySelectorAll(".pl_money, .po_money, .pp_money, .pc_money").forEach(el => el.value = "");
        // Limpa itens diversos
        for (let i = 0; i <= 11; i++){
            const input = document.getElementById(`itens_${i}`);
            if (input) input.value = "";
        }
    }

    function marcarInativoClasse(classe) {
        // Primeiro, limpa tudo
        document.querySelectorAll("input, select, textarea").forEach(el => {
            el.classList.remove("inativo");
        });

        const campos = camposInativosPorClasse[classe];
        if (!campos) return;

        campos.forEach(campoId => {
            const el = document.getElementById(campoId);
            if (el) {
                el.classList.add("inativo");
                el.value = ""; // limpa valor
            }
        });
    }

    
    function atualizarDanoPorTamanho() {
        const tamanho = document.getElementById("size")?.value || "MÉDIO";

        document.querySelectorAll(".wp_damage").forEach(input => {
            const base = input.dataset.base;
            if (base) {
                input.value = ajustarDanoPorTamanho(base, tamanho);
            }
        });
    }
    function atualizarHabilidadesEspeciais() {
        const raca = raceSelect.value;
        const classe = classeSelect.value;

        const listaFinal = [...(habilidadesEspeciaisData.racas[raca] || []), ...(habilidadesEspeciaisData.classes[classe] || [])];

        // 1. LIMPEZA TOTAL (24 habilidades)
        for (let i = 0; i <= 23; i++) {
            const input = document.getElementById(`hab_especial_${i}`);
            if (input) input.value = "";
        }

        // 2. PREENCHIMENTO
        listaFinal.forEach((texto, index) => {
            const input = document.getElementById(`hab_especial_${index}`);
            if (input) {
                input.value = texto;
            }
        });
    }

    // ========== EVENT LISTENERS ==========
    
    // CLASSE → TRAVA ALINHAMENTO
    classeSelect.addEventListener("change", () => {
        const classe = classeSelect.value;

        for (let option of alignmentSelect.options) {
            if (option.value === "selecione") {
                option.disabled = false;
                continue;
            }

            // padrão: tudo liberado
            option.disabled = false;

            const regra = restricoesClasse[classe];

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
        atualizarTudo();
    });

    // ALINHAMENTO → FILTRA DEUS
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

    // RAÇA → TAMANHO + IDADE + FÍSICO + HABILIDADES
    raceSelect.addEventListener("change", () => {
        const raca = raceSelect.value;
        let modTamanhoAgarrar = 0;
        let tamanhoAtual = "MÉDIO";

        if (raca === "halfling" || raca === "gnomo") {
            tamanhoAtual = "PEQUENO";
            modTamanhoAgarrar = -4; // <-- voltou isso aqui
        } else if (raca === "selecione") {
            tamanhoAtual = "";
            modTamanhoAgarrar = 0;
        } else {
            tamanhoAtual = "MÉDIO";
            modTamanhoAgarrar = 0;
        }

        sizeInput.value = tamanhoAtual;
        const agarrarTamanhoInput = document.getElementById("agarrar_tamanho");
        if (agarrarTamanhoInput) {
            agarrarTamanhoInput.value = modTamanhoAgarrar;
        }

        // =================
        // MUDAR DANO PELO TAMANHO
        // =================

        const classe = classeSelect.value;
        if (classe !== "selecione") {
            preencherItensClasse(classe);
            atualizarDanoPorTamanho();
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
        
        // =================
        // FÍSICO E HABILIDADES
        // =================
        atualizarFisico();
        atualizarHabilidadesEspeciais();
        atualizarTudo();
    });
    
    sexoSelect.addEventListener("change", atualizarFisico);
    
    document.getElementById("level_class").addEventListener("change", atualizarTudo);
    document.getElementById("level_profession")?.addEventListener("change", atualizarTudo);
    
    // Event listeners para habilidades
    habilidades.forEach(hab => {
        const el = document.getElementById(hab);
        // 'input' calcula enquanto digita, 'blur' garante a correção visual ao sair do campo
        el.addEventListener("input", (e) => calcularAtributos(e, raceSelect));
        el.addEventListener("blur", (e) => atualizarTudo(e));
        
        // Se for inteligência, também atualiza idiomas no blur
        if (hab === "inteligencia") {
            el.addEventListener("blur", () => atualizarIdiomas(raceSelect, classeSelect));
        }
    });
    
    // Event listener para usar kit
    document.getElementById('usarKit').addEventListener('change', () => {
        const classe = classeSelect.value;
        if (classe !== "selecione") {
            preencherItensClasse(classe);
        }
        atualizarTudo();
    });
    
    // Event listeners para resistências
    ["fort", "ref", "von"].forEach(tipo => {
        ["magico", "outros", "temp"].forEach(campo => {
            const el = document.getElementById(`${tipo}_${campo}`);
            if (el) {
                el.addEventListener("input", atualizarTudo);
            }
        });
    });
    function getSaveBase(tipo, nivel) {
        if (tipo === "bom") {
            return 2 + Math.floor(nivel / 2);
        } else {
            return Math.floor(nivel / 3);
        }
    }
    // Inicializa lógica de BBA
    if (typeof inicializarBBA === "function") {
        inicializarBBA();
    }

    // Listeners para equipamentos que afetam cálculos
    const armorType = document.getElementById("armor_type");
    const armorBonus = document.getElementById("armor_bonus");
    const shieldBonus = document.getElementById("shield_bonus");
    
    if (armorType) armorType.addEventListener("change", atualizarTudo);
    if (armorBonus) armorBonus.addEventListener("change", atualizarTudo);
    if (shieldBonus) shieldBonus.addEventListener("change", atualizarTudo);


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

    atualizarTudo();
});
