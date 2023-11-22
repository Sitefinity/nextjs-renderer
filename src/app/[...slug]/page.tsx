
import React from 'react';
import PageClient from './page-client';
import { cookies } from 'next/headers';
import { ServiceMetadata } from 'sitefinity-react-framework/sdk/service-metadata';
import { PageLayoutServiceResponse } from 'sitefinity-react-framework/sdk/services/layout-service.response';
import { LayoutService } from 'sitefinity-react-framework/sdk/services/layout.service';
import { RenderWidgetService } from 'sitefinity-react-framework/services/render-widget-service';
import { WidgetModel } from 'sitefinity-react-framework/widgets/widget-model';
import { RequestContext } from 'sitefinity-react-framework/services/request-context';
import { initStaticParams } from '../init';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

// export async function generateStaticParams() {
//     const getAllArgs: GetAllArgs = {
//         Skip: 0,
//         Take: 50,
//         Count: true,
//         Fields: ["ViewUrl", "Renderer"],
//         Type: "Telerik.Sitefinity.Pages.Model.PageNode",
//     };

//     await ServiceMetadata.fetch();

//     const filteredItems = [];
//     while (true) {
//         let items = await RestService.getItems(getAllArgs);
//         let response = items.Items;
//         if (response.length === 0) {
//             break;
//         }

//         let filtered = response.filter(x => x["Renderer"] === 'React').map(x => x["ViewUrl"]);
//         if (filtered.length > 0) {
//             filteredItems.push(...filtered);
//         }

//         getAllArgs.Skip = (getAllArgs.Skip as number) + (getAllArgs.Take as number);
//     }

//     return filteredItems.map((relativeUrl) => {
//         return {
//             slug: relativeUrl.split('/').splice(1),
//         }
//     });
// }

export async function generateMetadata(
    { params, searchParams }: PageParams
): Promise<Metadata> {
    const layout = await initLayout( { params, searchParams });

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

export default async function Page({ params, searchParams }: PageParams) {
    const layout = await initLayout({ params, searchParams });
    const isEdit = searchParams['sfaction'] === 'edit';
    const isPreview = searchParams['sfaction'] === 'preview';
    const isLive = !(isEdit || isPreview);

    let appState : AppState = {
        requestContext: {
            pageNode: layout,
            searchParams: searchParams,
            detailItem: layout.DetailItem,
            culture: layout.Culture,
            isEdit,
            isPreview,
            isLive,
            cookie: cookies().toString()
        },
        widgets: layout.ComponentContext.Components
    };

    return (
      <>
        <PageClient metadata={ServiceMetadata.serviceMetadataCache} layout={layout} context={appState.requestContext} />
        {appState.widgets.map((child) => {
                return RenderWidgetService.createComponent(child, appState.requestContext);
            })}
      </>
    );
}

interface AppState {
    requestContext: RequestContext;
    widgets: WidgetModel<any>[];
}

interface PageParams {
    params: {
        slug: string[]
    },
    searchParams: { [key:string]: string }
}

async function initLayout({ params, searchParams }: PageParams): Promise<PageLayoutServiceResponse> {
    if (params && params.slug.some(x => x === '_next')) {
        notFound();
    }

    await initStaticParams();

    const actionParam = searchParams['sfaction'];

    let headers: { [key: string]: string } = {};
    if (process.env.NODE_ENV === 'development' && actionParam) {
        const cookie = cookies().toString();
        headers = { 'Cookie': cookie };
        if (process.env.SF_CLOUD_KEY) {
            headers['X-SF-BYPASS-HOST'] = `${process.env.PROXY_ORIGINAL_HOST}:${process.env.PORT}`;
            headers['X-SF-BYPASS-HOST-VALIDATION-KEY'] = process.env.SF_CLOUD_KEY;
        } else {
            headers['X-ORIGINAL-HOST'] = `${process.env.PROXY_ORIGINAL_HOST}:${process.env.PORT}`;
        }
    }

    const layoutOrError = await LayoutService.get(params.slug.join('/'), actionParam, headers);
    const errorResponse = layoutOrError as any;
    if (errorResponse.error && errorResponse.error.code) {
        if (errorResponse.error.code === 'NotFound') {
            notFound();
        }
    }

    return layoutOrError as PageLayoutServiceResponse;
}
