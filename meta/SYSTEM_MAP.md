# System Map

Документ | Назначение | Уровень
--- | --- | ---
CORE_PRINCIPLES.md | Базовые принципы и границы протоколов | A
PRESENCE_SPACE.md | Описание базового состояния системы | B
guardrails/ERROR_ILLUMINATION_PROTOCOL.md | Протокол выявления ошибок без принуждения к действию | A
guardrails/MINIMAL_RESOLUTION_PROTOCOL.md | Протокол минимального согласованного исправления | A
PROTOCOL_RELATIONSHIPS.md | Связи протоколов и явные не‑цели | A
docs/INTEGRATION_PATTERNS.md | Примеры взаимодействия протоколов | A
TASK.md | Задача для агента проверки структуры | A
guardrails/INTERCONNECTION_GUARD_PROTOCOL.md | Протокол охраны взаимосвязи (сетевой шлагбаум против галлюцинаций и фейковых связей) | A
guardrails/PROTOCOL_TEMPLATE.md | Шаблон для новых протоколов | A

## Visual Protocol Flow

```ascii
            +-------------------+
            |  PRESENCE_SPACE   |  ← Default safe state
            +-------------------+
                       │
                       ▼  (neutral handshake allowed)
            +-------------------+     explicit YES required
            | CONSENT_REQUEST   | ─────────────────────────► INTERCONNECTION_GUARD_PROTOCOL
            +-------------------+                               (network turnstile)
                       │                                                  │
                       ▼                                                  ▼
            +-------------------+                               +-------------------+
            | ERROR_ILLUMINATION|  ← highlight violation     |  MRP / Resolution |
            +-------------------+                               +-------------------+
                                                                          │
                                                                          └─► only after explicit consent
```

*Ключ: стрелки показывают триггеры/зависимости, вертикальные линии — возможные потоки.*
