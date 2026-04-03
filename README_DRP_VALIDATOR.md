# DRP Validator

Standalone, read-only validator for DRP records.

## Features

- Single record validation (`validateRecord`)
- Batch validation (`validateBatch`)
- Cross-record graph/reference validation (`buildGraph`, `validateGraph`)
- Deterministic output ordering for errors/warnings
- Optional CLI: `node src/cli.mjs file.json`

## Rules implemented

1. Required fields
2. Status invariants
3. Type validation
4. Record ID uniqueness
5. Causal validation (parent timestamp <= child timestamp)
6. Parent/child eventual consistency (warning)
7. Orphan detection (all parents missing => error)
8. Supersession rules + conflict detection
9. Soft duplicate detection (same context + same decision + within 5 minutes)
10. Graph cycle detection (warning)

## Install and run

```bash
npm run build
node src/cli.mjs examples/valid-dataset.json
node src/cli.mjs examples/invalid-dataset.json
```

## CLI

```bash
node src/cli.mjs file.json
```

- Exits `0` when valid
- Exits `2` when invalid
- Exits `1` on usage errors

## API

```ts
import { validateRecord, validateBatch, buildGraph, validateGraph } from "./src/validator";
```

### Output shape

```json
{
  "valid": true,
  "errors": [
    {
      "record_id": "string",
      "field": "string",
      "rule": "string",
      "message": "string"
    }
  ],
  "warnings": [
    {
      "record_id": "string",
      "type": "string",
      "message": "string"
    }
  ]
}
```

## Read-only guarantee

The validator only reads input and returns a report. It does not mutate or persist records.
