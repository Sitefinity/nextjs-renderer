import { ContentBlock, ContentBlockEntity, initRestSdk } from '@progress/sitefinity-react-framework';
import { render, waitFor } from '@testing-library/react';
import { RequestContext, WidgetMetadata, WidgetModel } from '../src/nextjs-framework/editor';
import { RestSdkTypes, RestService } from '../src/nextjs-framework/rest-sdk';


describe('should render content block', () => {
    fit('with empty model', async () => {

        await initRestSdk();
        const page = await RestService.createItem({
            Type: RestSdkTypes.Pages,
            Data: {
                Title: 'should render content block with empty model',
                UrlName: 'content-block-with-content',
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
            Name: 'SitefinityContentBlock',
            PlaceholderName: 'Body'
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

        const metadata: WidgetMetadata = {
            designerMetadata: {
                Name: 'SitefinityContentBlock',
                Caption: 'Content block'
            },
            componentType: ContentBlock,
            selectorCategory: 'Content',
            editorMetadata: { Title: 'Content block' }
        };

        const component = await ContentBlock({ model: widgetModel, requestContext, metadata });
        const { container } = render(component);

        await waitFor(() => {
            expect(container).toMatchSnapshot();
        });
    });
});
