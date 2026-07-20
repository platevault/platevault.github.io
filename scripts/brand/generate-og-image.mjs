#!/usr/bin/env node
// Copyright (C) 2024-2026 Sjors Robroek
// SPDX-License-Identifier: AGPL-3.0-only
//
// Generates public/og-image.png (1200x630) — narrowband hero treatment, per
// BrandAssets.dc.html §05 "og-image" (values there are given "at 50%
// scale"; doubled here for the full 1200x630 raster).
//
// Run: node scripts/brand/generate-og-image.mjs

import { writeFileSync, mkdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { loadMainMark, markGroup } from './mark.mjs';
import { wordmarkPaths } from './wordmark.mjs';

const publicUrl = new URL('../../public/', import.meta.url);
const publicDir = fileURLToPath(publicUrl);

const W = 1200;
const H = 630;
const MARK_SIZE = 300; // 150px @ 50% scale
const GAP = 68; // 34px @ 50%
const PAD_X = 108; // 54px @ 50%
const WORDMARK_SIZE = 104; // 52px @ 50%
const TAGLINE_SIZE = 38; // 19px @ 50%
const TAGLINE_MARGIN_TOP = 28; // 14px @ 50%

// 11 star dots, §05 (positions verbatim, percentages scale automatically;
// dot radii doubled to match the 2x raster).
const STARS = [
  { x: '12%', y: '22%', r: 2, color: '#cfe3ea' },
  { x: '22%', y: '66%', r: 2, color: '#a9c6d2' },
  { x: '34%', y: '30%', r: 2.8, color: '#e3fbff' },
  { x: '46%', y: '78%', r: 2, color: '#b9a9d6' },
  { x: '58%', y: '20%', r: 2, color: '#cdd9e6' },
  { x: '68%', y: '58%', r: 3, color: '#dbf6fb' },
  { x: '78%', y: '34%', r: 2, color: '#b9c6d2' },
  { x: '88%', y: '72%', r: 2, color: '#cfe3ea' },
  { x: '93%', y: '24%', r: 2, color: '#cdd9e6' },
];

async function main() {
  const mark = loadMainMark();
  const wm = wordmarkPaths(WORDMARK_SIZE, -0.025);

  const markX = PAD_X;
  const markY = (H - MARK_SIZE) / 2;
  const contentX = markX + MARK_SIZE + GAP;

  // Stack wordmark + tagline, vertically centered as one block (flex
  // align-items:center in the spec markup). wm.ascender/descender are the
  // font's own metrics in px at WORDMARK_SIZE; the tagline's own ascent is
  // approximated at 0.8x its font-size (Inter's cap-ish height), close
  // enough for a baseline offset in a generated static asset.
  const taglineAscent = TAGLINE_SIZE * 0.8;
  const blockHeight = wm.height + TAGLINE_MARGIN_TOP + TAGLINE_SIZE * 1.2;
  const blockTop = (H - blockHeight) / 2;
  const wordmarkBaselineY = blockTop + wm.ascender;
  const taglineY = blockTop + wm.height + TAGLINE_MARGIN_TOP + taglineAscent;

  const stars = STARS.map(
    (s) => `<circle cx="${s.x}" cy="${s.y}" r="${s.r}" fill="${s.color}"/>`,
  ).join('\n');

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
<defs>
<radialGradient id="magenta" cx="85%" cy="-10%" r="90%" gradientUnits="userSpaceOnUse" gradientTransform="translate(1020 -63) scale(1.02 0.86) translate(-1020 63)">
<stop offset="0%" stop-color="rgba(210,120,200,0.18)"/>
<stop offset="55%" stop-color="rgba(210,120,200,0)"/>
</radialGradient>
<radialGradient id="cyan" cx="8%" cy="115%" r="80%" gradientUnits="userSpaceOnUse" gradientTransform="translate(96 724.5) scale(1.16 0.98) translate(-96 -724.5)">
<stop offset="0%" stop-color="rgba(90,200,215,0.15)"/>
<stop offset="55%" stop-color="rgba(90,200,215,0)"/>
</radialGradient>
</defs>
<rect width="${W}" height="${H}" fill="#12141b"/>
<rect width="${W}" height="${H}" fill="url(#magenta)"/>
<rect width="${W}" height="${H}" fill="url(#cyan)"/>
${stars}
<rect x="1" y="1" width="${W - 2}" height="${H - 2}" fill="none" stroke="rgba(120,200,215,0.12)" stroke-width="2"/>
${markGroup(mark, {
  size: MARK_SIZE,
  x: markX,
  y: markY,
  frameColor: '#eaf7fa',
  constelColor: '#66cedb',
  filter: 'drop-shadow(0 0 40px rgba(102,206,219,0.5))',
})}
<g transform="translate(${contentX} ${wordmarkBaselineY})" style="filter:drop-shadow(0 0 68px rgba(102,206,219,0.35))">
<path d="${wm.plateD}" fill="#f2fbfc"/>
<path d="${wm.vaultD}" fill="#66cedb"/>
</g>
<text x="${contentX}" y="${taglineY}" font-family="Inter, system-ui, sans-serif" font-size="${TAGLINE_SIZE}" fill="#a9cdd4">Every frame accounted for.</text>
</svg>`;

  mkdirSync(publicDir, { recursive: true });
  const buf = await sharp(Buffer.from(svg)).png().toBuffer();
  writeFileSync(new URL('og-image.png', publicUrl), buf);
  // eslint-disable-next-line no-console
  console.log(`og-image.png  sha256:${createHash('sha256').update(buf).digest('hex')}`);
}

await main();
