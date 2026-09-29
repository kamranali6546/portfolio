import React, { useEffect, useRef } from 'react';
import { usePortfolio } from '../context/PortfolioContext';

export const InteractiveBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { isDarkMode } = usePortfolio();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Mouse coordinates
    let mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
      isHovered: false
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.isHovered = true;
    };

    const handleMouseLeave = () => {
      mouse.isHovered = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Particle system
    const particleCount = Math.min(Math.floor((width * height) / 18000), 75);
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      colorDark: string;
      colorLight: string;
      alpha: number;
      baseAlpha: number;
      pulseSpeed: number;
      pulseVal: number;
      glyph?: string;
    }

    const glyphs = ['{ }', '< />', '=>', 'TS', '⚛', '01', 'λ', '⚡', '✦', 'CSS', 'RSC'];
    const darkColors = [
      'rgba(99, 102, 241, ', // Indigo
      'rgba(6, 182, 212, ',  // Cyan
      'rgba(168, 85, 247, ', // Purple
      'rgba(16, 185, 129, '  // Emerald
    ];
    const lightColors = [
      'rgba(79, 70, 229, ',  // Deeper Indigo
      'rgba(14, 116, 144, ', // Deeper Cyan
      'rgba(126, 34, 206, ', // Deeper Purple
      'rgba(5, 150, 105, '   // Deeper Emerald
    ];

    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      const isGlyph = Math.random() > 0.65;
      const baseAlpha = Math.random() * 0.4 + 0.15;
      const colorIdx = Math.floor(Math.random() * darkColors.length);
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: isGlyph ? 6 : Math.random() * 2 + 1,
        colorDark: darkColors[colorIdx],
        colorLight: lightColors[colorIdx],
        alpha: baseAlpha,
        baseAlpha,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        pulseVal: Math.random() * Math.PI * 2,
        glyph: isGlyph ? glyphs[Math.floor(Math.random() * glyphs.length)] : undefined
      });
    }

    // Floating Grid Nodes
    const draw = () => {
      // Smooth mouse easing
      mouse.x += (mouse.targetX - mouse.x) * 0.06;
      mouse.y += (mouse.targetY - mouse.y) * 0.06;

      ctx.clearRect(0, 0, width, height);

      // 1. Draw dynamic glowing cursor spotlight
      if (mouse.isHovered) {
        const gradient = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          450
        );
        if (isDarkMode) {
          gradient.addColorStop(0, 'rgba(99, 102, 241, 0.08)');
          gradient.addColorStop(0.5, 'rgba(6, 182, 212, 0.03)');
          gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        } else {
          gradient.addColorStop(0, 'rgba(99, 102, 241, 0.09)');
          gradient.addColorStop(0.5, 'rgba(6, 182, 212, 0.04)');
          gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        }
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      }

      // 2. Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Bounce screen edges
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Mouse attraction/deflection
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 180) {
          const force = (180 - dist) / 180;
          p.x -= (dx / dist) * force * 1.5;
          p.y -= (dy / dist) * force * 1.5;
        }

        // Pulse alpha
        p.pulseVal += p.pulseSpeed;
        p.alpha = p.baseAlpha + Math.sin(p.pulseVal) * 0.15;

        const colorPrefix = isDarkMode ? p.colorDark : p.colorLight;

        // Render particle or glyph
        if (p.glyph) {
          ctx.font = '10px "JetBrains Mono", monospace';
          ctx.fillStyle = `${colorPrefix}${Math.max(0.08, p.alpha * (isDarkMode ? 1.2 : 1.5))})`;
          ctx.fillText(p.glyph, p.x, p.y);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `${colorPrefix}${Math.max(0.08, p.alpha * (isDarkMode ? 1 : 1.3))})`;
          ctx.fill();
        }

        // Connect nearby particles with glowing cyber lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const distBetween = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (distBetween < 120) {
            const lineAlpha = (1 - distBetween / 120) * (isDarkMode ? 0.15 : 0.18);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = isDarkMode 
              ? `rgba(99, 102, 241, ${lineAlpha})`
              : `rgba(99, 102, 241, ${lineAlpha * 1.2})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDarkMode]);

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none">
      {/* Dynamic Canvas with Particles and Laser Web */}
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${isDarkMode ? 'opacity-80' : 'opacity-90'}`}
      />

      {/* Floating Animated Aurora Glow Orbs */}
      <div className={`absolute -top-[20%] left-[10%] w-[600px] h-[600px] rounded-full blur-[130px] animate-aurora-slow transition-colors duration-500 ${
        isDarkMode ? 'bg-indigo-600/10' : 'bg-indigo-400/15'
      }`} />
      <div className={`absolute top-[40%] -right-[10%] w-[500px] h-[500px] rounded-full blur-[120px] animate-aurora-reverse transition-colors duration-500 ${
        isDarkMode ? 'bg-cyan-600/10' : 'bg-cyan-400/15'
      }`} />
      <div className={`absolute -bottom-[15%] left-[30%] w-[650px] h-[650px] rounded-full blur-[140px] animate-aurora-slow transition-colors duration-500 ${
        isDarkMode ? 'bg-purple-600/10' : 'bg-purple-400/10'
      }`} />

      {/* Subtle Matrix Cyber Grid */}
      <div className={`absolute inset-0 bg-cyber-grid transition-opacity duration-500 ${
        isDarkMode ? 'opacity-25' : 'opacity-35'
      }`} />

      {/* Radial Vignette Mask */}
      <div className="absolute inset-0 bg-radial-vignette" />
    </div>
  );
};

