import { CollectionResponse } from 'sitefinity-react-framework/sdk/dto/collection-response';
import { SdkItem } from 'sitefinity-react-framework/sdk/dto/sdk-item';

export interface DocumentListModelMaster {
    OpenDetails: boolean;
    Items: CollectionResponse<SdkItem>;
}
