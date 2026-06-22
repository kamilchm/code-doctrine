# Architecture

Use this note when the task touches module boundaries, persistence, background work, operability, documentation, UI, or change safety.

## Dependency shape

- Organize around domain boundaries, not framework conventions.
- Keep third-party dependencies behind adapters or narrow modules with business-shaped APIs.
- Add indirection only for a real boundary, not as ceremony.
- Every meaningful capability should be expressible as a command or command-shaped operation.
- Keep HTTP, UI, automation, and worker layers thin adapters over the same domain operations.
- Prefer action-shaped HTTP interfaces when one meaningful user action maps naturally to one operation; do not split a coherent command into REST choreography just for fashion.
- For server-owned multi-user web apps, default to SSR with progressive enhancement unless a client-owned, offline-first, or graphics-heavy requirement justifies SPA-heavy architecture.

## Persistence and long-running work

- Default to SQL unless there is a concrete reason not to.
- Favor SQLite for simple local, embedded, single-node, or low-ceremony systems.
- Favor Postgres for networked, multi-user, production, or operationally demanding systems.
- Prefer archival over hard deletion for business records unless deletion is explicitly required.
- Use a lifecycle status when archived records still belong naturally to the same model; use archive tables when retention, query simplicity, performance, or operational isolation is cleaner.
- Guard shared mutable records with optimistic locking and surface stale-write conflicts explicitly.
- Add indexes for known hot paths based on real filters, joins, ordering, or queue polling; avoid speculative index sprawl.
- User-facing reads should return from persisted state when practical.
- Long-running work should usually become durable background work instead of blocking the user path.
- Persist enough job status for users and operators to see whether work is queued, running, completed, failed, or stalled.
- Use the existing SQL database as queue and workflow storage before adding brokers or workflow infrastructure.

## Stateful concurrency

- For coordination-heavy mutable state, prefer one clear state owner with sequential inbox-style command handling.
- Treat actors as units of sequentiality, not as a mandate to wrap every CRUD path in an actor framework.
- Model state transitions as reducer-like steps from previous state plus command/event to next state.
- Keep effects explicit and split actors around true sequential boundaries.

## Operability

- Emit structured logs or equivalent diagnostics at important domain and operational boundaries.
- Include stable ids, counts, durations, attempts, steps, and status where they help reconstruct behavior.
- Turn repeated deploy, status, trace, repair, and debugging procedures into executable commands or tools, preferably in the main system language.
- Do not leave recurring operational playbooks as prose-only instructions when behavior can be encoded.
- Parse configuration at startup and fail fast on invalid required settings.
- External IO, subprocesses, database calls, and network operations should have explicit timeouts or time budgets.
- Prefer bounded worker pools, queues, and buffers over unbounded fan-out.
- Do not hide retries in low-level helpers; retries and escalation policy belong at orchestration boundaries.

## Documentation and product surface

- Prefer lean, durable documentation over exhaustive narrative that will drift.
- Document stable user-facing shape: purpose, main workflows, commands, interfaces, prerequisites, critical limitations, lifecycle states, and failure modes callers or operators must understand.
- Avoid prose that mirrors volatile internal implementation details; fix unclear code, command help, examples, or tests instead.
- Update docs when user-facing behavior, commands, requirements, or sharp edges change.
- Prefer runnable examples and executable tools over prose-only maintenance instructions.

## User interface

- Design screens around the user's immediate job, not a list of available features.
- Make the primary action, current status, next step, important errors, and consequences obvious.
- Prefer simple, focused workflows over dense dashboards or generic multi-purpose screens.
- Remove decorative noise, duplicate navigation, secondary metrics, and low-value controls when they distract from the main task.
- Use strong defaults and progressive disclosure for advanced, dangerous, or infrequent options.
- Avoid splitting one coherent task across unnecessary screens, modals, confirmations, or wizard steps.

## Change safety

- Prefer additive changes over synchronized breakage for live systems.
- Add new schema, fields, interfaces, or commands before removing old ones.
- Avoid designs requiring every client, worker, and deploy target to upgrade in lockstep unless that risk is explicit and accepted.
- Keep migrations, backfills, repairs, and recomputation explicit, observable, and separate from deploy when practical.
- Prefer resumable or restart-safe procedures for long-running change work.
- Think through rollback, retry, and forward-fix paths before risky live changes.
