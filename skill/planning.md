# Planning

Use this note for large specifications, multi-phase tasks, detailed issues, or work with explicit completion criteria. Use it before implementation, then use `./review.md` and the smallest concern note for execution.

## When to use this note

- The request describes multiple phases, milestones, or deliverables.
- The description is long, references external documents, or includes acceptance criteria.
- The task introduces new APIs, tools, commands, or user-facing features.
- You are tempted to stop after an MVP when the spec clearly asks for more.

## Specification discipline

- Read the whole specification before writing implementation code.
- Extract explicit phases, implicit deliverables, non-goals, dependencies, tests, observability, docs, and completion criteria.
- If the spec has named phases, preserve them as phases; do not flatten them into unrelated tasks.
- Count concrete deliverables such as commands, endpoints, methods, migrations, tests, and docs.
- Non-goals are scope boundaries; do not violate them to make the solution feel more complete.

## Decomposition

- Break work into the smallest meaningful slices that leave the system runnable.
- One task should be a mergeable unit of work, not a vague category or a single import.
- Avoid tasks whose only purpose is abstraction, plumbing, indirection, or ceremony.
- Order tasks by dependency and note blockers explicitly.
- A plan is revisable: add missing tasks or split oversized tasks as you learn more.
- Do not remove uncompleted spec-mandated phases just because they feel like future work.

## Completion criteria

Completion criteria are the definition of done. They override:

- the feeling that the work is good enough
- a passing compile step alone
- one happy-path test
- the temptation to defer specified scope to a follow-up

Before declaring a task, phase, or whole plan complete, verify:

- the relevant code exists and compiles
- tests exist at the right boundary and pass
- lint/format/static checks that matter for the repo are clean
- the item's own goal is satisfied
- no specification requirement, phase, test, observability, or documentation requirement was dropped

If completion criteria are not met, revise the plan and continue instead of marking the work done.
