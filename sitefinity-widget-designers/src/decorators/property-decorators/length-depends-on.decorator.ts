import { keys } from '../../symbols/known-keys';
import { WidgetMetadata } from '../../metadata/widget-metadata';

export function LengthDependsOn(propertyName: string, displayName: string, displayTitle: string, extraRecords?: string) {
    return function (target: any, propName: string) {
        const lengthDependsOn = {
            'ExtraRecords': extraRecords,
            'PropertyName': propertyName,
            'DisplayName': displayName,
            'DisplayTitle': displayTitle
        };

        WidgetMetadata.register(target);
        WidgetMetadata.registerPropertyMetadata(target, propName, keys.lengthDependsOn, lengthDependsOn);
    };
}
