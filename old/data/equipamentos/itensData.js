import { itensFornecimento } from './fornecimentosData'
import { itensGerais } from './itensGeraisData'
import { itensEspeciais } from './itensEspeciaisData'
import { instrumentos } from './instrumentosData'
import { indumentaria } from './indumentariaData'
import { montarias } from './montariasData'
import { comidaBebida } from './comidaBebidaData'
import { transporte } from './transporteData'

export { itensFornecimento, itensGerais, itensEspeciais, instrumentos, indumentaria, montarias, comidaBebida, transporte }

export const ferramentasNormalizadas = Object.fromEntries(
  Object.entries(itensGerais).map(([id, item]) => [id, { id, tipo: "item", ...item }])
);

export const todosItensNormalizados = {
  ...Object.fromEntries(
    Object.entries(itensFornecimento).map(([id, item]) => [id, { id, tipo: "fornecimento", tipoLoja: "fornecimento", ...item }])
  ),
  ...Object.fromEntries(
    Object.entries(itensGerais).map(([id, item]) => [id, { id, tipo: "item", tipoLoja: "item", ...item }])
  ),
  ...Object.fromEntries(
    Object.entries(itensEspeciais).map(([id, item]) => [id, { id, tipo: "especial", tipoLoja: "especial", ...item }])
  ),
  ...Object.fromEntries(
    Object.entries(instrumentos).map(([id, item]) => [id, { id, tipo: "instrumento", tipoLoja: "instrumento", ...item }])
  ),
  ...Object.fromEntries(
    Object.entries(indumentaria).map(([id, item]) => [id, { id, tipo: "indumentaria", tipoLoja: "indumentaria", ...item }])
  ),
  ...Object.fromEntries(
    Object.entries(comidaBebida).map(([id, item]) => {
      let tipoLoja = 'comida'
      if (item.nome.toLowerCase().includes('cerveja') || item.nome.toLowerCase().includes('vinho')) tipoLoja = 'bebida'
      else if (item.nome.toLowerCase().includes('alojamento') || item.nome.toLowerCase().includes('refei')) tipoLoja = 'alojamento'
      return [id, { id, tipo: "comida", tipoLoja, ...item }]
    })
  ),
  ...Object.fromEntries(
    Object.entries(montarias).map(([id, item]) => [id, { id, tipo: "montaria", tipoLoja: "montaria", ...item }])
  ),
  ...Object.fromEntries(
    Object.entries(transporte).map(([id, item]) => {
      let tipoLoja = 'transporte'
      if (['carroca', 'carruagem', 'charrete', 'treno'].includes(id)) tipoLoja = 'carroca'
      else if (['barco_remo', 'remo', 'barcaca'].includes(id)) tipoLoja = 'barco'
      else if (['galeao', 'nav_guerra', 'nav', 'veleiro'].includes(id)) tipoLoja = 'navio'
      return [id, { id, tipo: "transporte", tipoLoja, ...item }]
    })
  )
};