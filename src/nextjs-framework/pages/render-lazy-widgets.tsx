
'use client';

import { RendererContractImpl } from '../services/renderer-contract';
import { widgetRegistry } from '../widgets/widget-registry';
import { RequestContext, WidgetModel } from '../editor';
import { ServiceMetadataDefinition, RootUrlService, ServiceMetadata } from '../rest-sdk';
import { PageLayoutServiceResponse } from '../rest-sdk/services';
import { RenderWidgetService } from '../services/render-widget-service';

export function RenderLazyWidgets({ layout, metadata, context }: { layout: PageLayoutServiceResponse, metadata: ServiceMetadataDefinition, context: RequestContext }) {
    RootUrlService.rootUrl = `${process.env['NEXT_PUBLIC_CMS_URL'] || ''}`;

    RenderWidgetService.widgetRegistry = widgetRegistry;
    ServiceMetadata.serviceMetadataCache = metadata;

    // let correlationId = Date.now().toString(36) + Math.random().toString(36).substring(2);
    // (window as any)['sfCorrelationId'] = correlationId;

    if (typeof window !== 'undefined') {
        let url = encodeURIComponent(window.location.href);
        let lazyComponentsUrl = RootUrlService.getServiceUrl() + `/Default.LazyComponents(url=@param)?@param='${url}'`; // &correlationId=${correlationId}

        const headers: { [key:string]: string } = {};
        const referrer = document.referrer;
        if (referrer && referrer.length > 0) {
            headers['SF_URL_REFERER'] = referrer;
        } else {
            headers['SF_NO_URL_REFERER'] = 'true';
        }

        fetch(lazyComponentsUrl, { headers }).then((response) => {
            response.json().then((result: { Components: WidgetModel<any>[] }) => {
                const contract = new RendererContractImpl();
                result.Components.forEach((component) => {
                    contract.renderWidget({
                        model: component,
                        siteId: context.layout?.SiteId as string,
                        dataItem: {
                            key: context.layout?.Id as string,
                            culture: context.culture,
                            provider: ''
                        }
                    }).then((renderResult) => {
                        let element = document.getElementById(component.Id);
                        if (element) {
                            element.parentElement?.insertBefore(renderResult.element, element);
                            if (element.parentNode) {
                                element.parentNode.removeChild(element);
                            }

                            let event = new CustomEvent('widgetLoaded', {
                                detail: {
                                    element: renderResult.element,
                                    model: component
                                }
                            });
                            document.dispatchEvent(event);
                        }
                    });
                });
            });
        });
    }

    return <></>;
}

