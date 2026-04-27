export const habilidadesRaciais = {
  humano: [
    { nome: "Tamanho", desc: "Como criaturas Médias, os humanos não sofrem nenhuma penalidade ou recebem qualquer bônus em relação ao tamanho.", aplicado: true },
    { nome: "Deslocamento", desc: "O deslocamento básico dos humanos equivale a 9 metros.", aplicado: true },
    { nome: "Talentoso", desc: "Talento Extra. Humanos são rápidos para dominar tarefas especializadas e suas habilidades são muito variadas.", aplicado: false },
    { nome: "Versátil", desc: "+4 Pericia Nivel 1, A versátilidade e a competência humana são excepcionais", aplicado: true },
    { nome: "Evolução", desc: "+1 Pericia por level. Com vidas mais curtas o desenvolvimento contínuo acelerado é a chave da evolução da raça", aplicado: true },
    { nome: "Idiomas", desc: "Idiomas Básicos: Comum. Tendência para idiomas adicionais: Qualquer um (exceto linguagens secretas, como o Druídico). Os humanos se misturam com muitos tipos de criaturas e são capazes de aprender qualquer idioma existente na sua região.", aplicado: true }
  ],
  anao: [
    { nome: "Resiliência", desc: "+2 de Constituição, -2 de Carisma. Os anões são vigorosos e resistentes, mas costumam ser grosseiros e reservados.", aplicado: true },
    { nome: "Tamanho", desc: "Como criaturas Médias, os anões não sofrem nenhuma penalidade ou recebem qualquer bônus em relação ao tamanho.", aplicado: true },
    { nome: "Deslocamento", desc: "O deslocamento básico dos anões equivale a 6 metros. No entanto, os anões são capazes de percorrer seu deslocamento básico, sem penalidades, mesmo quando utilizam armaduras médias ou pesadas ou transportam uma carga média ou pesada, ao contrário das outras raças, que sofrem uma redução no deslocamento em situações similares.", aplicado: true },
    { nome: "Visão no Escuro", desc: "Visão no Escuro 18m. A visão no escuro somente permite enxergar imagens em preto e branco, mas é idêntica à visão normal em todos os demais aspectos e pode ser utilizada mesmo na escuridão completa.", aplicado: false },
    { nome: "Ligação com Pedras", desc: "+2 de bônus racial aos anões em testes de Procurar para identificar trabalhos incomuns de alvenaria, como paredes deslizantes, armadilhas de pedra, construções recentes (mesmo erguidas para se igualar às antigas), superfícies rochosas instáveis, tetos de pedra que podem desabar e simi lares. Qualquer material que não seja rochoso, mas esteja disfarçado como uma rocha, também é considerado um trabalho incomum de alvenaria. Um anão que passar a 3 metros de um trabalho incomum de alvenaria pode realizar um teste de Procurar como se estivesse procurando ativamente; ele também é capaz de utilizar essa perícia para localizar armadilhas construídas com pedras como um ladino. Os anões conseguem intuir a profundidade subterrânea com a mesma naturalidade que um ser humano é capaz de distinguir acima e abaixo. Os anões possuem um sexto sentido relacionado a trabalhos em pedra e metal, uma habilidade inata que é utilizada e desenvolvida frequentemente em suas moradas subterrâneas.", aplicado: false },
    { nome: "Familiaridade com Armas", desc: "Os anões consideram o machado de guerra anão e o urgrosh anão (veja Capítulo 7: Equipamentos) como armas comuns, em vez de armas exóticas.", aplicado: false },
    { nome: "Estabilidade", desc: "O corpo dos anões é excepcionalmente estável. Um anão recebe +4 de bônus em testes de habilidade realizados para resistir a um encontrão ou imobilização quando estiver em pé sobre chão firme (mas não quando estiver escalando, voando, cavalgando ou qualquer outra situação sem contato direto e firme com o solo).", aplicado: false },
    { nome: "Resistência a Veneno", desc: "+2 de bônus racial nos testes de resistência a veneno: os anões são fortes e resistentes a toxinas.", aplicado: false },
    { nome: "Resistência contra Magias", desc: "+2 de bônus racial nos testes de resistência contra magias e efeitos similares a magia: os anões possuem uma resistência inata contra magia.", aplicado: false },
    { nome: "Treinamento Especial", desc: "+1 de bônus racial nas jogadas de ataque contra orcs e goblinóides (goblins, robgoblins e bugbears). Os anões são treinados em técnicas especiais de combate quelhes permite confrontar seus inimigos comuns com mais eficiência.", aplicado: false },
    { nome: "Treinamento Militar", desc: "+4 de bônus de esquiva na CA contra monstros do tipo gigante (como ogros, trolls e gigantes das colinas); esse bônus representa o treinamento militar especial dos anões, quando aprendem os truques desenvolvidos pelas suas gerações anteriores nas batalhas contra os gigantes. Sempre que o personagem perder seu bônus de Destreza na CA – durante uma rodada surpresa, por exemplo - também perderá esse bônus de esquiva. O Livro dos Monstros contém mais informações sobre as criaturas do tipo gigante.", aplicado: false },
    { nome: "Avaliação", desc: "+2 de bônus racial nos testes de Avaliação relacionados a objetos de metal ou pedra: os anões estão familiarizados com objetos valiosos de diversos tipos, especialmente de pedra e metal.", aplicado: false },
    { nome: "Idiomas", desc: "Idiomas Básicos: Comum e Anão. Tendência para idiomas adicionais: Gigante, Gnomo,Goblin, Orc, Terran e Subterrâneo. Os anões estão familiarizados com os idiomas de seus inimigos e aliados subterrâneos.", aplicado: true }

  ],
  elfo: [
    { nome: "Elegante", desc: "+2 de Destreza, -2 de Constituição. Os elfos são graciosos, mas frágeis. A graciosidade da raça aprimora naturalmente sua furtividade e habilidade com arcos.", aplicado: true },
    { nome: "Tamanho", desc: "Como criaturas Médias, os elfos não sofrem nenhuma penalidade ou recebem qualquer bônus em relação ao tamanho.", aplicado: true },
    { nome: "Deslocamento", desc: "O deslocamento básico dos elfos equivale a 9 metros.", aplicado: true },
    { nome: "Imunidade a Sono", desc: "Imunidade à magias e efeitos de sono e +2 de bônus racial nos testes de resistência contra magias ou efeitos similares de Encantamento.", aplicado: false },
    { nome: "Usar Armas", desc: "Os elfos recebem o talento Usar Arma Comum para espada longa, sabre, arco longo (inclusive arco longo composto) e arco curto (inclusive arco curto composto) como um talento adicional.Os elfos apreciam a arte do manejo de espada e a arquearia, portanto todos os membros da raça estão familiarizados com essas armas.", aplicado: false },
    { nome: "Visão na Penumbra", desc: "Os elfos enxergam duas vezes mais longe que os seres humanos sob a luz das estrelas, da lua, de tochas ou outras condições de iluminação precária. Nessas situações, eles ainda conseguem distinguir e orcs e detalhes.", aplicado: false },
    { nome: "Sexto Sentido", desc: "+2 de Bônus racial nos testes de Ouvir, Procurar e Observar. Um elfo que passar a 1,5 metro de uma porta secreta ou escondida pode realizar um teste de Procurar como se estivesse procurando ativamente. Os sentidos de um elfo são tão aguçados que ele praticamente desenvolve um sexto sentido para detectar passagens secretas e camufladas.", aplicado: true },
    { nome: "Idiomas", desc: "Idiomas Básicos: Comum e Élfico. Tendência para idiomas adicionais: Dracônico, Gnoll, Gnomo, Goblin, orc e Silvestre. Os elfos normalmente conhecem os idiomas de seus aliados e inimigos, além do Dracônico, normalmente encontrado em antigos tomos de conhecimento arcano ou secreto.", aplicado: true }
  ],
  gnomo: [
    { nome: "Alimentação Fibrosa", desc: "+2 de Constituição, -2 de Força. Assim como os anões, os gnomos são resistentes, no entanto, sua estatura não permite que sejam tão fortes quanto os humanóides maiores.", aplicado: true },
    { nome: "Tamanho", desc: "Como criaturas Pequenas, os gnomos recebem +1 de bônus de tamanho na Classe de Armadura, +1 de bônus de tamanho nas jogadas de ataque e +4 de bônus de tamanho nos testes de Esconder-se, mas precisam usar armas menores que os humanos e sua capacidade de levantar e carregar peso equivale a três quartos da carga máxima das criaturas Médias.", aplicado: true },
    { nome: "Deslocamento", desc: "O deslocamento básico dos gnomos equivale a 6 metros.", aplicado: true },
    { nome: "Visão na Penumbra", desc: "Os gnomos enxergam duas vezes mais longe que os seres humanos sob a luz das estrelas, da lua, de tochas ou outras condições de iluminação precária. Nessas situações, eles ainda conseguem distinguir e orcs e detalhes.", aplicado: false },
    { nome: "Familiaridade com Armas", desc: "Os gnomos consideram o martelo gnomo com gancho como uma arma comum, em vez de uma arma exótica.", aplicado: false },
    { nome: "Desilusão", desc: "+2 de bônus racial nos testes de resistência contra ilusões: os gnomos estão familiarizados com ilusões de todos os tipos.", aplicado: false },
    { nome: "Ilusionista", desc: "+1 de bônus na Classe de Dificuldade dos testes de resistência contra as ilusões conjuradas por um gnomo. A familiaridade inata com esses efeitos torna as ilusões da raça mais difíceis de serem evitadas. Esse modificador se acumula com efeitos similares, como o talento Foco em Magia.", aplicado: false },
    { nome: "Treinamento Especial", desc: "+1 de bônus racial nas jogadas de ataque contra kobolds e goblinóides (goblins, robgoblins e bugbears): os gnomos enfrentam essas criaturas com freqüência e criaram técnicas especiais para combatê-las.", aplicado: false },
    { nome: "Treinamento Militar", desc: "+4 de bônus de esquiva na CA contra monstros do tipo gigante (como ogros, trolls e gigantes das colinas); esse bônus representa o treinamento militar especial dos gnomos, quando aprendem os truques desenvolvidos pelas suas gerações anteriores nas batalhas contra os gigantes. Sempre que o personagem perder seu bônus de Destreza na CA – durante uma rodada surpresa, por exemplo – também perderá esse bônus de esquiva. O Livro dos Monstros contém mais informações sobre as criaturas do tipo gigante.", aplicado: false },
    { nome: "Audição Aguçada", desc: "+2 de bônus racial nos testes de Ouvir: os gnomos possuem uma audição aguçada.", aplicado: true },
    { nome: "Alquimista", desc: "+2 de bônus racial nos testes de Ofícios (alquimia): o olfato sensível de um gnomo permite que ele acompanhe os processos alquímicos através do cheiro.", aplicado: true },
    { nome: "Idiomas", desc: "Idiomas Básicos: Comum e Gnomo. Idiomas Adicionais: Dracônico, Anão, Élfico, Gigante, Goblin e orc. Os gnomos negociam com os elfos e os anões com mais freqüência do que essas raças tratam entre si, e também aprendem os idiomas de seus inimigos (kobolds, gigantes, goblins e orcs). Além disso, os gnomos conseguem se comunicar com mamíferos terrestres (uma toupeira, uma raposa, um coelho e animais similares; veja a seguir). Essa habilidade natural aos gnomos. Consulte a descrição da magia falar com animais.", aplicado: true },
    { nome: "Habilidades Similares à Magia", desc: "1/dia – falar com animais (somente mamíferos terrestres, 1 minuto de duração). Um gnomo com Carisma 10, no mínimo, também possui as seguintes habilidades similares à magia: l/dia – globos de luz, som fantasma, prestidigitação. Nível de conjurador: 1° nível; teste de resistência CD 10 + modificador de Carisma + nível da magia.", aplicado: false }
  ],
  "meio-elfo": [
    { nome: "Tamanho", desc: "Como criaturas Médias, os meio-elfos não sofrem nenhuma penalidade ou recebem qualquer bônus em relação ao tamanho.", aplicado: true },
    { nome: "Deslocamento", desc: "O deslocamento básico dos meio-elfos equivale a 9 metros.", aplicado: true },
    { nome: "Imunidade a Sono", desc: "Imunidade à magias e efeitos de sono e +2 de bônus racial nos testes de resistência contra magias ou efeitos similares de Encantamento.", aplicado: false },
    { nome: "Visão na Penumbra", desc: "Os meio-elfos enxergam duas vezes mais longe que os seres humanos sob a luz das estrelas, da lua, de tochas ou outras condições de iluminação precária. Nessas situações, eles ainda conseguem distinguir e orcs e detalhes.", aplicado: false },
    { nome: "Sexto Sentido", desc: "+1 de Bônus racial nos testes de Ouvir, Procurar e Observar. Um elfo que passar a 1,5 metro de uma porta secreta ou escondida pode realizar um teste de Procurar como se estivesse procurando ativamente. Os sentidos de um elfo são tão aguçados que ele praticamente desenvolve um sexto sentido para detectar passagens secretas e camufladas.", aplicado: true },
    { nome: "Lábia", desc: "+2 de bônus racial nos testes de Diplomacia e Obter Informação, graças à sua habilidade de se relacionar bem com as pessoas.", aplicado: true },
    { nome: "Sangue Élfico", desc: "Para todas as habilidades especiais e efeitos, um meio-elfo é considerado um elfo. Por exemplo, os meio-elfos são vulneráveis aos efeitos especiais que afetam somente os elfos, assim como seus ancestrais, e podem usar itens mágicos que apenas os elfos seriam capazes", aplicado: false },
    { nome: "Idiomas", desc: "Idiomas Básicos: Comum e Élfico. Tendência para idiomas adicionais: Adicionais: Qualquer um (exceto os idiomas secretos, como o Druídico). Os meio-elfos possuem toda a versatilidade e a amplitude de experiência (mesmo que superficial) dos seres humanos.", aplicado: true }
  ],
  "meio-orc": [
    { nome: "Ignorante", desc: "+2 de Força, -2 de Inteligência, -2 de Carisma: os meio-orcs são fortes, mas sua ascendência os torna criaturas simplórias e rudes.", aplicado: true },
    { nome: "Tamanho", desc: "Como criaturas Médias, os meio-orcs não sofrem nenhuma penalidade ou recebem qualquer bônus em relação ao tamanho.", aplicado: true },
    { nome: "Deslocamento", desc: "O deslocamento básico dos meio-orcs equivale a 9 metros.", aplicado: true },
    { nome: "Visão no Escuro", desc: "Visão no Escuro 18m. Os meio-orcs (e os orcs) conseguem enxergar até 18 metros no escuro. A visão no escuro somente permite enxergar imagens em preto e branco, mas é idêntica à visão normal em todos os demais aspectos e pode ser utilizada mesmo na escuridão completa.", aplicado: false },
    { nome: "Sangue Orc", desc: "Para todas as habilidades especiais e efeitos, um meio-orc é considerado um orc. Por exemplo, os meio-orcs são vulneráveis aos efeitos especiais que afetam somente os orcs, assim como seus ancestrais, e podem usar itens mágicos que apenas os orcs seriam capazes", aplicado: true },
    { nome: "Idiomas", desc: "Idiomas Básicos: Comum e orc. Idiomas Adicionais: Dracônico, Gigante, Gnoll, Goblin e Abissal. Os meio-orcs inteligentes (que são raros) podem conhecer os idiomas de seus aliados ou inimigos.", aplicado: true }
  ],
  halfling: [
    { nome: "Habilidoso", desc: "+2 de Destreza, -2 de Força: Os halflings são rápidos, ágeis e habilidosos com armas de ataque à distância, mas são pequenos e mais fracos que os outros humanóides.", aplicado: true },
    { nome: "Tamanho Pequeno", desc: "Como criaturas Pequenas, os halflings recebem +1 de bônus de tamanho na Classe de Armadura, +1 de bônus de tamanho nas jogadas de ataque e +4 de bônus de tamanho nos testes de Esconder-se, mas precisam usar armas menores que os humanos e sua capacidade de levantar e carregar peso equivale a três quartos da carga máxima das criaturas Médias.", aplicado: true },
    { nome: "Deslocamento", desc: "O deslocamento básico dos halflings equivale a 6 metros.", aplicado: true },

    { nome: "Atletismo", desc: "+2 de bônus racial nos testes de Escalar, Saltar e Furtividade: os halflings são ágeis, atléticos e estáveis.", aplicado: true },
    { nome: "Duro de Matar", desc: "+1 de bônus racial em todos os testes de resistência: os halflings têm uma habilidade surpreendente para escapar de situações difíceis.", aplicado: true },
    { nome: "Irredutível", desc: "+2 de bônus de moral nos testes de resistência contra medo. Esse modificador se acumula com o bônus aplicado aos testes de resistência dos halflings.", aplicado: false },
    { nome: "Arremessador", desc: "+1 de bônus racial nas jogadas de ataque com armas de arremesso e fundas: arremessar pedras é um esporte universal entre os halflings e eles desenvolveram uma pontaria excelente.", aplicado: false },
    { nome: "Audição Aguçada", desc: "+2 de bônus racial nos testes de Ouvir: os halflings possuem uma audição aguçada.", aplicado: true },
    { nome: "Idiomas", desc: "Idiomas Básicos: Comum e Halfling. Tendência de idiomas adicionais: Anão, Élfico, Gnomo, Goblin e orc. Os halflings aprendem os idiomas de seus aliados e inimigos.", aplicado: true }
  ]
}

export const habilidadesClasse = {
  barbaro: [
    { nome: "Furia", nivel: 1, req: null, desc: "Pode entrar em furia 1/dia - +4 for, +4 con, +2 will, -2 AC" },
    { nome: "Movimento Rapido", nivel: 2, req: { nome: "Furia", nivel: 1 }, desc: "+3m de deslocamento" },
    { nome: "Furia (+1/dia)", nivel: 5, req: { nome: "Furia", nivel: 1 }, desc: "+1 uso de furia por dia" },
    { nome: "Furia (+1/dia)", nivel: 8, req: { nome: "Furia (+1/dia)", nivel: 5 }, desc: "+1 uso de furia por dia" },
    { nome: "Furia (+1/dia)", nivel: 11, req: { nome: "Furia (+1/dia)", nivel: 8 }, desc: "+1 uso de furia por dia" },
    { nome: "Furia (+1/dia)", nivel: 14, req: { nome: "Furia (+1/dia)", nivel: 11 }, desc: "+1 uso de furia por dia" },
    { nome: "Furia (+1/dia)", nivel: 17, req: { nome: "Furia (+1/dia)", nivel: 14 }, desc: "+1 uso de furia por dia" },
    { nome: "Sentido do Perigo", nivel: 2, req: null, desc: "+4 em testes de Iniciativa ou Reflexos contra armadilhas" }
  ],
  bardo: [
    { nome: "Conhecimento de Bardo", nivel: 1, req: null, desc: "Conhece todos os segredos de bardo" },
    { nome: "Musica de Bardo", nivel: 1, req: null, desc: "Pode usar habilidades de som" },
    { nome: "Inspiracao Corajosa", nivel: 1, req: null, desc: "+2 em testes de vontade aliados" },
    { nome: "Fascinar", nivel: 1, req: null, desc: "Pode fascinar socios com Performance" },
    { nome: "Inspiracao Competente", nivel: 3, req: { nome: "Inspiracao Corajosa", nivel: 1 }, desc: "Inspiracao +1" },
    { nome: "Sugestao", nivel: 6, req: { nome: "Fascinar", nivel: 1 }, desc: "Performance permite sugestao" },
    { nome: "Inspiracao Grande", nivel: 9, req: { nome: "Inspiracao Competente", nivel: 3 }, desc: "Inspiracao +2" },
    { nome: "Sugestao em Massa", nivel: 12, req: { nome: "Sugestao", nivel: 6 }, desc: "Sugestao em grupo" },
    { nome: "Inspiracao Heroica", nivel: 15, req: { nome: "Inspiracao Grande", nivel: 9 }, desc: "Inspiracao +3" }
  ],
  clerigo: [
    { nome: "Expulsar Mortos-Vivos", nivel: 1, req: null, desc: "Pode expulsar ou mortear mortos-vivos" },
    { nome: "Aura de Bem", nivel: 1, req: null, desc: "Todos em 18m ganham +2 em testes de von" },
    { nome: "Canalizar Energia Positiva", nivel: 2, req: null, desc: "Canalizar energia positiva para curar" },
    { nome: "Dom Divino", nivel: 6, req: null, desc: "Escolhe dominio divino" },
    { nome: "Canalizar Energia Negativa", nivel: 8, req: { nome: "Canalizar Energia Positiva", nivel: 2 }, desc: "Pode canalizar energia negativa" }
  ],
  druida: [
    { nome: "Senso da Natureza", nivel: 1, req: null, desc: "+2 em testes de Natureza" },
    { nome: "Empatia com Animais", nivel: 1, req: null, desc: "Pode comunicar-se com animais" },
    { nome: "Companheiro Animal", nivel: 4, req: { nome: "Empatia com Animais", nivel: 1 }, desc: "Pode chamar um companheiro animal" },
    { nome: "Resistencia a Natureza", nivel: 6, req: null, desc: "+4 em testes de Fortitude contra venenos e doencas" },
    { nome: "Forma Selvagem Menor", nivel: 7, req: null, desc: "Pode transformar-se em animal pequeno ou medio" },
    { nome: "Aumento de Companheiro", nivel: 10, req: { nome: "Companheiro Animal", nivel: 4 }, desc: "Companheiro animal e um功夫 mais forte" },
    { nome: "Forma Selvagem Maior", nivel: 13, req: { nome: "Forma Selvagem Menor", nivel: 7 }, desc: "Pode transformar-se em animal Grande ou Enorme" },
    { nome: "Forma Selvagem Elemental", nivel: 16, req: { nome: "Forma Selvagem Maior", nivel: 13 }, desc: "Pode transformar-se em elemental" }
  ],
  guerreiro: [
    { nome: "Talento Extra", nivel: 1, req: null, desc: "Ganha um talento adicional" },
    { nome: "Talento Extra", nivel: 2, req: null, desc: "Ganha um talento adicional" },
    { nome: "Talento Extra", nivel: 4, req: null, desc: "Ganha um talento adicional" },
    { nome: "Talento Extra", nivel: 6, req: null, desc: "Ganha um talento adicional" },
    { nome: "Talento Extra", nivel: 8, req: null, desc: "Ganha um talento adicional" },
    { nome: "Talento Extra", nivel: 10, req: null, desc: "Ganha um talento adicional" },
    { nome: "Talento Extra", nivel: 12, req: null, desc: "Ganha um talento adicional" },
    { nome: "Talento Extra", nivel: 14, req: null, desc: "Ganha um talento adicional" },
    { nome: "Talento Extra", nivel: 16, req: null, desc: "Ganha um talento adicional" },
    { nome: "Talento Extra", nivel: 18, req: null, desc: "Ganha um talento adicional" },
    { nome: "Talento Extra", nivel: 20, req: null, desc: "Ganha um talento adicional" }
  ],
  ladino: [
    { nome: "Ataque Furtivo", nivel: 1, req: null, desc: "+1d6 de dano extra em ataques surpresa" },
    { nome: "Encontrar Armadilhas", nivel: 1, req: null, desc: "Pode encontrar armadilhas com teste de Int" },
    { nome: "Evasao", nivel: 2, req: { nome: "Ataque Furtivo", nivel: 1 }, desc: "Sucesso automatico em Reflexos que normally causaria metade do dano" },
    { nome: "Sentido de Armadilhas", nivel: 3, req: { nome: "Encontrar Armadilhas", nivel: 1 }, desc: "+1 em testes contra armadilhas" },
    { nome: "Imperturbabilidade", nivel: 4, req: null, desc: "Imune a efeitos de medo" },
    { nome: "Ataque Furtivo (+1d6)", nivel: 3, req: { nome: "Ataque Furtivo", nivel: 1 }, desc: "+1d6 dano furtivo" },
    { nome: "Ataque Furtivo (+2d6)", nivel: 5, req: { nome: "Ataque Furtivo (+1d6)", nivel: 3 }, desc: "+2d6 dano furtivo" },
    { nome: "Ataque Furtivo (+3d6)", nivel: 7, req: { nome: "Ataque Furtivo (+2d6)", nivel: 5 }, desc: "+3d6 dano furtivo" },
    { nome: "Ataque Furtivo (+4d6)", nivel: 9, req: { nome: "Ataque Furtivo (+3d6)", nivel: 7 }, desc: "+4d6 dano furtivo" },
    { nome: "Ataque Furtivo (+5d6)", nivel: 11, req: { nome: "Ataque Furtivo (+4d6)", nivel: 9 }, desc: "+5d6 dano furtivo" },
    { nome: "Talento Especial", nivel: 10, req: null, desc: "Escolhe especializacao: Crippling Strike, Defensive Roll, Improved Evasion, Opportunist, Skill Mastery, Slippery Mind" }
  ],
  monge: [
    { nome: "Bonus na CA", nivel: 1, req: null, desc: "+1 a la CA quando desarmado e sem armadura" },
    { nome: "Golpes Relampago", nivel: 1, req: null, desc: "Pode realizarataques extras" },
    { nome: "Dano Desarmado", nivel: 1, req: null, desc: "Dano 1d6 com golpe desarmado" },
    { nome: "Talento Extra", nivel: 2, req: null, desc: "Ganha um talento adicional" },
    { nome: "Evasao", nivel: 2, req: null, desc: "Sucesso automatico em Reflexos" },
    { nome: "Movimento sem Armadura", nivel: 3, req: null, desc: "CA nao penalizada por armor ou carga" },
    { nome: "Queda Suave", nivel: 4, req: null, desc: "+4 em testes de Saltar, toma половину dano de queda" },
    { nome: "Dano Desarmado Melhorado", nivel: 5, req: { nome: "Dano Desarmado", nivel: 1 }, desc: "Dano 1d8" },
    { nome: "Toque Vacilante", nivel: 6, req: null, desc: "Golpe que causa fadiga" },
    { nome: "Dano Desarmadoceo", nivel: 9, req: { nome: "Dano Desarmado Melhorado", nivel: 5 }, desc: "Dano 1d10" },
    { nome: "Corpo de Ferro", nivel: 12, req: null, desc: "+2 em testes de Forca, Resist to Stun and Paralysis" },
    { nome: "Toque da Morte", nivel: 15, req: null, desc: "Pode causar 10d6 dano con toque" },
    { nome: "Dano Desarmadoceo", nivel: 17, req: { nome: "Dano Desarmadoceo", nivel: 9 }, desc: "Dano 2d6" }
  ],
  paladino: [
    { nome: "Aura de Bem", nivel: 1, req: null, desc: "Todos em 18m ganham +2 em testes de von" },
    { nome: "Detectar o Mal", nivel: 1, req: null, desc: "Pode detectar o mal 3/dia" },
    { nome: "Canalizar Energia Positiva", nivel: 1, req: null, desc: "Pode canalizar energia positiva" },
    { nome: "Destruir o Mal", nivel: 4, req: { nome: "Aura de Bem", nivel: 1 }, desc: "Pode usar Destruir o Mal 1/dia" },
    { nome: "Dom Divino", nivel: 3, req: null, desc: "Escolhe dominio" },
    { nome: "Montaria Divina", nivel: 5, req: null, desc: "Pode chamar montaria sagrada" },
    { nome: "Cura Doencas", nivel: 6, req: null, desc: "Pode curar doencas 1/semana" },
    { nome: "Aura de Justica", nivel: 11, req: { nome: "Aura de Bem", nivel: 1 }, desc: "Oponentes a 3m recebem -2 em tests de will" },
    { nome: "Buscar马拉", nivel: 14, req: { nome: "Destruir o Mal", nivel: 4 }, desc: "+10 deslocamento da montaria" }
  ],
  ranger: [
    { nome: "Inimigo Favorito", nivel: 1, req: null, desc: "+2 em ataques e testes contra tipo de inimigo" },
    { nome: "Rastrear", nivel: 1, req: null, desc: "Pode rastrear com Sobrevivencia" },
    { nome: "Estilo de Combate", nivel: 2, req: { nome: "Inimigo Favorito", nivel: 1 }, desc: "Escolhe estilo: Dois Armas ou Arma e Escudo" },
    { nome: "Empatia com Naturaleza", nivel: 4, req: { nome: "Inimigo Favorito", nivel: 1 }, desc: "+4 em testes de Natureza" },
    { nome: "Inimigo Favorito (+1)", nivel: 8, req: { nome: "Inimigo Favorito", nivel: 1 }, desc: "Inimigo favorito +1 nivel" },
    { nome: "CaminhadaSilenciosa", nivel: 6, req: { nome: "Inimigo Favorito", nivel: 1 }, desc: "Pode mover-se normally em vegetation" },
    { nome: "Espreita", nivel: 12, req: null, desc: "Attack bonus +1d6 vs favorito" },
    { nome: "Inimigo Favorito (+2)", nivel: 15, req: { nome: "Inimigo Favorito (+1)", nivel: 8 }, desc: "Inimigo favorito +2 nivel" }
  ],
  mago: [
    { nome: "Invocar Familiar", nivel: 1, req: null, desc: "Pode invocar um familiar" },
    { nome: "Escrever Pergaminhos", nivel: 1, req: null, desc: "Pode escrever pergaminhos" },
    { nome: "Talento Extra", nivel: 5, req: { nome: "Escrever Pergaminhos", nivel: 1 }, desc: "Ganha um talento" },
    { nome: "Dom Escola", nivel: 10, req: null, desc: "Escolhe especializacaoem escola de magia" },
    { nome: "Talento Extra", nivel: 15, req: null, desc: "Ganha um talento" }
  ],
  feiticeiro: [
    { nome: "Invocar Familiar", nivel: 1, req: null, desc: "Pode invocar um familiar" },
    { nome: "Linhagem", nivel: 1, req: null, desc: "Escolhe linhagem: Draconic ou Fey" },
    { nome: "Armadura Arcana", nivel: 2, req: { nome: "Linhagem", nivel: 1 }, desc: "Pode usar armadura sem penalidade" },
    { nome: "Magia Expandida", nivel: 4, req: { nome: "Linhagem", nivel: 1 }, desc: "+1 feitiço por dia" }
  ]
}
export const progressaoNivel = [
  { nome: "Talento", nivel: 1, tipo: "nivel", desc: "Ganha um talento adicional" },
  { nome: "Talento", nivel: 3, tipo: "nivel", desc: "Ganha um talento adicional" },
  { nome: "Aumento de Atributo", nivel: 4, tipo: "nivel", desc: "+1 em qualquer atributo" },
  { nome: "Talento", nivel: 6, tipo: "nivel", desc: "Ganha um talento adicional" },
  { nome: "Aumento de Atributo", nivel: 8, tipo: "nivel", desc: "+1 em qualquer atributo" },
  { nome: "Talento", nivel: 9, tipo: "nivel", desc: "Ganha um talento adicional" },
  { nome: "Talento", nivel: 12, tipo: "nivel", desc: "Ganha um talento adicional" },
  { nome: "Aumento de Atributo", nivel: 12, tipo: "nivel", desc: "+1 em qualquer atributo" },
  { nome: "Talento", nivel: 15, tipo: "nivel", desc: "Ganha um talento adicional" },
  { nome: "Aumento de Atributo", nivel: 16, tipo: "nivel", desc: "+1 em qualquer atributo" },
  { nome: "Talento", nivel: 18, tipo: "nivel", desc: "Ganha um talento adicional" },
  { nome: "Aumento de Atributo", nivel: 20, tipo: "nivel", desc: "+1 em qualquer atributo" }

]
export function getHabilidadesDisponiveis(raca, classe, nivel = 1) {
  const result = []
  
  // Habilidades raciais (sempre ativas)
  if (raca && habilidadesRaciais[raca]) {
    result.push(
      ...habilidadesRaciais[raca].map(h => ({
        ...h,
        tipo: 'racial',
        desbloqueado: true
      }))
    )
  }
  
  // Habilidades de classe
  if (classe && habilidadesClasse[classe]) {
    habilidadesClasse[classe].forEach(h => {
      let desbloqueado = false
      
      if (h.nivel <= nivel) {
        if (h.req) {
          const temRequisito = result.some(
            r => r.nome === h.req.nome && r.tipo === 'classe' && r.desbloqueado
          )
          if (temRequisito) desbloqueado = true
        } else {
          desbloqueado = true
        }
      }
      
      result.push({
        ...h,
        tipo: 'classe',
        desbloqueado,
        requer: h.req ? h.req.nome : null
      })
    })
  }

  // ✅ NOVO: Progressão por nível (geral)
  progressaoNivel.forEach(p => {
    result.push({
      ...p,
      tipo: 'nivel',
      desbloqueado: p.nivel <= nivel
    })
  })

  return result
}