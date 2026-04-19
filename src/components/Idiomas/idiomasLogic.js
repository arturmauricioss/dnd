import { idiomasRaciais, idiomasClasseExtras, idiomaClasseFixo, TODOS_IDIOMAS } from './idiomasData'
import { podeUsarAlfabetizacao } from '../Classes/classesData'

export function getIdiomasBase(raca) {
  const dadosRaca = idiomasRaciais[raca] || { base: ['Comum'], extras: [] }
  return dadosRaca.base
}

export function getPoolExtras(raca, classe) {
  const dadosRaca = idiomasRaciais[raca] || { base: ['Comum'], extras: [] }
  let poolExtras = [...dadosRaca.extras]
  
  if (idiomasClasseExtras[classe]) {
    poolExtras.push(...idiomasClasseExtras[classe])
  }
  
  if (raca === 'humano' || raca === 'meio-elfo') {
    poolExtras = [...TODOS_IDIOMAS]
  }
  
  return [...new Set(poolExtras)]
}

export function getIdiomasFixosClasse(classe) {
  return idiomaClasseFixo[classe] || []
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

export function validarIdiomasAtuais(idiomasAtuais, raca, classe) {
  const idiomasBase = getIdiomasBase(raca)
  const idiomasFixos = getIdiomasFixosClasse(classe)
  const todosValidos = [...idiomasBase, ...idiomasFixos]
  
  return idiomasAtuais.filter(id => todosValidos.includes(id))
}

export function getPoolExtrasUnicos(raca, classe, idiomasBase, idiomasFixosClasse) {
  const poolExtras = getPoolExtras(raca, classe)
  
  return poolExtras.filter(id => 
    !idiomasBase.includes(id) && 
    !idiomasFixosClasse.includes(id)
  )
}