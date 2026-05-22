# Testing Reference

Use this reference when the task is mainly about test strategy, regression coverage, integration or e2e scope, or realistic test boundaries.

## Testing philosophy

- Prefer **high-signal tests** over large low-value test counts.
- Do not optimize for coverage metrics alone.
- Prefer tests that read like realistic example usage of the API or system.
- Keep the suite small enough to maintain confidently and fast enough to run often.

## Unit tests

- Use unit tests for isolated logic where they provide fast feedback.
- Use unit tests aggressively for regression coverage when real bugs are found.
- Do not force exhaustive unit coverage when it adds maintenance cost without proportional value.

## Integration and e2e tests

- Prioritize fast integration or e2e tests for the happy path of important user workflows and features.
- In CLI-first systems, use the CLI as the natural test interface when practical.
- Prefer tests that run with temp directories, isolated state, and controlled environment variables.
- Keep these tests fast enough to run frequently during normal development.

## Regression testing

- When a real bug is found, add the smallest test that would have caught it at the right level.
- Prefer regression tests that reproduce the real failure mode, not abstract approximations, unless a cheaper approximation is still trustworthy.

## Realistic test boundaries

- Avoid **database mocks** for persistence behavior.
- Prefer integration tests with a **real local database instance** so real schema, queries, transactions, migrations, and locking behavior are exercised.
- For external HTTP integrations, prefer **recorded-response**, **VCR-style**, or snapshot-style tests at the adapter boundary over deep hand-written mocks.
- Choose the most realistic test boundary that is still fast and maintainable.

## Examples

- **Example-like API test**: a test creates a user, submits an order, or runs a command the way a real caller would, then asserts the meaningful result.
- **CLI-first happy path**: an integration test uses a temp directory and env vars to run `app report build` or `app system status` and checks the real output.
- **Regression test**: a bug found in production gets a focused test that reproduces the original failure before the fix is accepted.
- **Real DB boundary**: a persistence test boots a local Postgres or SQLite instance and exercises the real repository or query code instead of mocking the database layer.
- **Recorded HTTP boundary**: an adapter test replays a captured external API interaction so parsing and integration behavior stay realistic without live network dependence.
