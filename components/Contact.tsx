import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';

export const Contact: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const [bgPos, setBgPos] = useState({ x: 0, y: 0 });
  const [exitText, setExitText] = useState("");

  // Terminal Typing Effect
  useEffect(() => {
    const text = "System.exit(0);";
    let i = 0;
    const interval = setInterval(() => {
        setExitText(text.substring(0, i + 1));
        i++;
        if (i === text.length) clearInterval(interval);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20; 
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    setBgPos({ x, y });
    
    if (textRef.current) {
        gsap.to(textRef.current, {
            x: x * 2,
            y: y * 2,
            duration: 1,
            ease: "power2.out"
        });
    }
  };

  return (
    <section 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="horizontal-panel w-screen h-screen flex-shrink-0 flex items-center justify-center relative bg-transparent overflow-hidden"
    >
       
       {/* Parallax Background Gradient */}
       <div 
         className="absolute inset-0 opacity-20 pointer-events-none transition-transform duration-100 ease-out z-0"
         style={{
            background: 'radial-gradient(circle at 50% 50%, #22d3ee 0%, transparent 50%)',
            transform: `translate(${bgPos.x * -2}px, ${bgPos.y * -2}px)`
         }}
       ></div>

       <div className="container mx-auto px-6 text-center relative z-10">
          <p className="text-cyan-600 dark:text-cyan-400 font-mono mb-4 md:mb-6 min-h-[1.5em] text-xs md:text-base">
             {exitText}<span className="animate-pulse">_</span>
          </p>
          
          <h2 ref={textRef} className="text-4xl md:text-8xl font-display font-bold text-zinc-900 dark:text-white mb-6 md:mb-8 leading-tight mix-blend-multiply dark:mix-blend-difference">
             LET'S WORK<br/><span className="stroke-text text-zinc-200 dark:text-zinc-800">TOGETHER</span>
          </h2>
          
          <div className="mb-8 md:mb-12 flex flex-col items-center gap-2 md:gap-4 text-zinc-600 dark:text-zinc-300">
             <a href="mailto:kamranali6546@icloud.com" className="text-base md:text-2xl hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors border-b border-zinc-300 dark:border-zinc-800 pb-1 break-all">
               kamranali6546@icloud.com
             </a>
             <div className="flex flex-col md:flex-row gap-1 md:gap-6 text-xs md:text-sm font-mono text-zinc-500 mt-2 md:mt-0">
                <span>+995 568 772 744</span>
                <span className="hidden md:inline">•</span>
                <span>+92 306 4410454</span>
             </div>
          </div>
          
          <div className="inline-block relative group perspective-500">
             <a 
                href="mailto:kamranali6546@icloud.com" 
                className="block relative z-10 px-8 py-3 md:px-12 md:py-4 bg-zinc-900 dark:bg-white text-white dark:text-black font-bold text-sm md:text-xl uppercase tracking-widest overflow-hidden transition-all duration-300 hover:bg-cyan-600 dark:hover:bg-cyan-400 hover:scale-105"
             >
                Send Message
             </a>
             <div className="absolute top-2 left-2 w-full h-full border border-zinc-300 dark:border-zinc-700 -z-10 group-hover:top-0 group-hover:left-0 transition-all duration-300"></div>
          </div>
          
          <div className="mt-16 md:mt-24 flex flex-col justify-center gap-4 md:gap-8 text-zinc-500 dark:text-zinc-600 font-mono text-[10px] md:text-xs tracking-widest uppercase">
             <div className="flex gap-4 justify-center">
                <a href="https://www.linkedin.com/in/kamran-ali" target="_blank" rel="noreferrer" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">LINKEDIN</a>
             </div>
             <span className="text-zinc-400 dark:text-zinc-700">Tbilisi, Georgia</span>
          </div>
       </div>
    </section>
  );
};