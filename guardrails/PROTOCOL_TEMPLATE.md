# PROTOCOL_TEMPLATE.md

Template for creating a new guardrail protocol file in `guardrails/`.

**Template Version:** v2.3
**Date:** 2026-03-18

## 1. Protocol Name

## 2. Purpose

## 3. Architectural Level
- [ ] Level A (Behavior)
- [ ] Level B (Presence)

## 4. Application Context

## 5. Red Line
- coercive participation language
- pressure after error illumination
- metric framing for Presence Space
- ignoring explicit refusal or silence

## 6. Green Zone
- neutral consent checks
- optional paths after explicit opt-in
- observation without performance framing
- non-action as valid outcome

## 7. Scenarios
- Before:
- After:

## 8. Violation Handling
1. Illuminate via `ERROR_ILLUMINATION_PROTOCOL`
2. Apply minimal correction via `MINIMAL_RESOLUTION_PROTOCOL`
3. Return to Presence Space
4. Record incident as observation

## 9. Protocol Links
- Depends on:
- Interacts with:
- Companion protocols:

## 10. Checklist
- [ ] Level selected
- [ ] No imperative phrasing in Presence context
- [ ] No out-of-scope architecture references
- [ ] At least one scenario pair
- [ ] Violation handling section present
- [ ] Links verified
- [ ] File path under `guardrails/`
