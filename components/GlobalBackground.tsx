import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const GlobalBackground: React.FC<{ isDark: boolean }> = ({ isDark }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const progressRef = useRef(0);

    useEffect(() => {
        // Track global scroll progress (0 to 1)
        const updateProgress = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.body.scrollHeight - window.innerHeight;
            const p = Math.max(0, Math.min(1, scrollTop / docHeight));
            progressRef.current = p;
        };

        window.addEventListener('scroll', updateProgress);
        window.addEventListener('resize', updateProgress);
        updateProgress();

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        // --- PATH GENERATION ---
        type Point = { x: number, y: number };
        let pathPoints: Point[] = [];
        const gridSize = 50;

        const generatePath = () => {
            pathPoints = [];
            let cx = 0;
            let cy = height * 0.1;
            pathPoints.push({ x: cx, y: cy });

            const targetX = width;
            
            let currentX = cx;
            let currentY = cy;
            let direction = 'x'; 
            let steps = 0;
            const maxSteps = 20;

            while (currentX < targetX && steps < maxSteps) {
                steps++;
                
                if (direction === 'x') {
                    const move = Math.random() * (width * 0.3) + gridSize;
                    currentX = Math.min(currentX + move, targetX);
                    pathPoints.push({ x: currentX, y: currentY });
                    direction = 'y';
                } else {
                    const move = Math.random() * (height * 0.4) + gridSize;
                    const dirY = Math.random() > 0.8 ? -1 : 1;
                    let nextY = currentY + (move * dirY);
                    nextY = Math.max(gridSize, Math.min(height - gridSize, nextY));
                    currentY = nextY;
                    pathPoints.push({ x: currentX, y: currentY });
                    direction = 'x';
                }
            }
            pathPoints.push({ x: width, y: currentY });
        };

        generatePath();

        // --- RENDER LOOP ---
        const render = () => {
            ctx.clearRect(0, 0, width, height);

            // COLORS BASED ON THEME
            // Light Mode: Darker path for visibility against white bg
            // Dark Mode: Faint white path
            const pathColor = isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.08)';
            
            // Light Mode: Deep Cyan/Purple for glow
            // Dark Mode: Neon Cyan/Fuchsia
            const glowColor = isDark ? '#22d3ee' : '#0ea5e9'; 
            const coreColor = isDark ? '#d946ef' : '#c026d3'; 
            const shadowBlurAmount = isDark ? 15 : 2;

            // 1. Draw Faint Base Path
            ctx.beginPath();
            ctx.strokeStyle = pathColor;
            ctx.lineWidth = 2;
            
            if (pathPoints.length > 0) {
                ctx.moveTo(pathPoints[0].x, pathPoints[0].y);
                for (let i = 1; i < pathPoints.length; i++) {
                    ctx.lineTo(pathPoints[i].x, pathPoints[i].y);
                }
            }
            ctx.stroke();

            // 2. Draw Active Path
            let totalLength = 0;
            const segments: number[] = [];
            for (let i = 0; i < pathPoints.length - 1; i++) {
                const dx = pathPoints[i+1].x - pathPoints[i].x;
                const dy = pathPoints[i+1].y - pathPoints[i].y;
                const dist = Math.sqrt(dx*dx + dy*dy);
                segments.push(dist);
                totalLength += dist;
            }

            const targetDrawLength = totalLength * progressRef.current;
            
            ctx.shadowBlur = shadowBlurAmount;
            ctx.shadowColor = glowColor;
            ctx.strokeStyle = glowColor;
            ctx.lineWidth = 3;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.beginPath();

            let drawnLength = 0;
            let headX = pathPoints[0].x;
            let headY = pathPoints[0].y;

            ctx.moveTo(pathPoints[0].x, pathPoints[0].y);

            for (let i = 0; i < segments.length; i++) {
                const segLen = segments[i];
                if (drawnLength + segLen < targetDrawLength) {
                    ctx.lineTo(pathPoints[i+1].x, pathPoints[i+1].y);
                    drawnLength += segLen;
                    headX = pathPoints[i+1].x;
                    headY = pathPoints[i+1].y;
                } else {
                    const remaining = targetDrawLength - drawnLength;
                    const percent = remaining / segLen;
                    const dx = pathPoints[i+1].x - pathPoints[i].x;
                    const dy = pathPoints[i+1].y - pathPoints[i].y;
                    headX = pathPoints[i].x + dx * percent;
                    headY = pathPoints[i].y + dy * percent;
                    ctx.lineTo(headX, headY);
                    break;
                }
            }
            ctx.stroke();

            // 3. Draw The "AI Core" (Head)
            ctx.shadowBlur = shadowBlurAmount * 2;
            ctx.shadowColor = coreColor;
            ctx.fillStyle = isDark ? '#ffffff' : coreColor;
            
            const pulse = 1 + Math.sin(Date.now() * 0.01) * 0.2;
            
            ctx.beginPath();
            ctx.arc(headX, headY, 4 * pulse, 0, Math.PI * 2);
            ctx.fill();

            ctx.beginPath();
            ctx.strokeStyle = coreColor;
            ctx.lineWidth = 1;
            ctx.arc(headX, headY, 8 + (pulse * 2), 0, Math.PI * 2);
            ctx.stroke();

            // 4. Scanlines
            ctx.beginPath();
            ctx.strokeStyle = isDark ? 'rgba(217, 70, 239, 0.2)' : 'rgba(192, 38, 211, 0.1)';
            ctx.lineWidth = 1;
            ctx.moveTo(headX, 0);
            ctx.lineTo(headX, height);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(0, headY);
            ctx.lineTo(width, headY);
            ctx.stroke();

            ctx.shadowBlur = 0;
            requestAnimationFrame(render);
        };

        const animId = requestAnimationFrame(render);

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            generatePath(); 
        };

        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('scroll', updateProgress);
        };
    }, [isDark]); // Re-run effect when theme changes

    return (
        <canvas 
            ref={canvasRef}
            className="fixed inset-0 z-0 pointer-events-none bg-zinc-50 dark:bg-[#050505] transition-colors duration-500"
        />
    );
};