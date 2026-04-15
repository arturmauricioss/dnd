export { tabelaDanoPorTamanho, getDanoPorTamanho, getPesoPorTamanho, todasArmas, armasNormalizadas } from './armas.js';
export { todasArmaduras, todosEscudos, armadurasNormalizadas, escudosNormalizados } from './armaduras.js';
export { todosItensNormalizados, ferramentasNormalizadas } from './itens.js';
export { dinheiroInicialClasse, getDinheiroInicial, itensPorClasse, getItensClasse } from './kit.js';

import { armasNormalizadas } from './armas.js';
import { armadurasNormalizadas, escudosNormalizados } from './armaduras.js';
import { todosItensNormalizados } from './itens.js';

export const todosItens = {
  ...armasNormalizadas,
  ...armadurasNormalizadas,
  ...escudosNormalizados,
  ...todosItensNormalizados
};

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