import { keys } from '../../symbols/known-keys';
import { WidgetMetadata } from '../../metadata/widget-metadata';
import { PropertyDecoratorBase } from './common/property-decorator-wrapper';

export function ContentSection(sectionName: string, index?: number) {
    return PropertyDecoratorBase((target: any, propName: string) => {
        WidgetMetadata.register(target);
        WidgetMetadata.registerPropertyMetadata(target, propName, keys.sectionName, sectionName);
        if (index != null) {
            WidgetMetadata.registerPropertyMetadata(target, propName, keys.position, index);
        }
    });
}
