# Delivery handover

## Purpose and responsibilities

The portal is the review surface for an approved UAT specification. The delivery lead owns scope, client instructions and acceptance decisions. The developer/QA owns reproducible steps, test data, expected results and retest readiness. The client owns executing the tests and returning their results. Codex can help author, reconcile and implement feedback under the delivery team's normal authorization and release process.

## First pilot

Use the included Northstar Services example to learn the interface. For a real pilot, choose a small delivery with a happy path, a validation path and a role/access scenario. Agree an environment, a tester reference convention, evidence channel, UAT dates and the person who consolidates feedback.

1. Copy the example pack to a new project/version directory.
2. Replace the fictional story and scenario content with approved requirements; keep business language in the portal.
3. Have a developer execute every scenario in the sandbox before calling it ready. A source review is not an end-to-end test.
4. Review the rendered HTML, version and publication suitability.
5. Publish the approved artifact through the repository's publishing workflow.
6. Give clients the version, URL, environment access instructions separately if needed, and feedback return channel.
7. Clients export one JSON per tester. Store returned files in the agreed project location, outside this public publishing path.
8. Import the feedback locally or provide it to Codex alongside the exact pack version and development source.
9. Triage each failed/blocked result: reproduce it, distinguish defect from clarification/scope change, and link the agreed work to its case ID.
10. Validate changes in the sandbox, issue a targeted retest list and preserve the original feedback.

## Suggested handover message

> We now have a reusable UAT feedback framework with a fictional Salesforce example, per-scenario outcomes and comments, and JSON export/import. The repository includes a portable HTML renderer, a Codex skill, prompts and step-by-step delivery and publishing guidance. For the pilot, please nominate a delivery owner and a small set of approved acceptance scenarios. We can then adapt the pack, execute the tests in the sandbox and publish the reviewed client page.

## Lessons carried over from script reviews

- Keep stable IDs so a client can review one changed section rather than the whole pack.
- Put whole-section feedback after that section, and whole-pack feedback last in the test content.
- Preserve older approved versions and make changes identifiable through revisions and a release note.
- Exported feedback is the durable record; local storage is only a convenience.
- Demonstrated UI results, database access checks and actual second-user sessions are different evidence. Record the actual validation performed.
- State business outcomes clearly. Screens and configuration choices support the process; avoid promising untested behavior.

## Acceptance and scope

The example is not a contractual acceptance process. A Passed result is a tester's observation, not automatic project sign-off. Agree formal acceptance separately. Suggested severity requires triage. A new client expectation is a scope discussion until accepted by the project owner.
