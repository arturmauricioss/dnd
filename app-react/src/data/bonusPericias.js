export const bonusPericiasRaca = {
    anao: {
        "ofício (armeiro)": 2,
        "ofício (couraceiro)": 2,
        "ofício (ferraria)": 2,
        "ofício (serralheria)": 2,
        "ofício (cantaria)": 2,
        "ofício (escultura)": 2,
        "ofício (armadilhas)": 2,
        "ofício (lapidação)": 2
    },
    elfo: {
        ouvir: 2,
        procurar: 2,
        observar: 2
    },
    gnomo: {
        "esconder-se": 4,
        ouvir: 2,
        "ofício (alquimia)": 2
    },
    halfling: {
        "esconder-se": 4,
        escalar: 2,
        saltar: 2,
        furtividade: 2,
        ouvir: 2
    },
    "meio-elfo": {
        diplomacia: 2,
        "obter informação": 2,
        ouvir: 1,
        procurar: 1,
        observar: 1
    },
    humano: {},
    "meio-orc": {}
};

export function getBonusPericiaRacial(raca, nomePericia) {
    if (!raca || raca === 'selecione') return 0;
    const racaKey = raca.toLowerCase().replace(/\s+/g, '-');
    const bonuses = bonusPericiasRaca[racaKey] || {};
    const normalizedNome = nomePericia.toLowerCase();
    return bonuses[normalizedNome] || 0;
}


