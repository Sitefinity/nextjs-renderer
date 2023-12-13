import { keys } from '../../symbols/known-keys';
import { WidgetMetadata } from '../../metadata/widget-metadata';
import { PropertyDecoratorBase } from './common/property-decorator-wrapper';

/**
 * Defines that the property contains content and can be indexed.
 * @param {boolean} hasContent Sets whether the property holds content
 */
export function ContentContainer(hasContent: boolean = true) {
    return PropertyDecoratorBase((target: any, propName: string) => {
        WidgetMetadata.registerPropertyMetadata(target, propName, keys.contentContainer, { HasContent: hasContent });
    });
}
