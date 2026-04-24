import { getClasse, bonusDeslocamentoPorClasse } from '../Classes/classesData'
import { getModificadoresTamanho } from './tamanhoData'
import { getBBABase, getProgressaoBBA } from './bbaData'
import { deslocamentoPorRaca, bonusRacialResistencia } from '../Racas/racasData'
import { caValoresIniciais } from './combatData'
import { getItemPorId, getPesoItem, getCapacidade, tabelaCarga } from '../Equipamentos/equipamentosLogic'

export function calcularBBA(classeId, nivel) {
  const progressao = getProgressaoBBA(classeId)
  return getBBABase(progressao, nivel)
}

export function calcularHP(classeId, nivel, conMod) {
  const classe = getClasse(classeId)
  if (!classe?.dadoVida) return 0

  const dado = classe.dadoVida
  let total = Math.max(1, dado + conMod)

  if (nivel > 1) {
    const hpMedio = Math.floor(dado / 2)
    for (let i = 2; i <= nivel; i++) {
      total += Math.max(1, hpMedio + conMod)
    }
  }

  return total
}

export function calcularCA(caValores, dexMod, modTamanho) {
  return (
    10 +
    caValores.armadura +
    caValores.escudo +
    dexMod +
    modTamanho.ca +
    caValores.natural +
    caValores.deflexao +
    caValores.outros
  )
}

export function calcularCAToque(dexMod, modTamanho) {
  return 10 + dexMod + modTamanho.ca
}

export function calcularCASurpresa(caValores, modTamanho) {
  return (
    10 +
    caValores.armadura +
    caValores.escudo +
    modTamanho.ca +
    caValores.natural +
    caValores.deflexao +
    caValores.outros
  )
}

function getFaixaDeslocamento(deslocamento) {
  if (deslocamento === 12) return 12
  if (deslocamento === 9) return 9
  return 6
}

function aplicarPenalidadeCargaDeslocamento(deslocamento, cargaAtual, race) {
  if (race === 'anao') return deslocamento
  if (cargaAtual === 'leve') return deslocamento
  if (cargaAtual === 'excessiva') return 0

  const faixa = getFaixaDeslocamento(deslocamento)

  const tabela = {
    12: { media: 9, pesada: 6 },
    9: { media: 6, pesada: 6 },
    6: { media: 4.5, pesada: 4.5 },
  }

  return tabela[faixa]?.[cargaAtual] ?? deslocamento
}

export function getDadosCombate(personagem, getModificador) {
  const { race, classe: classeId, level_class: nivel, equipment } = personagem

  const classe = getClasse(classeId)

  const conMod = getModificador('constituicao')
  const dexMod = getModificador('destreza')
  const forca = (personagem.atributos?.forca || 10) + (personagem.atributosRacial?.forca || 0)
  const forMod = getModificador('forca')
  const sabMod = getModificador('sabedoria')

  const modTamanho = getModificadoresTamanho(personagem.tamanho || '')

  const progressao = getProgressaoBBA(classeId)
  const bbaBase = getBBABase(progressao, nivel)
  const bba = calcularBBA(classeId, nivel)

  const agarrarTotal = bbaBase + forMod + modTamanho.agarrar

  const hpMax = calcularHP(classeId, nivel, conMod)

  const deslocamentoBase = deslocamentoPorRaca[race] || 6
  const bonusClasseMovimento = classeId === 'barbaro' ? (bonusDeslocamentoPorClasse[classeId] || 0) : 0

  const caValores = caValoresIniciais

  const capacidade = (() => {
    const cap = getCapacidade(forca)
    return {
      leve: cap.leve || cap.light || 0,
      media: cap.media || cap.medium || 0,
      pesada: cap.pesada || cap.heavy || 0,
    }
  })()

  const pesoTotal =
    (equipment?.weapons || []).reduce(
      (t, a) => t + (getPesoItem(getItemPorId(a.id)) || 0) * (a.quantidade || 1),
      0
    ) +
    (equipment?.itens || []).reduce(
      (t, i) => t + (getPesoItem(getItemPorId(i.id)) || 0) * (i.quantidade || 1),
      0
    )

  const cargaAtual =
    pesoTotal <= capacidade.leve
      ? 'leve'
      : pesoTotal <= capacidade.media
      ? 'media'
      : pesoTotal <= capacidade.pesada
      ? 'pesada'
      : 'excessiva'

  const dadosCarga = tabelaCarga[cargaAtual] || {}

  const usandoArmaduraPesada = false // ajustar depois quando implementar armadura

  const bonusRapidoAtivo =
    classeId === 'barbaro' &&
    cargaAtual !== 'pesada' &&
    !usandoArmaduraPesada
  const deslocamentoSemCarga = deslocamentoBase + (bonusRapidoAtivo ? bonusClasseMovimento : 0)

  const deslocamento = aplicarPenalidadeCargaDeslocamento(deslocamentoSemCarga, cargaAtual, race)
  const penalidadeCargaDeslocamento = Math.max(0, deslocamentoSemCarga - deslocamento)

  const dexMaxFinal = Math.min(
    dadosCarga?.maxDex ?? 999,
    999
  )

  const dexModLimitado = Math.min(dexMod, dexMaxFinal)

  const caNormal = calcularCA(caValores, dexModLimitado, modTamanho)
  const caToque = calcularCAToque(dexModLimitado, modTamanho)
  const caSurpresa = calcularCASurpresa(caValores, modTamanho)

  const bonusSaveRacial = bonusRacialResistencia[race] || { fort: 0, ref: 0, von: 0 }

  const saves = {
    fort: {
      total: (classe.fort || 0) + conMod + bonusSaveRacial.fort,
      classe: classe.fort || 0,
      atributo: conMod,
      racial: bonusSaveRacial.fort,
    },
    ref: {
      total: (classe.ref || 0) + dexModLimitado + bonusSaveRacial.ref,
      classe: classe.ref || 0,
      atributo: dexModLimitado,
      racial: bonusSaveRacial.ref,
    },
    von: {
      total: (classe.von || 0) + sabMod + bonusSaveRacial.von,
      classe: classe.von || 0,
      atributo: sabMod,
      racial: bonusSaveRacial.von,
    },
  }

  return {
    bba,
    bbaBase,
    hpMax,
    deslocamento,
    caNormal,
    caToque,
    caSurpresa,
    fort: saves.fort.total,
    ref: saves.ref.total,
    von: saves.von.total,
    savesDetalhes: saves,
    agarrar: agarrarTotal,
    detalhes: {
      deslocamentoBase,
      deslocamentoBonus: bonusRapidoAtivo ? bonusClasseMovimento : 0,
    },
    encumbrance: {
      pesoTotal,
      cargaAtual,
      capacidade,
      dadosCarga,
      penalidadeCargaDeslocamento,
    },
    dexMaxFinal,
  }
}