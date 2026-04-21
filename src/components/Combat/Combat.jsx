import { useState } from 'react'
import { useCharacter } from '../../context/CharacterContext'
import { getClasse } from '../Classes/classesData'
import { getModificadoresTamanho } from './tamanhoData'
import { getDadosCombate } from './combatLogica'
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

  const classe = getClasse(personagem.classe)
  const nivel = personagem.level_class || 1
  const dexMod = getModificador('destreza')
  const forMod = getModificador('forca')
  const conMod = getModificador('constituicao')
  const sabMod = getModificador('sabedoria')

  const modTamanho = getModificadoresTamanho(personagem.tamanho || '')

  const combate = getDadosCombate(personagem, getModificador)

  const showDeslocamento = personagem.race && personagem.race !== 'selecione'

  return (
    <div className="combat-container">

      {expandido && (
        <div className="combat-content">

          {/* BBA */}
          <div className="combat-stat">
            <div className="stat-label">Bonus base de Ataque</div>
            <div className="stat-value">
              {combate.bba >= 0 ? `+${combate.bba}` : combate.bba}
            </div>
            <div className="stat-detail">
              {buildBreakdown([
                { label: 'Base', value: combate.bbaBase }
              ])}
            </div>
          </div>

          {/* Agarrar */}
          <div className="combat-stat">
            <div className="stat-label">Agarrar</div>
            <div className="stat-value">
              {combate.agarrar >= 0 ? `+${combate.agarrar}` : combate.agarrar}
            </div>
            <div className="stat-detail">
              {buildBreakdown([
                { label: 'Base', value: combate.bbaBase },
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
              {showDeslocamento ? `${combate.deslocamento}m` : '—'}
            </div>
            {showDeslocamento && combate.deslocamento > 0 && (
              <div className="stat-detail">
                {buildBreakdown([
                  { label: 'Raça', value: combate.detalhes.deslocamentoBase },
                  { label: 'Classe', value: combate.detalhes.deslocamentoBonus }
                ])}
              </div>
            )}
          </div>

          {/* Encumbrance */}
          <div className="combat-stat">
            <div className="stat-label">Carga</div>
            <div className="stat-value">
              <span className="stat-number">{combate.encumbrance?.pesoTotal?.toFixed(1) || 0} kg</span>
            </div>
            <div className="stat-detail">
              <span className={`carga-badge ${combate.encumbrance?.cargaAtual}`}>
                {combate.encumbrance?.cargaAtual === 'leve' ? 'Leve' : 
                 combate.encumbrance?.cargaAtual === 'media' ? 'Média' : 'Máxima'}
              </span>
            </div>
          </div>

          {/* PV */}
          <div className="combat-stat compact">
            <div className="stat-label">Pontos de VIda</div>
            <div className="stat-value">{combate.hpMax}</div>
            {combate.hpMax > 0 && (
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
            <div className="stat-value small">{combate.caNormal}</div>
            {combate.caNormal > 0 && (
              <div className="stat-detail">
                {buildBreakdown([
                  { label: '10', value: 0 },
                  { label: 'Arm', value: 0 },
                  { label: 'Esc', value: 0 },
                  { label: 'Des', value: dexMod },
                  { label: 'Tam', value: modTamanho.ca },
                  { label: 'Nat', value: 0 },
                  { label: 'Def', value: 0 },
                  { label: 'Out', value: 0 }
                ])}
              </div>
            )}
          </div>

          {/* Toque */}
          <div className="combat-stat compact">
            <div className="stat-label">Toque</div>
            <div className="stat-value small">{combate.caToque}</div>
            {combate.caToque > 0 && (
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
            <div className="stat-value small">{combate.caSurpresa}</div>
            {combate.caSurpresa > 0 && (
              <div className="stat-detail">
                {buildBreakdown([
                  { label: '10', value: 0 },
                  { label: 'Arm', value: 0 },
                  { label: 'Esc', value: 0 },
                  { label: 'Tam', value: modTamanho.ca },
                  { label: 'Nat', value: 0 },
                  { label: 'Def', value: 0 },
                  { label: 'Out', value: 0 }
                ])}
              </div>
            )}
          </div>

          {/* Saves */}
          <div className="combat-stat compact">
            <div className="stat-label">Fortitude</div>
            <div className="stat-value small">{combate.fort}</div>
            {combate.fort !== 0 && (
              <div className="stat-detail">
                {buildBreakdown([
                  { label: 'Classe', value: classe.fort },
                  { label: 'Con', value: conMod },
                  { label: 'Raça', value: 0 }
                ])}
              </div>
            )}
          </div>

          <div className="combat-stat compact">
            <div className="stat-label">Reflexo</div>
            <div className="stat-value small">{combate.ref}</div>
            {combate.ref !== 0 && (
              <div className="stat-detail">
                {buildBreakdown([
                  { label: 'Classe', value: classe.ref },
                  { label: 'Des', value: dexMod },
                  { label: 'Raça', value: 0 }
                ])}
              </div>
            )}
          </div>

          <div className="combat-stat compact">
            <div className="stat-label">Vontade</div>
            <div className="stat-value small">{combate.von}</div>
            {combate.von !== 0 && (
              <div className="stat-detail">
                {buildBreakdown([
                  { label: 'Classe', value: classe.von },
                  { label: 'Sab', value: sabMod },
                  { label: 'Raça', value: 0 }
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