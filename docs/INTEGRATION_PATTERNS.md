# Protocol Integration Patterns

## Purpose
This document illustrates how Self-Creation protocols interact in concrete scenarios. These are descriptive patterns showing how the system behaves, not prescriptive rules about how it must behave.

## Pattern 1: Illumination Without Action

**Situation:** An error or inconsistency becomes visible through EIP.

**How protocols interact:**
- **EIP** makes the error visible without creating obligation
- **SCP** protects the right to observe without acting
- **Presence Space** remains valid despite illumination
- **MRP** is available but not required

**Key principle:** Visibility does not create pressure to act.

---

## Pattern 2: Minimal Intervention

**Situation:** A user consents to address an illuminated error.

**How protocols interact:**
- **SCP** confirms explicit consent is given
- **MRP** structures the action as minimal, reversible, and optional
- **Presence Space** remains available upon completion or interruption
- **EIP** allows observation of results without demanding further action

**Key principle:** Action is structured to preserve the option to stop or return to non-action at any point.

---

## Pattern 3: Deliberate Non-Action

**Situation:** An error is illuminated, and the user declines to act.

**How protocols interact:**
- **EIP** allows the error to remain visible without pressure to hide it
- **SCP** protects refusal without requiring explanation or justification
- **Presence Space** remains fully valid as the default state
- **MRP** stays available indefinitely; the option to act never expires

**Key principle:** Non-action is a complete and valid choice, not a temporary state awaiting correction.

---

## Pattern 4: Return to Presence

**Situation:** After any interaction (action, observation, or refusal), the system state resolves.

**How protocols interact:**
- **Presence Space** is always available as a return point
- **SCP** ensures no protocol creates momentum or obligation to continue
- **MRP** completes without creating new obligations
- **EIP** does not accumulate pressure from unresolved observations

**Key principle:** The system naturally supports disengagement at any time.

---

## Non-Pattern: Automatic Escalation

**What does NOT happen:**
- No protocol triggers another automatically
- Illuminated errors do not escalate or accumulate urgency
- Inaction does not trigger warnings, metrics, or reminders
- Consent is never assumed or inherited from previous actions

**Why this matters:** The absence of automatic transitions is as important as the presence of voluntary ones. The system is designed so that doing nothing is always safe.

---

## Using These Patterns

These patterns are descriptive, not exhaustive. New patterns may emerge as the system is used. When documenting new patterns:

- Focus on concrete scenarios
- Show how protocols preserve consent and presence
- Avoid language that implies obligation or automatic behavior
- Confirm that non-action remains valid at every step

---

## What this document does
- Illustrates protocol interactions through concrete examples
- Shows how the system protects consent in practice
- Provides reference scenarios for new participants
- Demonstrates that non-action is always valid

## What this document does NOT do
- Create new protocols or modify existing ones
- Establish executable behaviors or automation
- Define metrics, success criteria, or completion requirements
- Create hierarchical relationships between protocols
