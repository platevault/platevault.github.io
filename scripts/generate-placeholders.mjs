#!/usr/bin/env node
// Regenerates the on-brand "plate" placeholder screenshots under
// src/assets/screenshots/. Each is a dark observatory plate — deep background,
// teal corner registration ticks, a faint plate-solve reticle, and a monospace
// "PlateVault · <name>" label — standing in for a real capture without reading
// as a broken TODO box. Run after adding/renaming a placeholder entry below, or
// after replacing a placeholder with a real screenshot (delete its entry first).
//
// Kept as generate-placeholders.mjs (the existing filename referenced by
// reference/screenshots-todo.md); the task suggested gen-placeholders.mjs but
// reusing the tracked file avoids an orphan + a stale doc pointer.
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const outDir = join(dirname(fileURLToPath(import.meta.url)), "..", "src", "assets", "screenshots");

// slug -> { name: short monospace label, alt: descriptive aria-label sentence }.
// Keep in sync with src/content/docs/reference/screenshots-todo.md and the
// manual pages that embed these images. The landing hero is no longer a
// placeholder image — it is an inline SVG motif in index.mdx — so it is absent.
const placeholders = {
  "setup-wizard": { name: "Setup wizard", alt: "Setup wizard Source Folders step" },
  "setup-wizard-confirm": { name: "Setup · confirm", alt: "Setup wizard confirm summary before registration" },
  "data-sources": { name: "Data sources", alt: "Settings Data Sources with source lifecycle controls" },
  "inbox": { name: "Inbox", alt: "Inbox queue with a mixed folder split into single-type items" },
  "inbox-needs-review": { name: "Inbox · review", alt: "Inbox needs-review banner with Confirm disabled" },
  "inbox-reclassify": { name: "Inbox · reclassify", alt: "Inbox bulk reclassify on selected files" },
  "inbox-destination-root": { name: "Inbox · destination", alt: "Inbox destination-root choice between library roots" },
  "plan-review": { name: "Plan review", alt: "Plan review with move actions and source and destination paths" },
  "plan-review-catalogue": { name: "Plan · catalogue", alt: "Plan review with catalogue-in-place actions where destination equals source" },
  "sessions": { name: "Sessions", alt: "Sessions list and detail" },
  "targets-planning": { name: "Targets", alt: "Targets list with tonight's planner columns" },
  "targets-add-search": { name: "Targets · add", alt: "Targets add-target search phases" },
  "targets-why-guidance": { name: "Targets · guidance", alt: "Targets why-this-guidance thresholds" },
  "projects-lifecycle": { name: "Project detail", alt: "Project detail with attached sessions and per-channel numbers" },
  "project-create": { name: "Project · create", alt: "Projects creation wizard with tool profile" },
  "project-archive-plan": { name: "Archive plan", alt: "Archive plan review with protected-item acknowledgement" },
  "archive-page": { name: "Archive", alt: "Archive page with archived entries and removal actions" },
  "calibration-masters": { name: "Calibration masters", alt: "Calibration master list with kind-conditional columns" },
  "calibration-matching": { name: "Calibration · match", alt: "Calibration ranked candidates with confidence and mismatches" },
  "cleanup-scan-preview": { name: "Cleanup · scan", alt: "Cleanup scan preview with protected items locked" },
  "cleanup-archive": { name: "Cleanup plan", alt: "Cleanup plan review acknowledgement before Approve and apply" },
  "settings": { name: "Settings", alt: "Settings Appearance pane" },
  "settings-equipment": { name: "Settings · equipment", alt: "Settings Equipment pane" },
  "settings-target-planner": { name: "Settings · planner", alt: "Settings Target Planner sites and Moon-avoidance bands" },
  "settings-audit-log": { name: "Settings · audit", alt: "Settings Audit Log with outcomes" },
  "remap-verify": { name: "Remap", alt: "Remap dialog with verified path before Apply remap" },
  "updater": { name: "Updater", alt: "Settings Advanced with an update available" },
};

const width = 1280;
const height = 800;
const cx = width / 2;
const cy = height / 2 - 20;

// Deterministic starfield (fixed seed positions in the 1280x800 field).
const stars = [
  [120, 140, 2, 0.8], [300, 90, 1.4, 0.5], [520, 200, 1.8, 0.7], [740, 120, 1.4, 0.55],
  [960, 180, 2, 0.75], [1120, 110, 1.4, 0.5], [180, 360, 1.6, 0.6], [420, 520, 1.4, 0.45],
  [880, 560, 1.8, 0.7], [1080, 430, 1.4, 0.5], [640, 640, 1.6, 0.55], [240, 660, 1.4, 0.5],
  [1180, 640, 1.6, 0.6], [80, 520, 1.4, 0.45], [1000, 700, 1.4, 0.5],
];

function svg(name, alt) {
  const starEls = stars
    .map(([x, y, r, o]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#dbe6ee" fill-opacity="${o}"/>`)
    .join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="Screenshot placeholder: ${alt}.">
  <defs>
    <radialGradient id="plate" cx="50%" cy="42%" r="78%">
      <stop offset="0%" stop-color="#141b26"/>
      <stop offset="100%" stop-color="#0c1017"/>
    </radialGradient>
  </defs>
  <rect width="${width}" height="${height}" rx="14" fill="url(#plate)"/>
  <rect x="1.5" y="1.5" width="${width - 3}" height="${height - 3}" rx="13" fill="none" stroke="#4fd6e6" stroke-opacity="0.22"/>
  <g stroke="#4fd6e6" stroke-opacity="0.8" stroke-width="2.5" fill="none" stroke-linecap="round">
    <path d="M40 78V40H78"/><path d="M${width - 78} 40h38v38"/>
    <path d="M40 ${height - 78}v38h38"/><path d="M${width - 78} ${height - 40}h38v-38"/>
  </g>
  ${starEls}
  <g stroke="#5fe3ee" fill="none">
    <circle cx="${cx}" cy="${cy}" r="70" stroke-opacity="0.20" stroke-width="1.5"/>
    <circle cx="${cx}" cy="${cy}" r="120" stroke-opacity="0.13" stroke-width="1.5" stroke-dasharray="3 10"/>
    <path d="M${cx} 150V${cy - 24}M${cx} ${cy + 24}V${height - 150}" stroke-opacity="0.28" stroke-width="1.5"/>
    <path d="M170 ${cy}h${cx - 194}M${cx + 24} ${cy}h${width - 194 - cx}" stroke-opacity="0.28" stroke-width="1.5"/>
    <path d="M${cx - 12} ${cy}h24M${cx} ${cy - 12}v24" stroke-opacity="0.65" stroke-width="2"/>
  </g>
  <text x="60" y="${height - 52}" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="26" letter-spacing="1" fill="#6fe0ea">PlateVault · ${name}</text>
  <text x="${width - 60}" y="72" text-anchor="end" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="18" letter-spacing="3" fill="#7c93a3">PLATE</text>
</svg>
`;
}

for (const [slug, { name, alt }] of Object.entries(placeholders)) {
  writeFileSync(join(outDir, `${slug}.svg`), svg(name, alt), "utf8");
}

console.log(`Wrote ${Object.keys(placeholders).length} plate placeholder SVGs to ${outDir}`);
