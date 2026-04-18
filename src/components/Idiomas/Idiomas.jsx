import { useEffect, useMemo } from 'react'
import { useCharacter } from '../../context/CharacterContext'
import { idiomasRaciais, idiomasClasseExtras, idiomaClasseFixo, TODOS_IDIOMAS } from './idiomasData'
import { podeUsarAlfabetizacao } from '../Classes/classesData'
import { Navigation, Page } from '../global'
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

  useEffect(() => {
    const idiomasBase = (idiomasRaciais[raca]?.base || ['Comum'])
    const fixosClasse = idiomaClasseFixo[classe] || []
    const todosValidos = [...idiomasBase, ...fixosClasse]
    
    const idiomasInvalidos = idiomasAtuais.filter(id => !todosValidos.includes(id))
    
    if (idiomasInvalidos.length > 0) {
      atualizarCampo('idiomas', idiomasAtuais.filter(id => todosValidos.includes(id)))
    }
  }, [classe, raca, atualizarCampo, idiomasAtuais])

  const dadosRaca = idiomasRaciais[raca] || { base: ['Comum'], extras: [] }
  const idiomasBase = dadosRaca.base
  
  let poolExtras = [...dadosRaca.extras]
    
  if (idiomasClasseExtras[classe]) {
    poolExtras.push(...idiomasClasseExtras[classe])
  }

  const idiomasFixoClasse = idiomaClasseFixo[classe] || []
    
  if (raca === 'humano' || raca === 'meio-elfo') {
    poolExtras = [...TODOS_IDIOMAS]
  }
    
  const poolExtrasUnicos = [...new Set(poolExtras)].filter(id => 
    !idiomasBase.includes(id) && !idiomasFixoClasse.includes(id)
  )
  
  const qtdExtrasPorInt = Math.max(0, intMod)
  const qtdExtras = qtdExtrasPorInt + pontosFalarIdioma
  
  const podeAlfabetizar = podeUsarAlfabetizacao(classe)
  const alfabetizacao = (!podeAlfabetizar && alfabetizacaoGrad < 2) ? 'Analfabeto' : 'Alfabetizado'

  const adicionarIdioma = (idioma) => {
    if (!idioma || idiomasAtuais.length >= qtdExtras) return
    if (idiomasAtuais.includes(idioma)) return
    
    atualizarCampo('idiomas', [...idiomasAtuais, idioma])
  }

  const removerIdioma = (idioma) => {
    atualizarCampo('idiomas', idiomasAtuais.filter(i => i !== idioma))
  }

  return (
    <Page>
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
            
            {idiomasFixoClasse.map((idioma, idx) => (
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

          {idiomasFixoClasse.length > 0 && (
            <div className="idiomas-nota">
              * {idiomasFixoClasse.join(', ')} é idioma fixo da classe {classe} (não conta para o limite de idiomas extras)
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
    </Page>
  )
}