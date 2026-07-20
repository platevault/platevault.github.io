// Copyright (C) 2024-2026 Sjors Robroek
// SPDX-License-Identifier: AGPL-3.0-only
//
// Shared pv-mark SVG splitter (handoff 07). src/assets/brand/*.svg are
// copied verbatim from the design handoff and never hand-edited; every
// generator (favicon, og-image, hero, lockup) recolors frame vs.
// constellation independently, so they're split here once.

import { readFileSync } from 'node:fs';

const brandDir = new URL('../../src/assets/brand/', import.meta.url);

/**
 * pv-mark.svg / pv-mark-favicon.svg both follow the fixed shape emitted by
 * the design tool: a single `<g transform="rotate(-9 32 32)">` wrapping the
 * frame `<path>`, then the constellation `<path>` + `<g fill=...>` star/dot
 * cluster.
 */
export function splitMark(svgSource) {
  const inner = svgSource.match(/<g transform="rotate\(-9 32 32\)">([\s\S]*)<\/g>\s*<\/svg>/);
  if (!inner) throw new Error('unrecognized mark SVG structure');
  const body = inner[1];
  const dotsGroupIndex = body.indexOf('<g fill="currentColor">');
  if (dotsGroupIndex === -1) throw new Error('unexpected mark SVG structure: no dots group');
  const directChildren = body.slice(0, dotsGroupIndex);
  const dotsGroup = body.slice(dotsGroupIndex);
  const paths = [...directChildren.matchAll(/<path[^>]*><\/path>/g)].map((m) => m[0]);
  if (paths.length !== 2) throw new Error('unexpected mark SVG child count');
  const [framePath, constelLinePath] = paths;
  return {
    frame: framePath,
    constellation: constelLinePath + dotsGroup,
  };
}

export function recolor(svgFragment, color) {
  return svgFragment.replace(/currentColor/g, color);
}

export function loadMainMark() {
  return splitMark(readFileSync(new URL('pv-mark.svg', brandDir), 'utf8'));
}

export function loadMinMark() {
  return splitMark(readFileSync(new URL('pv-mark-favicon.svg', brandDir), 'utf8'));
}

/**
 * Renders a mark `<g>` fragment sized `size`px (source viewBox is 0 0 64
 * 64), optionally offset, with the given frame/constellation colors and an
 * optional CSS `filter` (e.g. drop-shadow glow).
 */
export function markGroup(mark, { size, x = 0, y = 0, frameColor, constelColor, filter }) {
  const s = size / 64;
  const filterAttr = filter ? ` filter="${filter}"` : '';
  return `<g transform="translate(${x} ${y}) scale(${s})"${filterAttr}>
${recolor(mark.frame, frameColor)}
${recolor(mark.constellation, constelColor)}
</g>`;
}
