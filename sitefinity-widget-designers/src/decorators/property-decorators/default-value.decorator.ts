import { keys } from '../../symbols/known-keys';
import { WidgetMetadata } from '../../metadata/widget-metadata';
import { PropertyDecoratorBase } from './common/property-decorator-wrapper';

/**
 * Predefined special default values
 */
export enum BasicValueTypes {
    StringArray = 'System.String[]'
}

/**
 * Defiens the property default value.
 * @param defaultValue The default value.
 */
export function DefaultValue(defaultValue: any) {
    return PropertyDecoratorBase((target: any, propName: string) => {
        WidgetMetadata.registerPropertyMetadata(target, propName, keys.defaultValue, defaultValue);
    });
}
