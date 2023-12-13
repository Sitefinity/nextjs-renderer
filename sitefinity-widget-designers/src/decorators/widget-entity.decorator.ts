import { PropertyMergeStrategy, WidgetMetadata } from '../metadata/widget-metadata';
import { keys } from '../symbols/known-keys';
import { getBasicType } from './property-decorators/common/utls';

/**
 * Class decorator
 * Defines the decorated class as a widget entity.
 * Calls internally the {@link Model} decorator on the entity class.
 * @param {string} name The widget's name.
 * @param {string} caption The widget display caption.
 */
export function WidgetEntity(name: string, caption: string) {
    return function(target: any, context?: any) {
        WidgetMetadata.registerPrototype(target);
        WidgetMetadata.registerPrototypeProperty(target, keys.name, name);
        WidgetMetadata.registerPrototypeProperty(target, keys.caption, caption);

        Model()(target);
    };
}

/**
 * Class decorator
 * Defines the widget entity's sections ordering in the designer.
 * @param {string[]} sections The sections titles in the order they need to appear in the designer.
 */
export function SectionsOrder(sections: string[]) {
    return function(target: any, context?: any) {
        WidgetMetadata.registerPrototype(target);
        WidgetMetadata.registerPrototypeProperty(target, keys.sectionsOrder, sections);
    };
}

/**
 * Class decorator
 * Defines the decorated class as a data model.
 * Enumerates the class properties, defines their name, title and default value (if such is set).
 * The class properties are suggested to be defined with a default value to be enumerated properly.
 * Properties that have their default value set as undefined or null will not get their default type and need to have the {@link DataType} decorator set as well.
 */
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
