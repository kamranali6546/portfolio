import React, { useEffect, useRef, useState } from 'react';
import { SKILLS } from '../constants';
import gsap from 'gsap';

export const Skills: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setHasStarted(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    // Floating animation for heading
    if (headingRef.current) {
        gsap.to(headingRef.current, {
            y: 15,
            duration: 2,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut"
        });
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={containerRef} className="horizontal-panel w-screen h-screen flex-shrink-0 flex items-center relative border-r border-zinc-200 dark:border-zinc-900/50 overflow-hidden bg-transparent">
      
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center h-full pt-16 pb-12 md:py-0 relative z-10">
        
        {/* Code Block Side (Bottom on mobile) */}
        <div className="order-2 lg:order-1 h-[45vh] md:h-full lg:max-h-none flex items-center justify-center w-full">
          <div className="bg-[#0d0d0d] dark:bg-[#0d0d0d]/80 backdrop-blur-md border border-zinc-800 rounded-lg p-3 md:p-6 font-mono text-[10px] sm:text-xs md:text-sm lg:text-base shadow-2xl relative group w-full max-w-2xl h-full md:h-auto overflow-y-auto no-scrollbar transform transition-all duration-500 hover:scale-[1.01] hover:shadow-cyan-500/10">
            <div className="sticky top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-fuchsia-500 mb-2"></div>
            
            {/* Window Controls */}
            <div className="flex gap-2 mb-3 md:mb-4 sticky top-2 bg-[#0d0d0d] pb-2 z-10 w-full">
              <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-red-500"></div>
              <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-yellow-500"></div>
              <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-green-500"></div>
            </div>
            
            <div className="text-zinc-500 mb-2">// tech_stack.config.ts</div>
            
            {/* Typing Container */}
            <div className="min-h-[150px] md:min-h-[250px]">
                {hasStarted && <TypeWriterCode />}
            </div>
            
            <div className="mt-4 flex items-center">
               <span className="text-zinc-500 mr-2">{'>'}</span>
               <span className="w-2 h-4 bg-cyan-500 animate-pulse block"></span>
            </div>
          </div>
        </div>

        {/* Text Side (Top on mobile) */}
        <div className="order-1 lg:order-2 flex flex-col justify-end lg:justify-center text-center lg:text-left z-10 h-auto">
          <h2 ref={headingRef} className="text-4xl sm:text-6xl md:text-8xl font-display font-bold text-zinc-900 dark:text-white mb-4 md:mb-8 tracking-tighter transition-colors duration-500">
            THE <br className="hidden lg:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-fuchsia-600 dark:from-cyan-400 dark:to-fuchsia-600">STACK</span>
          </h2>
          <p className="text-sm md:text-xl text-zinc-600 dark:text-zinc-400 max-w-md mx-auto lg:mx-0 border-l-4 border-zinc-300 dark:border-zinc-800 pl-4 md:pl-6 text-left transition-colors duration-500">
            My digital armory. Tools selected for speed, reliability, and visual dominance.
          </p>
        </div>
      </div>
    </section>
  );
};

const TypeWriterCode: React.FC = () => {
    const [displayLines, setDisplayLines] = useState<string[]>([]);
    
    const fullCodeLines = SKILLS.map(group => {
        const itemsStr = group.items.map(i => `"${i}"`).join(', ');
        return `const ${group.category.toLowerCase()} = [${itemsStr}];`;
    });

    useEffect(() => {
        let currentLineIdx = 0;
        let currentCharIdx = 0;
        let currentText = "";
        const lines: string[] = [];
        let timeoutId: any;

        const typeChar = () => {
            if (currentLineIdx >= fullCodeLines.length) return;

            const targetLine = fullCodeLines[currentLineIdx];
            
            currentText += targetLine[currentCharIdx];
            const newDisplay = [...lines, currentText];
            setDisplayLines(newDisplay);

            currentCharIdx++;

            if (currentCharIdx >= targetLine.length) {
                lines.push(currentText);
                currentText = "";
                currentCharIdx = 0;
                currentLineIdx++;
                timeoutId = setTimeout(typeChar, 100);
            } else {
                timeoutId = setTimeout(typeChar, 20);
            }
        };

        typeChar();
        return () => clearTimeout(timeoutId);
    }, []);

    const highlight = (line: string) => {
        const parts = line.split(/(".*?"|const|=|\[|\]|;|,)/g).filter(Boolean);
        return parts.map((part, i) => {
            if (part === 'const') return <span key={i} className="text-fuchsia-400">const </span>;
            if (part === '=') return <span key={i} className="text-white"> = </span>;
            if (part === '[' || part === ']') return <span key={i} className="text-yellow-300">{part}</span>;
            if (part.startsWith('"')) return <span key={i} className="text-green-300">{part}</span>;
            if (part === ';') return <span key={i} className="text-zinc-500">;</span>;
            if (part === ',') return <span key={i} className="text-white">, </span>;
            if (part.trim() === '') return <span key={i}> </span>;
            return <span key={i} className="text-cyan-300">{part}</span>;
        });
    };

    return (
        <div className="flex flex-col gap-1 md:gap-2">
            {displayLines.map((line, idx) => (
                <div key={idx} className="whitespace-pre-wrap break-all leading-tight">
                    {highlight(line)}
                </div>
            ))}
        </div>
    );
};