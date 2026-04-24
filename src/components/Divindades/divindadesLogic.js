import { divindades, passoPorAlinhamento } from './divindadesData'
import { getDeusesRaciaisFormatados } from '../Racas/racasLogic';
import { getDeusesPorClasse } from '../Classes/classesData';
import { alinhamentos, podeSelecionarAlinhamento } from './alinhamentosData';

export function calcularPassos(alinhamento1, alinhamento2) {
    const pos1 = passoPorAlinhamento[alinhamento1]
    const pos2 = passoPorAlinhamento[alinhamento2]
    if (!pos1 || !pos2) return 99
    return Math.abs(pos1[0] - pos2[0]) + Math.abs(pos1[1] - pos2[1])
}

export function getDeusesPorAlinhamento(alinhamentoId) {
    if (!alinhamentoId || alinhamentoId === 'selecione') return []
    
    const posAlinhamento = passoPorAlinhamento[alinhamentoId]
    if (!posAlinhamento) return []
    
    return divindades.filter(d => {
        const posDeus = passoPorAlinhamento[d.alinhamento]
        if (!posDeus) return false
        const passos = Math.abs(posAlinhamento[0] - posDeus[0]) + Math.abs(posAlinhamento[1] - posDeus[1])
        return passos <= 1
    })
}

export function getDeusPorId(deusId) {
    return divindades.find(d => d.value === deusId) || null
}

export function filtrarDeuses(personagem) {
  const deusesRaciais = getDeusesRaciaisFormatados(personagem.race);

  const isClerigo = personagem.classe === 'clerigo';
  const temAlinhamento = personagem.alignment && personagem.alignment !== 'selecione';

  let deusesAlinhamento = [];
  if (temAlinhamento) {
    deusesAlinhamento = getDeusesPorAlinhamento(personagem.alignment);
  }

  let deusesClasse = [];
  let deusesTendencia = [];

  if (!isClerigo) {
    const deusesClasseIds = getDeusesPorClasse(personagem.classe);
    deusesClasse = deusesClasseIds.map(id => getDeusPorId(id)).filter(Boolean);

    if (temAlinhamento) {
      const deusesRaciaisValues = deusesRaciais.map(d => d.value);
      const deusesClasseValues = deusesClasse.map(d => d.value);

      deusesTendencia = deusesAlinhamento.filter(d =>
        !deusesRaciaisValues.includes(d.value) &&
        !deusesClasseValues.includes(d.value)
      );
    }
  }

  const deusesFinais = isClerigo
    ? [...deusesRaciais, ...deusesAlinhamento]
    : [...deusesRaciais, ...deusesClasse, ...deusesTendencia];

  return deusesFinais.filter((deus, index, self) =>
    index === self.findIndex(d => d.value === deus.value)
  );
}

export function filtrarAlinhamentosPorClasse(classe) {
  if (!classe || classe === 'selecione') return alinhamentos;
  return alinhamentos.filter(a => podeSelecionarAlinhamento(classe, a.id));
}