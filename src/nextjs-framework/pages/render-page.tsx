
import React from 'react';
import { RenderPageClient } from './render-page-client';
import { cookies } from 'next/headers';
import { pageLayout } from './utils';
import { AppState } from './app-state';
import { PageParams } from './page-params';
import { ServiceMetadata } from '../rest-sdk';
import { RenderWidgetService } from '../services/render-widget-service';

export async function RenderPage({ params, searchParams }: PageParams) {
    const layout = await pageLayout({ params, searchParams });
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
        <RenderPageClient metadata={ServiceMetadata.serviceMetadataCache} layout={layout} context={appState.requestContext} />
        {appState.widgets.map((child) => {
                return RenderWidgetService.createComponent(child, appState.requestContext);
            })}
      </>
    );
}
