
import { SdkItem } from '../../../../rest-sdk';
import { ContentListModelbase } from '../content-list-model-base';

export interface ListWithSummaryModel extends ContentListModelbase {
    Items: Array<ItemModel>
}

export interface ItemModel {
    PublicationDate: {
        Css: string;
        Value: string;
    },
    Title: {
        Value: string,
        Css: string,
        Link: string
    },
    Text: {
        Value: string,
        Css: string
    },

    Original: SdkItem
}
