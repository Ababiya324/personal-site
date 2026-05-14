import { useTheme }          from './hooks/useTheme';
import { useKonamiCode }    from './hooks/useKonamiCode';
import { useCommandPalette } from './hooks/useCommandPalette';
import { useHelpFlag }       from './hooks/useHelpFlag';
import { useSectionNav }     from './hooks/useSectionNav';

import { NavBar }           from './components/NavBar';
import { Hero }             from './components/Hero';
import { About }            from './components/About';
import { Projects }         from './components/Projects';
import { Skills }           from './components/Skills';
import { Contact }          from './components/Contact';
import { CommandPalette }   from './components/CommandPalette';
import { StatusWidget }     from './components/StatusWidget';
import { CrtSweep }         from './components/CrtSweep';
import { GlitchOverlay }    from './components/GlitchOverlay';
import { HelpOverlay }      from './components/HelpOverlay';

export default function App() {
  const { theme, toggle: toggleTheme, isSweeping } = useTheme();
  const { open: palOpen, setOpen: setPalOpen }      = useCommandPalette();
  const { show: helpShow, setShow: setHelpShow }    = useHelpFlag();
  const konamiActive                                 = useKonamiCode();

  useSectionNav();

  return (
    <div className="min-h-screen bg-bg text-ink font-mono">
      {/* CRT sweep transition overlay */}
      {isSweeping && <CrtSweep />}

      {/* Konami code glitch easter egg */}
      <GlitchOverlay active={konamiActive} />

      {/* --help URL flag overlay */}
      <HelpOverlay
        show={helpShow}
        onClose={() => setHelpShow(false)}
      />

      {/* Command palette */}
      <CommandPalette
        open={palOpen}
        theme={theme}
        onClose={() => setPalOpen(false)}
        onToggleTheme={toggleTheme}
        onOpenHelp={() => { setHelpShow(true); setPalOpen(false); }}
      />

      {/* Fixed navigation */}
      <NavBar
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenPalette={() => setPalOpen(true)}
        onOpenHelp={() => setHelpShow(true)}
      />

      {/* Live system status widget */}
      <StatusWidget />

      {/* Page content */}
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>
    </div>
  );
}
