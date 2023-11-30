import { keys } from '../../symbols/known-keys';
import { WidgetMetadata } from '../../metadata/widget-metadata';

export function ContentSection(sectionName: string, index?: number) {
    return function (target: any, propName: string) {
        WidgetMetadata.register(target);
        WidgetMetadata.registerPropertyMetadata(target, propName, keys.sectionName, sectionName);
        if (index != null) {
            WidgetMetadata.registerPropertyMetadata(target, propName, keys.position, index);
        }
    };
}
