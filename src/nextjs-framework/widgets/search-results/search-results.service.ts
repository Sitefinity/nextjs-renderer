import { SearchResultsEntity } from './search-results';
import { SearchResultsSorting } from './interfaces/SearchResultsSorting';
import { ListDisplayMode } from '../../editor/widget-framework/list-display-mode';
import { RestService } from '../../rest-sdk';

export class SearchResultsService {

    static async performSearch(entity: SearchResultsEntity, searchParamsModel: any): Promise<{TotalCount:number, SearchResults: any[]}> {
            let orderByClause: string = searchParamsModel.orderBy ? searchParamsModel.orderBy : entity.Sorting;

            if (orderByClause === SearchResultsSorting.NewestFirst) {
                orderByClause = 'PublicationDate desc';
            } else if (orderByClause === SearchResultsSorting.OldestFirst) {
                orderByClause = 'PublicationDate';
            } else {
                orderByClause = '';
            }

            let skip = 0;
            let take = 20;
            if (entity.ListSettings!.DisplayMode === ListDisplayMode.Paging) {
                take = entity.ListSettings!.ItemsPerPage;
                if (searchParamsModel.page) {
                    skip = (parseInt(searchParamsModel.page, 10) - 1) * take;
                }

            } else if (entity.ListSettings!.DisplayMode === ListDisplayMode.Limit) {
                take = entity.ListSettings!.LimitItemsCount;
            } else if (entity.ListSettings!.DisplayMode === ListDisplayMode.All) {
                take = Number.MAX_SAFE_INTEGER;
            }

            const argsLocal = {
                Name: 'Default.PerformSearch',
                AdditionalQueryParams:
                 {
                     ['indexCatalogue']: searchParamsModel.indexCatalogue,
                     ['searchQuery']: encodeURIComponent(searchParamsModel.searchQuery).toLowerCase(),
                     ['wordsMode']: searchParamsModel.wordsMode,
                     ['$orderBy']: orderByClause,
                     ['sf_culture']: searchParamsModel['sf_culture'],
                     ['$skip']: skip.toString(),
                     ['$top']: take.toString(),
                     ['searchFields']: entity.SearchFields,
                     ['highlightedFields']: entity.HighlightedFields,
                     ['scoringInfo']: searchParamsModel.ScoringInfo,
                     ['resultsForAllSites']: searchParamsModel.ShowResultsForAllIndexedSites,
                     ['filter']: searchParamsModel.filter
                }
            };

            return await RestService.getUnboundType(argsLocal);
        }
}
