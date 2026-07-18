---
title: Screenshots TODO
description: Capture checklist for every placeholder screenshot in the docs.
---

Every screenshot in the landing, manual, and how-to pages is currently a generated
grey placeholder SVG. This page is the capture spec: each entry says where
the shot is embedded, where in the app to take it, what state to stage
first, and what the frame must show.

Capture rules:

- Default light theme unless the entry says otherwise; 1280×800 or larger,
  cropped to the relevant panel rather than the full desktop.
- File name = the slug below, saved over the placeholder in
  `src/assets/screenshots/` (as `.png`; update the page embeds' extension).
- After replacing a placeholder, delete its entry from
  `scripts/generate-placeholders.mjs` and re-run
  `node scripts/generate-placeholders.mjs` so the two lists stay in sync.
- Shared staging baseline: a scratch library with one inbox root, two
  light-frame roots, one calibration root, one project-outputs root; a
  mixed inbox folder (Ha lights + matching darks) plus one folder of
  master darks/flats; one project with two attached sessions.

## Landing page

The landing hero is an inline SVG "plate" motif in `index.mdx` (a deliberate
decorative panel, not a screenshot), so it has no capture entry here. The
chapter images below are still placeholders to be replaced.

## Setup wizard & library roots

- [ ] **setup-wizard** — `manual/setup-wizard.md` (top).
      Where: first-run wizard (`/setup`), step 1 Source Folders.
      Stage: fresh profile (or Settings → Advanced → Restart first-run
      setup); one folder added under Light frames and one under Inbox,
      Calibration and Project outputs still empty so the required/optional
      grouping and the blocked Continue are both visible; one light root's
      Organized/Unorganized control visible.
      Must show: the four categories, per-root organization choice,
      Continue blocked while a required category is empty.
- [ ] **setup-wizard-confirm** — `manual/setup-wizard.md` § 5. Confirm.
      Where: wizard step 5.
      Stage: all four categories filled (baseline roots), PixInsight
      profile chosen in step 2.
      Must show: full summary — every folder with category and
      organization state, the processing tool, and the "what happens next"
      note, before anything registers.
- [ ] **data-sources** — `manual/setup-wizard.md` § Managing data sources
      afterward.
      Where: Settings → Data Sources (`/settings/sources`).
      Stage: baseline roots registered; one source disabled and one
      offline (unplug/rename its folder) so state variety is visible.
      Must show: several source cards with Rescan, Remap, Disable/Enable,
      Delete, protection override, and reveal controls; the offline and
      disabled states distinguishable.

## Inbox

- [ ] **inbox** — `manual/inbox.md` (top) and
      `how-to/ingest-first-session.md` step 1.
      Where: Inbox (`/inbox`) after Rescan.
      Stage: drop one folder mixing Ha lights (300s) and darks (300s) into
      the inbox root, rescan.
      Must show: the mixed folder split into single-type queue items
      (`light · Ha · 300s`, `dark · 300s`) visibly grouped to the shared
      source folder; one item selected with the per-file detail panel open
      showing source pills.
- [ ] **inbox-needs-review** — `manual/inbox.md` § Resolving missing
      metadata and `how-to/ingest-first-session.md` step 3.
      Where: Inbox, an item selected.
      Stage: ingest lights whose FITS headers carry no FILTER keyword
      (strip it from copies of the fixtures).
      Must show: the needs-review banner naming the missing attribute
      (filter), "needs filter" badges on affected rows, Confirm disabled.
- [ ] **inbox-reclassify** — `manual/inbox.md` § Resolving missing
      metadata.
      Where: Inbox detail, files selected.
      Stage: same needs-review item; select all affected files and open
      the bulk set-value control with Filter about to be applied.
      Must show: multi-row selection, the value picker open, the single
      bulk action that resolves the gate.
- [ ] **inbox-destination-root** — `manual/inbox.md` § Choosing a
      destination.
      Where: Inbox item detail.
      Stage: two registered light-frame roots so the picker exists; a
      clean classified lights item selected.
      Must show: the destination-root control expanded, listing both roots
      plus Auto (Auto selected).
- [ ] **plan-review** — `manual/inbox.md` § Confirm, review, apply and
      `how-to/ingest-first-session.md` step 6.
      Where: Inbox → Confirm an item → Review plans (N) overlay.
      Stage: confirmed lights item; do not apply.
      Must show: the plan review overlay with per-item action and full
      source → destination paths (destination resolved from the
      `{target}/{filter}/{date}/light/` pattern), Apply and Discard
      controls.
- [ ] **plan-review-catalogue** — `how-to/organize-existing-library.md`
      step 4.
      Where: same Review plans overlay.
      Stage: register a pre-organized folder as an **organized** root,
      rescan it from its Data Sources card, classify and Confirm.
      Must show: every action reading "catalogue in place" with
      destination equal to source, and no Archive-vs-Trash control.

## Sessions

- [ ] **sessions** — `manual/sessions.md` (top).
      Where: Sessions (`/sessions`).
      Stage: at least three applied sessions across two filters/nights;
      one row selected.
      Must show: the list with filter/camera dropdowns and group-by, plus
      the open detail panel with integration time, source badges, and the
      reveal/project actions.

## Targets & planning

- [ ] **targets-planning** — `manual/targets-planning.md` (top).
      Where: Targets (`/targets`).
      Stage: observing site configured in Settings → Target Planner; five
      or so added targets (mix of visible and not-visible tonight).
      Must show: planner columns with real values — Max altitude,
      tonight's altitude sparkline, Visible tonight, Lunar separation,
      recommended Filters, Image time.
- [ ] **targets-add-search** — `manual/targets-planning.md` § Adding a
      target.
      Where: Targets → Add target.
      Stage: type a prefix ("M3") that yields several local seed
      suggestions.
      Must show: the suggestion list from the local seed, with the
      wider-search affordance ("Search more catalogues") visible.
- [ ] **targets-why-guidance** — `manual/targets-planning.md` § Tonight's
      astronomy.
      Where: Targets row or detail → Why this guidance.
      Stage: site configured; target with a filter recommendation.
      Must show: the open panel naming the per-filter altitude /
      Moon-separation thresholds behind the recommendation.

## Projects & lifecycle

- [ ] **project-create** — `manual/projects-lifecycle.md` § Creating a
      project.
      Where: Projects → New project (`/projects/new`).
      Stage: name typed, PixInsight/WBPP profile selected, not yet
      submitted.
      Must show: name field and the processing-tool profile choice.
- [ ] **projects-lifecycle** — `manual/projects-lifecycle.md` (top).
      Where: a project's detail (`/projects/$id`).
      Stage: project with two attached sessions in different filters so
      the per-channel table has two rows; at least one manifest entry.
      Must show: attached sessions, per-channel sub-frame counts and
      integration time (h m), and the manifest list.
- [ ] **project-archive-plan** — `manual/projects-lifecycle.md`
      § Archiving a finished project.
      Where: completed project → Archive → plan review.
      Stage: project marked completed, at least one attached item from a
      **protected** source; open the archive plan review, acknowledge
      nothing yet.
      Must show: plan items with source and destination (app-managed
      archive folder), the protected item called out with its reason and
      an unchecked acknowledgement, approval still blocked.
- [ ] **archive-page** — `manual/projects-lifecycle.md` § The Archive
      page.
      Where: Archive (`/archive`).
      Stage: at least two archived entries; one row selected.
      Must show: rows with type, reason, size, archived date; the selected
      entry's detail with audit history; the Send to trash and Delete
      permanently actions.

## Calibration & masters

- [ ] **calibration-masters** — `manual/calibration-masters.md` § The
      Calibration page.
      Where: Calibration (`/calibration`).
      Stage: ingest master darks, flats, and a bias so kind-conditional
      columns and the kind filter appear; leave one master with a missing
      metadata value.
      Must show: one row per master; a not-applicable marker (bias
      exposure) and an unresolved chip visible in the fingerprint columns.
- [ ] **calibration-matching** — `manual/calibration-masters.md`
      § Matching masters to sessions and
      `how-to/prepare-for-pixinsight.md` step 4.
      Where: matching view for an unassigned master.
      Stage: one master dark; two candidate sessions — one clean match,
      one failing a hard rule (different gain).
      Must show: ranked candidates with context (target, filter, night,
      frame count), confidence values, and the mismatch flagged on the
      failing candidate, before any assignment.

## Cleanup & archive plans

- [ ] **cleanup-scan-preview** — `manual/cleanup-archive.md` § Scanning
      project outputs and `how-to/plan-a-cleanup.md` step 1.
      Where: project → Outputs/Cleanup → Scan for cleanup candidates.
      Stage: project whose output folder holds recorded intermediates plus
      masters/finals; at least one candidate from a protected source.
      Must show: candidates grouped Intermediates / Masters / Finals with
      size and confidence, the protected item locked with no selection
      affordance, and the reclaimable total.
- [ ] **cleanup-archive** — `manual/cleanup-archive.md` § Review and
      apply and `how-to/plan-a-cleanup.md` step 3.
      Where: Generate cleanup plan → review overlay.
      Stage: same candidates, Archive folder destination; protected item
      not yet acknowledged.
      Must show: every plan item listed, the read-only destination, the
      pending per-item acknowledgement, Approve & apply disabled.

## Settings

- [ ] **settings** — `manual/settings.md` § Appearance.
      Where: Settings → Appearance (`/settings/general`).
      Must show: the four named themes plus System, density, and font-size
      controls; the grouped Settings sub-nav visible at the left.
- [ ] **settings-equipment** — `manual/settings.md` § Equipment.
      Where: Settings → Equipment (`/settings/equipment`).
      Stage: one auto-detected camera (from ingested FITS) and one
      manually added telescope with aliases; an optical train built from
      them; the seeded filter list.
      Must show: all four groups with the Manual vs Auto-detected source
      badges distinguishable.
- [ ] **settings-target-planner** — `manual/settings.md` § Target
      Planner.
      Where: Settings → Target Planner (`/settings/planner`).
      Stage: two observing sites so the Active and Default pills sit on
      different rows.
      Must show: the site list with pills, the usable-altitude threshold,
      and the seven-band Moon-avoidance table with Restore Defaults.
- [ ] **settings-audit-log** — `manual/settings.md` § Audit Log.
      Where: Settings → Audit Log (`/settings/audit`).
      Stage: history containing an applied plan, a refused action (e.g. a
      rejected confirm), and a settings change so a before→after pair
      exists.
      Must show: rows with timestamp, event, entity, outcome
      (applied / refused / failed), actor, and one before→after detail.
- [ ] **remap-verify** — `how-to/recover-after-moving-a-drive.md` step 3.
      Where: Settings → Data Sources → a source's Remap dialog.
      Stage: rename/move the source folder on disk, enter the new path,
      click Verify and let it succeed.
      Must show: the new path, the successful Verify result with match
      count, and Apply remap enabled.
- [ ] **updater** — `manual/updater.md` (top).
      Where: Settings → Advanced → Software Update
      (`/settings/advanced`).
      Stage: run a build older than the latest GitHub release so the
      startup check reports an update.
      Must show: current version, "Update available: version {v}", and
      the Install & Restart action.
