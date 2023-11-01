'use client';

import React from 'react';

const SearchInput = React.forwardRef((props: any, ref: any) => {
    const { onSearch, onShow, onHide, onNavigate, onFocus, ...others } = props;
    const [suggestions, setSuggestions] = React.useState<string[]>([]);


    function getSearchBoxParams(input: HTMLInputElement) {
        return {
            resultsUrl: input.getAttribute('data-sf-results-url'),
            catalogue: input.getAttribute('data-sf-search-catalogue'),
            scoringSetting: input.getAttribute('data-sf-scoring-setting'),
            minSuggestionLength: parseInt(input.getAttribute('data-sf-suggestions-length') || '', 10),
            siteId: input.getAttribute('data-sf-site-id'),
            culture: input.getAttribute('data-sf-culture'),
            suggestionFields: input.getAttribute('data-sf-suggestions-fields'),
            servicePath: input.getAttribute('data-sf-service-path'),
            orderBy: input.getAttribute('data-sf-sort'),
            resultsForAllSites: input.getAttribute('data-sf-results-all')
        };
    }

    const keydownHandler = (e: React.KeyboardEvent) => {
        const keyCode = e.code;

        if (keyCode === 'Enter') {
            onNavigate.call(undefined);
        }
    };

    const show = () => {
        onShow.call(undefined);
    };

    const hide = (clear = true) => {
        onHide.call(undefined, clear);
    };

    const keyupHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.code !== 'ArrowUp' &&
            e.code !== 'ArrowDown' &&
            e.code !== 'Escape') {

            let searchText =  (e.target as HTMLInputElement).value.trim();
            let config = getSearchBoxParams(e.target as HTMLInputElement);

            if (config.minSuggestionLength && searchText.length >= config.minSuggestionLength) {
                getSuggestions(e.target as HTMLInputElement);
            } else {
                hide();
            }
        }

        if (e.code === 'ArrowDown' && suggestions.length) {
            show();
            onFocus.call(undefined);
        }

        if(e.code === 'Escape') {
            hide();
        }
    };

    function getSuggestions(input: HTMLInputElement) {
        let data = getSearchBoxParams(input);
        let requestUrl = data.servicePath +
            '/Default.GetSuggestions()' +
            '?indexName=' + data.catalogue +
            '&sf_culture=' + data.culture +
            '&siteId=' + data.siteId +
            '&scoringInfo=' + data.scoringSetting +
            '&suggestionFields=' + data.suggestionFields +
            '&searchQuery=' + input.value;
        if (data.resultsForAllSites === '1') {
            requestUrl += '&resultsForAllSites=True';
        } else if (data.resultsForAllSites === '2') {
            requestUrl += '&resultsForAllSites=False';
        }

        fetch(requestUrl).then(function (res) {
            res.json().then(function (suggestions) {
                onSearch.call(undefined, suggestions.value);
                setSuggestions(suggestions.value);
                show();
            });
        }).catch(function () {
            hide();
        });
    }

    return (<input onKeyUp={keyupHandler} onKeyDown={keydownHandler} ref={ref}  {...others}  />);
});

export { SearchInput };
