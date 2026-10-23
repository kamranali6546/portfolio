import React, { useState, useCallback, useEffect, Suspense, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { viewerProfiles, type ProfileId, type Project, type SectionId } from './data/portfolio';
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

// Route & Component Level Code Splitting: Lazy-load heavy below-the-fold sections and modals
const MinimalPortfolio = React.lazy(() => import('./components/MinimalPortfolio'));
const ProjectModal = React.lazy(() => import('./components/ProjectModal'));
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
  const [project, setProject] = useState<Project | null>(null);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const activeProfile = viewerProfiles.find((p) => p.id === profileId) ?? viewerProfiles[0];
  const order = activeProfile.order;

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
    originals: <Originals onOpen={setProject} />,
    picks: <TopPicks />,
    skills: <Skills />,
    moments: <Achievements />,
    story: <ResumeSection onView={() => setResumeOpen(true)} />,
  };

  return (
    <SmoothScrollProvider>
      <div className="relative min-h-screen bg-[#07070a] text-[#f4f1ec]">
        {/* Subtle Film Grain */}
        <div className="grain" aria-hidden="true" />

        {/* Custom Cinema Disc Cursor */}
        <CustomCursor />

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
            initial={{ opacity: 0, scale: 1.03, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1, ease: EASE }}
          >
            {/* Main Netflix Series Navigation */}
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
            <Suspense fallback={<div className="min-h-screen bg-[#07070a] flex items-center justify-center text-sm font-mono text-[#a7a6ad]">Loading view...</div>}>
              <MinimalPortfolio
                onSwitchToSeries={handleSwitchToSeries}
                onOpenProject={setProject}
                onOpenResume={() => setResumeOpen(true)}
              />
            </Suspense>
          </motion.div>
        )}

        {/* Modals & Overlays (Only fetched when triggered by user) */}
        <AnimatePresence>
          {playing && (
            <Suspense fallback={null}>
              <PlayIntro key="intro" onClose={() => setPlaying(false)} />
            </Suspense>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {project && (
            <Suspense fallback={null}>
              <ProjectModal
                key="project"
                project={project}
                onClose={() => setProject(null)}
                onSwitch={setProject}
              />
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

        {/* Floating Minimal/Series Switch Button */}
        {(stage === 'home' || stage === 'minimal') && (
          <FloatingModeSwitch
            currentMode={stage === 'home' ? 'series' : 'minimal'}
            onToggle={stage === 'home' ? handleSwitchToMinimal : handleSwitchToSeries}
          />
        )}

      </div>
    </SmoothScrollProvider>
  );
}
