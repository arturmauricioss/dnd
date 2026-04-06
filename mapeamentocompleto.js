
export const mapeamentoCompleto = {
// Este objeto traduz: ID DO HTML -> NOME EXATO NO PDF

       // --- CABEÇALHO / IDENTIDADE ---
    'character_name': 'Nome do Personagem',
    'player': 'Jogador',
    'class': 'Classe',
    'level_class': 'Nível',
    'race': 'Raça',
    'alignment': 'Tendência',
    'deity': 'Divindade',
    'size': 'Tamanho',

    'sex': 'Sexo',
    'idade': 'Idade',
    'height': 'Altura',
    'weight': 'Peso',
    'eyes': 'Olhos',
    'hair': 'Cabelos', // ✅ corrigido
    'skin': 'Pele',

    // ❌ PROFISSÃO NÃO EXISTE NO PDF (removido)

    // --- ATRIBUTOS ---
    'total_forca': 'For',
    'total_destreza': 'Des',
    'total_constituicao': 'Con',
    'total_inteligencia': 'Int',
    'total_sabedoria': 'Sab',
    'total_carisma': 'Car',

    // modificadores
    'mod_habilidade_forca': 'M For',
    'mod_habilidade_destreza': 'M Des',
    'mod_habilidade_constituicao': 'M Con',
    'mod_habilidade_inteligencia': 'M Int',
    'mod_habilidade_sabedoria': 'M Sab',
    'mod_habilidade_carisma': 'M Car',
    
      // --- VIDA ---
    'vida': 'PV',
    'vida_atual': 'PV0',

    // --- DESLOCAMENTO---- 
    'deslocamento': 'Deslocamento',

    // --- Iniciativa ----
    'iniciativa_total': 'Iniciativa',
    'iniciativa': 'Iniciativa M Des',
    'iniciativa_outros': 'Iniciativa Outros',


    'wound_0': 'Fer0',
    'wound_1': 'Fer1',
    'wound_2': 'Fer2',
    'wound_3': 'Fer3',
    'wound_4': 'Fer4',
    'wound_5': 'Fer5',
    'wound_6': 'Fer6',
    'wound_7': 'Fer7',

     // --- COMBATE ---
    'ca_final': 'CA',
    'ca_armor': 'CA0',
    'ca_shield': 'CA1',
    'ca_dex': 'CA2',
    'ca_size': 'CA3',
    'ca_natural': 'CA4',
    'ca_other': 'CA5',

    'ca_toque_total': 'Toque',
    'ca_surpresa_total': 'Surprese', // nome do PDF mesmo bugado



    // --- TESTES DE RESISTÊNCIA ---
    'save_fortitude': 'Fortitude',
    'save_fortitude_base': 'Fortitude Bônus Base',
    'save_fortitude_con': 'Fortitude M Con',
    'save_fortitude_magic': 'Fortitude Mod Mágico',
    'save_fortitude_other': 'Fortitude Outros',

    'save_reflex': 'Reflexos',
    'save_reflex_base': 'Reflexos Bônus Base',
    'save_reflex_dex': 'Reflexos M Des',
    'save_reflex_magic': 'Reflexos Mod Mágico',
    'save_reflex_other': 'Reflexos Outros',

    'save_will': 'Vontade',
    'save_will_base': 'Vontade Bônus Base',
    'save_will_wis': 'Vontade M Sab',
    'save_will_magic': 'Vontade Mod Mágico',
    'save_will_other': 'Vontade Outros',

      // --- ATAQUE ---
    'base_attack_bonus': 'BBA',

    'grapple': 'Agarrar',
    'grapple_bab': 'Agarrar BBA',
    'grapple_str': 'Agarrar M For',
    'grapple_size': 'Agarrar Mod Tamanho',
    'grapple_other': 'Agarrar Outros',

    'spell_resistance': 'Resistência à Magia',
    'damage_reduction': 'Redução de Dano',


     // --- ATAQUES ---
    // ATAQUE 1
    'attack_1': 'Ataque 1',
    'attack_1_bonus': 'Ataque 1 Bônus',
    'attack_1_damage': 'Ataque 1 Dano',
    'attack_1_crit': 'Ataque 1 Crítico',
    'attack_1_range': 'Ataque 1 Alcance',
    'attack_1_type': 'Ataque 1 Tipo',
    'attack_1_notes': 'Ataque 1 Observações',
    'attack_1_ammo': 'Ataque 1 Munição',

    // ATAQUE 2
    'attack_2': 'Ataque 2',
    'attack_2_bonus': 'Ataque 2 Bônus',
    'attack_2_damage': 'Ataque 2 Dano',
    'attack_2_crit': 'Ataque 2 Crítico',
    'attack_2_range': 'Ataque 2 Alcance',
    'attack_2_type': 'Ataque 2 Tipo',
    'attack_2_notes': 'Ataque 2 Observações',
    'attack_2_ammo': 'Ataque 2 Munição',

    // ATAQUE 3
    'attack_3': 'Ataque 3',
    'attack_3_bonus': 'Ataque 3 Bônus',
    'attack_3_damage': 'Ataque 3 Dano',
    'attack_3_crit': 'Ataque 3 Crítico',
    'attack_3_range': 'Ataque 3 Alcance',
    'attack_3_type': 'Ataque 3 Tipo',
    'attack_3_notes': 'Ataque 3 Observações',
    'attack_3_ammo': 'Ataque 3 Munição',

    // ATAQUE 4
    'attack_4': 'Ataque 4',
    'attack_4_bonus': 'Ataque 4 Bônus',
    'attack_4_damage': 'Ataque 4 Dano',
    'attack_4_crit': 'Ataque 4 Crítico',
    'attack_4_range': 'Ataque 4 Alcance',
    'attack_4_type': 'Ataque 4 Tipo',
    'attack_4_notes': 'Ataque 4 Observações',
    'attack_4_ammo': 'Ataque 4 Munição',


     // --- ARMADURA ---
    'armor_name': 'Armadura',
    'armor_type': 'Armadura Tipo',
    'armor_bonus': 'Armadura Bônus',
    'armor_dex_max': 'Armadura Des Max',
    'armor_penalty': 'Armadura Penalidade',
    'armor_spell_fail': 'Armadura CFM',
    'armor_speed': 'Armadura Deslocamento',
    'armor_weight': 'Armadura Peso',
    'armor_notes': 'Armadura Observações',

    // --- ESCUDO ---
    'shield_name': 'Escudo',
    'shield_bonus': 'Escudo Bônus',
    'shield_weight': 'Escudo Peso',
    'shield_penalty': 'Escudo Penalidade',
    'shield_spell_fail': 'Escudo CFM',
    'shield_notes': 'Escudo Propriedades',


     // --- ITENS ---
    'item_1': 'Item 1',
    'item_1_bonus': 'Item 1 Bônus',
    'item_1_weight': 'Item 1 Peso',
    'item_1_props': 'Item 1 Propriedades',

    'item_2': 'Item 2',
    'item_2_bonus': 'Item 2 Bônus',
    'item_2_weight': 'Item 2 Peso',
    'item_2_props': 'Item 2 Propriedades',

     // --- ITENS GERAIS ---

    'itens_0': 'Itens0',
    'itens_1': 'Itens1',
    'itens_2': 'Itens2',
    'itens_3': 'Itens3',
    'itens_4': 'Itens4',
    'itens_5': 'Itens5',
    'itens_6': 'Itens6',
    'itens_7': 'Itens7',
    'itens_8': 'Itens8',
    'itens_9': 'Itens9',
    'itens_10': 'Itens10',
    'itens_11': 'Itens11',

    // --- DINHEIRO ---
    'money_pl': 'Platina',
    'money_po': 'Ouro',
    'money_pp': 'Prata',
    'money_pc': 'Cobre',

     // --- PESO ---
    'weight_total_carried': 'Peso Total',
    'weight_light': 'Carga Leve',
    'weight_medium': 'Carga Média',
    'weight_hard': 'Carga Pesada',

    // --- IDIOMAS ---

    'leitura_escrita': 'Idiomas0',
    'idioma_1': 'Idiomas1',
    'idioma_2': 'Idiomas2',
    'idioma_3': 'Idiomas3',
    'idioma_4': 'Idiomas4',
    'idioma_5': 'Idiomas5',


    // --- PERÍCIAS ---
    'skill_acrobacia': 'Perícia Acrobacia',
    'skill_acrobacia_dex': 'Perícia Acrobacia M Des',
    'skill_acrobacia_ranks': 'Perícia Acrobacia Grad',
    'skill_acrobacia_other': 'Perícia Acrobacia Outros',

};