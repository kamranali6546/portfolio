import React from 'react';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ArchitectureSection } from './components/ArchitectureSection';
import { SkillsSection } from './components/SkillsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { TerminalSection } from './components/TerminalSection';
import { ContactSection } from './components/ContactSection';
import { AiChatModal } from './components/AiChatModal';
import { ResumeModal } from './components/ResumeModal';
import { CustomizerModal } from './components/CustomizerModal';
import { ToastContainer } from './components/ToastContainer';
import { InteractiveBackground } from './components/InteractiveBackground';
import { sound } from './utils/audio';
import { Sparkles, ArrowUp } from 'lucide-react';

const PortfolioShell: React.FC = () => {
  const { setIsAiChatOpen, isDarkMode } = usePortfolio();

  const scrollToTop = () => {
    sound.playClick(700);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#05070d] text-neutral-100' : 'bg-slate-50 text-slate-900'} selection:bg-indigo-500/30 selection:text-indigo-600 antialiased relative font-sans transition-colors duration-300`}>
      {/* Living Interactive Canvas Particle Engine & Aurora Halos */}
      <InteractiveBackground />

      {/* Top Navbar */}
      <Navbar />

      {/* Main Content Flow */}
      <main className="space-y-6 sm:space-y-12">
        <HeroSection />
        <ProjectsSection />
        <ArchitectureSection />
        <SkillsSection />
        <ExperienceSection />
        <TerminalSection />
        <ContactSection />
      </main>

      {/* Floating Bottom Quick Action Trigger */}
      <div className="fixed bottom-6 left-6 z-40 hidden sm:flex items-center gap-2">
        <button
          onClick={() => {
            sound.playClick(900);
            setIsAiChatOpen(true);
          }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold bg-indigo-600/90 hover:bg-indigo-600 text-white backdrop-blur-md shadow-xl shadow-indigo-600/30 border border-indigo-400/40 transition-all cursor-pointer hover:scale-105"
        >
          <Sparkles className="w-4 h-4" />
          <span>Ask Kamran's AI</span>
        </button>

        <button
          onClick={scrollToTop}
          className="p-2.5 rounded-full bg-neutral-900/90 hover:bg-neutral-800 text-neutral-400 hover:text-neutral-200 border border-neutral-800 backdrop-blur-md shadow-lg transition-all cursor-pointer hover:scale-105"
          title="Scroll to top"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      </div>

      {/* Modals & Overlays */}
      <AiChatModal />
      <ResumeModal />
      <CustomizerModal />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <PortfolioProvider>
      <PortfolioShell />
    </PortfolioProvider>
  );
}
