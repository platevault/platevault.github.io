---
title: Ingest your first session
description: Get a folder of raw frames into PlateVault's library, reviewed and applied.
---

This guide takes a folder of raw frames from an inbox drop folder to a
finished row in Sessions. You need a completed
[setup](../../manual/setup-wizard/) with at least one inbox folder and one
light-frames folder registered.

## 1. Drop the files and rescan

Copy or save your night's files into the registered inbox folder (capture
software can write there directly), open **Inbox**, and click **Rescan**.

The new folder appears as one or more queue items. If it mixes frame types
— lights and darks together, say — it splits into single-type items
(`light · Ha · 300s`, `dark · 300s`, …), each grouped back to the shared
source folder.

![The Inbox queue after a rescan: a mixed folder split into single-type items](../../../assets/screenshots/inbox.svg)

## 2. Check the per-file detail

Select an item and check the per-file metadata — frame type, filter,
exposure, binning, gain, temperature, target, date. The
[Inbox manual](../../manual/inbox/#per-file-detail) explains how real,
missing, and not-applicable values are told apart.

## 3. Resolve anything flagged "needs review"

If an item is missing a mandatory attribute — typically the filter for
lights — a banner names exactly what is missing and **Confirm** stays
disabled. Select the affected files, set the missing value once, and the
whole selection is updated in one action. The item re-partitions and
Confirm re-enables automatically. Your override only changes PlateVault's
index; the files' bytes are untouched.

![A needs-review item: the banner names the missing attribute and Confirm is disabled](../../../assets/screenshots/inbox-needs-review.svg)

## 4. Pick a destination (if asked)

With one valid light-frames root, it is used automatically. With several,
choose one from the item's destination-root control, or leave it on
**Auto** and resolve the choice during plan review.

## 5. Confirm

Click **Confirm**. This creates a reviewable plan — no file has moved. The
item stays in the queue with a badge showing its open plan.

## 6. Review the plan

Click **Review plans (N)**. Every plan item shows its full source and
destination path — the destination resolved from the per-frame-type folder
pattern, for example `{target}/{filter}/{date}/light/`. Escape or Discard
closes without touching anything.

![The plan review: every planned move with its full source and destination path](../../../assets/screenshots/plan-review.svg)

## 7. Apply

Click **Apply**. The files move to their destinations and a toast reports
the applied count (and any failures). A plan whose source file changed
since confirm is refused as stale; a destination collision is refused
rather than overwritten.

## 8. See the session

Open **Sessions**. The session row(s) for your new data are already there —
no review step, frame counts matching what the plan moved. The apply is
also recorded in **Settings → Audit Log**.

Every later night of data repeats this loop. Details on every control:
[Inbox](../../manual/inbox/) and [Sessions](../../manual/sessions/).
