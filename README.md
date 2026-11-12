# Structured Feedback Framework

A reusable, lightweight way for clients to test delivered functionality and return feedback against stable acceptance-scenario IDs.

The first example is a **fictional Salesforce service-request project** with two user stories and three UAT scenarios. It is a specification example, not an installed Salesforce package. All interface copy, examples and delivery documentation are in English.

## Start here

| You want to… | Open |
| --- | --- |
| Try the portal locally | [Quick start](docs/quick-start.md) |
| Run a client UAT cycle | [Delivery handover](docs/delivery-handover.md) |
| Publish a public page from this private repository | [GitHub Pages setup](docs/hosting.md) |
| Adapt the example | [Authoring and versioning](docs/authoring.md) |
| Install the Codex skill | [Skill installation](docs/skill-installation.md) |
| Ask Codex to author, review or triage | [Example prompts](docs/example-prompts.md) |
| Understand the JSON contracts | [Data format](docs/data-contract.md) |
| Check what was tested and what remains | [Validation and limitations](docs/validation.md) |

## Ready-to-use handover files

- [Portable example HTML](distribution/structured-feedback-example-1.0.0.html) — download the raw file and open it in a browser; GitHub's file viewer does not execute it.
- [Installable Codex skill ZIP](distribution/structured-feedback-skill-1.0.0.zip) — extract and install as described in the skill guide.
- [Checksums](distribution/SHA256SUMS).

The public Pages site is **not enabled**: on 12 November 2026 the account's Pages settings required an upgrade or a public repository. The repository remains private. See [hosting](docs/hosting.md) for the next decision.

## Quick start

Requirements: Python 3.9+ to build; a modern browser to use the portal. Node.js 20+ is used for automated JavaScript tests, but is not needed to run the page. No npm install or external runtime dependencies.

```sh
git clone https://github.com/salesforce-comnexa-user/Structured-Feedback-Framework.git
cd Structured-Feedback-Framework
python3 scripts/build.py
```

Open `dist/index.html` in your browser. You can also serve it with `python3 -m http.server 8000 --directory dist`, then open `http://localhost:8000`.

To generate the distributable, including a self-contained skill ZIP:

```sh
python3 scripts/package.py
```

## What the first version includes

- Business objective, prerequisites, user role, test data, steps and expected result for each scenario.
- Passed, Failed, Blocked, Not applicable and Not tested outcomes; actual result, suggested severity, evidence reference and comments.
- Whole-story and whole-pack feedback at the end of their respective sections.
- Browser-local drafts, JSON download, local import for review, duplicate-export detection and version warnings.
- Print/PDF layout and a portable HTML file that also works without a web server.
- Pack and feedback schemas, example feedback, tests, build/package scripts and a GitHub Pages deployment workflow.
- A portable Codex skill with the renderer and supporting references included.

Feedback is **not sent automatically**. The client exports the JSON and returns it through the agreed channel. Importing a file displays it for review; it does not overwrite the tester's draft. Feedback files and evidence should stay out of the publishing repository.

## Publication model

The source repository can remain private while the Pages website is public, where the GitHub plan supports this. Only the generated example HTML is uploaded by the workflow. Private source does not make published HTML confidential. See [hosting instructions](docs/hosting.md) before enabling Pages.

## Project layout

```text
src/                 Portal template, styles and browser/validation code
packs/               Versioned source test specifications
schemas/             Test-pack and feedback JSON Schema contracts
examples/            Fictional returned feedback
scripts/             Build, validate and package helpers
skills/              Portable Codex skill source and workflow references
tests/               Observable export/import and contract tests
.github/workflows/   Checks and controlled public Pages deployment
```

The framework grew from a scene-by-scene script review interface. It preserves the useful pattern—small reviewable sections, stable IDs and portable feedback—and adapts the terminology and traceability to delivery UAT. No real customer data, Salesforce credentials or previous campaign files are included.
