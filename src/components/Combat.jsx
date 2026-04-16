import { useState, useMemo, useEffect, useRef } from 'react'
import { useCharacter } from '../context/CharacterContext'
import { getClasse, getBonusSaveRacial } from '../data/opcoes'
import { getModificadoresTamanho } from '../data/tamanho'
import { getBBABase, getProgressaoBBA } from '../data/bba'
import { getDeslocamento, deslocamentoPorRaca, bonusDeslocamentoPorClasse } from '../data/deslocamento'
import './Combat.css'

export default function Combat() {
  const { personagem, getModificador, atualizarCampo } = useCharacter()
  const [expandido, setExpandido] = useState(true)

  const hpMaxAnterior = useRef(0)

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
  const modForca = getModificador('forca')

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

  const agarrarTotal = bbaBase + modForca + modTamanho.agarrar

  const hpMax = useMemo(() => {
    if (!classe.dadoVida) return 0

    const dado = classe.dadoVida

    // nível 1: dado cheio, mínimo 1
    let total = Math.max(1, dado + conMod)

    if (nivel > 1) {
      const hpMedio = Math.floor(dado / 2)

      for (let i = 2; i <= nivel; i++) {
        total += Math.max(1, hpMedio + conMod)
      }
    }

    return total
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  // dexMod e conMod ja estao acima mas tbm são usados aqui
  const sabMod = getModificador('sabedoria')

  const fortBase = classe.fort || 0
  const fortRacial = bonusSaveRacial.fort || 0
  const fortTotal = fortBase + conMod + fortRacial

  const refBase = classe.ref || 0
  const refRacial = bonusSaveRacial.ref || 0
  const refTotal = refBase + dexMod + refRacial

  const vonBase = classe.von || 0
  const vonRacial = bonusSaveRacial.von || 0
  const vonTotal = vonBase + sabMod + vonRacial

  return (
    <div className="combat-container">
      <div className="section-header">
        <h3>Combate</h3>
        <button className="btn-collapse" onClick={() => setExpandido(!expandido)}>
          {expandido ? '▼' : '▶'}
        </button>
      </div>
      {expandido && (
        <div className="combat-content">
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
              <div className="stat-label">Agarrar</div>
              <div className="stat-value">
                {agarrarTotal >= 0 ? `+${agarrarTotal}` : agarrarTotal}
              </div>
              <div className="stat-detail">
                {[
                  `Base +${bbaBase}`,
                  `For ${modForca >= 0 ? `+${modForca}` : modForca}`,
                  modTamanho.agarrar !== 0
                    ? `Tam ${modTamanho.agarrar >= 0 ? `+${modTamanho.agarrar}` : modTamanho.agarrar}`
                    : null
                ]
                  .filter(Boolean)
                  .join(' · ')}
              </div>
            </div>

            <div className="combat-stat">
              <div className="stat-label">Iniciativa</div>
              <div className="stat-value">
                {dexMod >= 0 ? `+${dexMod}` : dexMod}
              </div>
              <div className="stat-detail">Des</div>
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

          <div className="combat-row">
            <div className="combat-stat compact">
              <div className="stat-label">PV</div>
              <div className="pv-input-group">
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
                <span className="pv-sep">/</span>
                <span className="pv-max">{hpMax}</span>
              </div>
            </div>

            <div className="combat-stat compact stat-rm">
              <div className="stat-label">RM</div>
              <div className="stat-value small">0</div>
            </div>

            <div className="combat-stat compact stat-toque" onMouseEnter={(e) => {
              e.currentTarget.closest('.combat-row').querySelector('.stat-ca')?.classList.add('highlight')
              e.currentTarget.classList.add('highlight')
            }} onMouseLeave={(e) => {
              e.currentTarget.closest('.combat-row').querySelectorAll('.highlight').forEach(el => el.classList.remove('highlight'))
            }}>
              <div className="stat-label">Toque</div>
              <div className="stat-value small">{caToque}</div>
              <div className="stat-detail">
                Des {dexMod >= 0 ? `+${dexMod}` : dexMod}
              </div>
            </div>

            <div className="combat-stat compact stat-ca" onMouseEnter={(e) => {
              e.currentTarget.classList.add('highlight')
              e.currentTarget.closest('.combat-row').querySelectorAll('.stat-toque, .stat-surp').forEach(el => el.classList.add('highlight'))
            }} onMouseLeave={(e) => {
              e.currentTarget.closest('.combat-row').querySelectorAll('.highlight').forEach(el => el.classList.remove('highlight'))
            }}>
              <div className="stat-label">CA</div>
              <div className="stat-value small">{caNormal}</div>
              <div className="stat-detail">
                Base 10 Tam {modTamanho.ca >= 0 ? `+${modTamanho.ca}` : modTamanho.ca}
              </div>
            </div>

            <div className="combat-stat compact stat-surp" onMouseEnter={(e) => {
              e.currentTarget.closest('.combat-row').querySelector('.stat-ca')?.classList.add('highlight')
              e.currentTarget.classList.add('highlight')
            }} onMouseLeave={(e) => {
              e.currentTarget.closest('.combat-row').querySelectorAll('.highlight').forEach(el => el.classList.remove('highlight'))
            }}>
              <div className="stat-label">Surp</div>
              <div className="stat-value small">{caSurpresa}</div>
              <div className="stat-detail">
                {caValores.armadura > 0 && `${caValores.armadura} Arm `}{caValores.escudo > 0 && `${caValores.escudo} Esc `}{caValores.natural > 0 && `${caValores.natural} Nat`}
              </div>
            </div>

            <div className="combat-stat compact">
              <div className="stat-label">Fort</div>
              <div className="stat-value small">
                {fortTotal >= 0 ? `+${fortTotal}` : fortTotal}
              </div>
              <div className="stat-detail">
                Base +{fortBase} · Con {conMod >= 0 ? `+${conMod}` : conMod}
                {fortRacial !== 0 && ` · Rac ${fortRacial >= 0 ? `+${fortRacial}` : fortRacial}`}
              </div>
            </div>

            <div className="combat-stat compact">
              <div className="stat-label">Ref</div>
              <div className="stat-value small">
                {refTotal >= 0 ? `+${refTotal}` : refTotal}
              </div>
              <div className="stat-detail">
                Base +{refBase} · Des {dexMod >= 0 ? `+${dexMod}` : dexMod}
                {refRacial !== 0 && ` · Rac ${refRacial >= 0 ? `+${refRacial}` : refRacial}`}
              </div>
            </div>

            <div className="combat-stat compact">
              <div className="stat-label">Von</div>
              <div className="stat-value small">
                {vonTotal >= 0 ? `+${vonTotal}` : vonTotal}
              </div>
              <div className="stat-detail">
                Base +{vonBase} · Sab {sabMod >= 0 ? `+${sabMod}` : sabMod}
                {vonRacial !== 0 && ` · Rac ${vonRacial >= 0 ? `+${vonRacial}` : vonRacial}`}
              </div>
            </div>
          </div>
      </div>
      )}
    </div>
  )
}