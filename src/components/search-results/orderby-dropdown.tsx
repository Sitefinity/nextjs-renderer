'use client';

import React from 'react';
import { SearchResultsSorting } from './interfaces/SearchResultsSorting';
import { RequestContext } from 'sitefinity-react-framework/services/request-context';
import { getWhiteListQueryList } from '../document-list/common/utils';

export async function OrderByDropDown(props: {
    sortingSelectId: string;
    queryCollection: {
        [key: string]: string;
    },
    sorting: string;
    context: RequestContext
}) {
    const { sortingSelectId, queryCollection, sorting, context} = props;
    const whitelistedQueryParams = ['sf_site','sfaction','sf_provider'];
    const queryList = getWhiteListQueryList(context, whitelistedQueryParams);
    const query = queryCollection['searchQuery'];
    const index = queryCollection['indexCatalogue'];
    const wordsMode = queryCollection['wordsMode'];
    const language =queryCollection['sf_culture'];
    const scoringInfo=queryCollection['scoringInfo'];
    const resultsForAllSites =queryCollection['resultsForAllSites'];
    const orderBy=sorting;
    const filter=queryCollection['filter'];

    const handleSelectionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const orderValue = event.target.value || orderBy;
        let newQuery = queryList + '&searchQuery=' + query +
            '&indexCatalogue=' + index +
            '&wordsMode=' + wordsMode +
            '&sf_culture=' + language +
            '&orderBy=' + orderValue;

        if (scoringInfo) {
            newQuery = newQuery + '&scoringInfo=' + scoringInfo;
        }

        if (filter) {
            newQuery = newQuery + '&filter=' + filter;
        }

        if (resultsForAllSites === 'True') {
            newQuery += '&resultsForAllSites=True';
        } else if (resultsForAllSites === 'False') {
            newQuery += '&resultsForAllSites=False';
        }

        window.location.search = newQuery;
    };

    return (
      <select onChange={handleSelectionChange} className="userSortDropdown form-select" value={orderBy}
        title="SortDropdown" id={sortingSelectId}>
        <option value={SearchResultsSorting.MostRelevantOnTop}>Relevance</option>
        <option value={SearchResultsSorting.NewestFirst}>Newest first</option>
        <option value={SearchResultsSorting.OldestFirst}>Oldest first</option>
      </select>
    );
}

