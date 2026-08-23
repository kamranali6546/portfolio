import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { sound } from '../utils/audio';
import { 
  Cpu, 
  Search, 
  Layers, 
  Sparkles, 
  CheckCircle2, 
  Zap, 
  SlidersHorizontal 
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

  const filteredSkills = (skills || []).filter(skill => {
    const matchesCategory = selectedCategory === 'All' || skill.category === selectedCategory;
    const matchesSearch = (skill.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (skill.description || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (skill.tags || []).some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-neutral-800">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-mono font-bold uppercase tracking-wider">
            <Cpu className="w-4 h-4" />
            <span>Technical Mastery</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-neutral-100 tracking-tight mt-1.5">
            Core Frontend Competencies
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-2xl">
            A comprehensive matrix of component architecture, state management, design systems, animation engines, and AI streaming toolkits.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72 self-start md:self-auto">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search skills, tools, tags..."
            className="w-full bg-neutral-900/90 text-neutral-200 text-xs pl-9 pr-4 py-2.5 rounded-xl border border-neutral-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/40 focus:outline-none transition-all placeholder:text-neutral-500"
          />
        </div>
      </div>

      {/* Radar Matrix & High-Level Skill Spectrum */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center rounded-3xl bg-neutral-900/70 border border-neutral-800/80 p-6 glow-indigo">
        {/* Left: Animated TypeScript AST & Compiler Visualizer SVG */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center p-2">
          <div className="relative w-full max-w-[310px] aspect-square flex items-center justify-center">
            <svg viewBox="0 0 320 320" className="w-full h-full select-none overflow-visible">
              <defs>
                <linearGradient id="tsCodeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity="0.85" />
                  <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.85" />
                </linearGradient>

                <filter id="tsGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="2.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Background Window Frame */}
              <rect x="10" y="10" width="300" height="300" rx="16" fill="rgba(9, 13, 22, 0.95)" stroke="rgba(99, 102, 241, 0.3)" strokeWidth="1.2" />
              
              {/* Window Header */}
              <rect x="10" y="10" width="300" height="28" rx="16" fill="rgba(15, 23, 42, 0.9)" />
              <circle cx="26" cy="24" r="3.5" fill="#ef4444" />
              <circle cx="36" cy="24" r="3.5" fill="#f59e0b" />
              <circle cx="46" cy="24" r="3.5" fill="#10b981" />
              <text x="160" y="27" textAnchor="middle" fill="#818cf8" fontSize="9" fontFamily="'JetBrains Mono', monospace" fontWeight="bold">
                tsconfig.json // strict: true
              </text>

              {/* AST Branch Wire Conduits */}
              <g stroke="rgba(99, 102, 241, 0.4)" strokeWidth="1.5" fill="none">
                <path d="M 160 160 L 70 80" className="animated-wire" stroke="#38bdf8" />
                <path d="M 160 160 L 250 80" className="animated-wire" stroke="#818cf8" />
                <path d="M 160 160 L 260 220" className="animated-wire" stroke="#34d399" />
                <path d="M 160 160 L 60 220" className="animated-wire" stroke="#fbbf24" />
                <path d="M 160 160 L 160 270" className="animated-wire" stroke="#c084fc" />
              </g>

              {/* Animated AST Token Particles */}
              <circle r="3.5" fill="#38bdf8" filter="url(#tsGlow)">
                <animateMotion dur="2s" repeatCount="indefinite" path="M 160 160 L 70 80" />
              </circle>
              <circle r="3.5" fill="#818cf8" filter="url(#tsGlow)">
                <animateMotion dur="2.2s" begin="0.4s" repeatCount="indefinite" path="M 160 160 L 250 80" />
              </circle>
              <circle r="3.5" fill="#34d399" filter="url(#tsGlow)">
                <animateMotion dur="1.8s" begin="0.8s" repeatCount="indefinite" path="M 160 160 L 260 220" />
              </circle>
              <circle r="3.5" fill="#fbbf24" filter="url(#tsGlow)">
                <animateMotion dur="2.4s" begin="0.2s" repeatCount="indefinite" path="M 160 160 L 60 220" />
              </circle>

              {/* Center Core Node: TypeScript / React Engine */}
              <g transform="translate(160, 160)">
                <circle r="32" fill="#0d1527" stroke="url(#tsCodeGrad)" strokeWidth="2" filter="url(#tsGlow)" />
                <circle r="36" fill="none" stroke="#6366f1" strokeWidth="1" strokeDasharray="4 4" className="animate-spin-slow origin-center" />
                <text textAnchor="middle" dy="-3" fill="#38bdf8" fontSize="9.5" fontFamily="'JetBrains Mono', monospace" fontWeight="bold">
                  TypeScript
                </text>
                <text textAnchor="middle" dy="11" fill="#a5b4fc" fontSize="8" fontFamily="'JetBrains Mono', monospace">
                  AST TREE
                </text>
              </g>

              {/* AST Node 1: React & RSC */}
              <g transform="translate(70, 80)" className="animate-float-subtle">
                <rect x="-42" y="-18" width="84" height="36" rx="8" fill="#090d16" stroke="#38bdf8" strokeWidth="1.2" filter="url(#tsGlow)" />
                <text textAnchor="middle" dy="3" fill="#38bdf8" fontSize="8.5" fontFamily="'JetBrains Mono', monospace" fontWeight="bold">
                  &lt;React /&gt;
                </text>
                <text textAnchor="middle" dy="12" fill="#94a3b8" fontSize="7" fontFamily="'JetBrains Mono', monospace">
                  RSC 98%
                </text>
              </g>

              {/* AST Node 2: Next.js App Router */}
              <g transform="translate(250, 80)" className="animate-float-subtle" style={{ animationDelay: '0.8s' }}>
                <rect x="-42" y="-18" width="84" height="36" rx="8" fill="#090d16" stroke="#818cf8" strokeWidth="1.2" filter="url(#tsGlow)" />
                <text textAnchor="middle" dy="3" fill="#818cf8" fontSize="8.5" fontFamily="'JetBrains Mono', monospace" fontWeight="bold">
                  ▲ Next.js
                </text>
                <text textAnchor="middle" dy="12" fill="#94a3b8" fontSize="7" fontFamily="'JetBrains Mono', monospace">
                  AppRouter 95%
                </text>
              </g>

              {/* AST Node 3: Generative AI SDK */}
              <g transform="translate(260, 220)" className="animate-float-subtle" style={{ animationDelay: '1.4s' }}>
                <rect x="-42" y="-18" width="84" height="36" rx="8" fill="#090d16" stroke="#34d399" strokeWidth="1.2" filter="url(#tsGlow)" />
                <text textAnchor="middle" dy="3" fill="#34d399" fontSize="8.5" fontFamily="'JetBrains Mono', monospace" fontWeight="bold">
                  ✦ AI SDK
                </text>
                <text textAnchor="middle" dy="12" fill="#94a3b8" fontSize="7" fontFamily="'JetBrains Mono', monospace">
                  Streaming 92%
                </text>
              </g>

              {/* AST Node 4: Web Vitals & Perf */}
              <g transform="translate(60, 220)" className="animate-float-subtle" style={{ animationDelay: '0.4s' }}>
                <rect x="-42" y="-18" width="84" height="36" rx="8" fill="#090d16" stroke="#fbbf24" strokeWidth="1.2" filter="url(#tsGlow)" />
                <text textAnchor="middle" dy="3" fill="#fbbf24" fontSize="8.5" fontFamily="'JetBrains Mono', monospace" fontWeight="bold">
                  🏎 Vitals
                </text>
                <text textAnchor="middle" dy="12" fill="#94a3b8" fontSize="7" fontFamily="'JetBrains Mono', monospace">
                  100/100 LCP
                </text>
              </g>

              {/* AST Node 5: Design Tokens & UI */}
              <g transform="translate(160, 270)" className="animate-float-subtle" style={{ animationDelay: '1.1s' }}>
                <rect x="-48" y="-14" width="96" height="28" rx="6" fill="#090d16" stroke="#c084fc" strokeWidth="1.2" filter="url(#tsGlow)" />
                <text textAnchor="middle" dy="3" fill="#c084fc" fontSize="8.5" fontFamily="'JetBrains Mono', monospace" fontWeight="bold">
                  🎨 Tokens & CSS
                </text>
              </g>
            </svg>
          </div>
          <span className="text-[11px] font-mono text-neutral-400 mt-2">TypeScript AST & Architecture Matrix</span>
        </div>

        {/* Right: Architectural Capabilities Summary */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-200">Senior Architectural Strengths</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-neutral-950/80 border border-neutral-800 space-y-1">
              <div className="font-bold text-neutral-200 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Zero-Bundle RSC Pipelines</span>
              </div>
              <p className="text-[11px] text-neutral-400 leading-relaxed">
                Expertise splitting Server Components from Client islands to eliminate unnecessary JavaScript weight.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-neutral-950/80 border border-neutral-800 space-y-1">
              <div className="font-bold text-neutral-200 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Micro-Frontend Federation</span>
              </div>
              <p className="text-[11px] text-neutral-400 leading-relaxed">
                Decoupled multi-team monorepos using Turborepo and Webpack Module Federation with shared singletons.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-neutral-950/80 border border-neutral-800 space-y-1">
              <div className="font-bold text-neutral-200 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                <span>Generative AI Token Streams</span>
              </div>
              <p className="text-[11px] text-neutral-400 leading-relaxed">
                Real-time HTTP chunked streaming, AST markdown parsing, and zero-shift generative component hydration.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-neutral-950/80 border border-neutral-800 space-y-1">
              <div className="font-bold text-neutral-200 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span>Design System Token Engines</span>
              </div>
              <p className="text-[11px] text-neutral-400 leading-relaxed">
                Accessible Radix headless primitives paired with Tailwind CSS, Storybook documentation, and 100% WCAG AA.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => {
              sound.playClick(650);
              setSelectedCategory(cat);
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
              selectedCategory === cat
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 font-semibold'
                : 'bg-neutral-900/70 border border-neutral-800/80 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSkills.map(skill => (
          <div
            key={skill.name}
            className="p-5 rounded-2xl bg-neutral-900/80 border border-neutral-800/90 hover:border-indigo-500/50 transition-all flex flex-col justify-between group hover:shadow-xl hover:shadow-indigo-500/5 hover:-translate-y-1"
          >
            <div className="space-y-3.5">
              {/* Skill Top Title & Level */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-sm font-bold text-neutral-100 group-hover:text-indigo-300 transition-colors">
                    {skill.name}
                  </h3>
                  <span className="text-[10px] font-mono text-indigo-400">
                    {skill.category}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold font-mono text-emerald-400">{skill.years} yrs exp</span>
                </div>
              </div>

              {/* Animated Progress Bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] font-mono text-neutral-500">
                  <span>Proficiency</span>
                  <span className="text-indigo-300 font-bold">{skill.level}%</span>
                </div>
                <div className="w-full bg-neutral-950 h-2 rounded-full overflow-hidden border border-neutral-800/80">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-400 rounded-full transition-all duration-1000 group-hover:brightness-125"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-neutral-400 leading-relaxed">
                {skill.description}
              </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 pt-4">
              {(skill.tags || []).map(tag => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded text-[10px] font-mono bg-neutral-950 text-neutral-400 border border-neutral-800 group-hover:border-neutral-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
