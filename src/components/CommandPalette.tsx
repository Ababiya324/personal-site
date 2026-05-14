import { useState, useEffect, useRef, useMemo } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Search, ArrowRight, Sun, Moon, HelpCircle, Github, Linkedin, FileText } from 'lucide-react';
import { NAV_SECTIONS } from '../lib/data';

interface Props {
  open: boolean;
  theme: 'light' | 'dark';
  onClose: () => void;
  onToggleTheme: () => void;
  onOpenHelp: () => void;
}

export function CommandPalette({ open, theme, onClose, onToggleTheme, onOpenHelp }: Props) {
  const [query, setQuery]       = useState('');
  const [cursor, setCursor]     = useState(0);
  const inputRef                = useRef<HTMLInputElement>(null);
  const listRef                 = useRef<HTMLDivElement>(null);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    onClose();
  };

  const all = useMemo(() => [
    ...NAV_SECTIONS.map(s => ({
      id: `nav-${s.id}`,
      label: s.label,
      description: `Scroll to ${s.label} section`,
      shortcut: s.shortcut,
      group: 'navigate' as const,
      icon: <ArrowRight size={14} />,
      action: () => scrollTo(s.id),
    })),
    {
      id: 'toggle-theme',
      label: `Switch to ${theme === 'light' ? 'dark' : 'light'} theme`,
      description: 'CRT sweep transition included',
      group: 'actions' as const,
      icon: theme === 'light' ? <Moon size={14} /> : <Sun size={14} />,
      action: () => { onToggleTheme(); onClose(); },
    },
    {
      id: 'help',
      label: 'Open help overlay',
      description: 'Keyboard shortcuts and site docs',
      shortcut: '?--help',
      group: 'actions' as const,
      icon: <HelpCircle size={14} />,
      action: () => { onOpenHelp(); onClose(); },
    },
    {
      id: 'github',
      label: 'GitHub',
      description: 'github.com/ababiyadarge',
      group: 'links' as const,
      icon: <Github size={14} />,
      action: () => { window.open('#', '_blank'); onClose(); },
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      group: 'links' as const,
      icon: <Linkedin size={14} />,
      action: () => { window.open('#', '_blank'); onClose(); },
    },
    {
      id: 'resume',
      label: 'Resume (PDF)',
      group: 'links' as const,
      icon: <FileText size={14} />,
      action: () => { window.open('#', '_blank'); onClose(); },
    },
  ], [theme, onClose, onToggleTheme, onOpenHelp]);

  const filtered = useMemo(() => {
    if (!query.trim()) return all;
    const q = query.toLowerCase();
    return all.filter(
      item =>
        item.label.toLowerCase().includes(q) ||
        (item.description ?? '').toLowerCase().includes(q)
    );
  }, [query, all]);

  useEffect(() => {
    if (open) {
      setQuery('');
      setCursor(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => { setCursor(0); }, [filtered]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setCursor(c => Math.min(c + 1, filtered.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setCursor(c => Math.max(c - 1, 0));
      } else if (e.key === 'Enter' && filtered[cursor]) {
        filtered[cursor].action();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, cursor, filtered]);

  const groups = useMemo(() => {
    const map: Record<string, typeof filtered> = {};
    for (const item of filtered) {
      (map[item.group] ??= []).push(item);
    }
    return map;
  }, [filtered]);

  const GROUP_LABELS: Record<string, string> = {
    navigate: 'NAVIGATE',
    actions:  'ACTIONS',
    links:    'LINKS',
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="palette-backdrop"
          className="fixed inset-0 z-[9980] bg-ink/60 backdrop-blur-sm flex items-start justify-center pt-[15vh] px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.12 }}
          onClick={onClose}
        >
          <motion.div
            className="terminal-window w-full max-w-lg overflow-hidden"
            initial={{ opacity: 0, scale: 0.96, y: -12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -8 }}
            transition={{ type: 'spring', stiffness: 500, damping: 35 }}
            onClick={e => e.stopPropagation()}
          >
            {/* Search input */}
            <div className="flex items-center gap-2 px-3 py-2.5 border-b border-border">
              <Search size={14} className="text-ink-muted flex-shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="search commands..."
                className="flex-1 bg-transparent text-sm font-mono text-ink placeholder:text-ink-faint outline-none"
                aria-label="Command palette search"
              />
              <kbd className="kbd text-xs">Esc</kbd>
            </div>

            {/* Results */}
            <div
              ref={listRef}
              className="max-h-72 overflow-y-auto py-1"
              role="listbox"
            >
              {filtered.length === 0 && (
                <div className="px-4 py-6 text-center text-ink-muted text-xs">
                  no commands match "{query}"
                </div>
              )}

              {['navigate', 'actions', 'links'].map(group => {
                const items = groups[group];
                if (!items || items.length === 0) return null;
                const flatIndex = filtered.findIndex(f => f === items[0]);

                return (
                  <div key={group}>
                    <div className="px-3 py-1.5 text-xs text-ink-faint tracking-widest uppercase">
                      {GROUP_LABELS[group]}
                    </div>
                    {items.map((item, i) => {
                      const idx = flatIndex + i;
                      const active = idx === cursor;
                      return (
                        <button
                          key={item.id}
                          role="option"
                          aria-selected={active}
                          onClick={item.action}
                          onMouseEnter={() => setCursor(idx)}
                          className={`w-full flex items-center gap-3 px-3 py-2.5 text-left transition-colors ${
                            active
                              ? 'bg-accent-dim text-ink'
                              : 'text-ink-muted hover:text-ink hover:bg-bg-alt'
                          }`}
                        >
                          <span className={`flex-shrink-0 ${active ? 'text-accent' : ''}`}>
                            {item.icon}
                          </span>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-mono">{item.label}</div>
                            {item.description && (
                              <div className="text-xs text-ink-faint truncate">{item.description}</div>
                            )}
                          </div>
                          {item.shortcut && (
                            <kbd className="kbd text-xs flex-shrink-0">{item.shortcut}</kbd>
                          )}
                        </button>
                      );
                    })}
                  </div>
                );
              })}
            </div>

            <div className="px-3 py-1.5 border-t border-border flex items-center gap-4 text-xs text-ink-faint">
              <span><kbd className="kbd">Enter</kbd> confirm</span>
              <span><kbd className="kbd">Up</kbd><kbd className="kbd">Down</kbd> navigate</span>
              <span><kbd className="kbd">Esc</kbd> close</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
