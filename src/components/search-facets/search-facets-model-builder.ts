import { FacetField } from './interfaces/FacetField';
import { FacetElement } from './interfaces/FacetElement';
import { FacetResponseDto } from './interfaces/FacetResponseDto';
import { SitefinityFacetType } from './interfaces/SitefinityFacetType';
import { SearchIndexAdditonalFieldType } from './interfaces/SearchIndexAdditonalFieldType';
import { SearchFacetExtensions } from './search-facets-extensions';
import { WidgetSettingsFacetFieldMapper } from './facet-field-mapper';
import { SearchFacets } from './search-facets-class';

export  class SearchFacetsModelBuilder {
    static buildFacetsViewModel(
       facetsWidgetDefinition:  FacetField[],
       facets: {[key: string]: FacetResponseDto[]},
       facetableFieldsKeysFromIndex: string[],
       sortType: string
    ): any[]{
        let searchFacets: any[] = [];
        if (facetableFieldsKeysFromIndex.length) {
            const filteredFacetsWidgetDEfinition = facetsWidgetDefinition
            .filter(f => facetableFieldsKeysFromIndex.includes(f.FacetableFieldNames[0]));

            const sourceGroups: any= filteredFacetsWidgetDEfinition.reduce((group: any, contentVariation: FacetField) => {
                const { FacetableFieldNames } = contentVariation;
                    group[FacetableFieldNames[0]] = group[FacetableFieldNames[0]] ?? [];
                    group[FacetableFieldNames[0]].push(contentVariation);
                return group;
            }, {});

            const widgetFacetableFields = Object.fromEntries(
                Object.values(sourceGroups)
                    .map((e: unknown) => (e as any[])[(e as any[]).length - 1])
                    .map((p: FacetField) => [p.FacetableFieldNames[0], p])
                );

            for (let [facetKey, facet] of Object.entries(facets)) {
                let facetResponses: FacetResponseDto[] | null;
                if (facet.some(f => f.FacetType === SitefinityFacetType.Value)) {
                    facetResponses = facet.filter(f => f.FacetValue);
                } else {
                    facetResponses = facet;
                }

                const facetElementValues: FacetElement[]  = this.mapToFacetElementModel(facetResponses, facetKey, widgetFacetableFields);
                const facetField: FacetField = widgetFacetableFields[facetKey] as FacetField;
                let searchFacetViewModel = new SearchFacets(facetField, facetElementValues);
                searchFacets.push(searchFacetViewModel);
            }

            searchFacets = this.sortFacetsModel(widgetFacetableFields, searchFacets, sortType);
        }

        return searchFacets;
    }

     static  sortFacetsModel(
        facetableFieldsFromIndex: {[key: string]:FacetField},
        searchFacets: SearchFacets[],
        sortType: string): SearchFacets[] {
        if (sortType === this.AlphabeticallySort) {
            searchFacets = searchFacets
                .sort((a: SearchFacets, b: SearchFacets) => {
                    const nameA = a.FacetFieldName!.toUpperCase();
                    const nameB = b.FacetFieldName!.toUpperCase();
                    if (nameA < nameB) {
                      return -1;
                    }
                    if (nameA > nameB) {
                      return 1;
                    }

                    return 0;
                  });
        } else {
            const facetsOrder = Object.values(facetableFieldsFromIndex)
                    .map(x => x.FacetableFieldNames[0]);
           searchFacets = searchFacets
                .sort((a, b) => {
                    return facetsOrder.indexOf(a.FacetFieldName) - facetsOrder.indexOf(b.FacetFieldName);
                });
        }

        return searchFacets;
    }

    static mapToFacetElementModel(facetResponses: FacetResponseDto[], facetName: string, widgetFacetableFields: {[key: string]:FacetField}): FacetElement[] {
        const facetElementsViewModel: FacetElement[] = [];

        facetResponses.forEach((facet: FacetResponseDto) => {
            const facetViewModel: FacetElement = {};
            const facetElementLabel: string = this.getFacetLabel(facet, widgetFacetableFields[facetName]);
            if (facetElementLabel) {
                facetViewModel.FacetLabel = facetElementLabel;
                facetViewModel.FacetCount = facet.Count;
                facetViewModel.FacetValue = this.computeFacetValue(facet);

                facetElementsViewModel.push(facetViewModel);
            }
        });

        return facetElementsViewModel;
    }

     static  getFacetLabel(facetResponse: FacetResponseDto, facetField: FacetField): string {
        let facetLabel = '';
        if (SearchFacetExtensions.isValueFacet(facetField.FacetFieldSettings)) {
            facetLabel = facetResponse.FacetValue;
            return facetLabel;
        }

        let facetTableFieldType = facetField.FacetFieldSettings.FacetType;
        if (facetTableFieldType === SearchIndexAdditonalFieldType.NumberDecimal
                || facetTableFieldType === SearchIndexAdditonalFieldType.NumberWhole) {
            if (facetResponse.FacetType === SitefinityFacetType.Interval) {
                facetLabel = this.getIntervalNumberLabel(facetResponse, facetField);
                return facetLabel;
            } else if (facetResponse.FacetType === SitefinityFacetType.Range) {
                facetLabel = this.getRangeNumberLabel(facetResponse, facetField);
                return facetLabel;
            }
        } else if (facetTableFieldType === SearchIndexAdditonalFieldType.DateAndTime) {
            if (facetResponse.FacetType === SitefinityFacetType.Range) {
                facetLabel = this.getRangeDateLabel(facetResponse, facetField);
                return facetLabel;
            } else {
                const parsedDate = Date.parse(facetResponse.From);
                if (parsedDate) {
                    const fromValue = new Date(parsedDate);
                    let dateStep = WidgetSettingsFacetFieldMapper.getIntervalDateTime(facetField.FacetFieldSettings.DateStep);
                    facetLabel = this.formatDateInterval(dateStep, fromValue) || '';
                    return facetLabel;
                } else {
                    return '';
                }
            }
        }

        facetLabel = facetResponse.FacetValue;
        return facetLabel;
    }

     static  getRangeDateLabel(facetResponse: FacetResponseDto, facetableFieldSettings: FacetField): string {
        let dateRanges = facetableFieldSettings.FacetFieldSettings.DateRanges;

        let dateRange = dateRanges.find(r =>
            r.From && r.From.toISOString() === facetResponse.From &&
            r.To && r.To.toISOString() === facetResponse.To);

        if (dateRange != null) {
            return dateRange.Label;
        }

        return '';
    }

     static formatDateInterval(dateStep: string, intervalValue: Date) :string | null {
        const month = intervalValue.toLocaleString('default', { month: 'short' });
        switch (dateStep) {
            case 'day':
            case 'week':
            case 'quarter':
                return `${month} ${intervalValue.getDate()} ${intervalValue.getFullYear()}`;
            case 'month':
                return `${month} ${intervalValue.getFullYear()}`;
            case 'year':
                return intervalValue.getFullYear().toString(); //'yyyy'
            default:
                return null;
        }
    }

     static getRangeNumberLabel(facetResponse: FacetResponseDto, facetableFieldSettings: FacetField):string {
        const from: number = this.parseRangeValue(facetResponse.From);
        const to: number = this.parseRangeValue(facetResponse.To);

        let numberRanges = facetableFieldSettings.FacetFieldSettings.NumberRanges;
        if (numberRanges != null) {
            let numberRange = numberRanges.find(r => r.From === from && r.To === to);
            if (numberRange != null) {
                return numberRange.Label;
            }
        }

        let decimalNumbeRanges = facetableFieldSettings.FacetFieldSettings.NumberRangesDecimal;
        if (decimalNumbeRanges != null) {
            let numberRangeDecimal = decimalNumbeRanges.find(r => r.From === from && r.To === to);
            if (numberRangeDecimal != null) {
                return numberRangeDecimal.Label;
            }
        }

        return '';
    }

    static  getIntervalNumberLabel(facetResponse: FacetResponseDto, facetableFieldSettings: FacetField): string {
        let facetLabel:string;
        const prefix = facetableFieldSettings.FacetFieldSettings.Prefix;
        const suffix = facetableFieldSettings.FacetFieldSettings.Suffix;

        facetLabel = `${prefix}${facetResponse.From}${suffix} - ${prefix}${facetResponse.To}${suffix}`;
        return facetLabel;
    }

    static parseRangeValue(val: string): number {
        const parsedValue: number = parseInt(val, 10);
        return parsedValue;
    }

    static computeFacetValue(f: FacetResponseDto) : string {
        return f.FacetType === SitefinityFacetType.Value ? f.FacetValue : `${f.From}${this.RangeSeparator}${f.To}`;
    }

    static hasAnyFacetElements(searchFacets: SearchFacets[]): boolean {
        let hasAnyFacetElements: boolean = false;
        if (searchFacets && searchFacets.length) {
            hasAnyFacetElements = searchFacets.some(sf => sf.FacetElements.length);
        }

        return hasAnyFacetElements;
    }

    static AlphabeticallySort = '2';
    static RangeSeparator = '__sf-range__';
}
