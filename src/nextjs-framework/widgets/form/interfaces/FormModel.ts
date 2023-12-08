import { DetailItem, WidgetModel } from '../../../editor';

export interface FormModel {
    HasLazyComponents: boolean;
    ViewComponentsFlat: WidgetModel<any>[],
    AllViewComponentsFlat: WidgetModel<any>[]
    Culture: string;
    DetailItem: DetailItem,
    Id: string,
    MetaInfo: {[key: string]: string | null},
    Scripts:{[key: string]: string | null},
    SiteId: string,
    TemplateName: string,
    UrlParameters: string
}
