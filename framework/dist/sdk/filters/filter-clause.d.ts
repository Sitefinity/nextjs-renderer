export interface FilterClause {
    FieldName: string;
    FieldValue: string;
    Operator: string;
}
export declare const FilterOperators: {
    Equal: string;
    NotEqual: string;
    GreaterThan: string;
    LessThan: string;
    GreaterThanOrEqual: string;
    LessThanOrEqual: string;
    ContainsOr: string;
    ContainsAnd: string;
    DoesNotContain: string;
};
export declare const StringOperators: {
    StartsWith: string;
    EndsWith: string;
    Contains: string;
};
