import { useEffect, useMemo } from 'react'
import { useCharacter } from '../../context/CharacterContext'
import { Navigation} from '../global'
import {
  getIdiomasBase,
  getIdiomasFixosClasse,
  calcularQtdExtras,
  getAlfabetizacao,
  getPoolExtrasUnicos
} from './idiomasLogic'
import './Idiomas.css'

export default function Idiomas() {
  const { personagem, atualizarCampo, getModificador } = useCharacter()
  
  const raca = personagem.race || 'humano'
  const classe = personagem.classe || ''
  const intMod = getModificador('inteligencia')
  
  const idiomasAtuais = useMemo(() => personagem.idiomas || [], [personagem.idiomas])
  const periciasState = useMemo(() => personagem.pericias || {}, [personagem.pericias])
  const pontosFalarIdioma = useMemo(() => periciasState['Falar Idioma']?.graduacao || 0, [periciasState])
  const alfabetizacaoGrad = useMemo(() => periciasState['Alfabetização']?.graduacao || 0, [periciasState])

  const idiomasBase = useMemo(() => getIdiomasBase(raca), [raca])
  const idiomasFixosClasse = useMemo(() => getIdiomasFixosClasse(classe), [classe])
  const qtdExtras = useMemo(() => calcularQtdExtras(intMod, pontosFalarIdioma), [intMod, pontosFalarIdioma])
  const alfabetizacao = useMemo(() => getAlfabetizacao(classe, alfabetizacaoGrad), [classe, alfabetizacaoGrad])
  const poolExtrasUnicos = useMemo(
    () => getPoolExtrasUnicos(raca, classe, idiomasBase, idiomasFixosClasse),
    [raca, classe, idiomasBase, idiomasFixosClasse]
  )

  useEffect(() => {
    const idiomasValidos = idiomasAtuais.slice(0, qtdExtras)

    if (idiomasValidos.length !== idiomasAtuais.length) {
      atualizarCampo('idiomas', idiomasValidos)
    }
  }, [idiomasAtuais, qtdExtras, atualizarCampo])

  const adicionarIdioma = (idioma) => {
    if (!idioma || idiomasAtuais.length >= qtdExtras) return
    if (idiomasAtuais.includes(idioma)) return
    
    atualizarCampo('idiomas', [...idiomasAtuais, idioma])
  }

  const removerIdioma = (idioma) => {
    atualizarCampo('idiomas', idiomasAtuais.filter(i => i !== idioma))
  }

  const restantes = Math.max(0, qtdExtras - idiomasAtuais.length)

  return (
    <div className="idiomas-container">
      <div className="idiomas-content">

        <div className="idiomas-info">
          <div className="info-item">
            <span>Alfabetização:</span>
            <strong>{alfabetizacao}</strong>
          </div>
          <div className="info-item">
            <span>Idiomas extras:</span>
            <strong>
              {Math.min(idiomasAtuais.length, qtdExtras)} / {qtdExtras}
            </strong>
          </div>
        </div>

        <div className="idiomas-grid">
          <div className="idiomas-header">
            <span>Idioma</span>
            <span>Tipo</span>
          </div>
          
          {idiomasBase.map((idioma, idx) => (
            <div key={idx} className="idioma-row">
              <span>{idioma}</span>
              <span className="idioma-tipo-base">Base</span>
            </div>
          ))}
          
          {idiomasFixosClasse.map((idioma, idx) => (
            <div key={`fixo-${idx}`} className="idioma-row">
              <span>{idioma}</span>
              <span className="idioma-tipo-fixo">Fixo ({classe})</span>
            </div>
          ))}
          
          {idiomasAtuais.map((idioma, idx) => (
            <div key={`extra-${idx}`} className="idioma-row">
              <span>{idioma}</span>
              <button
                className="btn-remover-idioma"
                onClick={() => removerIdioma(idioma)}
              >
                ×
              </button>
            </div>
          ))}
        </div>

        {idiomasFixosClasse.length > 0 && (
          <div className="idiomas-nota">
            * {idiomasFixosClasse.join(', ')} é idioma fixo da classe {classe} (não conta para o limite de idiomas extras)
          </div>
        )}

        
          <div className="idiomas-extras">
            <label>
              Adicionar idioma ({restantes > 0 ? `${restantes} restantes` : 'limite atingido'}):
            </label>

            <select
              disabled={restantes <= 0}
              onChange={(e) => {
                adicionarIdioma(e.target.value)
                e.target.value = ''
              }}
              defaultValue=""
            >
              <option value="">
                {restantes <= 0
                  ? 'Limite atingido'
                  : poolExtrasUnicos.length === 0
                  ? 'Nenhum idioma disponível'
                  : 'Selecione um idioma'}
              </option>

              {poolExtrasUnicos
                .filter(id => !idiomasAtuais.includes(id))
                .map(id => (
                  <option key={id} value={id}>
                    {id}
                  </option>
                ))}
            </select>
          </div>
      </div>
      <Navigation prev="/pericias" next="/habilidades" />
    </div>
  )
}

