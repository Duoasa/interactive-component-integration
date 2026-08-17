---
name: interactive-component-integration
description: Integrate, adapt, reimplement, debug, or verify third-party and externally sourced interactive frontend components while preserving the official rendering contract, isolating the integration surface, and completing evidence-based visual QA. Use when a task involves canvas, WebGL, shaders, post-processing, animated backgrounds, scroll-driven visuals, pointer interactions, sensor-, webcam-, or other input-reactive effects, creative-coding snippets, component-gallery exports, or third-party animation components. Do not use for general frontend work, ordinary page isolation, or visual QA unrelated to interactive-component integration.
---

# Interactive Component Integration

Treat source parity, containment, and verification as one interactive-component integration workflow. Reproduce the official visual mechanism before tuning it, keep the component experiment from leaking into accepted pages, and make completion claims from comparable evidence.

## Establish the contracts

1. Read repository instructions and the files that own the requested surface before editing. Treat repository rules as the instance layer and this skill as the reusable layer; follow stricter local constraints.
2. Identify the smallest user-requested surface, its entry point, its page or component owner, its assets, and its deployment boundary.
3. Locate the authoritative component source, demo, version, and visible reference. Prefer maintained source code over screenshots or generated usage snippets.
4. Record the initial viewport, device-pixel ratio (DPR), theme, content state, interaction state, and animation timing. Capture a baseline when the current behavior is relevant.
5. Separate three kinds of values:
   - source values: defaults, uniforms, renderer flags, and effect parameters;
   - integration values: sizing, DPR caps, lifecycle hooks, fallback selectors, and cache versions;
   - intentional design values: user-approved local tuning.

Do not silently replace one category with another. Preserve intentional design values unless a verified pipeline defect makes them invalid.

## Reproduce the rendering contract

Inspect the source and write down the relevant contract before visual tuning:

| Layer | Verify |
| --- | --- |
| Public API | Default props, omitted values, units, ranges, and control semantics |
| Dependencies | Packages, versions, loaders, extensions, and runtime assumptions |
| Shader data | Shader stages, defines, uniforms, precision, textures, and update cadence |
| Renderer | Context attributes, antialiasing, alpha, premultiplied alpha, clear state, and camera |
| Color | Texture encoding, working color space, output conversion, exposure, and tone mapping |
| Effects | Post-processing passes, their order, resolution, blending, and framebuffer formats |
| Compositing | RGB and alpha output, transparency, blend mode, masks, overlays, and wrapper styles |
| Resolution | CSS size, drawing-buffer size, DPR policy, resize behavior, and aspect calculations |
| Time and input | Clock units, delta handling, pointer coordinates, scroll mapping, and event targets |
| Lifecycle | Initialization, teardown, visibility handling, context loss, and route or mount changes |
| Accessibility | Reduced motion, keyboard or touch behavior, and non-WebGL fallback |

Apply these rules:

- Treat omitted props as their declared defaults, never automatically as zero, false, or empty.
- Treat a demo's controls as configuration, not as the implementation or the complete set of defaults.
- Preserve the source color-management, tone-mapping, alpha, blending, and post-processing path before judging brightness, glow, contrast, or color.
- Preserve glow-bearing RGB data through intermediate buffers and final alpha compositing. Check transparent output over the actual page background.
- Match the source DPR policy during comparison. Document a lower production cap and re-check line weight, glow radius, sharpness, and aliasing.
- Inspect computed styles on every wrapper. Remove accidental `opacity`, `filter`, `mix-blend-mode`, masks, overlays, or pseudo-elements from the parity comparison.
- Do not emulate a renderer or shader mechanism with CSS filters unless the source uses that mechanism or the deviation is explicit and accepted.
- Do not tune shader parameters to compensate for a pipeline mismatch.

### Integrate in two passes

First reproduce the source in an isolated harness or the smallest existing test surface. Confirm the contract before adding page decoration, themes, overlays, or unrelated motion.

Then place it in the real page and re-check sizing, stacking, page compositing, theme interactions, and input mapping. Tune only after parity is credible. Keep tuning values close to the mount or configuration boundary so they remain reviewable.

Record every intentional deviation in this compact form:

```text
Source: <name, URL, version or retrieval date>
Parity baseline: <reference and state>
Deviation: <what differs>
Reason: <design, compatibility, accessibility, or performance>
Impact: <visible or behavioral consequence>
Verification: <how the result was checked>
```

## Bound performance and failure modes

- Cap fullscreen DPR deliberately; do not inherit an unbounded device DPR.
- Use one animation loop per visual system and cancel it during teardown.
- Pause or throttle when the document is hidden and, when appropriate, when the effect is outside the viewport.
- Re-test after adding bloom, blur, multisampling, extra buffers, or additional render passes.
- Handle resize without stretching, stale uniforms, excess allocations, or layout shifts.
- Provide an acceptable reduced-motion path and a stable fallback when required APIs, assets, or permissions are unavailable.
- Keep text, controls, and navigation usable if the effect fails.

## Isolate the integration surface

Apply this section when the interactive component is being integrated into an independent static page, frozen campaign page, case study, or similar snapshot-like surface. Do not force file duplication onto a componentized application that has a different explicit ownership model; preserve its architecture while enforcing equivalent boundaries around the integration.

1. Define one owner for the accepted page: its markup, page-level styles, behavior, and project-specific assets.
2. Give the page a unique root scope class or data attribute. Scope page-only selectors under it and check for generic selectors that could cross page boundaries.
3. Keep project assets in the owning page's asset area. Do not reference another page's assets, removed paths, or playground-only paths.
4. Share only assets and code that are genuinely global and already part of the repository's shared contract. Do not introduce a shared abstraction merely to complete one page.
5. Keep playgrounds, experiments, fixtures, and testbeds outside production navigation and deployment inputs until the user explicitly promotes them. Use the repository's ignore or manifest mechanism and verify the exclusion.
6. After copying or freezing a page, search its HTML, CSS, and JavaScript for stale playground names, foreign scope classes, old asset paths, and unintended shared dependencies.
7. Limit edits to the requested page owner unless a global navigation, routing, token, or shared-system change is explicitly required.
8. When the project uses cache-version query strings or asset manifests, update the existing cache key for every changed CSS, JavaScript, sequence, or motion asset that could remain stale. Do not invent cache-busting syntax when the stack already fingerprints files.

Treat an accepted page as a frozen production boundary: future changes stay inside its owner unless the user requests a global change.

## Perform evidence-based visual QA

### Normalize the comparison

- Convert reference pixels to CSS pixels when needed: `CSS size = image pixel size / capture DPR`.
- Compare the same CSS viewport, DPR, theme, content, animation-settled state, data state, and interaction state.
- Separate reference defects from target behavior. A broken screenshot may demonstrate a collision without being a pixel-match target.
- Capture before and after evidence with the same crop and state whenever a baseline exists.

### Build a risk-based matrix

Check the requested viewport plus the narrowest supported width, relevant breakpoint edges, and at least one wider regression viewport. Add cases for touch, pointer, scroll, theme, reduced motion, and fallback behavior when they apply.

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
Final result: passed | failed | blocked
```

## Completion gate

Finish only when all applicable statements are true:

- The official source behavior and defaults were inspected.
- The rendering pipeline was matched before visual tuning.
- Every intentional source deviation was recorded with impact and verification.
- DPR, resize, lifecycle, reduced motion, fallback, and performance behavior were checked.
- Page-level code, selectors, assets, experiments, and production inputs respect their ownership boundaries.
- Existing cache invalidation was updated where changed assets could remain stale.
- Comparable visual evidence covers the relevant viewports and states.
- The real page context, console, asset loading, and interaction behavior were verified.
