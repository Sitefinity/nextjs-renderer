import { Facet } from './interfaces/Facet';
import { FacetField } from './interfaces/FacetField';
import { SearchIndexAdditonalFieldType } from './interfaces/SearchIndexAdditonalFieldType';
import { SearchFacetExtensions } from './search-facets-extensions';
import { CustomFacetRange } from './interfaces/CustomFacetRange';
import { Settings } from './interfaces/Settings';
import { DateRange } from './interfaces/DateRange';
import { SitefinityFacetType } from './interfaces/SitefinityFacetType';
import { NumberRange } from './interfaces/NumberRange';

export class WidgetSettingsFacetFieldMapper {

    static getIntervalDateTime(dateStep: string) {
        if (dateStep) {
            switch (dateStep) {
                case '0':
                    return 'day';
                case '1':
                    return 'week';
                case '2':
                    return 'month';
                case '3':
                    return 'quarter';
                case '4':
                    return 'year';
                default:
                    return 'day';
            }
        }

        // UX: if there is no step specified we fallback to a day interval.
        return 'day';
    }

    static mapWidgetSettingsToFieldsModel(selectedFacetsToBeUsed: FacetField[]) {
        const facetFields: Facet[] = [];
        selectedFacetsToBeUsed.forEach((facet: FacetField)=> {
            let facetFieldName = facet.FacetableFieldNames.length ? facet.FacetableFieldNames[0] : '';

            let settings = facet.FacetFieldSettings!;

            if (facet.FacetFieldSettings!.RangeType === SearchFacetExtensions.AutoGeneratedFacet) {
                if (SearchFacetExtensions.isValueFacet(settings)) {
                    facetFields.push(this.createValueFacetFieldModel(facetFieldName, settings));
                } else if (settings.FacetType === SearchIndexAdditonalFieldType.NumberWhole ||
                            settings.FacetType === SearchIndexAdditonalFieldType.NumberDecimal) {
                    facetFields.push(this.createNumberIntervalFacetFieldModel(facetFieldName, settings));
                } else if (settings.FacetType === SearchIndexAdditonalFieldType.DateAndTime) {
                    facetFields.push(this.createDateIntervalFacetFieldModel(facetFieldName, settings));
                }
            } else {
                if (settings.FacetType === SearchIndexAdditonalFieldType.NumberWhole ||
                    settings.FacetType === SearchIndexAdditonalFieldType.NumberDecimal) {
                    facetFields.push(this.createNumberRangeFacetFieldModel(facetFieldName, settings));
                } else if (settings.FacetType === SearchIndexAdditonalFieldType.DateAndTime) {
                    facetFields.push(this.createDateRangeFacetFieldModel(facetFieldName || '', settings));
                }
            }
        });

        return facetFields;
    }

    static createDateRangeFacetFieldModel(facetFieldName: string, settings: Settings): Facet {
        const rangeList: CustomFacetRange[] = [];
        settings.DateRanges!.forEach((range: DateRange)=> {
            let valueFrom = range.From ? range.From.toISOString(): null;
            let valueTo = range.To ? range.To.toISOString() : null;

            if (valueFrom != null && valueTo != null) {
                rangeList.push({ From: valueFrom, To: valueTo });
            }
        });

        return {
            FieldName: facetFieldName,
            CustomIntervals: rangeList,
            FacetFieldType: settings.FacetType!,
            SitefinityFacetType: SitefinityFacetType.Range
        };
    }

    static createNumberRangeFacetFieldModel(facetFieldName: string, settings: Settings): Facet {
        const rangeList: CustomFacetRange[] =[];
        if (settings.NumberRanges != null) {
            rangeList.push(...settings
                .NumberRanges
                .map((range: NumberRange) => {
                    return {
                        From: range.From!.toString(),
                        To: range.To!.toString()
                    } as CustomFacetRange;
            }));
        }

        if (settings.NumberRangesDecimal != null) {
            rangeList.push(...settings
                .NumberRangesDecimal
                .map((range: NumberRange) => {
                    return {
                        From: range.From!.toString(),
                        To: range.To!.toString()
                    } as CustomFacetRange;
                }));
        }

        return {
            FieldName: facetFieldName,
            CustomIntervals: rangeList,
            FacetFieldType: settings.FacetType!,
            SitefinityFacetType: SitefinityFacetType.Range
        };
    }

    static createDateIntervalFacetFieldModel(facetFieldName: string, settings: Settings): Facet {
        return {
            FieldName: facetFieldName,
            IntervalRange: this.getIntervalDateTime(settings.DateStep!),
            FacetFieldType: settings.FacetType!,
            SitefinityFacetType: SitefinityFacetType.Interval
        };
    }

    static createNumberIntervalFacetFieldModel(facetFieldName: string, settings: Settings): Facet {
        return {
            FieldName: facetFieldName,
            IntervalRange: settings.NumberStep!.toString(),
            FacetFieldType: settings.FacetType!,
            SitefinityFacetType: SitefinityFacetType.Interval
        };
    }

    static createValueFacetFieldModel(facetFieldName: string, settings: Settings): Facet {
        return {
            FieldName: facetFieldName,
            SitefinityFacetType: SitefinityFacetType.Value,
            FacetFieldType: settings.FacetType!
        };
    }

    public static DateTimeFormat = 'yyyy-MM-ddTHH:mm:ss.fffZ';
}
