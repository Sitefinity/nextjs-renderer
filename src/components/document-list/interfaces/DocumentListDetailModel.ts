export interface DocumentListModelDetail {
    ViewName: string;
    DetailItem: {
        Id: string;
        ProviderName: string;
        ItemType: string;
    },
    Attributes: Array<{ Key: string, Value: string}>;
}
