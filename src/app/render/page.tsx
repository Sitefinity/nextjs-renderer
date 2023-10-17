import { RenderWidgetService } from "sitefinity-react-framework/services/render-widget-service";
import { RequestContext } from "sitefinity-react-framework/services/request-context";
import { WidgetModel } from "sitefinity-react-framework/widgets/widget-model";
import { initStaticParams } from "../init";

export default async function Render({ searchParams }: { searchParams: { [key: string]: string } }) {
    await initStaticParams();

    const decoded = atob(searchParams.model)
    const widgetModel = JSON.parse(decoded) as WidgetModel<any>;

    const requestContext: RequestContext = {
        detailItem: null,
        searchParams: searchParams,
        isEdit: searchParams["sfaction"] === "edit",
        isPreview: searchParams["sfaction"] === "preview",
        culture: searchParams["sf_culture"]
    };

    return (
        <div id="widgetPlaceholder">
            {RenderWidgetService.createComponent(widgetModel, requestContext)}
        </div>
    )
}
