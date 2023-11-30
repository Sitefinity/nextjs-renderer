import { keys } from '../../symbols/known-keys';
import { WidgetMetadata } from '../../metadata/widget-metadata';

export function Placeholder(text: string) {
    return function (target: any, propName: string) {
        WidgetMetadata.register(target);
        WidgetMetadata.registerPropertyMetadata(target, propName, keys.placeholder, { Text: text });
    };
}
