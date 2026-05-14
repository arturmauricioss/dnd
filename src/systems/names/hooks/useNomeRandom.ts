import { useCallback } from 'react'
import { nomes } from '../data/namesData'
import type { Race, RaceKey } from '@systems/race/types'
import type { NameCultureKey } from '../data/namesCultureData'

interface UseNomeRandomProps {
  raca: Race | null
  genero: string
  setNome: (nome: string) => void
}

const raceCulturesMap: Record<RaceKey, NameCultureKey[]> = {
  human: ['human'],
  dwarf: ['dwarf'],
  elf: ['elf'],
  gnome: ['gnome'],
  halfling: ['halfling'],

  'half-elf': ['human', 'elf'],
  'half-orc': ['human', 'orc'],
}

export default function useNomeRandom({
  raca,
  genero,
  setNome,
}: UseNomeRandomProps) {
  const filtrarNomes = useCallback(
    (racaSelecionada: Race | null, generoSelecionado: string) => {
      let filtrados = [...nomes]

      if (racaSelecionada) {
        const culturasPermitidas =
          raceCulturesMap[racaSelecionada.key]

        filtrados = filtrados.filter(nome => {
          // universal
          if (nome.culturas.length === 0) {
            return true
          }

          return nome.culturas.some(cultura =>
            culturasPermitidas.includes(
              cultura as NameCultureKey
            )
          )
        })
      }

      if (generoSelecionado) {
        filtrados = filtrados.filter(
          nome =>
            nome.genero === generoSelecionado ||
            nome.genero === 'unissex'
        )
      }

      return filtrados
    },
    []
  )

  const gerarNome = useCallback(() => {
    let filtrados = [...nomes]

    if (genero) {
      filtrados = filtrados.filter(
        nome =>
          nome.genero === genero ||
          nome.genero === 'unissex'
      )
    }

    if (filtrados.length === 0) return

    const randomIndex = Math.floor(
      Math.random() * filtrados.length
    )

    setNome(filtrados[randomIndex].nome)
  }, [genero, setNome])

  const gerarNomeRaca = useCallback(() => {
    if (!raca) return

    const filtrados = filtrarNomes(raca, genero)

    if (filtrados.length === 0) return

    const randomIndex = Math.floor(
      Math.random() * filtrados.length
    )

    setNome(filtrados[randomIndex].nome)
  }, [raca, genero, filtrarNomes, setNome])

  const isBotaoRacaDisabled = !raca

  return {
    gerarNome,
    gerarNomeRaca,
    isBotaoRacaDisabled,
  }
}