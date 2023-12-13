import { keys } from '../symbols/known-keys';

/**
 * Strategy for the approach on assigning the property metadata.
 */
export enum PropertyMergeStrategy {
    /**
     * Do not assign the passed value if a value is already assigned.
     */
    Skip,

    /**
     * Override any previously assigned value with the passed value.
     */
    Override,

    /**
     * Merge an already existing property value object with the passed value using Object.assign
     */
    Merge,
}

/**
 * Registers metadata on classes and properties.
 */
export class WidgetMetadata {
    /**
     * Registers the base metadata property holder.
     * @param target The decorated class.
     */
    public static registerPrototype (target: any) {
        this.register(target.prototype);
    }

    /**
     * Registers a property value in the metadata of the class on a given key.
     * @param target The decorated class.
     * @param key Propery key.
     * @param value The property value.
     */
    public static registerProperty (target: any, key: string, value: any) {
        target[keys.metadata][key] = value;
    }

    /**
     * Registers a property value in the metadata of the class prototype on a given key.
     * @param target The decorated class.
     * @param key Propery key.
     * @param value The property value.
     */
    public static registerPrototypeProperty (target: any, key: string, value: any) {
        this.registerProperty(target.prototype, key, value);
    }

    /**
     * Register a property value in the metadata of the class based on @param propName, @param key in the property metadata, property.key @param value and an optional override strategy.
     * @param target The decorated class.
     * @param propName The property name.
     * @param key The key of the metadata value.
     * @param value The value.
     * @param override The override strategy for the value:
     *  - skip - if there is already a value assigned
     *  - override - if you wish to force the value even if one is already assigned
     *  - merge - if the value object that is passed needs to be merged with the one that already is assigned
     * Default is to override.
     */
    public static registerPropertyMetadata (target: any, propName: string, key: string, value: any, override: PropertyMergeStrategy = PropertyMergeStrategy.Override) {
        this.register(target);
        this.registerPropertyObject(target, propName);

        if (target[keys.metadata][propName][key] === undefined || override === PropertyMergeStrategy.Override) {
            target[keys.metadata][propName][key] = value;
        }

        if (override === PropertyMergeStrategy.Merge) {
            const currentValue = target[keys.metadata][propName][key];
            target[keys.metadata][propName][key] = Object.assign({}, currentValue, value);
        }
    }

    /**
     * Register a property value in the metadata of the class prototype based on @param propName, @param key in the property metadata, property.key @param value and an optional override strategy.
     * @param target The decorated class.
     * @param propName The property name.
     * @param key The key of the metadata value.
     * @param value The value.
     * @param override The override strategy for the value:
     *  - skip - if there is already a value assigned
     *  - override - if you wish to force the value even if one is already assigned
     *  - merge - if the value object that is passed needs to be merged with the one that already is assigned
     * Default is to override.
     */
    public static registerPrototypePropertyMetadata (target: any, propName: string, key: string, value: any, override: PropertyMergeStrategy = PropertyMergeStrategy.Override) {
        this.registerPropertyMetadata(target.prototype, propName, key, value, override);
    }

    private static register (target: any) {
        if (!Object.hasOwn(target, keys.metadata)) {
            Object.defineProperty(target, keys.metadata, {enumerable: true, writable: true, value: {}});
        }
    }

    private static registerPropertyObject (target: any, key: string) {
        if (!target[keys.metadata][key]) {
            target[keys.metadata][key] = { [keys.name]: key };
        }
    }
}
