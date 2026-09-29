import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { sound } from '../utils/audio';
import { 
  Sparkles, 
  FileText, 
  Terminal, 
  Sliders, 
  Volume2, 
  VolumeX, 
  Menu, 
  X,
  Code2,
  Mail,
  Sun,
  Moon
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    profile, 
    activeSection, 
    setActiveSection, 
    setIsAiChatOpen, 
    setIsResumeOpen, 
    setIsCustomizerOpen,
    isAudioMuted,
    toggleAudioMute,
    themeMode,
    isDarkMode,
    toggleThemeMode,
    theme,
    setTheme
  } = usePortfolio();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'projects', label: 'Projects' },
    { id: 'architecture', label: 'Architecture' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'terminal', label: 'Terminal' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id: string) => {
    sound.playClick(800);
    setActiveSection(id);
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-neutral-950/85 backdrop-blur-md border-b border-neutral-800/80 px-4 lg:px-8 py-3 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand Zone (Single text element contract) */}
        <div 
          onClick={() => handleNavClick('hero')} 
          className="flex items-center gap-3 cursor-pointer group shrink-0"
        >
          <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
            <Code2 className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-tight text-neutral-100 group-hover:text-indigo-300 transition-colors whitespace-nowrap">
              {profile.name}
            </span>
          </div>
        </div>

        {/* Navigation Zone (Desktop 4-6 links) */}
        <nav className="hidden md:flex items-center gap-1 bg-neutral-900/60 p-1 rounded-xl border border-neutral-800/60 text-xs">
          {navLinks.map(link => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-neutral-800 text-neutral-100 font-semibold shadow-sm'
                    : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/40'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Action Zone (1-2 primary actions + quick controls) */}
        <div className="flex items-center gap-2">
          {/* Ask AI Assistant Button */}
          <button
            onClick={() => {
              sound.playClick(900);
              setIsAiChatOpen(true);
            }}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-500 shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="whitespace-nowrap">Ask AI</span>
          </button>

          {/* Resume Viewer */}
          <button
            onClick={() => {
              sound.playClick(750);
              setIsResumeOpen(true);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-neutral-900 border border-neutral-800 text-neutral-200 hover:bg-neutral-800 hover:text-neutral-100 transition-colors cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 text-indigo-400" />
            <span className="whitespace-nowrap">Resume</span>
          </button>

          {/* Dark / Light Mode Toggle */}
          <button
            onClick={toggleThemeMode}
            className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-indigo-400 transition-all cursor-pointer group"
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle theme mode"
          >
            {isDarkMode ? (
              <Sun className="w-3.5 h-3.5 text-amber-400 group-hover:rotate-45 transition-transform" />
            ) : (
              <Moon className="w-3.5 h-3.5 text-indigo-600 group-hover:-rotate-12 transition-transform" />
            )}
          </button>

          {/* Audio toggle */}
          <button
            onClick={toggleAudioMute}
            className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-neutral-200 transition-colors"
            title={isAudioMuted ? 'Unmute sound effects' : 'Mute sound effects'}
            aria-label="Toggle sound"
          >
            {isAudioMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-indigo-400" />}
          </button>

          {/* Customizer / Edit Portfolio */}
          <button
            onClick={() => {
              sound.playClick(700);
              setIsCustomizerOpen(true);
            }}
            className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-neutral-200 transition-colors"
            title="Customize & Edit Portfolio Data"
            aria-label="Edit portfolio"
          >
            <Sliders className="w-3.5 h-3.5" />
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(prev => !prev)}
            className="md:hidden p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden pt-3 pb-2 border-t border-neutral-800 mt-3 flex flex-col gap-1">
          {navLinks.map(link => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className="text-left px-3 py-2 rounded-lg text-xs font-medium text-neutral-300 hover:bg-neutral-900"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => {
              toggleThemeMode();
              setMobileMenuOpen(false);
            }}
            className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-neutral-300 hover:bg-neutral-900"
          >
            {isDarkMode ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-indigo-600" />}
            <span>Switch to {isDarkMode ? 'Light' : 'Dark'} Mode</span>
          </button>
          <button
            onClick={() => {
              sound.playClick(900);
              setIsAiChatOpen(true);
              setMobileMenuOpen(false);
            }}
            className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-indigo-400 hover:bg-neutral-900"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ask Kamran's AI Concierge</span>
          </button>
        </div>
      )}
    </header>
  );
};

