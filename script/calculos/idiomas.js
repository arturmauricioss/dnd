import { getMod } from "./utils.js";

export function atualizarIdiomas(raceSelect, classeSelect) {
    const raca = raceSelect.value;
    const classe = classeSelect.value;

    const leitura = document.getElementById("leitura_escrita");
    const idioma1 = document.getElementById("idioma_1");

    const selects = [];
    for (let i = 2; i <= 5; i++) {
        selects.push(document.getElementById(`idioma_${i}`));
    }

    leitura.value = (classe === "barbaro")
        ? "Analfabeto"
        : "Alfabetizado";

    idioma1.value = "Comum";
    idioma1.readOnly = true;

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

    let pool = [
        'Comum','Anão','Gnomo','Goblin','Gigante','Terran','Ore',
        'Gnoll','Halfling','Élfico','Aquan','Subterrânea','Auran','Ignan'
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

    // REMOVE duplicados fixos
    pool = pool.filter(id => id !== "Comum");
    if (racial) pool = pool.filter(id => id !== racial);

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

    const totalInt = parseInt(document.getElementById("total_inteligencia").value) || 0;
    const modInt = getMod(totalInt);

    const temRacial = !!racial;
    const qtdExtras = Math.max(0, modInt);

    selects.forEach(select => {
        select.innerHTML = "";
        select.disabled = true;
    });

    let slotIndex = 0;

    if (temRacial) {
        const select = selects[slotIndex];
        preencherSelect(select, [racial]);
        select.value = racial;
        select.disabled = true;
        slotIndex++;
    }

    for (let i = 0; i < qtdExtras; i++) {
        const select = selects[slotIndex];
        if (!select) break;

        preencherSelect(select, pool);
        select.disabled = false;
        slotIndex++;
    }

    // bloqueio de duplicados
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