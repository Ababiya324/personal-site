/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg:           'var(--color-bg)',
        'bg-alt':     'var(--color-bg-alt)',
        'bg-panel':   'var(--color-bg-panel)',
        ink:          'var(--color-ink)',
        'ink-muted':  'var(--color-ink-muted)',
        'ink-faint':  'var(--color-ink-faint)',
        accent:       'var(--color-accent)',
        'accent-dim': 'var(--color-accent-dim)',
        border:       'var(--color-border)',
        'border-strong': 'var(--color-border-strong)',
        success:      'var(--color-success)',
        warn:         'var(--color-warn)',
        danger:       'var(--color-danger)',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        mono:    ['"IBM Plex Mono"', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      screens: {
        xs: '360px',
      },
    },
  },
  plugins: [],
}
