
import { Fragment } from 'react';
import { notFound } from 'next/navigation';
import PageClient from './page-client';
import { cookies } from 'next/headers';
import { ServiceMetadata } from '@/framework/sdk/service-metadata';
import { PageLayoutServiceResponse } from '@/framework/sdk/services/layout-service.response';
import { LayoutService } from '@/framework/sdk/services/layout.service';
import { RenderWidgetService } from '@/framework/services/render-widget-service';
import { WidgetModel } from '@/framework/widgets/widget-model';
import { RequestContext } from '@/framework/services/request-context';

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


export default async function Page({ params, searchParams }: PageParams) {
    await ServiceMetadata.fetch();

    const actionParam = searchParams['sfaction'];

    let headers: { [key: string]: string } = {};
    if (process.env.NODE_ENV === 'development' && actionParam) {
        const cookie = cookies().toString();
        headers = { "Cookie": cookie };
        if (process.env.SF_CLOUD_KEY) {
            headers['X-SF-BYPASS-HOST'] = `${process.env.PROXY_ORIGINAL_HOST}:${process.env.PORT}`;
            headers['X-SF-BYPASS-HOST-VALIDATION-KEY'] = process.env.SF_CLOUD_KEY;
        } else {
            headers["X-ORIGINAL-HOST"] = `${process.env.PROXY_ORIGINAL_HOST}:${process.env.PORT}`;
        }
    }

    const layoutOrError = await LayoutService.get(params.slug.join("/"), actionParam, headers);
    const errorResponse = layoutOrError as any;
    if (errorResponse.error && errorResponse.error.code) {
        if (errorResponse.error.code === "NotFound") {
            return notFound();
        }

        throw errorResponse.error.code;
    }

    const layout = layoutOrError as PageLayoutServiceResponse;

    let appState : AppState = {
        requestContext: {
            detailItem: layout.DetailItem,
            culture: layout.Culture,
            isEdit: searchParams["sfaction"] === "edit",
            isPreview: searchParams["sfaction"] === "preview",
        },
        widgets: layout.ComponentContext.Components
    };

    return (
        <Fragment>
            <PageClient metadata={ServiceMetadata.serviceMetadataCache} layout={layout} context={appState.requestContext} />
            {appState.widgets.map((child) => {
                return RenderWidgetService.createComponent(child, appState.requestContext);
            })}
        </Fragment>
    )
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
