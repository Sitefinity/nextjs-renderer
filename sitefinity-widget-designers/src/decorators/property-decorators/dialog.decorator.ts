import { keys } from '../../symbols/known-keys';
import { WidgetMetadata } from '../../metadata/widget-metadata';
import { PropertyDecoratorBase } from './common/property-decorator-wrapper';

export interface ButtonMetadata {
    type: string;
    title: string;
}

export interface DialogMetadata {
    buttons: ButtonMetadata[];
    header: string;
    urlKey: string;
    subTitle: string;
}

/**
 * Defines the property's data for a dialog in the widget designers (i.e. buttons and labels).
 * Should be coupled with {@link DataType} decorator with {@link KnownFieldTypes.PencilButton} value.
 * @param {(string|DialogMetadata)} data The dialog's data.
 */
export function Dialog(data: string | DialogMetadata) {
    return PropertyDecoratorBase((target: any, propName: string) => {
        if (typeof(data) === 'object' && data !== null) {
            data = JSON.stringify(data);
        }

        WidgetMetadata.registerPropertyMetadata(target, propName, keys.dialog, { Data: data });
    });
}
