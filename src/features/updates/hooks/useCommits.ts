import { useState, useEffect } from 'react';
import { buscarCommits } from '@services/api';
import type { Commit } from '@services/types';

export function useCommits() {
  const [commits, setCommits] = useState<Commit[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    buscarCommits()
      .then((data) => {
        setCommits(data);
      })
      .catch(() => {
        setErro(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { commits, loading, erro };
}
