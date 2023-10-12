import React from "react";
import { RequestContext } from "./request-context";
import { WidgetContext } from "../widgets/widget-context";
import { WidgetModel } from "../widgets/widget-model";
import { WidgetRegistry } from "../widgets/widget-registry";

export class RenderWidgetService {
    public static widgetRegistry: WidgetRegistry;

    public static createComponent(widgetModel: WidgetModel<any>, requestContext: RequestContext) {
        const registeredType = RenderWidgetService.widgetRegistry.widgets[widgetModel.Name];

        parseProperties(widgetModel, requestContext, this);

        const propsForWidget: WidgetContext<any> = {
            metadata: registeredType,
            model: widgetModel,
            requestContext: requestContext
        };

        const element = React.createElement(registeredType.componentType, { key: widgetModel.Id, ...propsForWidget });
        return element;
    }
}

function parseProperties(widgetModel: WidgetModel<any>, requestContext: RequestContext, renderWidgetService: RenderWidgetService) {
    Object.keys(widgetModel.Properties).forEach((key) => {
        try {
            (widgetModel.Properties as any)[key] = JSON.parse((widgetModel.Properties as any)[key])
        } catch {

        }
    });
}

