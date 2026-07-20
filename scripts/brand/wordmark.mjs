// Copyright (C) 2024-2026 Sjors Robroek
// SPDX-License-Identifier: AGPL-3.0-only
//
// Shared "PlateVault" wordmark outliner (handoff 07). Space Grotesk 700,
// -0.02em, delivered as outlined paths per BrandAssets.dc.html Lockup (§02)
// — never live text, so the lockup/og-image/hero SVGs render identically
// with no font dependency at the point of use.
//
// Space Grotesk on Google Fonts ships only as a variable font (wght
// 300-700, default 300); `@fontsource/space-grotesk`'s static 700 WOFF1 is
// the actual Bold instance.
//
// fontkit, not opentype.js: opentype.js 2.x produced `NaN` control points
// mid-glyph for this exact font+string (reproducible — outlining "Vault"
// after any prior glyph lookup on the same process corrupts a later glyph's
// curve data), silently truncating the rendered word. fontkit (the
// pdfkit/foliojs shaping engine) outlines the same file correctly.
import { fileURLToPath } from 'node:url';
// fontkit's CJS export shape isn't reliably synthesized as a default export
// under Node's ESM loader — grab the namespace and unwrap.
import * as fontkitNs from 'fontkit';
const fontkit = fontkitNs.default ?? fontkitNs;

let cachedFont;

function loadBoldFont() {
  if (cachedFont) return cachedFont;
  const woffUrl = import.meta.resolve(
    '@fontsource/space-grotesk/files/space-grotesk-latin-700-normal.woff',
  );
  cachedFont = fontkit.openSync(fileURLToPath(woffUrl));
  return cachedFont;
}

const PLATE_GLYPH_COUNT = 'Plate'.length;

/**
 * Outlines "Plate" and "Vault" as two path `d` strings sharing one
 * continuous shaped run (so kerning across the "e"/"V" boundary matches a
 * single "PlateVault" render), at the given `fontSize` (px). SVG Y-down:
 * baseline at y=0, glyphs extend upward as negative y.
 *
 * `letterSpacingEm` defaults to -0.02 (Lockup §02 / splash); the og-image
 * (§05) and docs hero (§06) use -0.025.
 */
export function wordmarkPaths(fontSize, letterSpacingEm = -0.02) {
  const font = loadBoldFont();
  const scale = fontSize / font.unitsPerEm;
  const run = font.layout('PlateVault');

  let x = 0;
  let plateD = '';
  let vaultD = '';
  for (let i = 0; i < run.glyphs.length; i++) {
    const glyph = run.glyphs[i];
    const path = glyph.path.scale(scale, -scale).translate(x, 0);
    if (i < PLATE_GLYPH_COUNT) {
      plateD += path.toSVG();
    } else {
      vaultD += path.toSVG();
    }
    x += run.positions[i].xAdvance * scale + letterSpacingEm * fontSize;
  }
  // letterSpacing was added after the *last* glyph too — that's the width of
  // the shaped run for advance purposes but not the visual ink extent.
  const width = x - letterSpacingEm * fontSize;

  const ascender = (font.ascent / font.unitsPerEm) * fontSize;
  const descender = (font.descent / font.unitsPerEm) * fontSize;

  return {
    plateD,
    vaultD,
    width,
    ascender,
    descender,
    height: ascender - descender,
  };
}
