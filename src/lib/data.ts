import type { Project, SkillNode, SkillEdge, NavSection, Experience } from '../types';

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

export const EXPERIENCE: Experience[] = [
  {
    id: 'eclipse',
    company: 'Eclipse Foundation',
    role: 'Committer Support',
    period: '2024 – 2025',
    bullets: [
      'Provided support for the Eclipse Foundation, the largest open-source organisation in Europe.',
    ],
    tags: ['Open Source', 'Java', 'Community'],
  },
  {
    id: 'nanmo-ai',
    company: 'NANMO',
    role: 'AI / Content Engineer Intern',
    period: '2024 – 2025',
    bullets: [
      'Built the content parsing pipeline that structures uploaded PDFs and videos into Nanmo\'s course format.',
      'Integrated a translation API to generate course content in Hindi, Urdu, and Tagalog.',
      'Implemented logic to auto-generate multiple-choice questions from parsed course content.',
    ],
    tags: ['Python', 'NLP', 'Translation API', 'LLM'],
  },
  {
    id: 'nanmo-be',
    company: 'NANMO',
    role: 'Backend Developer Intern',
    period: '2024 – 2025',
    bullets: [
      'Designed and managed the database schema for users, courses, enrollments, progress, certifications, and XP.',
      'Set up authentication and role-based access control (RBAC) for all three account types.',
      'Built and maintained the API layer and file storage for uploaded videos and PDFs.',
    ],
    tags: ['Node.js', 'SQL', 'REST API', 'RBAC'],
  },
  {
    id: 'nanmo-swe',
    company: 'NANMO',
    role: 'Software Engineer Intern',
    period: '2024',
    bullets: [
      'Created a translation pipeline to localise course content across multiple languages.',
    ],
    tags: ['Python', 'Pipeline'],
  },
  {
    id: 'fayda',
    company: 'Fayda Digital ID',
    role: 'Technical Intern',
    period: 'Aug 2024 · Ethiopia',
    bullets: [
      'Developed a digital ID system using Python, RFID encoders, and encrypted databases with an online verification portal serving staff and students.',
    ],
    tags: ['Python', 'RFID', 'Databases', 'GovTech'],
  },
  {
    id: 'hp-forage',
    company: 'HP (Forage)',
    role: 'Software Engineering Virtual Intern',
    period: 'Virtual',
    bullets: [
      'Developed a web server application in Java Spring Boot with HTTP request handling and JSON data upload support.',
      'Implemented unit tests to validate application performance.',
    ],
    tags: ['Java', 'Spring Boot', 'REST API', 'Unit Testing'],
  },
  {
    id: 'tigray-repair',
    company: 'Repairing Initiative – Tigray Region',
    role: 'Volunteer',
    period: 'Ethiopia',
    bullets: [
      'Repaired 200+ devices in a war-torn region, taught digital literacy to students, and created troubleshooting documentation.',
    ],
    tags: ['Hardware', 'Community', 'Digital Literacy'],
  },
];

export const PROJECTS: Project[] = [
  {
    pid: 1337,
    name: 'neural-portfolio',
    status: 'running',
    lang: ['TypeScript', 'React'],
    description: 'This site — OS-inspired portfolio with boot sequence, process table, and interactive neural net skills graph.',
    startDate: '2025-01',
  },
  {
    pid: 4669,
    name: 'kova-interp',
    status: 'active',
    lang: ['C'],
    description: 'Tree-walking interpreter for Kova, a custom programming language. Hand-written lexer, recursive-descent parser, and evaluator in C — ongoing.',
    startDate: '2025-10',
  },
  {
    pid: 6174,
    name: 'currency-pred',
    status: 'active',
    lang: ['Python'],
    description: 'ML model for currency exchange rate prediction; experiments with time-series regression and feature engineering on historical FX data.',
    url: 'https://github.com/Ababiya324/Currency-prediction-model',
    startDate: '2025-06',
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
    pid: 2408,
    name: 'ethio-matric',
    status: 'completed',
    lang: ['JavaScript', 'Firebase'],
    description: 'Educational platform covering Math & Physics with 10+ years of Ethiopian national exam solutions. Reached 100,000+ downloads.',
    startDate: '2024-05',
  },
  {
    pid: 3923,
    name: 'exam-platform',
    status: 'completed',
    lang: ['JavaScript', 'SQL'],
    description: 'Secure online exam system with automated grading for 1,500+ students. Recognized by the regional education bureau; scaled to 5 schools.',
    startDate: '2023-09',
  },
  {
    pid: 8080,
    name: 'portfolio-v1',
    status: 'completed',
    lang: ['HTML', 'CSS', 'JavaScript'],
    description: 'First-generation personal portfolio — responsive static site built from scratch with vanilla HTML, CSS, and JS.',
    url: 'https://web2.qatar.cmu.edu/~adarge',
    startDate: '2025-08',
  },
  {
    pid: 2308,
    name: 'computer-refurb',
    status: 'archived',
    lang: ['Hardware'],
    description: 'Restored and donated 150+ computers to under-resourced schools across Ethiopia.',
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
  { id: 'lin-alg',    label: 'Lin. Algebra',  layer: 0, x: LX[0], y: yFor(4, 0) },
  { id: 'calculus',   label: 'Calculus',       layer: 0, x: LX[0], y: yFor(4, 1) },
  { id: 'stats',      label: 'Statistics',     layer: 0, x: LX[0], y: yFor(4, 2) },
  { id: 'algorithms', label: 'Algorithms',     layer: 0, x: LX[0], y: yFor(4, 3) },

  { id: 'systems',    label: 'Systems',        sublabel: 'Programming', layer: 1, x: LX[1], y: yFor(4, 0) },
  { id: 'theory',     label: 'Computation',    sublabel: 'Theory',      layer: 1, x: LX[1], y: yFor(4, 1) },
  { id: 'networks',   label: 'Networks',       layer: 1, x: LX[1], y: yFor(4, 2) },
  { id: 'ml-math',    label: 'Prob. Theory',   layer: 1, x: LX[1], y: yFor(4, 3) },

  { id: 'ml',         label: 'Machine',        sublabel: 'Learning',    layer: 2, x: LX[2], y: yFor(4, 0) },
  { id: 'os',         label: 'OS Internals',   layer: 2, x: LX[2], y: yFor(4, 1) },
  { id: 'dist',       label: 'Distributed',    sublabel: 'Systems',     layer: 2, x: LX[2], y: yFor(4, 2) },
  { id: 'security',   label: 'Security',       layer: 2, x: LX[2], y: yFor(4, 3) },

  { id: 'research',   label: 'Research',       layer: 3, x: LX[3], y: yFor(3, 0) },
  { id: 'engineering',label: 'Engineering',    layer: 3, x: LX[3], y: yFor(3, 1) },
  { id: 'sys-design', label: 'Systems',        sublabel: 'Design',      layer: 3, x: LX[3], y: yFor(3, 2) },
];

export const SKILL_EDGES: SkillEdge[] = [
  { id: 'e01', from: 'lin-alg',    to: 'systems',     weight: 0.6 },
  { id: 'e02', from: 'lin-alg',    to: 'ml-math',     weight: 0.9 },
  { id: 'e03', from: 'calculus',   to: 'ml-math',     weight: 0.9 },
  { id: 'e04', from: 'calculus',   to: 'theory',      weight: 0.55 },
  { id: 'e05', from: 'stats',      to: 'ml-math',     weight: 0.9 },
  { id: 'e06', from: 'stats',      to: 'networks',    weight: 0.5 },
  { id: 'e07', from: 'algorithms', to: 'systems',     weight: 0.9 },
  { id: 'e08', from: 'algorithms', to: 'theory',      weight: 0.85 },
  { id: 'e09', from: 'algorithms', to: 'networks',    weight: 0.65 },

  { id: 'e10', from: 'systems',    to: 'ml',          weight: 0.6 },
  { id: 'e11', from: 'systems',    to: 'os',          weight: 0.95 },
  { id: 'e12', from: 'systems',    to: 'dist',        weight: 0.8 },
  { id: 'e13', from: 'theory',     to: 'ml',          weight: 0.7 },
  { id: 'e14', from: 'theory',     to: 'security',    weight: 0.6 },
  { id: 'e15', from: 'networks',   to: 'dist',        weight: 0.9 },
  { id: 'e16', from: 'networks',   to: 'security',    weight: 0.7 },
  { id: 'e17', from: 'ml-math',    to: 'ml',          weight: 0.95 },

  { id: 'e18', from: 'ml',         to: 'research',    weight: 0.9 },
  { id: 'e19', from: 'ml',         to: 'engineering', weight: 0.75 },
  { id: 'e20', from: 'os',         to: 'engineering', weight: 0.9 },
  { id: 'e21', from: 'os',         to: 'sys-design',  weight: 0.8 },
  { id: 'e22', from: 'dist',       to: 'engineering', weight: 0.8 },
  { id: 'e23', from: 'dist',       to: 'sys-design',  weight: 0.7 },
  { id: 'e24', from: 'security',   to: 'research',    weight: 0.7 },
  { id: 'e25', from: 'security',   to: 'engineering', weight: 0.55 },
];

export const NAV_SECTIONS: NavSection[] = [
  { id: 'hero',       label: 'Home',       shortcut: 'G H' },
  { id: 'about',      label: 'About',      shortcut: 'G A' },
  { id: 'experience', label: 'Experience', shortcut: 'G E' },
  { id: 'projects',   label: 'Projects',   shortcut: 'G P' },
  { id: 'skills',     label: 'Skills',     shortcut: 'G S' },
  { id: 'contact',    label: 'Contact',    shortcut: 'G C' },
];

export const BUILD_HASH = 'a4f2c91';
export const BOOT_EPOCH = Date.now() - (73 * 86400 + 14 * 3600 + 33 * 60 + 12) * 1000;
export const VB_DIMS = { w: VB_W, h: VB_H };
