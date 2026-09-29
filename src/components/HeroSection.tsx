import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { PORTRAIT_IMAGE } from '../data/portfolioData';
import { sound } from '../utils/audio';
import { TechConstellationBanner } from './TechConstellationBanner';
import { 
  Terminal, 
  Sparkles, 
  FileText, 
  MapPin, 
  Phone, 
  Mail, 
  ExternalLink, 
  ArrowRight, 
  CheckCircle2, 
  Cpu, 
  Layers, 
  Gauge, 
  Zap, 
  ShieldCheck, 
  Globe
} from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { profile, setIsAiChatOpen, setIsResumeOpen } = usePortfolio();

  // Dynamic Typewriter Effect for Roles
  const roles = [
    'Senior Frontend Developer & Architect',
    'Next.js & React Core Specialist',
    'AI-Augmented Generative UI Engineer',
    'Design Systems & Micro-Frontend Lead'
  ];
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedRole, setDisplayedRole] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentFullRole = roles[roleIndex];
    let timer: NodeJS.Timeout;

    if (!isDeleting && displayedRole.length < currentFullRole.length) {
      timer = setTimeout(() => {
        setDisplayedRole(currentFullRole.slice(0, displayedRole.length + 1));
      }, 55);
    } else if (!isDeleting && displayedRole.length === currentFullRole.length) {
      timer = setTimeout(() => setIsDeleting(true), 2200);
    } else if (isDeleting && displayedRole.length > 0) {
      timer = setTimeout(() => {
        setDisplayedRole(currentFullRole.slice(0, displayedRole.length - 1));
      }, 30);
    } else if (isDeleting && displayedRole.length === 0) {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }

    return () => clearTimeout(timer);
  }, [displayedRole, isDeleting, roleIndex]);

  // Card 3D tilt coordinates on mouse move
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 12, y: -y * 12 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <section className="relative pt-6 sm:pt-8 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Top Banner Status Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-neutral-800/80 mb-6 text-xs font-mono">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-300">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="font-semibold">Ready for Global Remote & Relocation Roles</span>
        </div>

        <div className="flex items-center gap-4 text-neutral-400">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-indigo-400" />
            <span>{profile.location}</span>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 text-indigo-300">
            <Globe className="w-3.5 h-3.5" />
            <span>Requires Work Permit Sponsorship</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Hero Typography & Value Prop (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-indigo-950/80 border border-indigo-500/30 text-indigo-300 text-xs font-mono">
              <Zap className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span>6+ Years Production Frontend Mastery</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-neutral-100 tracking-tight leading-[1.1]">
              Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-300 to-emerald-400">{profile.name}</span>
            </h1>

            {/* Dynamic Typewriter Heading */}
            <div className="h-9 flex items-center">
              <span className="text-lg sm:text-2xl font-bold font-mono text-indigo-300">
                &gt; {displayedRole}
              </span>
              <span className="w-2.5 h-6 bg-cyan-400 ml-1.5 animate-pulse" />
            </div>
          </div>

          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed max-w-2xl font-sans">
            Senior Frontend Developer architecting enterprise-grade web applications with <strong className="text-neutral-100">React, Next.js App Router, TypeScript</strong>, and modern AI streaming protocols. Proven track record of reducing production bugs by <strong className="text-emerald-400 font-mono">90%</strong> and lifting mobile traffic by <strong className="text-cyan-300 font-mono">80%</strong>.
          </p>

          {/* Core Technical Highlights Pill Bar */}
          <div className="flex flex-wrap gap-2 pt-1 font-mono text-xs">
            <span className="px-2.5 py-1 rounded-md bg-neutral-900/90 border border-neutral-800 text-neutral-300 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-indigo-400" />
              <span>Next.js & RSC</span>
            </span>
            <span className="px-2.5 py-1 rounded-md bg-neutral-900/90 border border-neutral-800 text-neutral-300 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              <span>Turborepo & Micro-Frontends</span>
            </span>
            <span className="px-2.5 py-1 rounded-md bg-neutral-900/90 border border-neutral-800 text-neutral-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>Vercel AI SDK Generative UI</span>
            </span>
            <span className="px-2.5 py-1 rounded-md bg-neutral-900/90 border border-neutral-800 text-neutral-300 flex items-center gap-1.5">
              <Gauge className="w-3.5 h-3.5 text-emerald-400" />
              <span>100/100 Core Web Vitals</span>
            </span>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-3">
            <button
              onClick={() => {
                sound.playClick(900);
                setIsResumeOpen(true);
              }}
              className="flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition-all hover:scale-105 cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>View Formatted Resume</span>
            </button>

            <button
              onClick={() => {
                sound.playClick(850);
                setIsAiChatOpen(true);
              }}
              className="flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold bg-neutral-900/90 hover:bg-neutral-800 text-neutral-200 border border-neutral-700/80 transition-all hover:border-indigo-500/50 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Chat with Kamran's AI</span>
            </button>

            <a
              href="#architecture"
              onClick={() => sound.playClick(700)}
              className="flex items-center gap-1.5 px-4 py-3 rounded-xl text-xs font-semibold text-neutral-400 hover:text-neutral-100 transition-colors"
            >
              <span>Explore Blueprints</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Contact Direct Line */}
          <div className="flex flex-wrap items-center gap-6 pt-3 text-xs text-neutral-400 border-t border-neutral-800/80 font-mono">
            <a href={`mailto:${profile.email}`} className="flex items-center gap-1.5 hover:text-indigo-300 transition-colors">
              <Mail className="w-3.5 h-3.5 text-indigo-400" />
              <span>{profile.email}</span>
            </a>
            <a href={`tel:${profile.phone}`} className="flex items-center gap-1.5 hover:text-cyan-300 transition-colors">
              <Phone className="w-3.5 h-3.5 text-cyan-400" />
              <span>{profile.phone}</span>
            </a>
          </div>
        </div>

        {/* Right Column: Clean & Elegant Architecture Banner (5 cols) */}
        <div 
          className="lg:col-span-5 perspective-1000 flex items-start justify-center pt-1"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div 
            className="relative w-full rounded-2xl bg-neutral-900/60 border border-neutral-800/80 p-4 sm:p-5 shadow-xl transition-transform duration-200 ease-out preserve-3d overflow-hidden"
            style={{
              transform: `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`
            }}
          >
            {/* Top Card Subtle Header */}
            <div className="flex items-center justify-between pb-2.5 border-b border-neutral-800/60 text-xs font-mono text-neutral-400">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-400/80" />
                <span className="text-neutral-300 font-semibold tracking-wide">ARCHITECTURE & STACK</span>
              </div>
              <span className="text-neutral-500 text-[11px]">INTERACTIVE CONSTELLATION</span>
            </div>

            {/* Clean Animated Tech Constellation SVG Banner */}
            <div className="pt-1">
              <TechConstellationBanner />
            </div>
          </div>
        </div>
      </div>

      {/* Verified Achievement Metrics Grid from Resume */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
        {(profile?.stats || []).map((stat, idx) => (
          <div 
            key={idx}
            className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 flex flex-col justify-between hover:border-indigo-500/50 hover:bg-neutral-900/90 transition-all hover:scale-[1.02] cursor-default group"
          >
            <div>
              <div className="text-xs font-mono text-neutral-400 group-hover:text-indigo-400 transition-colors uppercase tracking-wider font-semibold">
                {stat.label}
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-neutral-100 group-hover:text-indigo-300 mt-1">
                {stat.value}
              </div>
            </div>
            <p className="text-xs text-neutral-300 leading-snug mt-3">
              {stat.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
