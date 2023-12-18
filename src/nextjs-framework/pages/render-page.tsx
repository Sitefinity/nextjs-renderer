
import React from 'react';
import { RenderPageClient } from './render-page-client';
import { pageLayout } from './utils';
import { AppState } from './app-state';
import { PageParams } from './page-params';
import { ServiceMetadata } from '../rest-sdk';
import { RenderWidgetService } from '../services/render-widget-service';
import { RenderLazyWidgets as RenderLazyWidgets } from './render-lazy-widgets';
import { RenderPageScripts } from './render-page-scripts';

export async function RenderPage({ params, searchParams }: PageParams) {
    const layout = await pageLayout({ params, searchParams });
    const isEdit = searchParams['sfaction'] === 'edit';
    const isPreview = searchParams['sfaction'] === 'preview';
    const isLive = !(isEdit || isPreview);

    let appState : AppState = {
        requestContext: {
            layout: layout,
            searchParams: searchParams,
            detailItem: layout.DetailItem,
            culture: layout.Culture,
            isEdit,
            isPreview,
            isLive
        },
        widgets: layout.ComponentContext.Components
    };

    const liveUrl = params.slug.join('/') + '?' + new URLSearchParams(searchParams).toString();
    return (
      <>
        <RenderPageScripts layout={layout} />
        {isEdit && <RenderPageClient metadata={ServiceMetadata.serviceMetadataCache} layout={layout} context={appState.requestContext} />}
        {!isEdit && appState.requestContext.layout?.ComponentContext.HasLazyComponents && <RenderLazyWidgets metadata={ServiceMetadata.serviceMetadataCache} layout={layout} context={appState.requestContext} url={liveUrl} />}
        {appState.widgets.map((child) => {
                return RenderWidgetService.createComponent(child, appState.requestContext);
            })}
      </>
    );
}
