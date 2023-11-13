import { RootUrlService } from 'sitefinity-react-framework/sdk/root-url.service';
import { ServiceMetadata } from 'sitefinity-react-framework/sdk/service-metadata';
import { RenderWidgetService } from 'sitefinity-react-framework/services/render-widget-service';
import { widgetRegistry } from '@/widget-registry';
import { WidgetExecutionError } from '@/components/error/widget-execution-error-component';

export async function initStaticParams() {
    RootUrlService.rootUrl = `${process.env['NEXT_CMS_URL']}`;
    const cloudKey =  process.env.SF_CLOUD_KEY;

    if (cloudKey) {
       await ServiceMetadata.fetch();
    } else {
        console.warn('[Sitefinity] There is no SF_CLOUD_KEY provided');
    }

    RenderWidgetService.widgetRegistry = widgetRegistry;
    RenderWidgetService.errorComponentType = WidgetExecutionError;
}
