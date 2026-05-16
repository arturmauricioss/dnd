import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@lib/supabase';
import { useAuth } from '@hooks/useAuth';

interface Personagem {
  id: string;
  nome: string;
  raca: { key: string; label: string } | null;
  genero: string;
  created_at: string;
}

export function usePersonagens() {
  const { user } = useAuth();
  const [personagens, setPersonagens] = useState<Personagem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPersonagens = useCallback(async () => {
    if (!user) {
      setPersonagens([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const { data, error } = await supabase
      .from('personagens')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching personagens:', error);
      setPersonagens([]);
    } else {
      setPersonagens(data || []);
    }
    setLoading(false);
  }, [user]);

  useEffect(() => {
    fetchPersonagens();
  }, [fetchPersonagens]);

  async function salvarPersonagem(
    personagem: Omit<Personagem, 'id' | 'created_at'>
  ) {
    if (!user) return;

    const { data, error } = await supabase
      .from('personagens')
      .insert({
        user_id: user.id,
        nome: personagem.nome,
        raca: personagem.raca,
        genero: personagem.genero,
      })
      .select()
      .single();

    if (error) {
      console.error('Error saving personagem:', error);
      throw error;
    }

    if (data) {
      setPersonagens((prev) => [data, ...prev]);
    }
  }

  async function removerPersonagem(id: string) {
    const { error } = await supabase.from('personagens').delete().eq('id', id);

    if (error) {
      console.error('Error removing personagem:', error);
      throw error;
    }

    setPersonagens((prev) => prev.filter((p) => p.id !== id));
  }

  return { personagens, loading, salvarPersonagem, removerPersonagem };
}
