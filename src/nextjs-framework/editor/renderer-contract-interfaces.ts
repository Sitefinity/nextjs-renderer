import { WidgetModel } from './widget-framework/widget-model';

export interface RendererContract {
    getWidgetMetadata(args: GetWidgetMetadataArgs): Promise<ComponentMetadata>;
    renderWidget(args: RenderWidgetArgs): Promise<RenderResult>;
    getCategories(args: GetCategoriesArgs): Promise<Array<string>>;
    getWidgets(args: GetWidgetsArgs): Promise<TotalCountResult<Array<WidgetSection>>>;
}

export interface TotalCountResult<T> {
    dataItems: T;
    totalCount: number;
}

export interface RenderResult {
    element: HTMLElement,
    content: string,
    scripts: Array<Script>
}

export interface Script {
    src: string;
    id: string;
}

export interface WidgetItem {
    name: string;
    title?: string;
    addWidgetTitle?: string;
    addWidgetName?: string;
    thumbnailUrl?: string;
    initialProperties?: Array<{ name: string, value: string}>
}

export interface WidgetSection {
    title: string;
    widgets: WidgetItem[];
}

export interface RenderWidgetArgs {
    dataItem: DataItem;
    siteId: string;
    model: WidgetModel<any>;
    token?: Token;
}
export interface GetCategoriesArgs {
    token?: Token;
    toolbox?: string;
}

export interface GetWidgetsArgs {
    dataItem: DataItem;
    category: string;
    search: string;
    skip: number;
    take: number;
    token?: Token;
    toolbox?: string;
}

export interface GetWidgetMetadataArgs {
    dataItem: DataItem;
    widgetKey: string;
    widgetName: string;
    siteId: string;
    token?: Token;
}

export interface ComponentMetadata {
    Caption: string,
    Name: string,
    PropertyMetadata: SectionGroup[],
    PropertyMetadataFlat: PropertyMetadata[],
}

export interface PropertyMetadata {
    Name: string;
    Title: string;
    Type: string;
    DefaultValue: string;
    Properties: { [key: string]: any }
}

export interface SectionGroup {
    Name: string;
    Sections: SectionData[];
}

export interface SectionData {
    Name: string,
    Title: string
    Properties: Array<PropertyMetadata>
}

export interface Token {
    type: string,
    value: string
}

export interface DataItem {
    readonly provider: string;
    readonly culture: string;
    readonly key: string;
}
