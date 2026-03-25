# Multi-Branch Resolution Protocol (MBRP) — Implementation Notes

## Scope

This file provides implementation guidance for `Conditional_Quantum_Mode.md`.

Normative rules remain in the protocol file. This file is non-normative except where explicitly marked as required by implementation policy.

## Recommended Defaults

Use configurable bounds with defaults:

- `mbrp.max_branches = 8`
- `mbrp.max_iterations = 64`
- `mbrp.max_duration_ms = 50`

Rationale:

- `max_branches` limits memory growth and branch fan-out.
- `max_iterations` limits internal ranking/refinement loops.
- `max_duration_ms` bounds latency and prevents hanging cycles.

## State Diagram (ASCII)

```text
[Linear Evaluation]
       |
       | no dominant action + multiple pre-validated actions
       v
[Activate MBRP]
       |
       v
[Evaluate Candidates (bounded)]
   |             |                 |
   | converged   | bounds exceeded | no convergence
   v             v                 v
[Select Outcome] [Fallback]        [Fallback]
       |
       | validate L0/L1
   +---+----------------------+
   | pass                     | fail
   v                          v
[Execute Outcome]       [Try Next Ranked]
   |                          |
   v                          | none valid
[Exit MBRP -> Linear]         v
                           [Fallback]
                               |
                               v
                      [Exit MBRP -> Linear]
```

## Edge Case Handling Matrix

| Condition | Required behavior |
|---|---|
| No viable actions | Trigger fallback (notify + stop) |
| Single dominant action exists | Stay in linear mode; do not activate MBRP |
| Multiple actions tie for top rank | Treat as no dominant action |
| `max_branches` exceeded | Exit MBRP; trigger fallback |
| `max_iterations` exceeded | Exit MBRP; trigger fallback |
| `max_duration_ms` exceeded | Exit MBRP; trigger fallback |
| Converged selection fails Level 0/1 | Try next-ranked evaluated action in same cycle |
| No remaining validated actions | Exit MBRP; trigger fallback |
| Re-entry requested in same unresolved cycle | Reject re-entry |
| Next cycle has identical input state after fallback | Reject until explicit state-change marker exists |

## Test Scenarios

1. **Activation gating test**
   - Input: 2 pre-validated actions, no dominant action.
   - Expected: MBRP activates.

2. **No-activation test**
   - Input: 1 dominant action.
   - Expected: MBRP does not activate.

3. **Bounds test (iterations)**
   - Setup: force loop beyond `max_iterations`.
   - Expected: fallback + MBRP exit.

4. **Bounds test (duration)**
   - Setup: force evaluation runtime beyond `max_duration_ms`.
   - Expected: fallback + MBRP exit.

5. **Validation failover test**
   - Setup: top-ranked action fails Level 0/1; second-ranked passes.
   - Expected: execute second-ranked action within same cycle.

6. **Validation terminal-fail test**
   - Setup: all converged/evaluated actions fail Level 0/1.
   - Expected: fallback + MBRP exit.

7. **Non-convergence test**
   - Setup: evaluator cannot converge before bounds.
   - Expected: fallback + MBRP exit.

8. **No-viable-actions test**
   - Setup: zero viable actions pre-activation.
   - Expected: direct fallback, no MBRP activation.

9. **Re-entry guard test**
   - Setup: request re-entry in same unresolved cycle.
   - Expected: rejected.

10. **Progress guarantee test**
   - Setup: cycle N falls back; cycle N+1 receives identical input without state-change marker.
   - Expected: rejected until marker is present.
