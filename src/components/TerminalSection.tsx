import React, { useState, useRef, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { TerminalLog } from '../types/portfolio';
import { sound } from '../utils/audio';
import { 
  Terminal as TerminalIcon, 
  CornerDownLeft, 
  RotateCcw
} from 'lucide-react';

export const TerminalSection: React.FC = () => {
  const { profile, projects, skills, experience, setIsResumeOpen, showToast } = usePortfolio();

  const [input, setInput] = useState<string>('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);

  const [logs, setLogs] = useState<TerminalLog[]>([
    {
      id: 'init-1',
      type: 'system',
      content: `Kamran Ali Shell v2.4 (Senior Frontend Architecture)\nType "help" to view available commands or click the quick action pills below.`
    }
  ]);

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const handleCommand = (rawCmd: string) => {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    sound.playTerminalBeep();
    setHistory(prev => [...prev, rawCmd]);
    setHistoryIndex(-1);

    const newLogs: TerminalLog[] = [
      ...logs,
      { id: `in-${Date.now()}`, type: 'input', content: rawCmd }
    ];

    if (cmd === 'clear' || cmd === 'cls') {
      setLogs([]);
      setInput('');
      return;
    }

    if (cmd === 'help') {
      newLogs.push({
        id: `out-${Date.now()}`,
        type: 'output',
        content: `Available Frontend CLI Commands:
  • help             - List all interactive commands
  • about / bio      - Display Kamran's professional summary & key achievements
  • skills           - Print core frontend competencies & state layers
  • experience       - Print career trajectory (Exion, Gordian, Bring GmbH, TEKX)
  • projects         - List featured frontend systems & design engines
  • education        - Print MBA & BCS degree information
  • contact          - Print direct contact (Email: ${profile.email}, Phone: ${profile.phone})
  • resume / cv      - Launch interactive resume viewer
  • sudo hire kamran - Execute instant hiring interview invitation protocol
  • clear            - Clear terminal screen`
      });
    } else if (cmd === 'about' || cmd === 'bio') {
      const bioStr = Array.isArray(profile?.bio) ? profile.bio.join('\n\n') : '';
      newLogs.push({
        id: `out-${Date.now()}`,
        type: 'output',
        content: `${profile.name} — ${profile.title} (${profile.subtitle})
Location: ${profile.location} | Phone: ${profile.phone}
Relocation: ${profile.relocationStatus}
Status:   ${profile.availability}

KEY ACHIEVEMENTS:
• Cut production bugs by 90% via rigorous peer code-review culture.
• Sustained a 95% client satisfaction rate across 4+ year enterprise engagement.
• Drove an 80% increase in mobile traffic through systematic responsive redesigns.
• Improved page load times by up to 45% and lifted SEO rankings by 25%.

${bioStr}`
      });
    } else if (cmd === 'skills') {
      const skillsSummary = (skills || []).map(s => `  • ${s.name.padEnd(36)} [${s.years} yrs]  — ${s.category}`).join('\n');
      newLogs.push({
        id: `out-${Date.now()}`,
        type: 'output',
        content: `Core Frontend Competencies:\n${skillsSummary}`
      });
    } else if (cmd === 'experience') {
      const expSummary = (experience || []).map(e => `  • ${e.role} @ ${e.company} (${e.period})\n    Location: ${e.location}\n    Stack: ${(e.techStack || []).join(', ')}\n`).join('\n');
      newLogs.push({
        id: `out-${Date.now()}`,
        type: 'output',
        content: `Career Timeline:\n\n${expSummary}`
      });
    } else if (cmd === 'education') {
      const eduSummary = (profile?.education || []).map(e => `  • ${e.degree} (${e.year}) — ${e.institution}`).join('\n');
      newLogs.push({
        id: `out-${Date.now()}`,
        type: 'output',
        content: `Academic Credentials:\n\n${eduSummary}\n\nLanguages: English (Proficient), Urdu (Native)`
      });
    } else if (cmd === 'projects') {
      const projSummary = (projects || []).map(p => `  • ${p.title}\n    ${p.tagline}\n    Stack: ${(p.tags || []).join(', ')}\n`).join('\n');
      newLogs.push({
        id: `out-${Date.now()}`,
        type: 'output',
        content: `Featured Production Projects:\n\n${projSummary}`
      });
    } else if (cmd === 'contact' || cmd === 'email' || cmd === 'phone') {
      newLogs.push({
        id: `out-${Date.now()}`,
        type: 'output',
        content: `Contact Kamran Ali:
  • Email:    ${profile.email}
  • Phone:    ${profile.phone}
  • Location: ${profile.location} (${profile.relocationStatus})
  • GitHub:   ${profile.github}
  • LinkedIn: ${profile.linkedin}
  • Status:   ${profile.availability}`
      });
    } else if (cmd === 'resume' || cmd === 'cv' || cmd === 'cat resume.pdf') {
      setIsResumeOpen(true);
      newLogs.push({
        id: `out-${Date.now()}`,
        type: 'output',
        content: `Launching interactive resume viewer... [OK]`
      });
    } else if (cmd === 'sudo hire kamran' || cmd === 'hire') {
      sound.playSuccess();
      newLogs.push({
        id: `out-${Date.now()}`,
        type: 'output',
        content: `[ACCESS GRANTED] Fast-track hiring authorization unlocked.
Direct email: ${profile.email}
Direct phone: ${profile.phone}
Open to relocation · Requires employer-sponsored work permit`
      });
      showToast('Hiring protocol unlocked! Contact details copied.', 'success');
    } else {
      newLogs.push({
        id: `err-${Date.now()}`,
        type: 'error',
        content: `bash: command not found: ${rawCmd}. Type "help" for a list of valid commands.`
      });
    }

    setLogs(newLogs);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const nextIdx = historyIndex + 1 < history.length ? historyIndex + 1 : historyIndex;
        setHistoryIndex(nextIdx);
        setInput(history[history.length - 1 - nextIdx] || '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInput(history[history.length - 1 - nextIdx] || '');
      } else {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  const quickPills = [
    'help',
    'about',
    'skills',
    'experience',
    'education',
    'projects',
    'contact',
    'resume',
    'sudo hire kamran'
  ];

  return (
    <section id="terminal" className="py-16 px-4 lg:px-8 max-w-7xl mx-auto space-y-6">
      {/* Section Header */}
      <div className="pb-4 border-b border-neutral-800 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider">
            <TerminalIcon className="w-4 h-4" />
            <span>Interactive CLI</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-100 tracking-tight mt-1">
            Developer Terminal
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-2xl">
            Inspect background details, query skills, and trigger commands directly via the embedded developer terminal.
          </p>
        </div>

        <button
          onClick={() => {
            sound.playClick(650);
            setLogs([]);
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-neutral-200 self-start md:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Clear Screen</span>
        </button>
      </div>

      {/* Terminal Window */}
      <div 
        onClick={() => inputRef.current?.focus()}
        className="rounded-2xl bg-neutral-950 border border-neutral-800 shadow-2xl overflow-hidden font-mono flex flex-col cursor-text"
      >
        {/* Terminal Titlebar */}
        <div className="p-3 bg-neutral-900/90 border-b border-neutral-800 flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            <span className="text-xs text-neutral-400 ml-2">kamran@frontend-arch: ~</span>
          </div>
          <span className="text-[10px] text-neutral-500">bash 5.2</span>
        </div>

        {/* Logs Output */}
        <div className="p-5 overflow-y-auto max-h-96 min-h-[280px] space-y-3 text-xs leading-relaxed">
          {logs.map((log) => (
            <div key={log.id} className="whitespace-pre-wrap">
              {log.type === 'input' && (
                <div className="flex items-center gap-2 text-indigo-300 font-bold">
                  <span className="text-emerald-400">kamran@frontend:~$</span>
                  <span>{log.content}</span>
                </div>
              )}
              {log.type === 'output' && (
                <div className="text-neutral-300 text-xs pl-2 border-l-2 border-indigo-500/30">
                  {log.content}
                </div>
              )}
              {log.type === 'system' && (
                <div className="text-neutral-500 italic">
                  {log.content}
                </div>
              )}
              {log.type === 'error' && (
                <div className="text-rose-400 font-bold">
                  {log.content}
                </div>
              )}
            </div>
          ))}
          <div ref={terminalEndRef} />
        </div>

        {/* Active Input Line */}
        <div className="p-3 border-t border-neutral-800/80 bg-neutral-950 flex items-center gap-2 px-4">
          <span className="text-emerald-400 text-xs font-bold shrink-0">kamran@frontend:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-neutral-100 text-xs font-mono focus:outline-none"
            placeholder="Type command (e.g., 'help', 'skills', 'experience', 'sudo hire kamran')..."
            autoComplete="off"
            spellCheck="false"
          />
          <CornerDownLeft className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
        </div>
      </div>

      {/* Quick Suggestion Pills */}
      <div className="flex flex-wrap items-center gap-2 pt-1">
        <span className="text-xs font-mono text-neutral-500 mr-1">Quick Run:</span>
        {quickPills.map(cmd => (
          <button
            key={cmd}
            onClick={() => handleCommand(cmd)}
            className="px-2.5 py-1 rounded-lg text-xs font-mono bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-indigo-200 hover:border-indigo-500/40 transition-colors cursor-pointer"
          >
            {cmd}
          </button>
        ))}
      </div>
    </section>
  );
};
