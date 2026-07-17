---
title: Recover after moving a drive
description: Point a registered source at its new path after a drive was moved, relettered, or remounted.
---

A drive got a new letter, an external disk moved to another port, a mount
point changed — and a registered source now points at a path that no
longer exists. Nothing is lost: PlateVault models library roots separately
from the relative paths beneath them, so the fix is a **Remap** — updating
the root's own path record. No file moves, and no history is rewritten.

## 1. Open the source's Remap dialog

Go to **Settings → Data Sources**, find the affected source's card, and
click **Remap**.

## 2. Enter the new path

Paste or type the folder's new location — the same folder contents, at
their new address.

## 3. Verify

Click **Verify**. PlateVault samples files at the new path and checks them
against what it knows about the source, reporting the match count. Verify
performs no file movement — it only reads.

- Verify never reports success for an empty or nonexistent path.
- **Apply remap** is not clickable until a Verify succeeds.
- Editing the path after a successful Verify invalidates it — Apply remap
  disables again until a fresh Verify runs against the edited path.

## 4. Apply the remap

Click **Apply remap**. PlateVault persists the new path in its own record
(the backend re-verifies the path server-side before accepting it) and
writes a durable audit row recording the old→new path. Sessions, projects,
and calibration relationships under the root are intact — they were always
stored relative to the root, never as absolute paths.

At no point in this flow does any file on disk move, whatever the outcome.

## If the drive is gone for good

For a source that will never come back, use **Disable** (keeps its history
while dropping it from scans) or — once it is offline and has no dependent
sessions or projects — **Delete** to un-register it. Both are described in
[Managing data sources](../../manual/setup-wizard/#managing-data-sources-afterward).
