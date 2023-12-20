import { EntityMetadataGenerator } from '@progress/sitefinity-widget-designers';
import { WidgetMetadata } from './widget-metadata';

export interface WidgetRegistry {
    widgets: {
        [key: string]: WidgetMetadata
    }
}

export function initRegistry(widgetRegistry: WidgetRegistry) {
    const widgets = Object.keys(widgetRegistry.widgets);

    widgets.forEach(widgetKey => {
        const widgetRegistration = widgetRegistry.widgets[widgetKey];

        if (widgetRegistration.entity == null && widgetRegistration.designerMetadata == null) {
            throw new Error(`There should be either entity or designer metadata provided for ${widgetKey} widget`);
        }

        if (widgetRegistration.entity) {
            widgetRegistration.designerMetadata = EntityMetadataGenerator.extractMetadata(widgetRegistration.entity);
        }
    });

    return widgetRegistry;
}
