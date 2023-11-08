import { OrderBy } from '../filters/orderby';
export interface GetAllArgs extends GetCommonArgs {
    Count?: boolean;
    OrderBy?: OrderBy[];
    Skip?: number;
    Take?: number;
    Filter?: any;
}
export interface GetCommonArgs extends CommonArgs {
    Fields?: string[];
}
export interface CommonArgs extends RequestArgs {
    Type: string;
    Provider?: string;
    Culture?: string;
}
export interface RequestArgs {
    AdditionalHeaders?: {
        [key: string]: string;
    };
    AdditionalQueryParams?: {
        [key: string]: string;
    };
}
