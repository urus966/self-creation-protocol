# Error Illumination Protocol (EIP)

## Objective
Introduce the Error Illumination Protocol (EIP) — a mechanism for detecting and exposing errors without turning the human into the error. This protocol defines how the system relates to mistakes, inconsistencies, and breakdowns without enforcing correction or action.

## Rationale
Most systems treat errors as:
- something to eliminate
- something to fix immediately
- something that implies failure

This creates pressure, false urgency, and self-identification with error. Self-creation requires a different approach:
> An error may exist without requiring resolution.

## Definition: Error Illumination Protocol (EIP)
Error Illumination means:
- making an error visible
- without judgment
- without urgency
- without enforced action

EIP separates:
- error detection
- from error correction

## Core Principles

### 1. Visibility Without Obligation
An error may be illuminated without creating:
- tasks
- deadlines
- corrective actions

Illumination ≠ intervention.

### 2. Non-Identity Principle
The protocol must never imply:
- “you are the error”
- “you caused the error”
- “you must fix the error”

Errors belong to states and processes, not to persons.

### 3. Presence Space Compatibility
EIP must fully respect Presence Space. If the system is in Presence Space:
- errors may be visible
- but no transition is required
- no pressure to exit Presence Space is allowed

### 4. Consent-Gated Resolution
Moving from illumination to correction:
- requires explicit consent
- cannot be automated
- cannot be inferred from severity, frequency, or metrics

No error forces action.

## What This Protocol Defines
- A standalone document (guardrails/ERROR_ILLUMINATION_PROTOCOL.md)
- Formal separation of illumination vs correction
- Rules for safe error visibility
- Constraints for future diagnostic or analytic tools

## What This Protocol Does NOT Define
- Fixing mechanisms
- Priority systems
- Severity levels
- Auto-resolution logic

EIP is diagnostic, not prescriptive.

## Acceptance Criteria
- Errors are defined as neutral system signals
- Illumination does not imply action
- Human identity is never linked to error state
- Presence Space integrity is preserved
- Language is descriptive, not corrective

## Review Guardrail
If any part of the text can be interpreted as:
> “You should fix this now”

—it violates this protocol and must be removed.
