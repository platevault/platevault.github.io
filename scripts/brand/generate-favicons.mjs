#!/usr/bin/env node
// Copyright (C) 2024-2026 Sjors Robroek
// SPDX-License-Identifier: AGPL-3.0-only
//
// Generates public/favicon.svg (full mark, any size >=32) and
// public/favicon-16.svg (favicon-reduction mark, 16px only) from the
// canonical pv-mark sources — handoff/assets/README.md: "32px and up keep
// the full constellation so favicon reads as the same mark as the app
// icon", "ONLY the 16px favicon simplifies". Single silhouette tone,
// adaptive to the OS tab theme (prefers-color-scheme), matching the
// pre-existing favicon.svg's own convention.
//
// Run: node scripts/brand/generate-favicons.mjs

import { writeFileSync } from 'node:fs';
import { loadMainMark, loadMinMark, recolor } from './mark.mjs';

const publicUrl = new URL('../../public/', import.meta.url);

function faviconSvg(mark, viewBoxSize = 64) {
  const frame = recolor(mark.frame, 'currentColor');
  const constellation = recolor(mark.constellation, 'currentColor');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${viewBoxSize} ${viewBoxSize}" role="img" aria-label="PlateVault"><g transform="rotate(-9 32 32)">${frame}${constellation}</g><style>g{color:#000}@media (prefers-color-scheme:dark){g{color:#fff}}</style></svg>`;
}

writeFileSync(new URL('favicon.svg', publicUrl), faviconSvg(loadMainMark()));
writeFileSync(new URL('favicon-16.svg', publicUrl), faviconSvg(loadMinMark()));
// eslint-disable-next-line no-console
console.log('favicon.svg, favicon-16.svg written');
