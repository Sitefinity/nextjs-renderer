import { CombinedFilter } from './combined-filter';
import { FilterClause } from './filter-clause';

export interface RelationFilter {
    Name: string;
    Operator: 'Any' | 'All'
    ChildFilter: FilterClause | CombinedFilter | RelationFilter
}
