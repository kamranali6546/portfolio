import React, { useState } from 'react';
import { ProjectItem } from '../types/portfolio';
import { sound } from '../utils/audio';
import { generatePlaygroundAnalysis } from '../services/gemini';
import { 
  X, 
  ExternalLink, 
  Github, 
  Sparkles, 
  Play, 
  CheckCircle2, 
  Activity, 
  Copy, 
  Check,
  RefreshCw,
  Sliders,
  Palette,
  Gauge
} from 'lucide-react';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  // Interactive AI Stream simulation
  const [aiPrompt, setAiPrompt] = useState<string>('Generate a responsive, WCAG-compliant customer analytics card in React');
  const [isStreamingAi, setIsStreamingAi] = useState<boolean>(false);
  const [streamChunks, setStreamChunks] = useState<string[]>([]);
  const [streamOutput, setStreamOutput] = useState<string>('');

  // Interactive Design Token Playground
  const [themeMode, setThemeMode] = useState<'dark' | 'light'>('dark');
  const [tokenRadius, setTokenRadius] = useState<number>(12);
  const [accentColor, setAccentColor] = useState<string>('#6366f1');

  // Interactive Core Web Vitals Simulator
  const [enableEdgeCaching, setEnableEdgeCaching] = useState<boolean>(true);
  const [enableRSCStreaming, setEnableRSCStreaming] = useState<boolean>(true);

  const [isCopiedCode, setIsCopiedCode] = useState<boolean>(false);

  const handleRunAiStream = async () => {
    sound.playClick(900);
    setIsStreamingAi(true);
    setStreamChunks([]);
    setStreamOutput('');

    const phases = [
      '1. Initializing Vercel AI SDK streaming client (gemini-2.5-pro)...',
      '2. Validating React AST ASTNode schema definitions...',
      '3. Ingesting Tailwind CSS utility classes into design token stream...',
      '4. Streaming generative interactive UI components in real-time...',
      '5. Hydration complete: 0 accessibility violations, 60 FPS verified.'
    ];

    for (let i = 0; i < phases.length; i++) {
      await new Promise(res => setTimeout(res, 350));
      setStreamChunks(prev => [...prev, phases[i]]);
      sound.playClick(750);
    }

    try {
      const review = await generatePlaygroundAnalysis(project.title, aiPrompt);
      setStreamOutput(review);
      sound.playSuccess();
    } catch {
      setStreamOutput('Successfully rendered dynamic React component with zero layout shift.');
    } finally {
      setIsStreamingAi(false);
    }
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setIsCopiedCode(true);
    sound.playClick(800);
    setTimeout(() => setIsCopiedCode(false), 2000);
  };

  const simulatedLCP = enableEdgeCaching && enableRSCStreaming ? '0.78s' : enableEdgeCaching ? '1.24s' : '2.45s';
  const simulatedCLS = '0.00';
  const simulatedLighthouseScore = enableEdgeCaching && enableRSCStreaming ? 100 : enableEdgeCaching ? 94 : 82;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md select-none overflow-y-auto">
      <div className="w-full max-w-3xl rounded-2xl bg-neutral-900 border border-neutral-800 shadow-2xl overflow-hidden flex flex-col my-8">
        {/* Modal Header */}
        <div className="p-5 border-b border-neutral-800 flex items-start justify-between gap-4 bg-neutral-950/80">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-indigo-950 border border-indigo-500/40 text-indigo-300">
                {project.category.replace('_', ' ')}
              </span>
              {project.featured && (
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950/80 border border-emerald-500/40 text-emerald-300">
                  Featured System
                </span>
              )}
            </div>
            <h2 className="text-lg font-bold text-neutral-100 mt-1">{project.title}</h2>
            <p className="text-xs text-neutral-400 mt-0.5">{project.tagline}</p>
          </div>

          <button
            onClick={() => { sound.playClick(600); onClose(); }}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 overflow-y-auto max-h-[70vh]">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-3 gap-3">
            {(project.metrics || []).map((m, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-center">
                <div className="text-base font-bold font-mono text-indigo-300">{m.value}</div>
                <div className="text-[11px] text-neutral-400 mt-0.5">{m.label}</div>
              </div>
            ))}
          </div>

          {/* Description & Architecture Highlights */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-neutral-200 uppercase tracking-wider">Frontend Architecture Overview</h3>
            <p className="text-xs text-neutral-300 leading-relaxed">{project.description}</p>

            <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2">
              <h4 className="text-xs font-semibold text-neutral-200">Architectural Decisions & Deliverables:</h4>
              <ul className="space-y-1.5 text-xs text-neutral-400">
                {(project.architectureHighlights || []).map((hl, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{hl}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Interactive AI Streaming Demo */}
          {project.interactiveDemoType === 'ai_query' && (
            <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-300">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Interactive AI Generative UI Simulator</span>
                </div>
                <span className="text-[10px] font-mono text-neutral-500">Vercel AI SDK</span>
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  className="flex-1 bg-neutral-900 text-neutral-200 text-xs px-3 py-2 rounded-lg border border-neutral-800 focus:border-indigo-500 focus:outline-none font-mono"
                  placeholder="Enter prompt for generative UI component..."
                />
                <button
                  onClick={handleRunAiStream}
                  disabled={isStreamingAi}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-500 disabled:opacity-50 transition-all cursor-pointer shrink-0"
                >
                  {isStreamingAi ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                  <span>{isStreamingAi ? 'Streaming...' : 'Generate UI'}</span>
                </button>
              </div>

              {/* Steps timeline */}
              {streamChunks.length > 0 && (
                <div className="space-y-1.5 font-mono text-[11px] text-emerald-400/90 pt-1">
                  {streamChunks.map((step, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              )}

              {streamOutput && (
                <div className="p-3 rounded-lg bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-300 whitespace-pre-wrap">
                  {streamOutput}
                </div>
              )}
            </div>
          )}

          {/* Interactive Design Token Playground */}
          {project.interactiveDemoType === 'component_preview' && (
            <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-300">
                  <Palette className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Design Token & Component Sandbox</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400">Atomic Tokens</span>
              </div>

              {/* Controls */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="space-y-1">
                  <label className="text-neutral-400">Theme Mode</label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setThemeMode('dark')}
                      className={`px-3 py-1 rounded text-xs font-mono ${themeMode === 'dark' ? 'bg-indigo-600 text-white' : 'bg-neutral-800 text-neutral-400'}`}
                    >
                      Dark
                    </button>
                    <button
                      onClick={() => setThemeMode('light')}
                      className={`px-3 py-1 rounded text-xs font-mono ${themeMode === 'light' ? 'bg-neutral-100 text-neutral-900' : 'bg-neutral-800 text-neutral-400'}`}
                    >
                      Light
                    </button>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-neutral-400">
                    <span>Radius Token</span>
                    <span className="font-mono text-indigo-300">{tokenRadius}px</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="24"
                    value={tokenRadius}
                    onChange={(e) => setTokenRadius(parseInt(e.target.value))}
                    className="w-full accent-indigo-500 h-1 bg-neutral-800 rounded cursor-pointer"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-neutral-400">Accent Token</label>
                  <div className="flex gap-2 items-center">
                    {['#6366f1', '#06b6d4', '#10b981', '#f59e0b'].map(c => (
                      <button
                        key={c}
                        onClick={() => setAccentColor(c)}
                        className={`w-6 h-6 rounded-full border-2 transition-transform ${accentColor === c ? 'scale-110 border-white' : 'border-transparent'}`}
                        style={{ backgroundColor: c }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Live Preview Component Box */}
              <div 
                className={`p-5 transition-all duration-300 border flex flex-col gap-3 ${
                  themeMode === 'dark' ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-neutral-100 border-neutral-300 text-neutral-900'
                }`}
                style={{ borderRadius: `${tokenRadius}px` }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs">Live Tokenized Component Preview</span>
                  <span 
                    className="px-2 py-0.5 text-[10px] font-mono text-white"
                    style={{ backgroundColor: accentColor, borderRadius: `${tokenRadius / 2}px` }}
                  >
                    Active Token
                  </span>
                </div>
                <p className="text-xs opacity-80 leading-relaxed">
                  Design tokens dynamically synchronized across CSS custom properties and Figma variables.
                </p>
                <div className="flex gap-2 pt-1">
                  <button
                    className="px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm cursor-pointer"
                    style={{ backgroundColor: accentColor, borderRadius: `${tokenRadius / 1.5}px` }}
                  >
                    Primary Action
                  </button>
                  <button
                    className={`px-3 py-1.5 text-xs font-semibold border ${themeMode === 'dark' ? 'border-neutral-700 text-neutral-300' : 'border-neutral-400 text-neutral-800'}`}
                    style={{ borderRadius: `${tokenRadius / 1.5}px` }}
                  >
                    Secondary
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Interactive Core Web Vitals Simulator */}
          {project.interactiveDemoType === 'lighthouse_score' && (
            <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-300">
                  <Gauge className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Core Web Vitals & Next.js Performance Inspector</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400">100/100 Lighthouse</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <label className="flex items-center gap-2 p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={enableEdgeCaching}
                    onChange={(e) => setEnableEdgeCaching(e.target.checked)}
                    className="accent-indigo-500 rounded"
                  />
                  <span>Edge SSR Cache & Incremental Static Regeneration (ISR)</span>
                </label>

                <label className="flex items-center gap-2 p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={enableRSCStreaming}
                    onChange={(e) => setEnableRSCStreaming(e.target.checked)}
                    className="accent-indigo-500 rounded"
                  />
                  <span>React Server Components (RSC) Streaming Suspense</span>
                </label>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-3 gap-2 text-center pt-1">
                <div className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800">
                  <div className="text-[10px] text-neutral-500">Lighthouse Score</div>
                  <div className="text-base font-mono font-bold text-emerald-400">{simulatedLighthouseScore} / 100</div>
                </div>
                <div className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800">
                  <div className="text-[10px] text-neutral-500">Largest Contentful Paint (LCP)</div>
                  <div className="text-base font-mono font-bold text-cyan-400">{simulatedLCP}</div>
                </div>
                <div className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800">
                  <div className="text-[10px] text-neutral-500">Cumulative Layout Shift (CLS)</div>
                  <div className="text-base font-mono font-bold text-indigo-300">{simulatedCLS}</div>
                </div>
              </div>
            </div>
          )}

          {/* Code Snippet Viewer */}
          {project.codeSnippet && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-neutral-200 uppercase tracking-wider">Implementation Snippet</span>
                <button
                  onClick={() => handleCopyCode(project.codeSnippet!)}
                  className="flex items-center gap-1 text-[10px] text-neutral-400 hover:text-neutral-200 cursor-pointer"
                >
                  {isCopiedCode ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{isCopiedCode ? 'Copied' : 'Copy Code'}</span>
                </button>
              </div>
              <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 font-mono text-[11px] text-neutral-300 overflow-x-auto">
                <pre>
                  <code>{project.codeSnippet}</code>
                </pre>
              </div>
            </div>
          )}

          {/* Tech Tags */}
          <div className="flex flex-wrap gap-1.5 pt-2">
            {(project.tags || []).map(t => (
              <span key={t} className="px-2 py-0.5 rounded text-[11px] font-mono bg-neutral-950 text-neutral-400 border border-neutral-800">
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Modal Footer Links */}
        <div className="p-4 border-t border-neutral-800 bg-neutral-950/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-neutral-200 transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>View Source on GitHub</span>
              </a>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-semibold bg-neutral-800 text-neutral-300 hover:bg-neutral-700 transition-colors cursor-pointer"
            >
              Close
            </button>

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-500 transition-colors"
              >
                <span>Live Deployment</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
