import { CollectionResponse, SdkItem } from '../../../rest-sdk';


export interface DocumentListModelMaster {
    OpenDetails: boolean;
    Items: CollectionResponse<SdkItem>;
}
