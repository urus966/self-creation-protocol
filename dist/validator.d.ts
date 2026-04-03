export type ImpactValue = -1 | 0 | 1 | null;
export type DRPStatus = "complete" | "incomplete" | "proposed" | "superseded" | string;
export interface DRPRecord {
    record_id?: string;
    context?: unknown;
    options?: unknown;
    decision?: unknown;
    status?: DRPStatus;
    outcome?: unknown;
    impact?: ImpactValue | unknown;
    timestamp?: string;
    parent_record_ids?: unknown;
    child_record_ids?: unknown;
    supersedes_record_id?: string | null;
    [key: string]: unknown;
}
export interface ValidationError {
    record_id: string;
    field: string;
    rule: string;
    message: string;
}
export interface ValidationWarning {
    record_id: string;
    type: string;
    message: string;
}
export interface ValidationReport {
    valid: boolean;
    errors: ValidationError[];
    warnings: ValidationWarning[];
}
export interface DRPGraph {
    records: DRPRecord[];
    byId: Map<string, DRPRecord>;
}
export declare function validateRecord(record: DRPRecord): ValidationReport;
export declare function buildGraph(records: DRPRecord[]): DRPGraph;
export declare function validateGraph(graph: DRPGraph): ValidationReport;
export declare function validateBatch(input: DRPRecord | DRPRecord[]): ValidationReport;
