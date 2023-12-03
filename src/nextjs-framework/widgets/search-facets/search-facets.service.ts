import { FacetsViewModelDto } from './interfaces/FacetsViewModelDto';
import { FacetFlatResponseDto } from './interfaces/FacetFlatResponseDto';
import { RestService } from '../../rest-sdk';

export class SearchFacetsService {

    static async getFacetableFieldsFromIndex(indexCatalogue: string): Promise<FacetsViewModelDto[]> {
        const argsLocal = {
            Name: `Default.GetFacetableFields(indexCatalogName='${indexCatalogue}')`
        };

        const response: {value: any} = await RestService.getUnboundType(argsLocal);
        return response.value;
    }

    static async getFacets(
        searchQuery: string,
        culture: string,
        indexCatalogue: string,
        filter: string,
        resultsForAllSites: string,
        searchFields: string,
        facets: any): Promise<FacetFlatResponseDto> {

        const facetsStr = JSON.stringify(facets);
        const argsLocal = {
            Name: 'Default.GetFacets',
            AdditionalQueryParams: {
                ['searchQuery']: searchQuery,
                ['sf_culture']: culture,
                ['indexCatalogName']: indexCatalogue,
                ['filter']: filter,
                ['resultsForAllSites']: resultsForAllSites,
                ['searchFields']: searchFields,
                ['facetFields']: facetsStr
            }
        };

        const response: {value: any} = await RestService.getUnboundType(argsLocal);

        return response.value;
    }
}
