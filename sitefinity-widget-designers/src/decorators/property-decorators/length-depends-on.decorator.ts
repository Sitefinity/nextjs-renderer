import { keys } from '../../symbols/known-keys';
import { WidgetMetadata } from '../../metadata/widget-metadata';
import { PropertyDecoratorBase } from './common/property-decorator-wrapper';

export class LengthDependsOnSettings {
    ExtraRecords?: string | null = null;
    PropertyName: string | null = null;
    DisplayName: string | null = null;
    DisplayTitle: string | null = null;
}

export function LengthDependsOn(settings: LengthDependsOnSettings): any;
export function LengthDependsOn(propertyName: string | null, displayName: string, displayTitle: string, extraRecords?: string | null): any;
export function LengthDependsOn(config: unknown, displayName?: string, displayTitle?: string, extraRecords: string | null = null) {
    return PropertyDecoratorBase((target: any, propName: string) => {
        let lengthDependsOn: LengthDependsOnSettings | null = null;

        if (typeof(config) === 'object' && config !== null) {
            lengthDependsOn = config as LengthDependsOnSettings;
        } else {
            const propertyName = config as string;
            lengthDependsOn = {
                ExtraRecords: extraRecords,
                PropertyName: propertyName,
                DisplayName: displayName!,
                DisplayTitle: displayTitle!
            };
        }

        WidgetMetadata.registerPropertyMetadata(target, propName, keys.lengthDependsOn, lengthDependsOn);
    });
}
