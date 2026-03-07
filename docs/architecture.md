# Architecture

## Repository Layers

- `docs/` — conceptual references, project direction, architecture, and legacy protocol docs.
- `protocols/` — minimal protocol specification templates.
- `agent/` — agent-facing interfaces and orchestration placeholders.
- `src/` — implementation modules for future cognitive runtime.
- `examples/` — runnable minimal examples.
- `research/` — exploratory models and drafts.

## Minimal Cognitive Flow

1. User input is received.
2. Agent estimates confidence.
3. If confidence is low, the system asks a clarifying question.
4. If confidence is sufficient, the system returns an answer.

## Guardrail Constraint

The cognitive system reads guardrails as constraints and does not edit them directly.
