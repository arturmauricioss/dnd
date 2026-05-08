import { useState, useEffect, useMemo, useRef, useCallback } from 'react'
import type { MetodoAtributos, Atributos, CharacterStep } from '@types'
import { gerarAtributos4d6, calcularCusto, executarRegras, metodoLabel } from '@rules/atributos'
import { getDivindadesOrdenadas } from '@rules/tendencias'
import { gerarNomeAleatorio } from '@rules/nomes'
import { STEPS, valoresDefinidos, pontosCompraMax } from '@data/characterData'

export function useCharacterCreation() {
  const [currentStep, setCurrentStep] = useState<CharacterStep>('nome')
  
  const [nome, setNome] = useState('')
  const [genero, setGenero] = useState<'m' | 'f'>('m')
  
  const [raca, setRaca] = useState<string | null>(null)
  const [racaConfirmada, setRacaConfirmada] = useState(false)
  const [variacaoImagem, setVariacaoImagem] = useState(1)
  const [aparenciaConfirmada, setAparenciaConfirmada] = useState(false)
  
  const [classe, setClasse] = useState<string | null>(null)
  const [classeConfirmada, setClasseConfirmada] = useState(false)
  const [nivel, setNivel] = useState(1)
  
  const [tendencia, setTendencia] = useState<string | null>(null)
  const [tendenciaConfirmada, setTendenciaConfirmada] = useState(false)
  const [divindade, setDivindade] = useState<string | null>(null)
  
  const [metodo, setMetodo] = useState<MetodoAtributos | null>(null)
  const [atributos, setAtributos] = useState<Atributos>({
    forca: 10,
    destreza: 10,
    constituicao: 10,
    inteligencia: 10,
    sabedoria: 10,
    carisma: 10
  })
  
  const [valoresConfirmados, setValoresConfirmados] = useState(false)
  const [atributoSelecionado, setAtributoSelecionado] = useState<string | null>(null)

  const pressTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const currentCampoRef = useRef<string>('')

  const atributosComModificador = useMemo(() => {
    const resultado = executarRegras({ atributos, metodo, raca })
    return resultado.atributosFinais
  }, [atributos, metodo, raca])

  const resultadoRegras = useMemo(() => {
    return executarRegras({ atributos, metodo, raca })
  }, [atributos, metodo, raca])

  const pontosUsados = resultadoRegras.custoPontos

  const podeReroll = useMemo(() => {
    return resultadoRegras.temDireitoReroll
  }, [resultadoRegras.temDireitoReroll])

  const divindadesOrdenadas = useMemo(() => {
    if (!tendencia) return []
    return getDivindadesOrdenadas(tendencia, raca, classe)
  }, [tendencia, raca, classe])

  useEffect(() => {
    if (metodo === 'compra' && !valoresConfirmados) {
      setAtributos({ forca: 8, destreza: 8, constituicao: 8, inteligencia: 8, sabedoria: 8, carisma: 8 })
    }
  }, [metodo, valoresConfirmados])

  const goToStep = useCallback((step: CharacterStep) => {
    setCurrentStep(step)
  }, [])

  const nextStep = useCallback(() => {
    const currentIndex = STEPS.indexOf(currentStep)
    if (currentIndex < STEPS.length - 1) {
      setCurrentStep(STEPS[currentIndex + 1])
    }
  }, [currentStep])

  const prevStep = useCallback(() => {
    const currentIndex = STEPS.indexOf(currentStep)
    if (currentIndex > 0) {
      setCurrentStep(STEPS[currentIndex - 1])
    }
  }, [currentStep])

  const gerarNome = useCallback(() => {
    const nomeGerado = gerarNomeAleatorio(genero)
    setNome(nomeGerado)
    return nomeGerado
  }, [genero])

  const aplicarMetodo4d6 = useCallback(() => {
    const valores = gerarAtributos4d6()
    setAtributos({
      forca: valores[0],
      destreza: valores[1],
      constituicao: valores[2],
      inteligencia: valores[3],
      sabedoria: valores[4],
      carisma: valores[5]
    })
  }, [])

  const aplicarMetodoDefinido = useCallback(() => {
    setAtributos({
      forca: valoresDefinidos[0],
      destreza: valoresDefinidos[1],
      constituicao: valoresDefinidos[2],
      inteligencia: valoresDefinidos[3],
      sabedoria: valoresDefinidos[4],
      carisma: valoresDefinidos[5]
    })
  }, [])

  const confirmarMetodo = useCallback(() => {
    if (metodo === '4d6-baixo') {
      aplicarMetodo4d6()
    } else if (metodo === 'definido') {
      aplicarMetodoDefinido()
    }
  }, [metodo, aplicarMetodo4d6, aplicarMetodoDefinido])

  const handleAtributoClick = useCallback((campo: string) => {
    const podeTrocar = valoresConfirmados || metodo === '4d6-baixo' || metodo === 'definido'
    if (!podeTrocar) return
    
    if (!atributoSelecionado) {
      setAtributoSelecionado(campo)
    } else if (atributoSelecionado !== campo) {
      const valor1 = atributos[atributoSelecionado as keyof typeof atributos]
      const valor2 = atributos[campo as keyof typeof atributos]
      setAtributos(prev => ({
        ...prev,
        [atributoSelecionado]: valor2,
        [campo]: valor1
      }))
      setAtributoSelecionado(null)
    } else {
      setAtributoSelecionado(null)
    }
  }, [atributoSelecionado, atributos, metodo, valoresConfirmados])

  const confirmarReroll = useCallback(() => {
    aplicarMetodo4d6()
  }, [aplicarMetodo4d6])

  const manterValores = useCallback(() => {
    setValoresConfirmados(true)
  }, [])

  const ajustarPontosClick = useCallback((campo: string, shiftKey: boolean) => {
    const valorAtual = atributos[campo as keyof typeof atributos]
    const novoValor = valorAtual + (shiftKey ? -1 : 1)
    if (novoValor < 8 || novoValor > 18) return
    
    const custoAtual = calcularCusto(valorAtual)
    const custoNovo = calcularCusto(novoValor)
    const pontosRestantes = pontosCompraMax - pontosUsados
    
    if (shiftKey ? true : custoNovo - custoAtual <= pontosRestantes) {
      setAtributos(prev => ({ ...prev, [campo]: novoValor }))
    }
  }, [atributos, pontosUsados])

  const handleMouseDownPontos = useCallback((campo: string) => {
    if (metodo !== 'compra') return
    currentCampoRef.current = campo
    
    pressTimerRef.current = setTimeout(() => {
      setAtributos({ forca: 8, destreza: 8, constituicao: 8, inteligencia: 8, sabedoria: 8, carisma: 8 })
    }, 400)
  }, [metodo])

  const handleMouseUpPontos = useCallback((campo: string, e: React.MouseEvent) => {
    if (metodo !== 'compra') return
    
    if (pressTimerRef.current) {
      clearTimeout(pressTimerRef.current)
      pressTimerRef.current = null
      ajustarPontosClick(campo, e.shiftKey)
    }
  }, [metodo, ajustarPontosClick])

  const atualizarAtributo = useCallback((campo: string, valor: string | number) => {
    const num = typeof valor === 'number' ? valor : parseInt(valor, 10) || 0
    if (metodo === 'compra') {
      const custo = calcularCusto(num)
      if (custo > pontosCompraMax - (pontosUsados - calcularCusto(atributos[campo as keyof typeof atributos]))) {
        return
      }
    }
    setAtributos(prev => ({ ...prev, [campo]: num }))
  }, [metodo, atributos, pontosUsados])

  const validarAtributo = useCallback((campo: string, valor: number) => {
    let str = String(valor).replace(/^0+/, '')
    let valorFinal = parseInt(str, 10) || 0
    if (valorFinal < 3) valorFinal = 3
    if (valorFinal > 18) valorFinal = 18
    if (metodo === 'compra' && valorFinal < 8) valorFinal = 8
    setAtributos(prev => ({ ...prev, [campo]: valorFinal }))
  }, [metodo])

  const podeConfirmarRaca = useMemo(() => raca !== null, [raca])
  const podeConfirmarAparencia = useMemo(() => raca !== null, [raca])
  const podeConfirmarClasse = useMemo(() => classe !== null, [classe])
  const podeConfirmarTendencias = useMemo(() => tendencia !== null && divindade !== null, [tendencia, divindade])

  const podeTrocarAtributos = useMemo(() => {
    return valoresConfirmados || metodo === '4d6-baixo' || metodo === 'definido'
  }, [valoresConfirmados, metodo])

  const isStepComplete = useCallback((step: CharacterStep): boolean => {
    switch (step) {
      case 'nome':
        return nome.length > 0
      case 'atributos':
        return valoresConfirmados
      case 'raca':
        return raca !== null
      case 'aparencia':
        return variacaoImagem > 0
      case 'classe':
        return classe !== null
      case 'tendencias':
        return tendencia !== null && divindade !== null
      case 'resumo':
        return true
      default:
        return false
    }
  }, [nome, valoresConfirmados, raca, variacaoImagem, classe, tendencia, divindade])

  return {
    currentStep,
    setCurrentStep,
    goToStep,
    nextStep,
    prevStep,

    nome,
    setNome,
    genero,
    setGenero,
    gerarNome,

    raca,
    setRaca,
    racaConfirmada,
    setRacaConfirmada,
    variacaoImagem,
    setVariacaoImagem,
    aparenciaConfirmada,
    setAparenciaConfirmada,
    podeConfirmarRaca,
    podeConfirmarAparencia,

    classe,
    setClasse,
    classeConfirmada,
    setClasseConfirmada,
    nivel,
    setNivel,
    podeConfirmarClasse,

    tendencia,
    setTendencia,
    tendenciaConfirmada,
    setTendenciaConfirmada,
    divindade,
    setDivindade,
    podeConfirmarTendencias,
    divindadesOrdenadas,

    metodo,
    setMetodo,
    metodoLabel,
    confirmarMetodo,
    atributos,
    setAtributos,
    atributosComModificador,
    resultadoRegras,
    pontosUsados,
    podeReroll,
    valoresConfirmados,
    setValoresConfirmados,
    atributoSelecionado,
    podeTrocarAtributos,

    handleAtributoClick,
    confirmarReroll,
    manterValores,
    ajustarPontosClick,
    handleMouseDownPontos,
    handleMouseUpPontos,
    atualizarAtributo,
    validarAtributo,
    pressTimerRef,

    isStepComplete
  }
}