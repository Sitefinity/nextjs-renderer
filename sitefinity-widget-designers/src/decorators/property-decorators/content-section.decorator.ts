import { keys } from '../../symbols/known-keys';
import { WidgetMetadata } from '../../metadata/widget-metadata';
import { PropertyDecoratorBase } from './common/property-decorator-wrapper';

/**
 * Defines the property's content section.
 * @param {string} sectionName the section name
 * @param {number} index index of the property in the section
 */
export function ContentSection(sectionName: string, index?: number) {
    return PropertyDecoratorBase((target: any, propName: string) => {
        WidgetMetadata.registerPropertyMetadata(target, propName, keys.sectionName, sectionName);
        if (index != null) {
            WidgetMetadata.registerPropertyMetadata(target, propName, keys.position, index);
        }
    });
}
