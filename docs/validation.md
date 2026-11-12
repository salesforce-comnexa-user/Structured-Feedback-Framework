# Validation and first-version limitations

See the [first-version execution record](test-report-1.0.0.md) for actual results and pending browser checks.

## Reproducible checks

With Node.js 20+:

```sh
node --test tests/core.test.cjs
```

With Python 3.9+:

```sh
python3 -m unittest discover -s tests -p 'test_*.py'
python3 scripts/build.py
python3 scripts/package.py
```

CI runs the tests and compiles the example. Browser checks should cover a Passed and Failed scenario, mandatory actual result, draft reload, JSON download/re-import, duplicate import, historical versions, print preview and a narrow viewport. The source repository's first-version test report records what was actually exercised.

## Deliberate limits

- No shared database, login, real-time collaboration, autosubmission or Salesforce connection.
- The fictional requirements are not deployed to a sandbox.
- Drafts are browser/profile-local, scoped to pack identity and version. Two testers sharing the same browser profile must export and clear between sessions.
- Imports are a review surface, not an automatic merge or issue tracker. No attachment upload is provided.
- Browser localStorage can be unavailable and file-URL behavior differs by browser; export is the durable record.
- The first Pages workflow publishes one pack at the root. Introduce preserved versioned URLs before simultaneous client cycles.
- Suggested severities and test outcomes do not constitute signed acceptance.
- Print/PDF and assistive technology behavior require the team's target-browser checks before a real client rollout.

Future work should be driven by the pilot: consolidated multi-tester triage, versioned public pack routing, optional authenticated hosting or a feedback backend. These are not included capabilities.
