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
    Object.entries(itensFornecimento).map(([id, item]) => [id, { id, tipo: "fornecimento", ...item }])
  ),
  ...Object.fromEntries(
    Object.entries(itensGerais).map(([id, item]) => [id, { id, tipo: "item", ...item }])
  ),
  ...Object.fromEntries(
    Object.entries(itensEspeciais).map(([id, item]) => [id, { id, tipo: "especial", ...item }])
  ),
  ...Object.fromEntries(
    Object.entries(instrumentos).map(([id, item]) => [id, { id, tipo: "instrumento", ...item }])
  ),
  ...Object.fromEntries(
    Object.entries(indumentaria).map(([id, item]) => [id, { id, tipo: "indumentaria", ...item }])
  ),
  ...Object.fromEntries(
    Object.entries(comidaBebida).map(([id, item]) => [id, { id, tipo: "comida", ...item }])
  ),
  ...Object.fromEntries(
    Object.entries(montarias).map(([id, item]) => [id, { id, tipo: "montaria", ...item }])
  ),
  ...Object.fromEntries(
    Object.entries(transporte).map(([id, item]) => [id, { id, tipo: "transporte", ...item }])
  )
};