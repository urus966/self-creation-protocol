# Conditional Quantum Mode Protocol (CQMP)

## Metadata

- Name: Conditional Quantum Mode Protocol (CQMP)
- Level: 2 Component — Decision Sub-protocol
- Status: Experimental

---

## Purpose

CQMP defines a controlled multi-branch decision evaluation mode.

The system MUST use CQMP only when linear reasoning is insufficient.

CQMP MUST NOT be the default mode of operation.

---

## Terminology

- Quantum (metaphor) — evaluation of multiple possible decision branches without requiring immediate deterministic resolution.
- Decision Cycle — a bounded decision evaluation process that starts when ambiguity is detected and ends with either a committed outcome or fallback.

---

## Core Principle

The system MUST operate linearly by default.

Non-linear ("quantum") mode MUST be:

- conditional
- bounded
- temporary

---

## Protocol Relationships

### Subordinate to

- Level 0 — Safety Floor
- Level 1 — Human Consent

### Operates under

- Level 2 — Organism Autonomy

### Interaction

- CQMP MAY follow EIP when ambiguity remains unresolved.
- CQMP MUST trigger Fallback Protocol if no viable actions exist.

---

## External Dependencies

- EIP — protocol responsible for detecting ambiguity or insufficient clarity in the environment.
- EIP MUST provide a boolean or structured signal indicating unresolved ambiguity between options.
- EIP (Error Illumination Protocol) reference: [guardrails/ERROR_ILLUMINATION_PROTOCOL.md](../../guardrails/ERROR_ILLUMINATION_PROTOCOL.md).
- Fallback Protocol (Notify + Stop)
- Fallback Protocol is defined as Level 5 default behavior: Notify + Stop.
- Fallback reference: [docs/protocols/Protocol_Hierarchy.md](./Protocol_Hierarchy.md) (Level 5 default behavior: Notify + Stop).

---

## Activation Conditions

CQMP MUST NOT activate unless ALL conditions are met:

- Multiple viable and permissible actions exist.
- Linear evaluation does not produce a single dominant action.

CQMP activation MUST be initiated by the decision process operating under Level 2 (Organism Autonomy).

---

## Behavior

While CQMP is active:

- The system MAY evaluate multiple possible actions.
- Evaluation MUST be bounded (time / iterations / compute).
- Bounds MUST be enforced by the execution system.
- The system MUST NOT require deterministic certainty before acting.
- Selection criteria MUST be defined by higher-level protocols or by system context.
- If no external selection criteria are defined, the system MUST prefer the least risky viable action according to Level 0 (Safety) and Level 1 (Human Consent).
- CQMP MUST NOT define its own optimization logic.
- Evaluation MUST converge to a single selected outcome within the same decision cycle.

Before execution, the system MUST validate the selected outcome against:

- Level 0 (Safety)
- Level 1 (Human Consent)

---

## Failure Mode

If evaluation fails to converge within the decision cycle:

→ The system MUST trigger Fallback Protocol (Notify + Stop).

If all evaluated actions become non-viable during evaluation, the system MUST trigger Fallback Protocol.

---

## Constraints

- CQMP MUST operate within a single decision cycle.
- CQMP MUST NOT re-enter within the same unresolved cycle.
- CQMP MUST exit immediately after a decision or fallback.
- CQMP MUST NOT override Level 0 or Level 1.
- CQMP MUST NOT modify protocol hierarchy.

---

## Exit Condition

After a decision or fallback:

→ The system MUST return to linear reasoning mode.

---

## Rationale

Linear reasoning can fail when multiple valid actions remain unresolved.

CQMP provides a controlled way to resolve such states without forcing arbitrary decisions.

CQMP does not introduce randomness.

It enables structured multi-branch evaluation within strict system boundaries.
