import { useState, useMemo } from 'react'
import { useCharacter } from '../context/CharacterContext'
import { periciasConfig, periciasPorClasse } from '../data/pericias'
import { getBonusPericiaRacial } from '../data/bonusPericias'
import { todosItens, getPenalidadeTotal } from '../data/itemDatabase'
import './Pericias.css'

const pontosPorClasse = {
  barbaro: 4,
  bardo: 6,
  clerigo: 2,
  druida: 4,
  feiticeiro: 2,
  guerreiro: 2,
  ladino: 8,
  mago: 2,
  monge: 4,
  paladina: 2,
  ranger: 4,
}

const habilidadeAtributos = {
  forca: 'forca',
  destreza: 'destreza',
  constituicao: 'constituicao',
  inteligencia: 'inteligencia',
  sabedoria: 'sabedoria',
  carisma: 'carisma',
  nenhuma: 'nenhuma',
}

const habilidadeAbreviada = {
  forca: 'for',
  destreza: 'dex',
  constituicao: 'con',
  inteligencia: 'int',
  sabedoria: 'sab',
  carisma: 'car',
  nenhuma: '—',
}

export default function Pericias() {
  const [expandido, setExpandido] = useState(true)
  const { personagem, getModificador } = useCharacter()

  const [periciasState, setPericiasState] = useState(() => {
    const inicial = {}

    periciasConfig.forEach((p) => {
      inicial[p.nome] = {
        graduacao: 0,
        outros: 0,
      }
    })

    return inicial
  })

  const nivel = personagem.level_class || 1
  const intMod = getModificador('inteligencia')
  const base = pontosPorClasse[personagem.classe] || 2

  const penalidadeEquip = getPenalidadeTotal(
    personagem.equipment?.armor,
    personagem.equipment?.shield
  )

  const pontosPericia = useMemo(() => {
    if (!personagem.classe || personagem.classe === 'selecione') return 0

    const pontosBase = base + intMod
    let total = pontosBase * 4

    if (nivel > 1) {
      total += (nivel - 1) * pontosBase
    }

    if (personagem.race === 'humano') {
      total += 4 + (nivel - 1)
    }

    return Math.max(1, total)
  }, [personagem.classe, personagem.race, nivel, base, intMod])

  const habilidadesOrdenadas = useMemo(() => {
    const sorted = [...periciasConfig].sort((a, b) =>
      a.nome.localeCompare(b.nome, 'pt-BR')
    )

    const meio = Math.ceil(sorted.length / 2)

    return {
      primeira: sorted.slice(0, meio),
      segunda: sorted.slice(meio),
    }
  }, [])

  const maxGradPorNivel = nivel + 3

  const isPericiaDeClasse = (nomePericia) => {
    const pericias = periciasPorClasse[personagem.classe] || []
    return pericias.includes(nomePericia)
  }

  const handleGraduacaoChange = (nomePericia, valor) => {
    setPericiasState((prev) => {
      const novaState = {
        ...prev,
        [nomePericia]: {
          ...prev[nomePericia],
          graduacao: valor,
        },
      }

      let gastos = 0

      periciasConfig.forEach((p) => {
        const grad = novaState[p.nome]?.graduacao || 0
        const isClasse = isPericiaDeClasse(p.nome)

        gastos += isClasse ? grad : grad * 2
      })

      if (gastos > pontosPericia) {
        return prev // cancela mudança
      }

      return novaState
    })
  }

  const handleOutrosChange = (nomePericia, valor) => {
    setPericiasState((prev) => ({
      ...prev,
      [nomePericia]: {
        ...prev[nomePericia],
        outros: valor,
      },
    }))
  }

  const calcularOutrosTotal = (pericia) => {
    const estado = periciasState[pericia.nome]
    const outrosManual = estado?.outros || 0
    const bonusRacial = getBonusPericiaRacial(personagem.race, pericia.nome)
    const penalidadeArmadura = pericia.penalidade ? -penalidadeEquip : 0

    return outrosManual + bonusRacial + penalidadeArmadura
  }

  const calcularTotalPericia = (pericia) => {
    const estado = periciasState[pericia.nome]
    if (!estado) return 0

    const grad = estado.graduacao || 0
    const isClasse = isPericiaDeClasse(pericia.nome)

    const habAttr = habilidadeAtributos[pericia.habilidade] || 'nenhuma'
    const modHab = getModificador(habAttr)

    const maxGrad = isClasse
      ? maxGradPorNivel
      : Math.floor(maxGradPorNivel / 2)

    const gradLimitado = Math.min(grad, maxGrad)
    const outrosTotal = calcularOutrosTotal(pericia)

    return modHab + gradLimitado + outrosTotal
  }

  const verificarPontos = () => {
    let gastos = 0

    periciasConfig.forEach((p) => {
      const estado = periciasState[p.nome]

      if (estado?.graduacao > 0) {
        const isClasse = isPericiaDeClasse(p.nome)
        const custo = isClasse ? estado.graduacao : estado.graduacao * 2
        gastos += custo
      }
    })

    return Math.max(0, pontosPericia - gastos)
  }

  const pontosRestantes = verificarPontos()

  const renderPericia = (pericia) => {
    const estado = periciasState[pericia.nome]
    const isClasse = isPericiaDeClasse(pericia.nome)
    const total = calcularTotalPericia(pericia)

    const habAttr = habilidadeAtributos[pericia.habilidade] || 'nenhuma'
    const modHab = getModificador(habAttr)

    return (
      <div
        key={pericia.nome}
        className={`pericia-item ${isClasse ? 'pericia-classe' : ''}`}
      >
        <div className="pericia-nome">
          <span>
            {pericia.nome} ({habilidadeAbreviada[pericia.habilidade]})
          </span>
          {pericia.somente_treinado && <span className="treinado">X</span>}
          {isClasse && <span className="classe-icon">🔥</span>}
        </div>

        <div className="pericia-total">
          <input
            tabIndex="-1"
            type="text"
            value={total >= 0 ? `+${total}` : total}
            readOnly
          />
        </div>

        <div className="pericia-graduacao">
          <input
            type="number"
            min="0"
            max={isClasse ? maxGradPorNivel : maxGradPorNivel / 2}
            step={isClasse ? 1 : 0.5}
            value={estado?.graduacao || 0}
            onChange={(e) => {
              const valor = parseFloat(e.target.value) || 0
              handleGraduacaoChange(pericia.nome, valor)
            }}
          />
        </div>

        <div className="pericia-hab">
          <span tabIndex="-1" className="mod">{modHab >= 0 ? `+${modHab}` : modHab}</span>
        </div>

        <div className="pericia-outros">
          <input
            tabIndex="-1"
            readOnly
            type="number"
            value={calcularOutrosTotal(pericia)}
            onChange={(e) => {
              const bonusRacial = getBonusPericiaRacial(
                personagem.race,
                pericia.nome
              )

              const penalidadeArmadura = pericia.penalidade
                ? -penalidadeEquip
                : 0

              const valorDigitado = parseInt(e.target.value) || 0
              const valorManual =
                valorDigitado - bonusRacial - penalidadeArmadura

              handleOutrosChange(pericia.nome, valorManual)
            }}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="pericias-container">
      <div className="section-header">
        <h3>Perícias</h3>
        <button className="btn-collapse" onClick={() => setExpandido(!expandido)}>
          {expandido ? '▼' : '▶'}
        </button>
      </div>
      {expandido && (
        <div className="pericias-info">
          <div className="info-item">
            <span>Pontos disponíveis:</span>
            <strong>{pontosPericia}</strong>
          </div>

          <div className="info-item">
            <span>Saldo:</span>
            <strong>{pontosRestantes}</strong>
          </div>

          <div className="info-item">
            <span>Máx. graduação:</span>
            <strong>{maxGradPorNivel}</strong>
          </div>
</div>
      )}

      {expandido && (
        <div>
          <div className="pericias-header-mobile">
            <span>Perícia</span>
            <span>Total</span>
            <span>Grad</span>
            <span>Hab</span>
            <span>Outros</span>
          </div>

          <div className="pericias-list">
            <div className="pericias-coluna">
              <div className="pericias-header">
                <span>Perícia</span>
                <span>Total</span>
                <span>Grad</span>
                <span>Hab</span>
                <span>Outros</span>
              </div>
              {habilidadesOrdenadas.primeira.map(renderPericia)}
            </div>

            <div className="pericias-coluna">
              <div className="pericias-header">
                <span>Perícia</span>
                <span>Total</span>
                <span>Grad</span>
                <span>Hab</span>
                <span>Outros</span>
              </div>
              {habilidadesOrdenadas.segunda.map(renderPericia)}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
