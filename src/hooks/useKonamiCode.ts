import { useState, useEffect, useRef } from 'react';

const KONAMI = [
  'ArrowUp','ArrowUp',
  'ArrowDown','ArrowDown',
  'ArrowLeft','ArrowRight',
  'ArrowLeft','ArrowRight',
  'b','a',
];

export function useKonamiCode() {
  const [triggered, setTriggered] = useState(false);
  const seq = useRef<string[]>([]);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      seq.current = [...seq.current, e.key].slice(-KONAMI.length);
      if (seq.current.join(',') === KONAMI.join(',')) {
        seq.current = [];
        setTriggered(true);
        clearTimeout(timer.current);
        timer.current = setTimeout(() => setTriggered(false), 1600);
      }
    };
    window.addEventListener('keydown', handler);
    return () => {
      window.removeEventListener('keydown', handler);
      clearTimeout(timer.current);
    };
  }, []);

  return triggered;
}
