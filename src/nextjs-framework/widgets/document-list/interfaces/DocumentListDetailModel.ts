import { SdkItem } from '../../../rest-sdk';

export interface DocumentListModelDetail {
    ViewName: string;
    DetailItem: {
        Id: string;
        ProviderName: string;
        ItemType: string;
    };
    item: SdkItem
}
