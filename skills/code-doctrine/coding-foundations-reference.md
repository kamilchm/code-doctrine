# Coding Foundations Reference

Use this reference when the task is mainly about code shape, abstraction level, parsing, package boundaries, or error handling.

## Simplicity and explicitness

- Prefer the simplest design that fully satisfies the task.
- Avoid speculative abstraction, generic frameworks, and future-proofing for imaginary requirements.
- If one concrete implementation is enough, do not invent an interface or layer just to look architectural.
- Favor flat, obvious control flow over cleverness.
- Explicit is better than implicit.
- Clear is better than clever.
- The bigger the interface, the weaker the abstraction.
- Build small focused components.
- Compose simple pieces instead of giant frameworks.
- Solve the concrete problem in front of you.

## Failure handling and rich errors

Distinguish clearly between:
- **domain failures** — expected, meaningful, user- or business-facing failures
- **operational failures** — IO, network, database, filesystem, subprocess, infrastructure failures
- **programmer / invariant failures** — impossible states, broken assumptions, bugs

Operational failure rules:
- Do not bury operational failures deep in leaf code.
- Do not add low-level retry loops unless there is an explicit high-level policy.
- Bubble operational failures upward with full context.
- Let higher orchestration layers own retries, restarts, and recovery strategy.
- Never silently swallow infrastructure errors.

Error quality rules:
- Preserve causes and context when propagating errors.
- Prefer typed or result-style handling for expected domain failures.
- Operational failures should include enough context to debug quickly.
- Never replace a rich error with a vague string too early.
- Error messages should answer: what failed, where, and under which conditions.

## Parse at boundaries

At system boundaries:
- parse raw input into stronger domain types
- refine strings, enums, ids, and command payloads into safer representations
- avoid passing unparsed raw structures deep into the system
- make illegal states hard or impossible to represent

Do not repeatedly validate the same raw shape at every layer when it should have been parsed once at the boundary.

## Domain-centered package layout

Adopt the spirit of Ben Johnson's package layout across languages:
- keep entrypoints thin
- keep domain logic central
- isolate infrastructure and external systems at the edges
- make dependency direction obvious and inward-facing
- keep public packages or modules intentional, not accidental

Preferred shape, adapted per language:
- **entrypoints / apps** — CLI, server main, workers
- **domain / core** — business logic, rules, core types
- **ports / interfaces** — narrow contracts at boundaries
- **adapters / infrastructure** — db, HTTP, queues, filesystem, third-party APIs
- **tests** — integration, end-to-end, or system tests
- **scripts / tools** — operational tooling
- **docs** — architecture and standards

## Error taxonomy to preserve

| Error kind | What it means | Typical examples | Preferred handling |
| --- | --- | --- | --- |
| Domain error | expected and modeled business or user failure | invalid command, unsupported action, permission denied by business rules, impossible workflow transition | use result types or typed errors and map explicitly to caller-facing responses |
| Operational error | unexpected but normal systems failure | network timeout, connection refused, database unavailable, filesystem write failure, subprocess failure | fail fast, preserve context, bubble upward, retry only at orchestration boundaries |
| Programmer / invariant error | broken assumptions or impossible states | impossible state reached, missing dependency that should be guaranteed, internal bug | fail loudly, surface immediately, avoid silent fallback |
