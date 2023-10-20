export interface FilterClause {
    FieldName: string,
    FieldValue: string,
    Operator: string,
}

export const FilterOperators = {
    Equal: 'eq',
    NotEqual: 'ne',
    GreaterThan: 'gt',
    LessThan: 'lt',
    GreaterThanOrEqual: 'ge',
    LessThanOrEqual: 'le',
    ContainsOr: 'any+or',
    ContainsAnd: 'any+and',
    DoesNotContain: 'not+(any+or)'
};

export const StringOperators = {
    StartsWith: 'startswith',
    EndsWith: 'endswith',
    Contains: 'contains'
};
