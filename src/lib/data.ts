import type { Project, SkillNode, SkillEdge, NavSection } from '../types';

export const BOOT_LINES: Array<{ text: string; delay: number; type?: 'ok' | 'warn' | 'plain' }> = [
  { text: 'NeXTSTEP/CMQ  Release 0.1.0  (POSIX_EXTENDED)', delay: 0, type: 'plain' },
  { text: 'Copyright (c) 1985-2025, Carnegie Mellon Neural Systems Lab.', delay: 80, type: 'plain' },
  { text: '', delay: 140 },
  { text: 'cpu0: 4.2GHz Core i9-14900K, 32 logical CPUs', delay: 220, type: 'plain' },
  { text: 'phys mem = 34359738368 (32768 MB)', delay: 280, type: 'plain' },
  { text: 'avail mem = 33285996544 (31744 MB)', delay: 340, type: 'plain' },
  { text: '', delay: 400 },
  { text: '/dev/disk0s1: mounted root filesystem                      [ OK ]', delay: 500, type: 'ok' },
  { text: 'Starting TCP/IP...                                         [ OK ]', delay: 680, type: 'ok' },
  { text: 'Loading ML subsystem...                                    [ OK ]', delay: 860, type: 'ok' },
  { text: 'Initializing neural scheduler...                           [ OK ]', delay: 1020, type: 'ok' },
  { text: 'Connecting to research cluster...              [WARN] timeout, using local', delay: 1180, type: 'warn' },
  { text: 'Starting portfolio daemon...                               [ OK ]', delay: 1360, type: 'ok' },
  { text: '', delay: 1440 },
  { text: 'init: user mode started, pid 1', delay: 1500, type: 'plain' },
];

export const PROJECTS: Project[] = [
  {
    pid: 1337,
    name: 'neural-portfolio',
    status: 'running',
    lang: ['TypeScript', 'React', 'Tailwind'],
    description: 'This site — OS-inspired portfolio with boot sequence, process table, and interactive neural net skills graph.',
    url: 'https://personal-site-4qas5nw6m-ababiyadarge-1560s-projects.vercel.app',
    startDate: '2025-01',
  },
  {
    pid: 1125,
    name: 'thonny112',
    status: 'completed',
    lang: ['Python', 'CMU Graphics'],
    description: 'Full Python IDE built as a 15-112 term project: syntax highlighting, Trie-based autocomplete, multi-tab editing, and integrated code execution. 1,000+ lines.',
    url: 'https://github.com/Ababiya324/thonny112',
    startDate: '2025-11',
  },
  {
    pid: 2048,
    name: 'ethio-matric',
    status: 'running',
    lang: ['JavaScript', 'Firebase'],
    description: 'Educational platform with Math & Physics sections containing 10+ years of Ethiopian national exam solutions. Reached 100,000+ downloads.',
    startDate: '2024-05',
  },
  {
    pid: 4208,
    name: 'fayda-digital-id',
    status: 'completed',
    lang: ['Python', 'SQL'],
    description: 'Interned at Fayda Digital ID (Ethiopia): built a digital ID system using Python, RFID encoders, and an encrypted database with an online verification portal.',
    startDate: '2024-08',
  },
  {
    pid: 3923,
    name: 'exam-platform',
    status: 'completed',
    lang: ['JavaScript', 'SQL'],
    description: 'Co-developed secure automated grading platform for 1,500+ students. Recognized by the regional education bureau and deployed across 5 schools.',
    startDate: '2023-09',
  },
  {
    pid: 2718,
    name: 'computer-refurb',
    status: 'archived',
    lang: ['Hardware'],
    description: 'Restored and donated 150+ computers to underprivileged schools across Ethiopia. Also repaired 200+ devices in the Tigray region and taught digital literacy.',
    startDate: '2023-08',
  },
];

const VB_W = 820;
const VB_H = 500;
const LX   = [80, 270, 500, 720];

const yFor = (count: number, index: number): number => {
  const top    = 50;
  const bottom = 440;
  const span   = bottom - top;
  const step   = span / (count - 1 || 1);
  const offset = count === 1 ? (VB_H / 2) : top;
  return offset + index * step;
};

export const SKILL_NODES: SkillNode[] = [
  { id: 'python',      label: 'Python',       layer: 0, x: LX[0], y: yFor(4, 0) },
  { id: 'math',        label: 'Mathematics',  layer: 0, x: LX[0], y: yFor(4, 1) },
  { id: 'algorithms',  label: 'Algorithms',   layer: 0, x: LX[0], y: yFor(4, 2) },
  { id: 'html-css',    label: 'HTML',         sublabel: '/ CSS',    layer: 0, x: LX[0], y: yFor(4, 3) },

  { id: 'javascript',  label: 'JavaScript',   layer: 1, x: LX[1], y: yFor(4, 0) },
  { id: 'sql',         label: 'SQL',          layer: 1, x: LX[1], y: yFor(4, 1) },
  { id: 'java',        label: 'Java',         layer: 1, x: LX[1], y: yFor(4, 2) },
  { id: 'systems',     label: 'Systems',      sublabel: 'Thinking', layer: 1, x: LX[1], y: yFor(4, 3) },

  { id: 'react',       label: 'React.js',     layer: 2, x: LX[2], y: yFor(4, 0) },
  { id: 'firebase',    label: 'Firebase',     layer: 2, x: LX[2], y: yFor(4, 1) },
  { id: 'springboot',  label: 'Spring Boot',  layer: 2, x: LX[2], y: yFor(4, 2) },
  { id: 'ml',          label: 'Machine',      sublabel: 'Learning', layer: 2, x: LX[2], y: yFor(4, 3) },

  { id: 'webapps',     label: 'Web Apps',     layer: 3, x: LX[3], y: yFor(3, 0) },
  { id: 'mobile',      label: 'Mobile',       sublabel: 'Apps',     layer: 3, x: LX[3], y: yFor(3, 1) },
  { id: 'research',    label: 'Research',     layer: 3, x: LX[3], y: yFor(3, 2) },
];

export const SKILL_EDGES: SkillEdge[] = [
  { id: 'e01', from: 'python',     to: 'javascript',  weight: 0.6 },
  { id: 'e02', from: 'python',     to: 'ml',          weight: 0.9 },
  { id: 'e03', from: 'python',     to: 'systems',     weight: 0.7 },
  { id: 'e04', from: 'math',       to: 'ml',          weight: 0.95 },
  { id: 'e05', from: 'math',       to: 'algorithms',  weight: 0.8 },
  { id: 'e06', from: 'algorithms', to: 'systems',     weight: 0.9 },
  { id: 'e07', from: 'algorithms', to: 'java',        weight: 0.7 },
  { id: 'e08', from: 'algorithms', to: 'sql',         weight: 0.55 },
  { id: 'e09', from: 'html-css',   to: 'javascript',  weight: 0.95 },

  { id: 'e10', from: 'javascript', to: 'react',       weight: 0.95 },
  { id: 'e11', from: 'javascript', to: 'firebase',    weight: 0.7 },
  { id: 'e12', from: 'sql',        to: 'firebase',    weight: 0.6 },
  { id: 'e13', from: 'sql',        to: 'springboot',  weight: 0.7 },
  { id: 'e14', from: 'java',       to: 'springboot',  weight: 0.95 },
  { id: 'e15', from: 'systems',    to: 'springboot',  weight: 0.6 },
  { id: 'e16', from: 'systems',    to: 'ml',          weight: 0.65 },

  { id: 'e17', from: 'react',      to: 'webapps',     weight: 0.95 },
  { id: 'e18', from: 'react',      to: 'mobile',      weight: 0.6 },
  { id: 'e19', from: 'firebase',   to: 'webapps',     weight: 0.8 },
  { id: 'e20', from: 'firebase',   to: 'mobile',      weight: 0.9 },
  { id: 'e21', from: 'springboot', to: 'webapps',     weight: 0.85 },
  { id: 'e22', from: 'ml',         to: 'research',    weight: 0.9 },
  { id: 'e23', from: 'ml',         to: 'mobile',      weight: 0.55 },
  { id: 'e24', from: 'systems',    to: 'research',    weight: 0.7 },
];

export const NAV_SECTIONS: NavSection[] = [
  { id: 'hero',     label: 'Home',     shortcut: 'G H' },
  { id: 'about',    label: 'About',    shortcut: 'G A' },
  { id: 'projects', label: 'Projects', shortcut: 'G P' },
  { id: 'skills',   label: 'Skills',   shortcut: 'G S' },
  { id: 'contact',  label: 'Contact',  shortcut: 'G C' },
];

export const BUILD_HASH = 'a4f2c91';
export const BOOT_EPOCH = Date.now() - (73 * 86400 + 14 * 3600 + 33 * 60 + 12) * 1000;
export const VB_DIMS = { w: VB_W, h: VB_H };
