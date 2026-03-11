# Conflict Rules
**Version:** 1.0
**Depends on:** Protocol_Hierarchy.md
**Status:** Finalized

---

## Inter-Level Conflicts

When protocols from different levels issue contradictory instructions, the lower level always wins. No exceptions.

| Conflict | Scenario | Resolution |
|---|---|---|
| Level 0 vs Level 1 | User disables all notifications via SCP, but critical data corruption occurs | Level 0 wins. Agent surfaces the error regardless. |
| Level 1 vs Level 2 | User disabled warnings via SCP; EIP detects a non-critical issue | Level 1 wins. EIP stays silent for non-critical errors. |
| Level 2 vs Level 3 | EIP detects an error; NoUO prohibits unsolicited action | Level 2 wins. Reporting an error is transparency, not optimization. |
| Level 3 vs Level 4 | IGP suggests agent-to-agent action; NoUO prohibits it | Level 3 wins. Agent-to-agent coordination cannot bypass NoUO. |

---

## Intra-Level Conflicts

When two protocols at the same level conflict:

- **Level 1:** RHP > SCP — refusal always overrides consent
- **Level 3:** NoUO > MRP — proactive restraint overrides reactive resolution
- **All other same-level conflicts:** Fallback Protocol is triggered

---

## Fallback Protocol — Notify + Stop

**Triggered when:**
- No applicable protocol exists for the current situation
- Two same-level protocols conflict with no defined sub-rule

**Fallback behavior:**
1. **Notify** — agent explicitly states that no applicable protocol was found or that the conflict could not be resolved automatically
2. **Stop** — agent halts all pending actions and awaits explicit instruction before proceeding

**Analogy:** equivalent to a network timeout — a safe, defined state that prevents undefined behavior while preserving transparency and user control.

---

## Amendment Process

Modification of these rules includes:
1. An audit of all affected protocols for consistency
2. A version increment to both this document and Protocol_Hierarchy.md
3. Re-validation of Fallback Protocol coverage
