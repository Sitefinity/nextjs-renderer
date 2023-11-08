import { CombinedFilter } from '../filters/combined-filter';
import { FilterClause } from '../filters/filter-clause';
import { RelationFilter } from '../filters/relation-filter';
export declare class ODataFilterSerializer {
    propertyPrefix: string;
    lambdaVariableName: string;
    constructor(propertyPrefix?: string, lambdaVariableName?: string);
    serialize(filterContext: FilterContext): string | null;
    private serializeCombinedFilter;
    private serializeFilterClause;
    private serializeRelationFilter;
    private serializeFilterValue;
    private serializeFilterValuesArray;
}
interface FilterContext {
    Filter: FilterClause | CombinedFilter | RelationFilter;
    Type: string;
}
export {};
