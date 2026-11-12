# Data contract · schema 1.0

`schemas/pack.schema.json` and `schemas/feedback.schema.json` define the interchange format. `src/core.js` implements runtime structural checks and cross-record invariants (unique IDs, statuses, version classification and Failed/Blocked actual results).

## Test pack

Top-level: schemaVersion, projectId, releaseId, packId, packVersion, title, client, environment, intro, instructions, stories. Each story has id, title, objective, cases. A case has id, revision, title, role, preconditions, steps, expectedResult and testData.

## Feedback

Top-level: schemaVersion, projectId, releaseId, packId, packVersion, exportId, exportedAt (ISO timestamp), testerReference, results, storyFeedback and packFeedback.

Each result has storyId, caseId, caseRevision, status, actualResult, comment, severity and evidenceReference. Severity is Unspecified, Low, Medium, High or Critical. Status is Not tested, Passed, Failed, Blocked or Not applicable. Failed and Blocked require a non-empty actualResult.

`evidenceReference` is plain text, not an uploaded file or an automatic link. Actual attachments travel through the approved project channel.

## Import behavior

- Reject unsupported schema, malformed field types, duplicate case IDs, malformed timestamps, unknown statuses and files over 2 MB.
- Reject a different project, release or pack ID.
- Display version mismatch and case revision/story mismatches explicitly.
- Display unknown case IDs as historical/unknown; do not silently map by title.
- Detect duplicate export IDs within the current page session. Distinguish identical files from different content carrying the same ID.
- Display imported comments as text. Do not overwrite the working draft or automatically create tasks, deploy Salesforce changes or mark acceptance.

Browser validation is for interoperability, not identity verification. A tester reference is self-entered and a JSON file can be edited. For formal attestation, use the project's agreed acceptance process.
