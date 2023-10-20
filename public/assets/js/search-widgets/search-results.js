(function () {
    var SEARCH_RESULT_CONTAINER_ID = "sf-search-result-container";
    var SEARCH_RESULT_PAGER_ID = "sf-search-result-pager";
    var SEARCHRESULTS_LOADING_INDICATOR = "sf-search-results-loading-indicator";

    function init(parent) {

        parent.addEventListener('searchResultsLoaded', function (ev, o) {
            if (ev.detail && ev.detail.searchResultsPageDocument) {
                var searchResultsPageDocument = ev.detail.searchResultsPageDocument;
                var searchResultsContainer = parent.getElementById(SEARCH_RESULT_CONTAINER_ID);

                if (searchResultsContainer) {
                    var newSearchContent = searchResultsPageDocument.getElementById(SEARCH_RESULT_CONTAINER_ID);
                    if (newSearchContent) {
                        searchResultsContainer.innerHTML = newSearchContent.innerHTML;

                        var searchResultsPager = parent.getElementById(SEARCH_RESULT_PAGER_ID);
                        if (searchResultsPager) {
                            var newSearchPager = searchResultsPageDocument.getElementById(SEARCH_RESULT_PAGER_ID);
                            if (newSearchPager) {
                                searchResultsPager.innerHTML = newSearchPager.innerHTML;
                            }
                        }

                        updateFilterAttribute(searchResultsContainer);
                        bindSortDropDown();
                    }
                }
            }

            toggleLoadingVisiblity(false);
        });

        bindSortDropDown();
        bindLoadingIndicator();

        function handleSelectionChange(parentElement, orderValue, languageValue) {
            var query = parentElement.getAttribute("data-sf-search-query") || "";
            var index = parentElement.getAttribute("data-sf-search-catalogue") || "";
            var wordsMode = parentElement.getAttribute("data-sf-words-mode") || "";
            var language = languageValue || parentElement.getAttribute("data-sf-language") || "";
            var orderBy = orderValue || parentElement.getAttribute("data-sf-sorting") || "";
            var scroingInfo = parentElement.getAttribute("data-sf-scoring-info");
            var resultsForAllSites = parentElement.getAttribute("data-sf-results-all");
            var filter = parentElement.getAttribute("data-sf-filter");

            var query = "?searchQuery=" + query +
                "&indexCatalogue=" + index +
                "&wordsMode=" + wordsMode +
                "&sf_culture=" + language +
                "&orderBy=" + orderBy;

            if (scroingInfo) {
                query = query + "&scoringInfo=" + scroingInfo;
            }

            if (filter) {
                query = query + "&filter=" + filter;
            }

            if (resultsForAllSites == "True") {
                query += "&resultsForAllSites=True";
            }
            else if (resultsForAllSites == "False") {
                query += "&resultsForAllSites=False";
            }

            window.location.search = query;
        }

        function bindSortDropDown() {
            var searchResults = parent.querySelectorAll("[data-sf-role='search-results']");

            searchResults.forEach(function (sr) {
                var searchResultsSortingDropdown = sr.querySelector(".userSortDropdown");
                if (searchResultsSortingDropdown) {
                    searchResultsSortingDropdown.querySelectorAll("option").forEach(function (option) {
                        option.selected = option.value == sr.getAttribute("data-sf-sorting");
                    });

                    searchResultsSortingDropdown.addEventListener("change", function (e) {
                        var value = e.target.value;
                        handleSelectionChange(sr, value);
                    });
                }

                sr.addEventListener("click", function (e) {
                    if (e.target.getAttribute("data-sf-role") === "search-results-language") {
                        var language = e.target.getAttribute("data-sf-language");
                        if (language) {
                            handleSelectionChange(sr, undefined, language);
                        }
                    }
                });
            });
        }

        function updateFilterAttribute(container) {
            var query = window.location.search;
            var queryStringParser = new Querystring(query.substring(1, query.length));
            var filterQuery = queryStringParser.get("filter");
            filterQuery = filterQuery ? filterQuery : "";
            container.setAttribute("data-sf-filter", filterQuery);
        }

        function bindLoadingIndicator() {
            parent.addEventListener('beginLoadingSearchResults', function (ev, o) {
                toggleLoadingVisiblity(true);
            });
        }

        function toggleLoadingVisiblity(showLoading) {
            var searchResultsElements = parent.getElementById(SEARCH_RESULT_CONTAINER_ID);
            var elementsToHideWhileLoading = searchResultsElements.querySelectorAll("[data-sf-hide-while-loading='true']");
            if (elementsToHideWhileLoading.length > 0) {
                elementsToHideWhileLoading.forEach(function (element) {
                    element.style.display = showLoading ? "none" : "block";
                });
            } else {
                searchResultsElements.style.display = showLoading ? "none" : "block";
            }

            var loadingElement = parent.getElementById(SEARCHRESULTS_LOADING_INDICATOR);
            loadingElement.style.display = showLoading ? "block" : "none";
        }
    }

    document.addEventListener('widgetLoaded', function (args) {
        if (args.detail.model.Name === "SitefinitySearchResults") {
            init(args.detail.element);
        }
    });

    document.addEventListener("DOMContentLoaded", function () { init(document); });
})();
