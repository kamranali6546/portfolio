export type ProjectCategory = 'all' | 'frontend_arch' | 'react_nextjs' | 'ai_augmented' | 'design_systems';

export type ProjectCategoryKey = 'frontend_arch' | 'react_nextjs' | 'ai_augmented' | 'design_systems';

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: ProjectCategoryKey;
  tags: string[];
  metrics: ProjectMetric[];
  architectureHighlights: string[];
  githubUrl?: string;
  liveUrl?: string;
  image?: string;
  featured?: boolean;
  interactiveDemoType?: 'ai_query' | 'latency_sim' | 'code_diff' | 'component_preview' | 'lighthouse_score';
  codeSnippet?: string;
}

export interface SkillItem {
  name: string;
  category: 
    | 'Core Languages & Frameworks' 
    | 'Frontend Architecture & State' 
    | 'UI Systems, Styling & Motion' 
    | 'AI & LLM Integration' 
    | 'Performance, Testing & Tooling';
  level: number; // 0 - 100
  years: number;
  featured: boolean;
  iconName?: string;
  description: string;
  tags: string[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  description: string;
  achievements: string[];
  techStack: string[];
  badge?: string;
}

export interface EducationItem {
  degree: string;
  year: string;
  institution: string;
}

export interface LeadershipItem {
  title: string;
  desc: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  avatarUrl?: string;
  quote: string;
  relation: string;
}

export interface PortfolioProfile {
  name: string;
  title: string;
  subtitle: string;
  headline: string;
  email: string;
  phone: string;
  location: string;
  relocationStatus: string;
  availability: 'Available for full-time & consulting' | 'Open to high-impact roles' | 'Senior / Lead Frontend roles';
  yearsExperience: number;
  github: string;
  linkedin: string;
  twitter: string;
  discord: string;
  bio: string[];
  stats: { label: string; value: string; desc: string }[];
  education: EducationItem[];
  leadership: LeadershipItem[];
  languages: { name: string; level: string }[];
}

export interface TerminalLog {
  id: string;
  type: 'input' | 'output' | 'error' | 'system';
  content: string;
}

export type ThemeMode = 'dark' | 'light';

export type ActiveTheme = 'cyber-dark' | 'obsidian' | 'midnight-indigo' | 'slate-minimal' | 'light-crystal';
