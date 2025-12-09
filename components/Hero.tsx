import React, { useEffect, useRef, useMemo, useLayoutEffect, useState } from 'react';
import gsap from 'gsap';

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Text Column Animation
    if (leftColRef.current) {
        tl.fromTo(leftColRef.current.children, 
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, stagger: 0.1, delay: 0.2 }
        );
    }

    // Right Column Fade In
    if (rightColRef.current) {
        tl.fromTo(rightColRef.current,
            { opacity: 0, scale: 0.95 },
            { opacity: 1, scale: 1, duration: 1.5, ease: "power2.out" },
            "-=0.5"
        );
    }
  }, []);

  return (
    <section 
      ref={containerRef}
      className="horizontal-panel w-screen h-screen min-h-[100dvh] flex-shrink-0 relative overflow-hidden flex flex-col lg:flex-row items-center justify-center bg-transparent"
    >
      <div className="container mx-auto px-4 md:px-12 h-full flex flex-col lg:grid lg:grid-cols-2 gap-0 items-center relative z-10">
         
         {/* RIGHT COLUMN: MARQUEE (Top on Mobile for visual impact) */}
         <div ref={rightColRef} className="h-[40vh] lg:h-[80vh] md:pr-4 w-full order-1 lg:order-2 relative flex items-center justify-center lg:justify-end overflow-hidden mask-gradient mt-4 lg:mt-0">
             <TechMarquee />
         </div>

         {/* LEFT COLUMN: TEXT (Bottom on Mobile) */}
         <div ref={leftColRef} className="flex flex-col justify-center items-start z-20 order-2 lg:order-1 relative pb-8 lg:pb-0 h-[55vh] lg:h-auto w-full">
             
             <div className="flex items-center gap-4 mb-2 md:mb-6">
                 <div className="h-[1px] w-8 md:w-12 bg-cyan-600 dark:bg-cyan-500 shadow-[0_0_10px_rgba(8,145,178,0.5)] dark:shadow-[0_0_10px_rgba(34,211,238,0.8)]"></div>
                 <span className="font-mono text-cyan-700 dark:text-cyan-400 text-[10px] md:text-sm tracking-[0.2em] uppercase animate-pulse">
                     Frontend Engineer
                 </span>
             </div>

             <h1 className="font-display font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-zinc-900 dark:text-white tracking-tighter leading-[0.9] mb-4 md:mb-6">
                KAMRAN<br/>
                <span className="text-transparent stroke-text relative">
                    ALI
                </span>
             </h1>

             <p className="text-zinc-600 dark:text-zinc-400 text-xs md:text-xl max-w-lg leading-relaxed font-light tracking-wide mb-6 md:mb-8 border-l-2 border-zinc-300 dark:border-zinc-800 pl-4 md:pl-6">
             With over 6 years of experience in building high-performance, user-centric web applications, I specialize in delivering visually engaging interfaces and seamless user experiences using <span className="text-zinc-900 dark:text-white font-medium">React</span> & <span className="text-zinc-900 dark:text-white font-medium">Next.js</span>.
             </p>

             <div className="flex flex-row gap-4 w-full sm:w-auto items-center">
                <a href="mailto:kamranali6546@icloud.com" className="px-6 py-3 md:px-8 md:py-4 bg-zinc-900 dark:bg-white text-white dark:text-black font-bold uppercase tracking-widest hover:bg-cyan-600 dark:hover:bg-cyan-400 hover:text-white hover:scale-105 transition-all duration-300 text-center text-xs md:text-base border border-transparent shadow-lg rounded-sm">
                    Contact Me
                </a>
                <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-500 font-mono text-[10px] md:text-xs uppercase tracking-widest">
                    <span className="relative flex h-2 w-2 md:h-3 md:w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-full w-full bg-green-600 dark:bg-green-500"></span>
                    </span>
                    Available
                </div>
             </div>
         </div>

      </div>
      
      <style>{`
        .mask-gradient {
            mask-image: linear-gradient(to bottom, transparent, black 15%, black 85%, transparent);
            -webkit-mask-image: linear-gradient(to bottom, transparent, black 15%, black 85%, transparent);
        }
        .stroke-text {
             -webkit-text-stroke: 1px #a1a1aa; 
        }
        .dark .stroke-text {
             -webkit-text-stroke: 1px rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </section>
  );
};

// --- VERTICAL MARQUEE ANIMATION ---
const TechMarquee: React.FC = () => {
    // ICONS
    const tools = useMemo(() => [
        { 
            name: "ReactJS", 
            color: "#61dafb", 
            path: "M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M12,20c-4.41,0-8-3.59-8-8s3.59-8,8-8 s8,3.59,8,8S16.41,20,12,20z M12,5c-3.87,0-7,3.13-7,7s3.13,7,7,7s7-3.13,7-7S15.87,5,12,5z M12,16c-2.21,0-4-1.79-4-4s1.79-4,4-4 s4,1.79,4,4S14.21,16,12,16z" 
        },
        { 
            name: "NextJS", 
            color: "#888888", // Adjusted for light/dark
            path: "M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10S22,17.52,22,12S17.52,2,12,2z M16.5,16h-1.67L10,8.67V16H8V8h1.67L14.5,15.33V8H16 V16z" 
        },
        { 
            name: "Typescript", 
            color: "#3178c6", 
            path: "M4,2h16c1.1,0,2,0.9,2,2v16c0,1.1-0.9,2-2,2H4c-1.1,0-2-0.9-2-2V4C2,2.9,2.9,2,4,2z M14,16l-0.75-2H11v-4h2.25V8H11V6 h-1.5v2H7.5v2h2v4.5c0,1.38,1.12,2.5,2.5,2.5H15L14,16z M17,13.5c0-1.1-0.9-2-2-2s-2,0.9-2,2H17z M15,10c0.83,0,1.5,0.67,1.5,1.5h1.5 C18,9.57,16.66,8,15,8s-3,1.57-3,3.5S13.34,15,15,15c1.66,0,3-1.57,3-3.5h-1.5C16.5,12.33,15.83,13,15,13V10z" 
        },
        { 
            name: "TailwindCSS", 
            color: "#38bdf8", 
            path: "M12.5,6.5c-2,0-3.5,1-4.5,2.5c-1-1.5-2.5-2.5-4.5-2.5C1.5,6.5,0,8,0,10c0,3.5,4,6,8,10c4-4,8-6.5,8-10 C16,8,14.5,6.5,12.5,6.5z M20.5,6.5c-2,0-3.5,1-4.5,2.5c-1-1.5-2.5-2.5-4.5-2.5C9.5,6.5,8,8,8,10c0,3.5,4,6,8,10 c4-4,8-6.5,8-10C24,8,22.5,6.5,20.5,6.5z" 
        },
        { 
            name: "NodeJS", 
            color: "#339933", 
            path: "M12,2L2.6,7.4v10.8L12,23.6l9.4-5.4V7.4L12,2z M13,17h-2v-2h2V17z M12,13c-1.1,0-2-0.9-2-2s0.9-2,2-2s2,0.9,2,2 S13.1,13,12,13z" 
        },
        {
            name: "MongoDB",
            color: "#47A248",
            path: "M12,22c4.97,0,9-4.03,9-9c0-4.97-9-13-9-13S3,8.03,3,13C3,17.97,7.03,22,12,22z M13,5c0,0-0.6,3.5-0.6,4.6 c0,3.5,2.6,3.4,2.6,6.4c0,2.1-1.5,3.5-3,3.5s-3-1.4-3-3.5c0-3,2.6-2.9,2.6-6.4C11.6,8.5,11,5,11,5H13z"
        },
        {
            name: "AWS",
            color: "#FF9900",
            path: "M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M16.7,14.5c-1.8,1.2-3.9,1.9-6.2,1.9 c-1.8,0-3.5-0.6-4.9-1.5c-0.4-0.3-0.5-0.9-0.2-1.4c0.3-0.4,0.9-0.5,1.4-0.2c1.1,0.7,2.3,1.1,3.7,1.1c1.8,0,3.5-0.5,4.9-1.5 c0.4-0.3,1-0.2,1.3,0.1C17,13.5,17,14,16.7,14.5z M14.2,6.8c0-2.2-1.8-4-4-4s-4,1.8-4,4H8c0-1.1,0.9-2,2-2s2,0.9,2,2H14.2z"
        },
        { 
            name: "Git", 
            color: "#f05032", 
            path: "M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M13.5,16.5l-2-2l-2,2l-1-1l2-2l-2-2l1-1l2-2l-2-2l1-1l2,2 l2-2l1,1l-2,2l2,2L13.5,16.5z" 
        },
        {
            name: "HTML5",
            color: "#E34F26",
            path: "M12,2L2,5l2,13l8,4l8-4l2-13L12,2z M17,16l-5,2l-5-2l-1-9h12L17,16z"
        },
        {
            name: "CSS3",
            color: "#1572B6",
            path: "M12,2L2,5l2,13l8,4l8-4l2-13L12,2z M17,16l-5,2l-5-2l-1-9h12L17,16z"
        },
        {
            name: "Figma",
            color: "#F24E1E",
            path: "M8,2C5.79,2,4,3.79,4,6s1.79,4,4,4h4V2H8z M8,10c-2.21,0-4,1.79-4,4s1.79,4,4,4s4-1.79,4-4V10H8z M12,18v4 c2.21,0,4-1.79,4-4s-1.79-4-4-4H12z M16,2v8c2.21,0,4-1.79,4-4S18.21,2,16,2z"
        },
        {
            name: "MUI",
            color: "#007FFF",
            path: "M2,12L12,6l10,6v9l-10,6l-10-6V12z M12,8l-6,3.6v5.8L12,21l6-3.6v-5.8L12,8z"
        },
        {
            name: "Adobe",
            color: "#FF0000",
            path: "M15.8,2H22v18.6L15.8,2z M9.3,2H2v18.6L9.3,2z M12,7.8L6.4,20.6h3.4l1.3-3.2h5.5l1.3,3.2h3.4L12,7.8z"
        },
        {
            name: "WebSockets",
            color: "#888888",
            path: "M7,2v11h3v9l7-12h-4l4-8H7z" 
        },
        {
            name: "Vercel",
            color: "#888888",
            path: "M12,1L24,22H0L12,1Z"
        },
        {
            name: "AI",
            color: "#8B5CF6",
            path: "M19,14l-2.5,5.5L14,22l2.5-5.5L19,14z M10,8L7.5,13.5L2,16l5.5-2.5L10,8z M16.5,9L19,3.5L21.5,9L27,11.5 L21.5,14L19,19.5L16.5,14L11,11.5L16.5,9z"
        },
        {
            name: "GraphQL",
            color: "#E10098",
            path: "M12,2L3.3,7v10L12,22l8.7-5V7L12,2z M12,4.6l6.5,3.8v7.5L12,19.6l-6.5-3.8V8.4L12,4.6z"
        },
        {
            name: "SQL",
            color: "#4479A1",
            path: "M12,3c-4.42,0-8,1.34-8,3s3.58,3,8,3s8-1.34,8-3S16.42,3,12,3z M20,11c0,1.66-3.58,3-8,3s-8-1.34-8-3V8 c0,1.66,3.58,3,8,3s8-1.34-8-3V11z M20,16c0,1.66-3.58,3-8,3s-8-1.34-8-3v-3c0,1.66,3.58,3,8,3s8-1.34-8-3V16z"
        }
    ], []);

    const { col1Data, col2Data } = useMemo(() => {
        const col1 = tools.filter((_, i) => i % 2 === 0);
        const col2 = tools.filter((_, i) => i % 2 !== 0);
        return {
            col1Data: [...col1, ...col1, ...col1, ...col1],
            col2Data: [...col2, ...col2, ...col2, ...col2]
        };
    }, [tools]);

    return (
        <div className="flex gap-3 md:gap-8 h-full items-center justify-center">
            <MarqueeColumn items={col1Data} direction="up" speed={45} />
            <MarqueeColumn items={col2Data} direction="down" speed={50} />
        </div>
    );
};

interface MarqueeProps {
    items: { name: string; color: string; path: string }[];
    direction: 'up' | 'down';
    speed: number;
}

const MarqueeItem: React.FC<{ tool: { name: string; color: string; path: string } }> = ({ tool }) => {
    const [isHovered, setIsHovered] = useState(false);
    
    return (
        <div 
            className="group w-20 h-20 md:w-40 md:h-40 bg-white/80 dark:bg-zinc-900/40 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 rounded-xl md:rounded-2xl flex flex-col items-center justify-center gap-2 md:gap-3 transition-all duration-300 hover:scale-110 hover:bg-white dark:hover:bg-zinc-800/80 hover:border-zinc-300 dark:hover:border-zinc-600 hover:shadow-xl hover:z-10 shadow-sm"
            style={{
                boxShadow: '0 0 0 0 rgba(0,0,0,0)',
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div 
                className="w-8 h-8 md:w-16 md:h-16 flex items-center justify-center text-zinc-400 transition-colors duration-300"
                style={{
                    color: isHovered ? tool.color : undefined
                }}
            >
                 <svg 
                    viewBox="0 0 24 24" 
                    fill="currentColor" 
                    className="w-full h-full"
                    style={{ 
                        filter: isHovered ? `drop-shadow(0 0 10px ${tool.color})` : 'drop-shadow(0 0 0 transparent)', 
                        transition: 'filter 0.3s, color 0.3s'
                    }}
                 >
                    <path 
                        d={tool.path} 
                        className="transition-all duration-300"
                    />
                 </svg>
            </div>
            <span className="text-[8px] md:text-sm font-bold font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-widest group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">
                {tool.name}
            </span>
        </div>
    );
};

const MarqueeColumn: React.FC<MarqueeProps> = ({ items, direction, speed }) => {
    const colRef = useRef<HTMLDivElement>(null);
    const tlRef = useRef<gsap.core.Timeline | null>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const el = colRef.current;
            if (!el) return;
            
            const startYPercent = direction === 'up' ? 0 : -25;
            const endYPercent = direction === 'up' ? -25 : 0;

            const tl = gsap.timeline({ repeat: -1, defaults: { ease: "none" } });
            
            tl.fromTo(el, 
                { yPercent: startYPercent }, 
                { yPercent: endYPercent, duration: speed }
            );

            tlRef.current = tl;
        }, colRef);

        return () => ctx.revert();
    }, [direction, speed, items]);

    const handleMouseEnter = () => {
        if(tlRef.current) gsap.to(tlRef.current, { timeScale: 0.2, duration: 0.5, overwrite: true });
    };

    const handleMouseLeave = () => {
        if(tlRef.current) gsap.to(tlRef.current, { timeScale: 1, duration: 0.5, overwrite: true });
    };

    return (
        <div 
            className="flex flex-col gap-3 md:gap-6 hover:cursor-pointer"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div ref={colRef} className="flex flex-col gap-3 md:gap-6">
                {items.map((tool, i) => (
                    <MarqueeItem key={i} tool={tool} />
                ))}
            </div>
        </div>
    );
};