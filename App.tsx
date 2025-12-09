import React, { useState, useEffect } from 'react';
import { Preloader } from './components/Preloader';
import { GlobalBackground } from './components/GlobalBackground';
import { HorizontalSection } from './components/HorizontalSection';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Stats } from './components/Stats';
import { Contact } from './components/Contact';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Check system preference or default to dark
    if (document.documentElement.classList.contains('dark')) {
        setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    if (newIsDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleLoadComplete = () => {
    setLoading(false);
  };
  
  return (
    <>
      {loading && <Preloader onComplete={handleLoadComplete} />}
      
      {!loading && (
        <main className="bg-zinc-50 dark:bg-[#050505] text-zinc-900 dark:text-white selection:bg-cyan-400 selection:text-black min-h-screen relative transition-colors duration-500">
          
          {/* THEME TOGGLE BUTTON */}
          <button 
            onClick={toggleTheme}
            className="fixed top-6 right-6 z-[60] p-3 rounded-full bg-zinc-200 dark:bg-zinc-900 text-zinc-800 dark:text-white border border-zinc-300 dark:border-zinc-700 hover:scale-110 transition-all duration-300 shadow-lg"
            aria-label="Toggle Theme"
          >
            {isDark ? (
                // Sun Icon
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="5"></circle>
                    <line x1="12" y1="1" x2="12" y2="3"></line>
                    <line x1="12" y1="21" x2="12" y2="23"></line>
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                    <line x1="1" y1="12" x2="3" y2="12"></line>
                    <line x1="21" y1="12" x2="23" y2="12"></line>
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
            ) : (
                // Moon Icon
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
            )}
          </button>

          {/* SINGLE GLOBAL BACKGROUND */}
          <GlobalBackground isDark={isDark} />

          {/* Group 1: Intro, Services, Skills. */}
          <HorizontalSection backgroundBehavior="end-vertical">
             <Hero />
             <Services />
             <Skills />
          </HorizontalSection>

          {/* Vertical Break A: Experience */}
          <Experience />

          {/* Group 2: Projects Showcase. */}
          <HorizontalSection backgroundBehavior="both-vertical">
              <Projects />
          </HorizontalSection>

          {/* Vertical Break B: Stats */}
          <Stats />

          {/* Final Section */}
          <div className="h-screen w-full relative z-10">
             <Contact />
          </div>

        </main>
      )}
    </>
  );
};

export default App;