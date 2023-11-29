import { CollectionResponse, SdkItem } from '../../../rest-sdk';

export interface ContentListModelMaster {
    OpenDetails: boolean;
    FieldCssClassMap: { [key: string]: string };
    FieldMap: { [key: string]: string };
    Items: Promise<CollectionResponse<SdkItem>>,
    ViewName: 'CardsList' | 'ListWithImage' | 'ListWithSummary';
    Attributes: Array<{ Key: string, Value: string }>;
}
