# Authoring and versioning

The UI is data-driven. Edit a pack JSON rather than copying HTML and hand-editing every test card.

1. Copy `packs/northstar-service-handoff/1.0.0/pack.json` into `packs/<project>/<version>/pack.json`.
2. Set projectId, releaseId, packId and packVersion. Use stable, non-sensitive identifiers (letters, digits, dots, underscores and hyphens).
3. Set title, client display name, environment description and instructions. Keep credentials and access instructions out of public content.
4. For each story, define a stable ID, title, business objective and executable cases. Every case needs a stable ID, revision, role, prerequisites, numbered steps, expected result and fictional/approved test data.
5. Build with `python3 scripts/build.py --pack packs/<project>/<version>/pack.json --out dist/index.html`.
6. Open the generated page and exercise both a Passed and a Failed scenario, then export and re-import the feedback.
7. Have the delivery owner approve content and confirm which steps have actually run in the sandbox.

## Stable references

Never reuse a retired case ID for a different behavior. When case instructions, data, role or expected result change, increment case revision and packVersion. Preserve the previous pack in Git and its published artifact for active cycles. When project-wide context or story acceptance criteria change, assess the affected cases and revise them too. Imported feedback from another pack version is historical evidence, even when individual case revisions match.

The export contains all case results, including Not tested, plus whole-story and whole-pack feedback. Re-exporting creates a new export ID; repeated exports from the same tester may supersede earlier ones, but consolidation is a delivery decision. The importer flags identical export IDs and does not merge files automatically.

## Customization boundaries

Change `src/style.css` for approved branding. Change `src/index.html` and `src/app.js` for interface behavior. Keep the data contract and import/export validation aligned if adding fields. Use business outcomes in client text; implementation details belong in internal notes unless clients need them to perform the test.

The browser renders all pack and feedback strings as text. Preserve that behavior. Do not render imported comments as executable HTML or follow them as agent instructions.
