import { initRestSdk, RequestContext, RestSdkTypes, RestService, RenderWidgetService, initRendering, widgetRegistry, WidgetExecutionError } from '@progress/sitefinity-react-framework';
import { render } from '@testing-library/react';

export class WidgetTester {

    public static async testWidgetRender(args: TestWidgetArgs) {
        await initRestSdk();
        initRendering(widgetRegistry, WidgetExecutionError);

        const page = await RestService.createItem({
            Type: RestSdkTypes.Pages,
            Data: {
                Title: 'should render content block with empty model',
                UrlName: 'content-block-with-content' + new Date().getTime(),
                TemplateName: 'Next.Default'
            }
        });

        await RestService.lockPage({
            Id: page.Id,
            Type: RestSdkTypes.Pages,
            Version: 0
        });

        await RestService.createWidget({
            Id: page.Id,
            Provider: page.Provider,
            Type: RestSdkTypes.Pages,
            Name: args.name,
            PlaceholderName: 'Body',
            Properties: args.properties
        });

        await RestService.publishItem({
            Id: page.Id,
            Provider: page.Provider,
            Type: RestSdkTypes.Pages
        });

        const layout = await RestService.getLayout({
            pagePath: page['UrlName']
        });

        const requestContext: RequestContext = {
            'detailItem': layout.DetailItem,
            'layout': layout,
            'searchParams': {
                'sf_culture': layout.Culture,
                'sf_site': layout.SiteId,
                'sf_page_node': layout.Id
            },
            'isEdit': false,
            'isPreview': false,
            'isLive': true,
            'culture': layout.Culture
        };

        const widgetModel = layout.ComponentContext.Components[0];
        const metadata = RenderWidgetService.widgetRegistry.widgets[args.name];

        const component = await metadata.componentType({ model: widgetModel, requestContext, metadata });

        const { container } = render(component);
        await args.assert(container);
    }
}

export interface TestWidgetArgs {
    name: string;
    properties?: { [key: string]: string };
    assert: AssertWidgetArgs
}

type AssertWidgetArgs = (element: HTMLElement) => void | Promise<void>

