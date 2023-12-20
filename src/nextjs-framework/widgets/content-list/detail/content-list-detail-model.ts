import { SdkItem } from '../../../rest-sdk';

export interface ContentListModelDetail {
    ViewName: string;
    DetailItem: {
        Id: string;
        ProviderName: string;
        ItemType: string;
    },
    Attributes: Array<{ Key: string, Value: string}>;
}

export interface DetailViewModel {
    ViewName: string;
    DetailItem: SdkItem,
    Attributes: { [key: string]: string };
}
