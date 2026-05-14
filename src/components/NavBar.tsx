import { useState } from 'react';
import { Sun, Moon, Terminal, X, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { NAV_SECTIONS } from '../lib/data';

interface Props {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onOpenPalette: () => void;
  onOpenHelp: () => void;
}

export function NavBar({ theme, onToggleTheme, onOpenPalette, onOpenHelp }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-bg/90 backdrop-blur-sm border-b border-border">
        <nav className="max-w-5xl mx-auto px-4 h-12 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => scrollTo('hero')}
            className="font-mono font-bold text-sm text-ink hover:text-accent transition-colors tracking-widest"
            aria-label="Scroll to top"
          >
            AD.exe
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_SECTIONS.map(s => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className="px-3 py-1.5 text-xs text-ink-muted hover:text-ink hover:bg-bg-alt transition-colors font-mono tracking-wide"
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1">
            {/* Help */}
            <button
              onClick={onOpenHelp}
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-ink-muted hover:text-ink hover:bg-bg-alt transition-colors font-mono"
              aria-label="Open help"
              title="--help"
            >
              --help
            </button>

            {/* Command palette trigger */}
            <button
              onClick={onOpenPalette}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-ink-muted hover:text-ink hover:bg-bg-alt transition-colors font-mono border border-border"
              aria-label="Open command palette (Ctrl K)"
            >
              <Terminal size={12} />
              <span className="hidden sm:inline">cmd</span>
              <kbd className="kbd hidden sm:inline text-xs">Ctrl K</kbd>
            </button>

            {/* Theme toggle */}
            <button
              onClick={onToggleTheme}
              className="p-2 text-ink-muted hover:text-ink hover:bg-bg-alt transition-colors border border-border"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
            >
              {theme === 'light' ? <Moon size={14} /> : <Sun size={14} />}
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(o => !o)}
              className="md:hidden p-2 text-ink-muted hover:text-ink hover:bg-bg-alt transition-colors border border-border"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={14} /> : <Menu size={14} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            className="fixed inset-0 z-40 pt-12 bg-bg md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <div className="flex flex-col p-4 gap-1 border-t border-border">
              {NAV_SECTIONS.map((s, i) => (
                <motion.button
                  key={s.id}
                  onClick={() => scrollTo(s.id)}
                  className="flex items-center justify-between px-4 py-4 text-left text-ink hover:bg-bg-alt border border-transparent hover:border-border transition-colors font-mono text-sm"
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <span>{s.label}</span>
                  <kbd className="kbd text-xs">{s.shortcut}</kbd>
                </motion.button>
              ))}
              <div className="mt-4 pt-4 border-t border-border flex items-center gap-3">
                <button
                  onClick={onOpenHelp}
                  className="text-xs text-ink-muted hover:text-ink font-mono"
                >
                  --help
                </button>
                <button
                  onClick={() => { onOpenPalette(); setMenuOpen(false); }}
                  className="text-xs text-ink-muted hover:text-ink font-mono"
                >
                  cmd palette
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
