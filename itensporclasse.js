export const itensPorClasse = {
    barbaro: {
        // =====================
        // ARMAS
        // =====================
        armas: [
            {
                nome: "Machado Grande",
                bonus: "",
                dano: "1d12",
                critico: "x3",
                alcance: "",
                tipo: "Cortante (duas mãos)",
                peso: "6 kg",
                municao: "",
                quantidade: "",
                observacao: ""
            },
            {
                nome: "Arco Curto",
                bonus: "",
                dano: "1d6",
                critico: "x3",
                alcance: "18 m",
                tipo: "Perfurante",
                peso: "1 kg",
                municao: "Flechas",
                quantidade: "20",
                observacao: "Aljava"
            },
            {
                nome: "Adaga",
                bonus: "",
                dano: "1d4",
                critico: "19-20/x2",
                alcance: "3 m",
                tipo: "Leve, perfurante",
                peso: "0,5 kg",
                municao: "",
                quantidade: "",
                observacao: ""
            }
        ],

        // =====================
        // ARMADURA
        // =====================
        armadura: {
            nome: "Corselete de couro batido",
            tipo: "Leve",
            bonus_ca: "+3",
            dex_max: "",
            penalidade: "-1",
            falha_magia: "",
            deslocamento: "12 m",
            peso: "10 kg",
            propriedades: ""
        },

        // =====================
        // ESCUDO
        // =====================
        escudo: null, // não tem no exemplo

        // =====================
        // ITENS DE PROTEÇÃO
        // =====================
        protecoes: [],

        // =====================
        // BAG (OUTROS ITENS)
        // =====================
        itens: [
            { nome: "Mochila"},
            { nome: "Cantil"},
            { nome: "Ração de viagem (1 dia)"},
            { nome: "Saco de dormir"},
            { nome: "Sacola"},
            { nome: "Pederneira e isqueiro"}
        ],

        // =====================
        // DINHEIRO
        // =====================
        dinheiro: {
            po: "2d4",
            pp: "",
            pl: "",
            pc: ""
        }
    },
        bardo: {
        armas: [
            {
                nome: "Espada longa",
                dano: "1d6",
                critico: "19-20/x2",
                alcance: "",
                tipo: "Cortante (uma mão)",
                peso: "1 kg"
            },
            {
                nome: "Besta leve",
                dano: "1d6",
                critico: "19-20/x2",
                alcance: "24 m",
                tipo: "Perfurante",
                peso: "1 kg",
                municao: "Virotes",
                quantidade: "10"
            }
        ],

        armadura: {
            nome: "Corselete de couro batido",
            tipo: "Leve",
            bonus_ca: "+3",
            penalidade: "-1",
            deslocamento: "6 m",
            peso: "5 kg",
            falha_magia: "0%"
        },

        itens: [
            { nome: "Mochila" },
            { nome: "Cantil" },
            { nome: "Rações (1 dia)" },
            { nome: "Saco de dormir" },
            { nome: "Saco" },
            { nome: "Pederneira e isqueiro" },
            { nome: "3 tochas" },
            { nome: "Alaúde" },
            { nome: "Bolsa de componentes de magia" }
        ],

        dinheiro: { po: "2d4" }
    },
        clerigo: {
        armas: [
            {
                nome: "Maça pesada",
                dano: "1d8",
                critico: "x2",
                tipo: "Concussão",
                peso: "4 kg"
            },
            {
                nome: "Besta leve",
                dano: "1d8",
                critico: "19-20/x2",
                alcance: "24 m",
                tipo: "Perfurante",
                peso: "2 kg",
                municao: "Virotes",
                quantidade: "10"
            }
        ],

        armadura: {
            nome: "Brunea",
            bonus_ca: "+4",
            penalidade: "-4",
            deslocamento: "6 m",
            peso: "15 kg"
        },

        escudo: {
            nome: "Escudo grande de madeira",
            bonus_ca: "+2",
            penalidade: "-2",
            peso: "5 kg"
        },

        itens: [
            { nome: "Mochila" },
            { nome: "Cantil" },
            { nome: "Rações (1 dia)" },
            { nome: "Saco de dormir" },
            { nome: "Saco" },
            { nome: "Pederneira e isqueiro" },
            { nome: "Símbolo sagrado (Pelor)" },
            { nome: "3 tochas" }
        ],

        dinheiro: { po: "1d4" }
    },
        druida: {
        armas: [
            {
                nome: "Cimitarra",
                dano: "1d6",
                critico: "18-20/x2",
                tipo: "Cortante",
                peso: "2 kg"
            },
            {
                nome: "Clava",
                dano: "1d6",
                critico: "x2",
                alcance: "3 m",
                tipo: "Concussão",
                peso: "1,5 kg"
            },
            {
                nome: "Funda",
                dano: "1d4",
                critico: "x2",
                alcance: "15 m",
                tipo: "Concussão",
                municao: "Balas",
                quantidade: "10"
            }
        ],

        armadura: {
            nome: "Gibão de peles",
            bonus_ca: "+3",
            penalidade: "-3",
            deslocamento: "6 m",
            peso: "12,5 kg"
        },

        escudo: {
            nome: "Escudo grande de madeira",
            bonus_ca: "+2",
            penalidade: "-2",
            peso: "5 kg"
        },

        itens: [
            { nome: "Mochila" },
            { nome: "Cantil" },
            { nome: "Rações (1 dia)" },
            { nome: "Saco de dormir" },
            { nome: "Saco" },
            { nome: "Pederneira e isqueiro" },
            { nome: "Azevinho e visco" },
            { nome: "3 tochas" }
        ],

        dinheiro: { po: "1d6" }
    },
        feiticeiro: {
        armas: [
            {
                nome: "Lança curta",
                dano: "1d6",
                critico: "x2",
                alcance: "6 m",
                tipo: "Perfurante",
                peso: "1,5 kg"
            },
            {
                nome: "Besta leve",
                dano: "1d8",
                critico: "19-20/x2",
                alcance: "24 m",
                tipo: "Perfurante",
                peso: "2 kg",
                municao: "Virotes",
                quantidade: "10"
            }
        ],

        armadura: null,

        itens: [
            { nome: "Mochila" },
            { nome: "Cantil" },
            { nome: "Rações (1 dia)" },
            { nome: "Saco de dormir" },
            { nome: "Saco" },
            { nome: "Pederneira e isqueiro" },
            { nome: "Lanterna coberta" },
            { nome: "Óleo (500 ml)" },
            { nome: "Bolsa de componentes de magia" }
        ],

        dinheiro: { po: "3d4" }
    },
        guerreiro: {
        // =====================
        // ARMAS
        // =====================
        armas: [
            {
                nome: "Machado de guerra anão",
                dano: "1d10",
                critico: "x3",
                alcance: "",
                tipo: "Cortante (uma mão)",
                peso: "4 kg",
                municao: "",
                quantidade: "",
                observacao: ""
            },
            {
                nome: "Arco curto",
                dano: "1d6",
                critico: "x3",
                alcance: "18 m",
                tipo: "Perfurante",
                peso: "1 kg",
                municao: "Flechas",
                quantidade: "20",
                observacao: "Aljava"
            }
        ],

        // =====================
        // ARMADURA
        // =====================
        armadura: {
            nome: "Brunea",
            tipo: "Média",
            bonus_ca: "+4",
            penalidade: "-4",
            deslocamento: "6 m",
            peso: "15 kg",
            dex_max: "",
            falha_magia: "",
            propriedades: ""
        },

        // =====================
        // ESCUDO
        // =====================
        escudo: {
            nome: "Escudo grande de madeira",
            bonus_ca: "+2",
            penalidade: "-2",
            peso: "",
            falha_magia: "",
            propriedades: ""
        },

        // =====================
        // PROTEÇÕES
        // =====================
        protecoes: [],

        // =====================
        // BAG (OUTROS ITENS)
        // =====================
        itens: [
            { nome: "Mochila"},
            { nome: "Cantil"},
            { nome: "Rações de viagem (1 dia)"},
            { nome: "Saco de dormir"},
            { nome: "Saco"},
            { nome: "Pederneira e isqueiro"}
        ],

        // =====================
        // DINHEIRO
        // =====================
        dinheiro: {
            po: "2d4",
            pp: "",
            pl: "",
            pc: ""
        }
    },
        ladino: {
        armas: [
            {
                nome: "Espada curta",
                dano: "1d4",
                critico: "19-20/x2",
                tipo: "Leve, perfurante",
                peso: "0,5 kg"
            },
            {
                nome: "Besta leve",
                dano: "1d8",
                critico: "19-20/x2",
                alcance: "24 m",
                tipo: "Perfurante",
                peso: "1 kg",
                municao: "Virotes",
                quantidade: "10"
            },
            {
                nome: "Adaga",
                dano: "1d3",
                critico: "19-20/x2",
                alcance: "3 m",
                tipo: "Leve, perfurante",
                peso: "0,25 kg"
            }
        ],

        armadura: {
            nome: "Corselete de couro",
            bonus_ca: "+2",
            deslocamento: "6 m",
            peso: "3 kg"
        },

        itens: [
            { nome: "Mochila" },
            { nome: "Cantil" },
            { nome: "Rações (1 dia)" },
            { nome: "Saco de dormir" },
            { nome: "Saco" },
            { nome: "Pederneira e isqueiro" },
            { nome: "Ferramentas de ladrão" },
            { nome: "Lanterna coberta" },
            { nome: "Óleo (300 ml)" }
        ],

        dinheiro: { po: "4d4" }
    },
        mago: {
        armas: [
            {
                nome: "Bordão",
                dano: "1d6/1d6",
                critico: "x2",
                tipo: "Duas mãos",
                peso: "2 kg"
            },
            {
                nome: "Besta leve",
                dano: "1d8",
                critico: "19-20/x2",
                alcance: "24 m",
                tipo: "Perfurante",
                peso: "2 kg",
                municao: "Virotes",
                quantidade: "10"
            }
        ],

        armadura: null,

        itens: [
            { nome: "Mochila" },
            { nome: "Cantil" },
            { nome: "Rações (1 dia)" },
            { nome: "Saco de dormir" },
            { nome: "Saco" },
            { nome: "Pederneira e isqueiro" },
            { nome: "10 velas" },
            { nome: "Porta-mapas" },
            { nome: "Pergaminhos" },
            { nome: "Tinta e caneta" },
            { nome: "Grimório" }
        ],

        dinheiro: { po: "3d6" }
    },
        monge: {
        armas: [
            {
                nome: "Bordão",
                dano: "1d6/1d6",
                critico: "x2",
                tipo: "Duas mãos",
                peso: "2 kg"
            },
            {
                nome: "Funda",
                dano: "1d4",
                critico: "x2",
                alcance: "15 m",
                tipo: "Concussão",
                municao: "Balas",
                quantidade: "10"
            }
        ],

        armadura: null,

        itens: [
            { nome: "Mochila" },
            { nome: "Cantil" },
            { nome: "Rações (1 dia)" },
            { nome: "Saco de dormir" },
            { nome: "Saco" },
            { nome: "Pederneira e isqueiro" },
            { nome: "3 tochas" }
        ],

        dinheiro: { po: "2d4" }
    },
        paladino: {
        armas: [
            {
                nome: "Espada longa",
                dano: "1d8",
                critico: "19-20/x2",
                tipo: "Cortante",
                peso: "2 kg"
            },
            {
                nome: "Arco curto",
                dano: "1d6",
                critico: "x3",
                alcance: "18 m",
                tipo: "Perfurante",
                municao: "Flechas",
                quantidade: "20"
            },
            {
                nome: "Funda",
                dano: "1d4",
                critico: "x2",
                alcance: "15 m",
                tipo: "Concussão",
                municao: "Balas",
                quantidade: "10"
            }
        ],

        armadura: {
            nome: "Brunea",
            bonus_ca: "+4",
            penalidade: "-6",
            deslocamento: "6 m",
            peso: "15 kg"
        },

        escudo: {
            nome: "Escudo grande de madeira",
            bonus_ca: "+2",
            penalidade: "-2",
            peso: "5 kg"
        },

        itens: [
            { nome: "Mochila" },
            { nome: "Cantil" },
            { nome: "Rações (1 dia)" },
            { nome: "Saco de dormir" },
            { nome: "Pederneira e isqueiro" },
            { nome: "Lanterna coberta" },
            { nome: "Óleo (300 ml)" },
            { nome: "Símbolo sagrado" }
        ],

        dinheiro: { po: "6d4" }
    },
        ranger: {
        armas: [
            {
                nome: "Espada longa",
                dano: "1d8",
                critico: "19-20/x2",
                tipo: "Cortante",
                observacao: "-4 ao atacar com duas armas"
            },
            {
                nome: "Espada curta",
                dano: "1d6",
                critico: "19-20/x2",
                tipo: "Leve, perfurante",
                observacao: "Mão inábil (-8)"
            },
            {
                nome: "Arco longo",
                dano: "1d8",
                critico: "x3",
                alcance: "30 m",
                tipo: "Perfurante",
                municao: "Flechas",
                quantidade: "20"
            }
        ],

        armadura: {
            nome: "Corselete de couro batido",
            bonus_ca: "+3",
            penalidade: "-1",
            deslocamento: "9 m",
            peso: "10 kg"
        },

        itens: [
            { nome: "Mochila" },
            { nome: "Cantil" },
            { nome: "Rações (1 dia)" },
            { nome: "Saco de dormir" },
            { nome: "Pederneira e isqueiro" },
            { nome: "3 tochas" }
        ],

        dinheiro: { po: "2d4" }
    }
};