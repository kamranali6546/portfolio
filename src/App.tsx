import React, { useState, useCallback, useEffect, Suspense, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { viewerProfiles, projects, type ProfileId, type Project, type SectionId } from './data/portfolio';
import CustomCursor from './components/CustomCursor';
import OpeningSequence from './components/OpeningSequence';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ContinueWatching from './components/ContinueWatching';
import Scene from './components/Scene';
import About from './components/About';
import FloatingModeSwitch from './components/FloatingModeSwitch';
import { EASE } from './components/fx';
import { SmoothScrollProvider } from './hooks/smoothScroll';

// Route & Component Level Code Splitting: Lazy-load heavy below-the-fold sections, modals, and deep-dive page
const MinimalPortfolio = React.lazy(() => import('./components/MinimalPortfolio'));
const OriginalDetailPage = React.lazy(() => import('./components/OriginalDetailPage'));
const ResumeModal = React.lazy(() => import('./components/ResumeModal'));
const PlayIntro = React.lazy(() => import('./components/PlayIntro'));
const Seasons = React.lazy(() => import('./components/Seasons'));
const Originals = React.lazy(() => import('./components/Originals'));
const TopPicks = React.lazy(() => import('./components/TopPicks'));
const Skills = React.lazy(() => import('./components/Skills'));
const Achievements = React.lazy(() => import('./components/Achievements'));
const ResumeSection = React.lazy(() => import('./components/ResumeViewer'));
const FinalCTA = React.lazy(() => import('./components/FinalCTA'));

const SectionLoader = () => (
  <div className="flex h-48 w-full items-center justify-center rounded-2xl border border-white/5 bg-white/[0.02] text-xs font-mono text-[#a7a6ad] animate-pulse">
    Loading scene...
  </div>
);

type Stage = 'opening' | 'home' | 'minimal';
const STORAGE_KEY = 'kamran-series-profile';
const MODE_STORAGE_KEY = 'kamran_view_mode';

function readStoredStage(): { stage: Stage; profileId: ProfileId } {
  try {
    const mode = sessionStorage.getItem(MODE_STORAGE_KEY);
    if (mode === 'minimal') {
      return { stage: 'minimal', profileId: 'kamran' };
    }
    const profile = sessionStorage.getItem(STORAGE_KEY);
    if (profile && viewerProfiles.some((p) => p.id === profile)) {
      return { stage: 'home', profileId: profile as ProfileId };
    }
  } catch {
    /* storage unavailable */
  }
  return { stage: 'opening', profileId: 'kamran' };
}

export default function App() {
  const initial = readStoredStage();
  const [stage, setStage] = useState<Stage>(initial.stage);
  const [profileId, setProfileId] = useState<ProfileId>(initial.profileId);
  const [playing, setPlaying] = useState(false);
  const [project, setProject] = useState<Project | null>(() => {
    // Check initial URL hash for direct original deep link
    if (typeof window !== 'undefined' && window.location.hash.startsWith('#original/')) {
      const id = window.location.hash.replace('#original/', '');
      return projects.find((p) => p.id === id) || null;
    }
    return null;
  });
  const [resumeOpen, setResumeOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const activeProfile = viewerProfiles.find((p) => p.id === profileId) ?? viewerProfiles[0];
  const order = activeProfile.order;

  // Open full-page original case study with URL synchronization
  const handleOpenProject = useCallback((p: Project) => {
    setProject(p);
    try {
      window.history.pushState({ projectId: p.id }, '', `#original/${p.id}`);
    } catch {
      window.location.hash = `original/${p.id}`;
    }
  }, []);

  // Close full-page original case study and return to current stage
  const handleCloseProject = useCallback(() => {
    setProject(null);
    try {
      if (window.location.hash.startsWith('#original/')) {
        window.history.pushState(null, '', window.location.pathname + window.location.search);
      }
    } catch {
      window.location.hash = '';
    }
  }, []);

  // Listen to browser Back/Forward buttons and hash changes
  useEffect(() => {
    const handleHashOrState = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#original/')) {
        const id = hash.replace('#original/', '');
        const found = projects.find((p) => p.id === id);
        if (found) {
          setProject(found);
          return;
        }
      }
      if (!hash.startsWith('#original/') && project) {
        setProject(null);
      }
    };

    window.addEventListener('hashchange', handleHashOrState);
    window.addEventListener('popstate', handleHashOrState);
    return () => {
      window.removeEventListener('hashchange', handleHashOrState);
      window.removeEventListener('popstate', handleHashOrState);
    };
  }, [project]);

  const pickProfile = useCallback(
    (id: ProfileId) => {
      setProfileId(id);
      try {
        sessionStorage.setItem(STORAGE_KEY, id);
      } catch {
        /* storage unavailable */
      }
      if (stage !== 'home') {
        window.scrollTo(0, 0);
        setStage('home');
      } else {
        const p = viewerProfiles.find((v) => v.id === id)!;
        setToast(`Now watching as ${p.name} — ${p.blurb.toLowerCase()}`);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    [stage]
  );

  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(null), 3200);
    return () => clearTimeout(t);
  }, [toast]);

  const handleSkipIntro = useCallback(() => {
    try {
      sessionStorage.setItem(MODE_STORAGE_KEY, 'minimal');
    } catch {
      /* storage unavailable */
    }
    setStage('minimal');
    window.scrollTo(0, 0);
  }, []);

  const handlePlaySeries = useCallback(() => {
    try {
      sessionStorage.setItem(MODE_STORAGE_KEY, 'series');
    } catch {
      /* storage unavailable */
    }
    setStage('home');
    window.scrollTo(0, 0);
  }, []);

  const handleSwitchToSeries = useCallback(() => {
    try {
      sessionStorage.setItem(MODE_STORAGE_KEY, 'series');
    } catch {
      /* storage unavailable */
    }
    setStage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSwitchToMinimal = useCallback(() => {
    try {
      sessionStorage.setItem(MODE_STORAGE_KEY, 'minimal');
    } catch {
      /* storage unavailable */
    }
    setStage('minimal');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const sections: Record<SectionId, ReactNode> = {
    about: <About />,
    journey: <Seasons />,
    originals: <Originals onOpen={handleOpenProject} />,
    picks: <TopPicks />,
    skills: <Skills />,
    moments: <Achievements />,
    story: <ResumeSection onView={() => setResumeOpen(true)} />,
  };

  return (
    <SmoothScrollProvider>
      <div className="relative min-h-screen bg-[#07070a] text-[#f4f1ec]">
        {/* Subtle Film Grain (Desktop only, GPU optimized) */}
        <div className="grain" aria-hidden="true" />

        {/* Custom Cinema Disc Cursor */}
        <CustomCursor />

        {/* FULL PAGE VIEW: Dedicated Original Deep Dive Case Study Page */}
        {project ? (
          <Suspense
            fallback={
              <div className="min-h-screen bg-[#07070a] flex items-center justify-center font-mono text-sm text-[#a7a6ad]">
                Loading Original Deep Dive...
              </div>
            }
          >
            <OriginalDetailPage
              project={project}
              onBack={handleCloseProject}
              onSelectProject={handleOpenProject}
              previousMode={stage === 'minimal' ? 'minimal' : 'series'}
            />
          </Suspense>
        ) : (
          <>
            {/* Stage 1: Opening Titles Sequence */}
            <AnimatePresence>
              {stage === 'opening' && (
                <OpeningSequence
                  key="opening"
                  onPlaySeries={handlePlaySeries}
                  onSkipToMinimal={handleSkipIntro}
                />
              )}
            </AnimatePresence>

            {/* Stage 2: Home Series Experience */}
            {stage === 'home' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, ease: EASE }}
              >
                {/* Main Fixed Header Navigation */}
                <Navbar
                  order={order}
                  profileId={profileId}
                  onSwitch={pickProfile}
                  onSwitchToMinimal={handleSwitchToMinimal}
                />

                <main id="main-content">
                  {/* Billboard Hero */}
                  <Hero
                    key={`hero-${profileId}`}
                    onPlay={() => setPlaying(true)}
                    onResume={() => setResumeOpen(true)}
                    profileId={profileId}
                  />

                  {/* Continue Watching Row */}
                  <ContinueWatching order={order} />

                  {/* Dynamically Ordered Series Scenes */}
                  {order.map((id) => (
                    <Scene key={id} id={id} className={id === 'originals' ? '!py-0 sm:!py-0' : ''}>
                      <Suspense fallback={<SectionLoader />}>
                        {sections[id]}
                      </Suspense>
                    </Scene>
                  ))}

                  {/* Final CTA / To Be Continued */}
                  <Suspense fallback={null}>
                    <FinalCTA
                      onReplay={() => setStage('opening')}
                      onSwitchToMinimal={handleSwitchToMinimal}
                    />
                  </Suspense>
                </main>
              </motion.div>
            )}

            {/* Stage 4: Clean, Minimal Single-Page Website */}
            {stage === 'minimal' && (
              <motion.div
                key="minimal-view"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, ease: EASE }}
              >
                <Suspense
                  fallback={
                    <div className="min-h-screen bg-[#07070a] flex items-center justify-center text-sm font-mono text-[#a7a6ad]">
                      Loading view...
                    </div>
                  }
                >
                  <MinimalPortfolio
                    onSwitchToSeries={handleSwitchToSeries}
                    onOpenProject={handleOpenProject}
                    onOpenResume={() => setResumeOpen(true)}
                  />
                </Suspense>
              </motion.div>
            )}

            {/* Modals & Overlays */}
            <AnimatePresence>
              {playing && (
                <Suspense fallback={null}>
                  <PlayIntro key="intro" onClose={() => setPlaying(false)} />
                </Suspense>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {resumeOpen && (
                <Suspense fallback={null}>
                  <ResumeModal key="resume" onClose={() => setResumeOpen(false)} />
                </Suspense>
              )}
            </AnimatePresence>

            {/* Floating Minimal/Series Switch Button */}
            {(stage === 'home' || stage === 'minimal') && (
              <FloatingModeSwitch
                currentMode={stage === 'home' ? 'series' : 'minimal'}
                onToggle={stage === 'home' ? handleSwitchToMinimal : handleSwitchToSeries}
              />
            )}
          </>
        )}

        {/* Dynamic Profile Switch Toast */}
        <AnimatePresence>
          {toast && (
            <motion.div
              role="status"
              className="glass fixed bottom-6 left-1/2 z-[160] w-[min(92vw,420px)] -translate-x-1/2 rounded-xl px-5 py-3 text-center text-sm font-sans text-[#f4f1ec] shadow-2xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
            >
              {toast}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SmoothScrollProvider>
  );
}
