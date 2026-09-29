import React, { useState } from 'react';
import {
  HERO_DATA,
  FOUNDATION_SENTENCE,
  LEDGER_METRICS,
  ARCHIVE_EXPERIENCES,
  SKILL_CATEGORIES,
  LEADERSHIP_PRINCIPLES,
  EDUCATION_TIMELINE,
  CONTACT_INFO,
  CHAPTERS,
  PROJECTS,
} from '../data/portfolioData';
import {
  MapPin,
  Mail,
  Phone,
  Copy,
  Check,
  Sparkles,
  ArrowUpRight,
  ChevronRight,
  Layers,
  Compass,
  ExternalLink,
  Globe,
} from 'lucide-react';

interface StructuredReadViewProps {
  onSwitchTo3D: () => void;
  supportsWebGL: boolean;
}

export const StructuredReadView: React.FC<StructuredReadViewProps> = ({
  onSwitchTo3D,
  supportsWebGL,
}) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [expandedRole, setExpandedRole] = useState<string>('exion');
  const [projectFilter, setProjectFilter] = useState<string>('All');

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(CONTACT_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  return (
    <div className="relative z-10 mx-auto max-w-5xl px-6 pt-28 pb-32">
      {/* 3D Mode Available Banner / Prompt if user device supports WebGL */}
      {supportsWebGL && (
        <div className="mb-14 rounded-2xl border border-amber-500/30 bg-amber-950/20 p-4 sm:p-5 backdrop-blur-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Compass className="h-5 w-5 text-amber-400 shrink-0" />
            <div>
              <div className="font-display text-sm font-semibold text-white">
                Continuous 3D Spatial Walkthrough Available
              </div>
              <div className="text-xs text-slate-400">
                Walk through this portfolio as an architectural corridor along a spline path with spatial lighting.
              </div>
            </div>
          </div>
          <button
            onClick={onSwitchTo3D}
            className="rounded-lg bg-amber-500 px-4 py-2 text-xs font-mono font-semibold uppercase tracking-wider text-slate-950 transition-colors hover:bg-amber-400 shrink-0"
          >
            Launch 3D Corridor
          </button>
        </div>
      )}

      {/* CHAPTER 1: THRESHOLD — HERO */}
      <section id="threshold" className="py-16 sm:py-24 border-b border-white/[0.08]">
        {/* Zero-Pill unboxed metadata */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400 mb-6">
          <span className="text-amber-500 flex items-center gap-1.5 font-medium">
            <MapPin className="h-3.5 w-3.5" />
            {HERO_DATA.location}
          </span>
          <span aria-hidden="true">·</span>
          <span>{HERO_DATA.origin}</span>
          <span aria-hidden="true">·</span>
          <span className="text-amber-300/90">{HERO_DATA.status}</span>
        </div>

        <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white">
          {HERO_DATA.name}
        </h1>

        <div className="mt-3 font-display text-2xl sm:text-3xl font-medium text-slate-300">
          {HERO_DATA.title}
        </div>

        <p className="mt-6 max-w-3xl text-base sm:text-lg text-slate-400 leading-relaxed">
          {HERO_DATA.tagline}. Senior Frontend Developer with 6+ years architecting high-performance, large-scale web applications — from component-driven frontend architecture and micro-frontend strategies to scalable enterprise design systems using React.js, Next.js, and TypeScript.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href={`mailto:${CONTACT_INFO.email}`}
            className="flex items-center gap-2 rounded-xl bg-amber-500 px-5 py-3 text-sm font-semibold text-slate-950 transition-all hover:bg-amber-400 shadow-lg shadow-amber-500/20"
          >
            <Mail className="h-4 w-4" />
            <span>Initiate Dialogue</span>
          </a>
          <button
            onClick={handleCopyEmail}
            className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-mono text-white transition-all hover:bg-white/[0.08]"
          >
            {copiedEmail ? (
              <>
                <Check className="h-4 w-4 text-emerald-400" />
                <span className="text-emerald-400">Copied {CONTACT_INFO.email}</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                <span>{CONTACT_INFO.email}</span>
              </>
            )}
          </button>
        </div>
      </section>

      {/* CHAPTER 2: THE FOUNDATION — CORE THESIS */}
      <section id="foundation" className="py-20 border-b border-white/[0.08]">
        <div className="text-xs font-mono uppercase tracking-widest text-amber-500 mb-2">
          02 · The Foundation · Silicon Wafer & CPU Die
        </div>
        <div className="rounded-2xl border border-white/10 bg-[#0c0c12] p-8 sm:p-12 shadow-xl">
          <blockquote className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold leading-snug tracking-tight text-white">
            "{FOUNDATION_SENTENCE}"
          </blockquote>
          <p className="mt-6 text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
            Focus is now actively shifting toward the convergence of frontend architecture and artificial intelligence — building AI-assisted development workflows, autonomous agents, and intelligent, adaptive interfaces that define next-generation digital products.
          </p>
        </div>
      </section>

      {/* CHAPTER 3: THE LEDGER — IMPACT METRICS */}
      <section id="ledger" className="py-20 border-b border-white/[0.08]">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-10">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-amber-500">
              03 · The Ledger · Hardware Telemetry Towers
            </div>
            <h2 className="mt-1 font-display text-3xl font-bold tracking-tight text-white">
              Verified Production Impact
            </h2>
          </div>
          <div className="text-xs font-mono text-slate-400">
            Real empirical outcomes from engineering engagements
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {LEDGER_METRICS.map((metric) => (
            <div
              key={metric.id}
              className="rounded-2xl border border-white/10 bg-[#0c0c12] p-6 hover:border-amber-500/40 transition-colors"
            >
              <div className="font-mono text-4xl sm:text-5xl font-extrabold tabular-nums tracking-tight text-amber-500">
                {metric.value}
              </div>
              <div className="mt-2 font-display text-base font-semibold text-white">
                {metric.label}
              </div>
              <div className="mt-1 text-xs text-slate-400 leading-relaxed">
                {metric.subtext}
              </div>
              <div className="mt-4 pt-3 border-t border-white/[0.08] text-xs font-mono text-slate-400">
                {metric.context}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CHAPTER 4: THE ARCHIVE — PROFESSIONAL EXPERIENCE */}
      <section id="archive" className="py-20 border-b border-white/[0.08]">
        <div className="mb-10">
          <div className="text-xs font-mono uppercase tracking-widest text-amber-500">
            04 · The Archive · Tech Company & Engineering Teams
          </div>
          <h2 className="mt-1 font-display text-3xl font-bold tracking-tight text-white">
            Engineering Roles & Proven Track Record
          </h2>
        </div>

        <div className="space-y-6">
          {ARCHIVE_EXPERIENCES.map((exp) => {
            const isExpanded = expandedRole === exp.id;

            return (
              <div
                key={exp.id}
                className={`rounded-2xl border transition-all duration-300 ${
                  isExpanded
                    ? 'border-amber-500/50 bg-[#0c0c14]'
                    : 'border-white/10 bg-[#0a0a0f] hover:border-white/20'
                }`}
              >
                <div>
                  <button
                    onClick={() => setExpandedRole(isExpanded ? '' : exp.id)}
                    className="w-full p-6 text-left flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-display text-xl font-bold text-white">
                          {exp.company}
                        </span>
                        <span className="text-slate-500">·</span>
                        <span className="font-mono text-xs text-amber-400">
                          {exp.location}
                        </span>
                      </div>
                      <div className="mt-1 text-sm font-medium text-slate-300">
                        {exp.role}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-slate-400">
                        {exp.period} ({exp.duration})
                      </span>
                      <ChevronRight
                        className={`h-4 w-4 text-slate-400 transition-transform ${
                          isExpanded ? 'rotate-90 text-amber-400' : ''
                        }`}
                      />
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="px-6 pb-6 pt-2 border-t border-white/[0.08]">
                      <ul className="space-y-3 text-sm text-slate-300">
                        {exp.highlights.map((h, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-amber-500 shrink-0" />
                            <span className="leading-relaxed">{h}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-6 flex flex-wrap gap-2 pt-4 border-t border-white/[0.06]">
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-md bg-white/[0.05] px-2.5 py-1 font-mono text-xs text-slate-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SELECTED PRODUCTION PROJECTS & CLIENT ENGAGEMENTS */}
      <section id="projects" className="py-20 border-b border-white/[0.08]">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-amber-500">
              04B · Client Engagements · Commercial Web Applications
            </div>
            <h2 className="mt-1 font-display text-3xl font-bold tracking-tight text-white">
              Featured Production Deployments
            </h2>
            <p className="mt-2 text-sm text-slate-400 max-w-2xl">
              Commercial platforms, high-conversion booking engines, and enterprise web solutions engineered with Next.js, React, SEO best practices, and performant SSR.
            </p>
          </div>

          <div className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-xs text-amber-400 shrink-0">
            <Globe className="h-3.5 w-3.5" />
            <span>{PROJECTS.length} Verified Live Deployments</span>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {[
            { id: 'All', label: 'All Projects', count: PROJECTS.length },
            { id: 'Booking & Fleet', label: 'Booking & Fleet' },
            { id: 'E-Commerce', label: 'E-Commerce' },
            { id: 'Software & Agency', label: 'Software & Agency' },
            { id: 'Services & Logistics', label: 'Logistics & Services' },
          ].map((cat) => {
            const isActive = projectFilter === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setProjectFilter(cat.id)}
                className={`rounded-lg px-3.5 py-1.5 font-mono text-xs transition-all ${
                  isActive
                    ? 'bg-amber-500/20 border border-amber-500 text-white shadow-sm'
                    : 'bg-white/[0.03] border border-white/10 text-slate-400 hover:text-white hover:border-white/25'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROJECTS.filter((p) => {
            if (projectFilter === 'All') return true;
            if (projectFilter === 'Booking & Fleet') {
              return (
                p.category.includes('Chauffeur') ||
                p.category.includes('Rentals') ||
                p.category.includes('Limousine') ||
                p.category.includes('Airline')
              );
            }
            if (projectFilter === 'E-Commerce') {
              return p.category.includes('Commerce');
            }
            if (projectFilter === 'Software & Agency') {
              return (
                p.category.includes('Software') ||
                p.category.includes('Enterprise')
              );
            }
            if (projectFilter === 'Services & Logistics') {
              return (
                p.category.includes('Logistics') ||
                p.category.includes('Moving') ||
                p.category.includes('Security') ||
                p.category.includes('Education') ||
                (p.category.includes('Consultancy') && !p.category.includes('Software'))
              );
            }
            return true;
          }).map((project) => (
            <div
              key={project.id}
              className="group rounded-2xl border border-white/10 bg-[#0c0c12] p-5 hover:border-amber-500/50 transition-all duration-300 flex flex-col justify-between overflow-hidden"
            >
              <div>
                {/* Project Visual Preview */}
                <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-slate-900 mb-4 border border-white/10 group-hover:border-amber-500/40 transition-colors">
                  <img
                    src={project.image}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c12]/80 via-transparent to-transparent pointer-events-none" />
                </div>

                <div className="flex items-start justify-between gap-3 mb-2.5">
                  <span className="rounded-md border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 font-mono text-[11px] text-amber-300">
                    {project.category}
                  </span>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 font-mono text-xs text-slate-400 group-hover:text-amber-400 transition-colors"
                  >
                    <span>Visit</span>
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>

                <h3 className="font-display text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                  {project.title}
                </h3>

                <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-white/[0.08] flex items-center justify-between">
                <span className="font-mono text-[11px] text-slate-500 truncate max-w-[170px]">
                  {project.link.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}
                </span>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/[0.04] px-3 py-1.5 font-mono text-xs text-white transition-all hover:bg-amber-500 hover:border-amber-500 hover:text-slate-950"
                >
                  <span>Open Site</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CHAPTER 5: THE GRID — SKILLS ARCHITECTURE */}
      <section id="grid" className="py-20 border-b border-white/[0.08]">
        <div className="mb-10">
          <div className="text-xs font-mono uppercase tracking-widest text-amber-500">
            05 · The Grid · Languages, Frameworks & Core Architecture
          </div>
          <h2 className="mt-1 font-display text-3xl font-bold tracking-tight text-white">
            Languages, Frameworks & Engineering Stack
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Organized with primary architectural focus on modern JavaScript, TypeScript, React.js, and Next.js ecosystem capabilities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SKILL_CATEGORIES.map((cat) => (
            <div
              key={cat.name}
              className={`rounded-2xl border p-6 transition-all ${
                cat.isHighlighted
                  ? 'border-amber-500/50 bg-[#0d0c14] md:col-span-2 shadow-xl ring-1 ring-amber-500/30'
                  : 'border-white/10 bg-[#0b0b10]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
                    {cat.isHighlighted && <Sparkles className="h-4 w-4 text-amber-400" />}
                    {cat.name}
                  </h3>
                  {cat.isHighlighted && (
                    <span className="font-mono text-xs text-amber-400 font-semibold flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
                      Core Architectural Foundation
                    </span>
                  )}
                </div>

                <div className="mt-4 flex flex-wrap gap-2.5">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      className={`rounded-lg font-mono text-xs transition-colors ${
                        cat.isHighlighted
                          ? 'bg-amber-500/15 border border-amber-500/40 text-amber-100 font-medium px-3.5 py-2 shadow-sm'
                          : 'bg-white/[0.04] border border-white/[0.08] text-slate-300 px-3 py-1.5'
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CHAPTER 6: THE CIRCLE — LEADERSHIP */}
      <section id="circle" className="py-20 border-b border-white/[0.08]">
        <div className="mb-10">
          <div className="text-xs font-mono uppercase tracking-widest text-amber-500">
            06 · The Circle · Executive Leadership & Mentorship
          </div>
          <h2 className="mt-1 font-display text-3xl font-bold tracking-tight text-white">
            Leadership & Collaborative Principles
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {LEADERSHIP_PRINCIPLES.map((principle) => (
            <div
              key={principle.pillar}
              className="rounded-2xl border border-white/10 bg-[#0c0c12] p-6 hover:border-amber-500/30 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-display text-xl font-bold text-white">
                    {principle.pillar}
                  </span>
                  <span className="font-mono text-xs text-amber-400">
                    {principle.metrics}
                  </span>
                </div>
                <div className="mt-1 font-mono text-xs text-slate-400">
                  {principle.subtitle}
                </div>
                <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                  {principle.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CHAPTER 7: THE MARKER — EDUCATION */}
      <section id="marker" className="py-20 border-b border-white/[0.08]">
        <div className="mb-10">
          <div className="text-xs font-mono uppercase tracking-widest text-amber-500">
            07 · The Marker · Academic Library & Study Sanctuary
          </div>
          <h2 className="mt-1 font-display text-3xl font-bold tracking-tight text-white">
            Academic Pedigree
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {EDUCATION_TIMELINE.map((edu, idx) => (
            <div
              key={edu.degree}
              className="rounded-2xl border border-white/10 bg-[#0c0c12] p-6"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-amber-400">
                  <span>{idx === 0 ? 'Technical Core' : 'Strategic Executive'}</span>
                  <span className="text-white font-bold">{edu.year}</span>
                </div>
                <h3 className="mt-3 font-display text-xl font-bold text-white">
                  {edu.degree}
                </h3>
                <div className="mt-1 text-sm text-slate-300">
                  {edu.institution}
                </div>
                <p className="mt-3 text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {edu.focus}
                </p>
                <div className="mt-4 pt-3 border-t border-white/[0.08] text-xs font-mono text-amber-300/80">
                  {edu.highlight}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CHAPTER 8: THE EXIT — CONTACT */}
      <section id="exit" className="pt-20">
        <div className="rounded-3xl border border-white/15 bg-gradient-to-b from-[#0c0c14] to-[#070709] p-8 sm:p-14 shadow-2xl">
          <div className="text-xs font-mono uppercase tracking-widest text-amber-400">
            08 · The Exit · Hyperlight Airlock & Comms Beacon
          </div>
          <h2 className="mt-2 font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Available For Senior & Lead Roles
          </h2>
          <p className="mt-4 max-w-xl text-slate-300 text-sm sm:text-base leading-relaxed">
            Ready to design, architect, and deliver world-class digital applications. Open to relocation with employer-sponsored work permits.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <a
              href={`mailto:${CONTACT_INFO.email}`}
              className="flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-6 py-3.5 text-sm font-semibold text-slate-950 transition-all hover:bg-amber-400 shadow-lg shadow-amber-500/20"
            >
              <Mail className="h-4 w-4" />
              <span>{CONTACT_INFO.email}</span>
            </a>

            <button
              onClick={handleCopyEmail}
              className="flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/[0.05] px-6 py-3.5 text-sm font-mono text-white transition-all hover:bg-white/[0.1]"
            >
              {copiedEmail ? (
                <>
                  <Check className="h-4 w-4 text-emerald-400" />
                  <span className="text-emerald-400">Email Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  <span>Copy Address</span>
                </>
              )}
            </button>
          </div>

          <div className="mt-10 pt-6 border-t border-white/10 flex flex-wrap gap-6 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-1.5">
              <Phone className="h-3.5 w-3.5 text-amber-500" />
              <span>{CONTACT_INFO.phone}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Phone className="h-3.5 w-3.5 text-amber-500" />
              <span>{CONTACT_INFO.altPhone}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-amber-500" />
              <span>{CONTACT_INFO.location}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-20 pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-mono gap-4">
        <div>
          Kamran Ali · Senior Frontend Developer · {new Date().getFullYear()}
        </div>
        <div>
          Built with React, Three.js, GSAP & Tailwind CSS
        </div>
      </footer>
    </div>
  );
};
