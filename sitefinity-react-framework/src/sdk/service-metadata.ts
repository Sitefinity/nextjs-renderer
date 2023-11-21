import { RootUrlService } from './root-url.service';

export class ServiceMetadata {
    public static serviceMetadataCache: ServiceMetadataDefinition;

    public static fetch(): Promise<ServiceMetadataDefinition> {
        const serviceUrl = RootUrlService.getServiceUrl();
        const metadataUrl = `${serviceUrl}/sfmeta`;
        return fetch(metadataUrl, { headers: { 'X-Requested-With': 'react' } }).then(x => x.json()).then(x => {
            this.serviceMetadataCache = x;
            return x;
        });
    }

    public static getSetNameFromType(itemType: string) {
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

    public static getParentType(itemType: string) {
        const definition = ServiceMetadata.serviceMetadataCache.definitions[itemType];
        if (definition != null) {
            const parent = definition['properties']['Parent'];
            if (parent != null) {
                const anyOfProperty = parent['anyOf'] as Array<{ $ref: string }>;
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

    public static isPropertyACollection(type: string, propName: string) {
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

    public static getRelatedType(type: string, relationName: string): string | null {
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
            let anyOfProperty: Array<any> = property['anyOf'];
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

    private static isRelatedProperty(type: string, propName: string) {
        return !!this.getRelatedType(type, propName);
    }

    private static isPrimitiveProperty(type: string, propName: string) {
        const definition = ServiceMetadata.serviceMetadataCache.definitions[type];
        let properties = definition['properties'];
        let property = properties[propName];
        if (property == null) {
            throw new Error(`The field - ${propName} is not recognized as a property of the current type - ${type}`);
        }

        return (typeof property === 'object') && !this.isRelatedProperty(type, propName);
    }

    public static serializeFilterValue(type: string, propName: string, value: any) {
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

            const propTypeArray: string[] = propType;
            const propTypeString = propType.toString();
            if (Array.isArray(propType) && propType.length > 0) {
                if (propTypeArray.some(x => x === 'null') && value === null) {
                    return 'null';
                }

                if (propTypeArray.some(x => x === 'string')) {
                    return `'${value}'`;
                }
            } else if (propTypeString === 'array') {
                if (propMeta.items && propMeta.items.format) {
                    switch (propMeta.items.format) {
                        case 'string':
                            return `'${value}'`;
                        default:
                            return value.toString();
                    }
                }
            } else if (propFormatToString === 'date-time' && value instanceof Date) {
                return value.toISOString();
            } else if (value !== null) {
                return value.toString();
            }
        }

        return null;
    }

    public static getSimpleFields(type: string): string[] {
        let definition = ServiceMetadata.serviceMetadataCache.definitions[type];
        let propertiesObject = definition['properties'];

        return <string[]>Object.keys(propertiesObject).map((key) => {
            if (this.isPrimitiveProperty(type, key)) {
                return key;
            }

            return null;
        }).filter(x => !!x);
    }

    public static getRelationFields(type: string): string[] {
        let definition = ServiceMetadata.serviceMetadataCache.definitions[type];
        let propertiesObject = definition['properties'];

        return <string[]>Object.keys(propertiesObject).map((key) => {
            if (this.isRelatedProperty(type, key)) {
                return key;
            }

            return null;
        }).filter(x => !!x);
    }
}

export interface ServiceMetadataDefinition {
    definitions: { [key: string]: any };
    entityContainer: {
        entitySets: { [key: string] : any }
    };
}
