#!/usr/bin/env python3
"""Minimal DRP validator (MVP)."""

from __future__ import annotations

import json
import sys
from dataclasses import dataclass, field
from datetime import datetime
from pathlib import Path
from typing import Any

REQUIRED_FIELDS = [
    "record_id",
    "context",
    "options",
    "decision",
    "status",
    "outcome",
    "impact",
    "timestamp",
    "parent_record_ids",
    "child_record_ids",
]

ALLOWED_STATUSES = {"proposed", "incomplete", "complete", "superseded"}
ALLOWED_IMPACTS = {-1, 0, 1, None}


@dataclass
class ValidationResult:
    valid: bool = True
    errors: list[str] = field(default_factory=list)
    warnings: list[str] = field(default_factory=list)

    def add_error(self, message: str) -> None:
        self.valid = False
        self.errors.append(message)

    def to_dict(self) -> dict[str, Any]:
        return {
            "valid": self.valid,
            "errors": self.errors,
            "warnings": self.warnings,
        }


def _is_iso8601(value: Any) -> bool:
    if not isinstance(value, str):
        return False
    try:
        datetime.fromisoformat(value.replace("Z", "+00:00"))
        return True
    except ValueError:
        return False


def validateRecord(record: dict[str, Any]) -> dict[str, Any]:
    result = ValidationResult()

    for field_name in REQUIRED_FIELDS:
        if field_name not in record:
            result.add_error(f"missing required field: {field_name}")

    if result.errors:
        return result.to_dict()

    status = record.get("status")
    outcome = record.get("outcome")
    impact = record.get("impact")

    if status not in ALLOWED_STATUSES:
        result.add_error(f"invalid status: {status}")

    if impact not in ALLOWED_IMPACTS:
        result.add_error(f"invalid impact: {impact}")

    if status == "complete":
        if outcome is None:
            result.add_error("status=complete requires outcome to be non-null")
        if impact is None:
            result.add_error("status=complete requires impact to be non-null")

    if status in {"incomplete", "proposed"}:
        if outcome is not None:
            result.add_error(f"status={status} requires outcome to be null")
        if impact is not None:
            result.add_error(f"status={status} requires impact to be null")

    if not _is_iso8601(record.get("timestamp")):
        result.add_error("timestamp must be valid ISO 8601")

    return result.to_dict()


def validateBatch(records: list[dict[str, Any]]) -> dict[str, Any]:
    result = ValidationResult()
    seen: dict[str, int] = {}
    record_ids: set[str] = set()

    for index, record in enumerate(records):
        if not isinstance(record, dict):
            result.add_error(f"record[{index}] must be an object")
            continue

        single = validateRecord(record)
        if not single["valid"]:
            for err in single["errors"]:
                result.add_error(f"record[{index}]: {err}")

        record_id = record.get("record_id")
        if isinstance(record_id, str):
            seen[record_id] = seen.get(record_id, 0) + 1
            record_ids.add(record_id)

    for record_id, count in seen.items():
        if count > 1:
            result.add_error(f"duplicate record_id detected: {record_id}")

    for index, record in enumerate(records):
        if not isinstance(record, dict):
            continue
        parents = record.get("parent_record_ids", [])
        if not isinstance(parents, list):
            result.add_error(f"record[{index}]: parent_record_ids must be an array")
            continue
        missing = [parent for parent in parents if parent not in record_ids]
        if missing:
            result.add_error(
                f"record[{index}]: orphan parent reference(s): {', '.join(missing)}"
            )

    return result.to_dict()


def _load_json(path: Path) -> Any:
    return json.loads(path.read_text(encoding="utf-8"))


def main(argv: list[str]) -> int:
    if len(argv) != 2:
        print("Usage: drp-validate <data.json>", file=sys.stderr)
        return 1

    input_path = Path(argv[1])
    if not input_path.exists():
        print(json.dumps({"valid": False, "errors": [f"file not found: {input_path}"], "warnings": []}, indent=2))
        return 1

    try:
        payload = _load_json(input_path)
    except json.JSONDecodeError as exc:
        print(json.dumps({"valid": False, "errors": [f"invalid JSON: {exc}"], "warnings": []}, indent=2))
        return 1

    if isinstance(payload, list):
        output = validateBatch(payload)
    elif isinstance(payload, dict):
        output = validateRecord(payload)
    else:
        output = {
            "valid": False,
            "errors": ["input JSON must be an object or an array of objects"],
            "warnings": [],
        }

    print(json.dumps(output, indent=2))
    return 0 if output["valid"] else 1


if __name__ == "__main__":
    raise SystemExit(main(sys.argv))
