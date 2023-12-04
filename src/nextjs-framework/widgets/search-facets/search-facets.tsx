import React from 'react';

import { StyleGenerator } from '../styling/style-generator.service';
import { OffsetStyle } from '../styling/offset-style';
import { SearchFacetsService } from './search-facets.service';
import { FacetField } from './interfaces/FacetField';
import { FacetsViewModelDto } from './interfaces/FacetsViewModelDto';
import { Facet } from './interfaces/Facet';
import { WidgetSettingsFacetFieldMapper } from './facet-field-mapper';
import { FacetFlatResponseDto } from './interfaces/FacetFlatResponseDto';
import { SearchFacetsModelBuilder } from './search-facets-model-builder';
import { SearchFacetsClient } from './search-facets-client';
import { WidgetContext, classNames, getCustomAttributes, htmlAttributes } from '../../editor';

export async function SearchFacets(props: WidgetContext<SearchFacetsEntity>) {
    const model = props.model;
    const dataAttributes = htmlAttributes(props);
    const entity = {
        DisplayItemCount:true,
        IsShowMoreLessButtonActive: true,
        SelectedFacets: [],
        FilterResultsLabel: 'Filter results',
        AppliedFiltersLabel: 'Applied filters',
        ClearAllLabel:'Clear all',
        ShowMoreLabel: 'Show more',
        ShowLessLabel:'Show less',
        ...model.Properties
    };

    const context = props.requestContext;
    const searchParams = context.searchParams || {};
    const restService = props.restService || SearchFacetsService;
    const viewModel: any = {
        IndexCatalogue: entity.IndexCatalogue,
        Attributes: entity.Attributes,
        AppliedFiltersLabel: entity.AppliedFiltersLabel,
        ClearAllLabel: entity.ClearAllLabel,
        FilterResultsLabel: entity.FilterResultsLabel,
        ShowMoreLabel: entity.ShowMoreLabel,
        ShowLessLabel: entity.ShowLessLabel,
        IsShowMoreLessButtonActive: entity.IsShowMoreLessButtonActive,
        DisplayItemCount: entity.DisplayItemCount
    };

    const searchQuery = searchParams['searchQuery'];

    if (searchQuery) {
        const facetableFieldsFromIndex: FacetsViewModelDto[] = await restService.getFacetableFieldsFromIndex(entity.IndexCatalogue);
        const facetableFieldsKeys: string[] = facetableFieldsFromIndex.map((x: FacetsViewModelDto) => x.FacetableFieldNames.length ? x.FacetableFieldNames[0]: '' );
        const sourceGroups: {[key: string]: FacetField[] } = entity.SelectedFacets!.reduce((group: {[key: string]: FacetField [] }, contentVariation: FacetField) => {
            const { FacetableFieldNames } = contentVariation;
                group[FacetableFieldNames[0]] = group[FacetableFieldNames[0]] ?? [];
                group[FacetableFieldNames[0]].push(contentVariation);
            return group;
        }, {});
        const selectedFacetsToBeUsed: FacetField[] = Object.values(sourceGroups)
            .map((e: unknown) => (e as any[])[(e as any[]).length - 1])
            .filter((x: FacetsViewModelDto)=>facetableFieldsKeys.includes(x.FacetableFieldNames[0]));

        const facets: Facet[] = WidgetSettingsFacetFieldMapper.mapWidgetSettingsToFieldsModel(selectedFacetsToBeUsed);
        const filter = searchParams['filter'];
        const culture = searchParams['sf_culture'];
        const resultsForAllSites = searchParams['resultsForAllSites'];
        let searchServiceFacetResponse = await restService.getFacets(searchQuery, culture, entity.IndexCatalogue, filter, resultsForAllSites, entity.SearchFields, facets);

        const facetsDict = Object.fromEntries(
            searchServiceFacetResponse.map((p: FacetFlatResponseDto) => [p.FacetKey, p.FacetResponses])
          );
        viewModel.SearchFacets = SearchFacetsModelBuilder.buildFacetsViewModel(entity.SelectedFacets, facetsDict, facetableFieldsKeys, entity.SortType || '')
            .map(e=> {
                return {...e};
            });
    }

    viewModel.HasAnyFacetElements = SearchFacetsModelBuilder.hasAnyFacetElements(viewModel.SearchFacets);

    const defaultClass =  entity.WidgetCssClass;
    const marginClass = entity.MarginStyle && StyleGenerator.getMarginClasses(entity.MarginStyle);
    const searchFacetsCustomAttributes = getCustomAttributes(entity.Attributes, 'SearchFacets');

    dataAttributes['className'] = classNames(
        defaultClass,
        marginClass
    );
    dataAttributes['data-sfhasquickeditoperation'] = true;

    return (
      <>
        <div id="facetContainer"
          {...dataAttributes}
          {...searchFacetsCustomAttributes}
        >
          <SearchFacetsClient viewModel={viewModel} searchParams={searchParams} />
        </div>
        <input type="hidden" id="sf-currentPageUrl" value="@(this.Context?.Request.Path ?? string.Empty)" />
      </>
    );
}


export class SearchFacetsEntity {
    MarginStyle?: OffsetStyle;
    Attributes?: { [key: string]: Array<{ Key: string, Value: string}> };
    IndexCatalogue?: string;
    SelectedFacets?: FacetField[];
    SortType?: string;
    DisplayItemCount?: boolean;
    IsShowMoreLessButtonActive?: boolean;
    SfViewName?: string;
    WidgetCssClass?: string;
    SearchFields?: string;
    FilterResultsLabel?: string;
    AppliedFiltersLabel?: string;
    ClearAllLabel?: string;
    ShowMoreLabel?: string;
    ShowLessLabel?: string;

}
