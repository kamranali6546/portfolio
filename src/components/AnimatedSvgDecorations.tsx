import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';

/**
 * Interactive Animated Programming Languages, System Architecture & Vitals Deck SVG
 * Supports 4 Interactive Modes:
 * 1. 🌐 TECH ECOSYSTEM RADAR: Multi-orbital brand matrix with live data conduits.
 * 2. ⚡ ARCHITECTURE PIPELINE: Modern Frontend & Edge RSC data stream flow.
 * 3. 📊 WEB VITALS 100: Core Web Vitals & Lighthouse 100/100 speedometers & flamegraph.
 * 4. 💻 REACT 19 COMPILER: Live AST Token Stream & Zero-Runtime Optimizer.
 */
export const InteractiveHologramSvg: React.FC<{
  className?: string;
  activeTech?: string;
}> = ({ className = '' }) => {
  const { isDarkMode, sound } = usePortfolio();
  const [viewMode, setViewMode] = useState<'radar' | 'pipeline' | 'vitals' | 'ast'>('radar');
  const [selectedTech, setSelectedTech] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [isCompiling, setIsCompiling] = useState<boolean>(false);
  const [hoveredTech, setHoveredTech] = useState<number | null>(null);
  const [pipelineStage, setPipelineStage] = useState<number>(0);

  const techStack = [
    {
      id: 'react',
      name: 'React',
      category: 'frontend',
      color: '#00d8ff',
      tag: 'UI Library & RSC Engine',
      stats: 'Concurrent Fiber // Server Actions // RSC Flight',
      metric: '99% Mastery',
      role: 'Enterprise Design Systems & SPA Shells',
      lcp: '0.62s LCP',
      bundle: '0kb RSC Payload',
      pos: { x: 88, y: 82 },
      curveControl: { cx1: 130, cy1: 120, cx2: 190, cy2: 170 },
      iconType: 'react'
    },
    {
      id: 'ts',
      name: 'TypeScript',
      category: 'frontend',
      color: '#3178c6',
      tag: 'Strict Typed Architecture',
      stats: 'Zero any // AST Transformations // Strict Mode',
      metric: '98% Mastery',
      role: 'Monorepo-wide Type Safety & API Contracts',
      lcp: 'Zero Runtime',
      bundle: 'Pure Compile Time',
      pos: { x: 260, y: 52 },
      curveControl: { cx1: 260, cy1: 90, cx2: 260, cy2: 140 },
      iconType: 'typescript'
    },
    {
      id: 'nextjs',
      name: 'Next.js',
      category: 'frontend',
      color: isDarkMode ? '#f8fafc' : '#0f172a',
      tag: 'Fullstack App Router',
      stats: 'Turbopack // Partial Prerendering // Edge Runtime',
      metric: '96% Mastery',
      role: 'High-Traffic SSR & Hybrid Edge Platforms',
      lcp: '0.54s LCP',
      bundle: 'Automatic Code-Splitting',
      pos: { x: 432, y: 82 },
      curveControl: { cx1: 390, cy1: 120, cx2: 330, cy2: 170 },
      iconType: 'nextjs'
    },
    {
      id: 'js',
      name: 'JavaScript',
      category: 'frontend',
      color: '#f7df1e',
      tag: 'Modern ECMAScript Core',
      stats: 'Web Workers // SharedArrayBuffer // Streams',
      metric: '99% Mastery',
      role: 'High-Performance Client-Side Computations',
      lcp: 'Instant Exec',
      bundle: 'Native Browser V8',
      pos: { x: 472, y: 195 },
      curveControl: { cx1: 410, cy1: 195, cx2: 340, cy2: 195 },
      iconType: 'javascript'
    },
    {
      id: 'tailwind',
      name: 'Tailwind CSS',
      category: 'frontend',
      color: '#38bdf8',
      tag: 'Design Token Engine',
      stats: 'Zero Runtime CSS // Lightning CSS Compiler',
      metric: '97% Mastery',
      role: 'Design System & Atomic Tokens Standardization',
      lcp: '0.00 CLS',
      bundle: '<8kb Gzipped CSS',
      pos: { x: 432, y: 308 },
      curveControl: { cx1: 390, cy1: 270, cx2: 330, cy2: 220 },
      iconType: 'tailwind'
    },
    {
      id: 'node',
      name: 'Node.js',
      category: 'backend',
      color: '#5fa04e',
      tag: 'V8 Server Runtime',
      stats: 'Asynchronous I/O // HTTP/2 // Stream Buffers',
      metric: '94% Mastery',
      role: 'Microservices, BFF Layer & REST Gateways',
      lcp: '<12ms TTFB',
      bundle: 'V8 Fast Paths',
      pos: { x: 260, y: 338 },
      curveControl: { cx1: 260, cy1: 300, cx2: 260, cy2: 250 },
      iconType: 'node'
    },
    {
      id: 'graphql',
      name: 'GraphQL & Apollo',
      category: 'backend',
      color: '#e10098',
      tag: 'Declarative Data Layer',
      stats: 'Apollo Federation // Subgraphs // Typed Enums',
      metric: '92% Mastery',
      role: 'Enterprise Data Mesh & Single Endpoint Graph',
      lcp: 'Precise Over-Fetch 0%',
      bundle: 'Normalized Cache',
      pos: { x: 88, y: 308 },
      curveControl: { cx1: 130, cy1: 270, cx2: 190, cy2: 220 },
      iconType: 'graphql'
    },
    {
      id: 'python',
      name: 'Python',
      category: 'backend',
      color: '#3776ab',
      tag: 'AI Services & Data',
      stats: 'FastAPI // Gemini SDK // PyTorch Pipelines',
      metric: '90% Mastery',
      role: 'AI Model Orchestration & RAG Microservices',
      lcp: '<45ms Latency',
      bundle: 'Async ASGI Loop',
      pos: { x: 48, y: 195 },
      curveControl: { cx1: 110, cy1: 195, cx2: 180, cy2: 195 },
      iconType: 'python'
    },
    {
      id: 'vite',
      name: 'Vite & Rollup',
      category: 'tooling',
      color: '#a855f7',
      tag: 'Next-Gen Build Engine',
      stats: '14ms ESM HMR // SWC Rust Compiler // Tree-Shaking',
      metric: '97% Mastery',
      role: 'Ultra-Fast Developer Experience & Bundling',
      lcp: '14ms HMR',
      bundle: 'Sub-millisecond Rebuild',
      pos: { x: 165, y: 132 },
      curveControl: { cx1: 195, cy1: 152, cx2: 225, cy2: 175 },
      iconType: 'vite'
    },
    {
      id: 'docker',
      name: 'Docker & OCI',
      category: 'tooling',
      color: '#2496ed',
      tag: 'Container Architecture',
      stats: 'Multi-Stage Alpine Builds // Kubernetes Ready',
      metric: '91% Mastery',
      role: 'Reproducible CI/CD Environments & Deployment',
      lcp: 'Zero Drift',
      bundle: 'Optimized Layer Caching',
      pos: { x: 355, y: 132 },
      curveControl: { cx1: 325, cy1: 152, cx2: 295, cy2: 175 },
      iconType: 'docker'
    },
    {
      id: 'git',
      name: 'Git & GitHub CI',
      category: 'tooling',
      color: '#f05032',
      tag: 'Continuous Delivery',
      stats: 'Automated Matrix Testing // Release Pipelines',
      metric: '96% Mastery',
      role: 'Trunk-Based Development & Code Quality Gates',
      lcp: '100% Green CI',
      bundle: 'Automated SemVer',
      pos: { x: 355, y: 258 },
      curveControl: { cx1: 325, cy1: 238, cx2: 295, cy2: 215 },
      iconType: 'git'
    },
    {
      id: 'redux',
      name: 'Redux & Zustand',
      category: 'frontend',
      color: '#764abc',
      tag: 'State Synchronization',
      stats: 'Immer // Reselect Selectors // Time-Travel DevTools',
      metric: '95% Mastery',
      role: 'Predictable Global Data & Multi-Tab Sync',
      lcp: '60 FPS Transitions',
      bundle: '<2kb Middleware Core',
      pos: { x: 165, y: 258 },
      curveControl: { cx1: 195, cy1: 238, cx2: 225, cy2: 215 },
      iconType: 'redux'
    }
  ];

  // Pipeline stages for Architecture view
  const pipelineStages = [
    { id: 'client', name: '01. Client Islands', desc: 'React Concurrent Root & Hydration', color: '#00d8ff', metric: '0.00 CLS', x: 80, y: 110 },
    { id: 'edge', name: '02. Edge Router', desc: 'Global AnyCast Routing & Auth Guard', color: '#38bdf8', metric: '<8ms TTFB', x: 260, y: 110 },
    { id: 'rsc', name: '03. RSC Flight Stream', desc: 'Zero-Bundle Server Components Stream', color: '#a855f7', metric: '0kb JS Payload', x: 440, y: 110 },
    { id: 'bff', name: '04. GraphQL Gateway', desc: 'Apollo Federation & Type-Safe Resolvers', color: '#e10098', metric: '100% Typed', x: 440, y: 260 },
    { id: 'ai', name: '05. AI Engine & RAG', desc: 'Gemini Multi-Modal & Vector Embeddings', color: '#10b981', metric: '<45ms Latency', x: 260, y: 260 },
    { id: 'db', name: '06. Cloud Postgres', desc: 'Drizzle ORM & Scale-to-Zero Storage', color: '#3178c6', metric: 'ACID Compliant', x: 80, y: 260 }
  ];

  // Auto-cycle through languages or pipeline stages when autoRotate is true
  useEffect(() => {
    if (!autoRotate) return;
    const interval = setInterval(() => {
      if (viewMode === 'radar') {
        setSelectedTech(prev => (prev + 1) % techStack.length);
      } else if (viewMode === 'pipeline') {
        setPipelineStage(prev => (prev + 1) % pipelineStages.length);
      }
    }, 3600);
    return () => clearInterval(interval);
  }, [autoRotate, techStack.length, viewMode, pipelineStages.length]);

  const active = techStack[hoveredTech !== null ? hoveredTech : selectedTech];
  const activePipeline = pipelineStages[pipelineStage];

  const handleManualSelect = (index: number) => {
    sound.playClick(900);
    setSelectedTech(index);
    setAutoRotate(false);
  };

  const handleTriggerCompile = () => {
    sound.playSuccess();
    setIsCompiling(true);
    setTimeout(() => {
      setIsCompiling(false);
    }, 1200);
  };

  const cardBg = isDarkMode ? '#060913' : '#ffffff';
  const cardBorder = isDarkMode ? 'rgba(99, 102, 241, 0.28)' : 'rgba(79, 70, 229, 0.22)';
  const consoleBg = isDarkMode ? '#03060f' : '#f8fafc';
  const gridLineColor = isDarkMode ? 'rgba(99, 102, 241, 0.06)' : 'rgba(79, 70, 229, 0.05)';

  // High-Precision SVG Brand Logos
  const renderTechIcon = (type: string, size = 24, color = '#6366f1') => {
    switch (type) {
      case 'react':
        return (
          <g transform={`translate(${-size / 2}, ${-size / 2})`}>
            <circle cx={size / 2} cy={size / 2} r={size * 0.16} fill="#00d8ff" />
            <ellipse cx={size / 2} cy={size / 2} rx={size * 0.44} ry={size * 0.17} fill="none" stroke="#00d8ff" strokeWidth="1.6" />
            <ellipse cx={size / 2} cy={size / 2} rx={size * 0.44} ry={size * 0.17} fill="none" stroke="#00d8ff" strokeWidth="1.6" transform={`rotate(60 ${size / 2} ${size / 2})`} />
            <ellipse cx={size / 2} cy={size / 2} rx={size * 0.44} ry={size * 0.17} fill="none" stroke="#00d8ff" strokeWidth="1.6" transform={`rotate(120 ${size / 2} ${size / 2})`} />
          </g>
        );

      case 'typescript':
        return (
          <g transform={`translate(${-size / 2}, ${-size / 2})`}>
            <rect width={size} height={size} rx={size * 0.2} fill="#3178c6" />
            <path d={`M ${size * 0.22} ${size * 0.42} L ${size * 0.48} ${size * 0.42} M ${size * 0.35} ${size * 0.42} L ${size * 0.35} ${size * 0.8}`} stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" />
            <path d={`M ${size * 0.77} ${size * 0.44} C ${size * 0.58} ${size * 0.42}, ${size * 0.54} ${size * 0.56}, ${size * 0.65} ${size * 0.61} C ${size * 0.77} ${size * 0.67}, ${size * 0.76} ${size * 0.79}, ${size * 0.56} ${size * 0.78}`} fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" />
          </g>
        );

      case 'nextjs':
        return (
          <g transform={`translate(${-size / 2}, ${-size / 2})`}>
            <circle cx={size / 2} cy={size / 2} r={size * 0.48} fill={isDarkMode ? '#000000' : '#0f172a'} stroke={isDarkMode ? '#475569' : '#334155'} strokeWidth="1" />
            <path d={`M ${size * 0.32} ${size * 0.72} L ${size * 0.32} ${size * 0.28} L ${size * 0.66} ${size * 0.72} L ${size * 0.66} ${size * 0.28}`} fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        );

      case 'javascript':
        return (
          <g transform={`translate(${-size / 2}, ${-size / 2})`}>
            <rect width={size} height={size} rx={size * 0.2} fill="#f7df1e" />
            <path d={`M ${size * 0.28} ${size * 0.62} C ${size * 0.28} ${size * 0.76}, ${size * 0.42} ${size * 0.78}, ${size * 0.44} ${size * 0.72} L ${size * 0.44} ${size * 0.36}`} fill="none" stroke="#000000" strokeWidth="2.2" strokeLinecap="round" />
            <path d={`M ${size * 0.76} ${size * 0.44} C ${size * 0.58} ${size * 0.42}, ${size * 0.56} ${size * 0.55}, ${size * 0.67} ${size * 0.61} C ${size * 0.78} ${size * 0.67}, ${size * 0.76} ${size * 0.79}, ${size * 0.56} ${size * 0.78}`} fill="none" stroke="#000000" strokeWidth="2.2" strokeLinecap="round" />
          </g>
        );

      case 'tailwind':
        return (
          <g transform={`translate(${-size / 2}, ${-size / 2})`}>
            <circle cx={size / 2} cy={size / 2} r={size * 0.48} fill={isDarkMode ? '#0a1526' : '#e0f2fe'} />
            <path d={`M ${size * 0.22} ${size * 0.55} C ${size * 0.25} ${size * 0.42}, ${size * 0.36} ${size * 0.38}, ${size * 0.45} ${size * 0.46} C ${size * 0.49} ${size * 0.5}, ${size * 0.54} ${size * 0.54}, ${size * 0.62} ${size * 0.46} C ${size * 0.58} ${size * 0.58}, ${size * 0.48} ${size * 0.62}, ${size * 0.38} ${size * 0.54} Z`} fill="#38bdf8" />
            <path d={`M ${size * 0.42} ${size * 0.4} C ${size * 0.45} ${size * 0.27}, ${size * 0.56} ${size * 0.23}, ${size * 0.65} ${size * 0.31} C ${size * 0.69} ${size * 0.35}, ${size * 0.74} ${size * 0.39}, ${size * 0.82} ${size * 0.31} C ${size * 0.78} ${size * 0.43}, ${size * 0.68} ${size * 0.47}, ${size * 0.58} ${size * 0.39} Z`} fill="#06b6d4" />
          </g>
        );

      case 'node':
        return (
          <g transform={`translate(${-size / 2}, ${-size / 2})`}>
            <polygon points={`${size * 0.5},${size * 0.12} ${size * 0.86},${size * 0.32} ${size * 0.86},${size * 0.68} ${size * 0.5},${size * 0.88} ${size * 0.14},${size * 0.68} ${size * 0.14},${size * 0.32}`} fill="#5fa04e" />
            <circle cx={size * 0.5} cy={size * 0.5} r={size * 0.22} fill="#ffffff" />
            <path d={`M ${size * 0.5} ${size * 0.35} L ${size * 0.5} ${size * 0.65}`} stroke="#5fa04e" strokeWidth="2.2" strokeLinecap="round" />
          </g>
        );

      case 'graphql':
        return (
          <g transform={`translate(${-size / 2}, ${-size / 2})`}>
            <polygon points={`${size * 0.5},${size * 0.15} ${size * 0.82},${size * 0.33} ${size * 0.82},${size * 0.67} ${size * 0.5},${size * 0.85} ${size * 0.18},${size * 0.67} ${size * 0.18},${size * 0.33}`} fill="none" stroke="#e10098" strokeWidth="1.6" />
            <polygon points={`${size * 0.5},${size * 0.25} ${size * 0.75},${size * 0.65} ${size * 0.25},${size * 0.65}`} fill="none" stroke="#e10098" strokeWidth="1.6" />
            <circle cx={size * 0.5} cy={size * 0.15} r="2.2" fill="#e10098" />
            <circle cx={size * 0.82} cy={size * 0.33} r="2.2" fill="#e10098" />
            <circle cx={size * 0.82} cy={size * 0.67} r="2.2" fill="#e10098" />
            <circle cx={size * 0.5} cy={size * 0.85} r="2.2" fill="#e10098" />
            <circle cx={size * 0.18} cy={size * 0.67} r="2.2" fill="#e10098" />
            <circle cx={size * 0.18} cy={size * 0.33} r="2.2" fill="#e10098" />
          </g>
        );

      case 'python':
        return (
          <g transform={`translate(${-size / 2}, ${-size / 2})`}>
            <path d={`M ${size * 0.48} ${size * 0.18} C ${size * 0.3} ${size * 0.18}, ${size * 0.25} ${size * 0.25}, ${size * 0.25} ${size * 0.38} L ${size * 0.25} ${size * 0.48} L ${size * 0.52} ${size * 0.48} L ${size * 0.52} ${size * 0.55} L ${size * 0.2} ${size * 0.55} C ${size * 0.1} ${size * 0.55}, ${size * 0.1} ${size * 0.35}, ${size * 0.2} ${size * 0.2} C ${size * 0.32} ${size * 0.08}, ${size * 0.58} ${size * 0.08}, ${size * 0.68} ${size * 0.18} L ${size * 0.6} ${size * 0.28} C ${size * 0.55} ${size * 0.22}, ${size * 0.5} ${size * 0.18}, ${size * 0.48} ${size * 0.18} Z`} fill="#3776ab" />
            <path d={`M ${size * 0.52} ${size * 0.82} C ${size * 0.7} ${size * 0.82}, ${size * 0.75} ${size * 0.75}, ${size * 0.75} ${size * 0.62} L ${size * 0.75} ${size * 0.52} L ${size * 0.48} ${size * 0.52} L ${size * 0.48} ${size * 0.45} L ${size * 0.8} ${size * 0.45} C ${size * 0.9} ${size * 0.45}, ${size * 0.9} ${size * 0.65}, ${size * 0.8} ${size * 0.8} C ${size * 0.68} ${size * 0.92}, ${size * 0.42} ${size * 0.92}, ${size * 0.32} ${size * 0.82} L ${size * 0.4} ${size * 0.72} C ${size * 0.45} ${size * 0.78}, ${size * 0.5} ${size * 0.82}, ${size * 0.52} ${size * 0.82} Z`} fill="#ffd438" />
            <circle cx={size * 0.35} cy={size * 0.28} r="1.5" fill="#ffffff" />
            <circle cx={size * 0.65} cy={size * 0.72} r="1.5" fill="#ffffff" />
          </g>
        );

      case 'vite':
        return (
          <g transform={`translate(${-size / 2}, ${-size / 2})`}>
            <polygon points={`${size * 0.15},${size * 0.2} ${size * 0.85},${size * 0.2} ${size * 0.5},${size * 0.88}`} fill="url(#viteShieldGrad)" />
            <polygon points={`${size * 0.58},${size * 0.22} ${size * 0.32},${size * 0.55} ${size * 0.48},${size * 0.55} ${size * 0.42},${size * 0.8} ${size * 0.68},${size * 0.45} ${size * 0.52},${size * 0.45}`} fill="#ffc517" />
          </g>
        );

      case 'docker':
        return (
          <g transform={`translate(${-size / 2}, ${-size / 2})`}>
            <path d={`M ${size * 0.15} ${size * 0.55} C ${size * 0.15} ${size * 0.75}, ${size * 0.45} ${size * 0.85}, ${size * 0.85} ${size * 0.68} C ${size * 0.88} ${size * 0.55}, ${size * 0.75} ${size * 0.5}, ${size * 0.65} ${size * 0.55} L ${size * 0.15} ${size * 0.55} Z`} fill="#2496ed" />
            <rect x={size * 0.25} y={size * 0.38} width={size * 0.1} height={size * 0.12} rx="1" fill="#2496ed" />
            <rect x={size * 0.38} y={size * 0.38} width={size * 0.1} height={size * 0.12} rx="1" fill="#2496ed" />
            <rect x={size * 0.51} y={size * 0.38} width={size * 0.1} height={size * 0.12} rx="1" fill="#2496ed" />
            <rect x={size * 0.38} y={size * 0.24} width={size * 0.1} height={size * 0.12} rx="1" fill="#2496ed" />
            <circle cx={size * 0.75} cy={size * 0.6} r="1.5" fill="#ffffff" />
          </g>
        );

      case 'git':
        return (
          <g transform={`translate(${-size / 2}, ${-size / 2})`}>
            <rect width={size} height={size} rx={size * 0.2} fill="#f05032" />
            <circle cx={size * 0.35} cy={size * 0.35} r="2.2" fill="#ffffff" />
            <circle cx={size * 0.35} cy={size * 0.65} r="2.2" fill="#ffffff" />
            <circle cx={size * 0.68} cy={size * 0.45} r="2.2" fill="#ffffff" />
            <line x1={size * 0.35} y1={size * 0.35} x2={size * 0.35} y2={size * 0.65} stroke="#ffffff" strokeWidth="1.8" />
            <path d={`M ${size * 0.35} ${size * 0.65} C ${size * 0.35} ${size * 0.45}, ${size * 0.55} ${size * 0.45}, ${size * 0.68} ${size * 0.45}`} fill="none" stroke="#ffffff" strokeWidth="1.8" />
          </g>
        );

      case 'redux':
        return (
          <g transform={`translate(${-size / 2}, ${-size / 2})`}>
            <circle cx={size / 2} cy={size / 2} r={size * 0.48} fill={isDarkMode ? '#1e1435' : '#ede9fe'} stroke="#764abc" strokeWidth="1" />
            <circle cx={size * 0.5} cy={size * 0.35} r="2.5" fill="#764abc" />
            <circle cx={size * 0.35} cy={size * 0.65} r="2.5" fill="#764abc" />
            <circle cx={size * 0.65} cy={size * 0.65} r="2.5" fill="#764abc" />
            <path d={`M ${size * 0.5} ${size * 0.35} L ${size * 0.35} ${size * 0.65} L ${size * 0.65} ${size * 0.65} Z`} fill="none" stroke="#764abc" strokeWidth="1.4" />
          </g>
        );

      default:
        return <circle cx="0" cy="0" r="10" fill={color} />;
    }
  };

  return (
    <div className={`relative w-full aspect-[4/3.5] max-w-[530px] mx-auto flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 540 430"
        className={`w-full h-full select-none overflow-visible ${
          isDarkMode
            ? 'drop-shadow-[0_0_40px_rgba(99,102,241,0.25)]'
            : 'drop-shadow-[0_12px_36px_rgba(79,70,229,0.15)]'
        }`}
      >
        <defs>
          <filter id="proToolGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="proHaloGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <linearGradient id="viteShieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#41d1ff" />
            <stop offset="100%" stopColor="#bd34fe" />
          </linearGradient>

          <radialGradient id="centerAtmosphereGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={active.color} stopOpacity={isDarkMode ? '0.3' : '0.16'} />
            <stop offset="50%" stopColor="#6366f1" stopOpacity={isDarkMode ? '0.12' : '0.06'} />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
          </radialGradient>

          {/* Grid pattern for background blueprint */}
          <pattern id="hudGrid" width="20" height="20" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="20" y2="0" stroke={gridLineColor} strokeWidth="0.8" />
            <line x1="0" y1="0" x2="0" y2="20" stroke={gridLineColor} strokeWidth="0.8" />
          </pattern>
        </defs>

        {/* Outer Frame Background with Blueprint Grid */}
        <rect
          x="10"
          y="10"
          width="520"
          height="410"
          rx="16"
          fill={cardBg}
          stroke={cardBorder}
          strokeWidth="1.2"
        />

        {/* Subtle Engineering Blueprint Grid */}
        <rect x="11" y="49" width="518" height="300" fill="url(#hudGrid)" />

        {/* Top Window HUD Title Bar */}
        <rect x="10" y="10" width="520" height="38" rx="16" fill={isDarkMode ? '#0a0f1d' : '#f1f5f9'} />
        <rect x="10" y="30" width="520" height="18" fill={isDarkMode ? '#0a0f1d' : '#f1f5f9'} />
        <line x1="10" y1="48" x2="530" y2="48" stroke={cardBorder} strokeWidth="1" />

        {/* Window Corner Control Indicators */}
        <circle cx="28" cy="29" r="4" fill="#ef4444" />
        <circle cx="42" cy="29" r="4" fill="#f59e0b" />
        <circle cx="56" cy="29" r="4" fill="#10b981" />

        {/* High-Tech Mode Switcher Tabs */}
        {[
          { id: 'radar', label: '🌐 TECH RADAR' },
          { id: 'pipeline', label: '⚡ SYSTEM FLOW' },
          { id: 'vitals', label: '📊 100 VITALS' },
          { id: 'ast', label: '💻 AST ENGINE' }
        ].map((tab, idx) => {
          const isTabActive = viewMode === tab.id;
          const xPos = 78 + idx * 84;
          return (
            <g
              key={tab.id}
              transform={`translate(${xPos}, 17)`}
              className="cursor-pointer group"
              onClick={() => {
                sound.playClick(800);
                setViewMode(tab.id as any);
              }}
            >
              <rect
                width="78"
                height="22"
                rx="6"
                fill={isTabActive ? (isDarkMode ? '#17233f' : '#ffffff') : 'transparent'}
                stroke={isTabActive ? '#6366f1' : 'transparent'}
                strokeWidth="1"
              />
              <text
                x="39"
                y="14.5"
                textAnchor="middle"
                fill={isTabActive ? (isDarkMode ? '#38bdf8' : '#0284c7') : (isDarkMode ? '#64748b' : '#94a3b8')}
                fontSize="8"
                fontFamily="'JetBrains Mono', monospace"
                fontWeight={isTabActive ? 'bold' : 'normal'}
              >
                {tab.label}
              </text>
            </g>
          );
        })}

        {/* Dynamic Interactive Compile & Rotate Triggers */}
        <g
          transform="translate(424, 17)"
          className="cursor-pointer"
          onClick={handleTriggerCompile}
        >
          <rect
            width="96"
            height="22"
            rx="6"
            fill={isCompiling ? 'rgba(99, 102, 241, 0.3)' : (autoRotate ? 'rgba(16, 185, 129, 0.15)' : (isDarkMode ? '#1e293b' : '#e2e8f0'))}
            stroke={isCompiling ? '#818cf8' : (autoRotate ? '#10b981' : (isDarkMode ? '#475569' : '#cbd5e1'))}
            strokeWidth="1"
          />
          <circle cx="12" cy="11" r="2.5" fill={isCompiling ? '#818cf8' : (autoRotate ? '#10b981' : '#94a3b8')} className="pulse-glow" />
          <text
            x="54"
            y="14.5"
            textAnchor="middle"
            fill={isCompiling ? '#a5b4fc' : (autoRotate ? (isDarkMode ? '#34d399' : '#059669') : (isDarkMode ? '#94a3b8' : '#64748b'))}
            fontSize="7.5"
            fontFamily="'JetBrains Mono', monospace"
            fontWeight="bold"
          >
            {isCompiling ? '⚡ COMPILING' : (autoRotate ? '● LIVE SYNC' : '❚❚ PAUSED')}
          </text>
        </g>

        {/* ----------------- VIEW MODE 1: TECH RADAR ----------------- */}
        {viewMode === 'radar' && (
          <g>
            {/* Central Core Atmosphere & Multi-Orbital Radar Tracks */}
            <circle cx="260" cy="195" r="145" fill="url(#centerAtmosphereGrad)" className="transition-all duration-700" />

            {/* Radar Geometric Reticles & Azimuth Crosshairs */}
            <line x1="260" y1="50" x2="260" y2="340" stroke={gridLineColor} strokeWidth="1" strokeDasharray="3 3" />
            <line x1="45" y1="195" x2="475" y2="195" stroke={gridLineColor} strokeWidth="1" strokeDasharray="3 3" />

            {/* Outer Coordinate Track */}
            <circle cx="260" cy="195" r="162" fill="none" stroke={isDarkMode ? 'rgba(99, 102, 241, 0.1)' : 'rgba(79, 70, 229, 0.08)'} strokeWidth="1" strokeDasharray="4 6" />

            {/* Middle Orbit Track */}
            <circle
              cx="260"
              cy="195"
              r="115"
              fill="none"
              stroke={isDarkMode ? 'rgba(6, 182, 212, 0.18)' : 'rgba(6, 182, 212, 0.12)'}
              strokeWidth="1.2"
              strokeDasharray="6 8"
              className="animate-spin-slow origin-center"
              style={{ transformOrigin: '260px 195px' }}
            />

            {/* Inner Orbit Track */}
            <circle
              cx="260"
              cy="195"
              r="72"
              fill="none"
              stroke={isDarkMode ? 'rgba(16, 185, 129, 0.22)' : 'rgba(16, 185, 129, 0.14)'}
              strokeWidth="1.2"
              strokeDasharray="4 4"
              style={{ transformOrigin: '260px 195px', animation: 'spin 22s linear infinite reverse' }}
            />

            {/* Curved Optical Conduits */}
            {techStack.map((tech, i) => {
              const isHighlighted = i === (hoveredTech !== null ? hoveredTech : selectedTech);
              const strokeOpacity = isHighlighted ? 0.95 : 0.22;
              const pathD = `M ${tech.pos.x} ${tech.pos.y} Q ${tech.curveControl.cx1} ${tech.curveControl.cy1}, 260 195`;

              return (
                <g key={`conduit-${tech.id}`}>
                  <path
                    d={pathD}
                    fill="none"
                    stroke={isHighlighted ? tech.color : (isDarkMode ? '#6366f1' : '#4f46e5')}
                    strokeWidth={isHighlighted ? '2.2' : '1'}
                    strokeOpacity={strokeOpacity}
                    strokeDasharray={isHighlighted ? '5 4' : '3 3'}
                    className={isHighlighted ? 'animated-wire-fast' : ''}
                  />

                  {/* Photons */}
                  {isHighlighted && (
                    <>
                      <circle r="4" fill={tech.color} filter="url(#proToolGlow)">
                        <animateMotion dur={isCompiling ? "0.5s" : "1.2s"} repeatCount="indefinite" path={pathD} />
                      </circle>
                      <circle r="2.5" fill="#ffffff" filter="url(#proToolGlow)">
                        <animateMotion dur={isCompiling ? "0.5s" : "1.2s"} begin="0.6s" repeatCount="indefinite" path={pathD} />
                      </circle>
                    </>
                  )}
                </g>
              );
            })}

            {/* Central Compiler Reactor */}
            <g
              transform="translate(260, 195)"
              className="cursor-pointer group"
              onClick={() => {
                setAutoRotate(prev => !prev);
                sound.playClick(600);
              }}
            >
              <circle r="46" fill="none" stroke={active.color} strokeWidth="1.2" strokeDasharray="4 3" className="animate-spin-slow" style={{ transformOrigin: '0px 0px' }} />
              <circle r="40" fill={isDarkMode ? '#090e1c' : '#ffffff'} stroke={active.color} strokeWidth="2.2" filter="url(#proHaloGlow)" className="transition-all duration-500" />
              <path d="M -30 -36 L -36 -36 L -36 -30" fill="none" stroke={active.color} strokeWidth="1.5" />
              <path d="M 30 -36 L 36 -36 L 36 -30" fill="none" stroke={active.color} strokeWidth="1.5" />
              <path d="M -30 36 L -36 36 L -36 30" fill="none" stroke={active.color} strokeWidth="1.5" />
              <path d="M 30 36 L 36 36 L 36 30" fill="none" stroke={active.color} strokeWidth="1.5" />
              <g transform="translate(0, -10)">
                {renderTechIcon(active.iconType, 26, active.color)}
              </g>
              <text textAnchor="middle" y="14" fill={active.color} fontSize="9" fontFamily="'JetBrains Mono', monospace" fontWeight="bold">
                {active.name}
              </text>
              <text textAnchor="middle" y="26" fill={isDarkMode ? '#94a3b8' : '#64748b'} fontSize="7" fontFamily="'JetBrains Mono', monospace">
                {active.lcp}
              </text>
            </g>

            {/* Floating Logo Nodes */}
            {techStack.map((tech, i) => {
              const isSelected = i === (hoveredTech !== null ? hoveredTech : selectedTech);
              return (
                <g
                  key={tech.id}
                  transform={`translate(${tech.pos.x}, ${tech.pos.y})`}
                  className="cursor-pointer group transition-all duration-300"
                  onMouseEnter={() => setHoveredTech(i)}
                  onMouseLeave={() => setHoveredTech(null)}
                  onClick={() => handleManualSelect(i)}
                >
                  {isSelected && (
                    <circle r="24" fill="none" stroke={tech.color} strokeWidth="1.4" strokeDasharray="4 3" className="animate-spin-slow origin-center" />
                  )}
                  <circle
                    r="19"
                    fill={isDarkMode ? '#0a1020' : '#ffffff'}
                    stroke={isSelected ? tech.color : (isDarkMode ? 'rgba(99, 102, 241, 0.32)' : 'rgba(79, 70, 229, 0.22)')}
                    strokeWidth={isSelected ? '2' : '1.2'}
                    filter={isSelected ? 'url(#proToolGlow)' : undefined}
                    className="transition-all duration-300 group-hover:scale-110"
                  />
                  {renderTechIcon(tech.iconType, 22, tech.color)}
                  <text textAnchor="middle" y="30" fill={isSelected ? tech.color : (isDarkMode ? '#cbd5e1' : '#475569')} fontSize="8" fontFamily="'JetBrains Mono', monospace" fontWeight={isSelected ? 'bold' : '500'}>
                    {tech.name.split(' ')[0]}
                  </text>
                </g>
              );
            })}
          </g>
        )}

        {/* ----------------- VIEW MODE 2: SYSTEM FLOW PIPELINE ----------------- */}
        {viewMode === 'pipeline' && (
          <g>
            {/* Bus Connecting Lines */}
            <path
              d="M 80 110 L 260 110 L 440 110 L 440 260 L 260 260 L 80 260 Z"
              fill="none"
              stroke={isDarkMode ? 'rgba(99, 102, 241, 0.3)' : 'rgba(79, 70, 229, 0.2)'}
              strokeWidth="3"
              strokeDasharray="6 4"
              className="animated-wire-fast"
            />

            {/* Traveling Data Packets along the pipeline loop */}
            <circle r="5" fill="#38bdf8" filter="url(#proToolGlow)">
              <animateMotion
                dur="4s"
                repeatCount="indefinite"
                path="M 80 110 L 260 110 L 440 110 L 440 260 L 260 260 L 80 260 Z"
              />
            </circle>

            {/* Pipeline Stage Cards */}
            {pipelineStages.map((stage, idx) => {
              const isSelected = pipelineStage === idx;
              return (
                <g
                  key={stage.id}
                  transform={`translate(${stage.x}, ${stage.y})`}
                  className="cursor-pointer group"
                  onClick={() => {
                    sound.playClick(900);
                    setPipelineStage(idx);
                  }}
                >
                  <rect
                    x="-65"
                    y="-36"
                    width="130"
                    height="72"
                    rx="12"
                    fill={isSelected ? (isDarkMode ? '#0f172a' : '#f0fdf4') : (isDarkMode ? '#090e1c' : '#ffffff')}
                    stroke={isSelected ? stage.color : (isDarkMode ? 'rgba(99, 102, 241, 0.35)' : 'rgba(79, 70, 229, 0.2)')}
                    strokeWidth={isSelected ? '2' : '1.2'}
                    filter={isSelected ? 'url(#proToolGlow)' : undefined}
                    className="transition-all duration-300"
                  />
                  <circle cx="0" cy="-16" r="4" fill={stage.color} className={isSelected ? 'pulse-glow' : ''} />
                  <text textAnchor="middle" y="-2" fill={stage.color} fontSize="8.5" fontFamily="'JetBrains Mono', monospace" fontWeight="bold">
                    {stage.name}
                  </text>
                  <text textAnchor="middle" y="12" fill={isDarkMode ? '#94a3b8' : '#64748b'} fontSize="7" fontFamily="'JetBrains Mono', monospace">
                    {stage.metric}
                  </text>
                  <text textAnchor="middle" y="24" fill={isDarkMode ? '#cbd5e1' : '#334155'} fontSize="6.5" fontFamily="'JetBrains Mono', monospace">
                    ACTIVE
                  </text>
                </g>
              );
            })}

            {/* Center Diagnostics Ring */}
            <g transform="translate(260, 185)">
              <rect x="-90" y="-18" width="180" height="36" rx="8" fill={isDarkMode ? '#050814' : '#ffffff'} stroke={activePipeline.color} strokeWidth="1.5" />
              <text textAnchor="middle" y="-2" fill={activePipeline.color} fontSize="8.5" fontFamily="'JetBrains Mono', monospace" fontWeight="bold">
                DATA STREAM ACTIVE
              </text>
              <text textAnchor="middle" y="10" fill={isDarkMode ? '#94a3b8' : '#64748b'} fontSize="7" fontFamily="'JetBrains Mono', monospace">
                {activePipeline.desc}
              </text>
            </g>
          </g>
        )}

        {/* ----------------- VIEW MODE 3: 100/100 LIGHTHOUSE & WEB VITALS ----------------- */}
        {viewMode === 'vitals' && (
          <g transform="translate(20, 60)">
            {/* 4 Speedometer Gauges */}
            {[
              { label: 'PERFORMANCE', score: '100', metric: '0.4s FCP // 0.6s LCP', color: '#10b981', x: 50 },
              { label: 'ACCESSIBILITY', score: '100', metric: 'WCAG AAA 21:1 Contrast', color: '#00d8ff', x: 175 },
              { label: 'BEST PRACTICES', score: '100', metric: 'Zero Console Errors', color: '#a855f7', x: 300 },
              { label: 'SEO & PWA', score: '100', metric: 'Valid Structured JSON-LD', color: '#f59e0b', x: 425 }
            ].map((gauge) => (
              <g key={gauge.label} transform={`translate(${gauge.x}, 65)`}>
                <circle r="36" fill="none" stroke={isDarkMode ? '#1e293b' : '#e2e8f0'} strokeWidth="5" />
                <circle
                  r="36"
                  fill="none"
                  stroke={gauge.color}
                  strokeWidth="5"
                  strokeDasharray="226"
                  strokeDashoffset="0"
                  strokeLinecap="round"
                  transform="rotate(-90)"
                  filter="url(#proToolGlow)"
                />
                <text textAnchor="middle" y="6" fill={gauge.color} fontSize="18" fontFamily="'JetBrains Mono', monospace" fontWeight="bold">
                  {gauge.score}
                </text>
                <text textAnchor="middle" y="52" fill={isDarkMode ? '#f8fafc' : '#0f172a'} fontSize="8" fontFamily="'JetBrains Mono', monospace" fontWeight="bold">
                  {gauge.label}
                </text>
                <text textAnchor="middle" y="64" fill={isDarkMode ? '#94a3b8' : '#64748b'} fontSize="6.5" fontFamily="'JetBrains Mono', monospace">
                  {gauge.metric}
                </text>
              </g>
            ))}

            {/* Performance Flamegraph & Sub-Millisecond Profiler */}
            <g transform="translate(20, 175)">
              <rect width="460" height="95" rx="10" fill={isDarkMode ? '#080d1a' : '#f8fafc'} stroke={cardBorder} strokeWidth="1" />
              <text x="14" y="20" fill={isDarkMode ? '#38bdf8' : '#0284c7'} fontSize="8.5" fontFamily="'JetBrains Mono', monospace" fontWeight="bold">
                FLAMEGRAPH PROFILE // MAIN THREAD RENDER (60.0 FPS)
              </text>
              <line x1="14" y1="28" x2="446" y2="28" stroke={cardBorder} strokeWidth="1" />

              {/* Flamegraph Bars */}
              <rect x="14" y="38" width="180" height="14" rx="3" fill="#00d8ff" />
              <text x="20" y="48" fill="#000000" fontSize="7" fontFamily="'JetBrains Mono', monospace" fontWeight="bold">React Concurrent Fiber [1.2ms]</text>

              <rect x="200" y="38" width="120" height="14" rx="3" fill="#3178c6" />
              <text x="206" y="48" fill="#ffffff" fontSize="7" fontFamily="'JetBrains Mono', monospace" fontWeight="bold">TS Type Guard [0.4ms]</text>

              <rect x="326" y="38" width="120" height="14" rx="3" fill="#a855f7" />
              <text x="332" y="48" fill="#ffffff" fontSize="7" fontFamily="'JetBrains Mono', monospace" fontWeight="bold">Layout Paint [0.8ms]</text>

              <rect x="14" y="58" width="280" height="14" rx="3" fill="#10b981" />
              <text x="20" y="68" fill="#000000" fontSize="7" fontFamily="'JetBrains Mono', monospace" fontWeight="bold">Hydration Island Diff: 0 DOM Violations</text>

              <rect x="300" y="58" width="146" height="14" rx="3" fill="#f59e0b" />
              <text x="306" y="68" fill="#000000" fontSize="7" fontFamily="'JetBrains Mono', monospace" fontWeight="bold">Cache Hit: 100%</text>

              <text x="14" y="86" fill={isDarkMode ? '#94a3b8' : '#64748b'} fontSize="7" fontFamily="'JetBrains Mono', monospace">
                Total CPU Execution Time: <tspan fill="#10b981" fontWeight="bold">2.4ms</tspan> | Frame Budget Remaining: <tspan fill="#38bdf8" fontWeight="bold">14.2ms (85%)</tspan>
              </text>
            </g>
          </g>
        )}

        {/* ----------------- VIEW MODE 4: REACT COMPILER & AST ENGINE ----------------- */}
        {viewMode === 'ast' && (
          <g transform="translate(20, 60)">
            <rect width="500" height="270" rx="10" fill={isDarkMode ? '#050813' : '#f8fafc'} stroke={cardBorder} strokeWidth="1" />
            
            {/* AST Code Header */}
            <g transform="translate(16, 20)">
              <text x="0" y="0" fill="#00d8ff" fontSize="9" fontFamily="'JetBrains Mono', monospace" fontWeight="bold">
                // React Server Actions &amp; Optimistic AST Tree
              </text>
              
              {/* Code lines */}
              <text x="0" y="22" fill="#a855f7" fontSize="8.5" fontFamily="'JetBrains Mono', monospace">
                export async function <tspan fill="#38bdf8">PortfolioKernel</tspan>() &#123;
              </text>
              <text x="16" y="40" fill={isDarkMode ? '#e2e8f0' : '#1e293b'} fontSize="8.5" fontFamily="'JetBrains Mono', monospace">
                <tspan fill="#f59e0b">'use server'</tspan>;
              </text>
              <text x="16" y="58" fill={isDarkMode ? '#e2e8f0' : '#1e293b'} fontSize="8.5" fontFamily="'JetBrains Mono', monospace">
                const <tspan fill="#38bdf8">telemetry</tspan> = await <tspan fill="#10b981">fetchEdgeStream</tspan>();
              </text>
              <text x="16" y="76" fill={isDarkMode ? '#e2e8f0' : '#1e293b'} fontSize="8.5" fontFamily="'JetBrains Mono', monospace">
                return &lt;<tspan fill="#00d8ff">React.Suspense</tspan> fallback=&#123;&lt;<tspan fill="#f59e0b">SkeletonGrid</tspan> /&gt;&#125;&gt;
              </text>
              <text x="32" y="94" fill={isDarkMode ? '#e2e8f0' : '#1e293b'} fontSize="8.5" fontFamily="'JetBrains Mono', monospace">
                &lt;<tspan fill="#38bdf8">ArchitectureMesh</tspan> data=&#123;telemetry&#125; /&gt;
              </text>
              <text x="16" y="112" fill={isDarkMode ? '#e2e8f0' : '#1e293b'} fontSize="8.5" fontFamily="'JetBrains Mono', monospace">
                &lt;/<tspan fill="#00d8ff">React.Suspense</tspan>&gt;;
              </text>
              <text x="0" y="130" fill="#a855f7" fontSize="8.5" fontFamily="'JetBrains Mono', monospace">
                &#125;
              </text>
            </g>

            {/* Compiler Output Box */}
            <g transform="translate(16, 170)">
              <rect width="468" height="84" rx="8" fill={isDarkMode ? '#0a1020' : '#ffffff'} stroke="#10b981" strokeWidth="1" />
              <text x="14" y="18" fill="#10b981" fontSize="8.5" fontFamily="'JetBrains Mono', monospace" fontWeight="bold">
                ✓ REACT 19 COMPILER OPTIMIZATION RESULT:
              </text>
              <text x="14" y="34" fill={isDarkMode ? '#e2e8f0' : '#1e293b'} fontSize="8" fontFamily="'JetBrains Mono', monospace">
                • Automatic Memoization: <tspan fill="#00d8ff">100% Hooks Memoized (useMemo/useCallback auto-injected)</tspan>
              </text>
              <text x="14" y="48" fill={isDarkMode ? '#e2e8f0' : '#1e293b'} fontSize="8" fontFamily="'JetBrains Mono', monospace">
                • Bundle Elimination: <tspan fill="#38bdf8">0kb Client Bundle for Server Tree Components</tspan>
              </text>
              <text x="14" y="62" fill={isDarkMode ? '#94a3b8' : '#64748b'} fontSize="8" fontFamily="'JetBrains Mono', monospace">
                • Compilation Duration: <tspan fill="#10b981" fontWeight="bold">12.4ms (Turbopack SWC)</tspan>
              </text>
            </g>
          </g>
        )}

        {/* BOTTOM REAL-TIME COMPILER & TOOL TELEMETRY HUD */}
        <g transform="translate(10, 348)">
          <rect x="0" y="0" width="520" height="72" rx="0" fill={consoleBg} />
          <line x1="0" y1="0" x2="520" y2="0" stroke={cardBorder} strokeWidth="1" />

          {/* Left Telemetry Log */}
          <g transform="translate(16, 18)">
            <text x="0" y="0" fill={active.color} fontSize="9.5" fontFamily="'JetBrains Mono', monospace" fontWeight="bold">
              ✦ {viewMode.toUpperCase()} MODE <tspan fill={isDarkMode ? '#94a3b8' : '#64748b'}>// {active.name}</tspan>
            </text>
            <text x="0" y="16" fill={isDarkMode ? '#e2e8f0' : '#1e293b'} fontSize="8.5" fontFamily="'JetBrains Mono', monospace">
              ⚙ Role: <tspan fill={isDarkMode ? '#38bdf8' : '#0284c7'}>{active.role}</tspan>
            </text>
            <text x="0" y="30" fill={isDarkMode ? '#34d399' : '#059669'} fontSize="8" fontFamily="'JetBrains Mono', monospace">
              ✓ Core Specs: <tspan fill={isDarkMode ? '#a5b4fc' : '#4f46e5'}>{active.stats}</tspan>
            </text>
          </g>

          {/* Right Oscilloscope Waveform & Benchmark Metrics */}
          <g transform="translate(420, 14)">
            <rect width="90" height="42" rx="6" fill={isDarkMode ? '#080d1a' : '#f1f5f9'} stroke={cardBorder} strokeWidth="1" />
            <text x="45" y="14" textAnchor="middle" fill={active.color} fontSize="8" fontFamily="'JetBrains Mono', monospace" fontWeight="bold">
              {active.metric}
            </text>
            <text x="45" y="27" textAnchor="middle" fill={isDarkMode ? '#34d399' : '#059669'} fontSize="7" fontFamily="'JetBrains Mono', monospace">
              {active.bundle}
            </text>
            <text x="45" y="37" textAnchor="middle" fill={isDarkMode ? '#94a3b8' : '#64748b'} fontSize="6.5" fontFamily="'JetBrains Mono', monospace">
              ZERO-LATENCY
            </text>
          </g>
        </g>
      </svg>
    </div>
  );
};

/**
 * Animated Micro-Frontend Code & Monorepo AST Dependency Pipeline SVG
 * Features interactive nodes, bidirectional Module Federation data buses,
 * live code blocks, package dependency trees, and real-time packet emitters.
 */
export const AnimatedMicroFrontendSvg: React.FC<{
  activeNodeId?: string;
  onSelectNode?: (nodeId: string) => void;
  isPulsing?: boolean;
}> = ({ activeNodeId = 'turborepo', onSelectNode, isPulsing = false }) => {
  const { isDarkMode } = usePortfolio();

  const cardBg = isDarkMode ? '#070b14' : '#ffffff';
  const headerBg = isDarkMode ? '#0f172a' : '#f1f5f9';
  const textMuted = isDarkMode ? '#94a3b8' : '#64748b';
  const borderDefault = isDarkMode ? 'rgba(99, 102, 241, 0.25)' : 'rgba(79, 70, 229, 0.2)';
  const borderActive = '#6366f1';

  return (
    <div className="w-full h-full min-h-[360px] flex items-center justify-center p-2">
      <svg viewBox="0 0 820 370" className="w-full h-auto select-none overflow-visible">
        <defs>
          <filter id="mfeBlueprintGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <linearGradient id="busGradCyan" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>

          <linearGradient id="busGradPurple" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>

          <linearGradient id="busGradGreen" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
        </defs>

        {/* Precision Blueprint Grid Lines */}
        <g stroke={isDarkMode ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'} strokeWidth="1" strokeDasharray="4 4">
          <line x1="20" y1="90" x2="800" y2="90" />
          <line x1="20" y1="185" x2="800" y2="185" />
          <line x1="20" y1="280" x2="800" y2="280" />
          <line x1="280" y1="20" x2="280" y2="350" />
          <line x1="530" y1="20" x2="530" y2="350" />
        </g>

        {/* High-Tech Router Node in Center */}
        <g transform="translate(390, 185)" className="cursor-pointer" onClick={() => onSelectNode?.('federation')}>
          <circle r="36" fill={isDarkMode ? '#0d1527' : '#e0e7ff'} stroke="#6366f1" strokeWidth="2" filter="url(#mfeBlueprintGlow)" />
          <circle r="42" fill="none" stroke="#06b6d4" strokeWidth="1.2" strokeDasharray="6 4" className="animate-spin-slow origin-center" />
          <text textAnchor="middle" dy="-4" fill={isDarkMode ? '#38bdf8' : '#0284c7'} fontSize="9.5" fontFamily="'JetBrains Mono', monospace" fontWeight="bold">
            WEBPACK 5
          </text>
          <text textAnchor="middle" dy="10" fill={isDarkMode ? '#a5b4fc' : '#4338ca'} fontSize="8" fontFamily="'JetBrains Mono', monospace">
            MODULE FED
          </text>
          {isPulsing && (
            <circle r="50" fill="none" stroke="#38bdf8" strokeWidth="2" className="animate-ping" />
          )}
        </g>

        {/* Data Transmission Conduits from Host to Central Federation and Remotes */}
        <g strokeWidth="2" fill="none">
          {/* Host -> Center Router */}
          <path d="M 240 185 L 354 185" stroke="#6366f1" className="animated-wire-fast" />

          {/* Center Router -> Remote 1 (Dashboard) */}
          <path d="M 426 185 C 470 185, 490 85, 540 85" stroke="#06b6d4" className="animated-wire" />

          {/* Center Router -> Remote 2 (Design System Tokens) */}
          <path d="M 426 185 L 540 185" stroke="#a855f7" className="animated-wire-fast" />

          {/* Center Router -> Remote 3 (Event Bus & Checkout) */}
          <path d="M 426 185 C 470 185, 490 285, 540 285" stroke="#10b981" className="animated-wire" />
        </g>

        {/* Dynamic Traveling Data Packet Bullets */}
        <circle r="4.5" fill="#818cf8" filter="url(#mfeBlueprintGlow)">
          <animateMotion dur={isPulsing ? "0.8s" : "1.8s"} repeatCount="indefinite" path="M 240 185 L 354 185" />
        </circle>
        <circle r="4.5" fill="#38bdf8" filter="url(#mfeBlueprintGlow)">
          <animateMotion dur={isPulsing ? "0.9s" : "2.2s"} repeatCount="indefinite" path="M 426 185 C 470 185, 490 85, 540 85" />
        </circle>
        <circle r="4.5" fill="#c084fc" filter="url(#mfeBlueprintGlow)">
          <animateMotion dur={isPulsing ? "0.7s" : "1.6s"} begin="0.4s" repeatCount="indefinite" path="M 426 185 L 540 185" />
        </circle>
        <circle r="4.5" fill="#34d399" filter="url(#mfeBlueprintGlow)">
          <animateMotion dur={isPulsing ? "0.9s" : "2.4s"} begin="0.8s" repeatCount="indefinite" path="M 426 185 C 470 185, 490 285, 540 285" />
        </circle>

        {/* NODE 1: HOST CONTAINER SHELL (apps/shell/App.tsx) */}
        <g
          transform="translate(20, 65)"
          className="cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
          onClick={() => onSelectNode?.('turborepo')}
        >
          <rect
            width="220"
            height="240"
            rx="14"
            fill={cardBg}
            stroke={activeNodeId === 'turborepo' ? borderActive : borderDefault}
            strokeWidth={activeNodeId === 'turborepo' ? "2" : "1.2"}
            filter="url(#mfeBlueprintGlow)"
          />
          <rect width="220" height="28" rx="14" fill={headerBg} />
          <rect x="0" y="16" width="220" height="12" fill={headerBg} />
          <circle cx="14" cy="14" r="3.5" fill="#ef4444" />
          <circle cx="25" cy="14" r="3.5" fill="#f59e0b" />
          <circle cx="36" cy="14" r="3.5" fill="#10b981" />
          <text x="118" y="18" textAnchor="middle" fill={isDarkMode ? '#818cf8' : '#4f46e5'} fontSize="9.5" fontFamily="'JetBrains Mono', monospace" fontWeight="bold">
            apps/shell/App.tsx
          </text>

          {/* Code Body */}
          <g transform="translate(14, 46)" fontFamily="'JetBrains Mono', monospace" fontSize="8.5">
            <text y="0" fill={textMuted}>// Host Monorepo Shell</text>
            <text y="15" fill={isDarkMode ? '#f43f5e' : '#e11d48'}>import <tspan fill={isDarkMode ? '#e2e8f0' : '#1e293b'}>lazy</tspan> from <tspan fill="#34d399">'react'</tspan>;</text>
            <text y="30" fill={isDarkMode ? '#f43f5e' : '#e11d48'}>import <tspan fill={isDarkMode ? '#e2e8f0' : '#1e293b'}>tokens</tspan> from <tspan fill="#34d399">'@ui/tokens'</tspan>;</text>
            <text y="50" fill={isDarkMode ? '#f43f5e' : '#e11d48'}>const <tspan fill={isDarkMode ? '#38bdf8' : '#0284c7'}>RemoteDashboard</tspan> =</text>
            <text y="65" fill={isDarkMode ? '#c084fc' : '#9333ea'}>  lazy(<tspan fill={isDarkMode ? '#e2e8f0' : '#1e293b'}>() =&gt;</tspan> import(<tspan fill="#34d399">'dash/App'</tspan>));</text>
            <text y="88" fill={isDarkMode ? '#38bdf8' : '#0284c7'}>&lt;RemoteDashboard /&gt;</text>
            <text y="112" fill={isDarkMode ? '#34d399' : '#059669'}>✓ Turborepo pnpm workspace</text>
            <text y="127" fill={isDarkMode ? '#38bdf8' : '#0284c7'}>✓ Shared React Singleton</text>
            <text y="142" fill={isDarkMode ? '#818cf8' : '#4f46e5'}>✓ 85% Faster CI Builds</text>
            <text y="157" fill={textMuted}>✓ Zero Bundle Duplication</text>
          </g>

          <circle cx="220" cy="120" r="5" fill="#6366f1" className="pulse-glow" />
        </g>

        {/* NODE 2: REMOTE MICRO-FRONTEND (apps/dashboard) */}
        <g
          transform="translate(540, 35)"
          className="cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
          onClick={() => onSelectNode?.('federation')}
        >
          <rect
            width="260"
            height="90"
            rx="12"
            fill={cardBg}
            stroke={activeNodeId === 'federation' ? '#06b6d4' : borderDefault}
            strokeWidth={activeNodeId === 'federation' ? "2" : "1.2"}
            filter="url(#mfeBlueprintGlow)"
          />
          <rect width="260" height="24" rx="12" fill={headerBg} />
          <text x="14" y="16" fill={isDarkMode ? '#38bdf8' : '#0284c7'} fontSize="9" fontFamily="'JetBrains Mono', monospace" fontWeight="bold">
            remotes/dashboard/remoteEntry.js
          </text>
          <g transform="translate(14, 40)" fontFamily="'JetBrains Mono', monospace" fontSize="8">
            <text y="0" fill={isDarkMode ? '#f43f5e' : '#e11d48'}>export default function <tspan fill={isDarkMode ? '#38bdf8' : '#0284c7'}>DashboardRemote()</tspan> {'{'}</text>
            <text y="14" fill={isDarkMode ? '#f43f5e' : '#e11d48'}>  const <tspan fill={isDarkMode ? '#e2e8f0' : '#1e293b'}>metrics = useLiveTelemetry();</tspan></text>
            <text y="28" fill={isDarkMode ? '#34d399' : '#059669'}>  return &lt;AnalyticsGrid data={'{metrics}'} /&gt;;</text>
          </g>
          <circle cx="0" cy="50" r="4.5" fill="#38bdf8" />
        </g>

        {/* NODE 3: ATOMIC DESIGN TOKENS (packages/ui/tokens.ts) */}
        <g
          transform="translate(540, 138)"
          className="cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
          onClick={() => onSelectNode?.('design_tokens')}
        >
          <rect
            width="260"
            height="90"
            rx="12"
            fill={cardBg}
            stroke={activeNodeId === 'design_tokens' ? '#a855f7' : borderDefault}
            strokeWidth={activeNodeId === 'design_tokens' ? "2" : "1.2"}
            filter="url(#mfeBlueprintGlow)"
          />
          <rect width="260" height="24" rx="12" fill={headerBg} />
          <text x="14" y="16" fill={isDarkMode ? '#c084fc' : '#9333ea'} fontSize="9" fontFamily="'JetBrains Mono', monospace" fontWeight="bold">
            packages/ui/tokens.ts (Design System)
          </text>
          <g transform="translate(14, 40)" fontFamily="'JetBrains Mono', monospace" fontSize="8">
            <text y="0" fill={isDarkMode ? '#f43f5e' : '#e11d48'}>export const <tspan fill={isDarkMode ? '#38bdf8' : '#0284c7'}>theme = createTokens({'{'}</tspan></text>
            <text y="14" fill={isDarkMode ? '#fbbf24' : '#d97706'}>  brand: <tspan fill="#34d399">'#6366f1'</tspan>, radius: <tspan fill="#38bdf8">'0.75rem'</tspan>,</text>
            <text y="28" fill={isDarkMode ? '#fbbf24' : '#d97706'}>  contrast: <tspan fill="#34d399">'WCAG AA 4.5:1'</tspan></text>
          </g>
          <circle cx="0" cy="47" r="4.5" fill="#c084fc" />
        </g>

        {/* NODE 4: EVENT BUS & STATE CHANNEL (packages/event-bus) */}
        <g
          transform="translate(540, 240)"
          className="cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
          onClick={() => onSelectNode?.('event_bus')}
        >
          <rect
            width="260"
            height="90"
            rx="12"
            fill={cardBg}
            stroke={activeNodeId === 'event_bus' ? '#10b981' : borderDefault}
            strokeWidth={activeNodeId === 'event_bus' ? "2" : "1.2"}
            filter="url(#mfeBlueprintGlow)"
          />
          <rect width="260" height="24" rx="12" fill={headerBg} />
          <text x="14" y="16" fill={isDarkMode ? '#34d399' : '#059669'} fontSize="9" fontFamily="'JetBrains Mono', monospace" fontWeight="bold">
            packages/event-bus/channel.ts
          </text>
          <g transform="translate(14, 40)" fontFamily="'JetBrains Mono', monospace" fontSize="8">
            <text y="0" fill={isDarkMode ? '#f43f5e' : '#e11d48'}>export const <tspan fill={isDarkMode ? '#38bdf8' : '#0284c7'}>bus = createTypedEventBus&lt;{'{'}</tspan></text>
            <text y="14" fill={isDarkMode ? '#38bdf8' : '#0284c7'}>  'auth:login': {'{ userId: string }'};</text>
            <text y="28" fill={isDarkMode ? '#34d399' : '#059669'}>{'}'}&gt;(); // &lt;1ms Cross-App Dispatch</text>
          </g>
          <circle cx="0" cy="45" r="4.5" fill="#34d399" />
        </g>
      </svg>
    </div>
  );
};

/**
 * Animated React Server Components (RSC) & Core Web Vitals Blueprint SVG
 * Features multi-tier edge pipeline: Edge Middleware -> RSC Server Component ->
 * HTTP/2 Flight Protocol stream -> Selective Progressive Hydration Island.
 */
export const AnimatedRscPipelineSvg: React.FC<{
  activeNodeId?: string;
  onSelectNode?: (nodeId: string) => void;
  isPulsing?: boolean;
}> = ({ activeNodeId = 'edge_middleware', onSelectNode, isPulsing = false }) => {
  const { isDarkMode } = usePortfolio();

  const cardBg = isDarkMode ? '#070b14' : '#ffffff';
  const headerBg = isDarkMode ? '#0f172a' : '#f1f5f9';
  const textMuted = isDarkMode ? '#94a3b8' : '#64748b';
  const borderDefault = isDarkMode ? 'rgba(99, 102, 241, 0.25)' : 'rgba(79, 70, 229, 0.2)';

  return (
    <div className="w-full h-full min-h-[360px] flex items-center justify-center p-2">
      <svg viewBox="0 0 820 370" className="w-full h-auto select-none overflow-visible">
        <defs>
          <filter id="rscBlueprintGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Blueprint Flow Conduits Between Pipeline Stages */}
        <g strokeWidth="2" fill="none">
          <path d="M 185 185 L 225 185" stroke="#06b6d4" className="animated-wire-fast" />
          <path d="M 410 185 L 450 185" stroke="#6366f1" className="animated-wire-fast" />
          <path d="M 630 185 L 670 185" stroke="#10b981" className="animated-wire-fast" />
        </g>

        {/* Traveling Flight Protocol Packets with Animation */}
        <circle r="4.5" fill="#38bdf8" filter="url(#rscBlueprintGlow)">
          <animateMotion dur={isPulsing ? "0.6s" : "1.2s"} repeatCount="indefinite" path="M 185 185 L 225 185" />
        </circle>
        <circle r="4.5" fill="#818cf8" filter="url(#rscBlueprintGlow)">
          <animateMotion dur={isPulsing ? "0.6s" : "1.2s"} begin="0.3s" repeatCount="indefinite" path="M 410 185 L 450 185" />
        </circle>
        <circle r="4.5" fill="#34d399" filter="url(#rscBlueprintGlow)">
          <animateMotion dur={isPulsing ? "0.6s" : "1.2s"} begin="0.6s" repeatCount="indefinite" path="M 630 185 L 670 185" />
        </circle>

        {/* STAGE 1: EDGE MIDDLEWARE & GEOLOCATION */}
        <g
          transform="translate(15, 65)"
          className="cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
          onClick={() => onSelectNode?.('edge_middleware')}
        >
          <rect
            width="170"
            height="240"
            rx="14"
            fill={cardBg}
            stroke={activeNodeId === 'edge_middleware' ? '#06b6d4' : borderDefault}
            strokeWidth={activeNodeId === 'edge_middleware' ? "2" : "1.2"}
            filter="url(#rscBlueprintGlow)"
          />
          <rect width="170" height="28" rx="14" fill={headerBg} />
          <text x="12" y="18" fill={isDarkMode ? '#38bdf8' : '#0284c7'} fontSize="9" fontFamily="'JetBrains Mono', monospace" fontWeight="bold">
            middleware.ts (Edge)
          </text>
          <g transform="translate(12, 46)" fontFamily="'JetBrains Mono', monospace" fontSize="8">
            <text y="0" fill={textMuted}>// Edge Routing</text>
            <text y="15" fill={isDarkMode ? '#f43f5e' : '#e11d48'}>export function</text>
            <text y="30" fill={isDarkMode ? '#38bdf8' : '#0284c7'}>middleware(req) {'{'}</text>
            <text y="45" fill={isDarkMode ? '#f43f5e' : '#e11d48'}>  const <tspan fill={isDarkMode ? '#e2e8f0' : '#1e293b'}>geo =</tspan></text>
            <text y="60" fill={isDarkMode ? '#e2e8f0' : '#1e293b'}>    req.geo?.city;</text>
            <text y="75" fill={isDarkMode ? '#f43f5e' : '#e11d48'}>  return <tspan fill={isDarkMode ? '#38bdf8' : '#0284c7'}>NextResponse</tspan></text>
            <text y="90" fill={isDarkMode ? '#38bdf8' : '#0284c7'}>    .next();</text>
            <text y="105" fill={isDarkMode ? '#c084fc' : '#9333ea'}>{'}'}</text>
            <text y="128" fill={isDarkMode ? '#34d399' : '#059669'}>⚡ &lt;8ms Edge TTFB</text>
            <text y="143" fill={isDarkMode ? '#38bdf8' : '#0284c7'}>⚡ Auth Token Gate</text>
            <text y="158" fill={textMuted}>⚡ Vercel Edge Net</text>
          </g>
          <circle cx="170" cy="120" r="4.5" fill="#06b6d4" />
        </g>

        {/* STAGE 2: REACT SERVER COMPONENTS (RSC) TREE */}
        <g
          transform="translate(225, 55)"
          className="cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
          onClick={() => onSelectNode?.('rsc_layer')}
        >
          <rect
            width="185"
            height="260"
            rx="14"
            fill={cardBg}
            stroke={activeNodeId === 'rsc_layer' ? '#6366f1' : borderDefault}
            strokeWidth={activeNodeId === 'rsc_layer' ? "2" : "1.2"}
            filter="url(#rscBlueprintGlow)"
          />
          <rect width="185" height="28" rx="14" fill={headerBg} />
          <text x="12" y="18" fill={isDarkMode ? '#818cf8' : '#4f46e5'} fontSize="9" fontFamily="'JetBrains Mono', monospace" fontWeight="bold">
            app/dashboard/page.tsx
          </text>
          <g transform="translate(12, 46)" fontFamily="'JetBrains Mono', monospace" fontSize="8">
            <text y="0" fill={textMuted}>// Async Server Component</text>
            <text y="15" fill={isDarkMode ? '#f43f5e' : '#e11d48'}>export default async</text>
            <text y="30" fill={isDarkMode ? '#f43f5e' : '#e11d48'}>function <tspan fill={isDarkMode ? '#38bdf8' : '#0284c7'}>Dashboard()</tspan> {'{'}</text>
            <text y="45" fill={isDarkMode ? '#f43f5e' : '#e11d48'}>  const <tspan fill={isDarkMode ? '#e2e8f0' : '#1e293b'}>metrics = await</tspan></text>
            <text y="60" fill={isDarkMode ? '#38bdf8' : '#0284c7'}>    db.queryVitals();</text>
            <text y="78" fill={isDarkMode ? '#f43f5e' : '#e11d48'}>  return (</text>
            <text y="93" fill={isDarkMode ? '#38bdf8' : '#0284c7'}>    &lt;Suspense <tspan fill="#fbbf24">fallback</tspan>...</text>
            <text y="108" fill={isDarkMode ? '#38bdf8' : '#0284c7'}>      &lt;MetricsGrid /&gt;</text>
            <text y="123" fill={isDarkMode ? '#38bdf8' : '#0284c7'}>    &lt;/Suspense&gt;</text>
            <text y="138" fill={isDarkMode ? '#c084fc' : '#9333ea'}>  );</text>
            <text y="153" fill={isDarkMode ? '#c084fc' : '#9333ea'}>{'}'}</text>
            <text y="174" fill={isDarkMode ? '#34d399' : '#059669'}>✓ -45% Client Bundle JS</text>
            <text y="189" fill={isDarkMode ? '#38bdf8' : '#0284c7'}>✓ Direct DB ORM Ingest</text>
          </g>
          <circle cx="185" cy="130" r="4.5" fill="#6366f1" />
        </g>

        {/* STAGE 3: HTTP/2 FLIGHT SERIALIZATION STREAM */}
        <g
          transform="translate(450, 55)"
          className="cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
          onClick={() => onSelectNode?.('streaming_suspense')}
        >
          <rect
            width="180"
            height="260"
            rx="14"
            fill={cardBg}
            stroke={activeNodeId === 'streaming_suspense' ? '#a855f7' : borderDefault}
            strokeWidth={activeNodeId === 'streaming_suspense' ? "2" : "1.2"}
            filter="url(#rscBlueprintGlow)"
          />
          <rect width="180" height="28" rx="14" fill={headerBg} />
          <text x="12" y="18" fill={isDarkMode ? '#c084fc' : '#9333ea'} fontSize="9" fontFamily="'JetBrains Mono', monospace" fontWeight="bold">
            HTTP/2 Flight Stream
          </text>
          <g transform="translate(12, 46)" fontFamily="'JetBrains Mono', monospace" fontSize="8">
            <text y="0" fill={textMuted}>// Serialized RSC Flight</text>
            <text y="16" fill={isDarkMode ? '#fbbf24' : '#d97706'}>M1:{"{"}"id":"./Chart.js"{"}"}</text>
            <text y="32" fill={isDarkMode ? '#e2e8f0' : '#1e293b'}>S2:"react.suspense"</text>
            <text y="48" fill={isDarkMode ? '#34d399' : '#059669'}>J0:[["$","div",null,{"{"}</text>
            <text y="64" fill={isDarkMode ? '#34d399' : '#059669'}>  "data": "$@1",</text>
            <text y="80" fill={isDarkMode ? '#34d399' : '#059669'}>  "lcp": 780</text>
            <text y="96" fill={isDarkMode ? '#e2e8f0' : '#1e293b'}>{"}"}]]</text>
            <text y="116" fill={isDarkMode ? '#38bdf8' : '#0284c7'}>3:{"{"}"status": 200{"}"}</text>
            <text y="142" fill={isDarkMode ? '#34d399' : '#059669'}>⚡ Zero Hydration Jitter</text>
            <text y="157" fill={isDarkMode ? '#c084fc' : '#9333ea'}>⚡ Concurrent Suspense</text>
            <text y="172" fill={isDarkMode ? '#38bdf8' : '#0284c7'}>⚡ Progressive Chunking</text>
          </g>
          <circle cx="180" cy="130" r="4.5" fill="#a855f7" />
        </g>

        {/* STAGE 4: CLIENT HYDRATION & CORE WEB VITALS */}
        <g
          transform="translate(670, 65)"
          className="cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
          onClick={() => onSelectNode?.('tanstack_sync')}
        >
          <rect
            width="135"
            height="240"
            rx="14"
            fill={cardBg}
            stroke={activeNodeId === 'tanstack_sync' ? '#10b981' : borderDefault}
            strokeWidth={activeNodeId === 'tanstack_sync' ? "2" : "1.2"}
            filter="url(#rscBlueprintGlow)"
          />
          <rect width="135" height="28" rx="14" fill={headerBg} />
          <text x="10" y="18" fill={isDarkMode ? '#34d399' : '#059669'} fontSize="8.5" fontFamily="'JetBrains Mono', monospace" fontWeight="bold">
            'use client' Island
          </text>
          <g transform="translate(10, 46)" fontFamily="'JetBrains Mono', monospace" fontSize="7.8">
            <text y="0" fill={textMuted}>// Interactive DOM</text>
            <text y="15" fill={isDarkMode ? '#f43f5e' : '#e11d48'}>export function</text>
            <text y="28" fill={isDarkMode ? '#38bdf8' : '#0284c7'}>ChartIsland() {'{'}</text>
            <text y="42" fill={isDarkMode ? '#e2e8f0' : '#1e293b'}>  useHydrate();</text>
            <text y="56" fill={isDarkMode ? '#34d399' : '#059669'}>  return &lt;DOM /&gt;;</text>
            <text y="70" fill={isDarkMode ? '#c084fc' : '#9333ea'}>{'}'}</text>
            <text y="95" fill={isDarkMode ? '#34d399' : '#059669'} fontWeight="bold">100 / 100 PERF</text>
            <text y="110" fill={isDarkMode ? '#34d399' : '#059669'}>0.78s LCP</text>
            <text y="125" fill={isDarkMode ? '#34d399' : '#059669'}>0.00 CLS</text>
            <text y="140" fill={isDarkMode ? '#38bdf8' : '#0284c7'}>99.8% Cache</text>
          </g>
          <circle cx="0" cy="120" r="4.5" fill="#10b981" />
        </g>
      </svg>
    </div>
  );
};

/**
 * Animated Generative AI & Real-Time Token Streaming Blueprint SVG
 * Features HTTP chunked token stream -> streaming Zod AST schema parser -> dynamic React UI widget.
 */
export const AnimatedAiTokenStreamSvg: React.FC<{
  activeNodeId?: string;
  onSelectNode?: (nodeId: string) => void;
  isPulsing?: boolean;
}> = ({ activeNodeId = 'token_stream', onSelectNode, isPulsing = false }) => {
  const { isDarkMode } = usePortfolio();

  const cardBg = isDarkMode ? '#070b14' : '#ffffff';
  const headerBg = isDarkMode ? '#0f172a' : '#f1f5f9';
  const textMuted = isDarkMode ? '#94a3b8' : '#64748b';
  const borderDefault = isDarkMode ? 'rgba(99, 102, 241, 0.25)' : 'rgba(79, 70, 229, 0.2)';

  return (
    <div className="w-full h-full min-h-[360px] flex items-center justify-center p-2">
      <svg viewBox="0 0 820 370" className="w-full h-auto select-none overflow-visible">
        <defs>
          <filter id="aiBlueprintGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Pipeline Flow Conduits */}
        <g strokeWidth="2" fill="none">
          <path d="M 235 185 L 285 185" stroke="#10b981" className="animated-wire-fast" />
          <path d="M 525 185 L 575 185" stroke="#6366f1" className="animated-wire-fast" />
        </g>

        {/* Traveling Token Particles */}
        <circle r="4.5" fill="#34d399" filter="url(#aiBlueprintGlow)">
          <animateMotion dur={isPulsing ? "0.5s" : "1.1s"} repeatCount="indefinite" path="M 235 185 L 285 185" />
        </circle>
        <circle r="4.5" fill="#818cf8" filter="url(#aiBlueprintGlow)">
          <animateMotion dur={isPulsing ? "0.5s" : "1.1s"} begin="0.55s" repeatCount="indefinite" path="M 525 185 L 575 185" />
        </circle>

        {/* STAGE 1: VERCEL AI SDK TOKEN STREAM GENERATOR */}
        <g
          transform="translate(20, 55)"
          className="cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
          onClick={() => onSelectNode?.('token_stream')}
        >
          <rect
            width="215"
            height="260"
            rx="14"
            fill={cardBg}
            stroke={activeNodeId === 'token_stream' ? '#10b981' : borderDefault}
            strokeWidth={activeNodeId === 'token_stream' ? "2" : "1.2"}
            filter="url(#aiBlueprintGlow)"
          />
          <rect width="215" height="28" rx="14" fill={headerBg} />
          <text x="14" y="18" fill={isDarkMode ? '#34d399' : '#059669'} fontSize="9" fontFamily="'JetBrains Mono', monospace" fontWeight="bold">
            api/chat/stream.ts (AI SDK)
          </text>
          <g transform="translate(14, 46)" fontFamily="'JetBrains Mono', monospace" fontSize="8.2">
            <text y="0" fill={textMuted}>// Token Stream Pipe</text>
            <text y="15" fill={isDarkMode ? '#f43f5e' : '#e11d48'}>import <tspan fill={isDarkMode ? '#e2e8f0' : '#1e293b'}>'{'{ streamText }'}'</tspan> from <tspan fill="#34d399">'ai'</tspan>;</text>
            <text y="32" fill={isDarkMode ? '#f43f5e' : '#e11d48'}>export async function</text>
            <text y="46" fill={isDarkMode ? '#38bdf8' : '#0284c7'}>POST<tspan fill={isDarkMode ? '#e2e8f0' : '#1e293b'}>(req: Request) {'{'}</tspan></text>
            <text y="62" fill={isDarkMode ? '#f43f5e' : '#e11d48'}>  const <tspan fill={isDarkMode ? '#e2e8f0' : '#1e293b'}>stream = await</tspan></text>
            <text y="76" fill={isDarkMode ? '#38bdf8' : '#0284c7'}>    streamText({'{ model: gemini }'});</text>
            <text y="94" fill={isDarkMode ? '#f43f5e' : '#e11d48'}>  return <tspan fill={isDarkMode ? '#38bdf8' : '#0284c7'}>stream.toDataStreamResponse();</tspan></text>
            <text y="110" fill={isDarkMode ? '#c084fc' : '#9333ea'}>{'}'}</text>
            <text y="132" fill={isDarkMode ? '#34d399' : '#059669'}>⚡ &lt;45ms First Token Latency</text>
            <text y="148" fill={isDarkMode ? '#38bdf8' : '#0284c7'}>⚡ Chunked SSE Transfer Protocol</text>
            <text y="164" fill={textMuted}>⚡ Resilient Retry Pipeline</text>
          </g>
          <circle cx="215" cy="130" r="4.5" fill="#10b981" />
        </g>

        {/* STAGE 2: REAL-TIME AST PARSER & ZOD SCHEMA GUARD */}
        <g
          transform="translate(285, 55)"
          className="cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
          onClick={() => onSelectNode?.('ast_parser')}
        >
          <rect
            width="240"
            height="260"
            rx="14"
            fill={cardBg}
            stroke={activeNodeId === 'ast_parser' ? '#6366f1' : borderDefault}
            strokeWidth={activeNodeId === 'ast_parser' ? "2" : "1.2"}
            filter="url(#aiBlueprintGlow)"
          />
          <rect width="240" height="28" rx="14" fill={headerBg} />
          <text x="14" y="18" fill={isDarkMode ? '#818cf8' : '#4f46e5'} fontSize="9" fontFamily="'JetBrains Mono', monospace" fontWeight="bold">
            schema/widget.zod.ts (AST Guard)
          </text>
          <g transform="translate(14, 46)" fontFamily="'JetBrains Mono', monospace" fontSize="8.2">
            <text y="0" fill={textMuted}>// Type-Safe AST Evaluator</text>
            <text y="15" fill={isDarkMode ? '#f43f5e' : '#e11d48'}>export const <tspan fill={isDarkMode ? '#38bdf8' : '#0284c7'}>WidgetSchema</tspan> =</text>
            <text y="30" fill={isDarkMode ? '#e2e8f0' : '#1e293b'}>  z.object({'{'}</text>
            <text y="45" fill={isDarkMode ? '#fbbf24' : '#d97706'}>    type: <tspan fill="#34d399">z.enum(['Chart', 'Table'])</tspan>,</text>
            <text y="60" fill={isDarkMode ? '#fbbf24' : '#d97706'}>    series: <tspan fill="#38bdf8">z.array(z.number())</tspan>,</text>
            <text y="75" fill={isDarkMode ? '#fbbf24' : '#d97706'}>    realtime: <tspan fill="#c084fc">z.boolean()</tspan></text>
            <text y="90" fill={isDarkMode ? '#e2e8f0' : '#1e293b'}>  {'}'});</text>
            <text y="112" fill={isDarkMode ? '#34d399' : '#059669'}>✓ 100% Type-Safe Tool Invocation</text>
            <text y="128" fill={isDarkMode ? '#818cf8' : '#4f46e5'}>✓ Real-Time Incomplete JSON Repair</text>
            <text y="144" fill={isDarkMode ? '#38bdf8' : '#0284c7'}>✓ Zero Prompt Injection Leaks</text>
            <text y="160" fill={textMuted}>✓ 60 FPS Canvas & AST Reconciler</text>
          </g>
          <circle cx="240" cy="130" r="4.5" fill="#6366f1" />
        </g>

        {/* STAGE 3: GENERATIVE REACT UI COMPONENT WIDGET */}
        <g
          transform="translate(575, 55)"
          className="cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
          onClick={() => onSelectNode?.('error_boundary')}
        >
          <rect
            width="225"
            height="260"
            rx="14"
            fill={cardBg}
            stroke={activeNodeId === 'error_boundary' ? '#06b6d4' : borderDefault}
            strokeWidth={activeNodeId === 'error_boundary' ? "2" : "1.2"}
            filter="url(#aiBlueprintGlow)"
          />
          <rect width="225" height="28" rx="14" fill={headerBg} />
          <text x="14" y="18" fill={isDarkMode ? '#38bdf8' : '#0284c7'} fontSize="9" fontFamily="'JetBrains Mono', monospace" fontWeight="bold">
            &lt;GenerativeWidget /&gt;
          </text>
          <g transform="translate(14, 46)" fontFamily="'JetBrains Mono', monospace" fontSize="8.2">
            <text y="0" fill={textMuted}>// Live Hydrated React Widget</text>
            <text y="15" fill={isDarkMode ? '#f43f5e' : '#e11d48'}>export function <tspan fill={isDarkMode ? '#38bdf8' : '#0284c7'}>AIWidget</tspan>() {'{'}</text>
            <text y="30" fill={isDarkMode ? '#f43f5e' : '#e11d48'}>  return (</text>
            <text y="45" fill={isDarkMode ? '#38bdf8' : '#0284c7'}>    &lt;ErrorBoundary <tspan fill="#fbbf24">fallback</tspan>={'{<Retry/>}'}&gt;</text>
            <text y="60" fill={isDarkMode ? '#34d399' : '#059669'}>      &lt;DynamicChart series={'{data}'} /&gt;</text>
            <text y="75" fill={isDarkMode ? '#38bdf8' : '#0284c7'}>    &lt;/ErrorBoundary&gt;</text>
            <text y="90" fill={isDarkMode ? '#c084fc' : '#9333ea'}>  );</text>
            <text y="105" fill={isDarkMode ? '#c084fc' : '#9333ea'}>{'}'}</text>
            <text y="128" fill={isDarkMode ? '#34d399' : '#059669'}>✓ 60 FPS Smooth Render</text>
            <text y="144" fill={isDarkMode ? '#38bdf8' : '#0284c7'}>✓ Offline IndexedDB Cache</text>
            <text y="160" fill={textMuted}>✓ 99.9% Resilient Error Recovery</text>
          </g>
          <circle cx="0" cy="130" r="4.5" fill="#06b6d4" />
        </g>
      </svg>
    </div>
  );
};

/**
 * Animated Performance Gauge with Real Coding & Web Vitals Metrics
 */
export const AnimatedPerformanceGaugeSvg: React.FC<{
  score?: number;
  label?: string;
  metric?: string;
}> = ({ score = 100, label = 'Lighthouse', metric = '100 / 100' }) => {
  const { isDarkMode } = usePortfolio();
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center p-3">
      <div className="relative w-28 h-28 flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90 select-none">
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke={isDarkMode ? '#1e293b' : '#e2e8f0'}
            strokeWidth="7"
          />
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="url(#codeGaugeGrad)"
            strokeWidth="7"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
          <defs>
            <linearGradient id="codeGaugeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="50%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#6366f1" />
            </linearGradient>
          </defs>
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className={`text-sm font-extrabold font-mono ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>{score}</span>
          <span className={`text-[9px] font-mono ${isDarkMode ? 'text-neutral-400' : 'text-slate-500'}`}>VITALS</span>
        </div>
      </div>
      <div className={`text-xs font-bold mt-1 ${isDarkMode ? 'text-neutral-200' : 'text-slate-800'}`}>{label}</div>
      <div className={`text-[11px] font-mono ${isDarkMode ? 'text-indigo-300' : 'text-indigo-600'}`}>{metric}</div>
    </div>
  );
};
