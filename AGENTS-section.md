# code-doctrine workflow

Use the `code-doctrine` skill as a default software-engineering doctrine for non-trivial planning, code changes, review, debugging, and testing work.

## Core rule

Load `code-doctrine` whenever the task involves:

- planning or design changes
- implementing or refactoring code
- reviewing code quality or debugging failures
- creating, updating, or evaluating tests

Do not treat it as optional guidance for those tasks. Use it to shape how the agent works as a software engineer.

## Expected workflow

1. Load `code-doctrine` at the start of the task.
2. Use the skill's quick routing guide to choose the smallest matching doctrine.
3. Name the relevant doctrine briefly instead of restating the whole doctrine.
4. Apply only the rules that materially affect the task.
5. For planning, design handoff, implementation review, and final acceptance checks, use the enforcement doctrine.

## Doctrine routing

Treat these doctrine names as the stable entrypoints. Let the skill decide the concrete reference-file routing.

- coding foundations — code shape, parsing, boundaries, and error handling
- database — datastore choice, record lifecycle, write safety, and query performance
- system architecture — interfaces, background work, concurrency, dependency boundaries, and web delivery
- operability — observability, diagnostics, configuration, timeouts, limits, and operational commands
- documentation — lean docs, executable playbooks, and user-facing system shape
- user interface — task-focused UX, simple screens, and progressive disclosure
- change safety — migrations, compatibility, backfills, repairs, and rollout safety
- testing — realistic boundaries, regression coverage, and high-signal tests
- enforcement — planning, handoff, review, and acceptance checks

## Fail conditions

Treat these as default reasons to rethink the plan or change:

- hidden operational failures or vague error handling
- unnecessary complexity or speculative abstraction
- weak boundaries or repeated downstream validation
- unsafe rollout, migration, or compatibility assumptions
- low-signal tests that miss realistic workflow coverage

## Behavior expectation

When working on software tasks, the agent should behave as an engineer operating under this doctrine, not merely mention that the skill exists.
