'use client';

import React from 'react';
import { SearchFacets as SearchFacetsClass } from './search-facets-class';
import { FacetElement } from './interfaces/FacetElement';

const defaultFacetsCollapseCount = 10;
const FILTER_QUERY_PARAM = 'filter';
const RANGE_SEPARATOR = '__sf-range__';
const DATE_AND_TIME = 'DateAndTime';

interface GroupedCheckedFacets {[key:string]: {
    filterValue: string;
    isCustom: boolean;
}[]}

interface AppliedFilterObject {
    appliedFilters: {
            fieldName: string;
            filterValues: {
                fieldName: string;
                filterValues: string[]
            }[];
        }[];
    lastSelectedFilterGroupName: string;
    isDeselected: boolean;
}

export function SearchFacetsClient(props: any) {
    const { viewModel, searchParams } = props;
    const filterQuery = searchParams[FILTER_QUERY_PARAM];
    const inputRefs: {[key: string]: HTMLInputElement} = {};
    const groupUlRefs: {[key: string]: HTMLUListElement} = {};
    const appliedFiltersRef = React.useRef<HTMLUListElement>(null);
    const appliedFiltersContainer = appliedFiltersRef.current;
    const [showClearButton, setShowClearButton] = React.useState(!!filterQuery);

    const setInputsRef = (id: string) => (ref: HTMLInputElement) => {
      inputRefs[id] = ref;
    };

    const setUlsRef = (id: string) => (ref: HTMLUListElement) => {
        groupUlRefs[id] = ref;
      };

    const clearButtonClick = () => {
        const checkedFilters = Object.entries(inputRefs)
            .filter(([key, val])=>key.includes('facet-checkbox') && val && val.checked)
            .map(([_key, val]) => val);
        checkedFilters.forEach(function (checkedInput) {
            checkedInput.checked = false;
        });

        const customRangeConainterToBeCleared = Object.entries(inputRefs)
            .filter(([key, _val])=>!key.includes('facet-checkbox'))
            .map(([_key, val]) => val);
        if (customRangeConainterToBeCleared) {
            customRangeConainterToBeCleared.forEach(function (el) {
                el.value = '';
            });
        }

        appliedFiltersContainer!.innerText = '';
        let filterObject = buildFilterObjectBasedOnPopulatedInputs(null);
        searchWithFilter(filterObject);
    };

    const handleCheckboxChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        processSelectedFilter(ev.target);
        let filterObject = buildFilterObjectBasedOnPopulatedInputs(ev.target);
        searchWithFilter(filterObject);
    };


   // if (facetWidgetWrapper) {

        // let showAllFacetsFields = document.querySelectorAll('[id^="show-more-less"]');
        // let customSearchButton = document.querySelectorAll('[id^="custom-range"]');

        // if (showAllFacetsFields || customSearchButton) {
        //     facetWidgetWrapper.addEventListener('click', function (ev) {
        //         if (ev.target && ev.target.id.startsWith('show-more-less')) {
        //             let facetKey = ev.target.attributes['data-facet-type'].value;
        //             let showLessText = ev.target.attributes['show-less'].value;
        //             let showMoreText = ev.target.attributes['show-more'].value;

        //             let ulFacetListId = 'facets-group-list-' + facetKey;
        //             let facetList = Array.from(document.querySelectorAll('#' + ulFacetListId + '>li'));
        //             addOrRemoveHiddenAttributeInCollection(facetList, ev, showLessText, showMoreText);
        //         }

        //         let customRangeButton = ev.target.id.startsWith('custom-range-btn') ?
        //             ev.target :
        //             ev.target.closest('[id^="custom-range-btn"]');

        //         if (customRangeButton) {
        //             customRangeSelectedEventHandler(customRangeButton);
        //         }
        //     });
        // }
  //  }

    // if (appliedFiltersContainer) {
    //     appliedFiltersContainer.addEventListener('click', function (ev) {
    //         if (!ev.target || !ev.target.hasAttribute('data-facet-key')) {
    //             return;
    //         }
    //         let spanToRemove = ev.target.parentElement;
    //         appliedFiltersContainer.removeChild(spanToRemove);

    //         let facetKey = ev.target.attributes['data-facet-key'].value;
    //         let facetValue = ev.target.attributes['data-facet-value'].value;

    //         if (ev.target.hasAttribute('data-selected-custom-range')) {
    //             let customRangeContainerId = 'facets-group-list-' + facetKey;
    //             let customRangeConainterToBeCleared = document.querySelectorAll('#' + customRangeContainerId + ' input');
    //             if (customRangeConainterToBeCleared) {
    //                 customRangeConainterToBeCleared.forEach(function (el) {
    //                     el.value = '';
    //                 });
    //             }
    //         } else {
    //             let inputId = 'facet-checkbox-' + facetKey + '-' + facetValue;
    //             let facetCheckedInputEl = document.getElementById(inputId);
    //             if (facetCheckedInputEl) {
    //                 facetCheckedInputEl.checked = false;
    //             }
    //         }
    //         facetWidgetWrapper.dispatchEvent(new Event('change'));
    //     });
    // }

    React.useEffect(()=>{
        markSelectedInputs(true);

        showHideShowMoreLessButtons();
    },[]);


    function searchWithFilter(filterObject: AppliedFilterObject) {
        let filterString = JSON.stringify(filterObject);
        const newSearchParam = {...searchParams};

        if (filterObject && filterObject.appliedFilters && filterObject.appliedFilters.length > 0) {
            let encodedFilterString = btoa(filterString);
            newSearchParam[FILTER_QUERY_PARAM] = encodedFilterString;
            setShowClearButton(true);

        } else {
            delete newSearchParam[FILTER_QUERY_PARAM];
            setShowClearButton(false);
        }

        let url = buildUrl(newSearchParam);

        loadDataAsync(url);
        window.history.pushState({ path: url }, '', url);
    }

    function uncheckCheckboxesFromGroup(facetFieldName: string) {
        let facetListelement = groupUlRefs['facets-group-list-' + facetFieldName];
        if (facetListelement) {
            const checkedFilters = Object.entries(inputRefs)
                .filter(([key, val])=>key.includes('facet-checkbox') && val && val.checked)
                .map(([_key, val]) => val);
            checkedFilters.forEach(function (el) {
                el.checked = false;
                processSelectedFilter(el);
            });
        }
    }

    function computeFacetRangeValueForType(fieldType: string, fromValue: string, toValue: string) {
        if (fieldType === DATE_AND_TIME) {
            let fromdate = new Date(fromValue);
            fromdate.setHours(0);
            let toDate = new Date(toValue);
            toDate.setHours(0);

            return fromdate.toISOString() + RANGE_SEPARATOR + toDate.toISOString();
        }

        return fromValue + RANGE_SEPARATOR + toValue;
    }

    function computeFacetRangeLabelForType(fieldType: string, fromValue: string, toValue: string) {
        if (fieldType === DATE_AND_TIME) {
            let fromDateTime = new Date(fromValue);
            let dateOptions: object = { month: 'short', day: 'numeric' };
            let fromString = fromDateTime.toLocaleString(undefined, dateOptions) + ' ' + fromDateTime.getFullYear();

            let toDateTime = new Date(toValue);
            let toString = toDateTime.toLocaleString(undefined, dateOptions) + ' ' + toDateTime.getFullYear();

            return fromString + ' - ' + toString;
        }

        return fromValue + ' - ' + toValue;
    }

    function customRangeSelectedEventHandler(element: HTMLElement) {
        let facetFieldAttribute = element.attributes['data-custom-range-name'];
        let facetFieldTypeAttribute = element.attributes['data-custom-range-type'];
        if (facetFieldAttribute && facetFieldTypeAttribute) {
            let facetFieldName = facetFieldAttribute.value;
            let facetFieldType = facetFieldTypeAttribute.value;
            if (facetFieldName && facetFieldType) {
                let fromInput = inputRefs['from-' + facetFieldName];
                let toInput = inputRefs['to-' + facetFieldName];

                if (fromInput && toInput) {
                    uncheckCheckboxesFromGroup(facetFieldName);

                    let fromValue = fromInput.value;
                    let toValue = toInput.value;

                    if (fromValue !== null && fromValue !== undefined && fromValue !== '' && toValue !== null && toValue !== undefined && toValue !== '') {
                        let facetChipValue = computeFacetRangeValueForType(facetFieldType, fromValue, toValue);
                        let facetChipLabel = computeFacetRangeLabelForType(facetFieldType, fromValue, toValue);

                        // if the entered custom range exist in the generated facet - select them and don't create Custom range applied element
                        let inputId = 'facet-checkbox-' + facetFieldName + '-' + facetChipValue;
                        let isCustomFacetRange = true;
                        let generatedFacetCheckBox = inputRefs[inputId];
                        if (generatedFacetCheckBox) {
                            isCustomFacetRange = false;
                            generatedFacetCheckBox.checked = true;
                        }

                        appendAppliedFilterElement(facetFieldName, facetChipValue, facetChipLabel, isCustomFacetRange);
                        let checkedFacetInputs: GroupedCheckedFacets = groupAllCheckedFacetInputs();
                        appendCustomRangesToCheckedFacetInputs(checkedFacetInputs);

                        let filterObjectWithCustomFilter = constructFilterObject(checkedFacetInputs, facetFieldName, false);
                        searchWithFilter(filterObjectWithCustomFilter);
                    }
                }
            }
        }
    }

    function appendCustomRangesToCheckedFacetInputs(checkedFacetInputs: any) {
        // let appliedCustomRangesChips = document.querySelectorAll('[data-selected-custom-range]');
        // appliedCustomRangesChips.forEach(function (customRangeContainer) {
        //     let customRangeValuesAttr = customRangeContainer.attributes['data-facet-value'];
        //     let customRangeFilterKeyAttr = customRangeContainer.attributes['data-facet-key'];

        //     if (customRangeValuesAttr && customRangeFilterKeyAttr) {
        //         let filterValue = customRangeValuesAttr.value;
        //         let filterKey = customRangeFilterKeyAttr.value;

        //         let filterValueObj = {
        //             filterValue: filterValue,
        //             isCustom: true
        //         };

        //         if (checkedFacetInputs.hasOwnProperty(filterKey)) {
        //             checkedFacetInputs[filterKey].push(filterValueObj);
        //         } else {
        //             checkedFacetInputs[filterKey] = [filterValueObj];
        //         }
        //     }
        // });
    }

    function appendAppliedFilterElement(facetKey: string, facetValue: string, facetLabel: string, isCustomRange: boolean) {
        // let elementId = buildRemoveFacetFilterId(facetKey, facetValue);
        // let customFilterAlreadyApplied = document.getElementById(elementId) !== null;
        // if (!customFilterAlreadyApplied) {
        //     // remove other custom filters for the same facet group before adding the new one
        //     removeCustomRangeChipsForGroup(facetKey);

        //     let newFilter = createAppliedFilterElementInternal(elementId, facetKey, facetValue, facetLabel, isCustomRange);
        //     appliedFiltersContainer!.appendChild(newFilter);
        // }
    }

    function removeCustomRangeChipsForGroup(groupName: string) {
        let appliedCustomRangesChips = appliedFiltersContainer!.querySelectorAll('[data-selected-custom-range][data-facet-key="' + groupName + '"]');
        if (appliedCustomRangesChips) {
            appliedCustomRangesChips.forEach(function (el) {
                appliedFiltersContainer!.removeChild(el.parentElement!);
            });
        }
    }

    function buildUrl(queryStringParams: {
        [key: string]: string;
    }) {
        let currentLocation = window.location.href.split('?')[0];

        // return the pager to 0
        delete queryStringParams.page;
        const queryString =  new URLSearchParams(queryStringParams);
        let url = currentLocation + '?' + queryString;

        return url;
    }

    function processSelectedFilter(element: HTMLInputElement) {
        if (!element || element.tagName.toLowerCase() !== 'input' || element.attributes['data-custom-range']) {
            return;
        }

        let facetKey = element.attributes['data-facet-key'].value;
        let facetValue = element.attributes['data-facet-value'].value;
        let facetLabel = element.parentElement!.getElementsByTagName('label')[0].textContent || '';
        let removeFacetSpanElementId = buildRemoveFacetFilterId(facetKey, facetValue);

       // let facetFilterEl = document.getElementById(removeFacetSpanElementId);

        // if (element.checked) {
        //     let newFilter = createAppliedFilterElementInternal(removeFacetSpanElementId, facetKey, facetValue, facetLabel, false);
        //     appliedFiltersContainer!.appendChild(newFilter);

        //     // after we select a facet checkbox the custom range selection must be removed if exists
        //     removeCustomRangeChip(facetKey);
        // } else {
        //     appliedFiltersContainer!.removeChild(facetFilterEl.parentElement);
        // }
    }

    function removeCustomRangeChip(facetKey: string) {
        // let customRangeElementFacetKeyAttribute = '[data-facet-key=\'' + facetKey + '\']';
        // let customRangeElementQuerySelector = customRangeElementFacetKeyAttribute + '[data-selected-custom-range]';
        // let customRangelementToRemove = document.querySelector(customRangeElementQuerySelector);
        // if (customRangelementToRemove) {
        //     appliedFiltersContainer!.removeChild(customRangelementToRemove.parentElement);
        // }
    }

    function buildRemoveFacetFilterId(facetKey: string, facetValue: string) {
        return 'remove-facet-filter-' + facetKey + '-' + facetValue;
    }

    function createAppliedFilterElementInternal(
        removeFilterId: string,
        facetKey: string,
        filterValue: string,
        facetLabel: string,
        isCustomRange: boolean
    ) {
        // let filterLabelClass = appliedFiltersContainer!.attributes['data-sf-filter-label-css-class'].value;
        // let appliedFilterHtmlTag = appliedFiltersContainer!.attributes['data-sf-applied-filter-html-tag'].value || 'span';
        // let filterSpanEl = document.createElement(appliedFilterHtmlTag);

        // filterSpanEl.setAttribute('class', filterLabelClass);
        // filterSpanEl.innerText = facetLabel;

        // let removeFilterClass = appliedFiltersContainer!.attributes['data-sf-remove-filter-css-class'].value;
        // let removeButtonSpan = document.createElement('span');
        // removeButtonSpan.setAttribute('id', removeFilterId);
        // removeButtonSpan.setAttribute('role', 'button');
        // removeButtonSpan.setAttribute('tabindex', '0');
        // removeButtonSpan.setAttribute('title', 'Remove');
        // removeButtonSpan.setAttribute('class', removeFilterClass);
        // removeButtonSpan.setAttribute('data-facet-key', facetKey);
        // removeButtonSpan.setAttribute('data-facet-value', filterValue);
        // if (isCustomRange) {
        //     removeButtonSpan.setAttribute('data-selected-custom-range', 'true');
        // }

        // removeButtonSpan.innerText = '✕';

        // filterSpanEl.appendChild(removeButtonSpan);

        // return filterSpanEl;
    }

    function loadDataAsync(url: string) {
        let xmlHttp = new XMLHttpRequest();
        xmlHttp.open('GET', url, true); // true for asynchronous
        xmlHttp.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        xmlHttp.setRequestHeader('Accept', 'application/json');
      //  document.dispatchEvent(new CustomEvent('beginLoadingSearchResults'));

        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState === 4 && xmlHttp.status === 200 && xmlHttp.responseText) {
                let parser = new DOMParser();
                let htmlDoc = parser.parseFromString(xmlHttp.responseText, 'text/html');

                if (htmlDoc) {
                    // document.dispatchEvent(new CustomEvent('searchResultsLoaded', {
                    //     detail: {
                    //         searchResultsPageDocument: htmlDoc
                    //     }
                    // }));

                    rebindSearchFacets(htmlDoc);
                }
            }
        };

        xmlHttp.onerror = function () {
            // document.dispatchEvent(new CustomEvent('searchResultsLoaded', {
            //     detail: {
            //         searchResultsPageDocument: null
            //     }
            // }));
        };

        xmlHttp.send(null);
    }

    function rebindSearchFacets(htmlDoc) {
        let newSearchFacets = htmlDoc.getElementById('facetContent');
        // let oldSearchFacetsContent = document.getElementById('facetContent');
        // oldSearchFacetsContent.innerHTML = newSearchFacets.innerHTML;

        markSelectedInputs();
        showHideShowMoreLessButtons();
    }

    function markSelectedInputs(createAppliedFiltersChips?: boolean) {
        if (filterQuery) {
            let decodedFilterParam = atob(filterQuery);

            let jsonFilters: AppliedFilterObject = JSON.parse(decodedFilterParam);

            jsonFilters.appliedFilters.forEach(function (filter: { filterValues: any[], fieldName: string}) {
                filter.filterValues.forEach(function (fvObj) {
                    let fieldName = decodeURIComponent(filter.fieldName);
                    let filterValue = decodeURIComponent(fvObj.filterValue);
                    let inputId = 'facet-checkbox-' + fieldName + '-' + filterValue;
                    let currentInputElement = inputRefs[inputId];

                    if (!currentInputElement) {
                        // try to find with different decimal point separator
                        inputId = inputId.replace(/\./g, ',');
                        currentInputElement = inputRefs[inputId];
                    }

                    if (currentInputElement) {
                        currentInputElement.checked = true;
                        if (createAppliedFiltersChips) {
                            processSelectedFilter(currentInputElement);
                        }
                    } else {
                        let facetElementListId = 'facets-group-list-' + fieldName;
                        let facetElementList = groupUlRefs[facetElementListId];
                        if (facetElementList) {
                            let facetTypeAttr = (facetElementList.attributes as any)['data-facet-type'];
                            if (facetTypeAttr) {
                                let facetType = facetTypeAttr.value;
                                if (facetType) {
                                    populateCustomRangeInputs(fieldName, filterValue, facetType);
                                }
                            }
                        }
                    }
                });
            });
        }
    }

    function convertToDatePickerInputValueFromUtcString(dateString: string) {
        let dateObject = new Date(dateString);
        let month: number | string = dateObject.getMonth() + 1;
        month = month.toString();
        if (month.length !== 2) {
            month = '0' + month;
        }
        let date = dateObject.getDate().toString();
        if (date.length !== 2) {
            date = '0' + date;
        }

        let result = dateObject.getFullYear() + '-' + month + '-' + date;

        return result;
    }

    function populateCustomRangeInputs(fieldName: string, filterValue: string, facetType: string) {
        let fromCustomInput = inputRefs['from-' + fieldName];
        let toCustomInput = inputRefs['to-' + fieldName];
        if (fromCustomInput && toCustomInput) {
            let splittedFilterValue = filterValue.split(RANGE_SEPARATOR);
            if (splittedFilterValue && splittedFilterValue.length > 0) {
                let fromValueToSet = splittedFilterValue[0];
                let toValueToSet = splittedFilterValue[1];

                if (fromValueToSet !== null && fromValueToSet !== undefined && toValueToSet !== null && toValueToSet !== undefined) {
                    if (facetType === DATE_AND_TIME) {
                        fromValueToSet = convertToDatePickerInputValueFromUtcString(fromValueToSet);
                        toValueToSet = convertToDatePickerInputValueFromUtcString(toValueToSet);
                    }

                    fromCustomInput.value = fromValueToSet;
                    toCustomInput.value = toValueToSet;

                    let facetChipLabel = computeFacetRangeLabelForType(facetType, fromValueToSet, toValueToSet);
                    appendAppliedFilterElement(fieldName, filterValue, facetChipLabel, true);
                }
            }
        }
    }

    function buildFilterObjectBasedOnPopulatedInputs(eventTargetElement: HTMLInputElement | null) {
        let groupedFilters = groupAllCheckedFacetInputs();

        let lastSelectedElementKey;
        if (eventTargetElement && eventTargetElement.tagName.toLowerCase() === 'input') {
            lastSelectedElementKey = (eventTargetElement.attributes as any)['data-facet-key'].value;
        }

        let isDeselected = false;
        if (eventTargetElement && eventTargetElement.tagName.toLowerCase() === 'input') {
            lastSelectedElementKey = (eventTargetElement.attributes as any)['data-facet-key'].value;
            isDeselected = !eventTargetElement.checked;
        }

        appendCustomRangesToCheckedFacetInputs(groupedFilters);
        let filterObject = constructFilterObject(groupedFilters, lastSelectedElementKey, isDeselected);

        return filterObject;
    }

    function constructFilterObject(
        groupedFilters: GroupedCheckedFacets,
        lastSelectedElementKey: string,
        isDeselected: boolean
    ): AppliedFilterObject {
        let filterObject: AppliedFilterObject = {
            appliedFilters: Object.keys(groupedFilters).map(function (el) {
                return {
                    fieldName: el,
                    filterValues: groupedFilters[el]
                };
            }),
            lastSelectedFilterGroupName: lastSelectedElementKey,
            isDeselected: isDeselected
        };

        return filterObject;
    }

    function addOrRemoveHiddenAttributeInCollection(facetList, ev, showLessText, showMoreText) {
        let isListHasHiddenAttributes = facetList.some(function (listElement) {
            return listElement.hasAttribute('hidden');
        });

        if (isListHasHiddenAttributes) {
            facetList.forEach(function (listElement) {
                listElement.removeAttribute('hidden');
            });

            ev.target.innerText = showLessText;
        } else {
            facetList.slice(defaultFacetsCollapseCount).forEach(function (listElement) {
                listElement.setAttribute('hidden', 'true');
            });

            ev.target.innerText = showMoreText;
        }
    }

    function showHideShowMoreLessButtons() {
            let groupedFilters = groupAllCheckedFacetInputs();
            let groupedCheckedFacetsJson = parseGroupedFiltersToJson(groupedFilters);

            // Check if we need to show the 'Show less' or 'Show more' button for particular facet group
            groupedCheckedFacetsJson.forEach(function (facet) {
                // let facetName = facet.fieldName;
                // let button = document.getElementById('show-more-less-' + facetName) as HTMLButtonElement;

                // if (button) {
                //     let buttonText = (button.attributes as any)['show-less'].value;
                //     let selectedFacetValues = facet.filterValues;
                //     let ulFacetListId = 'facets-group-list-' + facetName;
                //     let facetList = Array.from(document.querySelectorAll('#' + ulFacetListId + '>li'));

                //     // Set all facets values for particular group in array
                //     let allFacetValuesInGroup: string[] = [];
                //     facetList.forEach(function (listElement) {
                //         let inputEl = listElement.getElementsByTagName('input')[0];
                //         let facetValue = (inputEl.attributes as any)['data-facet-value'].value;
                //         let encodeFacetValue = encodeURIComponent(facetValue);

                //         allFacetValuesInGroup.push(encodeFacetValue);
                //     });

                //     // Remove the hidden attribute from the li elements when there is checked facet after the default hidden position. Which is 10.
                //     for (let selectedFacetIndex = 0; selectedFacetIndex < selectedFacetValues.length; selectedFacetIndex++) {
                //         /*jshint loopfunc: true */
                //         let index = allFacetValuesInGroup.indexOf(selectedFacetValues[selectedFacetIndex]);

                //         if (index > defaultFacetsCollapseCount - 1) {
                //             facetList.forEach(function (listElement) {
                //                 listElement.removeAttribute('hidden');
                //                 button.innerText = buttonText;
                //             });

                //             break;
                //         }
                //     }
                // }
            });
    }

    function groupAllCheckedFacetInputs(): GroupedCheckedFacets {
        let groupedFilters: GroupedCheckedFacets = {};

        const checkedFilters = Object.entries(inputRefs)
            .filter(([key, val])=>key.includes('facet-checkbox') && val && val.checked)
            .map(([_key, val]) => val);
        if (checkedFilters) {
            checkedFilters.forEach(function (checkedFilter) {
                let facetKey = (checkedFilter.attributes as any)['data-facet-key'].value;
                let facetValue = (checkedFilter.attributes as any)['data-facet-value'].value;

                let filterKey = encodeURIComponent(facetKey);
                let filterValue = encodeURIComponent(facetValue);

                let filterValueObj = {
                    filterValue: filterValue,
                    isCustom: false
                };

                if (groupedFilters.hasOwnProperty(filterKey)) {
                    groupedFilters[filterKey].push(filterValueObj);
                } else {
                    groupedFilters[filterKey] = [filterValueObj];
                }
            });
        }

        return groupedFilters;
    }

    function parseGroupedFiltersToJson(groupedFilters: any) {
        let jsonFilter = Object.keys(groupedFilters).map(function (el) {
            return {
                fieldName: el,
                filterValues: groupedFilters[el]
            };
        });

        return jsonFilter;
    }


    return (
      <>
        { viewModel.HasAnyFacetElements && <>
          <div className="d-flex align-items-center justify-content-between">
            <label className="form-label">{viewModel.AppliedFiltersLabel}</label>
            { showClearButton && <button onClick={clearButtonClick} id="sf-facet-clear-all-btn" className="btn btn-link px-0 py-0 mb-2 text-decoration-none">
                {viewModel.ClearAllLabel}
            </button>}
          </div>
          <ul ref={appliedFiltersRef} id="applied-filters" className="list-unstyled list-inline"
                // data-sf-applied-filter-html-tag="li"
                // data-sf-filter-label-css-className="list-inline-item bg-secondary bg-opacity-10 rounded-pill
                // ps-2 pe-4 pb-1 me-1 mb-1 mw-100 position-relative overflow-hidden text-truncate text-nowrap" data-sf-remove-filter-css-className="px-2 position-absolute end-0"
                />
        </>
        }
        { viewModel.SearchFacets && <div id="facetContent" className="mb-3">
            { viewModel.SearchFacets.map((facet: SearchFacetsClass, sfIdx: number) => {
            let value = 0;

            return (<React.Fragment key={sfIdx}>
              {(facet.FacetElements.length || facet.ShowNumberCustomRange || facet.ShowDateCustomRanges) && <>
                <h4 className="h6 fw-normal mt-3" >{facet.FacetTitle}</h4>

                <ul
                  ref={setUlsRef(`facets-group-list-${facet.FacetFieldName}`)}
                  className="list-unstyled mb-0" id={`facets-group-list-${facet.FacetFieldName}`}
                  data-facet-type={facet.FacetFieldType}>
                  {facet.FacetElements.map((facetElement: FacetElement, idx: number)=>{
                        value++;
                        const hideElement: boolean = (value > defaultFacetsCollapseCount) && viewModel.IsShowMoreLessButtonActive;

                        return (<li
                          key={idx}
                          hidden={hideElement}
                        >
                          <input type="checkbox"
                            onChange={handleCheckboxChange}
                            ref={setInputsRef(`facet-checkbox-${facet.FacetFieldName}-${facetElement.FacetValue}`)}
                            id={`facet-checkbox-${facet.FacetFieldName}-${facetElement.FacetValue}`}
                            data-facet-key={facet.FacetFieldName}
                            data-facet-value={facetElement.FacetValue} />
                          <label htmlFor={`facet-checkbox-${facet.FacetFieldName}-${facetElement.FacetValue}`}
                            id={`facet-${facet.FacetFieldName}-${facetElement.FacetValue}`}>
                            {facetElement.FacetLabel}
                          </label>
                          {
                            viewModel.DisplayItemCount && <span className="small text-muted">({facetElement.FacetCount})</span>
                          }
                        </li>);
                    })
                    }
                </ul>
              </>}
              {
                    (facet.FacetElements.length > defaultFacetsCollapseCount && viewModel.IsShowMoreLessButtonActive) &&
                    <button type="button" className="btn btn-link p-0 text-decoration-none"
                      show-more={viewModel.ShowMoreLabel} show-less={viewModel.ShowLessLabel}
                      data-facet-type={facet.FacetFieldName} id={`show-more-less-${facet.FacetFieldName}`}>{viewModel.ShowMoreLabel}</button>
                }
              { (facet.ShowNumberCustomRange) &&
                <div className="mt-2 d-flex flex-row align-items-center">
                  <div className="-sc-w-5rem">
                    { (facet.FacetFieldType === 'NumberWhole')
                            ? <input type="number"
                                ref={setInputsRef(`from-${facet.FacetFieldName}`)}
                                id={`from-${facet.FacetFieldName}`}
                                className="form-control"
                                data-custom-range="true"
                                placeholder="Min"
                                // onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                                        />
                            : <input type="number"
                                ref={setInputsRef(`from-${facet.FacetFieldName}`)}
                                id={`from-${facet.FacetFieldName}`}
                                className="form-control"
                                data-custom-range="true"
                                placeholder="Min" />
                        }
                  </div>
                  <span className="mx-2">&mdash;</span>

                  <div className="-sc-w-5rem">
                    { facet.FacetFieldType === 'NumberWhole'
                            ? <input type="number"
                                ref={setInputsRef(`to-${facet.FacetFieldName}`)}
                                id={`to-${facet.FacetFieldName}`}
                                className="form-control"
                                data-custom-range="true"
                                placeholder="Max"
                                // onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                                />
                            : <input type="number"
                                ref={setInputsRef(`to-${facet.FacetFieldName}`)}
                                id={`to-${facet.FacetFieldName}`}
                                className="form-control"
                                data-custom-range="true"
                                placeholder="Max" />
                        }
                  </div>
                  <button type="button"
                    id={`custom-range-btn-${facet.FacetFieldName}`}
                    className="btn btn-outline-secondary ms-2 d-flex align-items-center"
                    data-custom-range-name={facet.FacetFieldName}
                    data-custom-range-type={facet.FacetFieldType}
                    aria-label={`Custom range for ${facet.FacetFieldName}`}>
                    <svg xmlns="https://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="my-1" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
                    </svg>
                  </button>
                </div>
                }
              { facet.ShowDateCustomRanges &&
                <div className="mt-2 d-flex flex-row align-items-center">
                  <div className="-sc-w-10rem">
                    <input type="date"
                      ref={setInputsRef(`from-${facet.FacetFieldName}`)}
                      id={`from-${facet.FacetFieldName}`}
                      className="form-control"
                      data-custom-range="true"
                      aria-label={`From ${facet.FacetFieldName}`} />
                  </div>
                  <span className="mx-2">&mdash;</span>
                  <div className="-sc-w-10rem">
                    <input type="date"
                      ref={setInputsRef(`to-${facet.FacetFieldName}`)}
                      id={`to-${facet.FacetFieldName}`}
                      className="form-control"
                      data-custom-range="true"
                      aria-label={`To ${facet.FacetFieldName}`} />
                  </div>
                  <button type="button"
                    id={`custom-range-btn-${facet.FacetFieldName}`}
                    className="btn btn-outline-secondary ms-2 d-flex align-items-center"
                    data-custom-range-name={facet.FacetFieldName}
                    data-custom-range-type={facet.FacetFieldType}
                    aria-label={`Custom range for ${facet.FacetFieldName}`}>
                    <svg xmlns="https://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="my-1" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
                    </svg>
                  </button>
                </div>
                }
            </React.Fragment>);
            })
            }
          </div>
            }
      </>
    );
}
