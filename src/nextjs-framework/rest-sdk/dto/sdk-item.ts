import { DefaultValue, Model } from '@progress/sitefinity-widget-designers';

export interface SdkItem {
    Provider: string;
    Id: string;
    [key: string]: any;
}

@Model()
export class SdkItemModel {
    @DefaultValue(null)
    Id?: string;

    @DefaultValue(null)
    Provider?: string;
}
