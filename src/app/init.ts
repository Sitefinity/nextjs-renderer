import { RootUrlService } from "@/framework/sdk/root-url.service";
import { ServiceMetadata } from "@/framework/sdk/service-metadata";
import { RenderWidgetService } from "@/framework/services/render-widget-service";
import { widgetRegistry } from "@/widget-registry";

export async function initStaticParams() {
    RootUrlService.rootUrl = `${process.env["NEXT_CMS_URL"]}`;
    await ServiceMetadata.fetch();
    RenderWidgetService.widgetRegistry = widgetRegistry;
}
