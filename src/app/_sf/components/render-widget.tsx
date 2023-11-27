

import { RenderWidgetService, RequestContext, WidgetModel } from '@progress/sitefinity-react-framework';
import { initStaticParams } from '../utils';

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
