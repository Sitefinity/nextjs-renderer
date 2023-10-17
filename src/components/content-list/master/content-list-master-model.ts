import { CollectionResponse } from "sitefinity-react-framework/sdk/dto/collection-response";
import { SdkItem } from "sitefinity-react-framework/sdk/dto/sdk-item";

export interface ContentListModelMaster {
    OpenDetails: boolean;
    FieldCssClassMap: { [key: string]: string };
    FieldMap: { [key: string]: string };
    Items: Promise<CollectionResponse<SdkItem>>,
    ViewName: "CardsList" | "ListWithImage" | "ListWithSummary";
    Attributes: Array<{ Key: string, Value: string }>;
}
