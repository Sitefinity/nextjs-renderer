import { initStaticParams } from './utils';
import { RenderWidgetService } from '../services/render-widget-service';
import { WidgetModel } from '../editor/widget-framework/widget-model';
import { RequestContext } from '../editor/request-context';

export async function RenderWidget({ searchParams }: { searchParams: { [key: string]: string } }) {
    await initStaticParams();
    try {
        const urlDecoded = decodeURIComponent(searchParams.model);
        const decoded = atob(urlDecoded);
        const widgetModel = JSON.parse(decoded) as WidgetModel<any>;
        const isEdit = searchParams['sfaction'] === 'edit';
        const isPreview = searchParams['sfaction'] === 'preview';
        const isLive = !(isEdit || isPreview);

        const requestContext: RequestContext = {
            detailItem: null,
            searchParams: searchParams,
            isEdit,
            isPreview,
            isLive,
            culture: searchParams['sf_culture']
        };

        return (
          <div id="widgetPlaceholder">
            {RenderWidgetService.createComponent(widgetModel, requestContext)}
          </div>
        );
    } catch (error) {
        throw error;
    }

}
