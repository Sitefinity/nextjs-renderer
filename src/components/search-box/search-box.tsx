import React from "react";
import Script from "next/script";
import { StyleGenerator } from "../styling/style-generator.service";
import { OffsetStyle } from "../styling/offset-style";
import { StylingConfig } from "../styling/styling-config";
import { getCustomAttributes, htmlAttributes } from "sitefinity-react-framework/widgets/attributes";
import { classNames } from "sitefinity-react-framework/utils/classNames";
import { WidgetContext } from "sitefinity-react-framework/widgets/widget-context";
import { VisibilityStyle } from "../styling/visibility-style";

let inDevEnvironment = false;
if (process.env.NODE_ENV === 'development'){
  inDevEnvironment = true;
}

const scriptUrl = inDevEnvironment
    ? "./assets/js/search-widgets/search-box.js"
    : "./assets/js/search-widgets/search-box.min.js";

export async function SearchBox(props: WidgetContext<SearchBoxEntity>) {
    const entity = props.model.Properties;
    const requestContext = props.requestContext;
    const dataAttributes = htmlAttributes(props);
    const defaultClass = entity.CssClass;
    const marginClass = entity.Margins && StyleGenerator.getMarginClasses(entity.Margins);
    const searchBoxCustomAttributes = getCustomAttributes(entity.Attributes, 'SearchBox');
    dataAttributes["className"] = classNames(
        'position-relative',
        defaultClass,
        marginClass
        );
    dataAttributes["data-sfemptyicontext"] = "Create call to action";
    dataAttributes["data-sfhasquickeditoperation"] = true;

    const disabled = requestContext.isEdit;
    var queryCollection = requestContext.searchParams || {};
    var cultureParam = queryCollection[requestContext.culture];
    const culture = cultureParam ? cultureParam : '';
    const sort = queryCollection!["orderBy"];

    const currentSite = requestContext.pageNode.Site;
    const searchModel: any = {};

   searchModel.Attributes = entity.Attributes;
   searchModel.ViewName = entity.SfViewName;
   searchModel.CssClass = entity.CssClass;
   searchModel.SuggestionsTriggerCharCount = entity.SuggestionsTriggerCharCount;
   searchModel.SearchButtonLabel = entity.SearchButtonLabel;
   searchModel.SearchBoxPlaceholder = entity.SearchBoxPlaceholder;
   searchModel.SearchIndex = entity.SearchIndex;
   searchModel.SuggestionFields = entity.SuggestionFields;
  // searchModel.WebServicePath = `/${sfConfig.WebServicePath}`;
  // searchModel.SearchResultsPageUrl = await this.GetPageNodeUrl(entity.SearchResultsPage);
   searchModel.ShowResultsForAllIndexedSites = entity.ShowResultsForAllIndexedSites;

   searchModel.ScoringProfile = {
        ScoringSetting: entity.ScoringProfile || '',
        ScoringParameters: (entity.ScoringParameters && entity.ScoringParameters.length) ? entity.ScoringParameters.join(";") : ''
    };

    searchModel.SiteId = currentSite.Id;
    searchModel.Culture = requestContext.pageNode.Culture.Name;


    searchModel.ActiveClass = StylingConfig.ActiveClass;
    searchModel.VisibilityClasses = StylingConfig.VisibilityClasses;
    searchModel.SearchAutocompleteItemClass = StylingConfig.SearchAutocompleteItemClass;
    dataAttributes["data-sf-search-autocomplete-item-class"] = searchModel.SearchAutocompleteItemClass;
    dataAttributes["data-sf-visibility-hidden"] = searchModel.VisibilityClasses[VisibilityStyle.Hidden];
    dataAttributes["data-sf-active-class"] = searchModel.ActiveClass;

    return <>
    <div   {...dataAttributes}
    >
        {
            searchModel.SearchIndex &&
                <div className="d-flex">
                    <input value={queryCollection["searchQuery"]}
                           className="form-control" data-sf-role="search-box"
                           data-sf-results-url={searchModel.SearchResultsPageUrl}
                           data-sf-search-catalogue={searchModel.SearchIndex}
                           data-sf-scoring-setting={searchModel.ScoringProfile}
                           data-sf-suggestions-length={searchModel.SuggestionsTriggerCharCount}
                           data-sf-site-id={searchModel.SiteId}
                           data-sf-culture={culture} data-sf-sort={sort}
                           data-sf-suggestions-fields={searchModel.SuggestionFields}
                           data-sf-results-all={searchModel.ShowResultsForAllIndexedSites}
                           data-sf-service-path={searchModel.WebServicePath}
                           disabled={disabled} type="text"
                           placeholder={searchModel.SearchBoxPlaceholder}
                           {...searchBoxCustomAttributes}
                            />
                    <button data-sf-role="search-button" className="btn btn-primary ms-2 flex-shrink-0" disabled={disabled}>
                        {searchModel.SearchButtonLabel}
                    </button>
                </div>
        }
        {
           searchModel.SearchIndex && searchModel.SuggestionsTriggerCharCount != null && searchModel.SuggestionsTriggerCharCount >= 2 &&
                (
                    <ul data-sf-role="search-box-autocomplete" className="border bg-body list-unstyled position-absolute d-none" role="listbox">
                    </ul>
                )
        }
    </div>
       <Script type="text/javascript" src={scriptUrl} />
    </>;
}

export class SearchBoxEntity {
    Attributes?: any[];
    CssClass?: string;
    Margins?: OffsetStyle;
    SearchIndex?: string;
    SearchResultsPage?: any;
    SuggestionsTriggerCharCount?: number;
    ScoringProfile?: string;
    ScoringParameters?: string[];
    SfViewName?: string;
    SuggestionFields?: string;
    ShowResultsForAllIndexedSites?: number;
    SearchBoxPlaceholder?: string;
    SearchButtonLabel?: string;
}
