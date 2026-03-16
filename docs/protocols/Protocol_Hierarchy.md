# Protocol Hierarchy
**Version:** 1.4
**Stage:** Alive System Layer
**Status:** Finalized — prerequisite for Presence Organism autonomy

---

## Core Principle

**Lower level number = higher authority.**
When two protocols conflict, the protocol with the lower level number always wins.

---

## Hierarchy Table

| Level | Name | Protocols | Rule |
|---|---|---|---|
| 0 | Safety Floor | Safety Floor Protocol (planned) | Non-revocable safety minimum. Agent always surfaces critical errors. |
| 1 | Human Consent | CONSENT_REQUEST_PROTOCOL | Explicit human instruction. Overrides Level 2 and Level 3. |
| 2 | Organism Autonomy | Presence Organism (internal) | Internal state decisions (sleep, recovery). Overrides Level 3. |
| 3 | Core Guardrails | SCP, RHP, EIP, Presence Space | Foundational boundaries. Baseline rules for consent and presence. |
| 4 | Intervention Control | NoUO, MRP | Logic for optimization and resolution. Subordinate to Levels 0–3. |
| 5 | Coordination | IGP | Subordinate to all human and organism-facing protocols. |
| ∞ | Fallback | Fallback Protocol | Notify + Stop. Default state when no other protocol applies. |

---

## Autonomy Examples (Level 2 vs Level 3)

### Organism Sleep vs Transparency
**Situation:** EIP (Level 3) detects an error, but the Presence Organism (Level 2) is in a "Sleep" state for recovery.
**Result:** Level 2 wins. The organism remains in sleep; the error illumination is queued or deferred.

### Organism Preservation vs SCP
**Situation:** A user interaction triggers a neutral response via SCP (Level 3), but the Organism (Level 2) logic determines that a "Minimum Interaction" mode preserves its internal viability.
**Result:** Level 2 wins. The organism's internal viability logic overrides the default neutral SCP behavior to enforce stricter interaction boundaries.

---

## Notes

- **Level 0** is the non-revocable safety minimum (specification pending).
- **Level 1** ensures the human remains the primary authority over the system.
- **Level 2** allows the Presence Organism to maintain its own state even if Level 3 guardrails would suggest a different default.
- **Level 3 (Guardrails)** provides the baseline safety and consent rules.
- This hierarchy shifts the system from "Static Guardrails" to an "Alive Organism" model.
