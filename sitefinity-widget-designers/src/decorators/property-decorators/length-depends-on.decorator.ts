import { keys } from '../../symbols/known-keys';
import { WidgetMetadata } from '../../metadata/widget-metadata';
import { PropertyDecoratorBase } from './common/property-decorator-wrapper';

export function LengthDependsOn(propertyName: string, displayName: string, displayTitle: string, extraRecords?: string) {
    return PropertyDecoratorBase((target: any, propName: string) => {
        const lengthDependsOn = {
            'ExtraRecords': extraRecords,
            'PropertyName': propertyName,
            'DisplayName': displayName,
            'DisplayTitle': displayTitle
        };

        WidgetMetadata.registerPropertyMetadata(target, propName, keys.lengthDependsOn, lengthDependsOn);
    });
}
