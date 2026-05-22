# Enforcement Reference

Use this reference when planning, implementing, or reviewing against the code doctrine.
Combine it with the smallest matching concern reference when you need more detail:

- `./coding-foundations-reference.md`
- `./database-reference.md`
- `./system-architecture-reference.md`
- `./operability-reference.md`
- `./documentation-reference.md`
- `./user-interface-reference.md`
- `./change-safety-reference.md`
- `./testing-reference.md`

## Guidance by activity

### Planning
- Break work into the simplest meaningful slices.
- Reject layer-first decomposition unless absolutely necessary.
- Avoid tasks whose only purpose is abstraction, generic plumbing, or technical ceremony.
- Prefer plans that deliver user-visible or system-meaningful value incrementally.

### Design and handoff
- Specify the simplest architecture that fits the slice.
- Separate domain failures from operational failures.
- Require parsing at boundaries and rich error context.
- Avoid recommending low-level retry logic unless explicitly required.
- Favor narrow interfaces and clear package placement.
- Prefer CLI-first feature boundaries so web, automation, and jobs stay thin adapters over shared domain operations.
- Prefer HTTP interfaces that map one meaningful user action to one operation instead of fragmenting commands across resource-oriented REST choreography.
- Prefer SQLite or Postgres by default unless a concrete requirement justifies a different datastore.
- Prefer archival lifecycle design over hard deletion for business records, using status fields by default and archive tables when operationally cleaner.
- Require optimistic locking for mutable records that can be concurrently updated, using version or timestamp checks.
- Identify known hot paths early and specify the indexes that support their filters, joins, ordering, or queue polling behavior.
- Design user-facing flows to return quickly from persisted state and queue long-running work instead of coupling responses to background processing.
- Require visible progress or status indicators for user-requested background work so users can see that queued processing is advancing.
- Prefer the existing SQL database for queue and workflow storage unless a concrete requirement justifies additional queueing infrastructure.
- For concurrent or coordination-heavy subsystems, prefer actor-style state ownership with sequential inbox-style command handling.
- Prefer libraries over frameworks so third-party dependencies stay encapsulated behind domain-shaped modules.
- Prefer SSR-first delivery for server-owned multi-user web apps, using progressive enhancement instead of SPA-heavy designs by default.
- Prefer observable, diagnosable systems with explicit operational interfaces.
- Prefer lean, durable documentation that explains user-facing system shape, important workflows, requirements, and critical limitations without freezing volatile implementation details.
- Prefer simple, task-focused user interfaces with clear primary actions, good defaults, and progressive disclosure instead of overloaded generic screens.
- Prefer executable operational/admin interfaces and runnable examples over prose-only playbooks where the behavior can be encoded directly.
- Prefer additive-first migrations and rollout-safe compatibility boundaries for live changes.
- Require explicit startup validation for configuration and explicit timeout or resource discipline for external work.
- Prefer executable operational/admin interfaces over text-only maintenance playbooks.
- Prefer high-signal testing over coverage chasing, with fast integration/e2e happy-path coverage for important workflows.

### Implementation
- Implement without speculative abstraction.
- Do not swallow operational errors.
- Preserve error context.
- Parse boundary inputs into stronger types when appropriate.
- Keep package placement domain-centered and dependency direction clear.
- Expose meaningful capabilities through commands or command-shaped operations, then keep HTTP or UI layers thin.
- Keep HTTP handlers action-shaped and thin, so one client action can invoke one domain operation where that is the natural boundary.
- Default new persistence work to SQLite or Postgres unless there is an explicit approved reason not to.
- Implement archival flows before reaching for hard delete paths, preferring status fields first and archive tables when they materially simplify operations.
- Guard concurrent updates to mutable records with optimistic locking and return explicit conflict errors on stale versions.
- Add or adjust indexes for known hot paths so performance remains acceptable as tables grow, but avoid speculative index sprawl.
- Return user-facing responses from persisted state and queue slow imports, recomputation, or third-party work in durable background jobs.
- Persist explicit job status and results, adding read-model or precomputed tables when needed to keep reads fast.
- Expose persisted progress or status for user-requested background jobs, at least enough for the user to understand whether work is queued, running, completed, or failed.
- Start background work with the existing SQL database as the queue unless there is an explicit approved reason to introduce a separate system.
- In concurrent subsystems, keep mutable state behind a single owner and compute state transitions explicitly from prior state plus command or event.
- Keep third-party dependencies behind adapters or modules with business-shaped APIs instead of letting framework concepts spread through core code.
- Codify recurring deployment, maintenance, status, trace, and debugging workflows as executable commands, preferably in the main system language.
- Keep documentation concise and user-facing; avoid prose that duplicates volatile implementation details.
- Update docs when commands, workflows, requirements, or critical limitations change.
- Prefer command help, executable examples, and scripts over prose-only maintenance playbooks.
- Keep screens focused on the user's immediate job; demote or hide secondary options instead of crowding the primary workflow.
- Use progressive disclosure, strong defaults, and plain language so common tasks stay fast and obvious.
- Default server-owned multi-user web surfaces to server-rendered HTML with progressive enhancement.
- Emit enough structured diagnostics to understand live behavior, background work, and failures without guesswork.
- Parse configuration at startup and fail fast on invalid or missing required settings.
- Use explicit timeouts, bounded concurrency, and bounded queues or buffers for external work.
- Prefer additive-first live changes, explicit migration or backfill commands, and rollout-safe compatibility when evolving the system.
- Add tests that read like realistic example usage of the system instead of maximizing low-value test counts.
- Turn important real bugs into regression tests at the smallest trustworthy level.
- Prefer fast integration/e2e tests for important happy-path workflows, especially when the system is CLI-first.
- Prefer real local database instances over DB mocks for persistence behavior.
- Prefer recorded-response or VCR-style tests for external HTTP integrations over deep hand-written mocks.

### Review
Treat these as review gates.

#### Coding foundations failures
- silent handling of operational errors
- broad catch-and-continue without justification
- low-level retry loops with no explicit policy
- lossy errors that discard useful context
- validation-only patterns where boundary parsing should create stronger types
- severe package-boundary drift
- speculative or generic abstraction that materially increases complexity without value

#### Data and database failures
- non-SQL datastore choices without a concrete justified need
- hard deletion of business records without an explicit requirement or policy
- write paths that allow silent lost updates instead of optimistic locking
- known hot paths left without supporting indexes such that growth will predictably degrade performance

#### System architecture failures
- HTTP interfaces structured around REST resource fashion even when that fragments one user action across multiple calls instead of exposing a natural command or operation boundary
- user-facing responses blocked on long-running background work instead of returning persisted state and queueing the work
- UI reads coupled directly to slow third-party calls or fresh heavy recomputation where persisted read models should exist
- user-requested background jobs that run without visible progress or status feedback
- separate queue or workflow infrastructure introduced without a concrete demonstrated need beyond the current SQL database
- concurrent mutable state spread across multiple workers or handlers without clear sequential ownership where an actor-style boundary is warranted
- framework or dependency concepts leaking through core domain code such that the dependency dictates the shape of the codebase
- SPA-heavy client architecture introduced without a clear justified need in a server-owned multi-user application

#### Operability failures
- important operational or admin procedures left as text-only documentation instead of executable command interfaces
- missing structured diagnostics such that operators cannot reliably inspect live behavior or failures
- invalid or missing critical configuration discovered only deep into runtime instead of at startup
- external work running without explicit timeouts, limits, or bounded concurrency where resource discipline matters

#### Documentation failures
- documentation that mirrors volatile implementation details instead of stable user-facing behavior, interfaces, or operator contracts
- missing documentation for critical prerequisites, requirements, limitations, or sharp edges whose omission would make the system misleading or unusable
- recurring maintenance or operational playbooks left mainly as prose where executable commands, scripts, or validated examples should exist

#### User interface failures
- screens overloaded with controls, metrics, navigation, or visual noise such that the primary task is no longer obvious
- generic multi-purpose screens or workflows used where a simpler task-focused interface would be clearer
- important actions, states, requirements, or errors hidden behind unclear labels, weak affordances, or distracting presentation
- routine workflows split across unnecessary steps, modals, or confirmations that add friction without improving clarity or safety

#### Change safety failures
- risky live changes structured as destructive or synchronized-only rollouts when additive rollout-safe sequencing was practical
- schema, interface, or worker changes that assume perfect version synchronization without explicit acceptance of that risk
- migrations, backfills, or repairs hidden inside deploy paths without explicit commands, observability, or recovery thinking

#### Testing failures
- tests added mainly to chase coverage numbers without clear behavioral value
- important real bugs left without regression coverage where recurrence risk is meaningful
- important happy-path workflows missing fast integration or e2e coverage
- persistence behavior tested mainly through DB mocks instead of a real local database instance
- external HTTP integrations tested through sprawling deep mocks where recorded-response tests would be clearer and more realistic

**PASS WITH NOTES** when the issue is stylistic or mild and does not materially harm maintainability.

## Final checklist

Before accepting a design or implementation, ask:

### Coding foundations
- Is this the simplest thing that works?
- Are expected domain failures modeled explicitly?
- Are operational failures bubbled upward with context?
- Is raw input parsed at the boundary into stronger types?
- Does package layout keep domain logic central and infrastructure at the edges?
- Are errors rich, contextual, and cause-preserving?
- Are interfaces narrow and justified?

### Data and database
- Is the datastore choice a justified SQL-first default?
- Are records archived instead of deleted unless hard deletion is explicitly required, with a clear choice between status fields and archive tables?
- Are concurrent updates to mutable records protected by optimistic locking?
- Are known hot paths supported by the right indexes without adding speculative index bloat?

### System architecture
- Can the feature be expressed clearly as a command with thin HTTP or UI adapters?
- Does one meaningful user action map to one natural API or command operation where appropriate?
- Do user-facing responses return from persisted state while long-running work is queued durably in the background?
- Can the user see visible persisted progress or status for requested background work?
- Is the existing SQL database sufficient for queue storage here, or is extra infrastructure explicitly justified?
- For concurrency-heavy state, is mutable state encapsulated behind sequential command processing with explicit next-state transitions?
- Are external dependencies encapsulated behind domain-shaped modules instead of shaping the whole codebase?
- Is the web surface SSR-first by default for this server-owned multi-user application?

### Operability
- Are recurring operational tasks and diagnostics available as executable commands rather than only as written instructions?
- Does the system emit enough structured diagnostics to understand live behavior and failures?
- Is configuration parsed and validated at startup?
- Do external operations use explicit timeouts and sensible resource bounds?

### Documentation
- Do docs stay focused on stable user-facing system shape, workflows, requirements, and critical limitations?
- Have volatile implementation details been left in code, tests, examples, or command help instead of long prose?
- Are recurring maintenance and operational procedures available as executable commands, scripts, or validated examples?

### User interface
- Is the primary user task obvious on each screen?
- Have low-value controls, metrics, and distractions been removed or demoted?
- Do defaults, labels, and layout make the common path clear without forcing users through expert-only options?
- Is complexity revealed progressively instead of all at once?

### Change safety
- Are live changes structured additively when practical?
- Are migrations, backfills, and repairs explicit, observable, and safe to run separately from deploy?
- Are compatibility and rollout assumptions explicit rather than depending on perfect synchronization?

### Testing
- Are the tests high-signal rather than coverage-driven?
- Do important APIs or features have tests that read like realistic example usage?
- Are important real bugs covered by regression tests?
- Do important happy-path workflows have fast integration or e2e coverage?
- Are persistence tests using a real local database boundary where behavior matters?
- Are external HTTP integrations tested with recorded responses rather than deep mocks where practical?

If the answer is no to any of these, revise the plan, implementation, or review verdict accordingly.
