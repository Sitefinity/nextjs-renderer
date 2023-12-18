import { RequestContext, RestSdkTypes, RestService, RenderWidgetService, initRendering, widgetRegistry, WidgetExecutionError } from '@progress/sitefinity-react-framework';
import { render } from '@testing-library/react';
import { Dictionary } from '../../src/nextjs-framework/typings/dictionary';

export class WidgetTester {
    public static async testWidgetRender<TEntity>(args: TestWidgetArgs<TEntity>) {
        initRendering(widgetRegistry, WidgetExecutionError);

        const page = await RestService.createItem({
            Type: RestSdkTypes.Pages,
            Data: {
                Title: args.pageTitle ?? expect.getState().currentTestName,
                UrlName: args.pageUrlName ?? new Date().getTime().toString(),
                TemplateName: 'Next.Default'
            }
        });

        await RestService.lockPage({
            Id: page.Id,
            Type: RestSdkTypes.Pages,
            Version: 0
        });

        let properties: Dictionary = {};
        if (args.properties) {
            Object.keys(args.properties).forEach((key) => {
                let value: any = (args.properties as any)[key];
                if (value && !(typeof value === 'undefined')) {
                    value = JSON.stringify(value);
                }

                properties[key] = value;
            });
        }

        await RestService.createWidget({
            Id: page.Id,
            Provider: page.Provider,
            Type: RestSdkTypes.Pages,
            Name: args.name,
            PlaceholderName: 'Body',
            Properties: properties
        });

        await RestService.publishItem({
            Id: page.Id,
            Provider: page.Provider,
            Type: RestSdkTypes.Pages
        });

        const layout = await RestService.getLayout({
            pagePath: page['UrlName']
        });

        let renderType = args.render;
        if (typeof renderType === 'undefined') {
            renderType = RenderType.Live;
        }

        const requestContext: RequestContext = {
            'detailItem': layout.DetailItem,
            'layout': layout,
            'searchParams': {
                'sf_culture': layout.Culture,
                'sf_site': layout.SiteId,
                'sf_page_node': layout.Id
            },
            'isEdit': renderType === RenderType.Edit,
            'isPreview': renderType === RenderType.Preview,
            'isLive': renderType === RenderType.Live,
            'culture': layout.Culture
        };

        const widgetModel = layout.ComponentContext.Components[0];
        const metadata = RenderWidgetService.widgetRegistry.widgets[args.name];
        RenderWidgetService.parseProperties(widgetModel);

        const component = await metadata.componentType({ model: widgetModel, requestContext, metadata });

        const { container } = render(component);
        await args.assert(container);
    }
}

export interface TestWidgetArgs<TEntity> {
    name: string;
    pageTitle?: string;
    pageUrlName?: string;
    properties?: TEntity;
    render?: RenderType;
    assert: AssertWidgetArgs;
}


type AssertWidgetArgs = (element: HTMLElement) => void | Promise<void>
export enum RenderType {
    Edit,
    Live,
    Preview
}

// // export interface TestWidgetArgsEdit {
// //     name: string;
// //     properties?: { [key: string]: string };
// //     metadata: TestMetadata
// // }
// // interface TestMetadata {
// //     hasQuickEditOperation?: boolean;
// //     isContentWidget?: boolean;
// //     isEmpty?: boolean;
// //     isEmptyVisualHidden?: boolean;
// //     isOrphaned?: boolean;
// //     name?: string;
// //     title?: string;
// //     draggable?: boolean
// // }


// // public static async testWidgetMetadataRenderInEdit(args: TestWidgetArgsEdit) {
// //     return this.testWidgetRender({
// //         assert: (element) => {
// //             const actualElement = element.querySelector('[data-sfid]');
// //             if (!actualElement) {
// //                 throw 'Cannot find element to test by attribute data-sfid';
// //             }

// //             Object.keys(args.metadata).forEach((key) => {
// //                 if (key === 'draggable') {
// //                     expect(actualElement.getAttribute('draggable')).toEqual(args.metadata.draggable?.toString());
// //                 } else {
// //                     const attributeName = `data-sf${key.toLowerCase()}`;
// //                     expect(actualElement.getAttribute(attributeName)).toEqual((args.metadata as any)[key].toString());
// //                 }
// //             });
// //         },
// //         name: args.name,
// //         properties: args.properties,
// //         render: RenderType.Edit
// //     });
// // }
