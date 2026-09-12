# Comparable visual verification

Use when the task requires visual comparison. Honor the user's observation and acceptance boundaries; a missing browser does not justify claiming a pass. Complete independent implementation and checks first. Return to [the skill](../SKILL.md).

## Perform evidence-based visual QA

### Normalize the comparison

- Convert reference pixels to CSS pixels when needed: `CSS size = image pixel size / capture DPR`.
- Compare the same CSS viewport, DPR, theme, content, animation-settled state, data state, and interaction state.
- Separate reference defects from target behavior. A broken screenshot may demonstrate a collision without being a pixel-match target.
- Capture before and after evidence with the same crop and state whenever a baseline exists.

### Build a risk-based matrix

Choose comparisons that expose risks introduced by this change. Layout changes need the requested viewport and relevant width/breakpoint edges; input changes need the affected interactions; shader or compositing changes need comparable DPR, theme, and timing. Add lifecycle, reduced-motion, and fallback cases when affected. Do not repeat unaffected matrices after every edit.

Verify:

- no overlap, clipping, horizontal overflow, unintended layout shift, or inaccessible control;
- intended container fill, stacking, and responsive composition;
- source-relative geometry, brightness, glow, color, perspective, and motion timing;
- correct first load, resize, remount, route change, theme change, and repeated animation cycles;
- assets load from expected paths and no stale playground or cross-page dependency remains;
- browser console has no relevant errors or warnings;
- performance safeguards and fallbacks actually activate.

Do not report `passed` when an applicable case was not exercised. Mark it `not tested` with the reason, or report the blocker.

### Leave a compact QA record

```text
Surface and scope:
Source reference and version:
Baseline state:
Viewports / DPR / theme / motion state:
Before evidence:
After evidence:
Rendering-contract findings:
Intentional deviations:
Responsive and interaction results:
Console / network result:
Known limitations or untested cases:
Final result: passed | failed | not tested | blocked | waiting for owner acceptance
```
