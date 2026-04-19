import { getDanoPorTamanho, getPesoPorTamanho } from './armasLogic'
import { getDinheiroInicial } from '../Classes/classesData'
import { armadurasNormalizadas, escudosNormalizados } from './armadurasData'
import { todosItensNormalizados } from './itensData'
import { armasNormalizadas } from './armasData'

export { getDanoPorTamanho, getPesoPorTamanho, getDinheiroInicial }

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