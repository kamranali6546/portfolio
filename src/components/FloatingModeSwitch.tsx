import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Film, ArrowRight } from 'lucide-react';

interface FloatingModeSwitchProps {
  currentMode: 'series' | 'minimal';
  onToggle: () => void;
}

/**
 * Floating Mode Switcher Button:
 *
 * Floats effortlessly at the bottom corner of the viewport across both Series Mode
 * and Minimal Portfolio Mode. Features a sleek glass pill with glowing accent,
 * tactile hover state, and clear toggle messaging ("Switch to Minimal" / "Switch to Series").
 */
export default function FloatingModeSwitch({
  currentMode,
  onToggle,
}: FloatingModeSwitchProps) {
  const [isHovered, setIsHovered] = useState(false);

  const isSeries = currentMode === 'series';

  return (
    <aside aria-label="View switcher" className="fixed bottom-6 right-6 z-[90] select-none pointer-events-auto">
      <motion.button
        type="button"
        onClick={onToggle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        initial={{ opacity: 0, scale: 0.85, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isSeries ? 'Switch to Minimal Portfolio' : 'Switch to Series Mode'}
        className="group relative flex items-center gap-2.5 rounded-full border border-white/20 bg-[#0e0e14]/90 px-4 py-2.5 text-xs font-semibold text-white shadow-[0_12px_36px_rgba(0,0,0,0.65)] backdrop-blur-xl transition-colors hover:border-[#ff3d5a]/60 hover:bg-[#151520] focus:outline-none focus:ring-2 focus:ring-[#ff3d5a]/50"
      >
        {/* Glow ambient background ring */}
        <span
          aria-hidden="true"
          className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-[#ff3d5a]/40 to-[#8FD9BE]/40 opacity-40 blur-md transition duration-500 group-hover:opacity-100"
        />

        {/* Floating pill contents */}
        <div className="relative z-10 flex items-center gap-2">
          {isSeries ? (
            <>
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#8FD9BE]/20 text-[#8FD9BE]">
                <Sparkles className="h-3 w-3" />
              </div>
              <span className="text-white/95 font-medium tracking-wide">
                Minimal View
              </span>
            </>
          ) : (
            <>
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#ff3d5a]/20 text-[#ff3d5a]">
                <Film className="h-3 w-3" />
              </div>
              <span className="text-white/95 font-medium tracking-wide">
                Series Mode
              </span>
            </>
          )}

          <ArrowRight className="h-3.5 w-3.5 text-white/50 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-white" />
        </div>
      </motion.button>
    </aside>
  );
}
