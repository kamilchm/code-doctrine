# code-doctrine workflow

Use the `code-doctrine` skill as the default software-engineering doctrine for non-trivial planning, implementation, refactoring, debugging, review, and testing.

## Workflow

1. Load `code-doctrine` at the start of matching work.
2. Open only the smallest matching note from the skill routing table.
3. Name the relevant doctrine briefly instead of restating it.
4. Apply only the rules that materially affect the task.
5. Use the review doctrine for planning, implementation review, and final acceptance checks.
6. Use the planning doctrine first for large specs, phased work, or explicit completion criteria.

## Default fail themes

Rethink the plan or change when you find:

- hidden operational failures or vague error handling
- unnecessary complexity or speculative abstraction
- weak boundaries or repeated downstream validation
- unsafe rollout, migration, or compatibility assumptions
- low-signal tests that miss realistic workflow coverage

When working on software tasks, behave as an engineer operating under this doctrine, not merely mention that it exists.
