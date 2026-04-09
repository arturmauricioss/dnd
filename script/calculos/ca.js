export function calcularCA({ raca, modDex }) {
    const caBase = 10;
    const modTamanho = (raca === "gnomo" || raca === "halfling") ? 1 : 0;

    const armor = parseBonus(document.querySelector("#armory .ar_bonus_ca")?.value);
    const shield = parseBonus(document.querySelector("#shield .ar_bonus_ca")?.value);

    let bonusProtecao = 0;
    document.querySelectorAll(".protect .ar_bonus_ca").forEach(el => {
        bonusProtecao += parseBonus(el.value);
    });

    const setAll = (selector, val) => {
        document.querySelectorAll(selector).forEach(el => el.value = val);
    };

    setAll(".ca_base", caBase);
    setAll(".ca_armor", armor);
    setAll(".ca_shield", shield);
    setAll(".ca_dex", modDex);
    setAll(".ca_size", modTamanho);
    setAll(".ca_natural", 0);

    // limpa antes
    document.querySelectorAll(".inativo").forEach(el => {
        el.classList.remove("inativo");
    });

    // TOQUE
    marcarInativoPorClasseCSS("ca_toque_armor");
    marcarInativoPorClasseCSS("ca_toque_shield");
    marcarInativoPorClasseCSS("ca_toque_natural");

    // SURPRESA
    marcarInativoPorClasseCSS("ca_surpresa_dex");

    const caNormal = caBase + armor + shield + modDex + modTamanho + bonusProtecao;
    const caToque = caBase + modDex + modTamanho;
    const caSurpresa = caBase + armor + shield + modTamanho + bonusProtecao;

    document.getElementById("ca_final").value = caNormal;
    document.getElementById("ca_toque_total").value = caToque;
    document.getElementById("ca_surpresa_total").value = caSurpresa;
}

// helpers internos
function parseBonus(valor) {
    if (!valor) return 0;
    const numero = parseInt(valor.toString().replace(/[^\d-]/g, ""));
    return isNaN(numero) ? 0 : numero;
}

function marcarInativoPorClasseCSS(classe) {
    document.querySelectorAll(`.${classe}`).forEach(el => {
        el.value = "X";
        el.classList.add("inativo");
    });
}