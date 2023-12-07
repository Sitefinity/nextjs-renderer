
import { WidgetMetadata } from '../../metadata/widget-metadata';
import { Model } from '../widget-entity.decorator';
import { Category } from './category.decorator';
import { PropertyDecoratorBase } from './common/property-decorator-wrapper';
import { ContentSection } from './content-section.decorator';
import { DataModel, DataType, KnownFieldTypes } from './data-type.decorator';
import { DefaultValue } from './default-value.decorator';
import { DisplayName } from './display-name.decorator';
import { LengthDependsOn, LengthDependsOnSettings } from './length-depends-on.decorator';
import { Readonly } from './validations.decorator';

@Model()
export class KeysValues {
    @Readonly()
    Keys: any = null;

    @Readonly()
    Values: any = null;
}

export function Attributes(widgetName: string): any;
export function Attributes(lengthDependsOn: LengthDependsOnSettings): any;
export function Attributes(widgetName: string, witgetTitle: string): any;
export function Attributes(widgetName: string, witgetTitle: string, position : number): any;
export function Attributes(titleOrConfig: unknown, witgetTitle?: string, position? : number) {
    return PropertyDecoratorBase((target: any, propName: string) => {
        Category('Advanced')(target, propName);
        DefaultValue(null)(target, propName);
        DisplayName('Attributes for...')(target, propName);
        ContentSection('Attributes', position)(target, propName);
        DataType(KnownFieldTypes.Attributes)(target, propName);

        if (typeof(titleOrConfig) === 'object') {
            LengthDependsOn(titleOrConfig as LengthDependsOnSettings)(target, propName);
        } else {
            const LengthDependsOn = {
                'PropertyName': null,
                'DisplayName': '',
                'DisplayTitle': '',
                'ExtraRecords': JSON.stringify([{Name: titleOrConfig, Title: witgetTitle || titleOrConfig}])
            };
            WidgetMetadata.registerPropertyMetadata(target, propName, 'LengthDependsOn', LengthDependsOn);
        }

        DataModel(KeysValues)(target, propName);
    });
}
