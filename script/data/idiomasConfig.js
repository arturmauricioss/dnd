export const idiomasRaciais = {
    humano: {
        base: ["Comum"],
        extras: []
    },
    elfo: {
        base: ["Comum", "Élfico"],
        extras: ["Dracônico", "Gnoll", "Gnomo", "Goblin", "Orc", "Silvestre"]
    },
    anao: {
        base: ["Comum", "Anão"],
        extras: ["Gigante", "Gnomo", "Goblin", "Orc", "Terran", "Subterrâneo"]
    },
    halfling: {
        base: ["Comum", "Halfling"],
        extras: ["Anão", "Élfico", "Gnomo", "Goblin", "Orc"]
    },
    gnomo: {
        base: ["Comum", "Gnomo"],
        extras: ["Dracônico", "Anão", "Élfico", "Gigante", "Goblin", "Orc", "Kobold"]
    },
    "meio-elfo": {
        base: ["Comum", "Élfico"],
        extras: []
    },
    "meio-orc": {
        base: ["Comum", "Orc"],
        extras: ["Dracônico", "Gigante", "Gnoll", "Goblin", "Abyssal"]
    }
};

export const idiomaClasseFixo = {
    druida: ["Druídico"]
};

export const idiomasClasseExtras = {
    clerigo: ["Abissal", "Celestial", "Infernal"],
    mago: ["Dracônico"],
    druida: ["Silvestre"]
};

export const TODOS_IDIOMAS = [
    'Anão', 'Gnomo', 'Goblin', 'Gigante', 'Terran', 'Orc',
    'Gnoll', 'Halfling', 'Élfico', 'Aquan', 'Subterrâneo',
    'Auran', 'Ignan', 'Dracônico', 'Celestial', 'Infernal', 
    'Abissal', 'Silvestre'
];
