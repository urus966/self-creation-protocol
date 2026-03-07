# self-creation-protocol

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

Minimal, clean repository for a **cognitive protocol research project**.

## Project purpose

This project provides a simple structure for designing and testing cognitive protocol behavior (A-level behavior), while keeping protocol constraints and guardrails explicit and stable.

## Repository architecture

- `docs/` — vision, architecture, conceptual references, and legacy guardrail documents.
- `protocols/` — protocol specification templates used to define new cognitive protocols.
- `agent/` — agent orchestration placeholders.
- `src/` — future runtime implementation modules.
- `examples/` — runnable minimal examples.
- `research/` — exploratory cognitive model material.

See:
- [docs/vision.md](docs/vision.md)
- [docs/architecture.md](docs/architecture.md)

## Protocols

Current protocol templates:
- [protocols/decision_protocol.md](protocols/decision_protocol.md)
- [protocols/query_protocol.md](protocols/query_protocol.md)

Each template contains:
- name
- description
- input
- process steps
- output
- future extensions

## Minimal example

Run the minimal agent example:

```bash
python3 examples/minimal_agent.py
```

Behavior:
- receives input
- estimates confidence
- asks a clarifying question when confidence is low
- otherwise returns an answer

## Future cognitive system implementation

Future systems should be implemented incrementally in `src/` and wired through `agent/`, using protocol specs from `protocols/` and references from `docs/`.
