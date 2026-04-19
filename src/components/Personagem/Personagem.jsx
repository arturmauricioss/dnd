import { useMemo, useEffect } from 'react'
import { useCharacter } from '../../context/CharacterContext'
import { classes, niveis, getDeusesPorClasse } from '../Classes/classesData'
import { alinhamentos, alinhamentoValidoParaClasse, podeSelecionarAlinhamento } from '../Divindades/alinhamentosData'
import { racas, sexos } from '../Racas/racasData'
import { getFisicoSugerido, getIdadeSugerida, getTamanhoPorRaca, getDeusesRaciaisFormatados } from '../Racas/racasLogic'
import { getDeusesPorAlinhamento, getDeusPorId } from '../Divindades/divindadesLogic'
import { Navigation } from '../global'
import './Personagem.css'

export default function Personagem() {
  const { personagem, atualizarCampo, setSelectedRace, setSelectedClass, setSelectedAlignment } = useCharacter()

  // 🔮 Deuses por classe + alinhamento + raciais
  const deusesFiltrados = useMemo(() => {
    // Deuses raciais SEMPRE aparecem
    const deusesRaciais = getDeusesRaciaisFormatados(personagem.race)
    
    const isClerigo = personagem.classe === 'clerigo'
    const temAlinhamento = personagem.alignment && personagem.alignment !== 'selecione'
    
    // Deuses que estão a 1 passo do alinhamento
    let deusesAlinhamento = []
    if (temAlinhamento) {
      deusesAlinhamento = getDeusesPorAlinhamento(personagem.alignment)
    }
    
    let deusesClasse = []
    let deusesTendencia = []
    
    if (isClerigo) {
      // Clérigo: usa deusesAlinhamento como base (não usa deusesPorClasse)
      // Os deuses raciais já são adicionados depois
    } else {
      // Não-clérigo: TODOS os deuses da classe (sem filtro de alinhamento)
      const deusesClasseIds = getDeusesPorClasse(personagem.classe)
      
      deusesClasse = deusesClasseIds.map(id => {
        const deus = getDeusPorId(id)
        return deus ? { value: deus.value, nome: deus.nome } : null
      }).filter(Boolean)
      
      // Deuses por tendência que não são raciais nem da classe
      if (temAlinhamento) {
        const deusesRaciaisValues = deusesRaciais.map(d => d.value)
        const deusesClasseValues = deusesClasse.map(d => d.value)
        
        deusesTendencia = deusesAlinhamento.filter(d => 
          !deusesRaciaisValues.includes(d.value) && 
          !deusesClasseValues.includes(d.value)
        )
      }
    }
    
    // Combina os deuses baseado no tipo de classe
    let deusesFinais
    if (isClerigo) {
      // Clérigo: raciais + deuses por alinhamento
      deusesFinais = [...deusesRaciais, ...deusesAlinhamento]
    } else {
      // Não-clérigo: raciais + classe + tendência
      deusesFinais = [...deusesRaciais, ...deusesClasse, ...deusesTendencia]
    }
    
    const uniqueDeuses = deusesFinais.filter((deus, index, self) => 
      index === self.findIndex(d => d.value === deus.value)
    )
    
    return uniqueDeuses
  }, [personagem.alignment, personagem.race, personagem.classe])

  // ⚖️ Alinhamento por classe
  const alinhamentosFiltrados = useMemo(() => {
    if (!personagem.classe || personagem.classe === 'selecione') return alinhamentos
    return alinhamentos.filter(a => podeSelecionarAlinhamento(personagem.classe, a.id))
  }, [personagem.classe])

  useEffect(() => {
    if (
      personagem.classe !== 'selecione' &&
      !alinhamentoValidoParaClasse(personagem.classe, personagem.alignment)
    ) {
      atualizarCampo('alignment', 'selecione')
      setSelectedAlignment('selecione')
    }
  }, [personagem.classe, personagem.alignment, atualizarCampo, setSelectedAlignment])

  useEffect(() => {
    if (personagem.race !== 'selecione') {
      atualizarCampo('tamanho', getTamanhoPorRaca(personagem.race))
    }
  }, [personagem.race, atualizarCampo])

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
          <label>Divindade</label>
          <select
            value={personagem.deity || ''}
            onChange={(e) => atualizarCampo('deity', e.target.value)}
          >
            <option value="">NENHUMA</option>
            {deusesFiltrados.map(d => <option key={d.value} value={d.value}>{d.nome}</option>)}
          </select>
        </div>
        <div className="field-group span-2">
          <label>Tamanho</label>
          <input
            value={
              personagem.race !== 'selecione'
                ? (getTamanhoPorRaca(personagem.race) === 'pequena' ? 'PEQUENO' : 'MÉDIO')
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