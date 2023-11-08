import { RootUrlService } from './root-url.service';
import { ServiceMetadata } from './service-metadata';
import { ODataFilterSerializer } from './services/odata-filter-serializer';
export class RestService {
    static getUnboundType(args) {
        const wholeUrl = `${RestService.buildItemBaseUrl(args.Name)}`;
        return fetch(wholeUrl, { headers: { 'X-Requested-With': 'react' } }).then((x => x.json())).then((x) => {
            return { Items: x.value, TotalCount: x['@odata.count'] };
        });
    }
    static getItemWithFallback(itemType, id, provider) {
        const wholeUrl = `${RestService.buildItemBaseUrl(itemType)}(${id})/Default.GetItemWithFallback()${RestService.buildQueryParams({
            sf_provider: provider,
            sf_fallback_prop_names: '*',
            $select: '*'
        })}`;
        return fetch(wholeUrl, { headers: { 'X-Requested-With': 'react' } }).then(x => x.json());
    }
    static getCustomItems(baseURL, action, queryParamsForMethod, contentText = '') {
        const actionName = `${action}(${contentText})`;
        const wholeUrl = `${RestService.buildItemBaseUrl(baseURL)}/${actionName}${RestService.buildQueryParams(queryParamsForMethod)}`;
        return fetch(wholeUrl, { headers: { 'X-Requested-With': 'react' } }).then(x => x.json());
    }
    static getItemWithStatus(itemType, id, provider, queryParams) {
        let queryParamsForMethod = {
            sf_provider: provider,
            $select: '*'
        };
        queryParamsForMethod = Object.assign(queryParamsForMethod, queryParams);
        const wholeUrl = `${RestService.buildItemBaseUrl(itemType)}(${id})/Default.GetItemWithStatus()${RestService.buildQueryParams(queryParamsForMethod)}`;
        return fetch(wholeUrl, { headers: { 'X-Requested-With': 'react' } }).then(x => x.json());
    }
    static getItem(itemType, id, provider) {
        let queryParamsForMethod = {
            sf_provider: provider,
            $select: '*'
        };
        const wholeUrl = `${this.buildItemBaseUrl(itemType)}(${id})${this.buildQueryParams(queryParamsForMethod)}`;
        return fetch(wholeUrl, { headers: { 'X-Requested-With': 'react' } }).then(x => x.json());
    }
    static getSharedContent(id, cultureName) {
        let queryParamsForMethod = {
            sf_culture: cultureName,
            sf_fallback_prop_names: 'Content'
        };
        return fetch(`${RestService.buildItemBaseUrl(RestSdkTypes.GenericContent)}/Default.GetItemById(itemId=${id})${RestService.buildQueryParams(queryParamsForMethod)}`, { headers: { 'X-Requested-With': 'react' } }).then(x => x.json());
    }
    static getItems(args) {
        const filteredSimpleFields = this.getSimpleFields(args.Type, args.Fields || []);
        const filteredRelatedFields = this.getRelatedFields(args.Type, args.Fields || []);
        let queryParamsForMethod = {
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
        return fetch(wholeUrl, { headers: { 'X-Requested-With': 'react' } }).then((x => x.json())).then((x) => {
            return { Items: x.value, TotalCount: x['@odata.count'] };
        });
    }
    static getSimpleFields(type, fields) {
        let star = '*';
        if (fields != null && fields.length === 1 && fields[0] === star) {
            return [star];
        }
        let simpleFields = ServiceMetadata.getSimpleFields(type);
        return fields.filter(x => simpleFields.some(y => y === x));
    }
    static getRelatedFields(type, fields) {
        let star = '*';
        if (fields != null && fields.length === 1 && fields[0] === star) {
            return [star];
        }
        const result = [];
        const relatedFields = ServiceMetadata.getRelationFields(type);
        const pattern = /(?<fieldName>.+?)\((?<nested>.+)\)/;
        fields.forEach((field) => {
            const fieldMatch = field.match(pattern);
            if (!fieldMatch && relatedFields.some(x => x === field)) {
                result.push(field);
            }
            else if (fieldMatch && fieldMatch.groups) {
                const fieldName = fieldMatch.groups['fieldName'];
                if (relatedFields.some(x => x === fieldName)) {
                    const innerFields = fieldMatch.groups['nested'];
                    const relatedFieldsInput = this.parseInnerFields(innerFields);
                    const relatedTypeName = ServiceMetadata.getRelatedType(type, fieldName);
                    if (relatedTypeName) {
                        let relatedSimpleFields = ServiceMetadata.getSimpleFields(relatedTypeName);
                        relatedSimpleFields = relatedFieldsInput.filter(x => relatedSimpleFields.some(y => y === x));
                        let simpleFieldsJoined = null;
                        if (relatedSimpleFields.length > 0) {
                            simpleFieldsJoined = relatedSimpleFields.join(',');
                            simpleFieldsJoined = `$select=${simpleFieldsJoined}`;
                        }
                        const relatedRelationFields = RestService.getRelatedFields(relatedTypeName, relatedFieldsInput);
                        let relatedRelationFieldsJoined = null;
                        if (relatedRelationFields.length > 0) {
                            relatedRelationFieldsJoined = relatedRelationFields.join(',');
                            relatedRelationFieldsJoined = `$expand=${relatedRelationFieldsJoined}`;
                        }
                        let resultString = null;
                        if (relatedRelationFieldsJoined && simpleFieldsJoined) {
                            resultString = `${fieldName}(${simpleFieldsJoined};${relatedRelationFieldsJoined})`;
                        }
                        else if (relatedRelationFieldsJoined) {
                            resultString = `${fieldName}(${relatedRelationFieldsJoined})`;
                        }
                        else if (simpleFieldsJoined) {
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
    static parseInnerFields(input) {
        const allFields = [];
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
                }
                else if (openingBraceCounter === 0 && closingBraceCounter === 0) {
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
    static buildQueryParams(queryParams) {
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
    static buildItemBaseUrl(itemType) {
        const serviceUrl = RootUrlService.getServiceUrl();
        const setName = ServiceMetadata.getSetNameFromType(itemType);
        return `${serviceUrl}${setName}`;
    }
}
export class RestSdkTypes {
    static Video = 'Telerik.Sitefinity.Libraries.Model.Video';
    static Image = 'Telerik.Sitefinity.Libraries.Model.Image';
    static News = 'Telerik.Sitefinity.News.Model.NewsItem';
    static GenericContent = 'Telerik.Sitefinity.GenericContent.Model.ContentItem';
    static Pages = 'Telerik.Sitefinity.Pages.Model.PageNode';
}
