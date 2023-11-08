import { CombinedFilter } from './combined-filter';
import { FilterClause } from './filter-clause';
import { RelationFilter } from './relation-filter';
import { ContentVariation } from '../../widgets/entities/mixed-content-context';
export declare class FilterConverterService {
    static getMainFilter(variation: ContentVariation): CombinedFilter | FilterClause | RelationFilter | null;
    static parseComplexFilter(filter: any): CombinedFilter | FilterClause | RelationFilter;
}
