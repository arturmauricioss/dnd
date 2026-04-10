import { getMod } from "./utils.js";
import { idiomasRaciais, idiomaClasseFixo, idiomasClasseExtras, TODOS_IDIOMAS } from "../data/idiomasConfig.js";

export function atualizarIdiomas(raceSelect, classeSelect) {
    const raca = raceSelect.value;
    const classe = classeSelect.value;

    const leitura = document.getElementById("leitura_escrita");
    const idioma1 = document.getElementById("idioma_1");

    const selects = [];
    for (let i = 2; i <= 8; i++) {
        selects.push(document.getElementById(`idioma_${i}`));
    }

    // 📖 Alfabetização
    leitura.value = (classe === "barbaro")
        ? "Analfabeto"
        : "Alfabetizado";

    const dadosRaca = idiomasRaciais[raca] || { base: ["Comum"], extras: [] };
    const base = dadosRaca.base;

    // 🧠 Pool inicial
    let pool = [...dadosRaca.extras];

    if (idiomasClasseExtras[classe]) {
        pool.push(...idiomasClasseExtras[classe]);
    }

    // 👤 Regra especial: humano
    if (raca === "humano" || raca === "meio-elfo") {
        pool = [...TODOS_IDIOMAS];
    }

    const fixosClasse = idiomaClasseFixo[classe] || [];

    // 🔁 Remove duplicados
    pool = [...new Set(pool)];

    // ❌ Remove idiomas base e fixos do pool
    pool = pool.filter(id => !base.includes(id) && !fixosClasse.includes(id));

    // 🧩 Função auxiliar
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

    // 🧠 Inteligência
    const totalInt = parseInt(document.getElementById("total_inteligencia").value) || 0;
    const modInt = getMod(totalInt);
    const qtdExtras = Math.max(0, modInt);

    // 🔄 Reset
    selects.forEach(select => {
        select.innerHTML = "";
        select.disabled = true;
    });

    // 🗣️ Idioma principal
    idioma1.value = base[0] || "Comum";
    idioma1.readOnly = true;

    let slotIndex = 0;

    // 🧬 Idiomas base adicionais
    for (let i = 1; i < base.length; i++) {
        const select = selects[slotIndex];
        if (!select) break;

        preencherSelect(select, [base[i]]);
        select.value = base[i];
        select.disabled = true;
        slotIndex++;
    }

    // 🌿 Idiomas fixos da classe (Druídico)
    for (let i = 0; i < fixosClasse.length; i++) {
        const select = selects[slotIndex];
        if (!select) break;

        preencherSelect(select, [fixosClasse[i]]);
        select.value = fixosClasse[i];
        select.disabled = true;
        slotIndex++;
    }

    // ➕ Idiomas extras por INT
    for (let i = 0; i < qtdExtras; i++) {
        const select = selects[slotIndex];
        if (!select) break;

        preencherSelect(select, pool);
        select.disabled = false;
        slotIndex++;
    }

    // 🚫 Bloqueio de duplicados
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