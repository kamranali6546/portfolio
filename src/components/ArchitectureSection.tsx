import React, { useState } from 'react';
import { sound } from '../utils/audio';
import { 
  AnimatedMicroFrontendSvg, 
  AnimatedRscPipelineSvg, 
  AnimatedAiTokenStreamSvg,
  AnimatedPerformanceGaugeSvg
} from './AnimatedSvgDecorations';
import { 
  Network, 
  Layers, 
  Zap, 
  ArrowRight, 
  Code2, 
  ShieldCheck, 
  Sparkles, 
  Play, 
  CheckCircle2, 
  Activity, 
  Cpu, 
  RefreshCw
} from 'lucide-react';

export const ArchitectureSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'microfrontends' | 'rsc_caching' | 'ai_streaming'>('microfrontends');
  const [activeNodeId, setActiveNodeId] = useState<string>('turborepo');
  const [isSimulatingPulse, setIsSimulatingPulse] = useState<boolean>(false);
  const [simulationLog, setSimulationLog] = useState<string>('');

  const architectures = {
    microfrontends: {
      title: 'Micro-Frontend & Monorepo Architecture',
      subtitle: 'Turborepo workspace with Webpack Module Federation and zero-runtime design system tokens',
      nodes: [
        {
          id: 'turborepo',
          title: 'Monorepo Pipeline (Turborepo & pnpm)',
          desc: 'Shared TypeScript types, ESLint configs, and cached incremental builds with remote artifact caching.',
          metric: '85% faster CI',
          code: `// turbo.json
{
  "$schema": "https://turbo.build/schema.json",
  "pipeline": {
    "build": { "dependsOn": ["^build"], "outputs": ["dist/**", ".next/**"] },
    "lint": { "outputs": [] },
    "test": { "dependsOn": ["build"] }
  }
}`
        },
        {
          id: 'design_tokens',
          title: 'Atomic Design System & Token Engine',
          desc: 'Radix UI headless primitives styled with Tailwind CSS utility classes and Storybook documentation.',
          metric: '100% WCAG AA',
          code: `// packages/ui/tokens.ts
export const tokens = createThemeTokens({
  colors: { brand: 'var(--color-indigo-600)', surface: 'var(--color-neutral-900)' },
  radii: { button: '0.75rem', modal: '1rem' }
});`
        },
        {
          id: 'federation',
          title: 'Webpack Module Federation Container',
          desc: 'Host container loading independent micro-frontend remotes at runtime with shared React singletons.',
          metric: 'Zero Bundle Duplication',
          code: `// container webpack.config.js
new ModuleFederationPlugin({
  name: 'host_shell',
  remotes: {
    dashboard: 'dashboardApp@https://cdn.domain/dashboard/remoteEntry.js',
    checkout: 'checkoutApp@https://cdn.domain/checkout/remoteEntry.js'
  },
  shared: { react: { singleton: true }, 'react-dom': { singleton: true } }
});`
        },
        {
          id: 'event_bus',
          title: 'Type-Safe Micro-Frontend Event Bus',
          desc: 'Cross-app communication channel with TypeScript payload validation and decoupled isolation.',
          metric: '<1ms Dispatch',
          code: `// Event Bus Channel
export const globalEventBus = createTypedEventBus<{
  'user:authenticated': { userId: string; role: string };
  'theme:switched': { mode: 'dark' | 'light' };
}>();`
        }
      ]
    },
    rsc_caching: {
      title: 'Next.js App Router & Core Web Vitals Optimization',
      subtitle: 'React Server Components (RSC) with edge streaming, dynamic ISR, and 100/100 Lighthouse score',
      nodes: [
        {
          id: 'edge_middleware',
          title: 'Edge Middleware & Geolocation Routing',
          desc: 'Sub-10ms edge routing for authentication gating, localized redirects, and A/B test assignment.',
          metric: '<8ms Edge TTFB',
          code: `export function middleware(req: NextRequest) {
  const geo = req.geo?.country || 'US';
  const response = NextResponse.next();
  response.headers.set('x-user-region', geo);
  return response;
}`
        },
        {
          id: 'rsc_layer',
          title: 'React Server Components (RSC) Tree',
          desc: 'Zero-bundle-size server components querying backend services directly without client bundle weight.',
          metric: '-45% JS Payload',
          code: `// app/dashboard/page.tsx (Server Component)
export default async function DashboardPage() {
  const data = await getEnterpriseMetrics(); // Zero client JS
  return <MetricsDashboard initialData={data} />;
}`
        },
        {
          id: 'streaming_suspense',
          title: 'Streaming SSR with Suspense Boundaries',
          desc: 'Progressive HTML streaming delivering instant skeletons while slow data queries resolve concurrently.',
          metric: '0.8s LCP / 0.00 CLS',
          code: `<Suspense fallback={<DashboardSkeleton />}>
  <AsyncAnalyticsSection />
</Suspense>`
        },
        {
          id: 'tanstack_sync',
          title: 'TanStack Query Client Synchronization',
          desc: 'Optimistic UI mutations, automatic stale-while-revalidate caching, and window focus refetching.',
          metric: '99.8% Cache Hit',
          code: `const { data, mutate } = useMutation({
  mutationFn: updateProfile,
  onMutate: async (newProfile) => {
    await queryClient.cancelQueries({ queryKey: ['profile'] });
    queryClient.setQueryData(['profile'], newProfile);
  }
});`
        }
      ]
    },
    ai_streaming: {
      title: 'AI-Augmented Generative UI & Streaming Architecture',
      subtitle: 'Real-time token streaming with Vercel AI SDK and interactive markdown AST rendering',
      nodes: [
        {
          id: 'token_stream',
          title: 'Vercel AI SDK Token Stream Pipe',
          desc: 'HTTP chunked transfer streaming tokenized LLM completions directly into React state.',
          metric: '<45ms First Token',
          code: `import { OpenAIStream, StreamingTextResponse } from 'ai';
export async function POST(req: Request) {
  const stream = await createLLMStream(req);
  return new StreamingTextResponse(stream);
}`
        },
        {
          id: 'ast_parser',
          title: 'Generative UI Component Parser',
          desc: 'Real-time AST parser dynamically evaluating structured JSON tool calls into interactive React widgets.',
          metric: '60 FPS Render',
          code: `function renderDynamicComponent(node: ASTNode) {
  switch (node.type) {
    case 'data_table': return <DataTable data={node.props} />;
    case 'chart_viz': return <InteractiveChart series={node.props} />;
  }
}`
        },
        {
          id: 'zustand_offline',
          title: 'Zustand IndexedDB Offline State Store',
          desc: 'Persistent client-side conversation history and prompt templates stored with IndexedDB.',
          metric: 'Instant Offline Access',
          code: `export const useChatStore = create(
  persist(chatSlice, { name: 'ai-conversation-cache', storage: createJSONStorage(() => idbStorage) })
);`
        },
        {
          id: 'error_boundary',
          title: 'Resilient Error Boundary & Retries',
          desc: 'Graceful partial-failure isolation preventing chat stream crashes from breaking root layout.',
          metric: '99.9% Fault Tolerant',
          code: `<ErrorBoundary fallback={<StreamingFallbackRetry />}>
  <LiveAiStreamComponent />
</ErrorBoundary>`
        }
      ]
    }
  };

  const currentArch = architectures[activeTab];
  const currentNode = currentArch.nodes.find(n => n.id === activeNodeId) || currentArch.nodes[0];

  const handleSimulatePulse = () => {
    sound.playClick(950);
    setIsSimulatingPulse(true);
    setSimulationLog('Injecting telemetry pulse across architecture nodes...');

    setTimeout(() => {
      sound.playSuccess();
      setIsSimulatingPulse(false);
      setSimulationLog('✓ Live handshake confirmed: TTFB 7.8ms, 0 layout shifts, 100% cache hit.');
    }, 1200);
  };

  return (
    <section id="architecture" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-neutral-800">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-mono font-bold uppercase tracking-wider">
            <Layers className="w-4 h-4 animate-bounce" />
            <span>Interactive Architecture Schematics</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-neutral-100 tracking-tight mt-1.5">
            Living Architectural Blueprints
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-2xl">
            Real-time animated topologies showing how I structure micro-frontends, edge server components (RSC), and generative AI token streaming.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1.5 bg-neutral-900/90 p-1.5 rounded-2xl border border-neutral-800 self-start md:self-auto text-xs font-medium">
          <button
            onClick={() => {
              sound.playClick(700);
              setActiveTab('microfrontends');
              setActiveNodeId('turborepo');
            }}
            className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
              activeTab === 'microfrontends' ? 'bg-indigo-600 text-white font-bold shadow-md shadow-indigo-600/30' : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            Micro-Frontends
          </button>
          <button
            onClick={() => {
              sound.playClick(700);
              setActiveTab('rsc_caching');
              setActiveNodeId('edge_middleware');
            }}
            className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
              activeTab === 'rsc_caching' ? 'bg-cyan-600 text-white font-bold shadow-md shadow-cyan-600/30' : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            Next.js & RSC
          </button>
          <button
            onClick={() => {
              sound.playClick(700);
              setActiveTab('ai_streaming');
              setActiveNodeId('token_stream');
            }}
            className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
              activeTab === 'ai_streaming' ? 'bg-emerald-600 text-white font-bold shadow-md shadow-emerald-600/30' : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            AI Generative UI
          </button>
        </div>
      </div>

      {/* Main Animated Visualizer Stage */}
      <div className="rounded-3xl bg-neutral-900/80 border border-neutral-800 p-6 shadow-2xl relative overflow-hidden glow-indigo">
        {/* Stage Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-neutral-800">
          <div>
            <h3 className="text-base font-bold text-neutral-100 flex items-center gap-2">
              <span>{currentArch.title}</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-indigo-950 text-indigo-300 border border-indigo-500/30">
                ACTIVE_TOPOLOGY
              </span>
            </h3>
            <p className="text-xs text-neutral-400 mt-0.5">{currentArch.subtitle}</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleSimulatePulse}
              disabled={isSimulatingPulse}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-neutral-800 hover:bg-neutral-700 text-indigo-300 border border-neutral-700 transition-all cursor-pointer disabled:opacity-50"
            >
              {isSimulatingPulse ? <RefreshCw className="w-3.5 h-3.5 animate-spin text-cyan-400" /> : <Play className="w-3.5 h-3.5 fill-current" />}
              <span>{isSimulatingPulse ? 'Simulating...' : 'Dispatch Packet Pulse'}</span>
            </button>
          </div>
        </div>

        {/* Live Animated SVG Schematics Canvas */}
        <div className="py-4 bg-neutral-950/60 rounded-2xl border border-neutral-800/80 my-4">
          {activeTab === 'microfrontends' && (
            <AnimatedMicroFrontendSvg
              activeNodeId={activeNodeId}
              onSelectNode={(nodeId) => {
                sound.playClick(800);
                setActiveNodeId(nodeId);
              }}
              isPulsing={isSimulatingPulse}
            />
          )}
          {activeTab === 'rsc_caching' && (
            <AnimatedRscPipelineSvg
              activeNodeId={activeNodeId}
              onSelectNode={(nodeId) => {
                sound.playClick(800);
                setActiveNodeId(nodeId);
              }}
              isPulsing={isSimulatingPulse}
            />
          )}
          {activeTab === 'ai_streaming' && (
            <AnimatedAiTokenStreamSvg
              activeNodeId={activeNodeId}
              onSelectNode={(nodeId) => {
                sound.playClick(800);
                setActiveNodeId(nodeId);
              }}
              isPulsing={isSimulatingPulse}
            />
          )}
        </div>

        {simulationLog && (
          <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-xs font-mono text-emerald-400">
            {simulationLog}
          </div>
        )}
      </div>

      {/* Nodes Pipeline & Code Inspector Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Interactive Topology Node Selector (6 cols) */}
        <div className="lg:col-span-6 rounded-2xl bg-neutral-900/80 border border-neutral-800 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-neutral-100 uppercase tracking-wider">Pipeline Node Inspection</h3>
            <span className="text-[11px] font-mono text-neutral-500">Select node to inspect AST</span>
          </div>

          <div className="space-y-3 pt-1">
            {currentArch.nodes.map((node, idx) => {
              const isSelected = currentNode.id === node.id;
              return (
                <div
                  key={node.id}
                  onClick={() => {
                    sound.playClick(800);
                    setActiveNodeId(node.id);
                  }}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                    isSelected
                      ? 'bg-neutral-950 border-indigo-500 shadow-md ring-1 ring-indigo-500/40'
                      : 'bg-neutral-950/60 border-neutral-800/80 hover:border-neutral-700 hover:bg-neutral-950'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 font-mono text-xs font-bold ${
                      isSelected ? 'bg-indigo-600 text-white' : 'bg-neutral-800 text-neutral-400'
                    }`}>
                      0{idx + 1}
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-neutral-200 truncate">{node.title}</h4>
                      <p className="text-[11px] text-neutral-500 truncate">{node.desc}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-neutral-900 border border-neutral-800 text-indigo-300">
                      {node.metric}
                    </span>
                    <ArrowRight className={`w-4 h-4 ${isSelected ? 'text-indigo-400' : 'text-neutral-600'}`} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Code Specification & Metrics (6 cols) */}
        <div className="lg:col-span-6 rounded-2xl bg-neutral-900/80 border border-neutral-800 p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-indigo-400" />
              <span className="text-xs font-bold text-neutral-200">Implementation Pattern</span>
            </div>
            <span className="text-[10px] font-mono text-emerald-400">{currentNode.metric}</span>
          </div>

          <div>
            <h4 className="text-sm font-bold text-neutral-100">{currentNode.title}</h4>
            <p className="text-xs text-neutral-300 leading-relaxed mt-1.5">{currentNode.desc}</p>
          </div>

          <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 font-mono text-[11px] text-indigo-200 overflow-x-auto max-h-[220px]">
            <pre>
              <code>{currentNode.code}</code>
            </pre>
          </div>

          {/* Performance Gauges Row */}
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-neutral-800 text-center">
            <AnimatedPerformanceGaugeSvg score={100} label="Lighthouse" metric="100/100" />
            <AnimatedPerformanceGaugeSvg score={99} label="Core Web Vitals" metric="0.78s LCP" />
            <AnimatedPerformanceGaugeSvg score={100} label="Accessibility" metric="0 WCAG Violations" />
          </div>
        </div>
      </div>
    </section>
  );
};
