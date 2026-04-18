import { racas, bonusRacialAtributos, fisicoPorRaca, fisicoGeral, idadePorRaca, tamanhoPorRaca } from './racasData'
import { deusesRaciais } from './deusesRaciaisData'
import { getDeusPorId } from '../Divindades/divindadesLogic'

export function getRaca(id) {
  return racas.find(r => r.id === id) || racas[0]
}

export function getBonusRacial(racaId) {
  return bonusRacialAtributos[racaId] || { forca: 0, destreza: 0, constituicao: 0, inteligencia: 0, sabedoria: 0, carisma: 0 }
}

export function getTamanhoPorRaca(racaId) {
  return tamanhoPorRaca[racaId] || ''
}

export function getFisicoSugerido(raca, sexo) {
  if (!sexo || sexo === 'selecione') {
    return fisicoGeral[raca] || { altura: '', peso: '' }
  }
  
  const racaData = fisicoPorRaca[raca]
  if (!racaData) return { altura: '', peso: '' }
  
  const sexoKey = sexo === 'feminino' ? 'feminino' : 'masculino'
  return racaData[sexoKey] || { altura: '', peso: '' }
}

export function getIdadeSugerida(raca) {
  const dados = idadePorRaca[raca]
  if (!dados) return { min: '', max: '' }
  return dados
}

export function getDeusesRaciais(racaId) {
  return deusesRaciais[racaId] || []
}

export function getDeusesRaciaisFormatados(racaId) {
  const deusesIds = deusesRaciais[racaId] || []
  return deusesIds.map(id => {
    const deus = getDeusPorId(id)
    return deus ? { value: deus.value, nome: deus.nome } : { value: id, nome: id.toUpperCase() }
  })
}