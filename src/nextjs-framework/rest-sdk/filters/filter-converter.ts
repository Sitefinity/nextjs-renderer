import { CombinedFilter } from './combined-filter';
import { FilterClause, FilterOperators } from './filter-clause';
import { RelationFilter } from './relation-filter';
import { DateOffsetPeriod } from './date-offset-period';
import { FilterTypes } from './filter-types';
import { ContentVariation } from '../..';

export class FilterConverterService {
    public static getMainFilter(variation: ContentVariation): CombinedFilter | FilterClause | RelationFilter | null {
        let filter: CombinedFilter | FilterClause | RelationFilter | null = null;
        if (variation.Filter && variation.Filter.Value) {
            switch (variation.Filter.Key) {
                case FilterTypes.Complex:
                    filter = this.parseComplexFilter(JSON.parse(variation.Filter.Value));
                    break;
                case FilterTypes.Ids:
                    const itemIds = variation.Filter.Value.split(',');
                    const filters = itemIds.map((x) => {
                        return <FilterClause>{
                            FieldName: 'Id',
                            FieldValue: x.trim(),
                            Operator: FilterOperators.Equal
                        };
                    });

                    filter = <CombinedFilter>{
                        Operator: 'OR',
                        ChildFilters: filters
                    };
                    break;
                default:
                    break;
            }
        }

        return filter;
    }

    public static parseComplexFilter(filter: any): CombinedFilter | FilterClause | RelationFilter {
        if (filter.hasOwnProperty('FieldName') && filter.hasOwnProperty('FieldValue')) {
            const filterClause = <FilterClause>filter;
            return filterClause;
        } else if (filter.hasOwnProperty('Name') && filter.hasOwnProperty('Operator')) {
            let relationFilter = <RelationFilter>filter;
            if (relationFilter.ChildFilter) {
                relationFilter.ChildFilter = this.parseComplexFilter(relationFilter.ChildFilter);
            }

            return relationFilter;
        } else if (filter.hasOwnProperty('DateFieldName')) {

            const datePeriod = <DateOffsetPeriod>filter;
            const combinedFilter: CombinedFilter = {
                Operator: 'AND',
                ChildFilters: []
            };

            const currentTime = new Date();
            switch (datePeriod.OffsetType) {
                case 'years':
                    currentTime.setFullYear(currentTime.getFullYear() - datePeriod.OffsetValue);
                    break;
                case 'months':
                    currentTime.setMonth(currentTime.getMonth() - datePeriod.OffsetValue);
                    break;
                case 'weeks':
                    currentTime.setDate(currentTime.getDate() - (datePeriod.OffsetValue * 7));
                    break;
                case 'days':
                    currentTime.setDate(currentTime.getDate() - datePeriod.OffsetValue);
                    break;
                default:
                    break;
            }

            const fromDateFilter: FilterClause = {
                FieldName: datePeriod.DateFieldName,
                Operator: FilterOperators.GreaterThanOrEqual,
                FieldValue: currentTime.toISOString()
            };

            const toDateFilter: FilterClause = {
                FieldName: datePeriod.DateFieldName,
                Operator: FilterOperators.LessThanOrEqual,
                FieldValue: new Date().toISOString()
            };

            combinedFilter.ChildFilters = [ fromDateFilter, toDateFilter ];
            return combinedFilter;
        } else {
            const parsedCombined = <CombinedFilter>filter;
            const newCollection = new Array(parsedCombined.ChildFilters.length);

            for (let i = 0; i < parsedCombined.ChildFilters.length; i++) {
                let currentChildFilter = parsedCombined.ChildFilters[i];
                const parsed = this.parseComplexFilter(currentChildFilter);
                newCollection[i] = parsed;
            }

            parsedCombined.ChildFilters = newCollection;

            return parsedCombined;
        }
    }
}
