import { RequestContext } from '../editor/request-context';
import { WidgetModel } from '../editor/widget-framework/widget-model';

export interface AppState {
    requestContext: RequestContext;
    widgets: WidgetModel<any>[];
}
