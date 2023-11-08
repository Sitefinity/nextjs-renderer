import { CollectionResponse } from './dto/collection-response';
import { ExternalProvider } from './dto/external-provider';
import { GenericContentItem } from './dto/generic-content-item';
import { SdkItem } from './dto/sdk-item';
import { GetAllArgs } from './services/get-all-args';
export declare class RestService {
    static getUnboundType<T extends ExternalProvider>(args: {
        Name: string;
    }): Promise<CollectionResponse<T>>;
    static getItemWithFallback<T extends SdkItem>(itemType: string, id: string, provider: string): Promise<T>;
    static getCustomItems<T extends SdkItem>(baseURL: string, action: string, queryParamsForMethod: any, contentText?: string): any;
    static getItemWithStatus<T extends SdkItem>(itemType: string, id: string, provider: string, queryParams: {
        [key: string]: string;
    }): Promise<T>;
    static getItem<T extends SdkItem>(itemType: string, id: string, provider: string): Promise<T>;
    static getSharedContent(id: string, cultureName: string): Promise<GenericContentItem>;
    static getItems<T extends SdkItem>(args: GetAllArgs): Promise<CollectionResponse<T>>;
    private static getSimpleFields;
    private static getRelatedFields;
    private static parseInnerFields;
    private static buildQueryParams;
    static buildItemBaseUrl(itemType: string): string;
}
export declare class RestSdkTypes {
    static readonly Video: string;
    static readonly Image: string;
    static readonly News: string;
    static readonly GenericContent: string;
    static readonly Pages: string;
}
