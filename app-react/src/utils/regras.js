// src/utils/regras.js

export const getMod = (valor) => Math.floor((valor - 10) / 2);

export function calcularValorFinal(valorBase, bonusRacial, habilidade) {
    if (!valorBase || isNaN(valorBase)) return { total: "", mod: "" };

    // Limites de 3 a 18 (sua lógica do blur)
    let baseTratada = Math.max(3, Math.min(18, valorBase));
    
    let soma = baseTratada + bonusRacial;
    
    // Regra da inteligência mínima 3
    let valorFinal = (habilidade === "inteligencia") ? Math.max(3, soma) : soma;
    
    const mod = getMod(valorFinal);
    const modTexto = mod > 0 ? `+${mod}` : mod;

    return {
        base: baseTratada,
        total: valorFinal,
        mod: modTexto
    };
}