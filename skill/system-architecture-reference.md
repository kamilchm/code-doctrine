# System Architecture Reference

Use this reference when the task is mainly about application interfaces, long-running work, queue design, dependency boundaries, concurrency, or web architecture.

## CLI-first interfaces

- Prefer **CLI-first application interfaces**. Every meaningful system capability should exist first as a command with explicit inputs and outputs.
- Web UI, HTTP handlers, background workers, and automation should be thin adapters over the same underlying domain operations.
- Prefer **action-shaped HTTP interfaces**. One meaningful user action should usually map to one domain operation and one API operation.
- Do not force HTTP interfaces into resource-shaped REST decomposition when the natural boundary is a command or operation. Plain JSON over HTTP is fine; the important thing is the operation shape, not a specific protocol style.
- If a feature cannot be expressed clearly as a command, the feature boundary is probably still unclear.

## Fast responses backed by persisted state

- Prefer **fast user-facing responses backed by persisted state**. User-facing reads should return data already stored in the database, not wait on slow external systems or fresh recomputation.
- If data is missing, stale, or not yet computed, persist a job and return the current known state instead of blocking the response.
- Add explicit read models, precomputed tables, or other persisted projections when needed to keep user-facing reads fast.
- Model background job state explicitly in persisted storage, for example `queued`, `running`, `completed`, or `failed`.

## Visible progress for requested background work

- When the user explicitly requested data or processing that continues in the background, expose a visible progress or status indicator so the work is not a black box.
- Progress indicators can be coarse, such as `queued`, `running`, `completed`, `failed`, percentage complete, current step, or last completed checkpoint, but they should be persisted and user-visible.

## Database-backed async jobs by default

- Prefer **database-backed async jobs by default**. Use the existing SQL database as queue and workflow storage unless there is a concrete demonstrated need for separate queueing infrastructure.
- Keep workers simple and explicit. Avoid introducing brokers, orchestration layers, or workflow systems unless the current database approach is clearly insufficient.

## Actor-style stateful concurrency

- For concurrent, parallel, distributed, or coordination-heavy subsystems, prefer an **actor-style model** where one component owns one mutable state boundary.
- Treat the actor as a **unit of sequentiality**. Messages or commands go through its inbox, queue, or mailbox and are processed one at a time.
- Encapsulate mutable state behind that sequential command-processing boundary instead of spreading writes across threads, handlers, or cooperating services without a clear owner.
- Model state changes as **reducer-like transitions**: take previous state plus command or event, compute next state explicitly, then persist state changes or emit follow-up effects.
- Keep effects explicit. The important property is not a specific framework, but clear state ownership, serialized command handling, and understandable next-state computation.
- Split actors around true sequential boundaries. Anything that does not need the same state owner can be broken out and run independently.
- This is a default for concurrent systems, not a mandate to wrap every simple CRUD path in a formal actor framework.

## Libraries over frameworks

- Prefer **libraries over frameworks**. External dependencies should help implement the system, not dictate the system's structure.
- No external dependency should determine the top-level shape of packages, modules, domain boundaries, or core business flow unless there is a clear, explicit decision to accept that tradeoff.
- Keep dependency radius small. Encapsulate third-party libraries inside modules or adapters that present domain-shaped APIs to the rest of the system.
- Let the domain own naming, workflows, and boundaries. Do not leak framework concepts, types, lifecycle hooks, or directory structure deep into core code without need.
- Frameworks can still be useful at entrypoints or infrastructure edges, but they should stay at the edges rather than becoming the organizing principle of the whole codebase.
- If replacing a library would require reshaping the whole domain layer, the dependency radius is probably too large.

## SSR-first web apps

- Prefer **SSR-first web apps** for server-owned multi-user systems. Start with server-rendered HTML and progressive enhancement rather than SPA-heavy client architecture.
- Keep business logic and state transitions on the server. Use JavaScript for enhancement, partial updates, and interaction polish, not as the primary source of application truth.
- Local-first or SPA-heavy architectures can still be appropriate for offline-first, graphics-heavy, or strongly client-owned applications, but they should be justified explicitly.

## Examples

- **CLI-first interface**: `app order create`, `app report monthly`, `app job retry`, or `app health check` exist as named commands before or alongside web adapters.
- **Action-shaped HTTP interface**: a user presses "rebuild report" or "submit order" and the client makes one plain HTTP call that invokes the matching domain command, instead of coordinating several resource-oriented REST calls to simulate one action.
- **Fast response plus async job**: a user requests a report, import, or expensive aggregation; the system returns the current persisted state immediately and queues background work to compute or refresh missing data.
- **Visible progress for background work**: after requesting an import, report build, or large recalculation, the user can see whether the job is queued, running, stalled, failed, or completed, and ideally what step is currently in progress.
- **Database-backed job queue**: jobs live in Postgres or SQLite tables with status, timestamps, retry metadata, and worker ownership instead of requiring a separate broker by default.
- **Actor-style concurrent subsystem**: an order coordinator, workflow runner, or session/process manager owns its state, receives commands through a queue, and computes explicit next-state transitions instead of sharing mutable state across concurrent workers.
- **Library-over-framework boundary**: the system uses a router, ORM, or UI helper inside adapters, but domain services and modules expose business-shaped interfaces instead of framework-shaped ones.
- **SSR-first web app**: a multi-user admin or operations interface renders HTML on the server and enhances interactions with forms, partial updates, or lightweight JavaScript instead of duplicating domain logic in a SPA.
