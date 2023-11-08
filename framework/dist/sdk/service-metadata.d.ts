export declare class ServiceMetadata {
    static serviceMetadataCache: ServiceMetadataDefinition;
    static fetch(): Promise<ServiceMetadataDefinition>;
    static getSetNameFromType(itemType: string): string | undefined;
    static getParentType(itemType: string): string | null;
    static isPropertyACollection(type: string, propName: string): boolean;
    static getRelatedType(type: string, relationName: string): string | null;
    private static isRelatedProperty;
    private static isPrimitiveProperty;
    static serializeFilterValue(type: string, propName: string, value: any): any;
    static getSimpleFields(type: string): string[];
    static getRelationFields(type: string): string[];
}
export interface ServiceMetadataDefinition {
    definitions: {
        [key: string]: any;
    };
    entityContainer: {
        entitySets: {
            [key: string]: any;
        };
    };
}
