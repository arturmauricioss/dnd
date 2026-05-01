export function podeEscolherTalento(talento, personagem, getAtributoTotal) {
  if (!talento.requisitos || talento.requisitos.length === 0) return true

  return talento.requisitos.every(req => {
    if (req.tipo === 'atributo') {
      return getAtributoTotal(req.atributo) >= req.valor
    }

    if (req.tipo === 'talento') {
      return personagem.talentos.includes(req.talento)
    }

    return true
  })
}