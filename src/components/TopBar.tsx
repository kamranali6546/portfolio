import React from 'react';
import { Volume2, VolumeX, BookOpen, Compass } from 'lucide-react';
import { CHAPTERS } from '../data/portfolioData';

interface TopBarProps {
  currentChapterIndex: number;
  activeMode: '3d' | 'reader';
  onToggleMode: () => void;
  isMuted: boolean;
  onToggleAudio: () => void;
  onNavigateChapter: (chapterIndex: number) => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  currentChapterIndex,
  activeMode,
  onToggleMode,
  isMuted,
  onToggleAudio,
  onNavigateChapter,
}) => {
  // Clean nav links mapped to primary milestones and sections
  const navItems = [
    { label: 'Foundation', chapterIdx: 1, sectionId: 'foundation' },
    { label: 'Impact', chapterIdx: 2, sectionId: 'ledger' },
    { label: 'Experience', chapterIdx: 3, sectionId: 'archive' },
    { label: 'Projects', chapterIdx: 3, sectionId: 'projects' },
    { label: 'Skills', chapterIdx: 4, sectionId: 'grid' },
    { label: 'Contact', chapterIdx: 7, sectionId: 'exit' },
  ];

  const handleNavClick = (chapterIdx: number, sectionId: string) => {
    if (activeMode === 'reader') {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    onNavigateChapter(chapterIdx);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-white/[0.08] bg-[#08080a]/80 backdrop-blur-md transition-all duration-300">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => onNavigateChapter(0)}
          className="text-left font-display text-xl font-bold tracking-tight text-white transition-opacity hover:opacity-80"
        >
          Kamran Ali
        </button>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-xs uppercase tracking-wider font-mono">
          {navItems.map((item) => {
            const isActive = currentChapterIndex === item.chapterIdx;
            const accent = CHAPTERS[item.chapterIdx]?.accentColor || '#D4794A';

            return (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.chapterIdx, item.sectionId)}
                className="group relative py-1 text-slate-400 transition-colors hover:text-white"
              >
                <span className={isActive ? 'text-white font-medium' : ''}>
                  {item.label}
                </span>
                {isActive && (
                  <span
                    className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full transition-all duration-300"
                    style={{ backgroundColor: accent }}
                  />
                )}
                {!isActive && (
                  <span className="absolute -bottom-1 left-1/2 right-1/2 h-[1px] bg-white/40 opacity-0 transition-all duration-200 group-hover:left-0 group-hover:right-0 group-hover:opacity-100" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          {/* Spatial Audio Toggle */}
          {activeMode === '3d' && (
            <button
              onClick={onToggleAudio}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-slate-300 transition-all hover:border-white/25 hover:bg-white/[0.08] hover:text-white"
              title={isMuted ? 'Enable spatial audio ambience' : 'Mute spatial audio'}
              aria-label={isMuted ? 'Enable spatial audio' : 'Mute spatial audio'}
            >
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4 text-amber-500 animate-pulse" />}
            </button>
          )}

          {/* Mode Switcher: 3D Spatial Walkthrough vs Structured Read */}
          <button
            onClick={onToggleMode}
            className="flex items-center gap-2 rounded-lg border border-white/15 bg-white/[0.05] px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider text-slate-200 transition-all hover:border-amber-500/50 hover:bg-white/[0.1] hover:text-white whitespace-nowrap"
            title={activeMode === '3d' ? 'Switch to Structured Reader view' : 'Switch to 3D Spatial Walkthrough'}
          >
            {activeMode === '3d' ? (
              <>
                <BookOpen className="h-3.5 w-3.5 text-amber-400" />
                <span className="hidden sm:inline">Structured Read</span>
                <span className="sm:hidden">Read</span>
              </>
            ) : (
              <>
                <Compass className="h-3.5 w-3.5 text-amber-400" />
                <span className="hidden sm:inline">3D Spatial</span>
                <span className="sm:hidden">3D</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
