export interface MixedContentContext {
    ItemIdsOrdered: string[] | null;
    Content: ContentContext[];
}
export interface ContentContext {
    Type: string;
    Variations: ContentVariation[] | null;
}
export interface ContentVariation {
    Source: string;
    Filter: {
        Key: string;
        Value: string;
    };
    DynamicFilterByParent?: boolean;
}
