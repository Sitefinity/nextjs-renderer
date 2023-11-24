import { CollectionResponse } from '@/framework/rest-sdk/dto/collection-response';
import { SdkItem } from '@/framework/rest-sdk/dto/sdk-item';

export interface ContentListModelMaster {
    OpenDetails: boolean;
    FieldCssClassMap: { [key: string]: string };
    FieldMap: { [key: string]: string };
    Items: Promise<CollectionResponse<SdkItem>>,
    ViewName: 'CardsList' | 'ListWithImage' | 'ListWithSummary';
    Attributes: Array<{ Key: string, Value: string }>;
}
