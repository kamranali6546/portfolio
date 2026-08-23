import React, { useState } from 'react';
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
  Code2
} from 'lucide-react';

export const ProjectsSection: React.FC = () => {
  const { projects } = usePortfolio();
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('all');
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);

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

  const handleOpenModal = (project: ProjectItem) => {
    sound.playClick(850);
    setActiveModalProject(project);
  };

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-neutral-800">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-mono font-bold uppercase tracking-wider">
            <FolderGit2 className="w-4 h-4" />
            <span>Frontend Architecture</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-neutral-100 tracking-tight mt-1.5">
            Enterprise Frontend Systems
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-2xl">
            Component-driven architecture, enterprise design systems, Next.js Server Components, and AI-augmented streaming interfaces built for scale.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar bg-neutral-900/80 p-1.5 rounded-2xl border border-neutral-800 self-start md:self-auto">
          {categories.map(cat => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  sound.playClick(700);
                  setSelectedCategory(cat.id);
                }}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? 'bg-indigo-600 text-white font-bold shadow-md shadow-indigo-600/30'
                    : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/60'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                  className="relative w-full h-52 bg-neutral-950 overflow-hidden cursor-pointer"
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
                    className="text-lg font-bold text-neutral-100 group-hover:text-indigo-300 transition-colors cursor-pointer flex items-center justify-between"
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
                {(project.tags || []).slice(0, 5).map(t => (
                  <span key={t} className="px-2.5 py-0.5 rounded-md text-[10px] font-mono bg-neutral-950 text-neutral-400 border border-neutral-800">
                    {t}
                  </span>
                ))}
                {(project.tags || []).length > 5 && (
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-mono text-neutral-500">
                    +{(project.tags || []).length - 5}
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

      {/* Interactive Modal */}
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </section>
  );
};
