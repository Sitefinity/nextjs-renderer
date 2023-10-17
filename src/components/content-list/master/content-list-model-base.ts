import { SdkItem } from "sitefinity-react-framework/sdk/dto/sdk-item"

export interface ContentListModelbase {
    Attributes: {[key: string]: string}
    OpenDetails: boolean
    Pager?: {}
}
