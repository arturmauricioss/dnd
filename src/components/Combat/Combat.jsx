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
  const combate = getDadosCombate(personagem, getModificador)
  
  const savesDetalhes = combate.savesDetalhes
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
  const iniciativa = Math.min(dexMod, combate.dexMaxFinal)
  const modTamanho = getModificadoresTamanho(personagem.tamanho || '')

  

  const showDeslocamento = personagem.race && personagem.race !== 'selecione'

  return (
    <div className="combat-container">

      {expandido && (
        <div className="combat-content">

          
           {/* Iniciativa */}
          <div className="combat-stat">
            <div className="stat-label">Iniciativa</div>

            <div className="stat-value">
              {iniciativa >= 0 ? `+${iniciativa}` : iniciativa}
            </div>

            {iniciativa !== 0 && (
              <div className="stat-detail">
                {buildBreakdown([
                  { label: 'Des', value: dexMod },
                  dexMod > combate.dexMaxFinal
                    ? { label: 'Limite', value: combate.dexMaxFinal - dexMod }
                    : null
                ].filter(Boolean))}
              </div>
            )}
          </div>

          {/* BBA */}
          <div className="combat-stat">
            <div className="stat-label">Bonus base de Ataque</div>
            <div className="stat-value">
              {combate.bba >= 0 ? `+${combate.bba}` : combate.bba}
            </div>
            <div className="stat-detail">
              {buildBreakdown([
                { label: 'Base', value: combate.bbaBase },
                { label: 'Tam', value: combate.bbaTamanho || 0 }
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

          
          {/* Deslocamento */}
          <div className="combat-stat">
            <div className="stat-label">Deslocamento</div>
            <div className="stat-value">
              {showDeslocamento ? `${combate.deslocamento}m` : '—'}
            </div>
            {showDeslocamento && (
              <div className="stat-detail">
                {combate.deslocamento === 0 ? (
                  <span>Carga -100%</span>
                ) : (
                  buildBreakdown([
                    { label: 'Raça', value: combate.detalhes.deslocamentoBase },
                    { label: 'Classe', value: combate.detalhes.deslocamentoBonus },
                    combate.encumbrance?.penalidadeCargaDeslocamento > 0 
                      ? { label: 'Carga', value: -combate.encumbrance.penalidadeCargaDeslocamento }
                      : null
                  ].filter(Boolean))
                )}
              </div>
            )}
          </div>

          {/* Corrida */}
          {showDeslocamento && (
            <div className="combat-stat compact">
              <div className="stat-label">Corrida</div>
              <div className="stat-value">{combate.corrida?.metros || 0}m</div>
              <div className="stat-detail">
                <span>Deslocamento x{combate.corrida?.multiplicador || 4}</span>
                <br />
                <span>Estamina x{personagem.atributos?.constituicao}</span>
              </div>
            </div>
          )}


          {/* PV */}
          <div className="combat-stat compact">
            <div className="stat-label">Pontos de Vida</div>
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


          {/* CA */}
          <div className="combat-stat compact">
            <div className="stat-label">Classe de Armadura</div>
            <div className="stat-value small">{combate.caNormal}</div>
            {combate.caNormal > 0 && (
              <div className="stat-detail">
                {buildBreakdown([
                  { label: 'Base', value: 10 },
                  { label: 'Arm', value: 0 },
                  { label: 'Esc', value: 0 },
                  { label: 'Des', value: Math.min(dexMod, combate.dexMaxFinal) },
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
                  { label: 'Base', value: 10 },
                  { label: 'Des', value: Math.min(dexMod, combate.dexMaxFinal) },
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
                  { label: 'Base', value: 10 },
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
                  { label: 'Classe', value: savesDetalhes.fort.classe },
                  { label: 'Con', value: savesDetalhes.fort.atributo },
                  { label: 'Raça', value: savesDetalhes.fort.racial }
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
                  { label: 'Classe', value: savesDetalhes.ref.classe },
                  { label: 'Des', value: savesDetalhes.ref.atributo },
                  { label: 'Raça', value: savesDetalhes.ref.racial }
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
                  { label: 'Classe', value: savesDetalhes.von.classe },
                  { label: 'Sab', value: savesDetalhes.von.atributo },
                  { label: 'Raça', value: savesDetalhes.von.racial }
                ])}
              </div>
            )}
          </div>
          
          {/* RM */}
          <div className="combat-stat compact">
            <div className="stat-label">Resistência mágica</div>
            <div className="stat-value">0</div>
          </div>


          {/* Encumbrance */}
          <div className="combat-stat">
            <div className="stat-label">Carga Atual</div>
            <div className="stat-value">
              <span className="stat-number">{combate.encumbrance?.pesoTotal?.toFixed(1) || 0} kg</span>
            </div>
            <div className="stat-detail">
              <span className={`carga-badge ${combate.encumbrance?.cargaAtual}`}>
                {combate.encumbrance?.cargaAtual === 'leve' ? 'Leve' : 
                  combate.encumbrance?.cargaAtual === 'media' ? 'Média' : 
                  combate.encumbrance?.cargaAtual === 'pesada' ? 'Pesada' : 'Excessiva'}
              </span>
            </div>
          </div>

          <div className="combat-stat compact">
            <div className="stat-label">Capacidade de Carregamento</div>

            <div className="stat-value small">
              {combate.movimentoEspecial.capacidadeCarregamento} kg
            </div>

            <div className="stat-detail">
              <span>1x capacidade</span>
            </div>
          </div>
          
          <div className="combat-stat compact">
            <div className="stat-label">Levantar (cabeça)</div>

            <div className="stat-value small">
              {combate.movimentoEspecial.levantarCabeca} kg
            </div>

            <div className="stat-detail">
              <span>1x capacidade</span>
            </div>
          </div>

          <div className="combat-stat compact">
            <div className="stat-label">Levantar (chão)</div>

            <div className="stat-value small">
              {combate.movimentoEspecial.levantarChao} kg
            </div>

            <div className="stat-detail">
              <span>2x capacidade</span>
            </div>
          </div>

          <div className="combat-stat compact">
            <div className="stat-label">Empurrar / Arrastar</div>

            <div className="stat-value small">
              {combate.movimentoEspecial.empurrarArrastar} kg
            </div>

            <div className="stat-detail">
              <span>5x capacidade</span>
            </div>

            
          </div>

          
        </div>
      )}

      <Navigation prev="/atributos" next="/pericias" />
    </div>
  )
}