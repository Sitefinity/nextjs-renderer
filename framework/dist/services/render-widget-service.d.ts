import React from 'react';
import { RequestContext } from './request-context';
import { WidgetContext } from '../widgets/widget-context';
import { WidgetModel } from '../widgets/widget-model';
import { WidgetRegistry } from '../widgets/widget-registry';
export declare class RenderWidgetService {
    static widgetRegistry: WidgetRegistry;
    static errorComponentType: any;
    static createComponent(widgetModel: WidgetModel<any>, requestContext: RequestContext): React.CElement<{
        model: WidgetModel<any>;
        requestContext: RequestContext;
        metadata: import("../widgets/widget-metadata").WidgetMetadata;
        key: string;
    }, React.Component<{
        model: WidgetModel<any>;
        requestContext: RequestContext;
        metadata: import("../widgets/widget-metadata").WidgetMetadata;
        key: string;
    }, any, any>> | React.FunctionComponentElement<{
        context: WidgetContext<any>;
        error: string;
    }> | null;
}
