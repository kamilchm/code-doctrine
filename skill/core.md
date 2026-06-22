# Core

Use this note when the task is mainly about code shape, abstraction level, parsing, boundaries, or error handling.

## Simplicity

- Prefer the simplest design that fully satisfies the task.
- Avoid speculative abstraction, generic plumbing, and future-proofing for imaginary needs.
- If one concrete implementation is enough, do not invent a layer just to look architectural.
- If there is only one implementation and one caller, do not add a trait or interface yet.
- Favor flat, obvious control flow over cleverness.
- In simple functions, keep the happy path at top-level indentation when practical.
- Prefer guard-style early exits for edge cases and errors instead of nesting the main path deeper.
- When a function accumulates nested branches, extract one nested edge-case or error branch before broader refactoring.
- Keep interfaces small. Large interfaces usually hide weak boundaries.

## Failures and errors

- Treat domain, operational, and programmer failures as different things.
- Prefer typed or result-style handling for expected domain failures.
- Never silently swallow operational failures.
- Do not add low-level retry loops unless a higher-level policy requires them.
- Let retries and recovery policy live at orchestration boundaries, not in leaf helpers.
- Preserve cause and context when propagating errors.
- Do not replace a rich error with a vague string too early.
- Error messages should make clear what failed, where, and under which conditions.

## Parse at boundaries

- Parse raw input into stronger domain types at system boundaries.
- Refine strings, ids, enums, and command payloads once before domain logic sees them.
- Avoid passing unparsed maps, strings, and loosely shaped payloads deep into the system.
- Do not repeat the same validation in every layer when it should have happened once.
- Make illegal states hard to represent.

## Structure

- Keep entrypoints thin.
- Keep domain logic central.
- Keep external systems and frameworks at the edges.
- Parse at the entrypoint, run business logic in domain code, and keep IO in adapters.
- Do not pass framework types deep into core code.
- Let the domain own names and boundaries, not the dependency you picked.
