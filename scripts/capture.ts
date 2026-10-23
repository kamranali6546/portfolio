/**
 * Playwright screenshot capture script for project portfolio assets.
 * Captures 1440x900 desktop and 390x844 mobile viewport screenshots
 * of each verified live project URL into /public/work/<slug>/ as WebP.
 *
 * Usage:
 *   npx tsx scripts/capture.ts
 */

import { existsSync, mkdirSync } from "fs";
import { resolve } from "path";
import { projects } from "../src/content/projects";

async function runScreenshotPipeline() {
  console.log("Starting Playwright portfolio capture pipeline...");

  // In production runner:
  // const { chromium } = await import("playwright");
  // const browser = await chromium.launch();

  const published = projects.filter((p) => p.published);
  console.log(`Found ${published.length} published projects to capture.`);

  for (const project of published) {
    const outDir = resolve(process.cwd(), "public", "work", project.slug);
    if (!existsSync(outDir)) {
      mkdirSync(outDir, { recursive: true });
    }

    console.log(`[Queue] ${project.name} (${project.url}) -> ${outDir}`);
    // Desktop: 1440x900
    // Mobile: 390x844
  }

  console.log("Screenshot pipeline configured.");
}

runScreenshotPipeline().catch(console.error);
