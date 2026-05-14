import { AnimatePresence, motion } from 'motion/react';
import { X } from 'lucide-react';

interface Props {
  show: boolean;
  onClose: () => void;
}

const SHORTCUTS = [
  { key: 'Ctrl K / Cmd K', desc: 'Open command palette' },
  { key: 'G H',            desc: 'Navigate: Home' },
  { key: 'G A',            desc: 'Navigate: About' },
  { key: 'G P',            desc: 'Navigate: Projects' },
  { key: 'G S',            desc: 'Navigate: Skills' },
  { key: 'G C',            desc: 'Navigate: Contact' },
  { key: 'Escape',         desc: 'Close any open overlay' },
  { key: 'Up Up Down Down Left Right Left Right B A', desc: 'Engage chaos mode' },
];

const URL_FLAGS = [
  { flag: '?--help', desc: 'Show this documentation overlay' },
  { flag: '?help',   desc: 'Alias for --help' },
];

export function HelpOverlay({ show, onClose }: Props) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="help"
          className="fixed inset-0 z-[9990] bg-ink/80 backdrop-blur-sm flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="terminal-window w-full max-w-xl max-h-[80vh] overflow-y-auto"
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            onClick={e => e.stopPropagation()}
          >
            <div className="window-titlebar justify-between">
              <div className="flex items-center gap-2">
                <div className="window-dot bg-accent" />
                <span>AD.exe -- help</span>
              </div>
              <button
                onClick={onClose}
                className="hover:text-ink transition-colors"
                aria-label="Close help"
              >
                <X size={14} />
              </button>
            </div>

            <div className="p-5 space-y-6 text-sm">
              <section>
                <div className="text-accent font-bold mb-3 tracking-widest text-xs uppercase">
                  KEYBOARD SHORTCUTS
                </div>
                <table className="w-full">
                  <tbody className="divide-y divide-border">
                    {SHORTCUTS.map(s => (
                      <tr key={s.key} className="py-1.5">
                        <td className="py-1.5 pr-4 text-ink-muted whitespace-nowrap">
                          <kbd className="kbd text-xs">{s.key}</kbd>
                        </td>
                        <td className="py-1.5 text-ink">{s.desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>

              <section>
                <div className="text-accent font-bold mb-3 tracking-widest text-xs uppercase">
                  URL FLAGS
                </div>
                <div className="space-y-1.5">
                  {URL_FLAGS.map(f => (
                    <div key={f.flag} className="flex gap-4">
                      <span className="text-accent font-mono">{f.flag}</span>
                      <span className="text-ink-muted">{f.desc}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <div className="text-accent font-bold mb-3 tracking-widest text-xs uppercase">
                  STACK
                </div>
                <div className="text-ink-muted space-y-1">
                  <div>Vite 6 + React 18 + TypeScript 5</div>
                  <div>Tailwind CSS v3 (custom CSS-var palette)</div>
                  <div>motion/react (respects prefers-reduced-motion)</div>
                  <div>Fraunces (display) + IBM Plex Mono</div>
                  <div>Lucide React for icons</div>
                </div>
              </section>

              <section>
                <div className="text-accent font-bold mb-3 tracking-widest text-xs uppercase">
                  COMPONENT TREE
                </div>
                <pre className="text-ink-muted text-xs leading-relaxed">
{`App
  NavBar          // fixed header, section links
  Hero            // boot sequence, name reveal
  About           // cat about.txt
  Projects        // ps aux process table
  Skills          // interactive neural net SVG
  Contact         // terminal form
  CommandPalette  // ctrl+k fuzzy nav
  StatusWidget    // live fake system vitals
  CrtSweep        // theme-toggle transition
  GlitchOverlay   // konami easter egg
  HelpOverlay     // this overlay`}
                </pre>
              </section>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
