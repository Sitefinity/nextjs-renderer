import React from 'react';
import { RequestContext } from '../editor/request-context';
import { WidgetContext } from '../editor/widget-framework/widget-context';
import { WidgetModel } from '../editor/widget-framework/widget-model';
import { WidgetRegistry } from '../editor/widget-framework/widget-registry';
import { LazyComponent } from '../widgets/lazy/lazy-component';
import { PropertyModel } from '@progress/sitefinity-widget-designers';

export class RenderWidgetService {
    public static widgetRegistry: WidgetRegistry;
    public static errorComponentType: any;

    public static createComponent(widgetModel: WidgetModel<any>, requestContext: RequestContext) {
        const registeredType = RenderWidgetService.widgetRegistry.widgets[widgetModel.Name];

        parseProperties(widgetModel, registeredType.designerMetadata.PropertyMetadataFlat || []);

        const propsForWidget: WidgetContext<any> = {
            metadata: registeredType,
            model: widgetModel,
            requestContext: requestContext
        };

        try {
            let componentType = registeredType.componentType;
            if (!requestContext.isEdit && widgetModel.Lazy) {
                componentType = LazyComponent;
            }

            const element = React.createElement(componentType, { key: widgetModel.Id, ...propsForWidget });
            return element;
        } catch (err) {
            if (requestContext.isEdit) {
                const errCast = err as Error;
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

function parseProperties(widgetModel: WidgetModel<any>, propertiesMetadata: PropertyModel[]) {
    const defaultValues: {[key: string]: any} = {};
    propertiesMetadata.forEach(property => {
        const value = property.DefaultValue;
        if (value !== undefined) {
            defaultValues[property.Name] = value;
        }
    });

    Object.keys(widgetModel.Properties).forEach((key) => {
        try {
            (widgetModel.Properties as any)[key] = JSON.parse((widgetModel.Properties as any)[key]);
        } catch {
            // console.log('error')
        }
    });

    widgetModel.Properties = Object.assign(defaultValues, widgetModel.Properties);
}

