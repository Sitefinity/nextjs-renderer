import { WidgetMetadata } from '../metadata/widget-metadata';
import { keys } from '../symbols/known-keys';

export function WidgetEntity(name: string, caption: string) {
    return function(target: any, context?: any) {
        WidgetMetadata.registerPrototype(target);
        WidgetMetadata.registerPrototypeProperty(target, keys.name, name);
        WidgetMetadata.registerPrototypeProperty(target, keys.caption, caption);

        Model()(target);
    };
}

export function Model() {
    return function(target: any, context?: any) {
        WidgetMetadata.registerPrototype(target);

        const descriptors = Object.getOwnPropertyDescriptors(target.prototype);
        const metaDescriptor = descriptors[keys.metadata]?.value;

        const instance = new target();
        const propertyDescriptors = Object.getOwnPropertyDescriptors(instance);
        const propKeys = Object.keys(propertyDescriptors);

        propKeys.forEach(p => {
            let type: string = typeof(instance[p]);
            const value = instance[p];
            if (Array.isArray(value)) {
                type = 'array';
            }

            if (metaDescriptor[p]?.value?.type === 'object') {
                WidgetMetadata.registerPrototypePropertyMetadata(target, p, 'type', type, true);
            }

            if (type === 'string' || type === 'number' || type === 'boolean') {
                WidgetMetadata.registerPrototypePropertyMetadata(target, p, keys.type, type, false);
            }

            WidgetMetadata.registerPrototypePropertyMetadata(target, p, keys.name, p, false);
            WidgetMetadata.registerPrototypePropertyMetadata(target, p, keys.title, p, false);
            WidgetMetadata.registerPrototypePropertyMetadata(target, p, keys.defaultValue, value, false);
        });
    };
}
