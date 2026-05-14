import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Send, CheckCircle } from 'lucide-react';

type Phase = 'idle' | 'sending' | 'sent';

interface Field {
  value: string;
  error: string;
}

function TerminalInput({
  label,
  id,
  field,
  onChange,
  type = 'text',
}: {
  label: string;
  id: string;
  field: Field;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <div className="grid grid-cols-[7rem_1fr] sm:grid-cols-[9rem_1fr] items-start gap-2 py-2 border-b border-border last:border-b-0">
      <label
        htmlFor={id}
        className="text-ink-muted text-sm pt-1 select-none"
      >
        [{label}]:
      </label>
      <div>
        <input
          id={id}
          type={type}
          value={field.value}
          onChange={e => onChange(e.target.value)}
          className="w-full bg-bg-panel text-ink text-sm font-mono outline-none border border-border focus:border-accent focus:bg-bg-alt px-2 py-1.5 transition-colors"
          autoComplete="off"
          spellCheck={false}
        />
        {field.error && (
          <p className="text-danger text-xs mt-0.5">{field.error}</p>
        )}
      </div>
    </div>
  );
}

function TerminalTextarea({
  field,
  onChange,
}: {
  field: Field;
  onChange: (v: string) => void;
}) {
  return (
    <div className="py-2">
      <div className="text-ink-muted text-sm mb-1">[message]:</div>
      <textarea
        value={field.value}
        onChange={e => onChange(e.target.value)}
        rows={5}
        className="w-full bg-bg-panel text-ink text-sm font-mono p-3 border border-border outline-none focus:border-accent transition-colors resize-none"
        placeholder="type your message here..."
        spellCheck={false}
      />
      {field.error && (
        <p className="text-danger text-xs mt-0.5">{field.error}</p>
      )}
    </div>
  );
}

export function Contact() {
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState<Phase>('idle');
  const [fields, setFields] = useState({
    name:    { value: '', error: '' },
    email:   { value: '', error: '' },
    subject: { value: '', error: '' },
    message: { value: '', error: '' },
  });

  const set = (key: keyof typeof fields) => (v: string) =>
    setFields(f => ({ ...f, [key]: { value: v, error: '' } }));

  const validate = () => {
    let ok = true;
    const next = { ...fields };
    if (!next.name.value.trim()) {
      next.name.error = 'name is required'; ok = false;
    }
    if (!next.email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(next.email.value)) {
      next.email.error = 'valid email required'; ok = false;
    }
    if (!next.message.value.trim()) {
      next.message.error = 'message cannot be empty'; ok = false;
    }
    setFields(next);
    return ok;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setPhase('sending');
    setTimeout(() => setPhase('sent'), 1200);
  };

  return (
    <section id="contact" className="py-24 px-4 mb-16">
      <div className="max-w-2xl mx-auto">
        <div className="section-rule">
          <span>Contact</span>
          <span className="text-ink-faint">./contact.sh</span>
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
            <span className="ml-2">./contact.sh -- send message</span>
          </div>

          {phase === 'sent' ? (
            <motion.div
              className="p-8 flex flex-col items-center gap-4 text-center"
              initial={{ opacity: 0, scale: reduced ? 1 : 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <CheckCircle size={40} className="text-success" />
              <div className="text-ink font-mono">Message sent successfully.</div>
              <div className="text-ink-muted text-sm">
                I will get back to you at{' '}
                <span className="text-ink">{fields.email.value}</span>.
              </div>
              <button
                onClick={() => {
                  setPhase('idle');
                  setFields(f =>
                    Object.fromEntries(Object.keys(f).map(k => [k, { value: '', error: '' }])) as typeof fields
                  );
                }}
                className="text-xs text-ink-muted hover:text-ink font-mono mt-2 border border-border px-3 py-1.5 hover:border-border-strong transition-colors"
              >
                send another
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div className="p-5 sm:p-6 space-y-1 font-mono">
                <div className="text-ink-muted text-xs mb-4">
                  <span className="prompt-prefix">$ </span>
                  ./contact.sh --to=ababiyadarge@gmail.com
                </div>

                <TerminalInput label="name"    id="name"    field={fields.name}    onChange={set('name')} />
                <TerminalInput label="email"   id="email"   field={fields.email}   onChange={set('email')}   type="email" />
                <TerminalInput label="subject" id="subject" field={fields.subject} onChange={set('subject')} />
                <TerminalTextarea field={fields.message} onChange={set('message')} />
              </div>

              <div className="px-5 sm:px-6 pb-5 flex items-center justify-between">
                <div className="text-ink-muted text-xs">
                  <span className="prompt-prefix">$</span>{' '}
                  <span className="cursor" />
                </div>
                <button
                  type="submit"
                  disabled={phase === 'sending'}
                  className="flex items-center gap-2 px-5 py-2.5 bg-accent text-bg font-mono text-sm hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {phase === 'sending' ? (
                    <>sending...</>
                  ) : (
                    <>
                      <Send size={13} />
                      send_message
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </motion.div>

        {/* Footer */}
        <motion.div
          className="mt-12 text-center text-xs text-ink-faint font-mono space-y-1"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          <div>Ababiya Darge :: Carnegie Mellon University, Qatar :: ML + Systems</div>
        </motion.div>
      </div>
    </section>
  );
}
