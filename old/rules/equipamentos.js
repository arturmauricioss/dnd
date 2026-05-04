import { getDanoPorTamanho, getPesoPorTamanho } from '@rules/armas'
import { armadurasNormalizadas, escudosNormalizados } from '@data/equipamentos/armadurasData'
import { armasNormalizadas } from '@data/equipamentos/armasData'
import { instrumentosNormalizados } from '@data/equipamentos/instrumentosData'
import { todosItensNormalizados } from '@data/equipamentos/itensData'

export { getDanoPorTamanho, getPesoPorTamanho }

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