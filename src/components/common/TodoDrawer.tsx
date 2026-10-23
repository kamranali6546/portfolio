import React, { useState } from "react";
import { AlertCircle, X, CheckSquare, Clock } from "lucide-react";

interface TodoItem {
  priority: "High" | "Medium" | "Low";
  file: string;
  item: string;
  actionRequired: string;
}

const openTodos: TodoItem[] = [
  {
    priority: "High",
    file: "src/content/profile.ts",
    item: "Phone numbers verification",
    actionRequired: "Confirm which phone is primary / WhatsApp number between +995 568 772 744 and +92 346 9723869.",
  },
  {
    priority: "High",
    file: "public/Kamran_Ali_CV.pdf",
    item: "Curriculum Vitae PDF",
    actionRequired: "Upload finalized PDF resume to /public/Kamran_Ali_CV.pdf for download link.",
  },
  {
    priority: "Medium",
    file: "src/content/experience.ts",
    item: "Employment tenure alignment",
    actionRequired: "Timeline dates differ from LinkedIn profile version. Confirm one authoritative set before publishing.",
  },
  {
    priority: "Medium",
    file: "src/content/projects.ts",
    item: "Business Class For Less verification",
    actionRequired: "The site footer credits another developer. Project is currently marked published: false. Set to true only after verifying exact frontend contribution.",
  },
];

export const TodoDrawer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-40 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-brass/50 bg-canvas/90 backdrop-blur-md text-[11px] font-mono text-brass shadow-md hover:bg-canvas transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-brass"
        aria-label="Open developer review checklist"
      >
        <AlertCircle className="w-3.5 h-3.5" aria-hidden="true" />
        <span>TODOs ({openTodos.length})</span>
      </button>

      {/* Drawer */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex justify-end bg-canvas/50 backdrop-blur-xs animate-in fade-in"
          role="dialog"
          aria-modal="true"
          aria-label="Open TODO items"
        >
          <div className="w-full max-w-md bg-surface border-l border-hairline h-full flex flex-col justify-between p-6 overflow-y-auto animate-in slide-in-from-right">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-hairline">
                <div className="flex items-center gap-2">
                  <CheckSquare className="w-4 h-4 text-accent" aria-hidden="true" />
                  <span className="font-mono text-xs font-semibold uppercase tracking-wider text-ink">
                    Open Action Items
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close checklist"
                  className="p-1 rounded-md text-muted hover:text-ink focus:outline-none"
                >
                  <X className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>

              <p className="text-xs text-muted font-sans">
                These tasks track unresolved decisions from the brief. Per Section 1 honesty rules,
                unconfirmed items render nothing or remain un-published until verified.
              </p>

              {/* Grouped by Priority */}
              {(["High", "Medium", "Low"] as const).map((priority) => {
                const items = openTodos.filter((t) => t.priority === priority);
                if (items.length === 0) return null;

                return (
                  <div key={priority} className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded font-medium ${
                          priority === "High"
                            ? "bg-red-500/10 text-red-600 dark:text-red-400"
                            : "bg-brass-subtle text-brass"
                        }`}
                      >
                        {priority} Priority
                      </span>
                    </div>

                    <div className="space-y-2">
                      {items.map((item, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-md border border-hairline bg-surface-subtle/40 space-y-1.5"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-ink font-sans">
                              {item.item}
                            </span>
                            <span className="font-mono text-[10px] text-muted">
                              {item.file}
                            </span>
                          </div>
                          <p className="text-xs text-muted leading-relaxed font-sans">
                            {item.actionRequired}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-6 border-t border-hairline text-center">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-full py-2.5 px-4 rounded-md bg-accent text-white font-medium text-xs"
              >
                Close Checklist
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
