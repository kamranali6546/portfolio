export interface Service {
  id: number;
  title: string;
  desc: string;
  icon: string;
}

export interface ExperienceItem {
  id: number;
  role: string;
  company: string;
  period: string;
  desc: string;
  align: string;
}

export interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  link?: string;
}

export interface Stat {
  label: string;
  value: number;
}