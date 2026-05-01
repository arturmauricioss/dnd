// ============================================
// ENGINE - Orchestration (combina regras)
// ============================================

import { calcularBBA, calcularBBATamanho, calcularHP, calcularCA, calcularCAToque, calcularSave, getModificador } from './combat'
import { getCapacidade, getCargaAtual, getPesoTotalEquipamentos } from './carga'
import { getTamanhoPorRaca, getBonusRacial, getBonusResistencia } from './racas'

// --- Combat Engine ---
export function getDadosCombate(personagem, getModificador) {
  const { race, classe: classeId, level_class: nivel, equipment, atributos, habilidadesEspeciais: habilidades } = personagem

  // Modificadores
  const conMod = getModificador('constituicao')
  const dexMod = getModificador('destreza')
  const forMod = getModificador('forca')
  const sabMod = getModificador('sababilidade')

  // Tabela
  const tamanho = getTamanhoPorRaca(race)

  // BBA
  const bbaBase = calcularBBA(classeId, nivel)
  const bbaTamanho = calcularBBATamanho(tamanho)
  const bba = bbaBase + bbaTamanho

  // HP
  const hpMax = calcularHP(classeId, nivel, conMod)

  // CA
  const caBase = equipment?.armor || 0
  const caNormal = calcularCA(caBase, dexMod, tamanho)
  const caToque = calcularCAToque(dexMod, tamanho)

  // Saves
  const classe = { fort: 0, ref: 0, von: 0 } // carregar de classesData
  const bonusRacial = getBonusResistencia(race)

  const fort = calcularSave(classe.fort || 0, conMod, bonusRacial.fort || 0)
  const ref = calcularSave(classe.ref || 0, dexMod, bonusRacial.ref || 0)
  const von = calcularSave(classe.von || 0, sabMod, bonusRacial.von || 0)

  // Agarrar
  const agarrar = bbaBase + forMod + (tamanho === 'pequena' ? -4 : tamanho === 'grande' ? 4 : 0)

  // Carga
  const forca = atributos?.forca || 10
  const capacidade = getCapacidade(forca, tamanho)
  const pesoTotal = getPesoTotalEquipamentos(equipment, race, classeId)
  const cargaAtual = getCargaAtual(pesoTotal, capacidade)

  // Deslocamento
  const deslocamentoBase = 6 // carregar de racasData
  const penalidadeCarga = cargaAtual === 'excessiva' ? 100 : cargaAtual === 'pesada' ? 50 : cargaAtual === 'media' ? 25 : 0

  return {
    bba,
    hpMax,
    caNormal,
    caToque,
    fort,
    ref,
    von,
    agarrar,
    carga: {
      pesoTotal,
      cargaAtual,
      capacidade
    },
    deslocamento: {
      base: deslocamentoBase,
      penalidade: penalidadeCarga
    },
    habilidades: habilidades || []
  }
}

// --- Personagem Engine ---
export function criarPersonagem(dados) {
  // Orchestration completo da criação
  return dados
}