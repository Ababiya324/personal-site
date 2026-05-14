export type ProjectStatus = 'running' | 'active' | 'completed' | 'archived';

export interface Project {
  pid: number;
  name: string;
  status: ProjectStatus;
  lang: string[];
  description: string;
  url?: string;
  startDate: string;
}

export interface SkillNode {
  id: string;
  label: string;
  sublabel?: string;
  layer: number;
  x: number;
  y: number;
}

export interface SkillEdge {
  id: string;
  from: string;
  to: string;
  weight: number;
}

export interface NavSection {
  id: string;
  label: string;
  shortcut: string;
}

export interface CommandItem {
  id: string;
  label: string;
  description?: string;
  shortcut?: string;
  group: 'navigate' | 'actions' | 'links';
  action: () => void;
}
