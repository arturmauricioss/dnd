export function getImagemPath(racaId: string, genero: 'm' | 'f', numero: number): string {
  const raca = racaId
  const caminho = `/racas/${raca}_${genero}${numero.toString().padStart(2, '0')}.png`
  return caminho
}