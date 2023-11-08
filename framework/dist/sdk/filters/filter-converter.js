import { FilterOperators } from './filter-clause';
import { FilterTypes } from './filter-types';
export class FilterConverterService {
    static getMainFilter(variation) {
        let filter = null;
        if (variation.Filter && variation.Filter.Value) {
            switch (variation.Filter.Key) {
                case FilterTypes.Complex:
                    filter = this.parseComplexFilter(JSON.parse(variation.Filter.Value));
                    break;
                case FilterTypes.Ids:
                    const itemIds = variation.Filter.Value.split(',');
                    const filters = itemIds.map((x) => {
                        return {
                            FieldName: 'Id',
                            FieldValue: x.trim(),
                            Operator: FilterOperators.Equal
                        };
                    });
                    filter = {
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
    static parseComplexFilter(filter) {
        if (filter.hasOwnProperty('FieldName') && filter.hasOwnProperty('FieldValue')) {
            const filterClause = filter;
            return filterClause;
        }
        else if (filter.hasOwnProperty('Name') && filter.hasOwnProperty('Operator')) {
            let relationFilter = filter;
            if (relationFilter.ChildFilter) {
                relationFilter.ChildFilter = this.parseComplexFilter(relationFilter.ChildFilter);
            }
            return relationFilter;
        }
        else if (filter.hasOwnProperty('DateFieldName')) {
            const datePeriod = filter;
            const combinedFilter = {
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
            const fromDateFilter = {
                FieldName: datePeriod.DateFieldName,
                Operator: FilterOperators.GreaterThanOrEqual,
                FieldValue: currentTime.toISOString()
            };
            const toDateFilter = {
                FieldName: datePeriod.DateFieldName,
                Operator: FilterOperators.LessThanOrEqual,
                FieldValue: new Date().toISOString()
            };
            combinedFilter.ChildFilters = [fromDateFilter, toDateFilter];
            return combinedFilter;
        }
        else {
            const parsedCombined = filter;
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
