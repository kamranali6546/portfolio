import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ExternalLink,
  Download,
  Mail,
  Phone,
  Linkedin,
  MessageCircle,
  Copy,
  Check,
  ChevronRight,
  Sparkles,
  ArrowUpRight,
  Code2,
  Cpu,
  Layers,
  Zap,
  Globe,
  Award,
  Calendar,
  Briefcase,
  GraduationCap,
  Eye,
  SlidersHorizontal,
} from 'lucide-react';
import {
  profile,
  projects,
  experience,
  education,
  topPicks,
  type Project,
} from '../data/portfolio';
import { skills as skillCategories } from '../content/skills';
import { usePortrait } from '../hooks/usePortrait';
import PWAInstallButton from './PWAInstallButton';

interface MinimalPortfolioProps {
  onSwitchToSeries: () => void;
  onOpenProject: (p: Project) => void;
  onOpenResume: () => void;
}

export default function MinimalPortfolio({
  onSwitchToSeries,
  onOpenProject,
  onOpenResume,
}: MinimalPortfolioProps) {
  const { src: portraitSrc } = usePortrait();
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'flagship' | 'fintech' | 'growth'>('all');

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2400);
  };

  const filteredProjects = projects.filter((p) => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'flagship') return p.tier === 1;
    if (selectedFilter === 'fintech') return p.genre.toLowerCase().includes('fintech') || p.stack.some(s => s.toLowerCase().includes('payment') || s.toLowerCase().includes('stripe'));
    if (selectedFilter === 'growth') return p.metrics.some(m => m.value.includes('%') || m.value.includes('+'));
    return true;
  });

  return (
    <div className="min-h-screen bg-[#09090d] text-[#e8e6e3] selection:bg-[#ff3d5a]/25 selection:text-white font-sans antialiased">
      {/* Subtle background ambient mesh */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#8FD9BE]/5 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-[#ff3d5a]/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-10 left-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[160px]" />
      </div>

      {/* Copy notification toast */}
      <AnimatePresence>
        {copiedText && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-2 bg-[#1a1a24] border border-[#8FD9BE]/40 text-[#8FD9BE] px-4 py-2 rounded-full text-xs font-mono shadow-2xl backdrop-blur-md"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Copied {copiedText} to clipboard</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Minimal Header */}
      <header className="sticky top-0 z-50 bg-[#09090d]/85 backdrop-blur-md border-b border-white/[0.07]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Brand & Status */}
          <div className="flex items-center gap-3">
            <a href="#top" className="flex items-center gap-2.5 group">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 border border-white/10 font-mono text-sm font-bold text-white group-hover:border-[#ff3d5a]/60 group-hover:text-[#ff3d5a] transition">
                KA
              </span>
              <div>
                <span className="font-semibold text-sm tracking-tight text-white block">Kamran Ali</span>
                <span className="text-[11px] font-mono text-[#a1a1aa] block -mt-0.5">Sr. Frontend Engineer</span>
              </div>
            </a>
            <span className="hidden md:inline-flex items-center gap-1.5 ml-3 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-mono text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Available for hire
            </span>
          </div>

          {/* Nav links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-medium text-[#a1a1aa]">
            <a href="#about" className="hover:text-white transition">About</a>
            <a href="#work" className="hover:text-white transition">Selected Work</a>
            <a href="#experience" className="hover:text-white transition">Experience</a>
            <a href="#skills" className="hover:text-white transition">Tech Stack</a>
            <a href="#contact" className="hover:text-white transition">Contact</a>
          </nav>

          {/* Right Actions: Mode Switch & CV & PWA Install */}
          <div className="flex items-center gap-2.5">
            <PWAInstallButton className="hidden sm:inline-flex" />
            {/* Direct Switch to Cinematic Series */}
            <button
              type="button"
              onClick={onSwitchToSeries}
              className="group flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#ff3d5a]/15 to-[#8FD9BE]/15 border border-white/15 text-xs font-medium text-white hover:border-[#ff3d5a]/50 hover:bg-[#ff3d5a]/20 transition shadow-sm"
              title="Switch to full cinematic series experience"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#ff3d5a] group-hover:rotate-12 transition-transform" />
              <span>Series Mode</span>
              <span className="hidden sm:inline text-[10px] font-mono text-[#ff3d5a] font-bold">▶</span>
            </button>

            <a
              href={profile.resumePdf}
              download="Kamran_Ali_CV.pdf"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-[#a1a1aa] hover:text-white hover:border-white/25 transition"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">CV</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Single-Page Content */}
      <main id="top" className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-20 space-y-24 md:space-y-32">

        {/* 1. HERO SECTION */}
        <section className="grid lg:grid-cols-12 gap-10 md:gap-14 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#8FD9BE]">
              <Cpu className="w-3.5 h-3.5" />
              <span>React & Next.js Architecture · 6+ Years Experience</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-[3.5rem] font-bold tracking-tight text-white leading-[1.08]">
              Building scalable web applications where speed, clean architecture, and modern UX meet.
            </h1>

            <p className="text-base sm:text-lg text-[#a1a1aa] leading-relaxed max-w-2xl">
              I am a Senior Frontend Engineer specialized in architecting production-grade React & Next.js platforms.
              Proven track record delivering <span className="text-white font-medium">+60% organic traffic lifts</span>,
              cutting page load times by <span className="text-white font-medium">45%</span>, and reducing production defects by <span className="text-white font-medium">90%</span>.
            </p>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-2 border-y border-white/[0.08]">
              <div className="p-2.5">
                <div className="text-2xl sm:text-3xl font-bold font-mono text-[#ff3d5a]">6+</div>
                <div className="text-xs text-[#71717a] font-mono mt-0.5">Years Production</div>
              </div>
              <div className="p-2.5">
                <div className="text-2xl sm:text-3xl font-bold font-mono text-[#8FD9BE]">+60%</div>
                <div className="text-xs text-[#71717a] font-mono mt-0.5">Organic Crawl Lift</div>
              </div>
              <div className="p-2.5">
                <div className="text-2xl sm:text-3xl font-bold font-mono text-white">-45%</div>
                <div className="text-xs text-[#71717a] font-mono mt-0.5">Page Load Time</div>
              </div>
              <div className="p-2.5">
                <div className="text-2xl sm:text-3xl font-bold font-mono text-[#C9A56A]">95%</div>
                <div className="text-xs text-[#71717a] font-mono mt-0.5">Client CSAT Score</div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#work"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white text-black font-semibold text-sm hover:bg-neutral-200 transition shadow-lg"
              >
                <span>Explore Work</span>
                <ChevronRight className="w-4 h-4" />
              </a>

              <button
                type="button"
                onClick={onOpenResume}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-sm font-medium text-white hover:bg-white/10 hover:border-white/20 transition"
              >
                <Eye className="w-4 h-4 text-[#8FD9BE]" />
                <span>View Screenplay Resume</span>
              </button>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-transparent text-sm font-medium text-[#a1a1aa] hover:text-white transition"
              >
                <span>Get in Touch</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Portrait & Card */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-sm rounded-2xl overflow-hidden border border-white/15 bg-gradient-to-b from-white/[0.08] to-transparent p-3 shadow-2xl">
              {/* Photo Frame */}
              <div className="relative aspect-[4/5] w-full rounded-xl overflow-hidden bg-black/60">
                <img
                  src={portraitSrc}
                  alt="Kamran Ali - Senior Frontend Developer"
                  className="w-full h-full object-cover object-top filter contrast-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                {/* Bottom Overlay Label */}
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <p className="text-xs font-mono uppercase tracking-wider text-[#8FD9BE]">Senior Frontend Developer</p>
                  <p className="text-lg font-bold text-white">Kamran Ali</p>
                  <p className="text-xs text-[#a1a1aa] mt-0.5">{profile.location}</p>
                </div>
              </div>

              {/* Fast connect pills */}
              <div className="mt-3 grid grid-cols-2 gap-2 text-xs font-mono">
                <a
                  href={profile.links.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[#a1a1aa] hover:text-white transition"
                >
                  <Linkedin className="w-3.5 h-3.5 text-blue-400" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[#a1a1aa] hover:text-white transition"
                >
                  <Mail className="w-3.5 h-3.5 text-[#ff3d5a]" />
                  <span>Email Me</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 2. ABOUT & ENGINEERING PRINCIPLES */}
        <section id="about" className="space-y-10 scroll-mt-24">
          <div className="border-b border-white/[0.08] pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#8FD9BE]">Foundation & Philosophy</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">About Kamran Ali</h2>
            </div>
            <p className="text-xs font-mono text-[#71717a]">B.S. Computer Science · 2015 – 2019</p>
          </div>

          <div className="grid md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-5 space-y-4 text-sm sm:text-base text-[#a1a1aa] leading-relaxed">
              <p>
                With over six years of focused engineering across European and international companies, I specialize in building client portals, customer booking engines, and performant web systems using modern React, Next.js, and TypeScript.
              </p>
              <p>
                I hold a <strong className="text-white">Bachelor of Computer Science from Lahore Garrison University</strong> (2015–2019), bridging deep fundamental computer science with cutting-edge web performance and design systems.
              </p>
              <div className="pt-2">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                  <GraduationCap className="w-5 h-5 text-[#C9A56A] shrink-0" />
                  <div className="text-xs">
                    <p className="font-semibold text-white">Lahore Garrison University</p>
                    <p className="text-[#71717a]">Bachelor of Computer Science (2015 – 2019)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 4 Core Pillars Grid */}
            <div className="md:col-span-7 grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] space-y-2">
                <div className="w-8 h-8 rounded-lg bg-[#8FD9BE]/10 border border-[#8FD9BE]/20 flex items-center justify-center text-[#8FD9BE]">
                  <Zap className="w-4 h-4" />
                </div>
                <h3 className="font-semibold text-white text-sm">Performance & SSR</h3>
                <p className="text-xs text-[#a1a1aa] leading-relaxed">
                  Next.js App Router, SSR, edge caching, code-splitting, and asset pipelines cutting load times by 45%.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] space-y-2">
                <div className="w-8 h-8 rounded-lg bg-[#4cc9ff]/10 border border-[#4cc9ff]/20 flex items-center justify-center text-[#4cc9ff]">
                  <Code2 className="w-4 h-4" />
                </div>
                <h3 className="font-semibold text-white text-sm">Strict TypeScript</h3>
                <p className="text-xs text-[#a1a1aa] leading-relaxed">
                  Zero implicit any, robust interface definitions, and typed state management reducing 90% of bugs.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] space-y-2">
                <div className="w-8 h-8 rounded-lg bg-[#ff3d5a]/10 border border-[#ff3d5a]/20 flex items-center justify-center text-[#ff3d5a]">
                  <Layers className="w-4 h-4" />
                </div>
                <h3 className="font-semibold text-white text-sm">60fps Motion UI</h3>
                <p className="text-xs text-[#a1a1aa] leading-relaxed">
                  Hardware-accelerated animations with Framer Motion & GSAP that elevate design while respecting reduced-motion.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] space-y-2">
                <div className="w-8 h-8 rounded-lg bg-[#C9A56A]/10 border border-[#C9A56A]/20 flex items-center justify-center text-[#C9A56A]">
                  <Cpu className="w-4 h-4" />
                </div>
                <h3 className="font-semibold text-white text-sm">AI Acceleration</h3>
                <p className="text-xs text-[#a1a1aa] leading-relaxed">
                  Leveraging modern AI tooling (Cursor, Claude, Copilot, v0) to accelerate feature delivery with full code ownership.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. SELECTED WORK / PROJECTS */}
        <section id="work" className="space-y-8 scroll-mt-24">
          <div className="border-b border-white/[0.08] pb-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#ff3d5a]">Production Systems</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">Selected Projects & Originals</h2>
              <p className="text-sm text-[#a1a1aa] mt-1">Live customer portals, SaaS engines, and enterprise web applications.</p>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-lg bg-white/5 border border-white/10 self-start md:self-auto">
              <button
                type="button"
                onClick={() => setSelectedFilter('all')}
                className={`px-3 py-1 rounded-md text-xs font-mono transition ${
                  selectedFilter === 'all' ? 'bg-white/15 text-white font-semibold' : 'text-[#a1a1aa] hover:text-white'
                }`}
              >
                All ({projects.length})
              </button>
              <button
                type="button"
                onClick={() => setSelectedFilter('flagship')}
                className={`px-3 py-1 rounded-md text-xs font-mono transition ${
                  selectedFilter === 'flagship' ? 'bg-white/15 text-white font-semibold' : 'text-[#a1a1aa] hover:text-white'
                }`}
              >
                Flagship Tier 1
              </button>
              <button
                type="button"
                onClick={() => setSelectedFilter('fintech')}
                className={`px-3 py-1 rounded-md text-xs font-mono transition ${
                  selectedFilter === 'fintech' ? 'bg-white/15 text-white font-semibold' : 'text-[#a1a1aa] hover:text-white'
                }`}
              >
                Fintech & Payments
              </button>
              <button
                type="button"
                onClick={() => setSelectedFilter('growth')}
                className={`px-3 py-1 rounded-md text-xs font-mono transition ${
                  selectedFilter === 'growth' ? 'bg-white/15 text-white font-semibold' : 'text-[#a1a1aa] hover:text-white'
                }`}
              >
                Verified Growth
              </button>
            </div>
          </div>

          {/* Clean Grid of Projects */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((p, idx) => (
              <div
                key={p.id}
                className="group relative flex flex-col justify-between rounded-xl bg-[#111116] border border-white/[0.08] hover:border-white/25 transition-all duration-300 p-5 hover:shadow-xl hover:-translate-y-1"
              >
                <div>
                  {/* Top Bar: Year & Genre */}
                  <div className="flex items-center justify-between text-xs font-mono text-[#71717a] mb-3">
                    <span className="uppercase text-[#8FD9BE] font-semibold">{p.genre}</span>
                    <span>{p.year}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white group-hover:text-[#8FD9BE] transition-colors flex items-center justify-between">
                    <span>{p.title}</span>
                    <span className="text-xs font-mono px-1.5 py-0.5 rounded bg-white/5 text-[#71717a]">#{idx + 1}</span>
                  </h3>

                  {/* Logline */}
                  <p className="text-xs sm:text-sm text-[#a1a1aa] mt-2 leading-relaxed line-clamp-3">
                    {p.logline}
                  </p>

                  {/* Verified Metrics Badge */}
                  {p.metrics && p.metrics[0] && (
                    <div className="mt-3.5 inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#ff3d5a]/10 border border-[#ff3d5a]/20 text-[11px] font-mono text-[#ff3d5a]">
                      <span className="font-bold">{p.metrics[0].value}</span>
                      <span className="text-[#a1a1aa]">{p.metrics[0].label}</span>
                    </div>
                  )}

                  {/* Tech stack */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {p.stack.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded bg-white/5 text-[11px] font-mono text-[#d4d4d8] border border-white/5"
                      >
                        {tech}
                      </span>
                    ))}
                    {p.stack.length > 4 && (
                      <span className="px-1.5 py-0.5 text-[10px] font-mono text-[#71717a]">
                        +{p.stack.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => onOpenProject(p)}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-white hover:text-[#8FD9BE] transition"
                  >
                    <span>View Architecture</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  {p.url && (
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-xs font-mono text-[#a1a1aa] hover:text-white transition"
                    >
                      <span>Live Site</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. CAREER TIMELINE / EXPERIENCE */}
        <section id="experience" className="space-y-10 scroll-mt-24">
          <div className="border-b border-white/[0.08] pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#4cc9ff]">Chronological Track Record</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">Work Experience</h2>
            </div>
            <p className="text-xs font-mono text-[#71717a]">4 Roles · Progressive Leadership</p>
          </div>

          <div className="relative pl-6 sm:pl-8 border-l border-white/10 space-y-10">
            {experience.map((exp, idx) => (
              <div key={exp.company} className="relative group">
                {/* Timeline node */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 h-4 w-4 rounded-full bg-[#09090d] border-2 border-[#4cc9ff] group-hover:scale-125 transition-transform" />

                <div className="space-y-2">
                  <div className="flex flex-wrap items-baseline gap-2 sm:gap-4">
                    <h3 className="text-lg sm:text-xl font-bold text-white">{exp.role}</h3>
                    <span className="text-sm font-semibold text-[#8FD9BE]">{exp.company}</span>
                    <span className="text-xs font-mono text-[#71717a] ml-auto">{exp.period}</span>
                  </div>

                  <p className="text-xs font-mono text-[#a1a1aa]">{exp.place}</p>

                  <ul className="mt-3 space-y-1.5 text-xs sm:text-sm text-[#a1a1aa]">
                    {exp.points.map((point, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2">
                        <span className="text-[#4cc9ff] font-bold">›</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. TECHNICAL STACK & SKILLS CATEGORIES */}
        <section id="skills" className="space-y-10 scroll-mt-24">
          <div className="border-b border-white/[0.08] pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#C9A56A]">Technical Specifications</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">Skills & Toolchain</h2>
            </div>
            <p className="text-xs font-mono text-[#71717a]">8 Categories · Production Proven</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {skillCategories.map((cat) => (
              <div
                key={cat.id}
                className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.07] hover:border-white/20 transition flex flex-col justify-between"
              >
                <div>
                  <h3 className="font-semibold text-white text-sm mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8FD9BE]" />
                    <span>{cat.name}</span>
                  </h3>

                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {cat.items.map((item) => (
                      <span
                        key={item}
                        className="px-2 py-0.5 rounded bg-white/5 text-[11px] font-mono text-[#d4d4d8]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="text-[11px] text-[#71717a] leading-relaxed pt-2 border-t border-white/[0.04]">
                  {cat.howIUseIt}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 6. VERIFIED IMPACT HIGHLIGHTS */}
        <section className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-white/[0.04] to-transparent border border-white/10 space-y-6">
          <div className="flex items-center gap-2 text-xs font-mono text-[#ff3d5a] uppercase tracking-wider">
            <Award className="w-4 h-4" />
            <span>Key Career Milestones & Metrics</span>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {topPicks.slice(0, 6).map((pick) => (
              <div key={pick.title} className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-1">
                <span className="text-[10px] font-mono uppercase text-[#71717a]">{pick.label}</span>
                <p className="font-bold text-white text-base">{pick.title}</p>
                <p className="text-xs text-[#a1a1aa]">{pick.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 7. CONTACT & GET IN TOUCH */}
        <section id="contact" className="space-y-8 scroll-mt-24">
          <div className="border-b border-white/[0.08] pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#8FD9BE]">Let&apos;s Build Together</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">Get in Touch</h2>
            </div>
            <p className="text-xs font-mono text-[#71717a]">Relocation & Remote Available</p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {/* Email Card */}
            <div className="p-5 rounded-xl bg-white/[0.03] border border-white/[0.08] space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-lg bg-[#ff3d5a]/10 text-[#ff3d5a] flex items-center justify-center">
                  <Mail className="w-4 h-4" />
                </div>
                <button
                  type="button"
                  onClick={() => copyToClipboard(profile.email, 'email')}
                  className="p-1.5 rounded-md hover:bg-white/10 text-[#71717a] hover:text-white transition"
                  title="Copy email"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
              <div>
                <p className="text-xs font-mono text-[#71717a]">Direct Email</p>
                <a href={`mailto:${profile.email}`} className="text-sm font-semibold text-white hover:text-[#ff3d5a] transition">
                  {profile.email}
                </a>
              </div>
            </div>

            {/* WhatsApp / Phone Card */}
            <div className="p-5 rounded-xl bg-white/[0.03] border border-white/[0.08] space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-lg bg-[#8FD9BE]/10 text-[#8FD9BE] flex items-center justify-center">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <button
                  type="button"
                  onClick={() => copyToClipboard(profile.primaryPhone, 'phone')}
                  className="p-1.5 rounded-md hover:bg-white/10 text-[#71717a] hover:text-white transition"
                  title="Copy phone"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
              <div>
                <p className="text-xs font-mono text-[#71717a]">Phone / WhatsApp</p>
                <div className="space-y-0.5">
                  <a href={profile.links.whatsapp} target="_blank" rel="noreferrer" className="block text-sm font-semibold text-white hover:text-[#8FD9BE] transition">
                    {profile.whatsappNumber} (WA)
                  </a>
                  <a href={`tel:${profile.primaryPhone}`} className="block text-xs font-mono text-[#a1a1aa] hover:text-white transition">
                    {profile.primaryPhone}
                  </a>
                </div>
              </div>
            </div>

            {/* LinkedIn & Resume */}
            <div className="p-5 rounded-xl bg-white/[0.03] border border-white/[0.08] space-y-3">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
                <Linkedin className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-mono text-[#71717a]">Professional Network</p>
                <a
                  href={profile.links.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-semibold text-white hover:text-blue-400 transition flex items-center gap-1"
                >
                  <span>Connect on LinkedIn</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 8. SERIES PROMOTION BANNER */}
        <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#180a12] via-[#0d141b] to-[#0a1813] border border-white/15 p-6 sm:p-10 shadow-2xl">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#ff3d5a]/20 border border-[#ff3d5a]/30 text-[11px] font-mono text-[#ff3d5a]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Alternate Experience</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">Experience The Series Edition</h3>
              <p className="text-xs sm:text-sm text-[#a1a1aa] leading-relaxed">
                Reimagined as an interactive streaming platform with Netflix-style series seasons, dynamic viewer profiles (Recruiter, Developer, Creative), and cinematic audio choreography.
              </p>
            </div>

            <button
              type="button"
              onClick={onSwitchToSeries}
              className="self-start md:self-center shrink-0 flex items-center gap-3 px-6 py-3.5 rounded-full bg-white text-black font-bold text-sm hover:bg-neutral-200 transition shadow-xl hover:scale-105 active:scale-95"
            >
              <span>Enter Series Mode</span>
              <span className="text-[#ff3d5a] text-base">▶</span>
            </button>
          </div>
        </section>
      </main>

      {/* Minimal Footer */}
      <footer className="border-t border-white/[0.08] mt-24 py-10 text-center text-xs font-mono text-[#71717a]">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Kamran Ali. Built with React, Next.js architecture, and Tailwind CSS.</p>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={onSwitchToSeries}
              className="text-[#8FD9BE] hover:underline"
            >
              Switch to Series
            </button>
            <span>·</span>
            <a href="#top" className="hover:text-white transition">
              Back to top ↑
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
