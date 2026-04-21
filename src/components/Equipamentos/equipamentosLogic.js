import { getDanoPorTamanho, getPesoPorTamanho } from './armasLogic'
import { getDinheiroInicial } from '../Classes/classesData'
import { armadurasNormalizadas, escudosNormalizados } from './armadurasData'
import { todosItensNormalizados } from './itensData'
import { armasNormalizadas } from './armasData'
import { instrumentosNormalizados } from './instrumentosData'
import { normalizarPeso, getPesoItem, capacidadeCargaPorForca, tabelaCarga, getCapacidade, getLoad } from '../Inventario/encumbranceData'

export { getDanoPorTamanho, getPesoPorTamanho, getDinheiroInicial }

export { normalizarPeso, getPesoItem, getCapacidade, getLoad, capacidadeCargaPorForca, tabelaCarga }

export function getCapacidadeMontaria(montaria) {
  if (!montaria) return { leve: 0, media: 0, maxima: 0 }
  
  if (montaria.capacidade && !montaria.forca) {
    return {
      leve: montaria.capacidade.leve || montaria.capacidade.light || 0,
      media: montaria.capacidade.media || montaria.capacidade.medium || 0,
      maxima: montaria.capacidade.maxima || montaria.capacidade.heavy || 0
    }
  }
  
  if (montaria.forca) {
    const data = capacidadeCargaPorForca[montaria.forca] || capacidadeCargaPorForca[10]
    return {
      leve: (data.leve || data.light || 0) * 1.5,
      media: (data.media || data.medium || 0) * 1.5,
      maxima: (data.maxima || data.heavy || 0) * 1.5
    }
  }
  
  return { leve: 0, media: 0, maxima: 0 }
}

export function isMontariaOuTransporte(item) {
  return item?.tipo === 'montaria' || item?.tipo === 'veiculo'
}

export function getPenalidadeTotal(armor, shield) {
  let penalidade = 0;

  if (armor?.penalidade) {
    const val = Number(armor.penalidade);
    if (!isNaN(val)) penalidade += Math.abs(val);
  }

  if (shield?.penalidade) {
    const val = Number(shield.penalidade);
    if (!isNaN(val)) penalidade += Math.abs(val);
  }

  return penalidade;
}

export const todosItens = {
  ...armasNormalizadas,
  ...armadurasNormalizadas,
  ...escudosNormalizados,
  ...instrumentosNormalizados,
  ...todosItensNormalizados
};

export function getItemPorId(id) {
  return todosItens[id] || null
}

export function getPesoItemComQuantidade(item, quantidade = 1) {
  return getPesoItem(item) * quantidade
}