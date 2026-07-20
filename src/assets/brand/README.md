# Brand assets

Source SVGs (copied verbatim from the design handoff — never hand-edit;
regenerate the derived files below via the `scripts/brand/` scripts instead):

- `pv-mark.svg` — master mark, single-color (`currentColor`). 32px and up.
- `pv-mark-favicon.svg` — 16px reduction (bold frame + 3-star asterism). Use
  ONLY at 16px, so the favicon still reads as the same mark as the app icon.
- `pv-mark-two-tone.svg` — color variant: frame = `currentColor`,
  constellation = `--pv-acc` (theme accent).

Generated lockups (`scripts/brand/generate-lockup.mjs`), transparent
background, "PlateVault" in Space Grotesk 700 (−0.02em) as outlined paths,
"Vault" tinted with the accent:

- `lockup-horizontal-dark.svg` / `lockup-horizontal-light.svg`
- `lockup-stacked-dark.svg` / `lockup-stacked-light.svg`

Pick the `-dark` set on dark surfaces, `-light` on light surfaces.

## Rules (BrandAssets.dc.html §02)

- **Clear space** = the plate's corner radius, on all sides. Baked into the
  generated lockup SVGs' own padding — don't crop it out.
- **Minimum lockup height** 20px; **mark-alone floor** 16px (below that, the
  mark alone becomes illegible — don't use it smaller).
- **Wordmark** is always outlined paths, never live text — it must render
  identically with no font dependency at the point of use.

## Regenerating

From the repo root: `node scripts/brand/generate-lockup.mjs`,
`node scripts/brand/generate-favicons.mjs`,
`node scripts/brand/generate-og-image.mjs`.
