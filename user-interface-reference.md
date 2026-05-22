# User Interface Reference

Use this reference when the task is mainly about screen design, interaction flow, layout priorities, visual clutter, form design, or deciding what the user should see and do first.

## Design for the user's immediate job

- Start with the user's **main task**, not with a list of available features.
- Prefer interfaces tailored to a specific workflow over generic multi-purpose screens that try to expose everything at once.
- Make the primary action, current status, and next step obvious.
- Keep related information and controls close together so users do not have to hunt across the interface to finish one job.

## Prefer simplicity over screen complexity

- Prefer **simple, focused interfaces** over dense dashboards, control panels, or settings-heavy screens.
- Every visible element should earn its place by helping the user decide, understand, or act.
- Remove decorative noise, duplicate navigation, secondary metrics, and low-value controls when they distract from the main task.
- Prefer a small number of clear choices and strong defaults over broad upfront configurability.

## Use progressive disclosure

- Hide advanced, dangerous, or infrequent options until the user actually needs them.
- Keep the common path short and obvious; let edge cases expand from there.
- Do not force every user to understand expert options just to complete routine work.
- Break up complexity only when it truly clarifies the workflow; avoid splitting one coherent task across multiple screens, modals, or wizards without need.

## Clarity over fashion

- Prefer plain language, clear labels, and obvious affordances over clever wording or trendy interaction patterns.
- Make important state, errors, validation, and consequences visible where the user needs them.
- Let the interface support the work quietly instead of competing for attention.
- Novel UI patterns are justified only when they materially improve comprehension or task completion.

## Respect attention and interruption cost

- Treat the user's attention as scarce.
- Avoid unnecessary confirmations, popups, banners, animations, or competing calls to action.
- Interrupt only for destructive, irreversible, security-sensitive, or genuinely exceptional situations.
- Routine actions should feel direct and unsurprising.

## Examples

- **Good task-focused screen**: an order shipping page shows the order state, missing prerequisites, the primary shipping action, and only the few secondary controls that matter right now.
- **Good progressive disclosure**: an advanced filter drawer stays collapsed by default while the common search path remains fast and obvious.
- **Bad overloaded screen**: one admin page mixes system status, analytics, configuration, debugging toggles, and primary workflow actions so the user's next step is unclear.
- **Bad fragmented workflow**: a simple publish action requires stepping through several modal dialogs and summary screens even though one clear form with good defaults would suffice.
