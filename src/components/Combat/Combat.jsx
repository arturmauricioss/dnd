import { useState, useMemo } from 'react'
import { useCharacter } from '../../context/CharacterContext'
import { getClasse } from '../Classes/classesData'
import { getModificadoresTamanho } from './tamanhoData'
import { getBBABase, getProgressaoBBA, bonusRacialResistencia } from './bbaData'
import { getDeslocamento, deslocamentoPorRaca } from './deslocamentoData'
import { bonusDeslocamentoPorClasse } from '../Classes/classesData'
import { Navigation } from '../global'
import './Combat.css'

export default function Combat() {
  const { personagem, getModificador } = useCharacter()
  const [expandido] = useState(true)

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

  const bonusSaveRacial = bonusRacialResistencia[personagem.race] || { fort: 0, ref: 0, von: 0 }
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
            <div className="stat-label">Bonus base de Ataque</div>
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
            <div className="stat-label">Deslocamento</div>
            <div className="stat-value">
              {showDeslocamento ? `${deslocamento}m` : '—'}
            </div>
            {showDeslocamento && deslocamento > 0 && (
              <div className="stat-detail">
                {buildBreakdown([
                  { label: 'Raça', value: deslocamentoPorRaca[personagem.race] || 6 },
                  { label: 'Classe', value: bonusDeslocamentoPorClasse[personagem.classe] || 0 }
                ])}
              </div>
            )}
          </div>

          {/* PV */}
          <div className="combat-stat compact">
            <div className="stat-label">Pontos de VIda</div>
            <div className="stat-value">{hpMax}</div>
            {hpMax > 0 && (
              <div className="stat-detail">
                {buildBreakdown([
                  { label: 'Dado', value: classe.dadoVida },
                  { label: 'Con', value: conMod },
                  { label: 'Nv', value: nivel > 1 ? (nivel - 1) * Math.max(1, Math.floor(classe.dadoVida / 2) + conMod) : 0 }
                ])}
              </div>
            )}
          </div>

          {/* RM */}
          <div className="combat-stat compact">
            <div className="stat-label">Resistência mágica</div>
            <div className="stat-value">0</div>
          </div>


          {/* CA */}
          <div className="combat-stat compact">
            <div className="stat-label">Classe de Armadura</div>
            <div className="stat-value small">{caNormal}</div>
            {caNormal > 0 && (
              <div className="stat-detail">
                {buildBreakdown([
                  { label: '10', value: 0 },
                  { label: 'Arm', value: caValores.armadura },
                  { label: 'Esc', value: caValores.escudo },
                  { label: 'Des', value: dexMod },
                  { label: 'Tam', value: modTamanho.ca },
                  { label: 'Nat', value: caValores.natural },
                  { label: 'Def', value: caValores.deflexao },
                  { label: 'Out', value: caValores.outros }
                ])}
              </div>
            )}
          </div>

          {/* Toque */}
          <div className="combat-stat compact">
            <div className="stat-label">Toque</div>
            <div className="stat-value small">{caToque}</div>
            {caToque > 0 && (
              <div className="stat-detail">
                {buildBreakdown([
                  { label: '10', value: 0 },
                  { label: 'Des', value: dexMod },
                  { label: 'Tam', value: modTamanho.ca }
                ])}
              </div>
            )}
          </div>


          {/* Surpresa */}
          <div className="combat-stat compact">
            <div className="stat-label">Surpresa</div>
            <div className="stat-value small">{caSurpresa}</div>
            {caSurpresa > 0 && (
              <div className="stat-detail">
                {buildBreakdown([
                  { label: '10', value: 0 },
                  { label: 'Arm', value: caValores.armadura },
                  { label: 'Esc', value: caValores.escudo },
                  { label: 'Tam', value: modTamanho.ca },
                  { label: 'Nat', value: caValores.natural },
                  { label: 'Def', value: caValores.deflexao },
                  { label: 'Out', value: caValores.outros }
                ])}
              </div>
            )}
          </div>

          {/* Saves */}
          <div className="combat-stat compact">
            <div className="stat-label">Fortitude</div>
            <div className="stat-value small">{fortTotal}</div>
            {fortTotal !== 0 && (
              <div className="stat-detail">
                {buildBreakdown([
                  { label: 'Classe', value: classe.fort },
                  { label: 'Con', value: conMod },
                  { label: 'Raça', value: bonusSaveRacial.fort }
                ])}
              </div>
            )}
          </div>

          <div className="combat-stat compact">
            <div className="stat-label">Reflexo</div>
            <div className="stat-value small">{refTotal}</div>
            {refTotal !== 0 && (
              <div className="stat-detail">
                {buildBreakdown([
                  { label: 'Classe', value: classe.ref },
                  { label: 'Des', value: dexMod },
                  { label: 'Raça', value: bonusSaveRacial.ref }
                ])}
              </div>
            )}
          </div>

          <div className="combat-stat compact">
            <div className="stat-label">Vontade</div>
            <div className="stat-value small">{vonTotal}</div>
            {vonTotal !== 0 && (
              <div className="stat-detail">
                {buildBreakdown([
                  { label: 'Classe', value: classe.von },
                  { label: 'Sab', value: sabMod },
                  { label: 'Raça', value: bonusSaveRacial.von }
                ])}
              </div>
            )}
          </div>

        </div>
      )}

      <Navigation prev="/atributos" next="/pericias" />
    </div>
  )
}