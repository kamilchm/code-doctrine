# Operability Reference

Use this reference when the task is mainly about observability, diagnostics, configuration, timeouts, resource limits, or operational and admin interfaces.

## Observability and diagnosability

- Prefer **structured diagnostics** over ad hoc text output when systems need to be inspected in production.
- Emit signals at important domain and operational boundaries so the live system can explain what it is doing.
- Include stable identifiers where practical so requests, jobs, entities, and background work can be correlated across logs, status output, and traces.
- Important background work should expose enough state to diagnose behavior, such as status, timestamps, attempts, current step, and recent failures.
- Do not make dashboards the only way to understand the system. Core diagnostics should also be retrievable through executable operational interfaces.

## Executable operational interfaces

- Prefer **executable operational interfaces** over text-only operational playbooks.
- Deployment, maintenance, status gathering, tracing, repair, and debugging operations should be codified as executable command-style scripts or commands.
- Prefer command shapes such as `app system deploy`, `app system status`, `app system trace`, or similarly explicit operational entrypoints.
- Treat operational and admin capabilities as part of the system interface, not as tribal knowledge hidden in docs or copied shell snippets.
- Prefer implementing these operational interfaces in the **main system language** when practical, so they can reuse domain logic, parsing, validation, data access, and error handling instead of duplicating logic in ad hoc shell scripts.
- Shell scripts are still acceptable for thin wrappers or environment glue, but core operational logic should live in executable program code when that keeps behavior consistent with the system itself.
- If operators repeatedly need to perform an action or ask the system an operational question, that should usually become a command.
- When a prose playbook keeps growing, treat that as a sign the system should gain a better executable tool instead of more documentation.
- Keep operational prose thin: explain when to run the tool, its inputs, and its risks, but let the tool embody the procedure itself.

## Configuration and startup validation

- Configuration should be explicit and parsed at startup.
- Fail fast on missing or invalid required configuration.
- Avoid hidden defaults for critical production settings.
- Keep configuration boundaries narrow and visible.
- Parse configuration into typed internal values instead of passing raw environment strings throughout the system.

## Resource and timeout discipline

- External IO, subprocesses, database calls, and network operations should have explicit timeouts or time budgets.
- Prefer bounded concurrency and bounded queues or buffers instead of unbounded parallelism or accumulation.
- Let cancellation and time budgets propagate where practical.
- Do not hide retry behavior in deep leaf code; timeouts, retries, and escalation policy belong at orchestration boundaries.

## Examples

- **Structured diagnostics**: a job runner emits job id, attempt, queue, status, started-at, and current step so operators can understand stalls and failures.
- **Executable operational interface**: `app system status` reports queue depth, last successful sync, migration version, and unhealthy dependencies without requiring a manual playbook.
- **Startup validation**: the process refuses to start if a required database URL, API key, or storage path is missing or malformed.
- **Explicit resource discipline**: outbound API calls use explicit timeouts and worker pools stay bounded instead of spawning uncontrolled parallel work.
