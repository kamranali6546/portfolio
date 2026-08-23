import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  PortfolioProfile, 
  ProjectItem, 
  SkillItem, 
  ExperienceItem, 
  TestimonialItem,
  ActiveTheme,
  ThemeMode 
} from '../types/portfolio';
import { 
  initialProfile, 
  initialProjects, 
  initialSkills, 
  initialExperience, 
  initialTestimonials 
} from '../data/portfolioData';
import { sound } from '../utils/audio';

interface ToastMessage {
  id: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
}

interface PortfolioContextType {
  profile: PortfolioProfile;
  setProfile: React.Dispatch<React.SetStateAction<PortfolioProfile>>;
  updateProfile: (updates: Partial<PortfolioProfile>) => void;
  
  projects: ProjectItem[];
  setProjects: React.Dispatch<React.SetStateAction<ProjectItem[]>>;
  addProject: (proj: ProjectItem) => void;
  updateProject: (id: string, updates: Partial<ProjectItem>) => void;
  deleteProject: (id: string) => void;

  skills: SkillItem[];
  setSkills: React.Dispatch<React.SetStateAction<SkillItem[]>>;
  
  experience: ExperienceItem[];
  testimonials: TestimonialItem[];

  theme: ActiveTheme;
  setTheme: (theme: ActiveTheme) => void;

  themeMode: ThemeMode;
  isDarkMode: boolean;
  toggleThemeMode: () => void;
  setThemeMode: (mode: ThemeMode) => void;

  isAudioMuted: boolean;
  toggleAudioMute: () => void;

  activeSection: string;
  setActiveSection: (sec: string) => void;

  selectedProject: ProjectItem | null;
  setSelectedProject: (proj: ProjectItem | null) => void;

  isCustomizerOpen: boolean;
  setIsCustomizerOpen: (open: boolean) => void;

  isResumeOpen: boolean;
  setIsResumeOpen: (open: boolean) => void;

  isAiChatOpen: boolean;
  setIsAiChatOpen: (open: boolean) => void;

  toasts: ToastMessage[];
  showToast: (message: string, type?: ToastMessage['type']) => void;
  removeToast: (id: string) => void;

  resetToDefault: () => void;
  exportPortfolioJson: () => string;
  importPortfolioJson: (json: string) => boolean;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'kamran_portfolio_state_v2';
const THEME_MODE_KEY = 'kamran_portfolio_theme_mode';

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<PortfolioProfile>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY + '_profile') || localStorage.getItem('kamran_portfolio_state_v1_profile');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Ensure location, title, and social links are cleanly updated and remove any legacy references
        const location = (!parsed.location || parsed.location.includes('San Francisco') || parsed.location.includes('Remote'))
          ? initialProfile.location
          : parsed.location;
        const title = (!parsed.title || parsed.title.toLowerCase().includes('fullstack') || parsed.title.toLowerCase().includes('full stack'))
          ? initialProfile.title
          : parsed.title;
        const subtitle = (!parsed.subtitle || parsed.subtitle.toLowerCase().includes('fullstack') || parsed.subtitle.toLowerCase().includes('full stack'))
          ? initialProfile.subtitle
          : parsed.subtitle;
        const linkedin = (!parsed.linkedin || parsed.linkedin === 'https://linkedin.com/in/kamranali') 
          ? initialProfile.linkedin 
          : parsed.linkedin;
        const github = (!parsed.github)
          ? initialProfile.github
          : parsed.github;

        return {
          ...initialProfile,
          ...parsed,
          title,
          subtitle,
          location,
          linkedin,
          github,
          bio: Array.isArray(parsed?.bio) ? parsed.bio : initialProfile.bio,
          stats: Array.isArray(parsed?.stats) ? parsed.stats : initialProfile.stats,
          education: Array.isArray(parsed?.education) ? parsed.education : initialProfile.education,
          leadership: Array.isArray(parsed?.leadership) ? parsed.leadership : initialProfile.leadership,
          languages: Array.isArray(parsed?.languages) ? parsed.languages : initialProfile.languages,
        };
      }
      return initialProfile;
    } catch {
      return initialProfile;
    }
  });

  const [projects, setProjects] = useState<ProjectItem[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY + '_projects');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0 && parsed.some(p => p.id === 'comfy-car-rental' || p.id === 'movers-reports')) {
          return parsed.map(p => ({
            ...p,
            metrics: Array.isArray(p?.metrics) ? p.metrics : [],
            architectureHighlights: Array.isArray(p?.architectureHighlights) ? p.architectureHighlights : [],
            tags: Array.isArray(p?.tags) ? p.tags : []
          }));
        }
      }
      return initialProjects;
    } catch {
      return initialProjects;
    }
  });

  const [skills, setSkills] = useState<SkillItem[]>(initialSkills);
  const [experience] = useState<ExperienceItem[]>(initialExperience);
  const [testimonials] = useState<TestimonialItem[]>(initialTestimonials);

  const [theme, setThemeState] = useState<ActiveTheme>('cyber-dark');
  const [themeMode, setThemeModeState] = useState<ThemeMode>(() => {
    try {
      const saved = localStorage.getItem(THEME_MODE_KEY);
      if (saved === 'light' || saved === 'dark') return saved;
      return 'dark';
    } catch {
      return 'dark';
    }
  });

  const isDarkMode = themeMode === 'dark';

  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('hero');

  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState<boolean>(false);
  const [isResumeOpen, setIsResumeOpen] = useState<boolean>(false);
  const [isAiChatOpen, setIsAiChatOpen] = useState<boolean>(false);

  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Apply root dark/light class and data-theme
  useEffect(() => {
    try {
      const root = document.documentElement;
      if (themeMode === 'dark') {
        root.classList.add('dark');
        root.classList.remove('light');
        root.setAttribute('data-theme', 'dark');
        document.body.style.backgroundColor = '#05070d';
        document.body.style.color = '#f1f5f9';
      } else {
        root.classList.remove('dark');
        root.classList.add('light');
        root.setAttribute('data-theme', 'light');
        document.body.style.backgroundColor = '#f8fafc';
        document.body.style.color = '#0f172a';
      }
      localStorage.setItem(THEME_MODE_KEY, themeMode);
    } catch {
      // Ignore
    }
  }, [themeMode]);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY + '_profile', JSON.stringify(profile));
    } catch {
      // Ignore
    }
  }, [profile]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY + '_projects', JSON.stringify(projects));
    } catch {
      // Ignore
    }
  }, [projects]);

  const showToast = (message: string, type: ToastMessage['type'] = 'info') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
    setToasts(prev => [...prev.slice(-3), { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const updateProfile = (updates: Partial<PortfolioProfile>) => {
    setProfile(prev => ({ ...prev, ...updates }));
    showToast('Profile updated', 'success');
  };

  const addProject = (proj: ProjectItem) => {
    setProjects(prev => [proj, ...prev]);
    showToast(`Added project "${proj.title}"`, 'success');
  };

  const updateProject = (id: string, updates: Partial<ProjectItem>) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
    showToast('Project details updated', 'info');
  };

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
    showToast('Project removed', 'warning');
  };

  const setTheme = (t: ActiveTheme) => {
    setThemeState(t);
    sound.playClick(900);
    showToast(`Theme switched to ${t.replace('-', ' ')}`, 'info');
  };

  const setThemeMode = (mode: ThemeMode) => {
    setThemeModeState(mode);
    sound.playClick(850);
    showToast(`Switched to ${mode === 'dark' ? 'Dark' : 'Light'} Mode`, 'info');
  };

  const toggleThemeMode = () => {
    const nextMode: ThemeMode = themeMode === 'dark' ? 'light' : 'dark';
    setThemeMode(nextMode);
  };

  const toggleAudioMute = () => {
    const muted = sound.toggleMute();
    setIsAudioMuted(muted);
    showToast(muted ? 'Sound muted' : 'Sound enabled', 'info');
  };

  const resetToDefault = () => {
    setProfile(initialProfile);
    setProjects(initialProjects);
    setSkills(initialSkills);
    localStorage.removeItem(LOCAL_STORAGE_KEY + '_profile');
    localStorage.removeItem(LOCAL_STORAGE_KEY + '_projects');
    sound.playSuccess();
    showToast('Restored default portfolio data', 'success');
  };

  const exportPortfolioJson = () => {
    const data = {
      profile,
      projects,
      skills,
      experience,
      testimonials,
      version: '1.0'
    };
    return JSON.stringify(data, null, 2);
  };

  const importPortfolioJson = (json: string): boolean => {
    try {
      const data = JSON.parse(json);
      if (data.profile) {
        setProfile({
          ...initialProfile,
          ...data.profile,
          bio: Array.isArray(data.profile.bio) ? data.profile.bio : initialProfile.bio,
          stats: Array.isArray(data.profile.stats) ? data.profile.stats : initialProfile.stats,
          education: Array.isArray(data.profile.education) ? data.profile.education : initialProfile.education,
          leadership: Array.isArray(data.profile.leadership) ? data.profile.leadership : initialProfile.leadership,
          languages: Array.isArray(data.profile.languages) ? data.profile.languages : initialProfile.languages,
        });
      }
      if (data.projects && Array.isArray(data.projects)) {
        setProjects(data.projects.map((p: any) => ({
          ...p,
          metrics: Array.isArray(p?.metrics) ? p.metrics : [],
          architectureHighlights: Array.isArray(p?.architectureHighlights) ? p.architectureHighlights : [],
          tags: Array.isArray(p?.tags) ? p.tags : []
        })));
      }
      if (data.skills && Array.isArray(data.skills)) setSkills(data.skills);
      sound.playSuccess();
      showToast('Successfully imported portfolio data', 'success');
      return true;
    } catch {
      showToast('Invalid JSON file format', 'error');
      return false;
    }
  };

  return (
    <PortfolioContext.Provider
      value={{
        profile,
        setProfile,
        updateProfile,
        projects,
        setProjects,
        addProject,
        updateProject,
        deleteProject,
        skills,
        setSkills,
        experience,
        testimonials,
        theme,
        setTheme,
        themeMode,
        isDarkMode,
        toggleThemeMode,
        setThemeMode,
        isAudioMuted,
        toggleAudioMute,
        activeSection,
        setActiveSection,
        selectedProject,
        setSelectedProject,
        isCustomizerOpen,
        setIsCustomizerOpen,
        isResumeOpen,
        setIsResumeOpen,
        isAiChatOpen,
        setIsAiChatOpen,
        toasts,
        showToast,
        removeToast,
        resetToDefault,
        exportPortfolioJson,
        importPortfolioJson,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
