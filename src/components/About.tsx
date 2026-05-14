import { type ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface LineProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

function Line({ children, delay = 0, className = '' }: LineProps) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, y: reduced ? 0 : 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function About() {
  return (
    <section id="about" className="py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="section-rule">
          <span>About</span>
          <span className="text-ink-faint">cat about.txt</span>
        </div>

        <motion.div
          className="terminal-window"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="window-titlebar">
            <div className="window-dot bg-accent" />
            <div className="window-dot" />
            <div className="window-dot" />
            <span className="ml-2">about.txt</span>
          </div>

          <div className="p-5 sm:p-8 space-y-5 text-sm font-mono">
            {/* whoami */}
            <Line delay={0.05}>
              <span className="prompt-prefix">$ </span>
              <span className="text-ink-muted">whoami</span>
            </Line>

            {/* Identity block */}
            <div className="pl-2 sm:pl-4 space-y-1 text-ink-muted">
              {[
                ['NAME',        'Ababiya Darge'],
                ['LOCATION',    'Doha, Qatar'],
                ['INSTITUTION', 'Carnegie Mellon University, Qatar Campus'],
                ['DEGREE',      'B.S. Computer Science'],
                ['FOCUS',       'Machine Learning + Systems'],
              ].map(([key, val], i) => (
                <Line key={key} delay={0.1 + i * 0.05}>
                  <span className="text-ink-faint mr-2">{key.padEnd(12)}</span>
                  <span className="text-ink">{val}</span>
                </Line>
              ))}
            </div>

            {/* Divider */}
            <Line delay={0.38}>
              <div className="border-t border-border my-2" />
            </Line>

            {/* cat command */}
            <Line delay={0.42}>
              <span className="prompt-prefix">$ </span>
              <span className="text-ink-muted">cat about.txt</span>
            </Line>

            {/* About text */}
            <div className="pl-2 sm:pl-4 space-y-3 text-ink leading-relaxed">
              <Line delay={0.50}>
                CS freshman at Carnegie Mellon Qatar, concentrating in ML and Systems.
                Before CMU I built apps used by 100,000+ people, interned at a national
                digital-ID agency, and graduated valedictorian with a 99.67 GPA and a
                574/600 on the Ethiopian National Exam — top 0.01%, #1 in Physics among
                580,000 candidates.
              </Line>
              <Line delay={0.58}>
                I care about software that ships and reaches real people. Most of my projects
                solve problems I watched communities face firsthand — exam access, digital
                literacy, civic infrastructure — built with whatever stack gets the job done.
              </Line>
            </div>

            {/* Divider */}
            <Line delay={0.66}>
              <div className="border-t border-border my-2" />
            </Line>

            {/* Currently */}
            <Line delay={0.70}>
              <span className="prompt-prefix">$ </span>
              <span className="text-ink-muted">cat CURRENTLY</span>
            </Line>

            <div className="pl-2 sm:pl-4 space-y-1.5 text-ink-muted">
              {[
                ['COURSEWORK', 'Fundamentals of Programming, Differentiation & Integration, Intro to CS Concepts'],
                ['INTERNED',   'Fayda Digital ID — Python, RFID, encrypted databases (Aug 2024)'],
                ['AWARD',      '2nd Place Ethiopian National Math Olympiad · ALX Hackathon 3rd Place'],
                ['BUILDING',   'Tools that solve real problems for real communities'],
              ].map(([key, val], i) => (
                <Line key={key} delay={0.75 + i * 0.05}>
                  <span className="text-ink-faint">[{key}]</span>
                  <span className="ml-2 text-ink">{val}</span>
                </Line>
              ))}
            </div>

            {/* Prompt */}
            <Line delay={0.98}>
              <div className="pt-2">
                <span className="prompt-prefix">$ </span>
                <span className="cursor" />
              </div>
            </Line>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
