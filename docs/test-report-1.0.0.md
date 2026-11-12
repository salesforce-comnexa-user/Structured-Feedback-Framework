# First-version test record · 12 November 2026

- Passed: eight JavaScript functional tests, executed in the available Node runtime through a VM test harness. They cover export identity and Unicode/newlines, Failed/Blocked evidence, project/version/revision mismatches, malformed and duplicate records, attribution/timestamps, stable IDs, non-mutating classification and section comments.
- Passed: two Python unittest checks, including hostile closing-script text in pack data and extracting/building from the portable skill ZIP.
- Built: the portable HTML, source bundle, installable skill and checksums.
- Skill frontmatter and linked references reviewed. The bundled quick validator could not run because PyYAML is absent in this environment; no claim of that validator passing is made.
- Pending: browser visual review, real download/import interaction, storage reload, mobile/keyboard/print acceptance and target-browser checks. Local file preview was denied by the available browser URL policy. The public site could not be used for verification because this account's plan does not enable Pages for the private repository.
- No Salesforce configuration was created for the fictional example. No client feedback was sent to a service.

The CI workflow reruns the native Node test runner and Python tests on GitHub. This record does not pre-claim the outcome of a remote workflow.
