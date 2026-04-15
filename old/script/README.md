# 📁 Estrutura da Pasta /script

Organização modular do sistema de D&D 3.5.

## 📂 Estrutura

```
script/
├── script.js                 # Arquivo principal - Inicialização e event listeners
├── data/                    # Dados estáticos da aplicação
│   ├── divindades.js        # Lista de divindades e alinhamentos
│   ├── itensporclasse.js    # Armas, armaduras, escudos e itens por classe
│   └── mapeamentocompleto.js # Mapeamento HTML <-> PDF
├── calculos/                # Funções de cálculo
│   ├── utils.js             # Funções auxiliares (getMod)
│   ├── atributos.js         # Cálculo de atributos base + raciais
│   ├── idiomas.js           # Sistema de idiomas
│   ├── resistencias.js      # Rolls de resistência (Fort/Ref/Von)
│   ├── bba.js               # Bonus Base de Ataque
│   ├── ca.js                # Classe de Armadura
│   └── combate.js           # Cálculos de ataque e dano
└── README.md                # Este arquivo
```

## 🎯 Responsabilidades

### **script.js**
- Event listeners do DOM
- Orquestração de atualizações
- Sincronização entre campos
- Exportação de PDF

### **data/** - Dados Estáticos
- **divindades.js**: 35+ divindades, seus alinhamentos válidos
- **itensporclasse.js**: Armas, armaduras, escudos e equipamentos por classe
- **mapeamentocompleto.js**: Tradução de IDs HTML para nomes de campos PDF

### **calculos/** - Lógica Matemática
- **utils.js**: Modificador de atributo `(valor - 10) / 2`
- **atributos.js**: Base + Bonus Racial = Total
- **idiomas.js**: Idiomas raciais + idiomas extras por INT
- **resistencias.js**: Fort/Ref/Von = Base + Mod + Bônus
- **bba.js**: Bonus Base de Ataque por nível/classe
- **ca.js**: CA = 10 + Armadura + Escudo + Destreza + Tamanho
- **combate.js**: Bônus de ataque e dano de arma

## 🔄 Fluxo de Dados

```
Usuário altera DROP (classe/raça)
  ↓
script.js dispara evento
  ↓
Limpa campos anteriores
  ↓
Preenche itens de data/
  ↓
Chama funções calculos/
  ↓
Atualiza DOM com resultados
```

## ✨ Benefícios desta Estrutura

✅ **Separação de conceitos**: Dados ≠ Lógica ≠ Interface
✅ **Fácil manutenção**: Alterar dados é simples
✅ **Escalável**: Adicionar novas classes/raças é apenas adicionar entries
✅ **Testável**: Cada função tem responsabilidade única
✅ **Lean**: script.js puro e conciso (~700 linhas)
