import { DetailItem } from '../../editor/services/detail-item';
import { WidgetModel } from '../../editor/widgets/widget-model';

export interface PageLayoutServiceResponse {
    Culture: string;
    SiteId: string;
    Id: string;
    ComponentContext: ComponentContext;
    MetaInfo: {
        Title: string,
        Description: string,
        HtmlInHeadTag: string,
        OpenGraphTitle: string,
        OpenGraphDescription: string,
        OpenGraphImage: string,
        OpenGraphVideo: string,
        OpenGraphType: string,
        OpenGraphSite: string,
        CanonicalUrl: string,
    },
    DetailItem: DetailItem,
    UrlParameters: string[],
    Scripts: PageScript[]
}

export interface PageScript {
    Source: string,
    Attributes: [{ Key: string, Value: string }]
    Value: string
}

export interface ComponentContext {
    Components: WidgetModel<any>[];
    HasLazyComponents: boolean;
}
