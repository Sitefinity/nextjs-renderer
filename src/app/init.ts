import { RootUrlService } from 'sitefinity-react-framework/sdk/root-url.service';
import { ServiceMetadata } from 'sitefinity-react-framework/sdk/service-metadata';
import { RenderWidgetService } from 'sitefinity-react-framework/services/render-widget-service';
import { widgetRegistry } from '@/widget-registry';
import { WidgetExecutionError } from '@/components/error/widget-execution-error-component';

export async function initStaticParams() {
    RootUrlService.rootUrl = `${process.env['PROXY_URL'] || process.env['NEXT_CMS_URL']}`;
    await ServiceMetadata.fetch();

    RenderWidgetService.widgetRegistry = widgetRegistry;
    RenderWidgetService.errorComponentType = WidgetExecutionError;
}
