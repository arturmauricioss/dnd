import { useEffect, useMemo } from 'react'
import { useCharacter } from '../../context/CharacterContext'
import { Navigation, Page } from '../global'
import {
  getIdiomasBase,
  getIdiomasFixosClasse,
  calcularQtdExtras,
  getAlfabetizacao,
  validarIdiomasAtuais,
  getPoolExtrasUnicos
} from './idiomasLogic'
import './Idiomas.css'

export default function Idiomas() {
  const { personagem, atualizarCampo, getModificador } = useCharacter()
  
  const raca = personagem.race || 'humano'
  const classe = personagem.classe || ''
  const intMod = getModificador('inteligencia')
  
  const idiomasAtuais = useMemo(() => personagem.idiomas || [], [personagem.idiomas])
  const pontosFalarIdioma = useMemo(() => personagem.pontosFalarIdioma || 0, [personagem.pontosFalarIdioma])
  const periciasState = useMemo(() => personagem.pericias || {}, [personagem.pericias])
  const alfabetizacaoGrad = useMemo(() => periciasState['Alfabetização']?.graduacao || 0, [periciasState])

  const idiomasBase = useMemo(() => getIdiomasBase(raca), [raca])
  const idiomasFixosClasse = useMemo(() => getIdiomasFixosClasse(classe), [classe])
  const qtdExtras = useMemo(() => calcularQtdExtras(intMod, pontosFalarIdioma), [intMod, pontosFalarIdioma])
  const alfabetizacao = useMemo(() => getAlfabetizacao(classe, alfabetizacaoGrad), [classe, alfabetizacaoGrad])
  const poolExtrasUnicos = useMemo(() => getPoolExtrasUnicos(raca, classe, idiomasBase, idiomasFixosClasse), [raca, classe, idiomasBase, idiomasFixosClasse])

  useEffect(() => {
    const idiomasValidos = validarIdiomasAtuais(idiomasAtuais, raca, classe)
    
    if (idiomasValidos.length !== idiomasAtuais.length) {
      atualizarCampo('idiomas', idiomasValidos)
    }
  }, [classe, raca, atualizarCampo, idiomasAtuais])

  const adicionarIdioma = (idioma) => {
    if (!idioma || idiomasAtuais.length >= qtdExtras) return
    if (idiomasAtuais.includes(idioma)) return
    
    atualizarCampo('idiomas', [...idiomasAtuais, idioma])
  }

  const removerIdioma = (idioma) => {
    atualizarCampo('idiomas', idiomasAtuais.filter(i => i !== idioma))
  }

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
              <strong>{idiomasAtuais.length} / {qtdExtras} (INT + Falar Idioma)</strong>
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
                <button className="btn-remover-idioma" onClick={() => removerIdioma(idioma)}>×</button>
              </div>
            ))}
          </div>

          {idiomasFixosClasse.length > 0 && (
            <div className="idiomas-nota">
              * {idiomasFixosClasse.join(', ')} é idioma fixo da classe {classe} (não conta para o limite de idiomas extras)
            </div>
          )}

          {qtdExtras > 0 && idiomasAtuais.length < qtdExtras && (
            <div className="idiomas-extras">
              <label>Adicionar idioma extra (INT):</label>
              <select 
                onChange={(e) => {
                  adicionarIdioma(e.target.value)
                  e.target.value = ''
                }}
                defaultValue=""
              >
                <option value="">Selecione...</option>
                {poolExtrasUnicos
                  .filter(id => !idiomasAtuais.includes(id))
                  .map(id => (
                    <option key={id} value={id}>{id}</option>
                  ))
                }
              </select>
            </div>
          )}
        </div>
        <Navigation prev="/pericias" next="/dinheiro" />
      </div>
  )
}