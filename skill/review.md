# Review

Use this note when planning work, reviewing code, or deciding whether a change is ready. Combine it with the smallest concern note when more detail is needed.

## Planning

- Break work into the smallest meaningful slices.
- Reject layer-first decomposition unless necessary.
- Avoid tasks whose only purpose is abstraction, technical ceremony, plumbing, or generic helpers.
- Prefer plans that deliver user-visible or system-meaningful value incrementally.
- Each slice should leave the system runnable and prove one meaningful behavior change.

## Design and implementation stance

- Specify and implement the simplest architecture that fits the slice.
- Separate domain failures from operational failures.
- Parse inputs at boundaries and preserve rich error context.
- Keep interfaces narrow and package placement domain-centered.
- Expose meaningful capabilities through commands or command-shaped operations, keeping HTTP, UI, automation, and jobs thin.
- Use SQL persistence by default unless a concrete requirement justifies otherwise.
- Prefer archival lifecycle design over hard deletion for business records.
- Protect mutable shared records with optimistic locking and explicit conflict errors.
- Support known hot paths with indexes, without speculative index sprawl.
- Return user-facing responses from persisted state and queue slow work durably.
- Expose persisted progress or status for user-requested background jobs.
- Use the existing SQL database for queues/workflows before adding separate infrastructure.
- Keep concurrency-heavy mutable state behind clear sequential ownership.
- Keep third-party dependencies behind domain-shaped adapters.
- Default server-owned multi-user web surfaces to SSR with progressive enhancement.
- Emit structured diagnostics and expose repeated operational procedures as executable commands.
- Validate configuration at startup and bound external work with timeouts and limits.
- Prefer additive, rollout-safe live changes with explicit migrations, backfills, and repairs.
- Keep docs lean and user-facing; update them when commands, workflows, requirements, or critical limitations change.
- Keep screens task-focused, simple, and progressively disclosed.
- Add high-signal tests at realistic boundaries.

## Review gates

Reject or revise a change when materially present:

- operational errors are swallowed, hidden, retried in leaf code without policy, or stripped of context
- abstraction or indirection increased without a real boundary or reuse need
- simple functions bury the happy path under nested edge-case handling
- validation is repeated downstream instead of parsing once at the boundary
- dependencies or framework concepts leak into core domain code
- one clear user action is fragmented across handlers or calls when one command-shaped operation fits better
- non-SQL persistence, separate queues, or workflow systems are introduced without concrete need
- business records are hard-deleted without explicit policy
- shared mutable writes can silently overwrite newer state
- known hot paths lack supporting indexes
- long-running work blocks the user path when durable background work is practical
- user-requested background work has no visible status or progress
- recurring operational procedures remain prose-only instead of executable commands or tools
- important configuration is discovered invalid only deep into runtime
- external work lacks needed timeouts, limits, or bounded concurrency
- docs mirror volatile internals, omit critical limitations, or fail to change with user-facing behavior
- screens are overloaded, generic, distracting, or split routine workflows across unnecessary steps
- live-system changes assume unsafe rollout, migration, or version synchronization behavior
- tests are coverage-driven, mock-heavy, or miss important workflows and real regressions

Pass with notes when the issue is stylistic or mild and does not materially harm maintainability, safety, or operability.

## Acceptance checklist

Before accepting a design or implementation, ask:

- Is this the simplest thing that fully works?
- Are expected domain failures modeled separately from operational failures?
- Are operational failures surfaced with enough context to debug?
- Are boundaries clear, with parsing and validation at the edges?
- For simple functions, is the happy path still visible at top-level indentation?
- If there is only one implementation and caller, did we avoid unnecessary interfaces?
- Does dependency structure follow the domain instead of the framework?
- Does the feature map cleanly to one command or operation boundary?
- Is persistence SQL-first, lifecycle-safe, concurrency-safe, and indexed for known hot paths?
- Do long-running or user-requested background jobs persist status and avoid blocking reads?
- Are operational tasks executable, diagnostics structured, config validated, and resources bounded?
- If the change touches live behavior, is rollout, migration, backfill, repair, and compatibility safe and explicit?
- Did docs change where commands, workflows, requirements, or critical limitations changed?
- Is the UI focused on the primary user task with progressive disclosure of complexity?
- Do tests prove important behavior at realistic boundaries?

If the answer is no to any material question, revise the plan, implementation, or review verdict.
