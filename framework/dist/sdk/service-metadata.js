import { RootUrlService } from './root-url.service';
export class ServiceMetadata {
    static serviceMetadataCache;
    static fetch() {
        const serviceUrl = RootUrlService.getServiceUrl();
        const metadataUrl = `${serviceUrl}sfmeta`;
        return fetch(metadataUrl, { headers: { 'X-Requested-With': 'react' } }).then(x => x.json()).then(x => {
            this.serviceMetadataCache = x;
            return x;
        });
    }
    static getSetNameFromType(itemType) {
        const definition = ServiceMetadata.serviceMetadataCache.definitions[itemType];
        if (definition != null) {
            const sets = ServiceMetadata.serviceMetadataCache.entityContainer.entitySets;
            const setName = Object.keys(sets).find((x) => {
                return sets[x]['entityType']['$ref'].endsWith(itemType);
            });
            return setName;
        }
        return itemType;
    }
    static getParentType(itemType) {
        const definition = ServiceMetadata.serviceMetadataCache.definitions[itemType];
        if (definition != null) {
            const parent = definition['properties']['Parent'];
            if (parent != null) {
                const anyOfProperty = parent['anyOf'];
                if (anyOfProperty != null && anyOfProperty.length > 0) {
                    let refProperty = anyOfProperty.find(x => x.$ref != null);
                    if (refProperty != null) {
                        return refProperty.$ref.replace('#/definitions/', '');
                    }
                }
            }
        }
        return null;
    }
    static isPropertyACollection(type, propName) {
        let entityTypeDef = ServiceMetadata.serviceMetadataCache.definitions[type];
        let propMeta = entityTypeDef['properties'][propName];
        let propType = propMeta['type'];
        if (!propType) {
            return false;
        }
        if (Array.isArray(propType) || propType === 'array') {
            return true;
        }
        return false;
    }
    static getRelatedType(type, relationName) {
        const typeDefinition = ServiceMetadata.serviceMetadataCache.definitions[type];
        let properties = typeDefinition['properties'];
        let property = properties[relationName];
        if (typeof property !== 'object') {
            return null;
        }
        let relatedReferenceType = property['$ref'];
        if (relatedReferenceType == null) {
            let itemsProperty = property['items'];
            if (itemsProperty != null) {
                relatedReferenceType = itemsProperty['$ref'];
            }
        }
        if (relatedReferenceType == null) {
            let anyOfProperty = property['anyOf'];
            if (anyOfProperty && anyOfProperty.length > 0) {
                let relatedItemProperty = anyOfProperty.find(x => x['$ref'] != null);
                if (relatedItemProperty != null) {
                    relatedReferenceType = relatedItemProperty['$ref'];
                }
            }
        }
        if (relatedReferenceType == null) {
            return null;
        }
        relatedReferenceType = relatedReferenceType.replace('#/definitions/', '');
        if (this.serviceMetadataCache.definitions.hasOwnProperty(relatedReferenceType)) {
            return relatedReferenceType;
        }
        return null;
    }
    static isRelatedProperty(type, propName) {
        return !!this.getRelatedType(type, propName);
    }
    static isPrimitiveProperty(type, propName) {
        const definition = ServiceMetadata.serviceMetadataCache.definitions[type];
        let properties = definition['properties'];
        let property = properties[propName];
        if (property == null) {
            throw new Error(`The field - ${propName} is not recognized as a property of the current type - ${type}`);
        }
        return (typeof property === 'object') && !this.isRelatedProperty(type, propName);
    }
    static serializeFilterValue(type, propName, value) {
        const definition = ServiceMetadata.serviceMetadataCache.definitions[type];
        if (this.isPrimitiveProperty(type, propName)) {
            const propMeta = definition['properties'][propName];
            const propType = propMeta['type'];
            const propFormat = propMeta['format'];
            let propFormatToString = null;
            if (propFormat != null) {
                propFormatToString = propFormat.toString();
            }
            if (propType == null) {
                return null;
            }
            const propTypeArray = propType;
            const propTypeString = propType.toString();
            if (Array.isArray(propType) && propType.length > 0) {
                if (propTypeArray.some(x => x === 'null') && value === null) {
                    return 'null';
                }
                if (propTypeArray.some(x => x === 'string')) {
                    return `'${value}'`;
                }
            }
            else if (propTypeString === 'array') {
                if (propMeta.items && propMeta.items.format) {
                    switch (propMeta.items.format) {
                        case 'string':
                            return `'${value}'`;
                        default:
                            return value.toString();
                    }
                }
            }
            else if (propFormatToString === 'date-time' && value instanceof Date) {
                return value.toISOString();
            }
            else if (value !== null) {
                return value.toString();
            }
        }
        return null;
    }
    static getSimpleFields(type) {
        let definition = ServiceMetadata.serviceMetadataCache.definitions[type];
        let propertiesObject = definition['properties'];
        return Object.keys(propertiesObject).map((key) => {
            if (this.isPrimitiveProperty(type, key)) {
                return key;
            }
            return null;
        }).filter(x => !!x);
    }
    static getRelationFields(type) {
        let definition = ServiceMetadata.serviceMetadataCache.definitions[type];
        let propertiesObject = definition['properties'];
        return Object.keys(propertiesObject).map((key) => {
            if (this.isRelatedProperty(type, key)) {
                return key;
            }
            return null;
        }).filter(x => !!x);
    }
}
