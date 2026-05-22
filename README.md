# @kamilchm/code-doctrine

Standalone code doctrine skill and installer for OpenCode and Pi.

`code-doctrine` gives agents a compact default doctrine for planning, implementation, review, debugging, and testing, then routes deeper guidance through focused reference docs.

## What this repo contains

- the standalone `code-doctrine` skill under `skills/code-doctrine/`
- a managed AGENTS section for making the skill the default doctrine for coding tasks
- a single installer CLI that can set up OpenCode, Pi, or both

## Quick start

Recommended generic entrypoint:

```bash
npx code-doctrine install kamilchm opencode --project
```

Direct package entrypoint:

### OpenCode, current project

```bash
npx @kamilchm/code-doctrine install opencode --project
```

### OpenCode, global

```bash
npx @kamilchm/code-doctrine install opencode --global
```

### Pi

```bash
npx @kamilchm/code-doctrine install pi
```

### Both at once

```bash
npx @kamilchm/code-doctrine install all --global
```

`install all --global` means:
- OpenCode global install into `~/.config/opencode/`
- Pi global install into `~/.pi/agent/`

If you omit `--global`, OpenCode defaults to the current project's `.opencode/` directory while Pi still installs into `~/.pi/agent/`.

## Local development usage

From the repo root:

```bash
node install.mjs install opencode --project
node install.mjs install pi
```

## What the installer does

### OpenCode

Copies the standalone skill into:

- `.opencode/skills/code-doctrine/`
- or `~/.config/opencode/skills/code-doctrine/`

Then merges a managed block into:

- `.opencode/AGENTS.md`
- or `~/.config/opencode/AGENTS.md`

### Pi

Copies the standalone skill into:

- `~/.pi/agent/skills/code-doctrine/`

Then merges a managed block into:

- `~/.pi/agent/AGENTS.md`

## Managed AGENTS block

The installer manages this section with stable markers:

```md
<!-- code-doctrine:managed:start -->
...
<!-- code-doctrine:managed:end -->
```

It preserves unrelated AGENTS content.

## Conflict behavior

If target skill files already exist and differ, the installer aborts without writing partial updates.

Use `--force` to overwrite conflicting managed skill files.

Examples:

```bash
npx @kamilchm/code-doctrine install opencode --global --force
npx @kamilchm/code-doctrine install all --project --force
```

## Code doctrine standard metadata

This package exposes v1 doctrine metadata in `package.json` under `codeDoctrine`.

That makes it an example implementation of the public code-doctrine package convention.

## Pi package support

This repo also exposes the skill as a Pi package resource through `package.json`.

That means this works:

```bash
pi install /path/to/code-doctrine
```

But the recommended path for setting the doctrine as the default coding behavior is still the installer CLI, because it also manages the AGENTS block.

## Skill structure

The skill ships:

- `SKILL.md` — compact routing and defaults
- `coding-foundations-reference.md`
- `database-reference.md`
- `system-architecture-reference.md`
- `operability-reference.md`
- `documentation-reference.md`
- `user-interface-reference.md`
- `change-safety-reference.md`
- `testing-reference.md`
- `enforcement-reference.md`

## CLI help

```bash
npx @kamilchm/code-doctrine --help
```

## Publishing

This repo includes a GitHub Actions publish workflow in `.github/workflows/publish.yml`.
Provide an `NPM_TOKEN` repository secret, then publish via GitHub release or manual workflow dispatch.

## License

MIT
