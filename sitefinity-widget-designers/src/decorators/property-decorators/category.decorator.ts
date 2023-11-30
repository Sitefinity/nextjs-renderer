import { keys } from '../../symbols/known-keys';
import { WidgetMetadata } from '../../metadata/widget-metadata';

export function Category(categoryName: 'Basic' | 'Advanced' | 'QuickEdit') {
    return function (target: any, propName: string) {
        WidgetMetadata.register(target);
        WidgetMetadata.registerPropertyMetadata(target, propName, keys.categoryName, categoryName);
    };
}
