import Page from '@components/shell/Page/Page'
import Title from '@components/ui/basic/Title/Title'
import { useCharacterCreation } from '@features/character-creation/hooks/useCharacterCreation'
import { racas, totalImagensPorRaca, tamanhos, deslocamentos } from '@systems/races/data/racasData'
import { classes } from '@systems/classes/data/classesData'
import { alinhamentos, divindades } from '@systems/tendencies/data/tendenciasData'
import { getImagemPath } from '@systems/races/rules/racas'
import { tendenciaPermitida, getPontuacaoDeus } from '@systems/tendencies/rules/tendencias'

import NomeForm from '@features/character-creation/components/NomeForm'
import MetodoSelector from '@features/character-creation/components/MetodoSelector'
import AtributosGrid from '@features/character-creation/components/AtributosGrid'
import RacaSelection from '@features/character-creation/components/RacaSelection'
import AparenciaSelection from '@features/character-creation/components/AparenciaSelection'
import ClasseSelection from '@features/character-creation/components/ClasseSelection'
import TendenciaSelection from '@features/character-creation/components/TendenciaSelection'
import PersonagemCard from '@features/character-creation/components/PersonagemCard'

export default function NovoHeroiPage() {
  const {
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

    classe,
    setClasse,
    classeConfirmada,
    setClasseConfirmada,
    nivel,
    setNivel,

    tendencia,
    setTendencia,
    tendenciaConfirmada,
    setTendenciaConfirmada,
    divindade,
    setDivindade,
    divindadesOrdenadas,

    metodo,
    setMetodo,
    confirmarMetodo,
    atributos,
    atributosComModificador,
    resultadoRegras,
    pontosUsados,
    podeReroll,
    valoresConfirmados,
    atributoSelecionado,

    handleAtributoClick,
    confirmarReroll,
    manterValores,
    handleMouseDownPontos,
    handleMouseUpPontos,
    atualizarAtributo,
    validarAtributo
  } = useCharacterCreation()

  return (
    <Page>
      <Title size="xl" className="mt-md">Novo Herói</Title>

      {tendenciaConfirmada && (
        <PersonagemCard
          nome={nome}
          racaNome={racas.find(r => r.id === raca)?.nome || ''}
          genero={genero}
          tamanho={raca ? tamanhos[raca] : 'medio'}
          deslocamento={raca ? deslocamentos[raca] : 0}
          classeNome={classes.find(c => c.id === classe)?.nome || ''}
          nivel={nivel}
          tendenciaNome={alinhamentos.find(a => a.id === tendencia)?.nome || ''}
          divindadeNome={divindades.find(d => d.id === divindade)?.nome || ''}
          atributos={atributosComModificador}
          imagem={getImagemPath(raca!, genero, variacaoImagem)}
        />
      )}

      {!valoresConfirmados && metodo === null && (
        <NomeForm
          nome={nome}
          genero={genero}
          onNomeChange={setNome}
          onGeneroChange={setGenero}
        />
      )}

      {!valoresConfirmados && metodo === null && (
        <MetodoSelector
          metodo={metodo}
          onMetodoChange={setMetodo}
          onConfirmar={confirmarMetodo}
          nome={nome}
          gerarNome={gerarNome}
          onNomeChange={setNome}
        />
      )}

      {metodo && !valoresConfirmados && (
        <AtributosGrid
          atributos={atributos}
          metodo={metodo}
          valoresConfirmados={valoresConfirmados}
          podeReroll={podeReroll}
          somaModificadores={resultadoRegras.somaModificadores}
          pontosUsados={pontosUsados}
          onAtributoClick={handleAtributoClick}
          onMouseDownPontos={handleMouseDownPontos}
          onMouseUpPontos={handleMouseUpPontos}
          onAtualizarAtributo={atualizarAtributo}
          onValidarAtributo={validarAtributo}
          onConfirmarReroll={confirmarReroll}
          onConfirmarValores={manterValores}
          atributoSelecionado={atributoSelecionado}
        />
      )}

      {valoresConfirmados && !racaConfirmada && (
        <RacaSelection
          racas={racas}
          racaSelecionada={raca}
          onSelect={setRaca}
          onConfirm={() => {
            setRacaConfirmada(true)
            setAparenciaConfirmada(false)
            setVariacaoImagem(1)
          }}
        />
      )}

      {racaConfirmada && !aparenciaConfirmada && (
        <AparenciaSelection
          raca={raca!}
          genero={genero}
          variacao={variacaoImagem}
          totalImagens={totalImagensPorRaca[raca!]}
          onVariacaoChange={setVariacaoImagem}
          onConfirm={() => setAparenciaConfirmada(true)}
          getImagemPath={getImagemPath}
        />
      )}

      {aparenciaConfirmada && !classeConfirmada && (
        <ClasseSelection
          classes={classes}
          classeSelecionada={classe}
          nivel={nivel}
          onSelect={setClasse}
          onNivelChange={setNivel}
          onConfirm={() => setClasseConfirmada(true)}
        />
      )}

      {classeConfirmada && !tendenciaConfirmada && (
        <TendenciaSelection
          alinhamentos={alinhamentos}
          divindadesOrdenadas={divindadesOrdenadas}
          classeId={classe}
          tendenciaSelecionada={tendencia}
          divindadeSelecionada={divindade}
          onTendenciaSelect={(id) => {
            setTendencia(id)
            setDivindade(null)
          }}
          onDivindadeSelect={setDivindade}
          onConfirm={() => setTendenciaConfirmada(true)}
          tendenciaPermitida={tendenciaPermitida}
          getPontuacaoDeus={getPontuacaoDeus}
          raca={raca}
        />
      )}
    </Page>
  )
}