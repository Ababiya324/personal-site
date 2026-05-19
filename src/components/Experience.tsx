import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { EXPERIENCE } from '../lib/data';
import type { Experience as ExperienceType } from '../types';

function ExperienceRow({ entry, index }: { entry: ExperienceType; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const reduced = useReducedMotion();
  const hasBullets = (entry.bullets?.length ?? 0) > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: reduced ? 0 : 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
    >
      <button
        onClick={() => hasBullets && setExpanded(e => !e)}
        className={`w-full text-left border-b border-border transition-colors group ${hasBullets ? 'hover:bg-bg-alt cursor-pointer' : 'cursor-default'}`}
        aria-expanded={hasBullets ? expanded : undefined}
        disabled={!hasBullets}
      >
        <div className="grid grid-cols-[1fr_auto] sm:grid-cols-[1fr_1fr_auto] gap-x-4 px-4 py-3 items-center">
          <div className="flex flex-col gap-0.5 min-w-0">
            <span className="text-accent text-xs font-mono font-medium truncate">
              {entry.company}
            </span>
            <span className="text-ink text-sm font-mono truncate">{entry.role}</span>
          </div>

          <div className="hidden sm:flex flex-wrap gap-1 items-center">
            {entry.tags?.map(t => (
              <span key={t} className="text-xs px-1.5 py-0.5 border border-border text-ink-muted font-mono">{t}</span>
            ))}
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <span className="text-ink-faint text-xs tabular-nums whitespace-nowrap">{entry.period}</span>
            {hasBullets && (
              <ChevronDown
                size={13}
                className={`text-ink-muted transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
              />
            )}
          </div>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {expanded && hasBullets && (
          <motion.div
            key="bullets"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.25 }}
            className="overflow-hidden"
          >
            <ul className="px-4 pt-2 pb-4 space-y-1.5 border-b border-border bg-bg-alt">
              {entry.bullets!.map((b, i) => (
                <li key={i} className="flex gap-2 text-xs text-ink-muted font-mono leading-relaxed">
                  <span className="text-accent flex-shrink-0 mt-px">●</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function Experience() {
  return (
    <section id="experience" className="py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="section-rule">
          <span>Experience</span>
          <span className="text-ink-faint">./jobs --list</span>
        </div>

        <motion.div
          className="terminal-window"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.5 }}
        >
          <div className="window-titlebar">
            <div className="window-dot bg-accent" />
            <div className="window-dot" />
            <div className="window-dot" />
            <span className="ml-2">./jobs --list -- work history</span>
          </div>

          <div className="text-ink-muted text-xs font-mono px-4 py-2 border-b border-border bg-bg-alt">
            <span className="prompt-prefix">$ </span>
            jobs --format=log --expand
          </div>

          <div>
            {EXPERIENCE.map((entry, i) => (
              <ExperienceRow key={entry.id} entry={entry} index={i} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
