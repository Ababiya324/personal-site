import { useState, useEffect, useRef, type ReactNode } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Github, Linkedin, FileText, ChevronDown } from 'lucide-react';
import { BOOT_LINES } from '../lib/data';

type Phase = 'booting' | 'complete';

function renderBootLine(text: string, type?: string): ReactNode {
  if (!text) return <br />;
  if (type === 'ok') {
    const okIdx = text.lastIndexOf('[ OK ]');
    if (okIdx !== -1) {
      return (
        <>
          {text.slice(0, okIdx)}
          <span className="text-success">[ OK ]</span>
        </>
      );
    }
  }
  if (type === 'warn') {
    const wIdx = text.indexOf('[WARN]');
    if (wIdx !== -1) {
      return (
        <>
          {text.slice(0, wIdx)}
          <span className="text-warn">[WARN]</span>
          {text.slice(wIdx + 6)}
        </>
      );
    }
  }
  return text;
}

export function Hero() {
  const [phase, setPhase]       = useState<Phase>('booting');
  const [visibleCount, setCount] = useState(0);
  const timers                   = useRef<ReturnType<typeof setTimeout>[]>([]);
  const prefersReduced           = useReducedMotion();

  const skip = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setPhase('complete');
  };

  useEffect(() => {
    if (prefersReduced) { skip(); return; }

    BOOT_LINES.forEach((line, i) => {
      const t = setTimeout(() => setCount(i + 1), line.delay);
      timers.current.push(t);
    });

    const finalDelay = BOOT_LINES[BOOT_LINES.length - 1].delay + 900;
    const doneTimer  = setTimeout(() => setPhase('complete'), finalDelay);
    timers.current.push(doneTimer);

    return () => timers.current.forEach(clearTimeout);
  }, [prefersReduced]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-12"
    >
      <AnimatePresence mode="wait">
        {phase === 'booting' ? (
          <motion.div
            key="boot"
            className="w-full max-w-2xl"
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
          >
            <div className="terminal-window">
              <div className="window-titlebar">
                <div className="window-dot bg-accent" />
                <div className="window-dot" />
                <div className="window-dot" />
                <span className="ml-2">NeXTSTEP/CMQ -- boot console</span>
              </div>
              <div className="p-4 sm:p-6 min-h-64 text-xs sm:text-sm font-mono leading-relaxed">
                {BOOT_LINES.slice(0, visibleCount).map((line, i) => (
                  <div
                    key={i}
                    className="boot-line-enter text-ink-muted"
                  >
                    {renderBootLine(line.text, line.type)}
                    {!line.text && '​'}
                  </div>
                ))}
                {visibleCount > 0 && (
                  <span className="cursor" />
                )}
              </div>
              <div className="px-4 sm:px-6 pb-4 flex justify-end">
                <button
                  onClick={skip}
                  className="text-xs text-ink-muted hover:text-ink font-mono border border-border px-3 py-1.5 hover:border-border-strong transition-colors"
                >
                  skip --&gt;
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="reveal"
            className="w-full max-w-3xl text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {/* Prompt line */}
            <motion.div
              className="text-xs text-ink-muted font-mono tracking-widest mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
            >
              <span className="text-accent">$</span> whoami
            </motion.div>

            {/* Name: all monospace, no serif, no italic, Plan 9 style */}
            <motion.h1
              className="font-mono font-bold leading-none tracking-tighter mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <div className="text-5xl sm:text-7xl md:text-8xl text-ink uppercase">
                ABABIYA
              </div>
              <div className="text-5xl sm:text-7xl md:text-8xl text-accent uppercase">
                DARGE
              </div>
            </motion.h1>

            {/* Tagline */}
            <motion.div
              className="font-mono text-sm text-ink-muted mb-10 space-y-1 border-l-2 border-border pl-4 text-left max-w-xs mx-auto"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
            >
              <div>CS @ Carnegie Mellon Qatar</div>
              <div>
                ML + Systems
              </div>
            </motion.div>

            {/* Links */}
            <motion.div
              className="flex flex-wrap items-center justify-center gap-3"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              {[
                { icon: Github,   label: 'GitHub',   href: '#' },
                { icon: Linkedin, label: 'LinkedIn', href: '#' },
                { icon: FileText, label: 'Resume',   href: '#' },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 border border-border hover:border-accent hover:text-accent text-ink-muted transition-colors font-mono text-sm"
                >
                  <Icon size={14} />
                  {label}
                </a>
              ))}
            </motion.div>

            {/* Scroll hint */}
            <motion.div
              className="mt-16 flex flex-col items-center gap-2 text-ink-faint text-xs font-mono"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <span className="tracking-widest uppercase">scroll</span>
              <ChevronDown size={14} className="animate-bounce" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background grid */}
      <div
        className="absolute inset-0 -z-10 pointer-events-none opacity-[0.03] dark:opacity-[0.06]"
        style={{
          backgroundImage: 'linear-gradient(var(--color-ink) 1px, transparent 1px), linear-gradient(90deg, var(--color-ink) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
    </section>
  );
}
