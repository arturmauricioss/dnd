import { useMemo } from 'react'
import { useCharacter } from '../../context/CharacterContext'
import {
  calculatePontosPericia,
  calculatePontosGastos,
  calculateHabilidadesOrdenadas,
  calculatePericiaTotal,
  calculateMaxGrad,
  calculatePenalidadeArmadura
} from './periciasLogic'
import { periciasPorClasse } from './periciasData'
import { getBonusPericiaRacial } from '../Racas/bonusPericias'
import { getItemPorId } from '../Equipamentos/equipamentosLogic'
import { Navigation } from '../global'
import './Pericias.css'

export default function Pericias() {
  const { personagem, getModificador, atualizarCampo } = useCharacter()

  const { classe, level_class, race, equipment } = personagem
  const nivel = level_class || 1

  const pontosPericia = useMemo(() =>
    calculatePontosPericia({ classe, level_class: nivel, race }, getModificador),
  [classe, nivel, race, getModificador])

  // ✅ Penalidade vinda APENAS de armadura (sem peso/carga)
  const penalidadeArmadura = useMemo(() => {
    return calculatePenalidadeArmadura(personagem)
  }, [personagem])

  // ✅ Limite de DEX APENAS da armadura
  const dexMaxLimit = useMemo(() => {
    const armadura = equipment?.armor ? getItemPorId(equipment.armor) : null

    if (!armadura) return null

    return parseInt(armadura.dex_max?.replace('+', '') || 999)
  }, [equipment])

  const periciasState = useMemo(() => personagem.pericias || {}, [personagem.pericias])

  const handleGraduacaoChange = (nomePericia, valor) => {
    atualizarCampo('pericias', {
      ...periciasState,
      [nomePericia]: {
        ...periciasState[nomePericia],
        graduacao: valor,
      },
    })
  }

  const pontosGastos = useMemo(() =>
    calculatePontosGastos({ classe, level_class: nivel, race }, periciasState),
  [classe, nivel, race, periciasState])

  const pontosRestantes = pontosPericia - pontosGastos

  const podeIncrementar = (periciaNome, novoValor, valorAtual) => {
    if (novoValor <= valorAtual) return true
    const custo = periciasPorClasse[classe]?.includes(periciaNome) ? 1 : 2
    const custoAdicional = custo * (novoValor - valorAtual)
    return pontosRestantes >= custoAdicional
  }

  const habilidadesOrdenadas = useMemo(() =>
    calculateHabilidadesOrdenadas({ classe, level_class: nivel, race }),
  [classe, nivel, race])

  const renderPericia = (pericia) => {
    const estado = periciasState[pericia.nome] || { graduacao: 0, outros: 0 }
    const grad = estado.graduacao

    const personagemCalc = { ...personagem }
    const maxGrad = calculateMaxGrad(personagemCalc, pericia.nome)

    const total = calculatePericiaTotal(
      pericia,
      personagemCalc,
      periciasState,
      getModificador,
      dexMaxLimit
    )

    const eClasse = periciasPorClasse[classe]?.includes(pericia.nome)
    const bonusRacial = getBonusPericiaRacial(race, pericia.nome)

    // ✅ MODIFICADOR DE HABILIDADE (SEM PENALIDADE)
    let modHab = 0
    if (pericia.habilidade !== 'nenhuma') {
      modHab = getModificador(pericia.habilidade)

      if (pericia.habilidade === 'destreza' && dexMaxLimit !== null) {
        modHab = Math.min(modHab, dexMaxLimit)
      }
    }

    // ✅ PENALIDADE CORRIGIDA (SEM BUG DE SINAL)
    const penalidadeBase = Math.abs(penalidadeArmadura)
    const penalidadePericia = penalidadeBase * (pericia.penalidade || 0)

    // ✅ OUTROS = racial + manual - penalidade
    const valorOutrosDisplay =
      (estado.outros || 0) +
      bonusRacial -
      penalidadePericia

    const nomeClasse = `pericia-nome ${eClasse ? 'pericia-classe' : ''} ${
      pericia.somente_treinado && grad === 0 ? 'pericia-treinada' : ''
    }`

    return (
      <div key={pericia.nome} className="pericia-row">
        <span className={nomeClasse}>
          {pericia.nome}
          {pericia.somente_treinado && grad === 0 && (
            <span className="pericia-marcador" title="Requer treinamento">*</span>
          )}
        </span>

        <span className="pericia-total">{total}</span>

        <input
          type="number"
          min="0"
          max={maxGrad}
          value={grad || ''}
          onChange={(e) => {
            let val = parseInt(e.target.value) || 0
            val = Math.min(val, maxGrad)
            if (!podeIncrementar(pericia.nome, val, grad)) return
            handleGraduacaoChange(pericia.nome, val)
          }}
        />

        <span className="pericia-hab">
          {modHab >= 0 ? `+${modHab}` : modHab}
        </span>

        <span className="pericia-outros">
          {valorOutrosDisplay >= 0 ? `+${valorOutrosDisplay}` : valorOutrosDisplay}
        </span>
      </div>
    )
  }

  return (
    <div className="pericias-container">

      <div className="pericias-info">
        <div className="info-item">
          <span>Total</span>
          <strong>{pontosPericia}</strong>
        </div>

        <div className="info-item">
          <span>Saldo</span>
          <strong>{pontosRestantes}</strong>
        </div>

        <div className="info-item">
          <span>Máx. Grad.</span>
          <strong>{nivel + 3}</strong>
        </div>
      </div>

      <div className="pericias-list-mobile">
        <div className="pericias-header">
          <span>Perícia</span>
          <span>Total</span>
            <span>Grad</span>
            <span>Hab</span>
            <span>Outros</span>
        </div>
        {[...habilidadesOrdenadas.primeira, ...habilidadesOrdenadas.segunda]
          .sort((a, b) => b.total - a.total)
          .map(renderPericia)}
      </div>

      <div className="pericias-list">
        <div className="pericias-coluna">
          <div className="pericias-header">
            <span>Perícia</span>
            <span>Total</span>
            <span>Grad</span>
            <span>Hab</span>
            <span>Outros</span>
          </div>
          {habilidadesOrdenadas.primeira.map(renderPericia)}
        </div>

        <div className="pericias-coluna">
          <div className="pericias-header">
            <span>Perícia</span>
            <span>Total</span>
            <span>Grad</span>
            <span>Hab</span>
            <span>Outros</span>
          </div>
          {habilidadesOrdenadas.segunda.map(renderPericia)}
        </div>
      </div>

      <Navigation prev="/talentos" next="/idiomas" />
    </div>
  )
}