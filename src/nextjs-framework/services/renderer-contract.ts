import { createRoot } from 'react-dom/client';
import { RenderWidgetService } from './render-widget-service';
import { ComponentMetadata, GetCategoriesArgs, GetWidgetMetadataArgs, GetWidgetsArgs, RenderResult, RenderWidgetArgs, RendererContract, TotalCountResult, WidgetItem, WidgetSection } from '../editor/renderer-contract-interfaces';
import { RequestContext } from '../editor/request-context';

export class RendererContractImpl implements RendererContract {

    getWidgetMetadata(args: GetWidgetMetadataArgs): Promise<ComponentMetadata> {
        const widgetRegister = RenderWidgetService.widgetRegistry.widgets[args.widgetName];
        const designerMetadata = widgetRegister.designerMetadata;
        return Promise.resolve(designerMetadata);
    }

    // html string to change the widget and rerender it
    renderWidget(args: RenderWidgetArgs): Promise<RenderResult> {
        const widgetMetadata = RenderWidgetService.widgetRegistry.widgets[args.model.Name];

        if ((widgetMetadata as any).ssr) {
            return new Promise((resolve, reject) => {
                const serializedModel = JSON.stringify(args.model);
                const modelAsBase64String = btoa(serializedModel);
                const modedelAsUrlEncodedString = encodeURIComponent(modelAsBase64String);
                fetch(`/render?sfaction=edit&sf_culture=${args.dataItem.culture}&sf_site=${args.siteId}&sf_page_node=${args.dataItem.key}&model=${modedelAsUrlEncodedString}`).then((response) => {
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
                detailItem: null,
                isEdit: true,
                isPreview: false,
                isLive: false,
                culture: args.dataItem.culture
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
        const filteredWidgets: WidgetItem[] = [];

        Object.keys(RenderWidgetService.widgetRegistry.widgets).forEach((key) => {
            const widgetEntry = RenderWidgetService.widgetRegistry.widgets[key];
            if ((widgetEntry.selectorCategory === args.category) || (!widgetEntry.selectorCategory && args.category === 'Content')) {
                filteredWidgets.push({
                    name: key,
                    title: widgetEntry.editorMetadata?.Title || key,
                    thumbnailUrl: widgetEntry.editorMetadata?.ThumbnailUrl
                });
            }
        });

        return Promise.resolve({
            totalCount: filteredWidgets.length,
            dataItems: [
                {
                    title: 'Default',
                    widgets: filteredWidgets
                }
            ]
        });
    }

    getCategories(args: GetCategoriesArgs): Promise<Array<string>> {
        return Promise.resolve(['Content', 'Layout']);
    }
}
