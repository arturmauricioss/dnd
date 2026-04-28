import { useMemo, useState } from 'react'
import { useCharacter } from '../../context/CharacterContext'
import { getHabilidadesDisponiveis } from './habilidadesData'
import { Navigation } from '../global'
import './Habilidades.css'

export default function Habilidades() {
  const { personagem } = useCharacter()
  
  const raca = personagem.race || 'humano'
  const classe = personagem.classe || 'guerreiro'
  const nivel = personagem.level_class || 1

  // 🔥 FUTURO: controle de habilidades ativas (buffs tipo Fúria)
  const [habilidadesAtivas, setHabilidadesAtivas] = useState([])

  const habilidades = useMemo(() => {
    return getHabilidadesDisponiveis(raca, classe, nivel)
  }, [raca, classe, nivel])

  const raciais = habilidades.filter(h => h.tipo === 'racial')
  const classeHabilidades = habilidades.filter(h => h.tipo === 'classe')
  const nivelHabilidades = habilidades.filter(h => h.tipo === 'nivel')

  function ativarHabilidade(hab) {
    if (!hab.ativavel) return

    setHabilidadesAtivas(prev => {
      const jaAtiva = prev.some(h => h.nome === hab.nome)

      // 🔴 DESATIVAR
      if (jaAtiva) {
        return prev.filter(h => h.nome !== hab.nome)
      }

      // 🟢 ATIVAR
      return [
        ...prev,
        {
          nome: hab.nome,
          duracaoRestante: hab.duracao || 0
        }
      ]
    })
  }

  // 🔍 verifica se habilidade está ativa
  function isAtiva(nome) {
    return habilidadesAtivas.some(h => h.nome === nome)
  }

  return (
    <div className="habilidades-container">
      
      <div className="habilidades-list">

        {/* RACIAIS */}
        <div className="habilidades-section">
          <h3>Raciais</h3>
          {raciais.map((hab, i) => (
            <div 
              key={`${hab.nome}-${i}`} 
              className={`habilidade-item ${hab.aplicado ? 'applied' : 'unlocked'}`}
            >
              <span className="habilidade-nome">
                {hab.nome}

                {hab.aplicado && (
                  <span className="applied-tag"> (Aplicado)</span>
                )}

                {isAtiva(hab.nome) && (
                  <span className="active-tag"> (Ativo)</span>
                )}
              </span>

              <span className="habilidade-desc">{hab.desc}</span>
            </div>
          ))}
        </div>

        {/* CLASSE */}
        <div className="habilidades-section">
          <h3>Classe ({classe}) - Nível {nivel}</h3>

          {classeHabilidades.map((hab, i) => {
            const requerHab = hab.requer 
              ? classeHabilidades.find(h => h.nome === hab.requer)
              : null

            const nivelRequerido = requerHab 
              ? requerHab.nivel 
              : hab.nivel
            
            return (
              <div 
                key={`${hab.nome}-${hab.nivel}-${i}`} 
                className={`habilidade-item ${hab.desbloqueado ? 'unlocked' : 'locked'}`}
              >
                <span className="habilidade-nome">
                  {hab.nome}

                  {hab.aplicado && (
                    <span className="applied-tag"> (Aplicado)</span>
                  )}

                  {isAtiva(hab.nome) && (
                    <span className="active-tag"> (Ativo)</span>
                  )}
                </span>

                <span className="habilidade-desc">{hab.desc}</span>

                {/* BOTÃO DE ATIVAÇÃO */}
                {hab.desbloqueado && hab.ativavel && (
                  <button 
                    className="btn-ativar"
                    onClick={() => ativarHabilidade(hab)}
                  >
                    {isAtiva(hab.nome) ? 'Desativar' : 'Ativar'}
                  </button>
                )}

                {!hab.desbloqueado && (
                  <span className="habilidade-requer">
                    {hab.requer 
                      ? `Requer: ${hab.requer} (Nível ${nivelRequerido})` 
                      : `Nível ${hab.nivel}`}
                  </span>
                )}
              </div>
            )
          })}
        </div>

        {/* PROGRESSÃO POR NÍVEL */}
        <div className="habilidades-section">
          <h3>Progressão por Nível</h3>

          {nivelHabilidades.map((hab, i) => (
            <div 
              key={`${hab.nome}-${hab.nivel}-${i}`} 
              className={`habilidade-item ${hab.desbloqueado ? 'unlocked' : 'locked'}`}
            >
              <span className="habilidade-nome">
                {hab.nome} (Nível {hab.nivel})

                {hab.aplicado && (
                  <span className="applied-tag"> (Aplicado)</span>
                )}
              </span>

              <span className="habilidade-desc">{hab.desc}</span>

              {!hab.desbloqueado && (
                <span className="habilidade-requer">
                  Nível {hab.nivel}
                </span>
              )}
            </div>
          ))}
        </div>

      </div>

      <Navigation prev="/idiomas" next="/combat" />
    </div>
  )
}