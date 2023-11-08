import React from 'react';
export class RenderWidgetService {
    static widgetRegistry;
    static errorComponentType;
    static createComponent(widgetModel, requestContext) {
        const registeredType = RenderWidgetService.widgetRegistry.widgets[widgetModel.Name];
        parseProperties(widgetModel, requestContext, this);
        const propsForWidget = {
            metadata: registeredType,
            model: widgetModel,
            requestContext: requestContext
        };
        try {
            const element = React.createElement(registeredType.componentType, { key: widgetModel.Id, ...propsForWidget });
            return element;
        }
        catch (err) {
            if (requestContext.isEdit) {
                const errCast = err;
                const errorProps = {
                    context: propsForWidget,
                    error: errCast.message
                };
                const errorElement = React.createElement(RenderWidgetService.errorComponentType, errorProps);
                return errorElement;
            }
            return null;
        }
    }
}
function parseProperties(widgetModel, requestContext, renderWidgetService) {
    Object.keys(widgetModel.Properties).forEach((key) => {
        try {
            widgetModel.Properties[key] = JSON.parse(widgetModel.Properties[key]);
        }
        catch {
            // console.log('error')
        }
    });
}
