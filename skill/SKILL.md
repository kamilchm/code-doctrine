---
name: code-doctrine
description: Shared software-engineering doctrine for planning, implementation, refactoring, debugging, review, and testing. Enforces simple designs, explicit failures, strong boundaries, safe changes, and high-signal tests.
license: MIT
---

# Code Doctrine

Use this skill for non-trivial software-engineering work. Keep it light: start here, then open only the smallest note that matches the task.

## Default stance

- Solve the concrete problem with the smallest correct change.
- Prefer explicit control flow and narrow interfaces over clever abstractions.
- Parse and validate raw input at boundaries instead of repeating checks downstream.
- Keep domain logic central and dependencies at the edges.
- Surface operational failures with context; do not hide them behind vague fallbacks.
- Prefer tests that prove behavior over tests that inflate coverage.

## Load only what you need

| If you need... | Open |
| --- | --- |
| code shape, boundaries, parsing, abstraction, error handling | `./core.md` |
| module boundaries, persistence, async work, operability, docs, UI, rollout safety | `./architecture.md` |
| regression strategy, integration scope, realistic test boundaries | `./testing.md` |
| planning, review gates, and acceptance checks | `./review.md` |
| large specs, phased work, completion criteria | `./planning.md` |

Do not load every file by default. Most tasks need one note, sometimes two.

## Failure model

Classify failures before deciding how to handle them:

- **domain failure**: expected business or user-facing outcome; model it explicitly
- **operational failure**: IO, network, database, filesystem, subprocess, or infrastructure trouble; bubble it upward with context
- **programmer failure**: broken assumption or impossible state; fail loudly

## Default fail themes

Rethink the design or change when you see:

- hidden operational failures or vague error handling
- unnecessary complexity or speculative abstraction
- weak boundaries or repeated downstream validation
- unsafe rollout or migration assumptions for live systems
- low-signal tests that miss realistic workflow coverage

## Response policy

1. Name the relevant doctrine briefly instead of repeating the whole skill.
2. Open the smallest matching note before expanding further.
3. Apply only the rules that materially affect the task.
4. Use `./review.md` when planning work, reviewing code, or making a final acceptance call.
5. Use `./planning.md` first for large specifications or multi-phase work.
