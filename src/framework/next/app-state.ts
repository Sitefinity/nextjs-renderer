import { RequestContext } from '../editor/services/request-context';
import { WidgetModel } from '../editor/widgets/widget-model';

export interface AppState {
    requestContext: RequestContext;
    widgets: WidgetModel<any>[];
}
