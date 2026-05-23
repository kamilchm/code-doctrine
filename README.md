# @kamilchm/code-doctrine

Plain code doctrine package published by Kamil Chmielewski.

This repository is an example of the decentralized code doctrine package standard.
It is intentionally a plain doctrine package:

- doctrine content
- a doctrine manifest
- package metadata for npm publishing

It does **not** contain harness-specific installer logic.
That responsibility lives in the shared `code-doctrine` CLI client.

## Install through the shared client

OpenCode project install:

```bash
npx code-doctrine install kamilchm opencode --project
```

OpenCode global install:

```bash
npx code-doctrine install kamilchm opencode --global
```

Pi install:

```bash
npx code-doctrine install kamilchm pi
```

## What this package contains

- `skill/` — all installable doctrine files
- `AGENTS-section.md` — root integration metadata that the CLI merges into the target environment's `AGENTS.md`
- `doctrine.json` — the doctrine manifest used by the shared client
- root package metadata and documentation for publishing and reuse

## Standard notes

This package follows the v2 `code-doctrine` convention:

- npm package name: `@kamilchm/code-doctrine`
- doctrine manifest: `doctrine.json`
- doctrine skill root: `skill/`
- AGENTS integration file: `AGENTS-section.md` at repo root
- doctrine skill name: `code-doctrine`

## Local validation

```bash
npm run check
npm pack --dry-run
```

## Publishing

This repo includes a GitHub Actions publish workflow in `.github/workflows/publish.yml`.
It is configured for npm trusted publishing via GitHub OIDC, so no `NPM_TOKEN` secret is required.
The workflow uses the GitHub Actions environment named `npm`, which should also be configured as the environment name in npm trusted publisher settings.
It also clears `NODE_AUTH_TOKEN` in the publish step to avoid `actions/setup-node` interfering with npm OIDC trusted publishing.
Publish via GitHub release or manual workflow dispatch.

## License

MIT
