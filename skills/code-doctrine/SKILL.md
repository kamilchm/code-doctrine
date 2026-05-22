---
name: code-doctrine
description: Shared code doctrine for agents. Enforces simplicity, explicit failure handling, domain-centered design, SQL-first data defaults, and pragmatic system architecture defaults.
license: MIT
---

# Code Doctrine

Use this skill to enforce consistent engineering standards during planning, design, implementation, review, and debugging.

## Quick routing guide

Start with the smallest matching reference file. Do not load every file unless the task genuinely spans multiple concerns.

| If you need... | Open this reference |
| --- | --- |
| foundational coding rules for code shape, parsing, boundaries, or error handling | `./coding-foundations-reference.md` |
| data and persistence rules for datastore choice, record lifecycle, write safety, or query performance | `./database-reference.md` |
| system architecture rules for interfaces, background work, concurrency, dependency boundaries, or web delivery | `./system-architecture-reference.md` |
| operability rules for observability, diagnostics, configuration, timeouts, limits, or operational commands | `./operability-reference.md` |
| documentation rules for lean docs, user-facing system shape, critical requirements or limitations, or executable playbooks | `./documentation-reference.md` |
| user interface rules for task-focused UX, simple screens, progressive disclosure, or distraction reduction | `./user-interface-reference.md` |
| change-safety rules for migrations, compatibility, backfills, repairs, or rollout safety | `./change-safety-reference.md` |
| testing rules for example-like tests, regressions, integration/e2e coverage, or realistic test boundaries | `./testing-reference.md` |
| enforcement guidance for planning, design handoff, implementation review, fail conditions, or final acceptance checks | `./enforcement-reference.md` |

## Failure classification table

Classify the problem before deciding how to handle it.

| If the failure is... | Treat it as... | Handle it by... |
| --- | --- | --- |
| an expected user or business-rule outcome | domain failure | model it explicitly and map it to a caller-facing response |
| IO, network, database, filesystem, subprocess, or infrastructure trouble | operational failure | surface it with context, bubble it upward, and retry only at higher orchestration boundaries |
| an impossible state, broken assumption, or bug | programmer / invariant failure | fail loudly and surface it immediately |

## Default rule groups

### Coding defaults

- **KISS** — prefer the simplest design that fully solves the task.
- **Explicit over clever** — favor flat, readable control flow and narrow interfaces.
- **Parse at boundaries** — turn raw input into stronger domain types once, instead of repeating validation downstream.
- **Domain-centered layout** — keep entrypoints thin, domain logic central, and infrastructure at the edges.
- **Rich errors and surfaced operational failures** — preserve context and do not bury infrastructure failures behind vague fallbacks.

### Data defaults

- **SQL-first persistence defaults** — prefer SQLite or Postgres, archive business records instead of deleting them by default, protect shared mutable updates with optimistic locking, and support known hot paths with proper indexes.

### System architecture defaults

- **CLI-first interfaces** — meaningful capabilities should exist as commands, with web or automation layers acting as thin adapters and HTTP interfaces mirroring user actions or domain operations.
- **Fast responses backed by persisted state** — do not block user-facing reads on slow recomputation or external calls.
- **Visible progress for user-requested background work** — queued work must not be a black box.
- **Database-backed async jobs by default** — use the current SQL database before introducing extra queueing infrastructure.
- **Actor-style stateful concurrency** — for concurrent or coordination-heavy subsystems, encapsulate mutable state behind sequential inbox-style processing and reducer-like state transitions.
- **Libraries over frameworks** — external dependencies must not dictate the shape of the codebase; keep dependency radius encapsulated inside domain-shaped modules.
- **SSR-first web apps** — for server-owned multi-user systems, prefer server-rendered HTML with progressive enhancement.

### Operability defaults

- **Observable and diagnosable systems** — emit enough structured signals to understand live behavior and failures without guesswork.
- **Executable operational interfaces** — codify deployment, maintenance, status, trace, and debugging operations as executable command-style scripts, preferably in the main system language.
- **Validated configuration** — parse configuration at startup and fail fast on invalid or missing required settings.
- **Explicit resource discipline** — use explicit timeouts, bounded concurrency, and bounded queues or buffers for external work.

### Documentation defaults

- **Lean user-facing documentation** — keep docs short and durable, avoid volatile implementation detail, document important system shape, use cases, prerequisites, and critical limitations, and prefer executable commands or examples over prose-only playbooks.

### User interface defaults

- **Simple task-focused interfaces** — design each screen around the user's immediate job, prefer tailored flows, good defaults, and progressive disclosure over generic dashboard sprawl, and remove distracting or low-value elements.

### Change safety defaults

- **Additive-first changes** — prefer changes that can roll out safely before cleanup or removal.
- **Compatibility-aware rollouts** — avoid requiring perfectly synchronized deploys across clients, workers, and data changes unless explicitly accepted.
- **Explicit migration and backfill paths** — codify schema changes, repairs, and backfills as observable operational work.

### Testing defaults

- **High-signal testing** — prefer example-like tests, regression tests for real bugs, and fast integration/e2e happy-path coverage over coverage chasing.
- **Realistic test boundaries** — prefer real local databases for persistence tests and recorded-response tests for external HTTP APIs over deep mocks.

## Immediate fail themes

Fail the design, implementation, or review when you find:

- **hidden operational failures** — silent handling, broad catch-and-continue, low-level retry loops with no explicit policy, or lossy errors that discard useful context
- **weak boundaries** — repeated downstream validation, severe package-boundary drift, or speculative abstraction that materially increases complexity without value
- **unjustified persistence or architecture choices** — non-SQL datastores, separate queue or workflow infrastructure without demonstrated need, framework-shaped code organization driven by dependencies, or SPA-heavy architecture without clear need in a server-owned multi-user app
- **misleading documentation** — docs that mirror volatile implementation details, omit critical user-facing requirements or limitations, or leave recurring maintenance and operational playbooks only as prose instead of executable tools
- **misdirected user interfaces** — screens overloaded with options, generic chrome, or competing calls to action that distract from the user's main job, or workflows fragmented across unnecessary screens or steps
- **missing safety or scalability safeguards** — hard deletion without explicit policy, silent lost updates, missing indexes for known hot paths, user-facing flows blocked on long-running work, missing progress visibility for requested background jobs, concurrent mutable state handled without clear sequential ownership where actors are warranted, operational procedures left as text-only playbooks instead of executable interfaces, weak observability, invalid config discovered too late, unbounded external work, unsafe rollout assumptions, or low-signal testing that misses real regressions or happy-path workflow coverage

## Reference files

Use progressive disclosure. Keep this skill focused on fast classification and routing, then load the detailed references only when needed.

- `./coding-foundations-reference.md` — use when the task is mainly about code structure, parsing, boundaries, abstraction, or error handling.
- `./database-reference.md` — use when the task is mainly about persistence, deletion policy, write safety, or query performance.
- `./system-architecture-reference.md` — use when the task is mainly about application shape, commands, jobs, concurrency, dependency boundaries, operational interfaces, or web architecture.
- `./operability-reference.md` — use when the task is mainly about observability, diagnostics, config validation, timeouts, limits, or operational/admin interfaces.
- `./documentation-reference.md` — use when the task is mainly about documentation scope, user-facing system shape, critical requirements or limitations, or executable playbooks.
- `./user-interface-reference.md` — use when the task is mainly about screen design, workflow UX, progressive disclosure, clarity, or distraction reduction.
- `./change-safety-reference.md` — use when the task is mainly about migrations, compatibility, rollout order, backfills, or repair safety.
- `./testing-reference.md` — use when the task is mainly about test strategy, regression coverage, integration/e2e scope, or realistic test boundaries.
- `./enforcement-reference.md` — use when the task is mainly about planning, design handoff, implementation review, fail gates, or final acceptance checks.

## Response policy

When invoking this skill:
1. Name the relevant doctrine briefly instead of restating the whole doctrine.
2. Open the smallest matching reference file before expanding to others.
3. Apply only the rules that materially affect the task.
4. Use `./enforcement-reference.md` when the task is primarily planning, design handoff, implementation review, or a final verdict.
