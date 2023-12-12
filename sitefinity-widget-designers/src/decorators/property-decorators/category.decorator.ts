import { keys } from '../../symbols/known-keys';
import { WidgetMetadata } from '../../metadata/widget-metadata';
import { PropertyDecoratorBase } from './common/property-decorator-wrapper';

export enum PropertyCategory {
    Basic = 'Basic',
    Advanced = 'Advanced',
    QuickEdit = 'QuickEdit'
}

export function Category(categoryName: 'Basic' | 'Advanced' | 'QuickEdit' | PropertyCategory) {
    return PropertyDecoratorBase((target: any, propName: string) => {
        WidgetMetadata.registerPropertyMetadata(target, propName, keys.categoryName, categoryName);
    });
}
