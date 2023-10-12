import { FilterClause } from "./filter-clause";
import { RelationFilter } from "./relation-filter";

export interface CombinedFilter {
    Operator: "AND" | "OR" | "NOT";
    ChildFilters: Array<CombinedFilter | FilterClause | RelationFilter>
}
