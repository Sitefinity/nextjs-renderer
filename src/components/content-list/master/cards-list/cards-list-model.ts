import { SdkItem } from "sitefinity-react-framework/sdk/dto/sdk-item";
import { ContentListModelbase } from "../content-list-model-base";

export interface CardsListModel extends ContentListModelbase {
    Items: Array<CardItemModel>
}

export interface CardItemModel {
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
