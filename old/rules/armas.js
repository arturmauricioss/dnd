import { tabelaDanoPorTamanho } from '@data/equipamentos/armasData'

export function getDanoPorTamanho(dano, tamanho) {
  const tam = tamanho === 'pequena' ? 'pequeno' : tamanho === 'media' ? 'medio' : tamanho
  if (!dano) return "";
  return tabelaDanoPorTamanho[dano]?.[tam] || dano;
}

export function getPesoPorTamanho(pesoNum, tamanho) {
  const tam = tamanho === 'pequena' ? 'pequeno' : tamanho === 'media' ? 'medio' : tamanho
  if (!pesoNum || tam === 'medio') return pesoNum;
  
  if (tam === 'pequeno') {
    return pesoNum / 2;
  } else if (tam === 'grande') {
    return pesoNum * 2;
  }
  
  return pesoNum;
}