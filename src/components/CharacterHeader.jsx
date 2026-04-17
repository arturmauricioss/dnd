import { useState, useMemo, useEffect } from 'react'
import { useCharacter } from '../context/CharacterContext'
import { racas, classes, alinhamentos, sexos, niveis, getDeusesPorAlinhamento } from '../data/opcoes'
import { tamanhoPorRaca } from '../data/tamanho'
import { getFisicoSugerido, getIdadeSugerida } from '../data/fisico'
import Navigation from './Navigation'
import './CharacterHeader.css'

export default function CharacterHeader() {
  const { personagem, atualizarCampo, setSelectedRace, setSelectedClass, setSelectedAlignment } = useCharacter()
  const [deusesDisponiveis, setDeusesDisponiveis] = useState([])

  // 🔥 VALIDAÇÃO DESLIGADA
  const isValido = true

  // 🔮 Deuses por alinhamento
  const deusesFiltrados = useMemo(() => {
    return personagem.alignment && personagem.alignment !== 'selecione'
      ? getDeusesPorAlinhamento(personagem.alignment)
      : []
  }, [personagem.alignment])

  useEffect(() => {
    setDeusesDisponiveis(deusesFiltrados)
  }, [deusesFiltrados])

  // ⚖️ Alinhamento por classe
  const alinhamentosFiltrados = useMemo(() => {
    if (!personagem.classe || personagem.classe === 'selecione') return alinhamentos

    return alinhamentos.filter(a => {
      if (a.id === 'selecione') return true

      const c = personagem.classe
      if (c === 'paladino') return a.id === 'lawful_good'
      if (c === 'monge') return a.id.startsWith('lawful')
      if (c === 'barbaro' || c === 'bardo') return !a.id.startsWith('lawful')
      if (c === 'druida') return a.id.includes('neutral')

      return true
    })
  }, [personagem.classe])

  useEffect(() => {
    if (
      personagem.classe !== 'selecione' &&
      !alinhamentosFiltrados.find(a => a.id === personagem.alignment)
    ) {
      atualizarCampo('alignment', 'selecione')
      setSelectedAlignment('selecione')
    }
  }, [personagem.classe])

  useEffect(() => {
    if (personagem.race !== 'selecione') {
      atualizarCampo('tamanho', tamanhoPorRaca[personagem.race] || '')
    }
  }, [personagem.race])

  const placeholderFisico = useMemo(
    () => getFisicoSugerido(personagem.race, personagem.sex),
    [personagem.race, personagem.sex]
  )

  const placeholderIdade = useMemo(
    () => getIdadeSugerida(personagem.race),
    [personagem.race]
  )

  return (
    <div className="character-header">
      <div className="header-row">

        <div className="field-group span-2">
          <label>Personagem</label>
          <input
            placeholder='Nome do Personagem'
            value={personagem.character_name}
            onChange={(e) => atualizarCampo('character_name', e.target.value)}
          />
        </div>

        <div className="field-group span-2">
          <label>Jogador</label>
          <input
            placeholder='Nome do Jogador'
            value={personagem.player}
            onChange={(e) => atualizarCampo('player', e.target.value)}
          />
        </div>

        <div className="field-group span-2">
          <label>Raça</label>
          <select
            value={personagem.race}
            onChange={(e) => {
              atualizarCampo('race', e.target.value)
              setSelectedRace(e.target.value)
            }}
          >
            {racas.map(r => <option key={r.id} value={r.id}>{r.nome}</option>)}
          </select>
        </div>

        <div className="field-group span-2">
          <label>Sexo</label>
          <select
            value={personagem.sex}
            onChange={(e) => atualizarCampo('sex', e.target.value)}
          >
            {sexos.map(s => <option key={s.id} value={s.id}>{s.nome}</option>)}
          </select>
        </div>

        <div className="field-group span-2">
          <label>Classe</label>
          <select
            value={personagem.classe}
            onChange={(e) => {
              atualizarCampo('classe', e.target.value)
              setSelectedClass(e.target.value)
            }}
          >
            {classes.map(c => <option key={c.id} value={c.id}>{c.nome}</option>)}
          </select>
        </div>

        <div className="field-group span-2">
          <label>Nível</label>
          <select
            value={personagem.level_class}
            onChange={(e) => atualizarCampo('level_class', parseInt(e.target.value))}
          >
            {niveis.map(n => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>

        <div className="field-group span-2">
          <label>Alinhamento</label>
          <select
            value={personagem.alignment}
            onChange={(e) => {
              atualizarCampo('alignment', e.target.value)
              setSelectedAlignment(e.target.value)
            }}
          >
            {alinhamentosFiltrados.map(a => <option key={a.id} value={a.id}>{a.nome}</option>)}
          </select>
        </div>

        <div className="field-group span-2">
          <label>Deidade</label>
          <select
            value={personagem.deity || ''}
            onChange={(e) => atualizarCampo('deity', e.target.value)}
          >
            <option value="">NENHUMA</option>
            {deusesDisponiveis.map(d => <option key={d.value} value={d.value}>{d.nome}</option>)}
          </select>
        </div>

        <div className="field-group span-2">
          <label>Tamanho</label>
          <input
            value={
              personagem.race !== 'selecione'
                ? (tamanhoPorRaca[personagem.race] === 'pequena' ? 'PEQUENO' : 'MÉDIO')
                : ''
            }
            readOnly
          />
        </div>

        <div className="field-group span-2">
          <label>Altura</label>
          <input
            value={personagem.height}
            onChange={(e) => atualizarCampo('height', e.target.value)}
            placeholder={placeholderFisico.altura}
          />
        </div>

        <div className="field-group span-2">
          <label>Idade</label>
          <input
            type="number"
            value={personagem.idade}
            onChange={(e) => atualizarCampo('idade', e.target.value)}
            placeholder={placeholderIdade.min ? `${placeholderIdade.min} - ${placeholderIdade.max}` : ''}
          />
        </div>

        <div className="field-group span-2">
          <label>Peso</label>
          <input
            value={personagem.weight}
            onChange={(e) => atualizarCampo('weight', e.target.value)}
            placeholder={placeholderFisico.peso}
          />
        </div>

      </div>
      
      <Navigation next="/atributos"/>
    </div>
  )
}