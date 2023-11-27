import { RestService } from 'sitefinity-react-framework/sdk/rest-service';
import { SearchFacetsEntity } from './search-facets';

export class SearchFacetsService {

    static async performSearch(entity: SearchFacetsEntity, searchParamsModel: any): Promise<{TotalCount:number, SearchResults: any[]}> {


            return await RestService.getUnboundType({} as any);
        }
}
