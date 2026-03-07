# Minimal Resolution Protocol (MRP)

## Goal
Introduce the Minimal Resolution Protocol (MRP) — a strictly opt-in mechanism that allows errors to be resolved only after explicit consent.
MRP defines the smallest possible bridge from observation to action.

## Context
With:
- SCP (right not to act)
- Presence Space (right to remain at rest)
- EIP (right to see errors without pressure)
...the system now needs a way to act without becoming coercive.
MRP is that way.

## Protocol Definition
**Minimal Resolution Protocol (MRP):**
A protocol that enables corrective action only when explicitly requested, and only to the minimal necessary degree.
Resolution is optional, reversible, and bounded.

## Core Rules

### 1. Explicit Consent Only
Resolution may begin only after a clear, voluntary “yes”.
Silence, hesitation, or presence ≠ consent.

### 2. Minimal Action Principle
Only the smallest action required to address the illuminated error is allowed.
No cascading tasks or expansions.

### 3. Reversibility
Any resolution step can be stopped or undone without penalty.

### 4. No Goal Expansion
Resolution must not introduce:
- new objectives
- improvement agendas
- optimization layers

### 5. Return to Presence Space
Completion or interruption of resolution automatically returns the system to Presence Space.

## What This PR Adds
- A standalone document: guardrails/MINIMAL_RESOLUTION_PROTOCOL.md
- Formal rules for consent-based correction
- Clear constraints preventing overreach

## What This PR Does NOT Add
- Progress tracking
- Success metrics
- Improvement frameworks
- “While you’re here” logic

Resolution ends where the error ends.

## Acceptance Criteria
- Resolution requires explicit consent
- Actions are minimal and bounded
- Stopping is always allowed
- No identity, performance, or productivity framing
- Presence Space is restored by default

## Review Guardrail
If any part suggests:
> “Since you started, you might as well continue…”
—it violates this protocol.
