import { SdkItem } from '@progress/sitefinity-react-framework';
import { ContentListModelbase } from '../content-list-model-base';

export interface ListWithImageModel extends ContentListModelbase {
    Items: Array<ItemModel>
}

export interface ItemModel {
    Image: {
        Css: string;
        Title: string;
        AlternativeText: string;
        Url: string
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
