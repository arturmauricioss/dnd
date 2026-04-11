export const periciasConfig = [
    { nome: "Abrir Fechaduras", habilidade: "destreza", penalidade:1, somente_treinado:true },
    { nome: "Acrobacias", habilidade: "destreza", penalidade:1, somente_treinado:true },
    { nome: "Adestrar Animais", habilidade: "carisma", penalidade:0, somente_treinado:true },
    { nome: "Arte da Fuga", habilidade: "destreza", penalidade:1, somente_treinado:false },

    { nome: "Avaliação", habilidade: "inteligencia", penalidade:0, somente_treinado:false },
    { nome: "Blefar", habilidade: "carisma", penalidade:0, somente_treinado:false },
    { nome: "Cavalgar", habilidade: "destreza", penalidade:0, somente_treinado:false },
    { nome: "Concentração", habilidade: "sabedoria", penalidade:0, somente_treinado:false },
    { nome: "Conhecimento (Arcano)", habilidade: "inteligencia", penalidade:0, somente_treinado:true },
    { nome: "Conhecimento (História)", habilidade: "inteligencia", penalidade:0, somente_treinado:true },
    { nome: "Conhecimento (Natureza)", habilidade: "inteligencia", penalidade:0, somente_treinado:true },
    { nome: "Conhecimento (Nobreza)", habilidade: "inteligencia", penalidade:0, somente_treinado:true },
    { nome: "Conhecimento (Religião)", habilidade: "inteligencia", penalidade:0, somente_treinado:true },
    { nome: "Cura", habilidade: "sabedoria", penalidade:0, somente_treinado:false },
    { nome: "Decifrar Escrita", habilidade: "inteligencia", penalidade:0, somente_treinado:true },
    { nome: "Diplomacia", habilidade: "carisma", penalidade:0, somente_treinado:false },
    { nome: "Disfarces", habilidade: "carisma", penalidade:0, somente_treinado:false },
    { nome: "Equilíbrio", habilidade: "destreza", penalidade:1, somente_treinado:false },
    { nome: "Escalar", habilidade: "forca", penalidade:2, somente_treinado:false },
    { nome: "Esconder-se", habilidade: "destreza", penalidade:1, somente_treinado:false },
    { nome: "Falsificação", habilidade: "inteligencia", penalidade:0, somente_treinado:true },
    { nome: "Furtividade", habilidade: "destreza", penalidade:1, somente_treinado:false },
    { nome: "Identificar Magia", habilidade: "inteligencia", penalidade:0, somente_treinado:true },
    { nome: "Intimidação", habilidade: "carisma", penalidade:0, somente_treinado:false },
    { nome: "Natação", habilidade: "forca", penalidade:2, somente_treinado:false },
    { nome: "Obter Informação", habilidade: "carisma", penalidade:0, somente_treinado:false },
    { nome: "Ofícios", habilidade: "inteligencia", penalidade:0, somente_treinado:true },
    { nome: "Ofício (Alquimia)", habilidade: "inteligencia", penalidade:0, somente_treinado:true },
    { nome: "Operar Mecanismos", habilidade: "inteligencia", penalidade:0, somente_treinado:true },
    { nome: "Ouvir", habilidade: "sabedoria", penalidade:0, somente_treinado:false },
    { nome: "Prestidigitação", habilidade: "destreza", penalidade:1, somente_treinado:true },
    { nome: "Procurar", habilidade: "inteligencia", penalidade:0, somente_treinado:false },
    { nome: "Profissão", habilidade: "sabedoria", penalidade:0, somente_treinado:true },
    { nome: "Saltar", habilidade: "forca", penalidade:2, somente_treinado:false },
    { nome: "Sentir Motivação", habilidade: "sabedoria", penalidade:0, somente_treinado:false },
    { nome: "Sobrevivência", habilidade: "sabedoria", penalidade:0, somente_treinado:false },
    { nome: "Usar Cordas", habilidade: "destreza", penalidade:0, somente_treinado:false },
    { nome: "Usar Instrumento Mágico", habilidade: "carisma", penalidade:0, somente_treinado:true },
    { nome: "Usar Instrumento", habilidade: "carisma", penalidade:0, somente_treinado:false }
];

export const periciasPorClasse = {
    barbaro: ["Acrobacia", "Adestrar Animais", "Arte da Fuga", "Cavalgar", "Concentração", "Cura", "Equilíbrio", "Escalar", "Esconder-se", "Furtividade", "Intimidação", "Natação", "Ouvir", "Saltar", "Sobrevivência"],

    bardo: ["Acrobacia", "Adestrar Animais", "Arte da Fuga", "Avaliação", "Blefar", "Cavalgar", "Concentração", "Conhecimento (Arcano)", "Conhecimento (História)", "Conhecimento (Natureza)", "Conhecimento (Nobreza)", "Conhecimento (Religião)", "Cura", "Decifrar Escrita", "Diplomacia", "Disfarces", "Equilíbrio", "Escalar", "Esconder-se", "Falsificação", "Furtividade", "Identificar Magia", "Intimidação", "Natação", "Obter Informação", "Ofícios", "Operar Mecanismos", "Ouvir", "Prestidigitação", "Procurar", "Profissão", "Saltar", "Sentir Motivação", "Sobrevivência", "Usar Cordas", "Usar Instrumento Mágico", "Usar Instrumento"],

    clerigo: ["Concentração", "Conhecimento (Arcano)", "Conhecimento (História)", "Conhecimento (Natureza)", "Conhecimento (Nobreza)", "Conhecimento (Religião)", "Cura", "Diplomacia", "Ofícios", "Profissão"],

    druida: ["Adestrar Animais", "Arte da Fuga", "Cavalgar", "Concentração", "Conhecimento (Natureza)", "Cura", "Diplomacia", "Equilíbrio", "Escalar", "Esconder-se", "Furtividade", "Identificar Magia", "Natação", "Ofícios", "Ouvir", "Prestidigitação", "Procurar", "Profissão", "Saltar", "Sentir Motivação", "Sobrevivência", "Usar Cordas"],

    feiticeiro: ["Arte da Fuga", "Blefar", "Concentração", "Conhecimento (Arcano)", "Cura", "Disfarces", "Equilíbrio", "Esconder-se", "Furtividade", "Identificar Magia", "Intimidação", "Ofícios", "Prestidigitação", "Profissão", "Usar Instrumento"],

    guerreiro: ["Adestrar Animais", "Arte da Fuga", "Cavalgar", "Equilíbrio", "Escalar", "Intimidação", "Natação", "Ofícios", "Saltar", "Usar Cordas"],

    ladino: ["Acrobacia", "Arte da Fuga", "Avaliação", "Blefar", "Cavalgar", "Decifrar Escrita", "Diplomacia", "Disfarces", "Equilíbrio", "Escalar", "Esconder-se", "Falsificação", "Furtividade", "Intimidação", "Natação", "Obter Informação", "Ofícios", "Operar Mecanismos", "Ouvir", "Prestidigitação", "Procurar", "Profissão", "Saltar", "Sentir Motivação", "Usar Cordas", "Usar Instrumento"],

    mago: ["Concentração", "Conhecimento (Arcano)", "Conhecimento (História)", "Conhecimento (Natureza)", "Conhecimento (Nobreza)", "Conhecimento (Religião)", "Decifrar Escrita", "Identificar Magia", "Ofícios", "Profissão", "Usar Instrumento"],

    monge: ["Acrobacia", "Arte da Fuga", "Blefar", "Concentração", "Cura", "Diplomacia", "Equilíbrio", "Escalar", "Esconder-se", "Furtividade", "Intimidação", "Natação", "Ofícios", "Ouvir", "Prestidigitação", "Procurar", "Profissão", "Saltar", "Sentir Motivação", "Usar Cordas"],

    paladino: ["Adestrar Animais", "Cavalgar", "Concentração", "Conhecimento (Nobreza)", "Conhecimento (Religião)", "Cura", "Diplomacia", "Ofícios", "Profissão", "Sentir Motivação"],

    ranger: ["Adestrar Animais", "Arte da Fuga", "Avaliação", "Cavalgar", "Concentração", "Conhecimento (Natureza)", "Cura", "Diplomacia", "Equilíbrio", "Escalar", "Esconder-se", "Furtividade", "Identificar Magia", "Natação", "Obter Informação", "Ofícios", "Ouvir", "Prestidigitação", "Procurar", "Profissão", "Saltar", "Sentir Motivação", "Sobrevivência", "Usar Cordas"]
};