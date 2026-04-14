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
import './Combat.css'

export default function Combat() {
  const { personagem, getModificador, atualizarCampo } = useCharacter()
  const [expandido, setExpandido] = useState(true)
  const [caHover, setCaHover] = useState(null)

  const hpMaxAnterior = useRef(0)

  const [caValores, setCaValores] = useState({
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

  const bonusSaveRacial = getBonusSaveRacial(personagem.race)
  const modTamanho = getModificadoresTamanho(personagem.tamanho || '')
  const progressao = getProgressaoBBA(personagem.classe)

  const bba = useMemo(() => {
    const base = getBBABase(progressao, nivel)
    return base + modTamanho.bba
  }, [progressao, nivel, modTamanho])

  const bbaBase = useMemo(() => {
    return getBBABase(progressao, nivel)
  }, [progressao, nivel])

  const hpMax = useMemo(() => {
    if (!classe.dadoVida) return 0

    const dado = classe.dadoVida

    if (nivel === 1) {
      return dado + conMod
    }

    const hpMedio = Math.floor(dado / 2)
    const hpAdicional = (nivel - 1) * (hpMedio + conMod)

    return dado + conMod + hpAdicional
  }, [classe, nivel, conMod])

  /*
    Atualiza HP atual:
    - se nunca foi definido -> define hpMax
    - se estava cheio antes -> acompanha novo hpMax
    - se jogador perdeu vida manualmente -> mantém valor
  */
  useEffect(() => {
    const hpAtual = personagem.combat?.hp?.atual
    const hpAnterior = hpMaxAnterior.current

    const hpNaoDefinido =
      hpAtual === undefined || hpAtual === null

    const hpEstavaCheio =
      hpAtual === hpAnterior

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

  const deslocamento = useMemo(() => {
    return getDeslocamento(personagem.race, personagem.classe)
  }, [personagem.race, personagem.classe])

  const deslocBase =
    personagem.race && personagem.race !== 'selecione'
      ? deslocamentoPorRaca[personagem.race] || 0
      : 0

  const deslocBonus =
    personagem.race && personagem.race !== 'selecione'
      ? bonusDeslocamentoPorClasse[personagem.classe] || 0
      : 0

  const showDeslocamento =
    personagem.race && personagem.race !== 'selecione'

  const detalheDeslocamento = showDeslocamento
    ? `Raça ${deslocBase}${deslocBonus > 0 ? ` · Classe +${deslocBonus}` : ''}`
    : ''

  const caBase = 10

  const caNormal =
    caBase +
    caValores.armadura +
    caValores.escudo +
    dexMod +
    modTamanho.ca +
    caValores.natural +
    caValores.deflexao +
    caValores.outros

  const caToque =
    caBase +
    dexMod +
    modTamanho.ca

  const caSurpresa =
    caBase +
    caValores.armadura +
    caValores.escudo +
    modTamanho.ca +
    caValores.natural +
    caValores.deflexao +
    caValores.outros

  const fortBase = classe.fort || 0
  const fortRacial = bonusSaveRacial.fort
  const fortTotal = fortBase + fortRacial

  const refBase = classe.ref || 0
  const refRacial = bonusSaveRacial.ref
  const refTotal = refBase + refRacial

  const vonBase = classe.von || 0
  const vonRacial = bonusSaveRacial.von
  const vonTotal = vonBase + vonRacial

  return (
    <div className="combat-container">
      <div className="section-header">
        <h3>Combate</h3>
        <button className="btn-collapse" onClick={() => setExpandido(!expandido)}>
          {expandido ? '▼' : '▶'}
        </button>
      </div>
      {expandido && (
        <div>
          <div className="combat-row">
            <div className="combat-stat">
              <div className="stat-label">BBA</div>
              <div className="stat-value">
                {bba >= 0 ? `+${bba}` : bba}
              </div>
              <div className="stat-detail">
                Base +{bbaBase} · Tam {modTamanho.bba >= 0 ? `+${modTamanho.bba}` : modTamanho.bba}
              </div>
            </div>

            <div className="combat-stat">
              <div className="stat-label">Iniciativa</div>
              <div className="stat-value">
                {dexMod >= 0 ? `+${dexMod}` : dexMod}
              </div>
              <div className="stat-detail">Dex</div>
            </div>

            <div className="combat-stat">
              <div className="stat-label">Desloc</div>
              <div className="stat-value">
                {showDeslocamento ? `${deslocamento}m` : '—'}
              </div>
              <div className="stat-detail">
                {detalheDeslocamento}
              </div>
            </div>
          </div>

          <div className="combat-block">
            <span className="combat-block-label">Pontos de Vida</span>

            <div className="pv-row">
              <input
                type="number"
                className="combat-pv-input"
                value={personagem.combat?.hp?.atual ?? hpMax}
                onChange={(e) =>
                  atualizarCampo('combat', {
                    ...personagem.combat,
                    hp: {
                      ...personagem.combat?.hp,
                      atual: parseInt(e.target.value) || 0
                    }
                  })
                }
              />

              <strong className="combat-pv-max">
                / {hpMax}
              </strong>
            </div>
          </div>

        <div className="combat-block">
          <span className="combat-block-label">Res Mágica</span>
          <strong className="rm-value">0</strong>
        </div>

        <div className="ca-layout">
          <div
            className="ca-total"
            onMouseEnter={() => setCaHover('normal')}
            onMouseLeave={() => setCaHover(null)}
          >
            <span className="combat-block-label">CA Total</span>
            <strong className="ca-total-value">{caNormal}</strong>
          </div>

          <div className="ca-side-values">
            <div className="ca-side-box">
              <span>Tq:</span>
              <strong>{caToque}</strong>
            </div>

            <div className="ca-side-box">
              <span>Sur:</span>
              <strong>{caSurpresa}</strong>
            </div>
          </div>

          <div className="ca-breakdown">
            <div className={`ca-item ${caHover ? 'highlight' : ''}`}>
              <span className="ca-item-label">Bas</span>
              <span>{caBase}</span>
            </div>

            <div className={`ca-item ${(caHover === 'normal' || caHover === 'surpresa') ? 'highlight' : ''}`}>
              <span className="ca-item-label">Arm</span>
              <span>{caValores.armadura}</span>
            </div>

            <div className={`ca-item ${(caHover === 'normal' || caHover === 'surpresa') ? 'highlight' : ''}`}>
              <span className="ca-item-label">Esc</span>
              <span>{caValores.escudo}</span>
            </div>

            <div className={`ca-item ${(caHover === 'normal' || caHover === 'toque') ? 'highlight' : ''}`}>
              <span className="ca-item-label">Dex</span>
              <span>{dexMod >= 0 ? `+${dexMod}` : dexMod}</span>
            </div>

            <div className={`ca-item ${caHover ? 'highlight' : ''}`}>
              <span className="ca-item-label">Tam</span>
              <span>{modTamanho.ca >= 0 ? `+${modTamanho.ca}` : modTamanho.ca}</span>
            </div>

            <div className={`ca-item ${(caHover === 'normal' || caHover === 'surpresa') ? 'highlight' : ''}`}>
              <span className="ca-item-label">Nat</span>
              <span>{caValores.natural}</span>
            </div>

            <div className={`ca-item ${(caHover === 'normal' || caHover === 'surpresa') ? 'highlight' : ''}`}>
              <span className="ca-item-label">Def</span>
              <span>{caValores.deflexao}</span>
            </div>

            <div className={`ca-item ${(caHover === 'normal' || caHover === 'surpresa') ? 'highlight' : ''}`}>
              <span className="ca-item-label">Out</span>
              <span>{caValores.outros}</span>
            </div>
          </div>
        </div>

        <div className="saves-cards">
          <div className="save-card">
            <div className="save-title">Fortitude</div>
            <div className="save-value">{fortTotal >= 0 ? `+${fortTotal}` : fortTotal}</div>
            <div className="save-detail">
              Base +{fortBase} {fortRacial > 0 ? `Racial +${fortRacial}` : ''}
            </div>
          </div>

          <div className="save-card">
            <div className="save-title">Reflexos</div>
            <div className="save-value">{refTotal >= 0 ? `+${refTotal}` : refTotal}</div>
            <div className="save-detail">
              Base +{refBase} {refRacial > 0 ? `Racial +${refRacial}` : ''}
            </div>
          </div>

          <div className="save-card">
            <div className="save-title">Vontade</div>
            <div className="save-value">{vonTotal >= 0 ? `+${vonTotal}` : vonTotal}</div>
            <div className="save-detail">
              Base +{vonBase} {vonRacial > 0 ? `Racial +${vonRacial}` : ''}
            </div>
          </div>
</div>
        </div>
      )}
    </div>
  )
}