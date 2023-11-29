import { MixedContentContext } from '../../editor';
import { FilterConverterService, RestSdkTypes } from '../../rest-sdk';
import { RestExtensionsService } from '../rest-extensions';


export class SearchBoxRestService {

    static async GetPageNodeUrl(context: MixedContentContext) {
        const content = context.Content;
        if (!content || !content.length) {
            return '';
        }

        const variations = content[0].Variations;
        if (variations && variations.length !== 0){
            const mainFilter = FilterConverterService.getMainFilter(variations[0]);
            const pageNodes = await RestExtensionsService.getContextItems(context, {
                Type: RestSdkTypes.Pages,
                Fields: ['ViewUrl'],
                Filter: mainFilter
            });
            const items = pageNodes.Items;

            if (items.length === 1){
                return items[0].ViewUrl;
            }
        }

        return '';
    }
}
