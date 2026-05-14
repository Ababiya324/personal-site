import { useState, useEffect } from 'react';
import { BUILD_HASH, BOOT_EPOCH } from '../lib/data';

function formatUptime(ms: number): string {
  const s   = Math.floor(ms / 1000);
  const d   = Math.floor(s / 86400);
  const h   = Math.floor((s % 86400) / 3600);
  const m   = Math.floor((s % 3600) / 60);
  return `${d}d ${h}h ${m}m`;
}

export function StatusWidget() {
  const [uptime, setUptime]   = useState(() => formatUptime(Date.now() - BOOT_EPOCH));
  const [cpu, setCpu]         = useState(23);
  const [mem, setMem]         = useState(61);

  useEffect(() => {
    const tick = setInterval(() => {
      setUptime(formatUptime(Date.now() - BOOT_EPOCH));
      setCpu(prev => Math.max(5, Math.min(95, prev + Math.floor(Math.random() * 11) - 5)));
      setMem(prev => Math.max(40, Math.min(85, prev + Math.floor(Math.random() * 5) - 2)));
    }, 3000);
    return () => clearInterval(tick);
  }, []);

  return (
    <div
      className="fixed bottom-3 right-3 z-50 terminal-window text-xs text-ink-muted px-3 py-1.5 flex items-center gap-3 select-none pointer-events-none"
      aria-hidden="true"
    >
      <span className="text-accent font-bold">[SYS]</span>
      <span>up {uptime}</span>
      <span className="hidden sm:inline">cpu {cpu}%</span>
      <span className="hidden sm:inline">mem {mem}%</span>
      <span className="text-ink-faint">#{BUILD_HASH}</span>
    </div>
  );
}
