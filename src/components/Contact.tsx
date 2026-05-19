import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail } from 'lucide-react';

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
      <label htmlFor={id} className="text-ink-muted text-sm pt-1 select-none">
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
    if (!next.subject.value.trim()) {
      next.subject.error = 'subject is required'; ok = false;
    }
    if (!next.message.value.trim()) {
      next.message.error = 'message cannot be empty'; ok = false;
    }
    setFields(next);
    return ok;
  };

  const handleOpen = () => {
    if (!validate()) return;
    const body = `${fields.message.value}\n\n— ${fields.name.value} (${fields.email.value})`;
    const url =
      `https://mail.google.com/mail/?view=cm&fs=1` +
      `&to=ababiyadarge@gmail.com` +
      `&su=${encodeURIComponent(fields.subject.value)}` +
      `&body=${encodeURIComponent(body)}`;
    window.open(url, '_blank');
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
            <span className="ml-2">./contact.sh -- compose email</span>
          </div>

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
              type="button"
              onClick={handleOpen}
              className="flex items-center gap-2 px-5 py-2.5 bg-accent text-bg font-mono text-sm hover:opacity-90 transition-colors"
            >
              <Mail size={13} />
              Open email
            </button>
          </div>
        </motion.div>

        <motion.div
          className="mt-6 text-center text-xs font-mono space-y-1"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-ink select-all">ababiyadarge@gmail.com</div>
          <div className="text-ink-faint">
            Opens in Gmail. If that doesn't work, email me directly at the address above or use the{' '}
            <a
              href="mailto:ababiyadarge@gmail.com"
              className="underline hover:text-ink-muted transition-colors"
            >
              mailto: fallback
            </a>
            .
          </div>
        </motion.div>

        <motion.div
          className="mt-8 text-center text-xs text-ink-faint font-mono"
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
