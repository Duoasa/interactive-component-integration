# Page containment reference

Use for frozen/static page ownership or isolation changes. Return to [the skill](../SKILL.md).

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
