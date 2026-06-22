# Testing

Use this note when the task is mainly about test strategy, bug fixes, regression coverage, or realistic boundaries.

## Testing stance

- Prefer high-signal tests over chasing coverage numbers.
- Write tests that read like real usage of the API, CLI, or workflow.
- Keep the suite small enough to trust and fast enough to run often.

## What to test

- Add the smallest trustworthy regression test when fixing a real bug.
- Reproduce the original failure mode in the regression test when practical.
- Prioritize fast integration or e2e tests for important happy paths.
- Use unit tests for isolated logic when they make feedback meaningfully faster.
- Test at the natural boundary of the system when practical.
- In CLI-first systems, use the CLI as the test interface when practical.

## Realistic boundaries

- Prefer real local databases over database mocks when persistence behavior matters.
- Prefer recorded, VCR-style, snapshot, or fixture-backed HTTP tests over sprawling deep mocks.
- Use temp directories, isolated state, and controlled environment variables for CLI and integration tests.
