'use client';

import React, { FocusEvent, MouseEvent } from 'react';
import { SearchInput } from './search-input';
import { VisibilityStyle } from '../styling/visibility-style';
import { classNames } from '@/framework/editor/utils/classNames';
import { getCustomAttributes } from '@/framework/editor/widgets/attributes';

const dataSfItemAttribute = 'data-sfitem';
const activeAttribute = 'data-sf-active';

export function SearchContent(props: any) {
    const { searchModel, requestContext, entity } = props;
    const [searchItems, setSearchItems] = React.useState<any[]>([]);
    const [dropDownWidth, setDropDownWidth] = React.useState<number | undefined>(undefined);
    const [dropDownShow, setDropDownShow] = React.useState<boolean>(false);

    const dropdownRef = React.useRef<HTMLUListElement>(null);
    const inputRef = React.useRef<HTMLInputElement>(null);
    const searchBoxCustomAttributes = getCustomAttributes(entity.Attributes, 'SearchBox');
    const disabled = requestContext.isEdit;
    const queryCollection = requestContext.searchParams || {};
    const cultureParam = queryCollection['sf_culture'];
    const culture = cultureParam ? cultureParam : searchModel.Culture;
    const sort = queryCollection!['orderBy'] || '';
    const visibilityClassHidden = searchModel.VisibilityClasses[VisibilityStyle.Hidden];
    const activeClass = searchModel.ActiveClass;

    const handleOnSearch =(suggestions: any[])=>{
        const items = Array.isArray(suggestions) ? suggestions : [];

        setSearchItems(items);
    };
    const handleShow = () => {
        const inputWidth = inputRef.current!.clientWidth;
        setDropDownWidth(inputWidth);
        setDropDownShow(true);
    };

    const handleHide = (clear: boolean = true) => {
        if (clear){
            handleOnSearch([]);
        }
        setDropDownWidth(undefined);
        setDropDownShow(false);
    };
    function navigateToResults() {
        const input = inputRef.current!;
        if ((window as any).DataIntelligenceSubmitScript) {
            (window as any).DataIntelligenceSubmitScript._client.sentenceClient.writeSentence({
                predicate: 'Search for',
                object: input.value.trim(),
                objectMetadata: [{
                    'K': 'PageUrl',
                    'V': location.href
                }]
            });
        }

        const url = getSearchUrl(input);
        (window as Window).location = url;
    }

    function getSearchUrl(input: HTMLInputElement) {
        let query = input.value.trim();
        let resultsUrl = input.getAttribute('data-sf-results-url') || '';
        let separator = resultsUrl.indexOf('?') === -1 ? '?' : '&';
        let catalogue = separator + 'indexCatalogue=' + input.getAttribute('data-sf-search-catalogue');
        let searchQuery = '&searchQuery=' + encodeURIComponent(query);
        let wordsMode = '&wordsMode=' + 'AllWords';
        let culture = '&sf_culture=' + input.getAttribute('data-sf-culture');

        let url = resultsUrl + catalogue + searchQuery + wordsMode + culture;

        let scoringSetting = input.getAttribute('data-sf-scoring-setting');
        if (scoringSetting) {
            url = url + '&scoringInfo=' + scoringSetting;
        }

        let sorting = input.getAttribute('data-sf-sort');
        if (sorting) {
            url = url + '&orderBy=' + sorting;
        }

        let resultsForAllSites = input.getAttribute('data-sf-results-all');
        if (resultsForAllSites === '1') {
            url += '&resultsForAllSites=True';
        } else if (resultsForAllSites === '2') {
            url += '&resultsForAllSites=False';
        }

        return url;
    }

    const handleDropDownClick = (e: MouseEvent) =>{
        let target = e.target as any;
        let content = target.innerText;
        inputRef.current!.value = content;
        navigateToResults();
        handleHide();
    };
    const handleDropDownBlur = (e: FocusEvent) => {
        if (dropdownRef.current != null && !dropdownRef.current.contains(e.relatedTarget)) {
            handleHide(false);
        }
    };
    const handleDropDownKeyUp =  (e: React.KeyboardEvent) => {
        const dropdown = dropdownRef.current;

        let key = e.keyCode;
        let activeLinkSelector = `[${dataSfItemAttribute}][${activeAttribute}]`;

        let activeLink = dropdown!.querySelector(activeLinkSelector);
        if (!activeLink) {
            return;
        }

        let previousParent = activeLink.parentElement!.previousElementSibling;
        let nextParent = activeLink.parentElement!.nextElementSibling;
        if (key === 38 && previousParent) {
            e.preventDefault();
            focusItem(previousParent);
        } else if (key === 40 && nextParent) {
            e.preventDefault();
            focusItem(nextParent);
        } else if (key === 13) {
            inputRef.current!.value = (activeLink as HTMLElement).innerText;
            navigateToResults();
            handleHide();
            inputRef.current!.focus();
        } else if (key === 27) {
            resetActiveClass();
            handleHide(false);
            inputRef.current!.focus();
        }
    };

    const firstItemfocus = () => {
        const dropdown = dropdownRef.current;
        if (dropdown && dropdown.children.length) {
            const item =dropdown!.children[0].querySelector(`[${dataSfItemAttribute}]`);
            focusItem(item?.parentElement);
        }
    };

    const focusItem = (item: any) => {
        resetActiveClass();

        let link = item.querySelector(`[${dataSfItemAttribute}]`);

        if (link && activeClass) {
            link.classList.add(...activeClass);
        }

        //set data attribute, to be used in queries instead of class
        link.setAttribute(activeAttribute, '');

        link.focus();
    };

    const resetActiveClass = () => {
        const dropdown = dropdownRef.current;
        let activeLink = dropdown!.querySelector(`[${activeAttribute}]`);

        if (activeLink && activeClass) {
            activeLink.classList.remove(...activeClass);
            activeLink.removeAttribute(activeAttribute);
        }
    };
    return (
      <>
        {
            searchModel.SearchIndex &&
            <div className="d-inline-flex qu-search__wrapper justify-content-center align-items-center">
              <SearchInput
                ref={inputRef}
                onSearch={handleOnSearch}
                onShow={handleShow}
                onHide={handleHide}
                onNavigate={navigateToResults}
                onBlur={handleDropDownBlur}
                onFocus={firstItemfocus}
                value={queryCollection['searchQuery']}
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
              <button data-sf-role="search-button"
                className="btn visually-hidden btn-primary ms-2 flex-shrink-0"
                disabled={disabled}>
                {searchModel.SearchButtonLabel}
              </button>
            </div>
        }
        {
           searchModel.SearchIndex && searchModel.SuggestionsTriggerCharCount != null && searchModel.SuggestionsTriggerCharCount >= 2 &&
                (
                <ul data-sf-role="search-box-autocomplete"
                  onClick={handleDropDownClick}
                  onKeyUp={handleDropDownKeyUp}
                  onBlur={handleDropDownBlur}
                  style={{
                    width:dropDownWidth
                    // display: dropDownShow ? '' : 'none'
                }}
                  ref={dropdownRef}
                  className={classNames('border bg-body list-unstyled position-absolute',{
                    [visibilityClassHidden]: !dropDownShow})}
                  role="listbox" >
                  {
                    searchItems.map((item: string, idx: number)=>{
                        return  (item && <li key={idx} role={'option'}
                          aria-selected={false}>
                          <button role="presentation"
                            className="dropdown-item text-truncate"
                            data-sfitem=""
                            title={item} tabIndex={-1}>
                            {item}</button>
                        </li>);
                    })
                  }

                </ul>
                )
        }
      </>
    );
}
