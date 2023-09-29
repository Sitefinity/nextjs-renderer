import { CollectionResponse } from "@/framework/sdk/dto/collection-response";
import { SdkItem } from "@/framework/sdk/dto/sdk-item";

export interface ContentListModelMaster {
    OnDetailsOpen: (sdkItem: SdkItem) => void;
    OpenDetails: boolean;
    FieldCssClassMap: { [key: string]: string };
    FieldMap: { [key: string]: string };
    Items: Promise<CollectionResponse<SdkItem>>,
    ViewName: "CardsList" | "ListWithImage" | "ListWithSummary";
    Attributes: Array<{ Key: string, Value: string }>;
}
