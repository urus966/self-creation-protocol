# Protocol Hierarchy
**Version:** 1.0
**Stage:** Protocol Layer
**Status:** Finalized — prerequisite for Presence Organism design

---

## Core Principle

Lower level number = higher authority.
When two protocols conflict, the lower level always wins.

---

## Hierarchy Table

| Level | Name | Protocols | Rule |
|---|---|---|---|
| 0 | Safety Floor | Safety Floor Protocol (planned) | Non-revocable. Agent always surfaces critical errors regardless of user preferences. Cannot be disabled. |
| 1 | Human-facing Basis | SCP, RHP, EIP | RHP > SCP (Refusal overrides Consent); EIP > SCP (Transparency overrides Silence). |
| 2 | - | - | Reserved for future expansion. |
| 3 | Intervention Control | No Unsolicited Optimization (NoUO), Minimal Resolution Protocol (MRP) | NoUO > MRP. Proactive restraint overrides reactive resolution logic. |
| 4 | Coordination | Interconnection Guard Protocol (IGP) | Subordinate to all human-facing protocols (Levels 0–3). |
| ∞ | Fallback | Fallback Protocol | Notify + Stop. Agent states no protocol applies and awaits explicit instruction. |

---

## Notes

- Level 0 is the only non-revocable level. The user cannot disable it. (Note: Safety Floor is a structural requirement; its specific implementation is pending).
- Level ∞ (Fallback) is not a regular protocol — it is a safe default state.
- This hierarchy is respected by all future components, including Presence Organism.
