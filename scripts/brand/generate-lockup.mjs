#!/usr/bin/env node
// Copyright (C) 2024-2026 Sjors Robroek
// SPDX-License-Identifier: AGPL-3.0-only
//
// Generates the "PlateVault" lockup deliverables (horizontal + stacked, for
// dark and light surfaces) per BrandAssets.dc.html §02 "Lockup" — mark +
// outlined wordmark, "Vault" tinted, transparent background (portable to
// any surface; pick the dark- or light-surface color set to match).
//
// Run: node scripts/brand/generate-lockup.mjs

import { writeFileSync } from 'node:fs';
import { loadMainMark, markGroup } from './mark.mjs';
import { wordmarkPaths } from './wordmark.mjs';

const brandUrl = new URL('../../src/assets/brand/', import.meta.url);

const PALETTES = {
  dark: { frame: '#f0ebe2', constel: '#d98a3d', plate: '#f0ebe2', vault: '#e8a86a' },
  light: { frame: '#20211f', constel: '#3f6b7a', plate: '#20211f', vault: '#2c5160' },
};

function wordmarkGroup(wm, palette, { x, y }) {
  return `<g transform="translate(${x} ${y})">
<path d="${wm.plateD}" fill="${palette.plate}"/>
<path d="${wm.vaultD}" fill="${palette.vault}"/>
</g>`;
}

function horizontalLockup(mark, palette) {
  const markSize = 66;
  const gap = 20;
  const wordmarkFontSize = 38;
  const wm = wordmarkPaths(wordmarkFontSize);
  // Clear space (§02): the plate's corner radius, scaled to markSize (the
  // frame's arc radius is 5 of the mark's 64-unit viewBox).
  const clearSpace = (5 / 64) * markSize;

  const width = clearSpace * 2 + markSize + gap + wm.width;
  const height = clearSpace * 2 + Math.max(markSize, wm.height);
  const markY = clearSpace + (height - clearSpace * 2 - markSize) / 2;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
${markGroup(mark, { size: markSize, x: clearSpace, y: markY, frameColor: palette.frame, constelColor: palette.constel })}
${wordmarkGroup(wm, palette, { x: clearSpace + markSize + gap, y: clearSpace + (height - clearSpace * 2) / 2 + wm.ascender / 2 })}
</svg>`;
  return svg;
}

function stackedLockup(mark, palette) {
  const markSize = 82;
  const gap = 14;
  const wordmarkFontSize = 30;
  const wm = wordmarkPaths(wordmarkFontSize);
  const clearSpace = (5 / 64) * markSize;

  const width = clearSpace * 2 + Math.max(markSize, wm.width);
  const contentHeight = markSize + gap + wm.height;
  const height = clearSpace * 2 + contentHeight;
  const markX = clearSpace + (width - clearSpace * 2 - markSize) / 2;
  const wordmarkX = clearSpace + (width - clearSpace * 2 - wm.width) / 2;
  const wordmarkBaselineY = clearSpace + markSize + gap + wm.ascender;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
${markGroup(mark, { size: markSize, x: markX, y: clearSpace, frameColor: palette.frame, constelColor: palette.constel })}
${wordmarkGroup(wm, palette, { x: wordmarkX, y: wordmarkBaselineY })}
</svg>`;
  return svg;
}

const mark = loadMainMark();
for (const [name, palette] of Object.entries(PALETTES)) {
  writeFileSync(new URL(`lockup-horizontal-${name}.svg`, brandUrl), horizontalLockup(mark, palette));
  writeFileSync(new URL(`lockup-stacked-${name}.svg`, brandUrl), stackedLockup(mark, palette));
}
// eslint-disable-next-line no-console
console.log('lockup-{horizontal,stacked}-{dark,light}.svg written');
