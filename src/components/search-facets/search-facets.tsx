import React from 'react';
import { getCustomAttributes, htmlAttributes } from 'sitefinity-react-framework/widgets/attributes';
import { WidgetContext } from 'sitefinity-react-framework/widgets/widget-context';
import { classNames } from 'sitefinity-react-framework/utils/classNames';
import { StyleGenerator } from '../styling/style-generator.service';
import { OffsetStyle } from '../styling/offset-style';
import { SearchFacetsService } from './search-facets.service';

export async function SearchFacets(props: WidgetContext<SearchFacetsEntity>) {
    const model = props.model;
    const dataAttributes = htmlAttributes(props);
    const entity = {

        ...model.Properties
    };

    const context = props.requestContext;
    const searchParams = context.searchParams || {};
    const restService = props.restService || SearchFacetsService;


    const defaultClass =  entity.CssClass;
    const marginClass = entity.Margins && StyleGenerator.getMarginClasses(entity.Margins);
    const searchFacetsCustomAttributes = getCustomAttributes(entity.Attributes, 'SearchFacets');

    dataAttributes['className'] = classNames(
        defaultClass,
        marginClass
    );
    dataAttributes['data-sfhasquickeditoperation'] = true;

    return (
      <>
        <div id="facetContainer" className="@Model.CssClass"
          {...dataAttributes}
          {...searchFacetsCustomAttributes}
        >
          {/* @if (Model.HasAnyFacetElements || (!string.IsNullOrEmpty(@Model.IndexCatalogue) && renderContext.IsEdit))
    {
        <h3 className="h6 mb-3 fw-normal">@Model.FilterResultsLabel</h3>

        if (Model.HasAnyFacetElements)
        {
            <div className="d-flex align-items-center justify-content-between">
                <label className="form-label">@Model.AppliedFiltersLabel</label>
                <button id="sf-facet-clear-all-btn" className="btn btn-link px-0 py-0 mb-2 text-decoration-none" hidden>@Model.ClearAllLabel</button>
            </div>
            <ul id="applied-filters" className="list-unstyled list-inline" data-sf-applied-filter-html-tag="li" data-sf-filter-label-css-className="list-inline-item bg-secondary bg-opacity-10 rounded-pill ps-2 pe-4 pb-1 me-1 mb-1 mw-100 position-relative overflow-hidden text-truncate text-nowrap" data-sf-remove-filter-css-className="px-2 position-absolute end-0">
            </ul>
        }
    }

    <div id="facetContent" className="mb-3">
        @foreach (var facet in Model.SearchFacets)
        {
            var value = 0;
            if (facet.FacetElements.Any() || facet.ShowNumberCustomRange || facet.ShowDateCustomRanges)
            {
                <h4 className="h6 fw-normal mt-3">@facet.FacetTitle</h4>

                <ul className="list-unstyled mb-0" id="facets-group-list-@facet.FacetFieldName" data-facet-type="@facet.FacetFieldType">
                    @foreach (var facetElement in facet.FacetElements)
                    {
                        value++;
                        bool hideElement = (value > defaultFacetsCollapseCount) && Model.IsShowMoreLessButtonActive;
                        <li @(hideElement ? "hidden" : string.Empty)>
                            <input type="checkbox"
                                   id="facet-checkbox-@facet.FacetFieldName-@facetElement.FacetValue"
                                   data-facet-key="@facet.FacetFieldName"
                                   data-facet-value="@facetElement.FacetValue" />


                            <label for="facet-checkbox-@facet.FacetFieldName-@facetElement.FacetValue" id="facet-@facet.FacetFieldName-@facetElement.FacetValue">@facetElement.FacetLabel</label>

                            @if (Model.DisplayItemCount)
                            {
                                <span className="small text-muted">(@facetElement.FacetCount)</span>
                            }
                        </li>
                    }
                </ul>
                if (facet.FacetElements.Count > defaultFacetsCollapseCount && Model.IsShowMoreLessButtonActive)
                {
                    <button type="button" className="btn btn-link p-0 text-decoration-none" show-more="@Model.ShowMoreLabel" show-less="@Model.ShowLessLabel" data-facet-type="@facet.FacetFieldName" id="show-more-less-@facet.FacetFieldName">@Model.ShowMoreLabel</button>
                }

                if (facet.ShowNumberCustomRange)
                {
                    <div className="mt-2 d-flex flex-row align-items-center">
                        <div className="-sc-w-5rem">
                        @if (facet.FacetFieldType == "NumberWhole")
                        {
                                <input type="number"
                                        id="from-@facet.FacetFieldName"
                                        className="form-control"
                                        data-custom-range="true"
                                        placeholder="Min"
                                        onkeypress="return event.charCode >= 48 && event.charCode <= 57" />
                        }
                        else
                        {
                            <input type="number"
                                    id="from-@facet.FacetFieldName"
                                    className="form-control"
                                    data-custom-range="true"
                                    placeholder="Min" />
                        }
                        </div>
                        <span className="mx-2">&mdash;</span>

                        <div className="-sc-w-5rem">
                        @if (facet.FacetFieldType == "NumberWhole")
                        {
                            <input type="number"
                                    id="to-@facet.FacetFieldName"
                                    className="form-control"
                                    data-custom-range="true"
                                    placeholder="Max"
                                    onkeypress="return event.charCode >= 48 && event.charCode <= 57" />
                        }
                        else
                        {
                            <input type="number"
                                    id="to-@facet.FacetFieldName"
                                    className="form-control"
                                    data-custom-range="true"
                                    placeholder="Max" />
                        }
                        </div>
                        <button type="button"
                        id="custom-range-btn-@facet.FacetFieldName"
                        className="btn btn-outline-secondary ms-2 d-flex align-items-center"
                        data-custom-range-name="@facet.FacetFieldName"
                        data-custom-range-type="@facet.FacetFieldType"
                        aria-label='Custom range for @facet.FacetFieldName'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="my-1" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" /> </svg>
                        </button>
                    </div>
                }

                if (facet.ShowDateCustomRanges)
                {
                    <div className="mt-2 d-flex flex-row align-items-center">
                        <div className="-sc-w-10rem">
                            <input type="date"
                                    id="from-@facet.FacetFieldName"
                                    className="form-control"
                                    data-custom-range="true"
                                    aria-label='From @facet.FacetFieldName' />
                        </div>
                        <span className="mx-2">&mdash;</span>
                        <div className="-sc-w-10rem">
                            <input type="date"
                                    id="to-@facet.FacetFieldName"
                                    className="form-control"
                                    data-custom-range="true"
                                    aria-label='To @facet.FacetFieldName' />
                        </div>
                        <button type="button"
                            id="custom-range-btn-@facet.FacetFieldName"
                            className="btn btn-outline-secondary ms-2 d-flex align-items-center"
                            data-custom-range-name="@facet.FacetFieldName"
                            data-custom-range-type="@facet.FacetFieldType"
                            aria-label='Custom range for @facet.FacetFieldName'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="my-1" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" /> </svg>
                        </button>
                    </div>
                }
            }
        }
    </div>*/}

        </div>

        <input type="hidden" id="sf-currentPageUrl" value="@(this.Context?.Request.Path ?? string.Empty)" />
      </>
    );
}


export class SearchFacetsEntity {
    CssClass?: string;
    Margins?: OffsetStyle;
    Attributes?: { [key: string]: Array<{ Key: string, Value: string}> };
}
