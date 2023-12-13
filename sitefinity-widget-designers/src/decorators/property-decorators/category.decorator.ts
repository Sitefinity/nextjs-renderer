import { keys } from '../../symbols/known-keys';
import { WidgetMetadata } from '../../metadata/widget-metadata';
import { PropertyDecoratorBase } from './common/property-decorator-wrapper';

/**
 * Provides default categories for properties in the widget designers.
 */
export enum PropertyCategory {
    Basic = 'Basic',
    Advanced = 'Advanced',
    QuickEdit = 'QuickEdit'
}

/**
 * Defines the property category
 * @param {string} categoryName The title of the category
 */
export function Category(categoryName: 'Basic' | 'Advanced' | 'QuickEdit' | PropertyCategory) {
    return PropertyDecoratorBase((target: any, propName: string) => {
        WidgetMetadata.registerPropertyMetadata(target, propName, keys.categoryName, categoryName);
    });
}
