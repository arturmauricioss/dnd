import { useEffect, useMemo, useState } from 'react';
import type { Nome, SortField } from '../types';

const TODAS_CULTURAS = ['human', 'elf', 'dwarf', 'orc', 'gnome', 'halfling'];

type StatsGenero = {
  masc: number;
  fem: number;
  uni: number;
};

type CulturaStats = {
  universais: StatsGenero;
  compartilhados: StatsGenero;
  unicos: StatsGenero;
  total: StatsGenero;
};

function criarStatsGenero(): StatsGenero {
  return {
    masc: 0,
    fem: 0,
    uni: 0,
  };
}

function criarStatsCultura(): CulturaStats {
  return {
    universais: criarStatsGenero(),
    compartilhados: criarStatsGenero(),
    unicos: criarStatsGenero(),
    total: criarStatsGenero(),
  };
}

function incrementarGenero(stats: StatsGenero, genero: Nome['genero']) {
  if (genero === 'masculino') {
    stats.masc++;
  }

  if (genero === 'feminino') {
    stats.fem++;
  }

  if (genero === 'unissex') {
    stats.uni++;
  }
}

export function useNomes() {
  const [nomes, setNomes] = useState<Nome[]>([]);
  const [busca, setBusca] = useState('');
  const [generoFiltro, setGeneroFiltro] = useState<Nome['genero'] | null>(null);

  const [culturaFiltro, setCulturaFiltro] = useState<string[]>([]);

  const [sortStack, setSortStack] = useState<SortField[]>([]);

  useEffect(() => {
    fetch('http://localhost:3002/nomes')
      .then((res) => res.json())
      .then((data) => setNomes(data));
  }, []);

  const estatisticas = useMemo(() => {
    const stats: Record<string, CulturaStats> = {};

    for (const cultura of TODAS_CULTURAS) {
      stats[cultura] = criarStatsCultura();
    }

    for (const nome of nomes) {
      const universal = nome.culturas.length === 0;

      const culturasNome = universal ? TODAS_CULTURAS : nome.culturas;

      const unico = nome.culturas.length === 1;

      for (const cultura of culturasNome) {
        incrementarGenero(stats[cultura].total, nome.genero);

        if (universal) {
          incrementarGenero(stats[cultura].universais, nome.genero);
        } else if (unico) {
          incrementarGenero(stats[cultura].unicos, nome.genero);
        } else {
          incrementarGenero(stats[cultura].compartilhados, nome.genero);
        }
      }
    }

    return {
      totalNomes: nomes.length,
      culturas: stats,
    };
  }, [nomes]);

  const nomesFiltrados = useMemo(() => {
    return [...nomes]
      .filter((item) => {
        const matchBusca = item.nome
          .toLowerCase()
          .includes(busca.toLowerCase());

        const matchGenero = !generoFiltro || item.genero === generoFiltro;

        const matchCultura =
          culturaFiltro.length === 0 ||
          item.culturas.length === 0 ||
          culturaFiltro.some((c) => item.culturas.includes(c));

        return matchBusca && matchGenero && matchCultura;
      })
      .sort((a, b) => {
        for (const campo of sortStack) {
          let result = 0;

          if (campo === 'nome') {
            result = a.nome.localeCompare(b.nome);
          } else if (campo === 'genero') {
            result = a.genero.localeCompare(b.genero);
          } else {
            const aHas = a.culturas.length === 0 || a.culturas.includes(campo);

            const bHas = b.culturas.length === 0 || b.culturas.includes(campo);

            if (aHas !== bHas) {
              result = aHas ? -1 : 1;
            }
          }

          if (result !== 0) return result;
        }

        return a.nome.localeCompare(b.nome);
      });
  }, [nomes, busca, generoFiltro, culturaFiltro, sortStack]);

  function updateNome<K extends keyof Nome>(
    id: string,
    field: K,
    value: Nome[K]
  ) {
    setNomes((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  }

  function toggleCultura(id: string, cultura: string) {
    setNomes((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;

        const hasCultura = item.culturas.includes(cultura);

        return {
          ...item,
          culturas: hasCultura
            ? item.culturas.filter((c) => c !== cultura)
            : [...item.culturas, cultura],
        };
      })
    );
  }

  function remover(id: string) {
    setNomes((prev) => prev.filter((item) => item.id !== id));
  }

  function capitalizarNome(nome: string) {
    return nome
      .trim()
      .split(' ')
      .map(
        (palavra) =>
          palavra.charAt(0).toUpperCase() + palavra.slice(1).toLowerCase()
      )
      .join(' ');
  }

  function parseAdicionar(texto: string): Nome[] {
    const [nomesParte, configParte = ''] = texto.split('-');

    const nomes = nomesParte
      .trim()
      .split(/\s+/)
      .map((nome) => capitalizarNome(nome.replace(/_/g, ' ')))
      .filter(Boolean);

    let genero: Nome['genero'] = 'masculino';

    const culturas = new Set<string>();

    const culturasMap: Record<string, string> = {
      h: 'human',
      o: 'orc',
      e: 'elf',
      a: 'dwarf',
      g: 'gnome',
      l: 'halfling',
    };

    for (const char of configParte.toLowerCase()) {
      if (char === 'm') {
        genero = 'masculino';
      } else if (char === 'f') {
        genero = 'feminino';
      } else if (char === 'u') {
        genero = 'unissex';
      } else if (culturasMap[char]) {
        culturas.add(culturasMap[char]);
      }
    }

    return nomes.map((nome) => ({
      id: crypto.randomUUID(),
      nome,
      genero,
      culturas: [...culturas],
    }));
  }

  function adicionar(texto: string) {
    const novos = parseAdicionar(texto);

    setNomes((prev) => {
      const nomesExistentes = new Set(
        prev.map((n) => n.nome.trim().toLowerCase())
      );

      const nomesNovos = new Set<string>();

      const filtrados = novos.filter((n) => {
        const nome = n.nome.trim().toLowerCase();

        if (nomesExistentes.has(nome)) return false;

        if (nomesNovos.has(nome)) return false;

        nomesNovos.add(nome);

        return true;
      });

      return [...filtrados, ...prev];
    });
  }

  function ordenar(campo: SortField) {
    setSortStack((prev) =>
      prev.includes(campo)
        ? [campo, ...prev.filter((c) => c !== campo)]
        : [campo, ...prev]
    );
  }

  async function salvar() {
    const dadosOrdenados = [...nomes]
      .map((n) => ({
        id: n.id,
        nome: n.nome,
        culturas: n.culturas,
        genero: n.genero,
      }))
      .sort((a, b) => a.nome.localeCompare(b.nome));

    await fetch('http://localhost:3002/nomes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dadosOrdenados),
    });
  }

  return {
    nomes,
    nomesFiltrados,

    busca,
    setBusca,

    generoFiltro,
    setGeneroFiltro,

    culturaFiltro,
    setCulturaFiltro,

    updateNome,
    toggleCultura,
    remover,
    adicionar,
    ordenar,
    salvar,

    estatisticas,
  };
}
