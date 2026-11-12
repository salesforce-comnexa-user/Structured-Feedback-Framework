# Install or share the Codex skill

Download the ready-to-install [skill ZIP](../distribution/structured-feedback-skill-1.0.0.zip) from this repository, or build it with the command below.

The portable skill is named `structured-feedback`. It contains a synchronized copy of the renderer/build script and the relevant authoring, contract and prompt references, so colleagues can use it without the original project folder.

## Build the handover bundle

```sh
python3 scripts/package.py
```

This writes `artifacts/structured-feedback-skill-1.0.0.zip`, a portable example HTML and a complete source ZIP. Generated artifacts are not committed. The packaging script is deterministic in content; run it again after updating source.

## Install from the ZIP

1. Obtain the ZIP through authorized access to this repository or the agreed internal channel.
2. Extract it. The archive has one top-level `structured-feedback/` folder.
3. Copy that folder to `~/.codex/skills/structured-feedback/`, or your configured Codex skills directory. If a skill already exists there, review and back it up before replacing it.
4. Start a new Codex chat and invoke `$structured-feedback` with a concrete request. Consult the Codex installation's skill settings if discovery needs a refresh.
5. Try the first prompt in `example-prompts.md` with a small fictional story and inspect the generated HTML.

The source skill under `skills/structured-feedback/` contains references. For a complete portable installation, use the generated ZIP; it includes the renderer assets added by the packaging script.

The skill does not grant GitHub, Salesforce or customer access. It preserves the current user's task scope and normal authorization/release requirements. Do not include customer feedback or credentials in the skill package.
