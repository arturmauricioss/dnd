export function formatarData(dataStr: string): string {
  const data = new Date(dataStr);
  const agora = new Date();
  const diffMs = agora.getTime() - data.getTime();
  const diffDias = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDias === 0) return 'Hoje';
  if (diffDias === 1) return 'Ontem';
  if (diffDias < 7) return `Há ${diffDias} dias`;
  return data.toLocaleDateString('pt-BR');
}
