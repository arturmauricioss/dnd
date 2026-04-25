import { getDanoPorTamanho, getPesoPorTamanho } from './armasLogic'
import { getDinheiroInicial } from '../Classes/classesData'

import { armadurasNormalizadas, escudosNormalizados } from './armadurasData'
import { armasNormalizadas } from './armasData'
import { instrumentosNormalizados } from './instrumentosData'
import { todosItensNormalizados } from './itensData'

/* =========================
   EXPORTS BASE
========================= */

export { getDanoPorTamanho, getPesoPorTamanho, getDinheiroInicial }

export const todosItens = {
  ...armasNormalizadas,
  ...armadurasNormalizadas,
  ...escudosNormalizados,
  ...instrumentosNormalizados,
  ...todosItensNormalizados
}

/* =========================
   ITEM HELPERS
========================= */

export function getItemPorId(id) {
  if (!id) return null
  return todosItens[id] || null
}

export function isItemValido(id) {
  return !!todosItens[id]
}

export function getNomeItem(id) {
  return getItemPorId(id)?.nome || 'Item desconhecido'
}

export function getTipoItem(id) {
  return getItemPorId(id)?.tipo || null
}