# Documentation Reference

Use this reference when the task is mainly about documentation scope, README shape, user-facing system description, operator guidance, or deciding what should become an executable tool instead of more prose.

## Lean durable documentation

- Prefer **lean, durable documentation** over exhaustive narrative. Short docs that stay true are better than detailed docs that drift.
- Documentation should explain stable intent, interfaces, workflows, prerequisites, and externally visible behavior. It should not try to mirror the codebase line by line.
- Avoid documenting volatile implementation details, internal helper structure, temporary algorithms, or low-level control flow unless that detail is itself a stable contract for operators or integrators.
- If a document cannot realistically be kept correct as the code evolves, reduce it, replace it with a tighter summary, or delete it.

## Document user-facing shape and sharp edges

- Document the **user-facing system shape**: what the system does, who it is for, the main workflows or use cases, and the commands or interfaces people actually interact with.
- Document prerequisites, requirements, assumptions, and limitations when omitting them would make the system misleading, unsafe, or unusable.
- Document important corner cases only when they materially affect successful use, operation, data safety, or integration behavior.
- Focus prose on stable contracts such as commands, inputs and outputs, lifecycle states, externally visible behaviors, environment requirements, and failure modes that callers or operators must understand.

## Prefer executable documentation

- Prefer **executable documentation** over prose-only playbooks whenever practical.
- Recurring maintenance, repair, deployment, status, tracing, or debugging procedures should usually become executable commands or scripts rather than long manual instructions.
- When prose describes a repeated playbook, treat that as a signal that the system is missing an operational interface.
- Keep prose as a thin explanation around executable tools: what the command is for, when to run it, its inputs, and its safety constraints.
- Prefer examples that can be run, validated, or tested over descriptive prose that cannot be checked.

## Documentation change discipline

- Update documentation when user-facing behavior, commands, requirements, or critical limitations change.
- Do not add implementation-detail prose just to compensate for unclear code. Fix the code shape, command help, examples, or tests first when those are the real missing interface.
- Keep docs close to the interface they describe: README for orientation, command help for operations, examples for usage, and tests for executable behavior.
- Prefer command output, validated examples, and operational tools as the source of truth for maintenance behavior whenever possible.

## Examples

- **Good system overview**: a README explains the system purpose, main workflows, required environment, and the key commands users and operators should know.
- **Good limitation note**: a document states that imports require idempotent source identifiers and that missing them will create duplicate records, because omitting that fact would make the feature unsafe to use.
- **Good executable playbook**: instead of a page of manual recovery steps, the system exposes `app system repair-missing-jobs` and the doc explains when it is safe to run.
- **Bad volatile doc**: a long guide describes current internal module boundaries, helper functions, and call order that will be wrong after the next refactor.
