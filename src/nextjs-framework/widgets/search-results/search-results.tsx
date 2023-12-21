import React from 'react';
import Image from 'next/image';

import { StyleGenerator } from '../styling/style-generator.service';
import { OffsetStyle } from '../styling/offset-style';
import { SearchResultsService } from './search-results.service';
import { SearchResultDocumentDto } from './interfaces/SearchResultDocumentDto';
import { LanguageEntry } from '../language-selector/language-selector';
import { SearchResultsSorting } from './interfaces/SearchResultsSorting';
import { SearchResultsViewModel } from './interfaces/SearchResultsViewModel';
import { OrderByDropDown } from './orderby-dropdown';
import { WidgetContext, classNames, getCustomAttributes, getUniqueId, htmlAttributes } from '../../editor';
import { ListDisplayMode } from '../../editor/widget-framework/list-display-mode';
import { ExtendedContentListSettings } from '../../editor/widget-framework/extended-content-list-settings';

export async function SearchResults(props: WidgetContext<SearchResultsEntity>) {
    const model = props.model;
    const dataAttributes = htmlAttributes(props);
    const entity = {
        SearchResultsHeader: 'Results for "{0}"',
        NoResultsHeader: 'No search results for "{0}"',
        ResultsNumberLabel: 'results',
        LanguagesLabel: 'Show results in',
        Sorting: SearchResultsSorting.MostRelevantOnTop,
        AllowUsersToSortResults: 1,
        ListSettings: {
            DisplayMode: ListDisplayMode.Paging,
            ItemsPerPage: 20
        },
        ...model.Properties
    };

    const context = props.requestContext;
    const searchParams = context.searchParams || {};
    const restService = SearchResultsService as any;

    const cultures = context.layout.Site.Cultures;
    const languageNames = new Intl.DisplayNames(['en'], {
        type: 'language'
      });

    const languages = cultures.map((culture: string) => {
        const entry: LanguageEntry = {
            Name: languageNames.of(culture) || culture,
            Value: culture,
            Selected: culture === culture,
            PageUrl: ''
        };

        return entry;
    });

    const viewModel: SearchResultsViewModel  = {
        SearchResults: [],
        ResultsHeader: entity.NoResultsHeader.replace('{0}', searchParams.searchQuery || ''),
        LanguagesLabel: entity.LanguagesLabel,
        ResultsNumberLabel: entity.ResultsNumberLabel,
        Attributes: entity.Attributes,
        CssClass: entity.CssClass,
        Languages: languages,
        AllowUsersToSortResults: entity.AllowUsersToSortResults === 1,
        Sorting: entity.Sorting,
        SortByLabel: 'Sort by'
    };
    const languagesCount = viewModel.Languages.length;
    const response: {TotalCount:number, SearchResults: SearchResultDocumentDto[]} = await restService.performSearch(entity, searchParams);
    viewModel.TotalCount = response.TotalCount || 0;
    viewModel.SearchResults = response.SearchResults || [];

    if (viewModel.SearchResults && viewModel.SearchResults.length > 0) {
        viewModel.ResultsHeader = entity.SearchResultsHeader.replace('{0}', searchParams.searchQuery || '');
    }

    const defaultClass =  entity.CssClass;
    const marginClass = entity.Margins && StyleGenerator.getMarginClasses(entity.Margins);
    const searchResultsCustomAttributes = getCustomAttributes(entity.Attributes, 'SearchResults');

    dataAttributes['className'] = classNames(
        defaultClass,
        marginClass
    );
    dataAttributes['data-sfhasquickeditoperation'] = true;
    let queryCollection = context.searchParams || {};
    let orderByQuery = queryCollection['orderBy'];
    let sorting = orderByQuery ? orderByQuery : viewModel.Sorting;
    let sortingSelectId = getUniqueId('sf-sort-');
    return (
      <>
        {
          <div className={viewModel.CssClass}
            {...dataAttributes}
            {...searchResultsCustomAttributes}
            id="sf-search-result-container"
            data-sf-role="search-results"
            data-sf-search-query={queryCollection['searchQuery']}
            data-sf-search-catalogue={queryCollection['indexCatalogue']}
            data-sf-words-mode={queryCollection['wordsMode']}
            data-sf-language={queryCollection['sf_culture']}
            data-sf-scoring-info={queryCollection['scoringInfo']}
            data-sf-results-all={queryCollection['resultsForAllSites']}
            data-sf-sorting={sorting}
            data-sf-filter={queryCollection['filter']}
                >
            <div className="d-flex align-items-center justify-content-between my-3">
              <h1 role="alert" aria-live="assertive">{viewModel.ResultsHeader}</h1>
              <div className="d-flex align-items-center gap-2">
                { (viewModel.AllowUsersToSortResults && viewModel.TotalCount > 0) && <>
                  <label htmlFor={sortingSelectId} className="form-label text-nowrap mb-0">
                    {viewModel.SortByLabel}
                  </label>
                  <OrderByDropDown context={context} sortingSelectId={sortingSelectId}
                    queryCollection={queryCollection} sorting={sorting} />
                </>
                    }
              </div>
            </div>
            <div>
              <h4>{viewModel.TotalCount} {viewModel.ResultsNumberLabel}</h4>
              <p data-sf-hide-while-loading="true">
                {viewModel.LanguagesLabel}
                {
                viewModel.Languages.map((language: LanguageEntry, idx: number) => {
                    return (<span key={idx}>
                      <a className="text-decoration-none" data-sf-role="search-results-language"
                        data-sf-language={language.Name}
                        href="#">{language.Name}
                      </a>
                      {idx + 1 < languagesCount ? ',' : null}
                    </span>);
                })
            }
              </p>
            </div>
            <div className="mt-4" data-sf-hide-while-loading="true">
              {viewModel.SearchResults.map((item: SearchResultDocumentDto, idx: number) => {
                const hasLink: boolean = !!item.Link;
                return (<div className="mb-3 d-flex" key={idx}>
                  { item.ThumbnailUrl &&
                    <div className="flex-shrink-0 me-3">
                      <a href={item.Link}>
                        <Image src={item.ThumbnailUrl} alt={item.Title} width="120" />
                      </a>
                    </div>
                    }
                  <div className="flex-grow-1">
                    <h3 className="mb-1">
                      { hasLink ?
                        <a className="text-decoration-none" href={item.Link}>{item.Title}</a>
                                :(item.Title)
                            }
                    </h3>
                    <p className="mb-1">
                      {
                        item.HighLighterResult // sanitize
                      }
                    </p>
                    { hasLink &&
                      <a className="text-decoration-none" href={item.Link}>{item.Link}</a>
                    }
                  </div>
                </div>);
                })
            }
            </div>
          </div>
        }

        <div id="sf-search-results-loading-indicator" style={{display:'none'}}>
          <div className="d-flex justify-content-center my-5">
            <div className="spinner-border text-primary my-5" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </>
    );
}


export class SearchResultsEntity {
    CssClass?: string;
    SearchFields?: string;
    HighlightedFields?: string;
    SearchResultsHeader?: string;
    NoResultsHeader?: string;
    ResultsNumberLabel?: string;
    LanguagesLabel?: string;
    Margins?: OffsetStyle;
    SfViewName?: string;
    ListSettings?: ExtendedContentListSettings;
    Sorting?: SearchResultsSorting;
    AllowUsersToSortResults?: number;
    Attributes?: { [key: string]: Array<{ Key: string, Value: string}> };
}
