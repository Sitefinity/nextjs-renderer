export interface MixedContentContext {
    ItemIdsOrdered: string[],
    Content: ContentContext[]
}

export interface ContentContext {
    Type: string;
    Variations: ContentVariation[]
}

export interface ContentVariation {
    Source: string;
    Filter: { Key: string, Value: string };
    DynamicFilterByParent: boolean;
}
