const REQUIRED_FIELDS = [
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
];
const DUPLICATE_WINDOW_MS = 5 * 60 * 1000;
function isIso8601(value) {
    if (typeof value !== "string")
        return false;
    const isoRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?(?:Z|[+-]\d{2}:\d{2})$/;
    if (!isoRegex.test(value))
        return false;
    return !Number.isNaN(Date.parse(value));
}
function asArrayOfStrings(value) {
    if (!Array.isArray(value))
        return null;
    return value.every((v) => typeof v === "string") ? value : null;
}
function pushError(errors, record_id, field, rule, message) {
    errors.push({ record_id, field, rule, message });
}
function pushWarning(warnings, record_id, type, message) {
    warnings.push({ record_id, type, message });
}
export function validateRecord(record) {
    const errors = [];
    const warnings = [];
    const rid = typeof record.record_id === "string" ? record.record_id : "<unknown>";
    for (const field of REQUIRED_FIELDS) {
        if (!(field in record)) {
            pushError(errors, rid, field, "required_fields", `Missing required field '${field}'.`);
        }
    }
    if (!Array.isArray(record.options) || record.options.length < 1) {
        pushError(errors, rid, "options", "type_validation", "'options' must be an array with at least one item.");
    }
    if (!Array.isArray(record.parent_record_ids)) {
        pushError(errors, rid, "parent_record_ids", "type_validation", "'parent_record_ids' must be an array.");
    }
    if (!Array.isArray(record.child_record_ids)) {
        pushError(errors, rid, "child_record_ids", "type_validation", "'child_record_ids' must be an array.");
    }
    const validImpact = record.impact === -1 || record.impact === 0 || record.impact === 1 || record.impact === null;
    if (!validImpact) {
        pushError(errors, rid, "impact", "type_validation", "'impact' must be one of -1, 0, +1, or null.");
    }
    if (!isIso8601(record.timestamp)) {
        pushError(errors, rid, "timestamp", "type_validation", "'timestamp' must be a valid ISO 8601 datetime.");
    }
    if (record.status === "complete") {
        if (record.outcome == null) {
            pushError(errors, rid, "outcome", "status_invariants", "For status='complete', 'outcome' must not be null.");
        }
        if (record.impact == null) {
            pushError(errors, rid, "impact", "status_invariants", "For status='complete', 'impact' must not be null.");
        }
    }
    if (record.status === "incomplete" || record.status === "proposed") {
        if (record.outcome !== null) {
            pushError(errors, rid, "outcome", "status_invariants", `For status='${record.status}', 'outcome' must be null.`);
        }
        if (record.impact !== null) {
            pushError(errors, rid, "impact", "status_invariants", `For status='${record.status}', 'impact' must be null.`);
        }
    }
    if (record.status === "superseded" && (record.supersedes_record_id == null || record.supersedes_record_id === "")) {
        pushError(errors, rid, "supersedes_record_id", "status_invariants", "For status='superseded', 'supersedes_record_id' must not be null.");
    }
    return {
        valid: errors.length === 0,
        errors,
        warnings,
    };
}
export function buildGraph(records) {
    const byId = new Map();
    for (const record of records) {
        if (typeof record.record_id === "string") {
            byId.set(record.record_id, record);
        }
    }
    return { records, byId };
}
function detectCycles(graph) {
    const cycles = [];
    const temp = new Set();
    const perm = new Set();
    const stack = [];
    const dfs = (id) => {
        if (perm.has(id))
            return;
        if (temp.has(id)) {
            const cycleStart = stack.indexOf(id);
            if (cycleStart >= 0) {
                cycles.push(stack.slice(cycleStart).concat(id));
            }
            return;
        }
        temp.add(id);
        stack.push(id);
        const rec = graph.byId.get(id);
        const children = asArrayOfStrings(rec?.child_record_ids) ?? [];
        for (const childId of children) {
            if (graph.byId.has(childId)) {
                dfs(childId);
            }
        }
        stack.pop();
        temp.delete(id);
        perm.add(id);
    };
    for (const id of graph.byId.keys()) {
        if (!perm.has(id))
            dfs(id);
    }
    return cycles;
}
export function validateGraph(graph) {
    const errors = [];
    const warnings = [];
    const supersededByTarget = new Map();
    for (const record of graph.records) {
        const rid = typeof record.record_id === "string" ? record.record_id : "<unknown>";
        const parents = asArrayOfStrings(record.parent_record_ids);
        const children = asArrayOfStrings(record.child_record_ids);
        if (parents) {
            let missingParents = 0;
            for (const parentId of parents) {
                const parent = graph.byId.get(parentId);
                if (!parent) {
                    missingParents += 1;
                    continue;
                }
                if (isIso8601(parent.timestamp) && isIso8601(record.timestamp)) {
                    const parentTs = Date.parse(parent.timestamp);
                    const childTs = Date.parse(record.timestamp);
                    if (parentTs > childTs) {
                        pushError(errors, rid, "timestamp", "causal_validation", `Parent '${parentId}' timestamp must be <= child '${rid}' timestamp.`);
                    }
                }
                const parentChildren = asArrayOfStrings(parent.child_record_ids) ?? [];
                if (!parentChildren.includes(rid)) {
                    pushWarning(warnings, rid, "parent_child_consistency", `Parent '${parentId}' does not include '${rid}' in child_record_ids.`);
                }
            }
            if (parents.length > 0 && missingParents === parents.length) {
                pushError(errors, rid, "parent_record_ids", "orphan_detection", "All referenced parents are missing.");
            }
        }
        if (typeof record.supersedes_record_id === "string" && record.supersedes_record_id.length > 0) {
            const target = graph.byId.get(record.supersedes_record_id);
            if (target && target.status !== "superseded") {
                pushError(errors, rid, "supersedes_record_id", "supersession_rules", `Referenced record '${record.supersedes_record_id}' must have status='superseded'.`);
            }
            const refs = supersededByTarget.get(record.supersedes_record_id) ?? [];
            refs.push(rid);
            supersededByTarget.set(record.supersedes_record_id, refs);
        }
        void children;
    }
    for (const [target, refs] of supersededByTarget.entries()) {
        if (refs.length > 1) {
            for (const rid of refs) {
                pushError(errors, rid, "supersedes_record_id", "supersession_rules", `Conflict: multiple records supersede '${target}' (${refs.join(", ")}).`);
            }
        }
    }
    const records = graph.records.filter((r) => typeof r.record_id === "string" && isIso8601(r.timestamp));
    for (let i = 0; i < records.length; i += 1) {
        for (let j = i + 1; j < records.length; j += 1) {
            const a = records[i];
            const b = records[j];
            if (a.context === b.context && a.decision === b.decision) {
                const dt = Math.abs(Date.parse(a.timestamp) - Date.parse(b.timestamp));
                if (dt <= DUPLICATE_WINDOW_MS) {
                    pushWarning(warnings, a.record_id, "duplicate_detection", `Potential duplicate with '${b.record_id}' (same context+decision and close timestamp).`);
                    pushWarning(warnings, b.record_id, "duplicate_detection", `Potential duplicate with '${a.record_id}' (same context+decision and close timestamp).`);
                }
            }
        }
    }
    const cycles = detectCycles(graph);
    for (const cycle of cycles) {
        const id = cycle[0] ?? "<unknown>";
        pushWarning(warnings, id, "graph_cycle", `Cycle detected: ${cycle.join(" -> ")}.`);
    }
    return {
        valid: errors.length === 0,
        errors,
        warnings,
    };
}
export function validateBatch(input) {
    const records = Array.isArray(input) ? input : [input];
    const errors = [];
    const warnings = [];
    const seen = new Map();
    for (const record of records) {
        const report = validateRecord(record);
        errors.push(...report.errors);
        warnings.push(...report.warnings);
        if (typeof record.record_id === "string") {
            const count = seen.get(record.record_id) ?? 0;
            seen.set(record.record_id, count + 1);
        }
    }
    for (const [recordId, count] of seen.entries()) {
        if (count > 1) {
            pushError(errors, recordId, "record_id", "uniqueness", `Duplicate record_id '${recordId}' found ${count} times.`);
        }
    }
    const graphReport = validateGraph(buildGraph(records));
    errors.push(...graphReport.errors);
    warnings.push(...graphReport.warnings);
    errors.sort((a, b) => `${a.record_id}|${a.field}|${a.rule}|${a.message}`.localeCompare(`${b.record_id}|${b.field}|${b.rule}|${b.message}`));
    warnings.sort((a, b) => `${a.record_id}|${a.type}|${a.message}`.localeCompare(`${b.record_id}|${b.type}|${b.message}`));
    return {
        valid: errors.length === 0,
        errors,
        warnings,
    };
}
