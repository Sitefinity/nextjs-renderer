import { keys } from '../../symbols/known-keys';
import { WidgetMetadata } from '../../metadata/widget-metadata';
import { PropertyDecoratorBase } from './common/property-decorator-wrapper';

/**
 * Defines whether the property or its content should be hidden in the designer.
 * @param {boolean} hide Sets whether the field should be hidden in the designer.
 * @param {boolean} hideContent Sets whether or not the field's content should be hidden.
 */
export function DisplaySettings(hide: boolean, hideContent: boolean = false) {
    const data: { [key: string]: boolean } = {
        'Hide': hide,
        'HideContent': hideContent
    };

    return PropertyDecoratorBase((target: any, propName: string) => {
        WidgetMetadata.registerPropertyMetadata(target, propName, keys.displaySettings, data);
    });
}
