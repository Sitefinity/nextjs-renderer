export interface PageScript {
    Source: string;
    Attributes: Array<{ [key: string]: string }>;
    Value: string;
    Location: PageScriptLocation;
    IsNoScript: boolean;
}

export enum PageScriptLocation {
    BodyTop = 'BodyTop',
    BodyBottom = 'BodyBottom',
    Head = 'Head'
}
