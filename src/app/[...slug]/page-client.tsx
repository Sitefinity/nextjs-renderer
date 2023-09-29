
'use client'

import { RootUrlService } from "@/framework/sdk/root-url.service";
import { ServiceMetadata, ServiceMetadataDefinition } from "@/framework/sdk/service-metadata";
import { PageLayoutServiceResponse } from "@/framework/sdk/services/layout-service.response";
import { RenderWidgetService } from "@/framework/services/render-widget-service";
import { RequestContext } from "@/framework/services/request-context";
import { RendererContractImpl } from "@/renderer-contract";
import { widgetRegistry } from "@/widget-registry";

export default function PageClient({ layout, metadata, context }: { layout: PageLayoutServiceResponse, metadata: ServiceMetadataDefinition, context: RequestContext }) {
    RootUrlService.rootUrl = `${process.env["NEXT_CMS_URL"]}`;
    RenderWidgetService.widgetRegistry = widgetRegistry;

    if (context.isEdit && typeof window !== 'undefined') {
        ServiceMetadata.serviceMetadataCache = metadata;
        const timeout = 2000;
        const start = new Date().getTime();
        const handle = window.setInterval(() => {
            document.body.setAttribute('data-sfcontainer', 'Body');
            // we do not know the exact time when react has finished the rendering process.
            // thus we check every 100ms for dom changes. A proper check would be to see if every single
            // component is rendered
            const timePassed = new Date().getTime() - start;
            if ((layout.ComponentContext.Components.length > 0 && document.body.childElementCount > 0) || layout.ComponentContext.Components.length === 0 || timePassed > timeout) {
                window.clearInterval(handle);

                (window as any)["rendererContract"] = new RendererContractImpl();
                window.dispatchEvent(new Event('contractReady'));
            }
        }, 1000);
    }

    return <></>;
}

