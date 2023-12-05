import { keys } from '../../symbols/known-keys';
import { WidgetMetadata } from '../../metadata/widget-metadata';
import { PropertyDecoratorBase } from './common/property-decorator-wrapper';

export function Category(categoryName: 'Basic' | 'Advanced' | 'QuickEdit') {
    return PropertyDecoratorBase((target: any, propName: string) => {
        WidgetMetadata.registerPropertyMetadata(target, propName, keys.categoryName, categoryName);
    });
}
