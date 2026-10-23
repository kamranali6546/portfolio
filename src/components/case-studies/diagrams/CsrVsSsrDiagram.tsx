import React, { useState } from "react";

export const CsrVsSsrDiagram: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"ssr" | "csr">("ssr");

  return (
    <div
      className="p-6 rounded-lg border border-hairline bg-surface space-y-4 my-8"
      role="region"
      aria-label="Client-side rendering versus server-side rendering comparison"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-hairline pb-4">
        <div>
          <span className="font-mono text-xs text-accent font-semibold tracking-wider block">
            SIMPLIFIED ILLUSTRATION
          </span>
          <h4 className="font-serif text-lg font-medium text-ink">
            What search crawlers receive: CSR vs SSR
          </h4>
        </div>

        {/* Toggle Buttons */}
        <div className="inline-flex p-1 rounded-md bg-surface-subtle border border-hairline">
          <button
            type="button"
            onClick={() => setActiveTab("ssr")}
            className={`px-3 py-1.5 text-xs font-mono font-medium rounded transition-colors ${
              activeTab === "ssr"
                ? "bg-accent text-white shadow-xs"
                : "text-muted hover:text-ink"
            }`}
          >
            Next.js SSR (Migrated)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("csr")}
            className={`px-3 py-1.5 text-xs font-mono font-medium rounded transition-colors ${
              activeTab === "csr"
                ? "bg-accent text-white shadow-xs"
                : "text-muted hover:text-ink"
            }`}
          >
            Legacy CSR
          </button>
        </div>
      </div>

      {/* SVG Diagram Canvas */}
      <div className="w-full h-64 sm:h-72 bg-canvas/60 rounded-md border border-hairline p-4 flex items-center justify-center">
        <svg
          viewBox="0 0 680 220"
          className="w-full h-full text-ink"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Step 1: Crawler / User Request */}
          <g transform="translate(40, 70)">
            <rect width="130" height="70" rx="6" fill="var(--color-surface)" stroke="var(--color-hairline)" strokeWidth="1.2" />
            <text x="65" y="32" textAnchor="middle" className="fill-current font-mono text-xs font-medium text-ink">
              Search Crawler
            </text>
            <text x="65" y="50" textAnchor="middle" className="fill-current font-mono text-[10px] text-muted">
              HTTP GET /en
            </text>
          </g>

          {/* Connection arrow 1 */}
          <path
            d="M 175 105 L 255 105"
            stroke="var(--color-accent)"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            className="animate-pulse"
          />

          {/* Step 2: Web Server / Edge */}
          <g transform="translate(260, 50)">
            <rect
              width="160"
              height="110"
              rx="6"
              fill="var(--color-surface)"
              stroke={activeTab === "ssr" ? "var(--color-accent)" : "var(--color-hairline)"}
              strokeWidth={activeTab === "ssr" ? "1.8" : "1.2"}
            />
            <text x="80" y="30" textAnchor="middle" className="fill-current font-mono text-xs font-semibold text-ink">
              {activeTab === "ssr" ? "Next.js Node Server" : "Static Web Server"}
            </text>
            <text x="80" y="52" textAnchor="middle" className="fill-current font-sans text-[11px] text-muted">
              {activeTab === "ssr" ? "Executes Page & Metadata" : "Serves empty shell"}
            </text>
            <text x="80" y="74" textAnchor="middle" className="fill-current font-mono text-[10px] text-accent font-medium">
              {activeTab === "ssr" ? "Generates Full HTML" : "<div id=\"root\"></div>"}
            </text>
            <text x="80" y="94" textAnchor="middle" className="fill-current font-mono text-[10px] text-muted">
              {activeTab === "ssr" ? "Title, OG tags, Schema" : "+ heavy bundle.js"}
            </text>
          </g>

          {/* Connection arrow 2 */}
          <path
            d="M 425 105 L 495 105"
            stroke={activeTab === "ssr" ? "var(--color-accent)" : "currentColor"}
            strokeOpacity="0.4"
            strokeWidth="1.5"
          />

          {/* Step 3: Crawler Ingestion Result */}
          <g transform="translate(500, 60)">
            <rect
              width="150"
              height="90"
              rx="6"
              fill="var(--color-surface)"
              stroke={activeTab === "ssr" ? "var(--color-accent)" : "var(--color-brass)"}
              strokeWidth="1.5"
            />
            <text x="75" y="30" textAnchor="middle" className="fill-current font-mono text-xs font-bold text-ink">
              Index Result
            </text>
            <text x="75" y="52" textAnchor="middle" className="fill-current font-mono text-[11px] text-accent font-medium">
              {activeTab === "ssr" ? "✓ 100% Crawlable" : "! Deferred JS Render"}
            </text>
            <text x="75" y="72" textAnchor="middle" className="fill-current font-mono text-[10px] text-muted">
              {activeTab === "ssr" ? "+60% Organic Traffic" : "Indexation delay"}
            </text>
          </g>
        </svg>
      </div>

      <p className="text-xs font-mono text-muted leading-relaxed">
        {activeTab === "ssr"
          ? "With Next.js SSR, every route generates complete HTML markup and localized meta headers on the server. Search engines ingest content on the first round trip."
          : "Under client-side rendering, search engines initially see an empty HTML shell and must queue JavaScript execution, delaying indexation."}
      </p>
    </div>
  );
};
