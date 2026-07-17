---
title: Plan a cleanup safely
description: Reclaim disk space from finished project outputs or superseded raw frames without risking a protected file.
---

Two cleanup flows reclaim disk space: one for a project's processing
outputs (intermediates superseded by masters and finals), one for a
session's raw sub-frames. Both follow the same shape — scan, choose a
destination, review, apply, re-scan to confirm — and neither can touch a
protected file without an explicit, audited acknowledgement.

## What "protected" means

Every data source carries a protection level. The default comes from the
[setup wizard's Configuration step](../../manual/setup-wizard/#3-configuration)
— **protected**, unless you changed it — and can be overridden per source
in **Settings → Data Sources**. Protected files appear in cleanup scans as
locked entries you cannot select, and any plan that includes one requires a
per-item acknowledgement before it can be approved. Cleanup never deletes
permanently — the destinations are the Archive folder or the OS trash, both
recoverable.

## Cleaning a project's outputs

1. Open the project's **Outputs/Cleanup** section and click **Scan for
   cleanup candidates**. The read-only preview groups candidates by kind
   (Intermediates / Masters / Finals) with per-item size and confidence,
   shows protected items locked, and totals the reclaimable size. Nothing
   on disk changes from scanning.
2. Pick the destination: **Archive folder** (default) or **System trash**.
   The choice is fixed once the plan is generated.
3. Click **Generate cleanup plan**. The review overlay lists every item
   1:1 with the candidates; acknowledge any protected item individually
   before **Approve & apply** enables. **Discard** backs out with disk
   untouched.
4. Click **Approve & apply**. Live progress shows "Applying N of M…", and
   each item's outcome (succeeded / failed with reason) is visible
   afterward.
5. Re-run the scan: the applied items are gone from the candidate list,
   and the files are present at the destination you chose.

## Cleaning a session's raw sub-frames

1. Open the session's detail in [Sessions](../../manual/sessions/) and run
   the raw sub-frame cleanup scan. Individual light/dark/flat/bias frames
   are listed with type, size, and protection state; non-protected frames
   are preselected, protected frames offer no selection control.
2. Adjust the selection — the reclaimable total tracks it. **Generate
   cleanup plan** stays disabled while nothing is selected.
3. Choose Archive or System trash and generate. From here it is the same
   review/apply flow as above.

## After the apply

Every applied item — and every refusal — has a row in **Settings → Audit
Log**, so a cleanup run is fully reconstructable later. For archiving a
*whole finished project* rather than trimming files, see
[Projects & lifecycle](../../manual/projects-lifecycle/#archiving-a-finished-project).
