import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PageParams } from './page-params';
import { PageLayoutServiceResponse, LayoutService, GetAllArgs } from '../rest-sdk/services';
import { ServiceMetadata } from '../rest-sdk/service-metadata';
import { RootUrlService } from '../rest-sdk/root-url.service';
import { RenderWidgetService } from '../services/render-widget-service';
import { RestService } from '../rest-sdk/rest-service';
import { WidgetRegistry } from '../editor';

export async function pageLayout({ params, searchParams }: PageParams): Promise<PageLayoutServiceResponse> {
    if (params && params.slug.some(x => x === '_next')) {
        notFound();
    }

    await initRestSdk();

    const layoutOrError = await RestService.getLayout({
        pagePath: params.slug.join('/'),
        queryParams: searchParams
    });
    const errorResponse = layoutOrError as any;
    if (errorResponse.error && errorResponse.error.code) {
        if (errorResponse.error.code === 'NotFound') {
            notFound();
        }
    }

    return layoutOrError as PageLayoutServiceResponse;
}

export async function pageMetadata({ params, searchParams }: PageParams): Promise<Metadata> {
    const layout = await pageLayout({ params, searchParams });
    if (layout.MetaInfo) {
        return {
            title: layout.MetaInfo.Title,
            description: layout.MetaInfo.Description,

            other: {
                'og-title': layout.MetaInfo.OpenGraphTitle,
                'og-image': layout.MetaInfo.OpenGraphImage,
                'og-video': layout.MetaInfo.OpenGraphVideo,
                'og-type': layout.MetaInfo.OpenGraphType,
                'og-site': layout.MetaInfo.OpenGraphSite
            }
        };
    }

    return {};
}

export async function pageStaticParams() {
    const getAllArgs: GetAllArgs = {
        Skip: 0,
        Take: 50,
        Count: true,
        Fields: ['ViewUrl', 'Renderer'],
        Type: 'Telerik.Sitefinity.Pages.Model.PageNode'
    };

    await ServiceMetadata.fetch();

    const filteredItems = [];
    while (true) {
        let items = await RestService.getItems(getAllArgs);
        let response = items.Items;
        if (response.length === 0) {
            break;
        }

        let filtered = response.filter(x => x['Renderer'] === 'React').map(x => x['ViewUrl']);
        if (filtered.length > 0) {
            filteredItems.push(...filtered);
        }

        getAllArgs.Skip = (getAllArgs.Skip as number) + (getAllArgs.Take as number);
    }

    return filteredItems.map((relativeUrl) => {
        return {
            slug: relativeUrl.split('/').splice(1)
        };
    });
}

export async function initRestSdk() {
    if (process.env.NODE_ENV === 'development') {
        RootUrlService.rootUrl = process.env['PROXY_URL'] as string;
    } else {
        RootUrlService.rootUrl = process.env['SF_CMS_URL'] as string;
    }

    await ServiceMetadata.fetch();
}

export function initRendering(widgetRegistry: WidgetRegistry, errorComponentType: any) {
    RenderWidgetService.widgetRegistry = widgetRegistry;
    RenderWidgetService.errorComponentType = errorComponentType;
}
