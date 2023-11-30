import { keys } from '../../symbols/known-keys';
import { WidgetMetadata } from '../../metadata/widget-metadata';

export function FallbackToDefaultValueWhenEmpty(emptyValues: string = '[\u0022\u0022]') {
    return function (target: any, propName: string) {
        WidgetMetadata.register(target);
        WidgetMetadata.registerPropertyMetadata(target, propName, keys.emptyValues, emptyValues);
    };
}
