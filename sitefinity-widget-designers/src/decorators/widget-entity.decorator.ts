import { PropertyMergeStrategy, WidgetMetadata } from '../metadata/widget-metadata';
import { keys } from '../symbols/known-keys';
import { getBasicType } from './property-decorators/common/utls';

export function WidgetEntity(name: string, caption: string) {
    return function(target: any, context?: any) {
        WidgetMetadata.registerPrototype(target);
        WidgetMetadata.registerPrototypeProperty(target, keys.name, name);
        WidgetMetadata.registerPrototypeProperty(target, keys.caption, caption);

        Model()(target);
    };
}

export function SectionsOrder(sections: string[]) {
    return function(target: any, context?: any) {
        WidgetMetadata.registerPrototype(target);
        WidgetMetadata.registerPrototypeProperty(target, keys.sectionsOrder, sections);
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
                type = 'enumerable';
            }

            if (metaDescriptor[p]?.value?.type === 'object') {
                WidgetMetadata.registerPrototypePropertyMetadata(target, p, 'type', type, PropertyMergeStrategy.Override);
            }

            const typeName = getBasicType(type);

            if (typeName) {
                WidgetMetadata.registerPrototypePropertyMetadata(target, p, keys.type, typeName, PropertyMergeStrategy.Skip);
            }

            let defaultValue = value;
            if (typeof(value) === 'boolean') {
                defaultValue = defaultValue ? 'True' : 'False';
            }

            WidgetMetadata.registerPrototypePropertyMetadata(target, p, keys.name, p, PropertyMergeStrategy.Skip);
            WidgetMetadata.registerPrototypePropertyMetadata(target, p, keys.title, p, PropertyMergeStrategy.Skip);
            WidgetMetadata.registerPrototypePropertyMetadata(target, p, keys.defaultValue, defaultValue, PropertyMergeStrategy.Skip);
        });
    };
}
