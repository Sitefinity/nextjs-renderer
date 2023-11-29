'use client';

import React from 'react';
import { SearchFacets as SearchFacetsClass } from './search-facets-class';
import { FacetElement } from './interfaces/FacetElement';

const defaultFacetsCollapseCount = 10;

export async function SearchFacetsClient(props: any) {
    const { viewModel } = props;

    return (
      <>
        { viewModel.HasAnyFacetElements && <>
          <div className="d-flex align-items-center justify-content-between">
            <label className="form-label">{viewModel.AppliedFiltersLabel}</label>
            <button id="sf-facet-clear-all-btn" className="btn btn-link px-0 py-0 mb-2 text-decoration-none" hidden={true}>{viewModel.ClearAllLabel}</button>
          </div>
          <ul id="applied-filters" className="list-unstyled list-inline"
                // data-sf-applied-filter-html-tag="li"
                // data-sf-filter-label-css-className="list-inline-item bg-secondary bg-opacity-10 rounded-pill ps-2 pe-4 pb-1 me-1 mb-1 mw-100 position-relative overflow-hidden text-truncate text-nowrap" data-sf-remove-filter-css-className="px-2 position-absolute end-0"
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
                                id={`from-${facet.FacetFieldName}`}
                                className="form-control"
                                data-custom-range="true"
                                placeholder="Min"
                                // onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                                        />
                            : <input type="number"
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
                                id="to-@facet.FacetFieldName"
                                className="form-control"
                                data-custom-range="true"
                                placeholder="Max"
                                // onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                                />
                            : <input type="number"
                                id="to-@facet.FacetFieldName"
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
                    <svg xmlns="https://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="my-1" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" /> </svg>
                  </button>
                </div>
                }
              { facet.ShowDateCustomRanges &&
                <div className="mt-2 d-flex flex-row align-items-center">
                  <div className="-sc-w-10rem">
                    <input type="date"
                      id={`from-${facet.FacetFieldName}`}
                      className="form-control"
                      data-custom-range="true"
                      aria-label={`From ${facet.FacetFieldName}`} />
                  </div>
                  <span className="mx-2">&mdash;</span>
                  <div className="-sc-w-10rem">
                    <input type="date"
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
