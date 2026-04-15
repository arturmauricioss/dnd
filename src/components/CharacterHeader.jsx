import { useState, useMemo, useEffect } from 'react'
import { useCharacter } from '../context/CharacterContext'
import { racas, classes, alinhamentos, sexos, niveis, getDeusesPorAlinhamento } from '../data/opcoes'
import { tamanhoPorRaca } from '../data/tamanho'
import { getFisicoSugerido, getIdadeSugerida } from '../data/fisico'
import './CharacterHeader.css'

export default function CharacterHeader() {
  const { personagem, atualizarCampo, setSelectedRace, setSelectedClass, setSelectedAlignment } = useCharacter()
  const [deusesDisponiveis, setDeusesDisponiveis] = useState([])

  const deusesFiltrados = useMemo(() => {
    if (personagem.alignment && personagem.alignment !== 'selecione') {
      return getDeusesPorAlinhamento(personagem.alignment)
    }
    return []
  }, [personagem.alignment])

  useEffect(() => {
    setDeusesDisponiveis(deusesFiltrados)
  }, [deusesFiltrados])

  const alinhamentosFiltrados = useMemo(() => {
    if (!personagem.classe || personagem.classe === 'selecione') {
      return alinhamentos
    }
    
    return alinhamentos.filter(a => {
      if (a.id === 'selecione') return true
      
      const classe = personagem.classe
      if (classe === 'paladino') return a.id === 'lawful_good'
      if (classe === 'monge') return a.id.startsWith('lawful')
      if (classe === 'barbaro' || classe === 'bardo') return !a.id.startsWith('lawful')
      if (classe === 'druida') return a.id.includes('neutral')
      
      return true
    })
  }, [personagem.classe])

  useEffect(() => {
    if (personagem.classe && personagem.classe !== 'selecione') {
      if (!alinhamentosFiltrados.find(a => a.id === personagem.alignment)) {
        atualizarCampo('alignment', 'selecione')
        setSelectedAlignment('selecione')
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [personagem.classe])

  useEffect(() => {
    if (personagem.race && personagem.race !== 'selecione') {
      const tamanhoRaca = tamanhoPorRaca[personagem.race] || ''
      atualizarCampo('tamanho', tamanhoRaca)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [personagem.race])

  const placeholderFisico = useMemo(() => {
    return getFisicoSugerido(personagem.race, personagem.sex)
  }, [personagem.race, personagem.sex])

  const placeholderIdade = useMemo(() => {
    return getIdadeSugerida(personagem.race)
  }, [personagem.race])

  const handleClasseChange = (e) => {
    const valor = e.target.value
    atualizarCampo('classe', valor)
    setSelectedClass(valor)
  }

  const handleRaceChange = (e) => {
    const valor = e.target.value
    atualizarCampo('race', valor)
    setSelectedRace(valor)
  }

  const handleAlignmentChange = (e) => {
    const valor = e.target.value
    atualizarCampo('alignment', valor)
    setSelectedAlignment(valor)
  }

  const handleSexChange = (e) => {
    atualizarCampo('sex', e.target.value)
  }

  return (
    <div className="character-header">

      <div className="header-row">
        <div className="field-group span-2">
          <label htmlFor="character_name">Nome do Personagem</label>
          <input type="text" id="character_name" className='input-line' value={personagem.character_name} onChange={(e) => atualizarCampo('character_name', e.target.value)} />
        </div>
        <div className="field-group span-2">
          <label htmlFor="player">Jogador</label>
          <input type="text" id="player" className='input-line' value={personagem.player} onChange={(e) => atualizarCampo('player', e.target.value)} />
        </div>
        <div className="field-group span-2">
          <label htmlFor="race">Raça</label>
          <select id="race" value={personagem.race} className='input-line' onChange={handleRaceChange}>
            {racas.map((r) => <option key={r.id} value={r.id}>{r.nome}</option>)}
          </select>
        </div>
        <div className="field-group span-2">
          <label htmlFor="sex">Sexo</label>
          <select id="sex" value={personagem.sex} className='input-line' onChange={handleSexChange}>
            {sexos.map((s) => <option key={s.id} value={s.id}>{s.nome}</option>)}
          </select>
        </div>

        <div className="field-group span-2">
          <label htmlFor="classe">Classe</label>
          <select id="classe" className='input-line' value={personagem.classe} onChange={handleClasseChange}>
            {classes.map((c) => <option key={c.id} value={c.id}>{c.nome}</option>)}
          </select>
        </div>
        <div className="field-group span-2">
          <label htmlFor="level_class">Nível</label>
          <select id="level_class" className='input-line' value={personagem.level_class} onChange={(e) => atualizarCampo('level_class', parseInt(e.target.value))}>
            {niveis.map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>
        <div className="field-group span-2">
          <label htmlFor="alignment">Alinhamento</label>
          <select id="alignment" className='input-line' value={personagem.alignment} onChange={handleAlignmentChange}>
            {alinhamentosFiltrados.map((a) => <option key={a.id} value={a.id}>{a.nome}</option>)}
          </select>
        </div>
        <div className="field-group span-2">
          <label htmlFor="deity">Deidade</label>
          <select id="deity" className='input-line' value={personagem.deity || ''} onChange={(e) => atualizarCampo('deity', e.target.value)}>
            <option value="">Nenhuma</option>
            {deusesDisponiveis.map((d) => <option key={d.value} value={d.value}>{d.nome}</option>)}
          </select>
        </div>
        
    
        <div className="field-group span-2">
          <label htmlFor="tamanho">Tamanho</label>
          <input type="text" id="tamanho" className='input-line' value={personagem.race && personagem.race !== 'selecione' ? (tamanhoPorRaca[personagem.race] === 'pequena' ? 'PEQUENO' : 'MÉDIO') : ''} readOnly />
        </div>
        <div className="field-group span-2">
          <label htmlFor="height">Altura</label>
          <input type="text" id="height" className='input-line' value={personagem.height} onChange={(e) => atualizarCampo('height', e.target.value)} placeholder={placeholderFisico.altura} />
        </div>
        <div className="field-group span-2">
          <label htmlFor="idade">Idade</label>
          <input type="number" min="0" className='input-line' id="idade" value={personagem.idade} onChange={(e) => atualizarCampo('idade', e.target.value)} placeholder={placeholderIdade.min ? `${placeholderIdade.min} - ${placeholderIdade.max}` : ''} />
        </div>
        
        <div className="field-group span-2">
          <label htmlFor="weight">Peso</label>
          <input type="text" className='input-line' id="weight" value={personagem.weight} onChange={(e) => atualizarCampo('weight', e.target.value)} placeholder={placeholderFisico.peso} />
        </div>
      </div>
    </div>
  )
}
