import { RequestContext } from 'sitefinity-react-framework/services/request-context';
import { WidgetModel } from 'sitefinity-react-framework/widgets/widget-model';

export interface AppState {
    requestContext: RequestContext;
    widgets: WidgetModel<any>[];
}
