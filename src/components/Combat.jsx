import { useState, useMemo, useEffect, useRef } from 'react'
import { useCharacter } from '../context/CharacterContext'
import { getClasse, getBonusSaveRacial } from '../data/opcoes'
import { getModificadoresTamanho } from '../data/tamanho'
import { getBBABase, getProgressaoBBA } from '../data/bba'
import {
  getDeslocamento,
  deslocamentoPorRaca,
  bonusDeslocamentoPorClasse
} from '../data/deslocamento'
import Navigation from './Navigation'
import './Combat.css'

export default function Combat() {
  const { personagem, getModificador, atualizarCampo } = useCharacter()
  const [expandido] = useState(true)

  const hpMaxAnterior = useRef(0)

  const buildBreakdown = (parts) =>
    parts
      .map(({ label, value }) => {
        if (value === 0 || value == null) return null
        return `${label} ${value > 0 ? `+${value}` : value}`
      })
      .filter(Boolean)
      .join(' · ')

  const [caValores] = useState({
    armadura: 0,
    escudo: 0,
    natural: 0,
    deflexao: 0,
    outros: 0,
  })

  const classe = getClasse(personagem.classe)
  const nivel = personagem.level_class || 1

  const conMod = getModificador('constituicao')
  const dexMod = getModificador('destreza')
  const forMod = getModificador('forca')
  const sabMod = getModificador('sabedoria')

  const bonusSaveRacial = getBonusSaveRacial(personagem.race)
  const modTamanho = getModificadoresTamanho(personagem.tamanho || '')
  const progressao = getProgressaoBBA(personagem.classe)

  const bba = useMemo(() => {
    const base = getBBABase(progressao, nivel)
    return base + modTamanho.bba
  }, [progressao, nivel, modTamanho])

  const bbaBase = useMemo(() => getBBABase(progressao, nivel), [progressao, nivel])

  const agarrarTotal = bbaBase + forMod + modTamanho.agarrar

  const hpMax = useMemo(() => {
    if (!classe.dadoVida) return 0

    const dado = classe.dadoVida
    let total = Math.max(1, dado + conMod)

    if (nivel > 1) {
      const hpMedio = Math.floor(dado / 2)
      for (let i = 2; i <= nivel; i++) {
        total += Math.max(1, hpMedio + conMod)
      }
    }

    return total
  }, [classe, nivel, conMod])

  useEffect(() => {
    const hpAtual = personagem.combat?.hp?.atual
    const hpAnterior = hpMaxAnterior.current

    const hpNaoDefinido = hpAtual == null
    const hpEstavaCheio = hpAtual === hpAnterior

    if ((hpNaoDefinido || hpEstavaCheio) && hpMax > 0) {
      atualizarCampo('combat', {
        ...personagem.combat,
        hp: {
          ...personagem.combat?.hp,
          atual: hpMax
        }
      })
    }

    hpMaxAnterior.current = hpMax
  }, [hpMax])

  const deslocamento = useMemo(
    () => getDeslocamento(personagem.race, personagem.classe),
    [personagem.race, personagem.classe]
  )

  const showDeslocamento =
    personagem.race && personagem.race !== 'selecione'

  const caNormal =
    10 +
    caValores.armadura +
    caValores.escudo +
    dexMod +
    modTamanho.ca +
    caValores.natural +
    caValores.deflexao +
    caValores.outros

  const caToque = 10 + dexMod + modTamanho.ca

  const caSurpresa =
    10 +
    caValores.armadura +
    caValores.escudo +
    modTamanho.ca +
    caValores.natural +
    caValores.deflexao +
    caValores.outros

  const fortTotal = (classe.fort || 0) + conMod + (bonusSaveRacial.fort || 0)
  const refTotal = (classe.ref || 0) + dexMod + (bonusSaveRacial.ref || 0)
  const vonTotal = (classe.von || 0) + sabMod + (bonusSaveRacial.von || 0)

  return (
    <div className="combat-container">

      {expandido && (
        <div className="combat-content">

          {/* BBA */}
          <div className="combat-stat">
            <div className="stat-label">BBA</div>
            <div className="stat-value">
              {bba >= 0 ? `+${bba}` : bba}
            </div>
            <div className="stat-detail">
              {buildBreakdown([
                { label: 'Base', value: bbaBase },
                { label: 'For', value: forMod },
                { label: 'Tam', value: modTamanho.bba }
              ])}
            </div>
          </div>

          {/* Agarrar */}
          <div className="combat-stat">
            <div className="stat-label">Agarrar</div>
            <div className="stat-value">
              {agarrarTotal >= 0 ? `+${agarrarTotal}` : agarrarTotal}
            </div>
            <div className="stat-detail">
              {buildBreakdown([
                { label: 'Base', value: bbaBase },
                { label: 'For', value: forMod },
                { label: 'Tam', value: modTamanho.agarrar }
              ])}
            </div>
          </div>

          {/* Iniciativa */}
          <div className="combat-stat">
            <div className="stat-label">Iniciativa</div>
            <div className="stat-value">
              {dexMod >= 0 ? `+${dexMod}` : dexMod}
            </div>
            {dexMod !== 0 && (
              <div className="stat-detail">
                Des {dexMod > 0 ? `+${dexMod}` : dexMod}
              </div>
            )}
          </div>

          {/* Deslocamento */}
          <div className="combat-stat">
            <div className="stat-label">Desloc</div>
            <div className="stat-value">
              {showDeslocamento ? `${deslocamento}m` : '—'}
            </div>
          </div>

          {/* PV */}
          <div className="combat-stat compact">
            <div className="stat-label">PV</div>
            <div className="stat-value">{hpMax}</div>
          </div>

          {/* RM */}
          <div className="combat-stat compact">
            <div className="stat-label">RM</div>
            <div className="stat-value">0</div>
          </div>

          {/* Toque */}
          <div className="combat-stat compact">
            <div className="stat-label">Toque</div>
            <div className="stat-value small">{caToque}</div>
          </div>

          {/* CA */}
          <div className="combat-stat compact">
            <div className="stat-label">CA</div>
            <div className="stat-value small">{caNormal}</div>
          </div>

          {/* Surpresa */}
          <div className="combat-stat compact">
            <div className="stat-label">Surp</div>
            <div className="stat-value small">{caSurpresa}</div>
          </div>

          {/* Saves */}
          <div className="combat-stat compact">
            <div className="stat-label">Fort</div>
            <div className="stat-value small">{fortTotal}</div>
          </div>

          <div className="combat-stat compact">
            <div className="stat-label">Ref</div>
            <div className="stat-value small">{refTotal}</div>
          </div>

          <div className="combat-stat compact">
            <div className="stat-label">Von</div>
            <div className="stat-value small">{vonTotal}</div>
          </div>

        </div>
      )}

      <Navigation prev="/atributos" next="/pericias" />
    </div>
  )
}