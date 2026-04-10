export const talentosConfig = [
    {
        nome: "Acrobático",
        prerequisitos: {},
        descricao: "+2 de bônus nos testes de Saltar e Acrobacia."
    },
    {
        nome: "Acuidade com Arma",
        prerequisitos: {
            nivel: 1,
            forcaMinima: 12,
            bonusBaseAtaque: 1
        },
        descricao: "Aplica o modificador de Des (em vez de For) para ataques corporais com armas leves."
    },
    {
        nome: "Afinidade com Animais",
        prerequisitos: {},
        descricao: "+2 de bônus nos testes de Adestrar Animais e Cavalgar."
    },
    {
        nome: "Ágil",
        prerequisitos: {},
        descricao: "+2 de bônus nos testes de Equilíbrio e Arte da Fuga."
    },
    {
        nome: "Aptidão Mágica",
        prerequisitos: {},
        descricao: "+2 de bônus nos testes de Identificar Magia e Usar Instrumento Mágico."
    },
    {
        nome: "Ataque Desarmado Aprimorado",
        prerequisitos: {
            nivel: 1
        },
        descricao: "Considerado armado quando estiver desarmado."
    },
    {
        nome: "Agarrar Aprimorado",
        prerequisitos: {
            nivel: 1,
            destrezaMinima: 13,
            talentos: ["Ataque Desarmado Aprimorado"]
        },
        descricao: "+4 de bônus nos testes de Agarrar e não provoca ataques de oportunidade."
    },
    {
        nome: "Desviar Objetos",
        prerequisitos: {
            nivel: 1,
            destrezaMinima: 13,
            talentos: ["Ataque Desarmado Aprimorado"]
        },
        descricao: "Desvia um ataque à distância por rodada."
    },
    {
        nome: "Apanhar Objetos",
        prerequisitos: {
            nivel: 1,
            destrezaMinima: 15,
            talentos: ["Desviar Objetos", "Ataque Desarmado Aprimorado"]
        },
        descricao: "Apanha uma arma arremessada ou projétil."
    },
    {
        nome: "Ataque Atordoante",
        prerequisitos: {
            nivel: 1,
            destrezaMinima: 13,
            sabedoriaMinima: 13,
            talentos: ["Ataque Desarmado Aprimorado"],
            bonusBaseAtaque: 8
        },
        descricao: "Atordoa a vítima com um ataque desarmado."
    },
    {
        nome: "Ataque Poderoso",
        prerequisitos: {
            nivel: 1,
            forcaMinima: 13
        },
        descricao: "Permite trocar bônus de ataque por bônus de dano."
    },
    {
        nome: "Trespassar",
        prerequisitos: {
            talentos: ["Ataque Poderoso"]
        },
        descricao: "Desfere um ataque corporal extra depois de imobilizar um oponente."
    },
    {
        nome: "Trespassar Maior",
        prerequisitos: {
            talentos: ["Trespassar", "Ataque Poderoso"],
            bonusBaseAtaque: 4
        },
        descricao: "Trespassar sem limite de ataques por rodada."
    },
    {
        nome: "Encontrão Aprimorado",
        prerequisitos: {
            talentos: ["Ataque Poderoso"]
        },
        descricao: "+4 de bônus nas tentativas de encontrão e não provoca ataques de oportunidade."
    },
    {
        nome: "Atropelar Aprimorado",
        prerequisitos: {
            talentos: ["Ataque Poderoso"]
        },
        descricao: "+4 de bônus nas tentativas de atropelar e não provoca ataques de oportunidade."
    },
    {
        nome: "Separar Aprimorado",
        prerequisitos: {
            talentos: ["Ataque Poderoso"]
        },
        descricao: "+4 de bônus nas tentativas de Separar e não provoca ataques de oportunidade."
    },
    {
        nome: "Atlético",
        prerequisitos: {},
        descricao: "+2 de bônus nos testes de Escalar e Natação."
    },
    {
        nome: "Auto-Suficiente",
        prerequisitos: {},
        descricao: "+2 de bônus nos testes de Cura e Sobrevivência."
    },
    {
        nome: "Combate Montado",
        prerequisitos: {
            graduacaoCavalgar: 1
        },
        descricao: "Evita os ataques contra a montaria com um teste de Cavalgar."
    },
    {
        nome: "Arquearia Montada",
        prerequisitos: {
            talentos: ["Combate Montado"]
        },
        descricao: "Sofre metade das penalidades nos ataques à distância realizados sobre montarias."
    },
    {
        nome: "Investida Montada",
        prerequisitos: {
            talentos: ["Combate Montado"]
        },
        descricao: "Pode se deslocar antes e depois de uma investida montada."
    },
    {
        nome: "Investida Implacável",
        prerequisitos: {
            talentos: ["Combate Montado", "Investida Montada"]
        },
        descricao: "Investidas montadas causam dano dobrado."
    },
    {
        nome: "Pisotear",
        prerequisitos: {
            talentos: ["Combate Montado"]
        },
        descricao: "A vítima não pode evitar um atropelamento montada."
    },
    {
        nome: "Combater com Duas Armas",
        prerequisitos: {
            destrezaMinima: 15
        },
        descricao: "Reduz -2 nas penalidades para combater com duas armas."
    },
    {
        nome: "Bloqueio Ambidestro",
        prerequisitos: {
            talentos: ["Combater com Duas Armas"]
        },
        descricao: "A arma da mão inábil concede +1 de bônus de escudo na CA."
    },
    {
        nome: "Combater com Duas Armas Aprimorado",
        prerequisitos: {
            destrezaMinima: 17,
            talentos: ["Combater com Duas Armas"],
            bonusBaseAtaque: 6
        },
        descricao: "Adquire um segundo ataque com a mão inábil."
    },
    {
        nome: "Combater com Duas Armas Maior",
        prerequisitos: {
            destrezaMinima: 19,
            talentos: ["Combater com Duas Armas", "Combater com Duas Armas Aprimorado"],
            bonusBaseAtaque: 11
        },
        descricao: "Adquire um terceiro ataque com a mão inábil."
    },
    {
        nome: "Contramágica Aprimorada",
        prerequisitos: {},
        descricao: "Contramágica com magias da mesma escola."
    },
    {
        nome: "Corrida",
        prerequisitos: {},
        descricao: "Percorre 5 vezes o deslocamento padrão, +4 de bônus nos testes de Saltar no final de uma corrida."
    },
    {
        nome: "Dedos Lépidos",
        prerequisitos: {},
        descricao: "+2 de bônus nos teste de Operar Mecanismos e Abrir Fechaduras."
    },
    {
        nome: "Diligente",
        prerequisitos: {},
        descricao: "+2 de bônus nos teste de Avaliação e Decifrar Escrita."
    },
    {
        nome: "Dominar Magia",
        prerequisitos: {
            nivel: 1,
            classe: ["mago"]
        },
        descricao: "Capaz de preparar as magias escolhidas sem um grimório."
    },
    {
        nome: "Especialização em Combate",
        prerequisitos: {
            inteligenciaMinima: 13
        },
        descricao: "Substitui bônus de ataque por CA (máximo 5 pontos)."
    },
    {
        nome: "Desarme Aprimorado",
        prerequisitos: {
            talentos: ["Especialização em Combate"]
        },
        descricao: "+4 de bônus nas tentativas de desarme e não provoca ataques de oportunidade."
    },
    {
        nome: "Fintar Aprimorado",
        prerequisitos: {
            talentos: ["Especialização em Combate"]
        },
        descricao: "Fintar em combate é uma ação de movimento."
    },
    {
        nome: "Imobilização Aprimorada",
        prerequisitos: {
            talentos: ["Especialização em Combate"]
        },
        descricao: "+4 de bônus nas tentativas de imobilização e não provoca ataques de oportunidade."
    },
    {
        nome: "Ataque Giratório",
        prerequisitos: {
            destrezaMinima: 13,
            talentos: ["Especialização em Combate", "Esquiva", "Mobilidade", "Ataque em Movimento"],
            bonusBaseAtaque: 4
        },
        descricao: "Realiza um ataque corporal contra cada oponente dentro do alcance."
    },
    {
        nome: "Esquiva",
        prerequisitos: {
            destrezaMinima: 13
        },
        descricao: "+1 de bônus de esquiva na CA contra um adversário à sua escolha."
    },
    {
        nome: "Mobilidade",
        prerequisitos: {
            talentos: ["Esquiva"]
        },
        descricao: "+4 de bônus de esquiva na CA contra ataques de oportunidade."
    },
    {
        nome: "Ataque em Movimento",
        prerequisitos: {
            talentos: ["Mobilidade"],
            bonusBaseAtaque: 4
        },
        descricao: "Capaz de deslocar antes e depois do ataque."
    },
    {
        nome: "Expulsão Adicional",
        prerequisitos: {
            habilidade: "expulsar ou fascinar criaturas"
        },
        descricao: "4 tentativas diárias adicionais de Expulsar/Fascinar."
    },
    {
        nome: "Expulsão Aprimorada",
        prerequisitos: {
            habilidade: "expulsar ou fascinar criaturas"
        },
        descricao: "+1 nível efetivo para testes de expulsão."
    },
    {
        nome: "Foco em Arma",
        prerequisitos: {
            nivel: 1,
            classe: ["guerreiro"]
        },
        descricao: "Concede bônus em ataques com uma arma específica."
    }, 
    
    //parei aqui de conferir

    // 
    {
        nome: "Iniciativa Aprimorada",
        prerequisitos: {},
        descricao: "+4 de bônus nos testes de Iniciativa."
    },
    {
        nome: "Liderança",
        prerequisitos: {
            nivel: 6
        },
        descricao: "Atrai parceiros e seguidores."
    },
    {
        nome: "Magia Penetrante",
        prerequisitos: {},
        descricao: "+2 de bônus nos testes de conjurador contra Resistência à Magia."
    },
    {
        nome: "Magia Penetrante Maior",
        prerequisitos: {
            talentos: ["Magia Penetrante"]
        },
        descricao: "+4 de bônus nos testes de conjurador contra Resistência à Magia."
    },
    {
        nome: "Tiro Certeiro",
        prerequisitos: {},
        descricao: "+1 de bônus nos ataques à distância e dano contra alvos num raio de 9 metros."
    },
    {
        nome: "Tiro Preciso",
        prerequisitos: {
            talentos: ["Tiro Certeiro"]
        },
        descricao: "Anula a penalidade por disparar contra um adversário em combate corporal com um aliado (-4)."
    },
    {
        nome: "Tiro Rápido",
        prerequisitos: {
            destrezaMinima: 13,
            talentos: ["Tiro Certeiro"]
        },
        descricao: "Um ataque à distância adicional por rodada."
    },
    {
        nome: "Tiro Longo",
        prerequisitos: {
            talentos: ["Tiro Certeiro"]
        },
        descricao: "Aumenta o incremento de distância em 50% ou 100%."
    },
    {
        nome: "Tiro em Movimento",
        prerequisitos: {
            destrezaMinima: 13,
            talentos: ["Esquiva", "Mobilidade", "Tiro Certeiro"],
            bonusBaseAtaque: 4
        },
        descricao: "Pode se deslocar antes e depois de um ataque à distância."
    },
    {
        nome: "Tiro Certeiro",
        prerequisitos: {
            nivel: 1,
            destrezaMinima: 13
        },
        descricao: "Permite atirar com precisão em alvos distantes."
    },
    
    {
        nome: "Magia em Combate",
        prerequisitos: {
            nivel: 1,
            classe: ["mago", "feiticeiro"]
        },
        descricao: "Reduz penalidades ao conjurar magias em combate."
    },
    
    {
        nome: "Foco em Magia",
        prerequisitos: {},
        descricao: "+1 de bônus na CD dos testes de resistência contra uma escola de magia específica."
    },
    {
        nome: "Foco em Magia Maior",
        prerequisitos: {
            talentos: ["Foco em Magia"]
        },
        descricao: "+1 de bônus na CD dos testes de resistência contra uma escola de magia específica."
    },
    {
        nome: "Foco em Perícia",
        prerequisitos: {},
        descricao: "+3 de bônus nos teste da perícia escolhida."
    },
    {
        nome: "Fortitude Maior",
        prerequisitos: {},
        descricao: "+2 de bônus nos teste de resistência de Fortitude."
    },
    {
        nome: "Fraudulento",
        prerequisitos: {},
        descricao: "+2 de bônus nos teste de Disfarces e Falsificação."
    },
    {
        nome: "Ignorar Componentes Materiais",
        prerequisitos: {},
        descricao: "Conjura magias ignorando os componentes materiais."
    },
    {
        nome: "Investigador",
        prerequisitos: {},
        descricao: "+2 de bônus nos testes de Obter Informação e Procurar."
    },
    {
        nome: "Magia Natural",
        prerequisitos: {
            sabedoriaMinima: 13,
            habilidade: "Forma Selvagem"
        },
        descricao: "Capaz de lançar magias na forma selvagem."
    },
    {
        nome: "Mãos Leves",
        prerequisitos: {},
        descricao: "+2 de bônus nos teste de Prestidigitação e Usar Cordas."
    },
    {
        nome: "Negociador",
        prerequisitos: {},
        descricao: "+2 de bônus nos teste de Diplomacia e Sentir Motivação."
    },
    {
        nome: "Persuasivo",
        prerequisitos: {},
        descricao: "+2 de bônus nos teste de Blefar e Intimidar."
    },
    {
        nome: "Potencializar Invocação",
        prerequisitos: {
            talentos: ["Foco em Magia (conjuração)"]
        },
        descricao: "As criaturas invocadas recebem +4 For e +4 Cons."
    },
    {
        nome: "Prontidão",
        prerequisitos: {},
        descricao: "+2 de bônus nos testes de Ouvir e Observar."
    },
    {
        nome: "Rapidez de Recarga",
        prerequisitos: {
            habilidade: "Usar Arma Simples (besta)"
        },
        descricao: "Recarrega bestas mais rapidamente."
    },
    {
        nome: "Rastrear",
        prerequisitos: {},
        descricao: "Utiliza Sobrevivência para rastrear."
    },
    {
        nome: "Reflexos em Combate",
        prerequisitos: {},
        descricao: "Ataques de oportunidade adicionais."
    },
    {
        nome: "Reflexos Rápidos",
        prerequisitos: {},
        descricao: "+2 de bônus nos testes de resistência de Reflexos."
    },
    {
        nome: "Saque Rápido",
        prerequisitos: {
            bonusBaseAtaque: 1
        },
        descricao: "Saca uma arma branca como ação livre."
    },
    {
        nome: "Sorrateiro",
        prerequisitos: {},
        descricao: "+2 nos testes de Esconder-se e Furtividade."
    },
    {
        nome: "Sucesso Decisivo Aprimorado",
        prerequisitos: {
            bonusBaseAtaque: 8
        },
        descricao: "Dobra a margem de ameaça da arma."
    },
    {
        nome: "Tolerância",
        prerequisitos: {},
        descricao: "+4 de bônus nos testes para resistir ao dano por contusão."
    },
    {
        nome: "Duro de Matar",
        prerequisitos: {
            talentos: ["Tolerância"]
        },
        descricao: "Permanece consciente entre -1 e -9 PV."
    },
    {
        nome: "Usar Arma Comum",
        prerequisitos: {},
        descricao: "Não sofre penalidade nos ataques com uma arma comum específica."
    },
    {
        nome: "Usar Arma Exótica",
        prerequisitos: {
            bonusBaseAtaque: 1
        },
        descricao: "Não sofre penalidade nos ataques com uma arma exótica específica."
    },
    {
        nome: "Usar Armas Simples",
        prerequisitos: {},
        descricao: "Não sofre penalidades nos ataques com armas simples."
    },
    {
        nome: "Usar Armadura (leve)",
        prerequisitos: {},
        descricao: "Não sofre penalidade de armadura nas jogadas de ataque."
    },
    {
        nome: "Usar Armadura (média)",
        prerequisitos: {},
        descricao: "Não sofre penalidade de armadura nas jogadas de ataque."
    },
    {
        nome: "Usar Armadura (pesada)",
        prerequisitos: {},
        descricao: "Não sofre penalidade de armadura nas jogadas de ataque."
    },
    {
        nome: "Usar Escudo",
        prerequisitos: {},
        descricao: "Não sofre penalidade de armadura nas jogadas de ataque."
    },
    {
        nome: "Ataque com Escudo Aprimorado",
        prerequisitos: {
            talentos: ["Usar Escudo"]
        },
        descricao: "Conserva o bônus do escudo na CA quando ataca com ele."
    },
    {
        nome: "Usar Escudo de Corpo",
        prerequisitos: {
            talentos: ["Usar Escudo"]
        },
        descricao: "Não sofre penalidade de armadura nas jogadas de ataque."
    },
    {
        nome: "Vitalidade",
        prerequisitos: {},
        descricao: "+3 pontos de vida."
    },
    {
        nome: "Vontade de Ferro",
        prerequisitos: {},
        descricao: "+2 de bônus nos testes de resistência de Vontade."
    },
    {
        nome: "Criar Armaduras e Armas Mágicas",
        prerequisitos: {
            nivel: 5,
            habilidade: "conjurador"
        },
        descricao: "Criar armas, armaduras e escudos mágicos."
    },
    {
        nome: "Criar Bastão",
        prerequisitos: {
            nivel: 9,
            habilidade: "conjurador"
        },
        descricao: "Criar bastões mágicos."
    },
    {
        nome: "Criar Cajado",
        prerequisitos: {
            nivel: 12,
            habilidade: "conjurador"
        },
        descricao: "Criar cajados mágicos."
    },
    {
        nome: "Criar Item Maravilhoso",
        prerequisitos: {
            nivel: 3,
            habilidade: "conjurador"
        },
        descricao: "Criar itens mágicos maravilhosos."
    },
    {
        nome: "Criar Varinha",
        prerequisitos: {
            nivel: 5,
            habilidade: "conjurador"
        },
        descricao: "Criar varinhas mágicas."
    },
    {
        nome: "Escrever Pergaminho",
        prerequisitos: {
            nivel: 1,
            habilidade: "conjurador"
        },
        descricao: "Criar pergaminhos mágicos."
    },
    {
        nome: "Forjar Anel",
        prerequisitos: {
            nivel: 12,
            habilidade: "conjurador"
        },
        descricao: "Criar anéis mágicos."
    },
    {
        nome: "Preparar Poção",
        prerequisitos: {
            nivel: 3,
            habilidade: "conjurador"
        },
        descricao: "Criar poções mágicas."
    },
    {
        nome: "Acelerar Magia",
        prerequisitos: {},
        descricao: "Conjura a magia como ação livre."
    },
    {
        nome: "Ampliar Magia",
        prerequisitos: {},
        descricao: "Dobre a área da magia."
    },
    {
        nome: "Aumentar Magia",
        prerequisitos: {},
        descricao: "Dobra o alcance da magia."
    },
    {
        nome: "Elevar Magia",
        prerequisitos: {},
        descricao: "Conjura a magia num nível mais elevado."
    },
    {
        nome: "Estender Magia",
        prerequisitos: {},
        descricao: "Dobra a duração da magia."
    },
    {
        nome: "Magia Sem Gestos",
        prerequisitos: {},
        descricao: "Ignora os componentes gestuais da magia."
    },
    {
        nome: "Magia Silenciosa",
        prerequisitos: {},
        descricao: "Ignora os componentes verbais da magia."
    },
    {
        nome: "Maximizar Magia",
        prerequisitos: {},
        descricao: "Maximiza todas as variáveis numéricas dos efeitos da magia."
    },
    {
        nome: "Potencializar Magia",
        prerequisitos: {},
        descricao: "Aumenta em 50% todas as variáveis numéricas dos efeitos da magia."
    }
];
