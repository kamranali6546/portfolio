import React, { useState, useRef, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { askKamranAI } from '../services/gemini';
import { sound } from '../utils/audio';
import { 
  X, 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  Loader2
} from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  time: string;
}

export const AiChatModal: React.FC = () => {
  const { isAiChatOpen, setIsAiChatOpen, showToast } = usePortfolio();

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      text: `Hello! I am Kamran Ali's AI Portfolio Concierge.\n\nAsk me anything about his Senior Frontend Developer background, Next.js & React architecture, design systems, Core Web Vitals optimization, or availability for roles.`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isAiChatOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isAiChatOpen]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  if (!isAiChatOpen) return null;

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isLoading) return;

    sound.playClick(850);
    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      role: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const aiResponse = await askKamranAI(query);
      sound.playSuccess();
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: 'assistant',
        text: aiResponse,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMsg]);
    } catch {
      showToast('Error communicating with AI assistant', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const sampleQuestions = [
    "What is Kamran's experience with Next.js App Router & React?",
    "How did he achieve a 90% reduction in production bugs?",
    "What is his relocation status and work authorization?",
    "Summarize his frontend design systems and micro-frontends expertise."
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm select-none">
      <div className="w-full max-w-2xl rounded-2xl bg-neutral-900 border border-neutral-800 shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-4 border-b border-neutral-800 bg-neutral-950/70 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-neutral-100 flex items-center gap-2">
                <span>Ask Kamran's AI Concierge</span>
                <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-indigo-950 text-indigo-300 border border-indigo-500/30">
                  Gemini 2.5
                </span>
              </h2>
              <p className="text-[11px] text-neutral-400">Grounded in verified frontend experience & resume</p>
            </div>
          </div>

          <button
            onClick={() => { sound.playClick(600); setIsAiChatOpen(false); }}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Message Stream */}
        <div className="p-5 overflow-y-auto flex-1 space-y-4 text-xs leading-relaxed max-h-[480px]">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold ${
                msg.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-neutral-800 text-indigo-300 border border-neutral-700'
              }`}>
                {msg.role === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
              </div>

              <div className={`p-3.5 rounded-2xl max-w-[82%] space-y-1 ${
                msg.role === 'user'
                  ? 'bg-indigo-600 text-white rounded-tr-none'
                  : 'bg-neutral-950 border border-neutral-800/90 text-neutral-200 rounded-tl-none font-sans'
              }`}>
                <div className="whitespace-pre-wrap leading-relaxed">{msg.text}</div>
                <div className={`text-[9px] font-mono ${msg.role === 'user' ? 'text-indigo-200 text-right' : 'text-neutral-500'}`}>
                  {msg.time}
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-lg bg-neutral-800 text-indigo-300 border border-neutral-700 flex items-center justify-center shrink-0">
                <Bot className="w-3.5 h-3.5" />
              </div>
              <div className="p-3.5 rounded-2xl bg-neutral-950 border border-neutral-800 text-neutral-400 text-xs flex items-center gap-2">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-indigo-400" />
                <span>Kamran's AI is synthesizing response...</span>
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Suggestion Chips */}
        <div className="px-4 py-2 bg-neutral-950 border-t border-neutral-800/80 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {sampleQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(q)}
              disabled={isLoading}
              className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-indigo-200 hover:border-indigo-500/40 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Footer */}
        <div className="p-4 bg-neutral-950 border-t border-neutral-800 flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask about Kamran's frontend architecture, Next.js, or hiring availability..."
            className="flex-1 bg-neutral-900 text-neutral-100 text-xs px-3.5 py-2.5 rounded-xl border border-neutral-800 focus:border-indigo-500 focus:outline-none"
            disabled={isLoading}
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={isLoading || !input.trim()}
            className="p-2.5 rounded-xl bg-indigo-600 text-white hover:bg-indigo-500 disabled:opacity-40 transition-all cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
