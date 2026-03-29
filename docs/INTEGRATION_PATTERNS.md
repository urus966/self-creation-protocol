# Protocol Integration Patterns

## Purpose
This document illustrates protocol interactions through descriptive scenarios. These patterns describe system behavior and do not prescribe obligations.

## Pattern 1: Illumination Without Action

**Situation:** An inconsistency becomes visible through EIP.

**How protocols interact:**
- **EIP** makes the inconsistency visible without action pressure
- **SCP** protects the right to observe without acting
- **Presence Space** remains valid during illumination
- **MRP** stays available as an optional path

## Pattern 2: Minimal Intervention

**Situation:** A user consents to address an illuminated inconsistency.

**How protocols interact:**
- **SCP** confirms explicit consent
- **MRP** frames intervention as minimal, reversible, and optional
- **Presence Space** remains available after completion or interruption
- **EIP** allows observation of outcomes without escalation pressure

## Pattern 3: Deliberate Non-Action

**Situation:** An inconsistency is illuminated and the user declines action.

**How protocols interact:**
- **EIP** keeps visibility without pressure
- **SCP** protects refusal without justification burden
- **Presence Space** remains valid as default state
- **MRP** remains available without expiry framing

## Pattern 4: Return to Presence

**Situation:** Interaction ends after action, observation, or refusal.

**How protocols interact:**
- **Presence Space** remains available as return state
- **SCP** prevents momentum pressure
- **MRP** closes without adding obligations
- **EIP** avoids pressure accumulation from unresolved observations

## Non-Pattern: Automatic Escalation

Automatic escalation is outside this protocol set:
- no automatic protocol chaining
- no urgency accumulation from illuminated inconsistencies
- no warning loops tied to inactivity
- no inferred consent from prior actions


## Pattern 5: Conditional Multi-Branch Resolution

**Situation:** Multiple permissible actions remain viable and linear evaluation cannot produce one dominant path.

**How protocols interact:**
- **CQMP** enables bounded multi-branch evaluation within one decision cycle
- **Level 0 / Level 1** validation gates any selected outcome before execution
- **EIP** may precede CQMP when ambiguity is first illuminated
- **Fallback (Notify + Stop)** is triggered if evaluation cannot converge
- **Linear mode** resumes immediately after decision or fallback
