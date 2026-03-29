# Decision Record Protocol (DRP)

## Metadata

- Name: Decision Record Protocol (DRP)
- Level: Meta / Cross-layer Support
- Status: Experimental

---

## Purpose

DRP defines a structured way to record decisions, their context, and outcomes.

The system MUST use DRP to enable learning across time.

DRP does not influence decisions directly.

---

## Core Principle

Decisions MUST be observable across time.

The system MUST be able to trace:

→ Context → Decision → Outcome → Impact

---

## Protocol Relationships

### Supports

- CQMP — records multi-branch decisions
- MRP — records executed actions
- EIP — records detected inconsistencies

### Does NOT override

- Level 0 — Safety
- Level 1 — Human Consent

---

## Record Structure

Each decision record MUST contain:

### 1. Context

Description of the situation at decision time.

### 2. Options

List of viable actions considered.

### 3. Decision

The selected action.

### 4. Status

Record completeness indicator:

- `complete` — outcome and impact are recorded
- `incomplete` — outcome is not observed

### 5. Outcome

Observed result after execution.

### 6. Impact

Evaluation of outcome using a simple scale:

-1 → negative  
 0 → neutral  
+1 → positive  

---

## Optional Fields

The system MAY include:

- Timestamp — ISO 8601 format
- Actors involved — list of unique identifiers
- Confidence level — number from 0 to 1
- Source of decision — string (`CQMP` / `linear` / `human`)

---

## Constraints

- DRP MUST NOT modify decisions
- DRP MUST NOT introduce optimization pressure
- DRP MUST record without judgment of actors
- DRP MUST focus on decisions, not identities
- DRP MUST consider storage and write load under high decision volume; implementations SHOULD use batch recording or event-significance filters to reduce overhead

---

## Behavior

After a decision is executed:

→ The system SHOULD create a decision record

After outcome is observed:

→ The system MUST update the record with outcome and impact

---

## Failure Mode

If outcome cannot be observed:

→ The record MUST be marked `incomplete`

→ Impact MUST NOT be assigned

The system MUST NOT fabricate outcomes.

---

## Exit Condition

A record is complete when:

- Status is `complete`
- Outcome is observed
- Impact is assigned

---

## Rationale

Without structured records, the system cannot learn.

DRP enables:

- pattern detection
- causal graph construction
- improved future decisions

DRP does not evaluate people.

It evaluates decisions over time.
