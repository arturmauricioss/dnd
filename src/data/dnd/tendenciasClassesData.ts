export const tendenciasPermitidasPorClasse: Record<string, string[]> = {
  barbaro: ['non_lawful'],
  bardo: ['non_lawful'],
  druida: ['true_neutral', 'neutral_good', 'neutral_evil', 'lawful_neutral', 'chaotic_neutral'],
  monge: ['lawful_good', 'lawful_neutral', 'lawful_evil'],
  paladino: ['lawful_good']
}

export function tendenciaPermitida(classeId: string, tendenciaId: string): boolean {
  const permitidas = tendenciasPermitidasPorClasse[classeId]
  if (!permitidas) return true

  if (permitidas.includes('non_lawful')) {
    return !tendenciaId.startsWith('lawful')
  }
  
  return permitidas.includes(tendenciaId)
}