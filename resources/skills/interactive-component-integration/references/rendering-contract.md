# Rendering and performance reference

Read the layers affected by source integration or rendering defects. Return to [the skill](../SKILL.md).

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
