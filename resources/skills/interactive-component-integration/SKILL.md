---
name: interactive-component-integration
description: Integrate or debug externally sourced interactive frontend components, preserving their rendering contract and page boundaries.
---

# Interactive Component Integration

Use for integrating or repairing an identified external component or creative
effect. Ordinary frontend layout, generic animation advice, and unrelated QA do
not need this skill.

## Establish the relevant contract

Inspect the requested surface, its owner, the authoritative component source and
version, and any existing local tuning. Separate source defaults, integration
settings (size, DPR, lifecycle), and intentional product design values. Preserve
the user's scope and existing authorization; local conventions cannot override
an explicit user request.

Read only the reference needed for the operation:

| Operation | Reference |
|---|---|
| Initial integration, source parity, shader/color/compositing defect | Affected layers in [Rendering contract](references/rendering-contract.md) |
| Independent static/frozen page, cross-page styles/assets, deployment isolation | [Containment](references/containment.md) |
| Visual or interaction comparison, responsive regression | Relevant scenarios in [Visual verification](references/visual-verification.md) |

## Non-obvious invariants

- Omitted props use source defaults, not automatically zero or false. Demo
  controls are not the full implementation contract.
- Check renderer color, alpha, post-processing, DPR, and wrappers before tuning
  shader parameters to compensate for a mismatch. Preserve glow-bearing RGB.
- Compare equivalent viewport, DPR, theme, state, and timing where source fidelity
  matters. Record intentional departures and their reason rather than concealing them.
- Keep lifecycle cleanup, bounded DPR, resize, reduced-motion and fallbacks
  appropriate to the component. Keep content usable if the effect fails.
- Preserve page ownership and existing cache invalidation. A reusable application
  component does not require duplicated files or a new isolated harness by default.

## Complete the requested integration

Continue through the authorized integration, relevant checks, fixes and concise
evidence. Do not stop at an isolated demo if the request includes the real page.
Use existing test surfaces when sufficient; repeat only checks affected by new
changes or findings. A small repair need not replay an entire initial integration.

Claim visual parity only from comparable observations. If required observation
is unavailable or reserved for the owner, report that gap and complete independent
work; do not turn untested into passed. External publishing or expanding to other
page owners still requires the corresponding authorization.
