import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';

export interface TechItem {
  id: string;
  name: string;
  category: string;
  color: string;
  role: string;
  highlight: string;
  icon: (size: number, isDark: boolean) => React.ReactNode;
  angle: number; // in degrees for circular orbital layout
}

export const TechConstellationBanner: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { isDarkMode, sound } = usePortfolio();
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [autoRotate, setAutoRotate] = useState(true);

  const technologies: TechItem[] = [
    {
      id: 'react',
      name: 'React',
      category: 'UI Architecture',
      color: '#00d8ff',
      role: 'Concurrent Server Components & Actions',
      highlight: '0.62s LCP • Concurrent Roots',
      angle: 0,
      icon: (s) => (
        <g transform={`translate(${-s / 2}, ${-s / 2})`}>
          <ellipse cx={s / 2} cy={s / 2} rx={s * 0.44} ry={s * 0.17} fill="none" stroke="#00d8ff" strokeWidth="1.5" transform={`rotate(30, ${s / 2}, ${s / 2})`} />
          <ellipse cx={s / 2} cy={s / 2} rx={s * 0.44} ry={s * 0.17} fill="none" stroke="#00d8ff" strokeWidth="1.5" transform={`rotate(90, ${s / 2}, ${s / 2})`} />
          <ellipse cx={s / 2} cy={s / 2} rx={s * 0.44} ry={s * 0.17} fill="none" stroke="#00d8ff" strokeWidth="1.5" transform={`rotate(150, ${s / 2}, ${s / 2})`} />
          <circle cx={s / 2} cy={s / 2} r={s * 0.09} fill="#00d8ff" />
        </g>
      )
    },
    {
      id: 'ts',
      name: 'TypeScript',
      category: 'Strict Typing',
      color: '#3178c6',
      role: 'End-to-End Type Safety & AST Codegen',
      highlight: 'Zero any • Strict Compiler',
      angle: 45,
      icon: (s) => (
        <g transform={`translate(${-s / 2}, ${-s / 2})`}>
          <rect width={s} height={s} rx={s * 0.22} fill="#3178c6" />
          <path d={`M ${s * 0.3} ${s * 0.35} L ${s * 0.55} ${s * 0.35} M ${s * 0.425} ${s * 0.35} L ${s * 0.425} ${s * 0.72}`} stroke="#ffffff" strokeWidth="1.6" strokeLinecap="round" />
          <path d={`M ${s * 0.75} ${s * 0.42} C ${s * 0.65} ${s * 0.38}, ${s * 0.58} ${s * 0.45}, ${s * 0.62} ${s * 0.54} C ${s * 0.66} ${s * 0.62}, ${s * 0.76} ${s * 0.62}, ${s * 0.72} ${s * 0.72} C ${s * 0.68} ${s * 0.76}, ${s * 0.58} ${s * 0.74}, ${s * 0.56} ${s * 0.68}`} fill="none" stroke="#ffffff" strokeWidth="1.6" strokeLinecap="round" />
        </g>
      )
    },
    {
      id: 'nextjs',
      name: 'Next.js',
      category: 'Fullstack Platform',
      color: isDarkMode ? '#f8fafc' : '#0f172a',
      role: 'Partial Prerendering & Turbopack SSR',
      highlight: 'Edge Runtime • Code Splitting',
      angle: 90,
      icon: (s, dark) => (
        <g transform={`translate(${-s / 2}, ${-s / 2})`}>
          <circle cx={s / 2} cy={s / 2} r={s * 0.46} fill={dark ? '#090d16' : '#ffffff'} stroke={dark ? '#ffffff' : '#000000'} strokeWidth="1.2" />
          <path d={`M ${s * 0.35} ${s * 0.7} L ${s * 0.35} ${s * 0.3} L ${s * 0.65} ${s * 0.7} L ${s * 0.65} ${s * 0.3}`} fill="none" stroke={dark ? '#ffffff' : '#000000'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      )
    },
    {
      id: 'tailwind',
      name: 'Tailwind CSS',
      category: 'Design Systems',
      color: '#38bdf8',
      role: 'Zero-Runtime CSS & Design Tokens',
      highlight: '<8kb CSS • Instant Web Vitals',
      angle: 135,
      icon: (s) => (
        <g transform={`translate(${-s / 2}, ${-s / 2})`}>
          <path d={`M ${s * 0.2} ${s * 0.55} C ${s * 0.25} ${s * 0.35}, ${s * 0.45} ${s * 0.35}, ${s * 0.5} ${s * 0.55} C ${s * 0.55} ${s * 0.4}, ${s * 0.7} ${s * 0.4}, ${s * 0.8} ${s * 0.55} C ${s * 0.75} ${s * 0.75}, ${s * 0.55} ${s * 0.75}, ${s * 0.5} ${s * 0.55} C ${s * 0.45} ${s * 0.7}, ${s * 0.3} ${s * 0.7}, ${s * 0.2} ${s * 0.55} Z`} fill="#38bdf8" />
        </g>
      )
    },
    {
      id: 'node',
      name: 'Node.js',
      category: 'Backend Runtime',
      color: '#22c55e',
      role: 'Asynchronous Microservices & REST/BFF',
      highlight: '<12ms TTFB • Stream Buffers',
      angle: 180,
      icon: (s) => (
        <g transform={`translate(${-s / 2}, ${-s / 2})`}>
          <polygon points={`${s * 0.5},${s * 0.14} ${s * 0.85},${s * 0.34} ${s * 0.85},${s * 0.66} ${s * 0.5},${s * 0.86} ${s * 0.15},${s * 0.66} ${s * 0.15},${s * 0.34}`} fill="#22c55e" />
          <circle cx={s * 0.5} cy={s * 0.5} r={s * 0.18} fill="#ffffff" />
        </g>
      )
    },
    {
      id: 'graphql',
      name: 'GraphQL',
      category: 'API Data Layer',
      color: '#e10098',
      role: 'Apollo Federation & Unified Graph Schema',
      highlight: 'Type-Safe Single Endpoint',
      angle: 225,
      icon: (s) => (
        <g transform={`translate(${-s / 2}, ${-s / 2})`}>
          <polygon points={`${s * 0.5},${s * 0.16} ${s * 0.82},${s * 0.34} ${s * 0.82},${s * 0.66} ${s * 0.5},${s * 0.84} ${s * 0.18},${s * 0.66} ${s * 0.18},${s * 0.34}`} fill="none" stroke="#e10098" strokeWidth="1.5" />
          <circle cx={s * 0.5} cy={s * 0.16} r="2" fill="#e10098" />
          <circle cx={s * 0.82} cy={s * 0.34} r="2" fill="#e10098" />
          <circle cx={s * 0.82} cy={s * 0.66} r="2" fill="#e10098" />
          <circle cx={s * 0.5} cy={s * 0.84} r="2" fill="#e10098" />
          <circle cx={s * 0.18} cy={s * 0.66} r="2" fill="#e10098" />
          <circle cx={s * 0.18} cy={s * 0.34} r="2" fill="#e10098" />
        </g>
      )
    },
    {
      id: 'python',
      name: 'Python & AI',
      category: 'AI Microservices',
      color: '#3b82f6',
      role: 'FastAPI Microservices & RAG Pipelines',
      highlight: 'Gemini SDK • Vector Search',
      angle: 270,
      icon: (s) => (
        <g transform={`translate(${-s / 2}, ${-s / 2})`}>
          <path d={`M ${s * 0.48} ${s * 0.18} C ${s * 0.3} ${s * 0.18}, ${s * 0.25} ${s * 0.25}, ${s * 0.25} ${s * 0.38} L ${s * 0.25} ${s * 0.48} L ${s * 0.52} ${s * 0.48} L ${s * 0.52} ${s * 0.55} L ${s * 0.2} ${s * 0.55} C ${s * 0.1} ${s * 0.55}, ${s * 0.1} ${s * 0.35}, ${s * 0.2} ${s * 0.2} C ${s * 0.32} ${s * 0.08}, ${s * 0.58} ${s * 0.08}, ${s * 0.68} ${s * 0.18} L ${s * 0.6} ${s * 0.28} C ${s * 0.55} ${s * 0.22}, ${s * 0.5} ${s * 0.18}, ${s * 0.48} ${s * 0.18} Z`} fill="#3776ab" />
          <path d={`M ${s * 0.52} ${s * 0.82} C ${s * 0.7} ${s * 0.82}, ${s * 0.75} ${s * 0.75}, ${s * 0.75} ${s * 0.62} L ${s * 0.75} ${s * 0.52} L ${s * 0.48} ${s * 0.52} L ${s * 0.48} ${s * 0.45} L ${s * 0.8} ${s * 0.45} C ${s * 0.9} ${s * 0.45}, ${s * 0.9} ${s * 0.65}, ${s * 0.8} ${s * 0.8} C ${s * 0.68} ${s * 0.92}, ${s * 0.42} ${s * 0.92}, ${s * 0.32} ${s * 0.82} L ${s * 0.4} ${s * 0.72} C ${s * 0.45} ${s * 0.78}, ${s * 0.5} ${s * 0.82}, ${s * 0.52} ${s * 0.82} Z`} fill="#ffd438" />
        </g>
      )
    },
    {
      id: 'docker',
      name: 'Docker & CI',
      category: 'Cloud Infrastructure',
      color: '#0ea5e9',
      role: 'OCI Multi-Stage Containers & Cloud Deploy',
      highlight: 'Zero Drift • Immutable Builds',
      angle: 315,
      icon: (s) => (
        <g transform={`translate(${-s / 2}, ${-s / 2})`}>
          <path d={`M ${s * 0.15} ${s * 0.55} C ${s * 0.15} ${s * 0.75}, ${s * 0.45} ${s * 0.85}, ${s * 0.85} ${s * 0.68} C ${s * 0.88} ${s * 0.55}, ${s * 0.75} ${s * 0.5}, ${s * 0.65} ${s * 0.55} L ${s * 0.15} ${s * 0.55} Z`} fill="#0ea5e9" />
          <rect x={s * 0.25} y={s * 0.38} width={s * 0.1} height={s * 0.12} rx="1" fill="#0ea5e9" />
          <rect x={s * 0.38} y={s * 0.38} width={s * 0.1} height={s * 0.12} rx="1" fill="#0ea5e9" />
          <rect x={s * 0.51} y={s * 0.38} width={s * 0.1} height={s * 0.12} rx="1" fill="#0ea5e9" />
        </g>
      )
    }
  ];

  // Gentle auto-rotation
  useEffect(() => {
    if (!autoRotate) return;
    const timer = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % technologies.length);
    }, 3800);
    return () => clearInterval(timer);
  }, [autoRotate, technologies.length]);

  const current = technologies[hoveredIndex !== null ? hoveredIndex : activeIndex];
  const centerX = 240;
  const centerY = 130;
  const orbitRadius = 102;

  const handleSelect = (idx: number) => {
    sound.playClick(900);
    setActiveIndex(idx);
    setAutoRotate(false);
  };

  return (
    <div className={`w-full max-w-[480px] mx-auto select-none ${className}`}>
      <svg
        viewBox="0 0 480 310"
        className="w-full h-auto overflow-visible"
      >
        <defs>
          {/* Subtle Soft Glow Filter */}
          <filter id="softConstellationGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Radial Ambient Backlight */}
          <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={current.color} stopOpacity={isDarkMode ? '0.2' : '0.08'} />
            <stop offset="70%" stopColor="#6366f1" stopOpacity={isDarkMode ? '0.04' : '0.01'} />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient Halo */}
        <circle
          cx={centerX}
          cy={centerY}
          r="125"
          fill="url(#centerGlow)"
          className="transition-all duration-700"
        />

        {/* Clean Background Orbital Rings */}
        <circle
          cx={centerX}
          cy={centerY}
          r={orbitRadius}
          fill="none"
          stroke={isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)'}
          strokeWidth="1"
          strokeDasharray="4 6"
        />
        <circle
          cx={centerX}
          cy={centerY}
          r={orbitRadius}
          fill="none"
          stroke={current.color}
          strokeWidth="1.2"
          strokeOpacity="0.3"
          strokeDasharray="20 40"
          className="animate-spin-slow origin-center"
          style={{ transformOrigin: `${centerX}px ${centerY}px` }}
        />

        {/* Constellation Connection Rays */}
        {technologies.map((tech, i) => {
          const rad = (tech.angle * Math.PI) / 180;
          const nodeX = centerX + orbitRadius * Math.cos(rad);
          const nodeY = centerY + orbitRadius * Math.sin(rad);
          const isSelected = i === (hoveredIndex !== null ? hoveredIndex : activeIndex);

          return (
            <line
              key={`ray-${tech.id}`}
              x1={centerX}
              y1={centerY}
              x2={nodeX}
              y2={nodeY}
              stroke={isSelected ? tech.color : (isDarkMode ? '#334155' : '#cbd5e1')}
              strokeWidth={isSelected ? '1.8' : '1'}
              strokeOpacity={isSelected ? 0.85 : 0.2}
              strokeDasharray={isSelected ? '4 3' : '2 4'}
              className="transition-all duration-300"
            />
          );
        })}

        {/* Orbital Satellite Nodes */}
        {technologies.map((tech, i) => {
          const rad = (tech.angle * Math.PI) / 180;
          const nodeX = centerX + orbitRadius * Math.cos(rad);
          const nodeY = centerY + orbitRadius * Math.sin(rad);
          const isSelected = i === (hoveredIndex !== null ? hoveredIndex : activeIndex);

          return (
            <g
              key={tech.id}
              transform={`translate(${nodeX}, ${nodeY})`}
              className="cursor-pointer group"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => handleSelect(i)}
            >
              {/* Outer Selection Highlight Ring */}
              {isSelected && (
                <circle
                  r="19"
                  fill="none"
                  stroke={tech.color}
                  strokeWidth="1.2"
                  strokeDasharray="3 3"
                  className="animate-spin-slow origin-center"
                />
              )}

              {/* Node Circular Pill Surface */}
              <circle
                r="15"
                fill={isDarkMode ? '#0b0f19' : '#ffffff'}
                stroke={isSelected ? tech.color : (isDarkMode ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.08)')}
                strokeWidth={isSelected ? '1.8' : '1'}
                filter={isSelected ? 'url(#softConstellationGlow)' : undefined}
                className="transition-all duration-300 group-hover:scale-110 origin-center"
              />

              {/* Tech Icon */}
              {tech.icon(15, isDarkMode)}
            </g>
          );
        })}

        {/* Central Reactor Core Hero Node */}
        <g
          transform={`translate(${centerX}, ${centerY})`}
          className="cursor-pointer"
          onClick={() => setAutoRotate(prev => !prev)}
        >
          {/* Subtle Outer Boundary Ring */}
          <circle
            r="40"
            fill="none"
            stroke={current.color}
            strokeWidth="1"
            strokeOpacity="0.35"
          />

          {/* Central Reactor Disc */}
          <circle
            r="34"
            fill={isDarkMode ? '#080d18' : '#ffffff'}
            stroke={current.color}
            strokeWidth="2"
            filter="url(#softConstellationGlow)"
            className="transition-all duration-500"
          />

          {/* Centered Active Tech Icon */}
          <g transform="translate(0, -8)">
            {current.icon(22, isDarkMode)}
          </g>

          {/* Active Name */}
          <text
            textAnchor="middle"
            y="13"
            fill={isDarkMode ? '#f8fafc' : '#0f172a'}
            fontSize="9"
            fontFamily="'JetBrains Mono', monospace"
            fontWeight="bold"
            className="select-none"
          >
            {current.name}
          </text>

          {/* Active Category */}
          <text
            textAnchor="middle"
            y="23"
            fill={current.color}
            fontSize="6.5"
            fontFamily="'JetBrains Mono', monospace"
            fontWeight="600"
            className="select-none"
          >
            {current.category.toUpperCase()}
          </text>
        </g>

        {/* Refined Bottom Elegant Info Bar */}
        <g transform="translate(30, 256)">
          {/* Card Container */}
          <rect
            width="420"
            height="44"
            rx="10"
            fill={isDarkMode ? '#090d18' : '#f8fafc'}
            stroke={isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)'}
            strokeWidth="1"
          />

          {/* Accent Color Indicator Bar */}
          <rect
            x="12"
            y="12"
            width="3"
            height="20"
            rx="1.5"
            fill={current.color}
          />

          {/* Left Title & Category */}
          <text
            x="24"
            y="21"
            fill={isDarkMode ? '#f8fafc' : '#0f172a'}
            fontSize="10"
            fontFamily="'JetBrains Mono', monospace"
            fontWeight="bold"
          >
            {current.name}
            <tspan fill={isDarkMode ? '#64748b' : '#94a3b8'} fontWeight="normal"> • {current.category}</tspan>
          </text>

          {/* Left Role Description */}
          <text
            x="24"
            y="33"
            fill={isDarkMode ? '#94a3b8' : '#64748b'}
            fontSize="7.5"
            fontFamily="'JetBrains Mono', monospace"
          >
            {current.role}
          </text>

          {/* Right Highlight Badge */}
          <text
            x="408"
            y="27"
            textAnchor="end"
            fill={current.color}
            fontSize="8"
            fontFamily="'JetBrains Mono', monospace"
            fontWeight="bold"
          >
            {current.highlight}
          </text>
        </g>
      </svg>
    </div>
  );
};
