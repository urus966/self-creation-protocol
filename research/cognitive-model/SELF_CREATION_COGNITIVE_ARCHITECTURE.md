# Self-Creation Cognitive Architecture (for `self-creation-cognitive`)

## 1) Design Goals

This document defines a **modular, layered cognitive system** that can be implemented in a separate repository: `self-creation-cognitive`.

Core constraints:

1. The cognitive system **must not modify guardrails directly**.
2. The cognitive system **selects which protocol to activate**.
3. The architecture is **modular and layered**.

---

## 2) High-Level Layered Model

```text
┌──────────────────────────────────────────────────────────────┐
│ Interface Layer                                              │
│  - API / CLI / Chat adapter                                 │
└──────────────────────────────────────────────────────────────┘
                         ↓
┌──────────────────────────────────────────────────────────────┐
│ Cognitive Core Layer                                         │
│  perception → decision → protocol-orchestrator → evaluation  │
└──────────────────────────────────────────────────────────────┘
                         ↓
┌──────────────────────────────────────────────────────────────┐
│ State Layer                                                  │
│  memory (session, episodic history, policy snapshots)        │
└──────────────────────────────────────────────────────────────┘
                         ↓
┌──────────────────────────────────────────────────────────────┐
│ Execution Layer                                              │
│  protocol adapters + guardrails reader (read-only)           │
└──────────────────────────────────────────────────────────────┘
```

### Invariants

- `guardrails/` (or external guardrail source) is mounted/read as **read-only input**.
- Decision logic can **reference** guardrails but cannot edit them.
- All module communication goes through explicit interfaces.

---

## 3) Repository Folder Structure (`self-creation-cognitive`)

```text
self-creation-cognitive/
├── README.md
├── docs/
│   ├── ARCHITECTURE.md
│   ├── FLOW_EXAMPLES.md
│   └── INTERFACES.md
├── schemas/
│   ├── perception.schema.json
│   ├── decision.schema.json
│   ├── evaluation.schema.json
│   └── memory.schema.json
├── src/
│   ├── app/
│   │   ├── api_adapter.py
│   │   └── runner.py
│   ├── cognitive/
│   │   ├── perception/
│   │   │   ├── interface.py
│   │   │   └── parser.py
│   │   ├── decision/
│   │   │   ├── interface.py
│   │   │   ├── policy_router.py
│   │   │   └── protocol_selector.py
│   │   ├── evaluation/
│   │   │   ├── interface.py
│   │   │   └── self_check.py
│   │   └── orchestrator/
│   │       └── protocol_executor.py
│   ├── memory/
│   │   ├── interface.py
│   │   ├── session_store.py
│   │   ├── history_store.py
│   │   └── snapshot_store.py
│   ├── protocols/
│   │   ├── interface.py
│   │   └── adapters/
│   │       ├── error_illumination_adapter.py
│   │       ├── minimal_resolution_adapter.py
│   │       └── refusal_honor_adapter.py
│   └── guardrails/
│       ├── reader.py
│       └── constraints.py
├── tests/
│   ├── unit/
│   │   ├── test_perception.py
│   │   ├── test_decision.py
│   │   ├── test_memory.py
│   │   └── test_evaluation.py
│   └── integration/
│       └── test_end_to_end_flow.py
└── pyproject.toml
```

---

## 4) Module Responsibilities

## 4.1 Perception Module (`cognitive/perception`)

Purpose: interpret raw user input into structured cognitive signals.

Inputs:
- raw user message
- optional channel metadata
- short-term memory context

Outputs:
- normalized intent candidates
- extracted constraints
- confidence markers
- risk tags (e.g., ambiguity, missing data)

Non-goals:
- protocol execution
- guardrail mutation

---

## 4.2 Decision Module (`cognitive/decision`)

Purpose: select protocol(s) to activate based on perception output, memory, and guardrail constraints.

Inputs:
- `PerceptionResult`
- memory snapshot
- guardrail constraints (read-only)

Outputs:
- `DecisionResult` with:
  - selected protocol ID
  - optional fallback protocol chain
  - rationale trace (machine-readable)

Hard rule:
- decision module can only choose from registered protocol adapters.

---

## 4.3 Memory Module (`memory`)

Purpose: maintain context and history across turns.

Stores:
- session state (active thread context)
- episodic history (previous perception/decision/evaluation artifacts)
- policy snapshots (versioned view of active guardrail set)

Capabilities:
- append immutable turn records
- retrieve short context windows
- retrieve prior protocol outcomes for decision support

---

## 4.4 Evaluation Module (`cognitive/evaluation`)

Purpose: evaluate the completed turn for quality and compliance after protocol execution.

Inputs:
- executed protocol result
- decision trace
- guardrail constraints (read-only)
- memory context

Outputs:
- compliance status
- reflection notes
- retry recommendation (optional)
- structured metrics for A-level behavior only

Important:
- evaluation checks behavior/output quality and alignment.
- evaluation does not alter guardrails.

---

## 5) Interface Definitions Between Modules

Below is an implementation-neutral interface model (Python-like typing).

```python
from dataclasses import dataclass
from typing import Any, Dict, List, Optional

# ---------- Shared Models ----------

@dataclass(frozen=True)
class Message:
    session_id: str
    user_id: str
    text: str
    metadata: Dict[str, Any]

@dataclass(frozen=True)
class GuardrailConstraints:
    version: str
    allowed_protocols: List[str]
    denied_actions: List[str]
    source_ref: str  # read-only source pointer

@dataclass(frozen=True)
class MemorySnapshot:
    session_id: str
    recent_turns: List[Dict[str, Any]]
    long_term_refs: List[str]
    policy_snapshot_version: str

# ---------- Perception ----------

@dataclass(frozen=True)
class PerceptionResult:
    intent_candidates: List[str]
    extracted_constraints: Dict[str, Any]
    ambiguity_score: float
    risk_tags: List[str]

class PerceptionPort:
    def interpret(self, message: Message, memory: MemorySnapshot) -> PerceptionResult:
        ...

# ---------- Decision ----------

@dataclass(frozen=True)
class DecisionResult:
    selected_protocol: str
    fallback_protocols: List[str]
    rationale: Dict[str, Any]

class DecisionPort:
    def select_protocol(
        self,
        perception: PerceptionResult,
        memory: MemorySnapshot,
        constraints: GuardrailConstraints,
    ) -> DecisionResult:
        ...

# ---------- Protocol Execution ----------

@dataclass(frozen=True)
class ProtocolExecutionResult:
    protocol_id: str
    output_text: str
    artifacts: Dict[str, Any]
    status: str

class ProtocolExecutorPort:
    def execute(self, decision: DecisionResult, message: Message) -> ProtocolExecutionResult:
        ...

# ---------- Evaluation ----------

@dataclass(frozen=True)
class EvaluationResult:
    compliant: bool
    notes: List[str]
    retry_recommended: bool
    behavior_metrics: Dict[str, float]

class EvaluationPort:
    def assess(
        self,
        execution: ProtocolExecutionResult,
        decision: DecisionResult,
        constraints: GuardrailConstraints,
        memory: MemorySnapshot,
    ) -> EvaluationResult:
        ...

# ---------- Memory ----------

class MemoryPort:
    def load_snapshot(self, session_id: str) -> MemorySnapshot:
        ...

    def append_turn_record(self, session_id: str, record: Dict[str, Any]) -> None:
        ...
```

---

## 6) Orchestration Contract

Single-turn orchestration sequence:

1. Load memory snapshot (`MemoryPort.load_snapshot`).
2. Read guardrail constraints (`guardrails.reader`, read-only).
3. Interpret input (`PerceptionPort.interpret`).
4. Select protocol (`DecisionPort.select_protocol`).
5. Execute selected protocol (`ProtocolExecutorPort.execute`).
6. Assess output (`EvaluationPort.assess`).
7. Persist turn record to memory.

Failure handling:
- If selected protocol is not allowed by constraints, switch to fallback chain.
- If no fallback is valid, return a safe failure envelope and log evaluation note.

---

## 7) Example Flow

```text
User input
→ perception
→ decision
→ protocol execution
→ evaluation
```

Concrete example:

1. **User input**: "I have conflicting requirements; help me identify the minimal safe fix."
2. **Perception** extracts intent: `resolve_conflict_minimally`, risk tag: `constraint_conflict`.
3. **Decision** chooses `MINIMAL_RESOLUTION_PROTOCOL` (fallback: `ERROR_ILLUMINATION_PROTOCOL`).
4. **Protocol execution** runs the selected adapter and produces a structured response.
5. **Evaluation** confirms response is compliant with guardrails and records reflection notes.

---

## 8) Guardrail Isolation Pattern (Critical)

To ensure cognitive logic never edits guardrails:

- Guardrails are consumed through a **read-only provider** (`guardrails.reader`).
- Decision receives only an immutable `GuardrailConstraints` object.
- No cognitive module has write access to guardrail files or remote guardrail registry.
- Any guardrail update happens outside this repository through a separate governance flow.

---

## 9) Minimal Implementation Roadmap

1. Implement typed interfaces and schemas.
2. Add protocol registry + adapter contracts.
3. Implement perception and decision baseline.
4. Add memory snapshots and append-only turn log.
5. Implement evaluation checks and integration test for end-to-end flow.
