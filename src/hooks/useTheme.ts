import { useState, useEffect, useCallback, useRef } from 'react';

type Theme = 'light' | 'dark';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'light';
    const stored = localStorage.getItem('theme') as Theme | null;
    if (stored === 'dark' || stored === 'light') return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  const [isSweeping, setIsSweeping] = useState(false);
  const sweepTimer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggle = useCallback(() => {
    if (isSweeping) return;
    setIsSweeping(true);
    sweepTimer.current = setTimeout(() => {
      setTheme(t => (t === 'light' ? 'dark' : 'light'));
      setTimeout(() => setIsSweeping(false), 200);
    }, 190);
  }, [isSweeping]);

  useEffect(() => () => clearTimeout(sweepTimer.current), []);

  return { theme, toggle, isSweeping };
}
