import { CollectionResponse } from './dto/collection-response';
import { SdkItem } from './dto/sdk-item';
import { ContentVariation, MixedContentContext } from '../widgets/entities/mixed-content-context';
import { GetAllArgs } from './services/get-all-args';
export declare class RestExtensionsService {
    static getContextItems(contentContext: MixedContentContext, getAllArgsSingle: GetAllArgs): Promise<CollectionResponse<SdkItem>>;
    static getItemsFromContext(contentContext: MixedContentContext, getAllArgsPerType: {
        [key: string]: GetAllArgs;
    }): Promise<CollectionResponse<SdkItem>>;
    static mergeVariations: (contentVariations: ContentVariation[]) => ContentVariation[];
}
