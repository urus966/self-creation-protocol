# Protocol Relationships and Non-Goals

## Goal
Make the boundaries, relationships, and non-goals of the Self-creation protocol explicit. This document clarifies how existing protocols relate to each other and what the system deliberately does not attempt to do.

## Conceptual Relationships
The protocols within the Self-creation system are designed to coexist without creating an automated or hierarchical execution flow. They establish constraints and affordances, not a sequence of operations.

-   **Selective Consent Protocol (SCP):** Establishes the foundational right to not act, not engage, and not participate. It is the non-overridable base principle that governs all interactions.
-   **Presence Space:** Defines the system's baseline state—a valid condition where no action, evaluation, or optimization is required. It is the structural expression of SCP.
-   **Error Illumination Protocol (EIP):** Allows system errors or inconsistencies to become visible without creating an obligation to act. It respects both SCP and Presence Space by separating observation from intervention.
-   **Minimal Resolution Protocol (MRP):** Provides a strictly consent-gated pathway to act on an illuminated error. It ensures that any action is minimal, reversible, and optional, returning the system to Presence Space upon completion or interruption.

**Key Principle:** No protocol activates another automatically. All transitions out of Presence Space or into a state of action are voluntary and require explicit consent.

## Explicit Non-Goals
To preserve its core principles, the system explicitly and intentionally does **NOT**:

-   Measure effectiveness or productivity
-   Track progress or velocity
-   Enforce improvement or optimization
-   Define success or failure metrics
-   Require completion of any task
-   Escalate actions or create urgency
-   Guarantee outcomes or results
-   Require justification, explanation, or reasoning for refusal, non-participation, or inaction

These exclusions are foundational to protecting the integrity of consent and presence.

## Normative vs. Executable Nature
The protocols in this repository are **normative**, not **executable**.

-   **Normative** protocols define constraints on system behavior. They act as a governing framework for how other components *should* be designed.
-   **Executable** protocols define specific behaviors that can be run or tested.

Because these protocols are normative, they are not subject to automated testing, performance validation, or conventional CI/CD checks. Their correctness is a matter of architectural alignment, not functional output. This explains the intentional absence of test suites, build pipelines, and performance metrics in this repository.
