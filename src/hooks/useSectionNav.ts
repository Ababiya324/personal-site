import { useEffect, useRef } from 'react';

const SHORTCUTS: Record<string, string> = {
  h: 'hero',
  a: 'about',
  e: 'experience',
  p: 'projects',
  s: 'skills',
  c: 'contact',
};

export function useSectionNav() {
  const pendingG = useRef(false);
  const timer    = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const active = document.activeElement;
      if (active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA')) return;

      if (e.key === 'g' || e.key === 'G') {
        pendingG.current = true;
        clearTimeout(timer.current);
        timer.current = setTimeout(() => { pendingG.current = false; }, 800);
        return;
      }

      if (pendingG.current) {
        const sectionId = SHORTCUTS[e.key.toLowerCase()];
        if (sectionId) {
          e.preventDefault();
          pendingG.current = false;
          clearTimeout(timer.current);
          document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    window.addEventListener('keydown', handler);
    return () => {
      window.removeEventListener('keydown', handler);
      clearTimeout(timer.current);
    };
  }, []);
}
