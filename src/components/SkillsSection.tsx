import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { sound } from '../utils/audio';
import { 
  Cpu, 
  Search, 
  Sparkles, 
  Layers, 
  Zap, 
  Code2, 
  Terminal,
  ShieldCheck
} from 'lucide-react';

export const SkillsSection: React.FC = () => {
  const { skills } = usePortfolio();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    'All',
    'Core Languages & Frameworks',
    'Frontend Architecture & State',
    'UI Systems, Styling & Motion',
    'AI & LLM Integration',
    'Performance, Testing & Tooling'
  ];

  const categoryShortLabels: Record<string, string> = {
    'All': 'All',
    'Core Languages & Frameworks': 'Core & React',
    'Frontend Architecture & State': 'Architecture & State',
    'UI Systems, Styling & Motion': 'Design Systems & UI',
    'AI & LLM Integration': 'AI & LLMs',
    'Performance, Testing & Tooling': 'Perf & Tooling'
  };

  const filteredSkills = (skills || []).filter(skill => {
    const matchesCategory = selectedCategory === 'All' || skill.category === selectedCategory;
    const matchesSearch = (skill.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (skill.description || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (skill.tags || []).some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="skills" className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
      {/* Minimal Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-mono font-bold uppercase tracking-wider">
            <Cpu className="w-3.5 h-3.5" />
            <span>Technical Mastery</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-neutral-100 tracking-tight mt-0.5">
            Core Competencies & Stack
          </h2>
        </div>

        {/* Compact Search & Stats */}
        <div className="flex items-center gap-3">
          <div className="relative w-full sm:w-60">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter skills..."
              className="w-full bg-neutral-900/90 text-neutral-200 text-xs pl-8 pr-3 py-1.5 rounded-xl border border-neutral-800 focus:border-indigo-500 focus:outline-none transition-all placeholder:text-neutral-500"
            />
          </div>
          <span className="hidden sm:inline-flex items-center px-2.5 py-1 rounded-lg bg-neutral-900 border border-neutral-800 text-[11px] font-mono text-neutral-400 whitespace-nowrap">
            {filteredSkills.length} skills
          </span>
        </div>
      </div>

      {/* Compact Quick Highlight Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        <div className="p-2.5 rounded-xl bg-neutral-900/60 border border-neutral-800 flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400">
            <Code2 className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <div className="text-xs font-bold text-neutral-200 truncate">React & Next.js</div>
            <div className="text-[10px] text-neutral-400 font-mono">App Router & RSC</div>
          </div>
        </div>

        <div className="p-2.5 rounded-xl bg-neutral-900/60 border border-neutral-800 flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400">
            <Layers className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <div className="text-xs font-bold text-neutral-200 truncate">TypeScript & AST</div>
            <div className="text-[10px] text-neutral-400 font-mono">Strict Types & Monorepos</div>
          </div>
        </div>

        <div className="p-2.5 rounded-xl bg-neutral-900/60 border border-neutral-800 flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <div className="text-xs font-bold text-neutral-200 truncate">Applied AI & LLM</div>
            <div className="text-[10px] text-neutral-400 font-mono">Streaming & Function Calls</div>
          </div>
        </div>

        <div className="p-2.5 rounded-xl bg-neutral-900/60 border border-neutral-800 flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
            <Zap className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <div className="text-xs font-bold text-neutral-200 truncate">Core Web Vitals</div>
            <div className="text-[10px] text-neutral-400 font-mono">Sub-second LCP / INP</div>
          </div>
        </div>
      </div>

      {/* Category Filter Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
        {categories.map(cat => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => {
                sound.playClick(650);
                setSelectedCategory(cat);
              }}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                isSelected
                  ? 'bg-indigo-600 text-white font-bold shadow-sm'
                  : 'bg-neutral-900/70 border border-neutral-800/80 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800'
              }`}
            >
              {categoryShortLabels[cat] || cat}
            </button>
          );
        })}
      </div>

      {/* Minimal, Compact Skill Matrix Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {filteredSkills.map(skill => (
          <div
            key={skill.name}
            className="p-3.5 rounded-xl bg-neutral-900/70 border border-neutral-800 hover:border-indigo-500/40 transition-all duration-200 flex flex-col justify-between group hover:bg-neutral-900/95"
          >
            <div className="space-y-2">
              {/* Header: Name + Exp */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0 group-hover:bg-cyan-400 transition-colors" />
                  <h3 className="text-xs font-bold text-neutral-100 group-hover:text-indigo-300 transition-colors truncate">
                    {skill.name}
                  </h3>
                </div>
                <span className="text-[10px] font-mono font-medium text-neutral-400 shrink-0">
                  {skill.years}y exp
                </span>
              </div>

              {/* Progress Line */}
              <div className="flex items-center gap-2">
                <div className="w-full bg-neutral-950 h-1 rounded-full overflow-hidden border border-neutral-800/60">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-400 rounded-full"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
                <span className="text-[10px] font-mono text-neutral-400 shrink-0">
                  {skill.level}%
                </span>
              </div>

              {/* Compact 1-line summary */}
              <p className="text-[11px] text-neutral-400 line-clamp-1 leading-snug">
                {skill.description}
              </p>
            </div>

            {/* Micro Tags */}
            <div className="flex flex-wrap gap-1 pt-2.5 mt-1 border-t border-neutral-800/40">
              {(skill.tags || []).slice(0, 3).map(tag => (
                <span
                  key={tag}
                  className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-neutral-950 text-neutral-400 border border-neutral-800/80"
                >
                  {tag}
                </span>
              ))}
              {(skill.tags || []).length > 3 && (
                <span className="text-[9px] font-mono text-neutral-400">
                  +{(skill.tags || []).length - 3}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
