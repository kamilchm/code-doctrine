# Change Safety Reference

Use this reference when the task is mainly about migrations, compatibility, backfills, repairs, or rollout safety for live systems.

## Additive-first changes

- Prefer **additive-first changes** when evolving live systems.
- Add new schema, fields, interfaces, or commands before removing old ones.
- Favor rollout sequences that keep both old and new code paths safe during transition windows.

## Compatibility and rollout safety

- Avoid changes that require perfectly synchronized deployment across clients, servers, workers, and background jobs unless that constraint is explicitly accepted.
- Make interface, schema, and worker changes rollout-safe when practical.
- Separate deploy from long-running backfills, repairs, or recomputation work.
- Assume some components may be on slightly different versions during rollout and design boundaries accordingly.

## Explicit migrations, backfills, and repairs

- Treat migrations, backfills, and repairs as explicit operational work, not hidden side effects.
- Provide executable commands or scripts for schema changes, data repairs, and backfills.
- Make long-running change operations observable with status, progress, and failure reporting.
- Prefer resumable or restart-safe change procedures when the work may take meaningful time.

## Safety and recovery

- Think through rollback, retry, and forward-fix paths before making risky live changes.
- Do not combine too many unrelated live changes into one operational step when they can be split safely.
- Prefer migrations that leave the system understandable and recoverable if interrupted partway through.

## Examples

- **Additive schema rollout**: add a nullable column, deploy code that writes both paths, backfill, switch reads, then remove the old column later.
- **Compatibility-safe interface change**: introduce a new command or field while keeping the old one readable until all clients or workers have moved.
- **Explicit backfill**: `app system backfill-reports` runs separately from deploy, reports progress, and can be resumed safely.
- **Repair path**: a failed rollout has an explicit repair or forward-fix command instead of relying on undocumented manual SQL or shell history.
