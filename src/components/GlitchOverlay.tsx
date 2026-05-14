import { AnimatePresence, motion } from 'motion/react';

interface Props {
  active: boolean;
}

export function GlitchOverlay({ active }: Props) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key="glitch"
          className="fixed inset-0 z-[9998] flex items-center justify-center pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1 }}
        >
          <div
            className="glitch-active text-center font-mono text-accent"
            style={{ textShadow: '2px 0 #4ADE80, -2px 0 #16A34A' }}
          >
            <div className="text-4xl font-bold tracking-widest mb-2">
              !SYSTEM FAULT!
            </div>
            <div className="text-sm text-ink-muted tracking-widest">
              KONAMI PROTOCOL ENGAGED :: CHAOS MODE ACTIVE
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
