---
title: Prepare inputs for PixInsight/WBPP
description: Get a project's light frames, calibration, and processing tool ready — without PlateVault touching the actual processing.
---

PlateVault's job ends where PixInsight's begins. Preparation means:
sessions attached to the project, masters matched, the tool launched
against the project folder, and outputs recorded when WBPP is done.

## 1. Point PlateVault at the executable

In **Settings → Processing Tools** (or in the setup wizard's Processing
Tools step), configure the PixInsight/WBPP profile with the path to its
executable. Tools are selectable profiles — Siril and planetary/lunar
profiles configure the same way.

## 2. Ingest the data

- Light frames: through the [Inbox](../../manual/inbox/) —
  [Ingest your first session](../ingest-first-session/) if this is new.
- Calibration masters: build them in your processing tool as usual, then
  ingest them through the same Inbox pipeline; each master registers as an
  individually tracked item. See
  [Calibration & masters](../../manual/calibration-masters/).

## 3. Create the project and attach sessions

Create a project with the PixInsight/WBPP profile
([Projects & lifecycle](../../manual/projects-lifecycle/)). Its folder
structure (`lights/`, `darks/`, `flats/`, …) is created inside your
registered project-outputs root. Attach the confirmed sessions the project
should use; the detail view's per-channel breakdown shows exactly what WBPP
will get — sub-frame counts and integration time per filter.

## 4. Match calibration masters

For each attached session, review the ranked candidate masters on the
Calibration page or from the project, and assign explicitly. Candidates
show context with confidence values and mismatch indicators.

![Ranked candidate masters for a session, each with context, a confidence value, and mismatch indicators](../../../assets/screenshots/calibration-matching.svg)

Details:
[Matching masters to sessions](../../manual/calibration-masters/#matching-masters-to-sessions).

## 5. Launch

Choose **Open in PixInsight** from the project. The tool launches against
the project's working directory — the project's lifecycle state does not
change, and a working directory outside every registered root refuses to
launch.

From here, everything is PixInsight: run WBPP over the prepared inputs as
you normally would.

## 6. Let PlateVault record what came out

While the project is open, files WBPP writes into the project's output
folder are recorded automatically as artifacts, each with a kind
(intermediate / master / final) and a confidence level. Outputs written
while the project was closed are picked up on the next open. PlateVault only
observes
([Artifact observation](../../manual/projects-lifecycle/#artifact-observation)).

Those recorded intermediates are what the
[cleanup flow](../plan-a-cleanup/) later offers to reclaim, once your
masters and finals have superseded them.
