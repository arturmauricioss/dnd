import { tamanhoPorRaca } from './racasData'

export { tamanhoPorRaca }

export const modificadoresTamanho = {
  pequena: {
    ca: 1,
    bba: 1,
    agarrar: -4,
    dano: 0,
  },
  media: {
    ca: 0,
    bba: 0,
    agarrar: 0,
    dano: 0,
  },
  grande: {
    ca: -1,
    bba: 1,
    agarrar: 4,
    dano: 2,
  },
  enorme: {
    ca: -2,
    bba: 2,
    agarrar: 8,
    dano: 4,
  },
  gigante: {
    ca: -3,
    bba: 3,
    agarrar: 12,
    dano: 6,
  },
  colosal: {
    ca: -4,
    bba: 4,
    arrastar: 16,
    dano: 8,
  },
}

export function getTamanhoPorRaca(racaId) {
  return tamanhoPorRaca[racaId] || 'media'
}

export function getModificadoresTamanho(tamanhoId) {
  return modificadoresTamanho[tamanhoId] || modificadoresTamanho.media
}