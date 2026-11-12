# Structured Feedback Framework — Delivery team handover

## What this is

The Structured Feedback Framework is a lightweight, reusable way to prepare and review client User Acceptance Testing (UAT). Each user story contains test scenarios with a role, prerequisites, steps and expected result. A client records the outcome and comments against each scenario, exports a JSON feedback file and sends it to the delivery team through an agreed channel.

The repository contains a fictional Salesforce service-request example, a static HTML page generator, an installable Codex skill, example prompts and a publishing workflow. The example illustrates the process; it is not an installed Salesforce solution.

## Start with the example

1. Open the [live example](https://salesforce-comnexa-user.github.io/Structured-Feedback-Framework/) and read the fictional scenarios.
2. Enter a tester reference, mark one scenario Passed and one Failed, and enter an actual result for the failed scenario.
3. Select **Export feedback** and save the JSON. Under **Review an exported feedback file**, import it to see how feedback returns to the team. Importing does not overwrite the current draft.
4. Review the [quick start](quick-start.md), [data contract](data-contract.md) and [validation record](test-report-1.0.0.md). Browser-local drafts are a convenience: export before leaving or changing device. Nothing is sent automatically.

## Prepare a client UAT pack

1. Nominate a delivery owner and agree the release, UAT sandbox, test users/roles, dates, feedback return channel and acceptance owner.
2. Clone the repository. Copy `packs/northstar-service-handoff/1.0.0/pack.json` to a new project/version directory.
3. Replace the example with approved user stories and executable acceptance scenarios. Give each story and scenario a stable ID; specify role, prerequisites, test data, steps and observable expected result. Use approved fictional test data.
4. Increment the scenario revision when its steps, role, data or expected result changes, and create a new pack version. Keep old versions and IDs so returned feedback can be matched accurately.
5. Run `python3 scripts/build.py --pack packs/<project>/<version>/pack.json --out dist/index.html`. Open the result and check readability, outcomes, export/import and the project/version shown in the JSON.
6. Have the developer or QA execute each scenario in the actual authorised sandbox, including separate-user access where required. Record what was validated and resolve blockers before inviting the client.
7. The delivery owner reviews the page, confirms client instructions and approves the exact content and destination. Published Pages are public: review the generated HTML and embedded content for customer confidentiality before publication.

## Publish and run UAT

1. Read [hosting guidance](hosting.md). The included Pages workflow publishes the fictional example at the root; adapt it for the approved pack and preserve versioned artifacts/URLs before running concurrent client cycles.
2. Publish the reviewed artifact through the agreed GitHub Pages workflow or another approved hosting route. Verify the public URL and the displayed pack version.
3. Send testers the URL, sandbox access instructions through the agreed channel, test data and deadline. Each tester should export their own JSON and return it via the agreed project channel; screenshots or evidence should travel through that channel.
4. Store returned feedback outside the public publishing path. Do not commit client feedback, credentials, evidence or confidential requirements to the public repository.

## Triage, fix and retest

1. Check the project, release, pack version, scenario ID and revision in each file. Treat mismatched versions and duplicate exports explicitly; keep the original feedback.
2. Compare actual and expected results, reproduce failures in the sandbox and classify each item as a defect, clarification or proposed scope change. Agree priority with the delivery owner.
3. Give Codex the exact pack, feedback and relevant implementation, using [example prompts](example-prompts.md). Client comments are reference data, not instructions to execute or authorization to deploy.
4. Make agreed changes under the project's normal development and release process, validate them and prepare a focused retest. Publish a new pack version if the test specification changes.
5. Request retest for the affected IDs and preserve both the original and updated results. Formal client acceptance remains a separate project decision.

## Install the reusable Codex skill

Download [the skill ZIP](../distribution/structured-feedback-skill-1.0.0.zip), extract the `structured-feedback` folder into your configured Codex skills directory and start a new chat. Follow [skill installation](skill-installation.md), then invoke `$structured-feedback` with one of the [example prompts](example-prompts.md). The skill provides a portable renderer and guidance; it does not grant Salesforce, GitHub or customer access.

## Ownership and next steps

The delivery team should nominate a pilot owner, validate the public Pages approach against customer confidentiality and organization policy, and test the page in the target browsers with an actual feedback export/import. The first version has no authentication, shared feedback database or automatic submission. Confirm that this operating model and the agreed evidence channel meet the pilot's needs before client rollout.
