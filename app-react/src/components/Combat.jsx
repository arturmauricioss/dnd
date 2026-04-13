import { useState } from 'react'
import { useMemo } from 'react'
import { useCharacter } from '../context/CharacterContext'
import { getClasse, getBonusSaveRacial } from '../data/opcoes'
import { getModificadoresTamanho } from '../data/tamanho'
import { getBBABase, getProgressaoBBA } from '../data/bba'
import { getDeslocamento, deslocamentoPorRaca, bonusDeslocamentoPorClasse } from '../data/deslocamento'

export default function Combat() {
  const { personagem, getModificador, atualizarCampo } = useCharacter()
  const [caHover, setCaHover] = useState(null)

  const [caValores, setCaValores] = useState({
    armadura: 0,
    escudo: 0,
    natural: 0,
    deflexao: 0,
    outros: 0,
  })

  const handleCaChange = (campo, valor) => {
    setCaValores(prev => ({ ...prev, [campo]: parseInt(valor) || 0 }))
  }

  const classe = getClasse(personagem.classe)
  const nivel = personagem.level_class || 1
  const conMod = getModificador('constituicao')
  const dexMod = getModificador('destreza')
  const forMod = getModificador('forca')
  const bonusSaveRacial = getBonusSaveRacial(personagem.race)
  const modTamanho = getModificadoresTamanho(personagem.tamanho || '')

  const progressao = getProgressaoBBA(personagem.classe)
  const bba = useMemo(() => {
    const base = getBBABase(progressao, nivel)
    return base + modTamanho.bba
  }, [progressao, nivel, modTamanho])

  const bbaBase = useMemo(() => getBBABase(progressao, nivel), [progressao, nivel])

  const hpMax = useMemo(() => {
    if (!classe.dadoVida) return 0
    const dado = classe.dadoVida
    if (nivel === 1) {
      return dado + conMod
    }
    const hpMedio = Math.floor(dado / 2) + conMod
    const hpAdicional = (nivel - 1) * (hpMedio + conMod)
    return dado + conMod + hpAdicional
  }, [classe, nivel, conMod])

  const hpDado = classe.dadoVida || 0
  const hpConMod = conMod

  const deslocamento = useMemo(() => getDeslocamento(personagem.race, personagem.classe), [personagem.race, personagem.classe])
  const deslocBase = personagem.race && personagem.race !== 'selecione' ? (deslocamentoPorRaca[personagem.race] || 0) : 0
  const deslocBonus = personagem.race && personagem.race !== 'selecione' ? (bonusDeslocamentoPorClasse[personagem.classe] || 0) : 0
  const showDeslocamento = personagem.race && personagem.race !== 'selecione'

  const caBase = 10
  const caNormal = caBase + caValores.armadura + caValores.escudo + dexMod + modTamanho.ca + caValores.natural + caValores.deflexao + caValores.outros
  const caToque = caBase + dexMod + modTamanho.ca
  const caSurpresa = caBase + caValores.armadura + caValores.escudo + modTamanho.ca + caValores.natural + caValores.deflexao + caValores.outros

  const fortTotal = (classe.fort || 0) + bonusSaveRacial.fort
  const fortBase = classe.fort || 0
  const fortRacial = bonusSaveRacial.fort

  const refTotal = (classe.ref || 0) + bonusSaveRacial.ref
  const refBase = classe.ref || 0
  const refRacial = bonusSaveRacial.ref

  const vonTotal = (classe.von || 0) + bonusSaveRacial.von
  const vonBase = classe.von || 0
  const vonRacial = bonusSaveRacial.von
  const detalheDeslocamento = showDeslocamento
  ? `Raça ${deslocBase}${
      deslocBonus > 0 ? ` · Classe +${deslocBonus}` : ''
    }`
  : ''
  return (
    <div className="combat-container">
      <h3>Combate</h3>
      
      <div className="combat-row">
        <div className="combat-stat">
          <div className="stat-label">BBA</div>
          <div className="stat-value">{bba >= 0 ? `+${bba}` : bba}</div>
          <div className="stat-detail">Base +{bbaBase} · Tam {modTamanho.bba >= 0 ? `+${modTamanho.bba}` : modTamanho.bba}</div>
        </div>

        <div className="combat-stat">
          <div className="stat-label">RM</div>
          <div className="stat-value">0</div>
          <div className="stat-detail">Inata</div>
        </div>

        <div className="combat-stat">
          <div className="stat-label">PV</div>
          <div className="pv-row">
            <input
              type="number"
              value={personagem.combat?.hp?.atual || hpMax}
              onChange={(e) => atualizarCampo('combat', { ...personagem.combat, hp: { ...personagem.combat?.hp, atual: parseInt(e.target.value) || 0 } })}
            />
            <span>/</span>
            <span className="stat-value">{hpMax}</span>
          </div>
          <div className="stat-detail">d{hpDado} {hpConMod >= 0 ? `+${hpConMod}` : hpConMod}</div>
        </div>

        <div className="combat-stat">
          <div className="stat-label">Iniciativa</div>
          <div className="stat-value">{dexMod >= 0 ? `+${dexMod}` : dexMod}</div>
          <div className="stat-detail">Dex</div>
        </div>

        <div className="combat-stat">
          <div className="stat-label">Desloc</div>
          <div className="stat-value">{showDeslocamento ? `${deslocamento}m` : '—'}</div>
          <div className="stat-detail">{detalheDeslocamento}</div>
        </div>
      </div>

      <div className="ca-section">
        <div className="ca-title">CA</div>
        <div className="ca-grid">
          <div 
            className="ca-card" 
            onMouseEnter={() => setCaHover('normal')}
            onMouseLeave={() => setCaHover(null)}
            onTouchStart={() => setCaHover(caHover === 'normal' ? null : 'normal')}
          >
            <span className="ca-total-value">{caNormal}</span>
          </div>
          <div 
            className="ca-card"
            onMouseEnter={() => setCaHover('toque')}
            onMouseLeave={() => setCaHover(null)}
            onTouchStart={() => setCaHover(caHover === 'toque' ? null : 'toque')}
          >
            <div className="ca-card-label">Toque</div>
            <div className="ca-card-value">{caToque}</div>
          </div>
          <div 
            className="ca-card"
            onMouseEnter={() => setCaHover('surpresa')}
            onMouseLeave={() => setCaHover(null)}
            onTouchStart={() => setCaHover(caHover === 'surpresa' ? null : 'surpresa')}
          >
            <div className="ca-card-label">Surpresa</div>
            <div className="ca-card-value">{caSurpresa}</div>
          </div>
          <div className="ca-breakdown">
            <div className={`ca-item ${caHover ? 'highlight' : ''}`}><span className="ca-item-label">Base</span><span>{caBase}</span></div>
            <div className={`ca-item ${(caHover === 'normal' || caHover === 'surpresa') ? 'highlight' : ''}`}><span className="ca-item-label">Arm</span><span>{caValores.armadura}</span></div>
            <div className={`ca-item ${(caHover === 'normal' || caHover === 'surpresa') ? 'highlight' : ''}`}><span className="ca-item-label">Esc</span><span>{caValores.escudo}</span></div>
            <div className={`ca-item ${(caHover === 'normal' || caHover === 'toque') ? 'highlight' : ''}`}><span className="ca-item-label">Dex</span><span>{dexMod >= 0 ? `+${dexMod}` : dexMod}</span></div>
            <div className={`ca-item ${caHover ? 'highlight' : ''}`}><span className="ca-item-label">Tam</span><span>{modTamanho.ca >= 0 ? `+${modTamanho.ca}` : modTamanho.ca}</span></div>
            <div className={`ca-item ${(caHover === 'normal' || caHover === 'surpresa') ? 'highlight' : ''}`}><span className="ca-item-label">Nat</span><span>{caValores.natural}</span></div>
            <div className={`ca-item ${(caHover === 'normal' || caHover === 'surpresa') ? 'highlight' : ''}`}><span className="ca-item-label">Def</span><span>{caValores.deflexao}</span></div>
            <div className={`ca-item ${(caHover === 'normal' || caHover === 'surpresa') ? 'highlight' : ''}`}><span className="ca-item-label">Out</span><span>{caValores.outros}</span></div>
          </div>
        </div>
      </div>

      <h4>Testes de Resistência</h4>
      <div className="saves-cards">
        <div className="save-card">
          <div className="save-title">Fortitude</div>
          <div className="save-value">{fortTotal >= 0 ? `+${fortTotal}` : fortTotal}</div>
          <div className="save-detail">Base +{fortBase} {fortRacial > 0 ? `Racial +${fortRacial}` : ''}</div>
        </div>

        <div className="save-card">
          <div className="save-title">Reflexos</div>
          <div className="save-value">{refTotal >= 0 ? `+${refTotal}` : refTotal}</div>
          <div className="save-detail">Base +{refBase} {refRacial > 0 ? `Racial +${refRacial}` : ''}</div>
        </div>

        <div className="save-card">
          <div className="save-title">Vontade</div>
          <div className="save-value">{vonTotal >= 0 ? `+${vonTotal}` : vonTotal}</div>
          <div className="save-detail">Base +{vonBase} {vonRacial > 0 ? `Racial +${vonRacial}` : ''}</div>
        </div>
      </div>
    </div>
  )
}