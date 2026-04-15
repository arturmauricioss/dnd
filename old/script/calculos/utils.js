export function getMod(valor) {
    if (!valor || valor < 1) return 0;
    return Math.floor((valor - 10) / 2);
}
export function normalizarTexto(texto) {
    return texto
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim();
}