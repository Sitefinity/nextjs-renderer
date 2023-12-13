import { keys } from '../../symbols/known-keys';
import { WidgetMetadata } from '../../metadata/widget-metadata';
import { PropertyDecoratorBase } from './common/property-decorator-wrapper';

/**
 * Defines the placeholder for the property in the designer.
 * @param {string} text The placeholder text.
 */
export function Placeholder(text: string) {
    return PropertyDecoratorBase((target: any, propName: string) => {
        WidgetMetadata.registerPropertyMetadata(target, propName, keys.placeholder, { Text: text });
    });
}
