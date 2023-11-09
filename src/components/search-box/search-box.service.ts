import { SdkItem } from 'sitefinity-react-framework/sdk/dto/sdk-item';
import { RestService, RestSdkTypes } from 'sitefinity-react-framework/sdk/rest-service';
import { SearchBoxEntity } from './search-box';

export class SearchBoxRestService {

    static async GetPageNodeUrl(context: any) {
       // to do

        if (context?.Content && ((context?.Content)[0] as any).Variations?.Length !== 0){
          //  const pageNodes = await RestService.getItems({ Fields: ['ViewUrl']});

            // const items = pageNodes.Items;

            // if (items.length === 1){
            //     return items[0].ViewUrl;
            // }
        }

        return 'https://localhost:5001/niki-test';
       // return '';
    }
}
