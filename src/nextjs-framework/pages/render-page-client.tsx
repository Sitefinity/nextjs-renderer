
'use client';

import { RendererContractImpl } from '../services/renderer-contract';
import { widgetRegistry } from '../widgets/widget-registry';
import { RequestContext } from '../editor';
import { ServiceMetadataDefinition, RootUrlService, ServiceMetadata } from '../rest-sdk';
import { PageLayoutServiceResponse } from '../rest-sdk/services';
import { RenderWidgetService } from '../services/render-widget-service';

export function RenderPageClient({ layout, metadata, context }: { layout: PageLayoutServiceResponse, metadata: ServiceMetadataDefinition, context: RequestContext }) {
    RootUrlService.rootUrl = `${process.env['NEXT_PUBLIC_CMS_URL'] || ''}`;

    RenderWidgetService.widgetRegistry = widgetRegistry;
    ServiceMetadata.serviceMetadataCache = metadata;

    if (context.isEdit && typeof window !== 'undefined') {
        const timeout = 2000;
        const start = new Date().getTime();
        const handle = window.setInterval(() => {
            document.body.setAttribute('data-sfcontainer', 'Body');
            // we do not know the exact time when react has finished the rendering process.
            // thus we check every 100ms for dom changes. A proper check would be to see if every single
            // component is rendered
            const timePassed = new Date().getTime() - start;
            if ((layout.ComponentContext.Components.length > 0 && timePassed > timeout) || layout.ComponentContext.Components.length === 0) {
                window.clearInterval(handle);

                (window as any)['rendererContract'] = new RendererContractImpl();
                window.dispatchEvent(new Event('contractReady'));
            }
        }, 1000);
    }

    return <></>;
}

