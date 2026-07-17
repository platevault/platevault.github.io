#!/usr/bin/env node
// Regenerates the grey placeholder screenshots under src/assets/screenshots/.
// Run after adding/renaming a manual page placeholder entry below, or after
// replacing a placeholder with a real screenshot (delete its entry first).
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const outDir = join(dirname(fileURLToPath(import.meta.url)), "..", "src", "assets", "screenshots");

// slug -> label shown inside the placeholder box; keep in sync with
// src/content/docs/reference/screenshots-todo.md and the manual pages that
// embed these images.
const placeholders = {
  "setup-wizard": "Setup wizard — Source Folders step (TODO)",
  "setup-wizard-confirm": "Setup wizard — Confirm summary before registration (TODO)",
  "data-sources": "Settings → Data Sources — source cards with lifecycle controls (TODO)",
  "inbox": "Inbox — queue with a mixed folder split into single-type items (TODO)",
  "inbox-needs-review": "Inbox — needs-review banner with Confirm disabled (TODO)",
  "inbox-reclassify": "Inbox — bulk reclassify on selected files (TODO)",
  "inbox-destination-root": "Inbox — destination-root choice between library roots (TODO)",
  "plan-review": "Plan review — move actions with source and destination paths (TODO)",
  "plan-review-catalogue": "Plan review — catalogue-in-place actions, destination equals source (TODO)",
  "sessions": "Sessions — list and detail (TODO)",
  "targets-planning": "Targets — list with tonight's planner columns (TODO)",
  "targets-add-search": "Targets — Add-target search phases (TODO)",
  "targets-why-guidance": "Targets — Why-this-guidance thresholds (TODO)",
  "projects-lifecycle": "Project detail — attached sessions and per-channel numbers (TODO)",
  "project-create": "Projects — creation wizard with tool profile (TODO)",
  "project-archive-plan": "Archive plan review — protected-item acknowledgement (TODO)",
  "archive-page": "Archive page — archived entries with removal actions (TODO)",
  "calibration-masters": "Calibration — master list with kind-conditional columns (TODO)",
  "calibration-matching": "Calibration — ranked candidates with confidence and mismatches (TODO)",
  "cleanup-scan-preview": "Cleanup — scan preview with protected items locked (TODO)",
  "cleanup-archive": "Cleanup plan review — acknowledgement before Approve & apply (TODO)",
  "settings": "Settings — Appearance pane (TODO)",
  "settings-equipment": "Settings — Equipment pane (TODO)",
  "settings-target-planner": "Settings — Target Planner sites and Moon-avoidance bands (TODO)",
  "settings-audit-log": "Settings — Audit Log with outcomes (TODO)",
  "remap-verify": "Remap dialog — verified path before Apply remap (TODO)",
  "updater": "Settings → Advanced — update available (TODO)",
};

const width = 1280;
const height = 800;

function svg(label) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="${label}">
  <rect width="${width}" height="${height}" fill="#d9dce1"/>
  <rect x="1" y="1" width="${width - 2}" height="${height - 2}" fill="none" stroke="#9aa0ab" stroke-width="2" stroke-dasharray="12 8"/>
  <text x="50%" y="50%" font-family="system-ui, sans-serif" font-size="28" fill="#4b5160" text-anchor="middle" dominant-baseline="middle">${label}</text>
</svg>
`;
}

for (const [slug, label] of Object.entries(placeholders)) {
  writeFileSync(join(outDir, `${slug}.svg`), svg(`Screenshot: ${label}`), "utf8");
}

console.log(`Wrote ${Object.keys(placeholders).length} placeholder SVGs to ${outDir}`);
