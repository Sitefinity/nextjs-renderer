import { CollectionResponse } from './dto/collection-response';
import { GenericContentItem } from './dto/generic-content-item';
import { SdkItem } from './dto/sdk-item';
import { Widget } from './dto/widget';
import { RootUrlService } from './root-url.service';
import { ServiceMetadata } from './service-metadata';
import { CreateArgs } from './services/args/create-args';
import { CreateWidgetArgs } from './services/args/create-widget-args';
import { DeleteArgs } from './services/args/delete-args';
import { GetAllArgs } from './services/args/get-all-args';
import { GetLayoutArgs } from './services/args/get-layout-args';
import { LockArgs } from './services/args/lock-page-args';
import { PublishArgs } from './services/args/publish-args';
import { UploadMediaArgs } from './services/args/upload-args';
import { PageLayoutServiceResponse } from './services/layout-service.response';
import { ODataFilterSerializer } from './services/odata-filter-serializer';

export class RestService {
    public static getUnboundType<T>(args: {
        Name: string,
        BaseURL?: string,
        Data?: object,
        AdditionalQueryParams?: {
            [key: string]: string | undefined;
        },
        AdditionalHeaders?: {
            [key: string]: string;
        }
    }): Promise<T> {
        const headers = args.AdditionalHeaders || {};
        const queryParams = args.AdditionalQueryParams || {};
        const baseURL = args.BaseURL || RestService.buildItemBaseUrl(args.Name);
        const wholeUrl = `${baseURL}${RestService.buildQueryParams(queryParams)}`;

        return this.sendRequest({ url: wholeUrl, headers });
    }

    public static getBoundType<T>(args: {
        Name: string,
        Type: string,
        BaseURL?: string,
        Id?: string,
        Data?: object,
        AdditionalQueryParams?: {
            [key: string]: string | undefined;
        },
        AdditionalHeaders?: {
            [key: string]: string;
        }
    }): Promise<T> {
        const headers = args.AdditionalHeaders || {};
        const queryParams = args.AdditionalQueryParams || {};
        let path = `${args.Type}/${args.Name}`;

        if (args.Id) {
            path = `${args.Type}(${args.Id})/${args.Name}`;
        }
        const baseURL = args.BaseURL || RestService.buildItemBaseUrl(path);
        const wholeUrl = `${baseURL}${RestService.buildQueryParams(queryParams)}`;

        return this.sendRequest({ url: wholeUrl, headers });
    }

    public static getItemWithFallback<T extends SdkItem>(itemType: string, id: string, provider: string): Promise<T> {
        const wholeUrl = `${RestService.buildItemBaseUrl(itemType)}(${id})/Default.GetItemWithFallback()${RestService.buildQueryParams({
            sf_provider: provider,
            sf_fallback_prop_names: '*',
            $select: '*'
        })}`;

        return this.sendRequest<T>({ url: wholeUrl });
    }

    public static getCustomItems<T extends SdkItem>(baseURL: string, action: string, queryParamsForMethod: any, contentText: string = ''): any{
        const actionName = `${action}(${contentText})`;
        const wholeUrl = `${RestService.buildItemBaseUrl(baseURL)}/${actionName}${RestService.buildQueryParams(queryParamsForMethod)}`;

        return this.sendRequest<T>({ url: wholeUrl });
    }

    public static getItemWithStatus<T extends SdkItem>(itemType: string, id: string, provider: string, queryParams: {[key: string]: string}): Promise<T> {
        let queryParamsForMethod = {
            sf_provider: provider,
            $select: '*'
        };

        queryParamsForMethod = Object.assign(queryParamsForMethod, queryParams);
        const wholeUrl = `${RestService.buildItemBaseUrl(itemType)}(${id})/Default.GetItemWithStatus()${RestService.buildQueryParams(queryParamsForMethod)}`;

        return this.sendRequest<T>({ url: wholeUrl });
    }

    public static getItem<T extends SdkItem>(itemType: string, id: string, provider: string, culture?: string): Promise<T> {
        let queryParamsForMethod: {[key: string]: string; } = {
            sf_provider: provider,
            $select: '*'
        };

        if (culture) {
            queryParamsForMethod['sf_culture'] = culture;
        }

        const wholeUrl = `${this.buildItemBaseUrl(itemType)}(${id})${this.buildQueryParams(queryParamsForMethod)}`;

        return this.sendRequest<T>({ url: wholeUrl });
    }

    public static getSharedContent(id: string, cultureName: string): Promise<GenericContentItem> {
        let queryParamsForMethod = {
            sf_culture: cultureName,
            sf_fallback_prop_names: 'Content'
        };

        const wholeUrl = `${RestService.buildItemBaseUrl(RestSdkTypes.GenericContent)}/Default.GetItemById(itemId=${id})${RestService.buildQueryParams(queryParamsForMethod)}`;
        return this.sendRequest<GenericContentItem>({ url: wholeUrl });
    }

    public static getItems<T extends SdkItem>(args: GetAllArgs): Promise<CollectionResponse<T>> {

        const filteredSimpleFields = this.getSimpleFields(args.Type, args.Fields || []);
        const filteredRelatedFields = this.getRelatedFields(args.Type, args.Fields || []);

        let queryParamsForMethod: { [key: string]: any } = {
            '$count': args.Count,
            '$orderby': args.OrderBy ? args.OrderBy.map(x => `${x.Name} ${x.Type}`) : null,
            'sf_provider': args.Provider,
            'sf_culture': args.Culture,
            '$select': filteredSimpleFields.join(','),
            '$expand': filteredRelatedFields.join(','),
            '$skip': args.Skip,
            '$top': args.Take,
            '$filter': args.Filter ? new ODataFilterSerializer().serialize({ Type: args.Type, Filter: args.Filter }) : null
        };

        queryParamsForMethod = Object.assign(queryParamsForMethod, args.AdditionalQueryParams);

        const wholeUrl = `${this.buildItemBaseUrl(args.Type)}${this.buildQueryParams(queryParamsForMethod)}`;
        return this.sendRequest<{ value: T[], '@odata.count'?: number }>({ url: wholeUrl }).then((x) => {
            return <CollectionResponse<T>>{ Items: x.value, TotalCount: x['@odata.count'] };
        });
    }

    public static createItem<T extends SdkItem>(args: CreateArgs): Promise<T> {
        const wholeUrl = `${RestService.buildItemBaseUrl(args.Type)}${RestService.buildQueryParams(args.AdditionalQueryParams)}`;

        return RestService.sendRequest({
            url: wholeUrl,
            data: args.Data,
            method: 'POST',
            headers: args.AdditionalHeaders
        }).then((x) => {
            return x as T;
        });
    }

    public static deleteItem<T extends SdkItem>(args: DeleteArgs): Promise<T> {
        const wholeUrl = `${RestService.buildItemBaseUrl(args.Type)}(${args.Id})${RestService.buildQueryParams(args.AdditionalQueryParams)}`;

        return RestService.sendRequest({
            url: wholeUrl,
            method: 'DELETE',
            headers: args.AdditionalHeaders
        }).then((x) => {
            return x as T;
        });
    }

    public static publishItem(args: PublishArgs): Promise<void> {
        const wholeUrl = `${RestService.buildItemBaseUrl(args.Type)}(${args.Id})/Default.Operation()${RestService.buildQueryParams(args.AdditionalQueryParams)}`;
        return RestService.sendRequest({
            url: wholeUrl,
            data: {
                action: 'Publish',
                actionParameters: {}
            },
            method: 'POST',
            headers: args.AdditionalHeaders
        });
    }

    public static lockPage(args: LockArgs): Promise<void> {
        const wholeUrl = `${RestService.buildItemBaseUrl(args.Type)}(${args.Id})/Default.Lock()${RestService.buildQueryParams(args.AdditionalQueryParams)}`;
        return RestService.sendRequest({
            url: wholeUrl,
            data: {
                state: {
                    Version: args.Version
                }
            },
            method: 'POST',
            headers: args.AdditionalHeaders
        });
    }

    public static createWidget(args: CreateWidgetArgs): Promise<Widget> {
        const wholeUrl = `${RestService.buildItemBaseUrl(args.Type)}(${args.Id})/Default.AddWidget()${RestService.buildQueryParams(args.AdditionalQueryParams)}`;

        const properties: Array<{ Name: string, Value: string }> = [];

        if (args.Properties) {
            Object.keys(args.Properties).forEach((x) => {
                properties.push({
                    Name: x,
                    Value: (args.Properties as any)[x]
                });
            });
        }

        const dto = {
            widget: {
                Id: null,
                Name: args.Name,
                SiblingKey: args.SiblingKey,
                ParentPlaceholderKey: args.ParentPlaceholderKey,
                PlaceholderName: args.PlaceholderName,
                Properties: properties
            }
        };

        return RestService.sendRequest({
            url: wholeUrl,
            data: dto,
            method: 'POST',
            headers: args.AdditionalHeaders
        });
    }

    public static async getLayout(args: GetLayoutArgs): Promise<PageLayoutServiceResponse> {
        const pagePath = args.pagePath;
        const queryParams = args.queryParams || {};
        let url = null;

        const whiteListedParams = ['sfaction', 'sf_version', 'segment', 'isBackend', 'sf_site', 'sf_site_temp', 'sf-auth', 'abTestVariationKey', 'sf-content-action', 'sf-lc-status'];
        let whitelistedParamDic: { [key:string]: string | undefined } = {};
        whiteListedParams.forEach(x => {
            whitelistedParamDic[x] = queryParams[x];
        });

        let indexOfSitefinityForms = pagePath.indexOf('Sitefinity/Forms/');
        if (indexOfSitefinityForms !== -1) {
            let name = null;
            let indexOfFormName = indexOfSitefinityForms + 'Sitefinity/Forms/'.length;
            let nextIndexOfSlash = pagePath.indexOf('/', indexOfFormName);
            if (nextIndexOfSlash === -1) {
                name = pagePath.substring(indexOfFormName);
            } else {
                name = pagePath.substring(indexOfFormName, nextIndexOfSlash);
            }

            const formResponse = await RestService.sendRequest<{ value: SdkItem[] }>({
                url: RootUrlService.rootUrl + `/sf/system/forms?$filter=Name eq \'${name}\'`
            });

            url = `/api/default/forms(${formResponse.value[0].Id})/Default.Model()`;
        } else {
            let indexOfSitefinityTemplate = pagePath.indexOf('Sitefinity/Template/');
            if (indexOfSitefinityTemplate > -1) {
                let id = null;
                let indexOfGuid = indexOfSitefinityTemplate + 'Sitefinity/Template/'.length;
                let nextIndexOfSlash = pagePath.indexOf('/', indexOfGuid);
                if (nextIndexOfSlash === -1) {
                    id = pagePath.substring(indexOfGuid);
                } else {
                    id = pagePath.substring(indexOfGuid, nextIndexOfSlash);
                }

                url = `/api/default/templates/${id}/Default.Model()`;
            } else {
                url = '/api/default/pages/Default.Model(url=@param)';

                let pageParamsDic: { [key:string]: string | undefined } = {};
                Object.keys(queryParams).filter(x => !whiteListedParams.some(y => y === x)).forEach(x => {
                    pageParamsDic[x] = queryParams[x];
                });

                let pagePramsQueryString = RestService.buildQueryParams(pageParamsDic);

                whitelistedParamDic['@param'] = `'${encodeURIComponent(pagePath + pagePramsQueryString)}'`;
            }
        }

        let sysParamsQueryString = RestService.buildQueryParams(whitelistedParamDic);
        url += `${sysParamsQueryString}`;

        return RestService.sendRequest({ url: RootUrlService.rootUrl + url });
    }

    public static uploadItem(args: UploadMediaArgs): Promise<SdkItem> {
        const wholeUrl = `${RestService.buildItemBaseUrl(args.Type)}${RestService.buildQueryParams(args.AdditionalQueryParams)}`;
        const headers = args.AdditionalHeaders || {};
        const data = Object.assign({}, args.Fields, { Title: args.Title, ParentId: args.ParentId });

        headers['X-Sf-Properties'] = JSON.stringify(data);
        headers['X-File-Name'] = args.FileName;
        headers['Content-Type'] = args.ContentType;
        headers['Content-Length'] = args.BinaryData.length.toString();
        headers['Content-Encoding'] = 'base64';
        headers['DirectUpload'] = true.toString();

        return RestService.sendRequest({
            url: wholeUrl,
            data: args.BinaryData,
            method: 'POST',
            headers
        }).then((x) => {
            return x as SdkItem;
        });;
    }

    private static getSimpleFields(type: string, fields: string[]): string[] {
        let star = '*';
        if (fields != null && fields.length === 1 && fields[0] === star) {
            return [star];
        }

        let simpleFields = ServiceMetadata.getSimpleFields(type);
        return fields.filter(x => simpleFields.some(y => y === x));
    }

    private static getRelatedFields(type: string, fields: string[]): string[] {
        let star = '*';
        if (fields != null && fields.length === 1 && fields[0] === star) {
            return [star];
        }

        const result: string[] = [];
        const relatedFields = ServiceMetadata.getRelationFields(type);
        const pattern = /(?<fieldName>.+?)\((?<nested>.+)\)/;
        fields.forEach((field) => {
            const fieldMatch = field.match(pattern);
            if (!fieldMatch && relatedFields.some(x => x === field)) {
                result.push(field);
            } else if (fieldMatch && fieldMatch.groups) {
                const fieldName = fieldMatch.groups['fieldName'];
                if (relatedFields.some(x => x === fieldName)) {
                    const innerFields = fieldMatch.groups['nested'];
                    const relatedFieldsInput = this.parseInnerFields(innerFields);

                    const relatedTypeName = ServiceMetadata.getRelatedType(type, fieldName);
                    if (relatedTypeName) {
                        let relatedSimpleFields = ServiceMetadata.getSimpleFields(relatedTypeName);
                        relatedSimpleFields = relatedFieldsInput.filter(x => relatedSimpleFields.some(y => y === x));

                        let simpleFieldsJoined: string | null = null;
                        if (relatedSimpleFields.length > 0) {
                            simpleFieldsJoined = relatedSimpleFields.join(',');
                            simpleFieldsJoined = `$select=${simpleFieldsJoined}`;
                        }

                        const relatedRelationFields = RestService.getRelatedFields(relatedTypeName, relatedFieldsInput);
                        let relatedRelationFieldsJoined: string | null = null;
                        if (relatedRelationFields.length > 0) {
                            relatedRelationFieldsJoined = relatedRelationFields.join(',');
                            relatedRelationFieldsJoined = `$expand=${relatedRelationFieldsJoined}`;
                        }

                        let resultString: string | null = null;
                        if (relatedRelationFieldsJoined && simpleFieldsJoined) {
                            resultString = `${fieldName}(${simpleFieldsJoined};${relatedRelationFieldsJoined})`;
                        } else if (relatedRelationFieldsJoined) {
                            resultString = `${fieldName}(${relatedRelationFieldsJoined})`;
                        } else if (simpleFieldsJoined) {
                            resultString = `${fieldName}(${simpleFieldsJoined})`;
                        }

                        if (resultString) {
                            result.push(resultString);
                        }
                    }
                }
            }
        });

        return result;
    }

    private static parseInnerFields(input: string): string[] {
        const allFields: string[] = [];

        let fieldStartIndex = 0;
        let charIterator = 0;
        let openingBraceCounter = 0;
        let closingBraceCounter = 0;

        for (let i = 0; i < input.length; i++) {
            charIterator++;
            const character = input[i];
            if (character === '(') {
                openingBraceCounter++;
            }

            if (character === ')') {
                closingBraceCounter++;
            }

            if (character === ',') {
                if (openingBraceCounter > 0 && openingBraceCounter === closingBraceCounter) {
                    let relatedField = input.substring(fieldStartIndex, charIterator - fieldStartIndex - 1).trim();
                    allFields.push(relatedField);
                    fieldStartIndex = charIterator + 1;
                    openingBraceCounter = 0;
                    closingBraceCounter = 0;
                } else if (openingBraceCounter === 0 && closingBraceCounter === 0) {
                    let basicField = input.substring(fieldStartIndex, charIterator - fieldStartIndex - 1).trim();
                    allFields.push(basicField);
                    fieldStartIndex = charIterator + 1;
                }
            }
        }

        if (fieldStartIndex < charIterator) {
            let lastField = input.substring(fieldStartIndex, charIterator - fieldStartIndex).trim();
            allFields.push(lastField);
        }

        return allFields;
    }

    public static buildQueryParams(queryParams: { [key: string]: string | undefined } | undefined) {
        if (!queryParams) {
            return '';
        }

        let result = '';
        Object.keys(queryParams).forEach((key) => {
            const value = queryParams[key];
            if (value) {
                result += `${key}=${value}&`;
            }
        });

        if (result !== '') {
            result = '?' + result;
            result = result.substring(0, result.length - 1);
        }

        return result;
    }

    private static buildHeaders(requestData: RequestData) {
        let headers: { [key:string]: string } = { 'X-Requested-With': 'react' };
        if (process.env['SF_ACCESS_KEY']) {
            headers['X-SF-Access-Key'] = process.env['SF_ACCESS_KEY'];
        }

        if (requestData.method === 'POST' && !headers['Content-Type']) {
            headers['Content-Type'] = 'application/json';
        }

        if (!requestData.headers) {
            return headers;
        }

        return Object.assign(headers, requestData.headers);
    }

    public static sendRequest<T>(request: RequestData): Promise<T> {
        const headers = this.buildHeaders(request);

        const args: RequestInit = { headers, method: request.method };
        if (request.data && headers['Content-Type'] === 'application/json') {
            args.body = JSON.stringify(request.data);
        }

        if (headers['Content-Encoding'] === 'base64') {
            args.body = request.data;
        }

        if (process.env.NODE_ENV === 'development') {
            args.cache = 'no-cache';
        }

        return fetch(request.url, args)
            .then((x => {
                const contentTypeHeader = x.headers.get('content-type');
                if (contentTypeHeader) {
                    if (x.status > 399) {
                        if (contentTypeHeader.indexOf('application/json') !== -1) {
                            return x.json().then((y) => {
                                const message = `${request.method} ${request.url} failed. Response -> ${y.error.code}: ${y.error.message}`;
                                console.error(message);
                                throw message;
                            });
                        }

                        return x.text().then((html) => {
                            const message = `${request.method} ${request.url} failed. Response -> ${x.status}: ${x.statusText} ${html}`;
                            console.error(message);
                            throw message;
                        });
                    }

                    return x.json().then(x => <T>x);
                }

                return Promise.resolve<any>(undefined);
            }));
    }

    public static buildItemBaseUrl(itemType: string): string {
        const serviceUrl = RootUrlService.getServiceUrl();
        const setName = ServiceMetadata.getSetNameFromType(itemType);

        return `${serviceUrl}/${setName}`;
    }
}

export class RestSdkTypes {
    public static readonly Video: string = 'Telerik.Sitefinity.Libraries.Model.Video';
    public static readonly Image: string = 'Telerik.Sitefinity.Libraries.Model.Image';
    public static readonly News: string = 'Telerik.Sitefinity.News.Model.NewsItem';
    public static readonly GenericContent: string = 'Telerik.Sitefinity.GenericContent.Model.ContentItem';
    public static readonly Pages: string = 'Telerik.Sitefinity.Pages.Model.PageNode';
    public static readonly Form: string = 'Telerik.Sitefinity.Forms.Model.FormDescription';
    public static readonly Site: string = 'Telerik.Sitefinity.Multisite.Model.Site';
}

interface RequestData {
    url: string;
    method?: string;
    headers?: { [key: string]: string };
    data?: any;
}
