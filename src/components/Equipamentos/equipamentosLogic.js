import { getDanoPorTamanho, getPesoPorTamanho } from './armasLogic'
import { getDinheiroInicial } from '../Classes/classesData'
import { armadurasNormalizadas, escudosNormalizados } from './armadurasData'
import { todosItensNormalizados } from './itensData'
import { armasNormalizadas } from './armasData'
import { normalizarPeso, getPesoItem, capacidadeCargaPorForca, tabelaCarga, getCapacidade, getLoad } from '../Inventario/encumbranceData'

export { getDanoPorTamanho, getPesoPorTamanho, getDinheiroInicial }

export { normalizarPeso, getPesoItem, getCapacidade, getLoad, capacidadeCargaPorForca, tabelaCarga }

export function getCapacidadeMontaria(montaria) {
  if (!montaria) return { light: 0, medium: 0, heavy: 0 }
  
  if (montaria.capacidade) {
    return montaria.capacidade
  }
  
  if (montaria.forca) {
    const forca = montaria.forca
    const capacidadeBase = capacidadeCargaPorForca[forca] || capacidadeCargaPorForca[10]
    const modificado = {
      light: capacidadeBase.light * 1.5,
      medium: capacidadeBase.medium * 1.5,
      heavy: capacidadeBase.heavy * 1.5
    }
    return modificado
  }
  
  return { light: 0, medium: 0, heavy: 0 }
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
  ...todosItensNormalizados
};

export function getItemPorId(id) {
  return todosItens[id] || null
}

export function getPesoItemComQuantidade(item, quantidade = 1) {
  return getPesoItem(item) * quantidade
}