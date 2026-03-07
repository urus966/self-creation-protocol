# name
Decision Protocol

## description
Selects the most appropriate protocol or response strategy for a given user input under guardrail constraints.

## input
- Interpreted user request
- Context/history summary
- Guardrail constraints (read-only)

## process steps
1. Read interpreted input and context.
2. Check allowed actions from constraints.
3. Rank candidate response strategies.
4. Select primary strategy and optional fallback.

## output
- Selected strategy/protocol
- Short rationale
- Optional fallback strategy

## future extensions
- Multi-strategy blending
- Confidence-calibrated fallback chains
- Adaptive strategy memory across sessions
