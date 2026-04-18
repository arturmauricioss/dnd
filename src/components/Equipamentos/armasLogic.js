import { tabelaDanoPorTamanho } from './armasData'

export function getDanoPorTamanho(dano, tamanho) {
  if (!dano) return "";
  return tabelaDanoPorTamanho[dano]?.[tamanho] || dano;
}

export function getPesoPorTamanho(pesoNum, tamanho) {
  if (!pesoNum || tamanho === 'medio') return pesoNum;
  
  if (tamanho === 'pequeno') {
    return pesoNum / 2;
  } else if (tamanho === 'grande') {
    return pesoNum * 2;
  }
  
  return pesoNum;
}