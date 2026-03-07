# name
Query Protocol

## description
Handles user query processing with a confidence gate that triggers clarification when uncertainty is high.

## input
- Raw user query
- Optional context
- Confidence threshold

## process steps
1. Parse query intent.
2. Estimate confidence.
3. If confidence is below threshold, generate a clarifying question.
4. Otherwise, generate an answer.

## output
- Clarifying question (low confidence) or
- Direct answer (sufficient confidence)

## future extensions
- Domain-specific confidence estimators
- Multi-turn clarification loops
- Source-grounded response generation
