import { idiomasRaciais, TODOS_IDIOMAS } from './idiomasData'
import { podeUsarAlfabetizacao, getIdiomasExtrasPorClasse, getIdiomasFixosClasse as getIdiomasFixosClasseData } from '../Classes/classesData'

export function getIdiomasBase(raca) {
  const dadosRaca = idiomasRaciais[raca] || { base: ['Comum'], extras: [] }
  return dadosRaca.base
}

export function getPoolExtras(raca, classe) {
  const dadosRaca = idiomasRaciais[raca] || { base: ['Comum'], extras: [] }
  let poolExtras = []
  
  // Se extras for null, pode aprender qualquer idioma (humano, meio-elfo)
  if (dadosRaca.extras === null) {
    poolExtras = [...TODOS_IDIOMAS]
  } else {
    poolExtras = [...dadosRaca.extras]
  }
  
  const extrasPorClasse = getIdiomasExtrasPorClasse(classe)
  if (extrasPorClasse.length > 0) {
    poolExtras.push(...extrasPorClasse)
  }
  
  return [...new Set(poolExtras)]
}

export function getIdiomasFixosClasse(classe) {
  return getIdiomasFixosClasseData(classe)
}

export function calcularQtdExtras(intMod, pontosFalarIdioma) {
  return Math.max(0, intMod) + pontosFalarIdioma
}

export function getAlfabetizacao(classe, alfabetizacaoGrad) {
  const podeAlfabetizar = podeUsarAlfabetizacao(classe)
  // Bárbaro precisa de 2+ pontos na perícia para ser alfabetizado
  // Todas as outras classes já são alfabetizadas por padrão
  if (podeAlfabetizar && alfabetizacaoGrad < 2) {
    return 'Analfabeto'
  }
  return 'Alfabetizado'
}

export function getPoolExtrasUnicos(raca, classe, idiomasBase, idiomasFixosClasse) {
  const poolExtras = getPoolExtras(raca, classe)
  
  return poolExtras.filter(id => 
    !idiomasBase.includes(id) && 
    !idiomasFixosClasse.includes(id)
  )
}