import { keys } from '../../symbols/known-keys';
import { WidgetMetadata } from '../../metadata/widget-metadata';
import { PropertyDecoratorBase } from './common/property-decorator-wrapper';

/**
 * Defines the property's default fallback value when empty.
 * @param emptyValues The empty value to fallback to.
 */
export function FallbackToDefaultValueWhenEmpty(emptyValues: string = '[\u0022\u0022]') {
    return PropertyDecoratorBase((target: any, propName: string) => {
        WidgetMetadata.registerPropertyMetadata(target, propName, keys.emptyValues, { EmptyValues: emptyValues });
    });
}
