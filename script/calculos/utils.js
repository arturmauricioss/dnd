export function getMod(valor) {
    if (!valor || valor < 1) return 0;
    return Math.floor((valor - 10) / 2);
}