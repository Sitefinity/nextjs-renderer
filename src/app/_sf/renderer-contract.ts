import { createRoot } from 'react-dom/client';
import { widgetRegistry } from '@progress/sitefinity-react-widgets';
import { RendererContract, GetWidgetMetadataArgs, ComponentMetadata, RenderWidgetArgs, RenderResult, RequestContext, RenderWidgetService, GetWidgetsArgs, TotalCountResult, WidgetSection, WidgetItem, GetCategoriesArgs } from '@progress/sitefinity-react-framework';

export class RendererContractImpl implements RendererContract {

    getWidgetMetadata(args: GetWidgetMetadataArgs): Promise<ComponentMetadata> {
        const designerMetadata = widgetRegistry.widgets[args.widgetName].designerMetadata;
        return Promise.resolve(designerMetadata);
    }

    // html string to change the widget and rerender it
    renderWidget(args: RenderWidgetArgs): Promise<RenderResult> {
        const widgetMetadata = widgetRegistry.widgets[args.model.Name];

        if ((widgetMetadata as any).ssr) {
            return new Promise((resolve) => {
                const serializedModel = JSON.stringify(args.model);
                const modelAsBase64String = btoa(serializedModel);
                const modedelAsUrlEncodedString = encodeURIComponent(modelAsBase64String);
                fetch(`/render?sfaction=edit&sf_culture=${args.dataItem.culture}&sf_site=${args.siteId}&sf_page_node=${args.dataItem.key}&model=${modedelAsUrlEncodedString}`).then((response) => {
                    response.text().then((html) => {
                        let rootDoc = document.createElement('html');
                        rootDoc.innerHTML = html;
                        const renderedElement = rootDoc.lastElementChild?.firstChild?.firstChild as HTMLElement;

                        resolve(<RenderResult>{
                            element: renderedElement,
                            content: '',
                            scripts: []
                        });
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

        Object.keys(widgetRegistry.widgets).forEach((key) => {
            const widgetEntry = widgetRegistry.widgets[key];
            if ((widgetEntry.selectorCategory === args.category) || (!widgetEntry.selectorCategory && args.category === 'Content')) {
                filteredWidgets.push({
                    name: key,
                    title: widgetEntry.editorMetadata?.Title || key
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
