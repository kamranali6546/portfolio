import React, { useState, useRef } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { ProjectCategory, ProjectItem } from '../types/portfolio';
import { sound } from '../utils/audio';
import { ProjectModal } from './ProjectModal';
import { 
  FolderGit2, 
  ExternalLink, 
  Github, 
  Sparkles, 
  CheckCircle2, 
  ArrowUpRight,
  Cpu,
  Layers,
  Zap,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  FastForward,
  RotateCcw
} from 'lucide-react';

export const ProjectsSection: React.FC = () => {
  const { projects } = usePortfolio();
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('all');
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);
  
  // Infinite Horizontal Scroll Controls
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [direction, setDirection] = useState<'left' | 'right'>('left');
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1);
  const [viewMode, setViewMode] = useState<'infinite' | 'grid'>('infinite');
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const manualScrollRef = useRef<HTMLDivElement>(null);

  const categories: { id: ProjectCategory; label: string; icon: any }[] = [
    { id: 'all', label: 'All Systems', icon: FolderGit2 },
    { id: 'design_systems', label: 'Design Systems', icon: Layers },
    { id: 'ai_augmented', label: 'AI-Augmented UI', icon: Sparkles },
    { id: 'react_nextjs', label: 'React & Next.js', icon: Cpu },
    { id: 'frontend_arch', label: 'Architecture', icon: Zap },
  ];

  const filteredProjects = (projects || []).filter(p => {
    if (selectedCategory === 'all') return true;
    return p.category === selectedCategory;
  });

  // Build duplicated items for infinite seamless looping
  const repeatFactor = filteredProjects.length < 4 ? 4 : filteredProjects.length < 8 ? 3 : 2;
  const infiniteProjectsList = Array(repeatFactor).fill(filteredProjects).flat();

  // Base duration in seconds based on card volume and speed multiplier
  const baseDuration = Math.max(30, (infiniteProjectsList.length * 4.5) / speedMultiplier);

  const handleOpenModal = (project: ProjectItem) => {
    sound.playClick(850);
    setActiveModalProject(project);
  };

  const handleManualScroll = (offset: number) => {
    sound.playClick(650);
    if (manualScrollRef.current) {
      manualScrollRef.current.scrollBy({
        left: offset,
        behavior: 'smooth'
      });
    }
  };

  const togglePause = () => {
    sound.playClick(700);
    setIsPaused(!isPaused);
  };

  const toggleDirection = () => {
    sound.playClick(750);
    setDirection(prev => (prev === 'left' ? 'right' : 'left'));
  };

  const cycleSpeed = () => {
    sound.playClick(800);
    const speeds = [0.5, 1, 1.5, 2];
    const currentIndex = speeds.indexOf(speedMultiplier);
    const nextSpeed = speeds[(currentIndex + 1) % speeds.length];
    setSpeedMultiplier(nextSpeed);
  };

  return (
    <section id="projects" className="py-20 w-full overflow-hidden space-y-8">
      {/* Header & Controls Container (Aligned to Content Grid) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-neutral-800">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-mono font-bold uppercase tracking-wider">
              <FolderGit2 className="w-4 h-4" />
              <span>Production Systems ({filteredProjects.length})</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-neutral-100 tracking-tight mt-1.5">
              Enterprise Frontend Systems
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-2xl">
              Component-driven architecture, enterprise design systems, Next.js Server Components, and AI-augmented streaming interfaces built for scale.
            </p>
          </div>

          {/* Categories & View Switcher */}
          <div className="flex flex-wrap items-center gap-2 self-start lg:self-auto">
            {/* Category Filter Pills */}
            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar bg-neutral-900/80 p-1.5 rounded-2xl border border-neutral-800">
              {categories.map(cat => {
                const Icon = cat.icon;
                const isSelected = selectedCategory === cat.id;
                const count = (projects || []).filter(p => cat.id === 'all' || p.category === cat.id).length;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      sound.playClick(700);
                      setSelectedCategory(cat.id);
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                      isSelected
                        ? 'bg-indigo-600 text-white font-bold shadow-md shadow-indigo-600/30'
                        : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/60'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{cat.label}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-indigo-700/80 text-white' : 'bg-neutral-800 text-neutral-400'}`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-neutral-900/80 p-1.5 rounded-2xl border border-neutral-800 gap-1">
              <button
                onClick={() => {
                  sound.playClick(600);
                  setViewMode('infinite');
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                  viewMode === 'infinite'
                    ? 'bg-neutral-800 text-indigo-400 font-bold border border-indigo-500/30 shadow-sm'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
                title="Infinite Horizontal Carousel View"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Infinite Stream</span>
              </button>
              <button
                onClick={() => {
                  sound.playClick(600);
                  setViewMode('grid');
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-neutral-800 text-indigo-400 font-bold border border-indigo-500/30 shadow-sm'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
                title="Standard Grid Layout"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Grid</span>
              </button>
            </div>
          </div>
        </div>

        {/* Infinite Horizontal Stream Control Toolbar */}
        {viewMode === 'infinite' && (
          <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 text-xs">
            <div className="flex items-center gap-3">
              {/* Play/Pause Button */}
              <button
                onClick={togglePause}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all cursor-pointer font-mono ${
                  isPaused
                    ? 'bg-amber-500/10 border-amber-500/40 text-amber-300'
                    : 'bg-indigo-600/10 border-indigo-500/30 text-indigo-300 hover:bg-indigo-600/20'
                }`}
              >
                {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
                <span>{isPaused ? 'Resume Stream' : 'Pause Stream'}</span>
              </button>

              {/* Direction Button */}
              <button
                onClick={toggleDirection}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-300 hover:text-neutral-100 hover:border-neutral-700 transition-colors cursor-pointer font-mono"
                title="Toggle Stream Direction"
              >
                <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
                <span>{direction === 'left' ? 'Flow: Left' : 'Flow: Right'}</span>
              </button>

              {/* Speed Multiplier */}
              <button
                onClick={cycleSpeed}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-300 hover:text-neutral-100 hover:border-neutral-700 transition-colors cursor-pointer font-mono"
                title="Click to Cycle Speed Multiplier"
              >
                <FastForward className="w-3.5 h-3.5 text-indigo-400" />
                <span>Speed: {speedMultiplier}x</span>
              </button>

              {/* Status indicator on hover */}
              {isHovered && (
                <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-neutral-950 text-neutral-400 font-mono text-[11px] border border-neutral-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                  <span>Hovered: Auto-scroll paused</span>
                </span>
              )}
            </div>

            {/* Left/Right Quick Step Buttons */}
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-mono text-neutral-500 hidden md:inline">Quick Nudge:</span>
              <button
                onClick={() => handleManualScroll(-380)}
                className="p-1.5 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-400 hover:text-neutral-100 hover:border-neutral-700 transition-colors cursor-pointer"
                title="Nudge Left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleManualScroll(380)}
                className="p-1.5 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-400 hover:text-neutral-100 hover:border-neutral-700 transition-colors cursor-pointer"
                title="Nudge Right"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* VIEW MODE 1: FULL SCREEN WIDTH INFINITE HORIZONTAL STREAM (0 margin / 0 padding left & right) */}
      {viewMode === 'infinite' && (
        <div 
          className="relative w-full px-0 mx-0 overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Scrollable Container with Infinite Continuous Track Edge-to-Edge */}
          <div 
            ref={manualScrollRef}
            className="overflow-x-auto no-scrollbar py-4 px-0"
          >
            <div
              className={`flex gap-6 items-stretch w-max ${
                direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'
              } ${isPaused ? 'marquee-paused' : ''}`}
              style={{
                animationDuration: `${baseDuration}s`,
                animationDirection: direction === 'left' ? 'normal' : 'reverse',
              }}
            >
              {infiniteProjectsList.map((project, idx) => (
                <div
                  key={`${project.id}-stream-${idx}`}
                  className="w-[340px] sm:w-[410px] shrink-0 group rounded-3xl bg-neutral-900/90 border border-neutral-800/90 hover:border-indigo-500/60 transition-all duration-300 flex flex-col justify-between overflow-hidden hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-1.5 select-none"
                >
                  <div>
                    {/* Project Card Image or Hero Banner */}
                    {project.image ? (
                      <div 
                        onClick={() => handleOpenModal(project)}
                        className="relative w-full h-44 bg-neutral-950 overflow-hidden cursor-pointer"
                      >
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-85 group-hover:opacity-100"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent" />
                        
                        {project.featured && (
                          <span className="absolute top-3 right-3 px-2.5 py-0.5 rounded-lg text-[10px] font-mono font-bold bg-indigo-950/90 text-indigo-300 border border-indigo-500/40 backdrop-blur-md shadow-lg">
                            ✦ Featured System
                          </span>
                        )}

                        <div className="absolute bottom-2.5 left-3 px-2 py-0.5 rounded-md text-[10px] font-mono uppercase tracking-wider bg-neutral-950/80 text-neutral-300 border border-neutral-800 backdrop-blur-sm">
                          {project.category.replace('_', ' ')}
                        </div>
                      </div>
                    ) : (
                      <div 
                        onClick={() => handleOpenModal(project)}
                        className="p-4 border-b border-neutral-800/80 bg-neutral-950/60 flex items-center justify-between cursor-pointer"
                      >
                        <span className="px-2.5 py-1 rounded-md text-[10px] font-mono uppercase tracking-wider bg-neutral-800 text-neutral-300">
                          {project.category.replace('_', ' ')}
                        </span>
                        {project.featured && (
                          <span className="text-[11px] font-mono text-indigo-400 font-bold">✦ Featured System</span>
                        )}
                      </div>
                    )}

                    {/* Card Body */}
                    <div className="p-5 space-y-3.5">
                      <div>
                        <h3 
                          onClick={() => handleOpenModal(project)}
                          className="text-base font-bold text-neutral-100 group-hover:text-indigo-300 transition-colors cursor-pointer flex items-center justify-between"
                        >
                          <span className="truncate pr-2">{project.title}</span>
                          <ArrowUpRight className="w-4 h-4 text-neutral-500 group-hover:text-indigo-400 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </h3>
                        <p className="text-xs text-neutral-400 mt-1 line-clamp-2 leading-relaxed h-8">
                          {project.tagline}
                        </p>
                      </div>

                      {/* Metrics Badges */}
                      <div className="grid grid-cols-3 gap-1.5 py-0.5">
                        {(project.metrics || []).map((m, mIdx) => (
                          <div key={mIdx} className="p-2 rounded-xl bg-neutral-950/90 border border-neutral-800/80 text-center group-hover:border-neutral-700 transition-colors">
                            <div className="text-[11px] font-bold font-mono text-indigo-300 truncate">{m.value}</div>
                            <div className="text-[9px] text-neutral-500 truncate">{m.label}</div>
                          </div>
                        ))}
                      </div>

                      {/* Architectural Highlights */}
                      <ul className="space-y-1 text-xs text-neutral-400 pt-0.5">
                        {(project.architectureHighlights || []).slice(0, 2).map((hl, hlIdx) => (
                          <li key={hlIdx} className="flex items-start gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            <span className="line-clamp-1 text-[11px]">{hl}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Card Footer Actions & Tags */}
                  <div className="p-5 pt-0 space-y-3">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1">
                      {(project.tags || []).slice(0, 4).map(t => (
                        <span key={t} className="px-2 py-0.5 rounded-md text-[9px] font-mono bg-neutral-950 text-neutral-400 border border-neutral-800">
                          {t}
                        </span>
                      ))}
                      {(project.tags || []).length > 4 && (
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-mono text-neutral-500">
                          +{(project.tags || []).length - 4}
                        </span>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-3 border-t border-neutral-800/80 flex items-center justify-between">
                      <button
                        onClick={() => handleOpenModal(project)}
                        className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Inspect System</span>
                      </button>

                      <div className="flex items-center gap-1.5">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800 transition-colors"
                            title="GitHub Repository"
                          >
                            <Github className="w-4 h-4" />
                          </a>
                        )}
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800 transition-colors"
                            title="Live Deployment"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* VIEW MODE 2: GRID VIEW (Contained in Max-W-7xl) */}
      {viewMode === 'grid' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map(project => (
              <div
                key={project.id}
                className="group rounded-3xl bg-neutral-900/80 border border-neutral-800/90 hover:border-indigo-500/50 transition-all duration-300 flex flex-col justify-between overflow-hidden hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-1.5"
              >
                <div>
                  {/* Project Card Image or Hero Banner */}
                  {project.image ? (
                    <div 
                      onClick={() => handleOpenModal(project)}
                      className="relative w-full h-48 bg-neutral-950 overflow-hidden cursor-pointer"
                    >
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-85 group-hover:opacity-100"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent" />
                      
                      {project.featured && (
                        <span className="absolute top-3.5 right-3.5 px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold bg-indigo-950/90 text-indigo-300 border border-indigo-500/40 backdrop-blur-md shadow-lg">
                          ✦ Featured System
                        </span>
                      )}
                    </div>
                  ) : (
                    <div 
                      onClick={() => handleOpenModal(project)}
                      className="p-5 border-b border-neutral-800/80 bg-neutral-950/50 flex items-center justify-between cursor-pointer"
                    >
                      <span className="px-2.5 py-1 rounded-md text-[10px] font-mono uppercase tracking-wider bg-neutral-800 text-neutral-300">
                        {project.category.replace('_', ' ')}
                      </span>
                      {project.featured && (
                        <span className="text-[11px] font-mono text-indigo-400 font-bold">✦ Featured System</span>
                      )}
                    </div>
                  )}

                  {/* Card Body */}
                  <div className="p-6 space-y-4">
                    <div>
                      <h3 
                        onClick={() => handleOpenModal(project)}
                        className="text-base font-bold text-neutral-100 group-hover:text-indigo-300 transition-colors cursor-pointer flex items-center justify-between"
                      >
                        <span>{project.title}</span>
                        <ArrowUpRight className="w-4 h-4 text-neutral-500 group-hover:text-indigo-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </h3>
                      <p className="text-xs text-neutral-400 mt-1 line-clamp-2 leading-relaxed">
                        {project.tagline}
                      </p>
                    </div>

                    {/* Metrics Badges */}
                    <div className="grid grid-cols-3 gap-2 py-1">
                      {(project.metrics || []).map((m, idx) => (
                        <div key={idx} className="p-2.5 rounded-xl bg-neutral-950/90 border border-neutral-800/80 text-center group-hover:border-neutral-700 transition-colors">
                          <div className="text-xs font-bold font-mono text-indigo-300 truncate">{m.value}</div>
                          <div className="text-[10px] text-neutral-500 truncate">{m.label}</div>
                        </div>
                      ))}
                    </div>

                    {/* Architectural Highlights */}
                    <ul className="space-y-1.5 text-xs text-neutral-400 pt-1">
                      {(project.architectureHighlights || []).slice(0, 2).map((hl, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{hl}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Footer Actions & Tags */}
                <div className="p-6 pt-0 space-y-4">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {(project.tags || []).slice(0, 4).map(t => (
                      <span key={t} className="px-2.5 py-0.5 rounded-md text-[10px] font-mono bg-neutral-950 text-neutral-400 border border-neutral-800">
                        {t}
                      </span>
                    ))}
                    {(project.tags || []).length > 4 && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-mono text-neutral-500">
                        +{(project.tags || []).length - 4}
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-3 border-t border-neutral-800/80 flex items-center justify-between">
                    <button
                      onClick={() => handleOpenModal(project)}
                      className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Inspect Code & Live Demo</span>
                    </button>

                    <div className="flex items-center gap-2">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 rounded-lg text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800 transition-colors"
                          title="GitHub Repository"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 rounded-lg text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800 transition-colors"
                          title="Live Deployment"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Interactive Project Modal */}
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </section>
  );
};
