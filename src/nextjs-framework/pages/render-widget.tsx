import { initRestSdk } from './utils';
import { RenderWidgetService } from '../services/render-widget-service';
import { WidgetModel } from '../editor/widget-framework/widget-model';
import { RequestContext } from '../editor/request-context';
import { RestService } from '../rest-sdk';

export async function RenderWidget({ searchParams }: { searchParams: { [key: string]: string } }) {
    await initRestSdk();
    const urlDecoded = decodeURIComponent(searchParams.model);
    const decoded = atob(urlDecoded);
    const widgetModel = JSON.parse(decoded) as WidgetModel<any>;
    const isEdit = searchParams['sfaction'] === 'edit';
    const isPreview = searchParams['sfaction'] === 'preview';
    const isLive = !(isEdit || isPreview);
    const pageUrl = searchParams['pageUrl'] as string;

    let path = pageUrl;
    let query = '';
    const questionmarkIndex = pageUrl.indexOf('?');
    if (questionmarkIndex > -1) {
        path = pageUrl.substring(0, questionmarkIndex);
        query = pageUrl.substring(questionmarkIndex);
    }

    let params = new URLSearchParams(query);
    const paramsAsObject = Object.fromEntries(params);

    const layout = await RestService.getLayout({
        pagePath: path,
        queryParams: paramsAsObject
    });
    const requestContext: RequestContext = {
        layout: layout,
        searchParams: paramsAsObject,
        isEdit,
        isPreview,
        isLive,
        culture: layout.Culture
    };

    return (
      <div id="widgetPlaceholder">
        {RenderWidgetService.createComponent(widgetModel, requestContext)}
      </div>
    );
}
