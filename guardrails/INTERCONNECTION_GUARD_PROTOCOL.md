# INTERCONNECTION_GUARD_PROTOCOL (Протокол защиты переходов между протоколами)

**Version:** v1.3
**Date:** 2026-03-08
**Author:** urus966

---

## 1. Название / Name
**EN:** INTERCONNECTION_GUARD_PROTOCOL (Protocol Transition Guard)
**RU:** INTERCONNECTION_GUARD_PROTOCOL (Протокол защиты переходов между протоколами)

## 2. Назначение / Purpose
**EN:** Defines safe, consent-based transitions between documented protocols.
**RU:** Определяет безопасные переходы между задокументированными протоколами только на основе явного согласия.

## 3. Уровень архитектуры / Architectural Level
- [x] **Level A (Behavior)** — can be described, tested, and optimized. / Можно описывать, проверять и улучшать.
- [ ] **Level B (Presence)** — not measured or optimized. / Не измеряется и не оптимизируется.

## 4. Определения / Definitions
- **Protocol Transition:** Явный переход от одного протокола к другому в документации или коммуникации.
- **Explicit Consent:** Прямое «да» перед переходом к следующему шагу.
- **No-Action Default:** При отсутствии согласия переход не выполняется.

## 5. Контекст применения / Application Context
**EN:** Used when a documented flow suggests moving from one protocol to another.
**RU:** Применяется, когда в описании сценария предлагается перейти от одного протокола к другому.

## 6. Transition Handshake / Рукопожатие перехода
**EN:** Any transition starts with a neutral consent check. No automatic transition is allowed.
**RU:** Любой переход начинается с нейтральной проверки согласия. Автоматический переход запрещён.

## 7. Consent Formula / Формула согласия
**EN:**
"Do you want to move to the next protocol step? No response means we remain in Presence Space."

**RU:**
«Хочешь перейти к следующему шагу протокола? Без ответа — остаёмся в Presence Space.»

## 8. Запрещено (Красная линия) / Forbidden (Red Line)
- **EN:** Assuming consent from silence or timeout.
- **RU:** Допускать согласие на основе молчания или таймаута.
- **EN:** Automatic transitions between protocols without consent.
- **RU:** Автоматические переходы между протоколами без согласия.
- **EN:** Imperative language ("must", "should") in Level B context.
- **RU:** Императивы («должен», «следует») в отношении Level B.

## 9. Разрешено (Зелёная зона) / Allowed (Green Zone)
- **EN:** Neutral consent request before transition.
- **RU:** Нейтральный запрос согласия перед переходом.
- **EN:** Immediate stop when refusal or silence occurs.
- **RU:** Немедленная остановка при отказе или молчании.
- **EN:** Returning to Presence Space as the default state.
- **RU:** Возврат в Presence Space как состояние по умолчанию.

## 10. Примеры сценариев / Usage Scenarios
**Scenario 1 / Сценарий 1**
**Before / До:** "Applying MRP now."
**After / После:** "Do you want to move to MRP? No response means we remain in Presence Space."

**Scenario 2 / Сценарий 2**
**Before / До:** "No answer, continuing."
**After / После:** "No answer received, staying in Presence Space."

**Scenario 3 / Сценарий 3**
**Before / До:** "Violation found, correction starts automatically."
**After / После:** "Violation illuminated. Do you want to proceed with a minimal correction step?"

## 11. История изменений / Change History
- **v1.3 (2026-03-08):** Sections 4–7 aligned to protocol-only scope; removed orchestration and agent-level wording.
- **v1.2 (2026-03-02):** Final structure with 14 sections and correct author (urus966).
- **v1.1 (2026-03-01):** Introduced strict opt-in logic.
- **v1.0 (2026-02-27):** Initial protocol creation.
