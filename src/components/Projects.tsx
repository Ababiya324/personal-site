import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { ExternalLink, ChevronDown, Circle } from 'lucide-react';
import { PROJECTS } from '../lib/data';
import type { Project, ProjectStatus } from '../types';

const STATUS_CONFIG: Record<ProjectStatus, { label: string; className: string; dot: string }> = {
  running:   { label: 'RUNNING',   className: 'text-success border-success',       dot: 'bg-success' },
  active:    { label: 'ACTIVE',    className: 'text-accent border-accent',          dot: 'bg-accent'  },
  completed: { label: 'COMPLETED', className: 'text-ink-muted border-border',       dot: 'bg-ink-muted' },
  archived:  { label: 'ARCHIVED',  className: 'text-ink-faint border-border opacity-60', dot: 'bg-ink-faint' },
};

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const reduced = useReducedMotion();
  const cfg = STATUS_CONFIG[project.status];

  return (
    <motion.div
      initial={{ opacity: 0, y: reduced ? 0 : 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
    >
      <button
        onClick={() => setExpanded(e => !e)}
        className="w-full text-left border-b border-border hover:bg-bg-alt transition-colors group"
        aria-expanded={expanded}
      >
        <div className="grid grid-cols-[auto_1fr_auto] sm:grid-cols-[4rem_1fr_auto_auto] gap-x-4 gap-y-1 px-4 py-3 items-center">
          {/* PID - hidden on mobile */}
          <div className="hidden sm:block text-ink-faint text-xs tabular-nums">
            {project.pid}
          </div>

          {/* Name */}
          <div className="flex items-center gap-2 min-w-0">
            <span
              className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${cfg.dot}`}
            />
            <span className="font-mono text-sm text-ink font-medium truncate">
              {project.name}
            </span>
          </div>

          {/* Status + expand icon */}
          <div className="flex items-center gap-2">
            <span className={`status-badge ${cfg.className} hidden sm:inline-flex`}>
              {cfg.label}
            </span>
            <ChevronDown
              size={14}
              className={`text-ink-muted transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
            />
          </div>

          {/* Lang tags - hidden on smallest */}
          <div className="hidden sm:flex flex-wrap gap-1 justify-end">
            {project.lang.map(l => (
              <span
                key={l}
                className="text-xs px-1.5 py-0.5 border border-border text-ink-muted font-mono"
              >
                {l}
              </span>
            ))}
          </div>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="expand"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <div className="px-4 sm:px-8 py-4 bg-bg-panel border-b border-border space-y-3">
              <p className="text-sm text-ink-muted leading-relaxed">
                {project.description}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs text-ink-faint">
                <span>Started {project.startDate}</span>
                <div className="flex flex-wrap gap-1">
                  {project.lang.map(l => (
                    <span key={l} className="text-xs px-1.5 py-0.5 border border-border text-ink-muted font-mono sm:hidden">
                      {l}
                    </span>
                  ))}
                </div>
                <span className={`status-badge ${cfg.className} sm:hidden`}>{cfg.label}</span>
              </div>
              {project.url && project.url !== '#' && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-accent hover:underline font-mono"
                >
                  <ExternalLink size={12} />
                  View project
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function Projects() {
  return (
    <section id="projects" className="py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="section-rule">
          <span>Projects</span>
          <span className="text-ink-faint">ps aux</span>
        </div>

        <motion.div
          className="terminal-window"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="window-titlebar justify-between">
            <div className="flex items-center gap-2">
              <div className="window-dot bg-accent" />
              <div className="window-dot" />
              <div className="window-dot" />
              <span className="ml-2">ps aux -- process list</span>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1">
                <Circle size={6} className="fill-success text-success" />
                {PROJECTS.filter(p => p.status === 'running' || p.status === 'active').length} running
              </span>
            </div>
          </div>

          {/* Table headers - desktop */}
          <div className="hidden sm:grid grid-cols-[4rem_1fr_auto_auto] gap-x-4 px-4 py-2 border-b border-border text-xs text-ink-faint tracking-widest uppercase bg-bg-panel">
            <span>PID</span>
            <span>PROCESS</span>
            <span>STATUS</span>
            <span className="text-right">LANG</span>
          </div>

          {/* Rows */}
          <div>
            {PROJECTS.map((project, i) => (
              <ProjectRow key={project.pid} project={project} index={i} />
            ))}
          </div>

          <div className="px-4 py-3 border-t border-border text-xs text-ink-faint font-mono">
            <span className="prompt-prefix">$ </span>
            {PROJECTS.length} processes listed
            <span className="cursor ml-1" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
