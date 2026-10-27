import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Check,
  Share2,
  Trophy,
  Globe,
  Briefcase,
  Layers,
  Calendar,
} from 'lucide-react';
import type { Project } from '../data/portfolio';
import { projects } from '../data/portfolio';
import { originalDeepDives } from '../data/originalDetails';
import { EASE } from './fx';
import { CsrVsSsrDiagram } from './case-studies/diagrams/CsrVsSsrDiagram';
import { PaymentFlowDiagram } from './case-studies/diagrams/PaymentFlowDiagram';
import { PortalArchitectureDiagram } from './case-studies/diagrams/PortalArchitectureDiagram';

interface OriginalDetailPageProps {
  project: Project;
  onBack: () => void;
  onSelectProject: (p: Project) => void;
  previousMode?: 'series' | 'minimal';
}

export default function OriginalDetailPage({
  project,
  onBack,
  onSelectProject,
  previousMode = 'series',
}: OriginalDetailPageProps) {
  const [copied, setCopied] = useState(false);
  const deepDive = originalDeepDives[project.id];

  const currentIndex = projects.findIndex((p) => p.id === project.id);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : projects[projects.length - 1];
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : projects[0];

  const accent = project.palette.accent || '#8FD9BE';

  // Smooth scroll to top on project load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [project.id]);

  // Keyboard navigation: Escape to exit, Left/Right arrows to cycle
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onBack();
      if (e.key === 'ArrowLeft') onSelectProject(prevProject);
      if (e.key === 'ArrowRight') onSelectProject(nextProject);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onBack, onSelectProject, prevProject, nextProject]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const projectNum = deepDive?.num || String(currentIndex + 1).padStart(2, '0');
  const projectSubtitle = deepDive?.subtitle || project.genre;
  const projectRole = deepDive?.role || 'Senior Frontend Developer';
  const projectType = deepDive?.projectType || project.genre;
  const projectOverview = deepDive?.overview || project.logline;
  const projectChallenge = deepDive?.challenge || 'High performance and architectural challenges.';
  const technicalSolutions = deepDive?.technicalSolutions || project.build.map((b, i) => ({
    number: i + 1,
    title: `Phase ${i + 1}`,
    description: b,
  }));
  const keyDecisions = deepDive?.keyDecisions || project.features;
  const outcomes = deepDive?.outcome || project.metrics.map((m) => `${m.value} ${m.label}`);
  const coreAchievement = deepDive?.coreAchievement || project.build[0] || 'Engineered high-performance production frontend.';
  const techTags = deepDive?.techTags || project.stack;

  const cleanDomain = project.url ? project.url.replace(/^https?:\/\//, '').replace(/\/$/, '') : '';

  return (
    <div className="min-h-screen bg-[#07070a] text-[#f4f1ec] selection:bg-[#ff3d5a]/25 selection:text-white font-sans antialiased">
      {/* Top sticky navigation bar */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#07070a]/90 border-b border-white/[0.08]">
        <div className="max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 h-16 flex items-center justify-between gap-4">
          {/* Back button */}
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-mono text-[#a7a6ad] hover:text-[#f4f1ec] transition-colors focus:outline-none"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#ff3d5a]" aria-hidden="true" />
            <span>Back to {previousMode === 'minimal' ? 'Portfolio' : 'Series'} (Esc)</span>
          </button>

          {/* Episode cycle tracker */}
          <div className="flex items-center gap-2 text-xs font-mono text-[#a7a6ad]">
            <button
              type="button"
              onClick={() => onSelectProject(prevProject)}
              className="p-1.5 rounded hover:bg-white/10 hover:text-white transition"
              title={`Previous: ${prevProject.title}`}
              aria-label="Previous Original"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>

            <span className="text-white/40">ORIGINAL</span>
            <span className="font-bold text-[#f4f1ec]">{projectNum}</span>
            <span className="text-white/30">/</span>
            <span className="text-white/60">{String(projects.length).padStart(2, '0')}</span>

            <button
              type="button"
              onClick={() => onSelectProject(nextProject)}
              className="p-1.5 rounded hover:bg-white/10 hover:text-white transition"
              title={`Next: ${nextProject.title}`}
              aria-label="Next Original"
            >
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleShare}
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono text-[#a7a6ad] hover:text-white transition"
              title="Copy share link"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Share'}</span>
            </button>

            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-xs font-mono font-medium text-white transition hover:opacity-90"
                style={{ backgroundColor: accent, color: '#07070a' }}
              >
                <span>Live Site</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>
      </header>

      {/* Main Case Study Article (Wider Editorial Publication Layout) */}
      <article className="max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-8 lg:py-12 space-y-16">
        {/* Hero Banner with Project Poster in the Background */}
        <section className="relative rounded-2xl overflow-hidden border border-white/[0.12] bg-[#0c0c12] min-h-[420px] sm:min-h-[500px] lg:min-h-[540px] flex flex-col justify-end p-6 sm:p-10 lg:p-12 shadow-2xl">
          {/* Background Poster Image & High-Contrast Gradient Layers */}
          {project.posterImage && (
            <div className="absolute inset-0 z-0">
              <img
                src={project.posterImage}
                alt={`${project.title} Production Showcase`}
                className="w-full h-full object-cover object-top filter brightness-[0.7] contrast-[1.1]"
              />
              {/* Multi-angle gradients for readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#07070a] via-[#07070a]/85 to-[#07070a]/40" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#07070a]/95 via-[#07070a]/75 to-transparent" />
              <div className="absolute inset-0 bg-black/25" />
            </div>
          )}

          {/* Banner Content Layer */}
          <div className="relative z-10 space-y-4 sm:space-y-6 max-w-4xl">
            {/* Tagline / Series Identifier */}
            <div className="flex flex-wrap items-center gap-3">
              <span
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full font-mono text-xs font-semibold tracking-wider uppercase bg-black/60 border border-white/15 backdrop-blur-md"
                style={{ color: accent }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accent }} />
                CASE STUDY · ORIGINAL {projectNum}
              </span>
              <span className="hidden sm:inline-block h-[1px] w-8 bg-white/20" aria-hidden="true" />
              <span className="text-xs font-mono text-[#d4d1cb] uppercase tracking-widest bg-black/40 px-2.5 py-1 rounded border border-white/10 backdrop-blur-sm">
                {projectType}
              </span>
            </div>

            {/* Title */}
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl xl:text-8xl tracking-wide text-[#f4f1ec] leading-[0.92] drop-shadow-xl">
              {project.title}
            </h1>

            {/* Subtitle / Quote */}
            <p className="font-serif text-lg sm:text-2xl lg:text-3xl text-[#e8e5df] italic leading-relaxed max-w-3xl drop-shadow-md">
              &ldquo;{projectSubtitle}&rdquo;
            </p>

            {/* Metadata & Direct Links */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/15">
              <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[#c4c3cb]">
                <span className="font-semibold text-white">Role: {projectRole}</span>
                <span aria-hidden="true" className="text-white/30">·</span>
                <span>Year: {project.year}</span>
                <span aria-hidden="true" className="text-white/30">·</span>
                <span className="inline-flex items-center gap-1.5 text-emerald-400 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Verified Production
                </span>
              </div>

              <div className="flex items-center gap-3">
                {cleanDomain && (
                  <span className="hidden md:inline-flex items-center gap-1.5 text-xs font-mono text-white/80 px-3 py-1.5 rounded bg-black/50 border border-white/15 backdrop-blur-sm">
                    <Globe className="w-3.5 h-3.5 text-[#a7a6ad]" />
                    {cleanDomain}
                  </span>
                )}
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-xs font-mono font-medium transition hover:brightness-110 shadow-lg"
                    style={{ backgroundColor: accent, color: '#07070a' }}
                  >
                    <span>Visit Live Site</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Section 01: Project Overview */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-[#a7a6ad] tracking-wider uppercase">
            <span>01 / Project Overview</span>
          </div>
          <p className="text-base sm:text-lg text-[#f4f1ec] font-sans leading-relaxed">
            {projectOverview}
          </p>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3.5 rounded-lg bg-white/[0.02] border border-white/5 space-y-1">
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#6d6c75] uppercase">
                <Globe className="w-3.5 h-3.5" />
                <span>Website</span>
              </div>
              <p className="text-xs font-mono text-white truncate">{cleanDomain || 'Private Platform'}</p>
            </div>
            <div className="p-3.5 rounded-lg bg-white/[0.02] border border-white/5 space-y-1">
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#6d6c75] uppercase">
                <Briefcase className="w-3.5 h-3.5" />
                <span>Project Type</span>
              </div>
              <p className="text-xs font-mono text-white truncate">{projectType}</p>
            </div>
            <div className="p-3.5 rounded-lg bg-white/[0.02] border border-white/5 space-y-1">
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#6d6c75] uppercase">
                <Calendar className="w-3.5 h-3.5" />
                <span>Role</span>
              </div>
              <p className="text-xs font-mono text-white truncate">{projectRole}</p>
            </div>
          </div>
        </section>

        {/* Section 02: The Challenge */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-[#a7a6ad] tracking-wider uppercase">
            <span>02 / The Challenge</span>
          </div>
          <div className="p-6 rounded-lg border border-white/[0.08] bg-white/[0.015]">
            <p className="text-base text-[#f4f1ec]/90 leading-relaxed font-sans">
              {projectChallenge}
            </p>
          </div>
        </section>

        {/* Section 03: Technical Solution */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 text-xs font-mono text-[#a7a6ad] tracking-wider uppercase">
            <span>03 / Technical Solution</span>
          </div>

          <div className="space-y-4">
            {technicalSolutions.map((sol) => (
              <div
                key={sol.number}
                className="p-6 rounded-lg border border-white/[0.08] bg-white/[0.02] space-y-2.5"
              >
                <div className="flex items-baseline justify-between">
                  <h3 className="font-serif text-lg font-medium text-[#f4f1ec]">
                    {sol.number}. {sol.title}
                  </h3>
                  <span className="font-mono text-xs font-bold" style={{ color: accent }}>
                    Solution 0{sol.number}
                  </span>
                </div>
                <p className="text-sm sm:text-base text-[#a7a6ad] leading-relaxed font-sans">
                  {sol.description}
                </p>
              </div>
            ))}
          </div>

          {/* Interactive Architecture Diagram (if available) */}
          {project.diagramType && (
            <div className="pt-4 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-[#a7a6ad] uppercase tracking-wider">
                <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: accent }} />
                <span>Interactive Architecture Diagram</span>
              </div>

              <div className="rounded-xl border border-white/[0.08] bg-[#0c0c12] p-5 sm:p-6 shadow-2xl">
                {project.diagramType === 'csr-vs-ssr' && <CsrVsSsrDiagram />}
                {project.diagramType === 'payment-flow' && <PaymentFlowDiagram />}
                {project.diagramType === 'portal-architecture' && <PortalArchitectureDiagram />}
              </div>
            </div>
          )}
        </section>

        {/* Section 04: Key Engineering Decisions */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 text-xs font-mono text-[#a7a6ad] tracking-wider uppercase">
            <span>04 / Key Engineering Decisions</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {keyDecisions.map((decision, idx) => (
              <div
                key={idx}
                className="p-5 sm:p-6 rounded-lg border border-white/[0.08] bg-white/[0.02] space-y-2"
              >
                <div className="flex items-baseline justify-between">
                  <h3 className="font-serif text-base sm:text-lg font-medium text-[#f4f1ec]">
                    Decision 0{idx + 1}
                  </h3>
                  <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: accent }} />
                </div>
                <p className="text-sm text-[#a7a6ad] leading-relaxed font-sans">
                  {decision}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 05: Outcome & Core Technical Achievement */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 text-xs font-mono text-[#a7a6ad] tracking-wider uppercase">
            <span>05 / Outcome &amp; Impact</span>
          </div>

          {/* Verified Outcomes List */}
          <div className="p-6 rounded-lg border border-white/[0.08] bg-white/[0.02] space-y-3">
            {outcomes.map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                <span className="text-sm sm:text-base text-[#f4f1ec]/90 leading-relaxed font-sans">
                  {item}
                </span>
              </div>
            ))}
          </div>

          {/* Core Technical Achievement Banner */}
          <div
            className="p-6 sm:p-7 rounded-lg border space-y-2"
            style={{
              borderColor: `${accent}40`,
              backgroundColor: 'rgba(255,255,255,0.02)',
            }}
          >
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider" style={{ color: accent }}>
              <Trophy className="w-4 h-4" />
              <span>Core Technical Achievement</span>
            </div>
            <p className="text-base sm:text-lg font-bold text-white leading-relaxed">
              {coreAchievement}
            </p>
          </div>
        </section>

        {/* Section 06: Production Key Metrics & Verified Performance */}
        {project.metrics && project.metrics.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-[#a7a6ad] tracking-wider uppercase">
              <span>06 / Production Key Metrics &amp; Verified Performance</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {project.metrics.map((m) => (
                <div
                  key={m.label}
                  className="p-5 rounded-lg border border-white/[0.08] bg-white/[0.02] space-y-1 text-left"
                >
                  <div
                    className="font-mono text-2xl sm:text-3xl font-bold tracking-tight"
                    style={{ color: m.value === 'N/A' ? '#71717a' : accent }}
                  >
                    {m.value}
                  </div>
                  <div className="text-xs font-mono text-[#a7a6ad] leading-snug">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section 07: Stack & Tooling (Unboxed text) */}
        <section className="space-y-4 pt-4 border-t border-white/[0.08]">
          <div className="flex items-center gap-2 text-xs font-mono text-[#a7a6ad] tracking-wider uppercase">
            <span>07 / Stack &amp; Tooling</span>
          </div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-[#f4f1ec] font-mono font-medium">
            {techTags.map((tech, idx) => (
              <React.Fragment key={tech}>
                <span>{tech}</span>
                {idx < techTags.length - 1 && (
                  <span className="text-white/20 select-none" aria-hidden="true">
                    /
                  </span>
                )}
              </React.Fragment>
            ))}
          </div>
        </section>

        {/* Section 08: Next and Previous Navigation Footer */}
        <footer className="pt-10 border-t border-white/[0.08] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => onSelectProject(prevProject)}
            className="p-4 sm:p-5 rounded-lg border border-white/[0.08] hover:border-white/20 bg-white/[0.02] text-left group transition-all flex-1"
          >
            <div className="flex items-center gap-1.5 text-xs font-mono text-[#a7a6ad] group-hover:text-white mb-1">
              <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Previous Project</span>
            </div>
            <div className="font-serif text-lg text-[#f4f1ec] font-medium group-hover:text-[#ff3d5a] transition-colors">
              {prevProject.title}
            </div>
          </button>

          <button
            type="button"
            onClick={() => onSelectProject(nextProject)}
            className="p-4 sm:p-5 rounded-lg border border-white/[0.08] hover:border-white/20 bg-white/[0.02] text-right group transition-all flex-1"
          >
            <div className="flex items-center justify-end gap-1.5 text-xs font-mono text-[#a7a6ad] group-hover:text-white mb-1">
              <span>Next Project</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </div>
            <div className="font-serif text-lg text-[#f4f1ec] font-medium group-hover:text-[#ff3d5a] transition-colors">
              {nextProject.title}
            </div>
          </button>
        </footer>
      </article>
    </div>
  );
}
