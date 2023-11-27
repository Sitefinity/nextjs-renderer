import { RequestContext } from '../../framework/editor/services/request-context';
import { WidgetModel } from '../../framework/editor/widgets/widget-model';

export interface AppState {
    requestContext: RequestContext;
    widgets: WidgetModel<any>[];
}
