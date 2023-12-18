import { createRoot } from 'react-dom/client';
import { RenderWidgetService } from './render-widget-service';
import { ComponentMetadata, GetCategoriesArgs, GetWidgetMetadataArgs, GetWidgetsArgs, RenderResult, RenderWidgetArgs, RendererContract, TotalCountResult, WidgetItem, WidgetSection } from '../editor/renderer-contract-interfaces';
import { RequestContext } from '../editor/request-context';
import { WidgetMetadata } from '../editor/widget-framework/widget-metadata';

export class RendererContractImpl implements RendererContract {

    getWidgetMetadata(args: GetWidgetMetadataArgs): Promise<ComponentMetadata> {
        const designerMetadata = RenderWidgetService.widgetRegistry.widgets[args.widgetName].designerMetadata;
        return Promise.resolve(designerMetadata);
    }

    // html string to change the widget and rerender it
    renderWidget(args: RenderWidgetArgs): Promise<RenderResult> {
        const widgetMetadata = RenderWidgetService.widgetRegistry.widgets[args.model.Name];

        if ((widgetMetadata as any).ssr) {
            return new Promise((resolve, reject) => {
                const serializedModel = JSON.stringify(args.model);
                const modelAsBase64String = btoa(serializedModel);
                const modelAsUrlEncodedString = encodeURIComponent(modelAsBase64String);
                fetch(`/render?sfaction=edit&sf_culture=${args.dataItem.culture}&sf_site=${args.siteId}&sf_page_node=${args.dataItem.key}&model=${modelAsUrlEncodedString}&pageUrl=${encodeURIComponent((args.dataItem as any).data['EditUrl'])}`).then((response) => {
                    response.text().then((html) => {
                        let rootDoc = document.createElement('html');
                        rootDoc.innerHTML = html;
                        const wrapper = rootDoc.querySelector('div[id=\'widgetPlaceholder\']');
                        if (wrapper) {
                            resolve(<RenderResult>{
                                element: wrapper.firstElementChild as HTMLElement,
                                content: '',
                                scripts: []
                            });
                        } else {
                            reject('Wrapping widgetplaceholder not found');
                        }
                    });
                });
            });
        }

        return new Promise((resolve) => {
            const tempElement = document.createElement('div');
            const context: RequestContext = {
                isEdit: true,
                layout: <any>undefined,// TODO
                isPreview: false,
                isLive: false,
                culture: args.dataItem.culture,
                searchParams: {}
            };

            const component = RenderWidgetService.createComponent(args.model, context);

            createRoot(tempElement).render(component);
            setTimeout(() => {
                resolve({
                    element: tempElement.firstElementChild as HTMLElement,
                    content: '',
                    scripts: []
                });
            }, 500);
        });
    }

    getWidgets(args: GetWidgetsArgs): Promise<TotalCountResult<WidgetSection[]>> {
        const filteredWidgetsByToolBox: WidgetMetadata[] = [];

        Object.keys(RenderWidgetService.widgetRegistry.widgets).forEach((key) => {
            const widgetEntry = RenderWidgetService.widgetRegistry.widgets[key];
            widgetEntry.editorMetadata = widgetEntry.editorMetadata || {};
            widgetEntry.editorMetadata.Name = widgetEntry.editorMetadata?.Name || key;

            if (args.toolbox) {
                if (widgetEntry.editorMetadata?.Toolbox === args.toolbox) {
                    filteredWidgetsByToolBox.push(widgetEntry);
                }

                return;
            }

            if (widgetEntry.editorMetadata?.Toolbox) {
                return;
            }

            filteredWidgetsByToolBox.push(widgetEntry);
        });

        let filteredWidgetsByCategory: WidgetMetadata[] = [];
        filteredWidgetsByToolBox.forEach((widgetEntry) => {

            if (args.category) {
                let widgetCategory = widgetEntry.editorMetadata?.Category || 'Content';
                if (widgetCategory.toUpperCase().indexOf(args.category.toUpperCase()) !== -1) {
                    filteredWidgetsByCategory.push(widgetEntry);
                }

                return;
            }

            filteredWidgetsByCategory.push(widgetEntry);
        });

        let filteredWidgetsBySearch: WidgetMetadata[] = [];
        filteredWidgetsByCategory.forEach((widgetEntry) => {

            if (args.search) {
                if ((widgetEntry.editorMetadata?.Title || widgetEntry.editorMetadata?.Name)?.toUpperCase()?.indexOf(args.search.toUpperCase()) !== -1) {
                    filteredWidgetsBySearch.push(widgetEntry);
                }

                return;
            }

            filteredWidgetsBySearch.push(widgetEntry);
        });

        const widgetsBySection: { [key: string]: WidgetMetadata[] } = {};
        filteredWidgetsBySearch.forEach((widget) => {
            const sectionName = widget.editorMetadata?.Section || 'Main';
            const widgetSectionArray = widgetsBySection[sectionName] || [];
            widgetSectionArray.push(widget);

            widgetsBySection[sectionName] = widgetSectionArray;
        });

        let widgetCount = 0;
        const widgetSections = Object.keys(widgetsBySection).map((x) => {
            return <WidgetSection>{
                title: x,
                widgets: widgetsBySection[x].map(y => {
                    widgetCount++;
                    return <WidgetItem>{
                        name: y.editorMetadata?.Name || y.editorMetadata?.Title,
                        title: y.editorMetadata?.Title,
                        thumbnailUrl: y.editorMetadata?.ThumbnailUrl
                    };
                })
            };
        });

        return Promise.resolve({
            totalCount: widgetCount,
            dataItems: widgetSections
        });
    }

    getCategories(args: GetCategoriesArgs): Promise<Array<string>> {
        if (args.toolbox === 'Forms') {
            return Promise.resolve(['Content', 'Layout & Presets']);
        }

        return Promise.resolve(['Content', 'Navigation & Search', 'Login & Users', 'Layout & Presets']);
    }
}
