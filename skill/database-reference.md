# Database Reference

Use this reference when the task touches persistence choice, record lifecycle, concurrent writes, or query performance.

## Datastore choice

- Default to relational SQL databases unless there is a concrete, demonstrated reason not to.
- Favor **SQLite** for simple local, embedded, single-node, or low-ceremony systems.
- Favor **Postgres** for networked, multi-user, production, or more operationally demanding systems.
- Do not introduce document, key-value, or other non-SQL datastores without an explicit, concrete need that SQL would handle poorly.

## Data lifecycle and deletion

- Prefer **archivization over deletion** for business records.
- Default to an explicit lifecycle status on the primary record, such as `active` / `archived`, when archived data still belongs naturally to the same model and is still queried alongside active data.
- Use dedicated archive tables when that makes retention, query simplicity, performance, storage management, or operational isolation materially cleaner.
- Hard deletion should be rare and justified by explicit requirements such as legal compliance, privacy, security, or strict storage constraints.

## Concurrent writes and optimistic locking

- Mutable records that can be concurrently updated must use **optimistic locking** via a version field or update timestamp checked at write time.
- Append-only inserts, immutable event records, and other non-overwriting writes do not need optimistic locking unless they participate in a concurrency-sensitive invariant.
- Concurrency conflicts are expected domain-level outcomes and should be surfaced explicitly, not silently overwritten.

## Query performance and indexes

- Known hot paths should be supported by proper indexes so performance does not predictably degrade as the database grows.
- Choose indexes from real access patterns such as filters, joins, ordering, and queue-selection paths, not from vague speculation.
- Do not over-index indiscriminately; indexes add write, storage, and maintenance cost, so each index should serve a clear path.

## Examples

- **Status field on primary record**: customer, account, user, subscription, order, or product records where archived items are still part of the same business entity and may still appear in normal reporting or admin workflows.
- **Archive table**: audit snapshots, historical exports, old ledger materializations, retired document revisions, or bulky historical rows that are mainly kept for retention, compliance, or infrequent lookup.
- **Use optimistic locking**: updating a user profile, changing order status, editing a document, updating inventory metadata, or modifying any shared mutable record that another actor may update concurrently.
- **Optimistic locking usually not needed**: inserting append-only audit events, immutable event-store records, log rows, or other write-once records that are never updated in place.
- **Use indexes for known hot paths**: lookup by user email, list orders by `(account_id, created_at)`, poll jobs by `(status, scheduled_at)`, or enforce fast joins on stable foreign-key access paths.
