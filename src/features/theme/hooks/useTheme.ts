import { useState, useEffect } from 'react';
import type { Theme } from '@features/theme/types';

export function useThemeState() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme') as Theme;
      if (saved) return saved;
      return window.matchMedia('(prefers-color-scheme: light)').matches
        ? 'light'
        : 'dark';
    }
    return 'dark';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev: Theme) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return { theme, toggleTheme };
}

export function useThemeSync(theme: Theme) {
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);
}
