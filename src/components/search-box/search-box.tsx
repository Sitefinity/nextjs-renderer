import React from 'react';
import { StyleGenerator } from '../styling/style-generator.service';
import { OffsetStyle } from '../styling/offset-style';
import { StylingConfig } from '../styling/styling-config';
import { htmlAttributes } from 'sitefinity-react-framework/widgets/attributes';
import { classNames } from 'sitefinity-react-framework/utils/classNames';
import { WidgetContext } from 'sitefinity-react-framework/widgets/widget-context';
import { VisibilityStyle } from '../styling/visibility-style';
import { SearchBoxRestService } from './search-box.service';
import { SearchContent } from './search-content';


export async function SearchBox(props: WidgetContext<SearchBoxEntity>) {
    const entity = props.model.Properties;
    const requestContext = props.requestContext;
    const dataAttributes = htmlAttributes(props);
    const defaultClass = entity.CssClass;
    const marginClass = entity.Margins && StyleGenerator.getMarginClasses(entity.Margins);

    dataAttributes['className'] = classNames(
        'position-relative',
        defaultClass,
        marginClass
    );
    dataAttributes['data-sfemptyicon'] = 'search';
    dataAttributes['data-sfemptyicontext'] = 'Set where to search';
    dataAttributes['data-sfhasquickeditoperation'] = true;

    const currentSite = requestContext.pageNode.Site;
    const searchModel: any = {};

   searchModel.Attributes = entity.Attributes;
   searchModel.ViewName = entity.SfViewName;
   searchModel.CssClass = entity.CssClass;
   searchModel.SuggestionsTriggerCharCount = entity.SuggestionsTriggerCharCount;
   searchModel.SearchButtonLabel = entity.SearchButtonLabel;
   searchModel.SearchBoxPlaceholder = entity.SearchBoxPlaceholder;
   searchModel.SearchIndex = entity.SearchIndex;
   searchModel.SuggestionFields = entity.SuggestionFields || 'Title,Content';
   const webServicePath =  process.env.SF_WEB_SERVICE_PATH;
   searchModel.WebServicePath = `/${webServicePath}`;
   searchModel.SearchResultsPageUrl = await SearchBoxRestService.GetPageNodeUrl(entity.SearchResultsPage);
   searchModel.ShowResultsForAllIndexedSites = entity.ShowResultsForAllIndexedSites || '0';

   searchModel.ScoringProfile = entity.ScoringProfile ? {
        ScoringSetting: entity.ScoringProfile || '',
        ScoringParameters: (entity.ScoringParameters && entity.ScoringParameters.length) ? entity.ScoringParameters.join(';') : ''
    } : '';

    searchModel.SiteId = currentSite.Id;
    searchModel.Culture = requestContext.culture;


    searchModel.ActiveClass = StylingConfig.ActiveClass;
    searchModel.VisibilityClasses = StylingConfig.VisibilityClasses;
    searchModel.SearchAutocompleteItemClass = StylingConfig.SearchAutocompleteItemClass;
    dataAttributes['data-sf-search-autocomplete-item-class'] = searchModel.SearchAutocompleteItemClass;
    dataAttributes['data-sf-visibility-hidden'] = searchModel.VisibilityClasses[VisibilityStyle.Hidden];
    dataAttributes['data-sf-active-class'] = searchModel.ActiveClass;

    return (<div     {...dataAttributes}
    >
      <SearchContent searchModel={searchModel} entity={entity} requestContext={requestContext} />
    </div>);
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
