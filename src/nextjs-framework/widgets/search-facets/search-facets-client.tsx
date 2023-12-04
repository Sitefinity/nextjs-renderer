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
        filterValues: { filterValue: string; isCustom: boolean; }[]
    } [];
    lastSelectedFilterGroupName: string;
    isDeselected: boolean;
}

export function SearchFacetsClient(props: any) {
    const { viewModel, searchParams } = props;
    const filterQuery = searchParams[FILTER_QUERY_PARAM];
    const inputRefs = React.useMemo((): {[key: string]: HTMLInputElement} =>{
        return {};
    },[]);
    const [checkedInputs, setCheckedInputs] =  React.useState< {[key: string]:  string} >({});
    const groupUlRefs: {[key: string]: HTMLUListElement} = {};
    const appliedFiltersRef = React.useRef<HTMLUListElement>(null);
    const [showClearButton, setShowClearButton] = React.useState(!!filterQuery);
    const [moreLessLabel, setMoreLessLabel] = React.useState(viewModel.ShowMoreLabel);
    const [lastUpdatedKey, setLastUpdatedKey] = React.useState<string | null>(null);

    const setInputsRef = (id: string) => (ref: HTMLInputElement) => {
        inputRefs[id] = ref;
    };

    const setUlsRef = (id: string) => (ref: HTMLUListElement) => {
        groupUlRefs[id] = ref;
      };

    const clearButtonClick = () => {
        setCheckedInputs({});

        const customRangeConainterToBeCleared = Object.entries(inputRefs)
            .filter(([key, _val])=>!key.includes('facet-checkbox'))
            .map(([_key, val]) => val);
        if (customRangeConainterToBeCleared) {
            customRangeConainterToBeCleared.forEach(function (el) {
                el.value = '';
            });
        }

        setLastUpdatedKey(null);

    };

    const handleCheckboxChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const newCheckedInputs = {...checkedInputs};
        const newLabel =  ev.target.getAttribute('data-facet-label') || '';

        if (ev.target.checked){
            newCheckedInputs[ev.target.id] = newLabel;
        } else {
            delete newCheckedInputs[ev.target.id];
        }

        setCheckedInputs(newCheckedInputs);

        setLastUpdatedKey(ev.target.id);
    };

    const showMoreLessClick = (ev: React.MouseEvent<HTMLButtonElement>) => {
        const newMoreLessLabel = moreLessLabel === viewModel.ShowMoreLabel
            ? viewModel.ShowLessLabel
            : viewModel.ShowMoreLabel;
        setMoreLessLabel(newMoreLessLabel);
    };

    const searchWithFilter = React.useCallback((currentFilterObject: AppliedFilterObject) => {
        let filterString = JSON.stringify(currentFilterObject);
        const newSearchParam = {...searchParams};
        delete newSearchParam['slug'];
        if (currentFilterObject && currentFilterObject.appliedFilters && currentFilterObject.appliedFilters.length > 0) {
            let encodedFilterString = btoa(filterString);
            newSearchParam[FILTER_QUERY_PARAM] = encodedFilterString;
            setShowClearButton(true);

        } else {
            delete newSearchParam[FILTER_QUERY_PARAM];
            setShowClearButton(false);
        }

        let url = buildUrl(newSearchParam);

        window.history.pushState({ path: url }, '', url);
    },[searchParams]);

    const groupAllCheckedFacetInputs = React.useCallback((): GroupedCheckedFacets => {
        let groupedFilters: GroupedCheckedFacets = {};

        const checkedFilters = Object.entries(inputRefs)
            .filter(([key, val])=>key.includes('facet-checkbox') && val && val.checked)
            .map(([_key, val]) => val);
        if (checkedFilters) {
            checkedFilters.forEach(function (checkedFilter) {
                let filterKey = (checkedFilter.attributes as any)['data-facet-key'].value;
                let filterValue = (checkedFilter.attributes as any)['data-facet-value'].value;

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
    },[inputRefs]);

    const buildFilterObjectBasedOnPopulatedInputs = React.useCallback((id: string | null) => {
        let groupedFilters = groupAllCheckedFacetInputs();

        let lastSelectedElementKey;

        let isDeselected = false;
        if (id) {
            const eventTargetElement = document.getElementById(id) as HTMLInputElement;
            lastSelectedElementKey = (eventTargetElement.attributes as any)['data-facet-key'].value;
            isDeselected = !eventTargetElement.checked;
        }

        let filterObject = constructFilterObject(groupedFilters, lastSelectedElementKey, isDeselected);

        return filterObject;
    }, [groupAllCheckedFacetInputs]);

    const markSelectedInputs = React.useCallback(() => {
        if (filterQuery) {
            let decodedFilterParam = atob(filterQuery);
            let jsonFilters: AppliedFilterObject = JSON.parse(decodedFilterParam);
            const newCheckedInputs: {[key:string]: string} = {};
            jsonFilters.appliedFilters.forEach(function (filter: { filterValues: any[], fieldName: string}) {
                filter.filterValues.forEach(function (fvObj) {
                    let fieldName = decodeURIComponent(filter.fieldName);
                    let filterValue = fvObj.filterValue;

                    let inputId = 'facet-checkbox-' + fieldName + '-' + filterValue;
                    let currentInputElement = inputRefs[inputId];

                    if (!currentInputElement) {
                        // try to find with different decimal point separator
                        inputId = inputId.replace(/\./g, ',');
                        currentInputElement = inputRefs[inputId];
                    }

                    if (currentInputElement) {
                        newCheckedInputs[inputId] = currentInputElement.getAttribute('data-facet-label') || '';
                    }
                });
            });
            setCheckedInputs(newCheckedInputs);
        }
    },[filterQuery, inputRefs]);

    React.useEffect(()=>{
        markSelectedInputs();
    },[markSelectedInputs]);

    React.useEffect(()=>{
        const filterObject = buildFilterObjectBasedOnPopulatedInputs(lastUpdatedKey);

        searchWithFilter(filterObject);

    },[lastUpdatedKey, buildFilterObjectBasedOnPopulatedInputs, searchWithFilter]);
    console.log('lastUpdatedKey', lastUpdatedKey);

    function handleChipDeleteClick(ev: React.MouseEvent<HTMLSpanElement>) {
        const facetKey = (ev.target as HTMLSpanElement).getAttribute('data-facet-key');
        const facetValue = (ev.target as HTMLSpanElement).getAttribute('data-facet-value');
        const newCheckedInputs = {...checkedInputs};
        delete newCheckedInputs[`facet-checkbox-${facetKey}-${facetValue}`];

        setCheckedInputs(newCheckedInputs);

        setLastUpdatedKey(`facet-checkbox-${facetKey}-${facetValue}`);

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

    function constructFilterObject(
        groupedFilters: GroupedCheckedFacets,
        lastSelectedElementKey: string,
        isDeselected: boolean
    ): AppliedFilterObject {
        const currentFilterObject: AppliedFilterObject = {
            appliedFilters: Object.keys(groupedFilters).map(function (el) {
                return {
                    fieldName: el,
                    filterValues: groupedFilters[el]
                } as { fieldName: string; filterValues: { filterValue: string; isCustom: boolean; }[]; };
            }),
            lastSelectedFilterGroupName: lastSelectedElementKey,
            isDeselected: isDeselected
        };

        return currentFilterObject;
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
                >
            {  Object.entries(checkedInputs).map(([key, value], idx: number)=>{
                        const [_f,_s, third, ...last]  = key.split('-');
                        const facetKey = third;
                        const facetValue = last.join('-');

                        return  value && <li
                          key={idx}
                          className={'list-inline-item bg-secondary bg-opacity-10 rounded-pill ps-2 pe-4 pb-1 me-1 mb-1 mw-100 position-relative overflow-hidden text-truncate text-nowrap'}
                            >{value}
                          <span onClick={handleChipDeleteClick} id={`remove-facet-filter-${facetKey}-${facetValue}`} role="button"
                            tabIndex={0} title="Remove" className="px-2 position-absolute end-0"
                            data-facet-key={facetKey} data-facet-value={`${facetValue}`}>✕</span>
                        </li>;
                        })
                }
          </ul>
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
                        const hideElement: boolean = (value > defaultFacetsCollapseCount)
                            && viewModel.IsShowMoreLessButtonActive
                            && moreLessLabel === viewModel.ShowMoreLabel;
                        const encodedName = encodeURIComponent(facet.FacetFieldName || '');
                        const encodedValue = encodeURIComponent(facetElement.FacetValue || '');

                        return (<li
                          key={idx}
                          hidden={hideElement}
                        >
                          <input type="checkbox"
                            onChange={handleCheckboxChange}
                            ref={setInputsRef(`facet-checkbox-${encodedName}-${encodedValue}`)}
                            id={`facet-checkbox-${encodedName}-${encodedValue}`}
                            data-facet-key={encodedName}
                            data-facet-value={encodedValue}
                            data-facet-label={facetElement.FacetLabel}
                            checked={!!checkedInputs[`facet-checkbox-${encodedName}-${encodedValue}`]} />
                          <label htmlFor={`facet-checkbox-${encodedName}-${encodedValue}`}
                            id={`facet-${encodedName}-${encodedValue}`}>
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
                    <button onClick={showMoreLessClick} type="button" className="btn btn-link p-0 text-decoration-none"
                      data-facet-type={facet.FacetFieldName} id={`show-more-less-${facet.FacetFieldName}`}>
                        {moreLessLabel}
                    </button>
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
                                onKeyDown={(event)=> {
                                    return event.charCode >= 48 && event.charCode <= 57;
                                }}
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
                                onKeyDown={(event)=> {
                                    return event.charCode >= 48 && event.charCode <= 57;
                                }}
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
