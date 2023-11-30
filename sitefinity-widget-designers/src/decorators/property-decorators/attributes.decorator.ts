
import { WidgetMetadata } from '../../metadata/widget-metadata';
import { Model } from '../widget-entity.decorator';
import { Category } from './category.decorator';
import { PropertyDecoratorBase } from './common/property-decorator-wrapper';
import { ContentSection } from './content-section.decorator';
import { DataModel, DataType, KnownFieldTypes } from './data-type.decorator';
import { DefaultValue } from './default-value.decorator';
import { DisplayName } from './display-name.decorator';
import { Readonly } from './validations.decorator';

@Model()
export class KeysValues {
    @Readonly()
    Keys: any = null;

    @Readonly()
    Values: any = null;
}

export function Attributes(widgetName: string): any;
export function Attributes(widgetName: string, witgetTitle: string): any;
export function Attributes(widgetName: string, witgetTitle: string, position : number): any;
export function Attributes(widgetName: string, witgetTitle?: string, position? : number) {
    const LengthDependsOn = {
        'PropertyName': null,
        'DisplayName': '',
        'DisplayTitle': '',
        'ExtraRecords': JSON.stringify([{Name: widgetName, Title: witgetTitle || widgetName}])
    };

    return PropertyDecoratorBase((target: any, propName: string) => {
        WidgetMetadata.register(target);
        Category('Advanced')(target, propName);
        DefaultValue(null)(target, propName);
        DisplayName('Attributes for...')(target, propName);
        ContentSection('Attributes', position)(target, propName);
        DataType(KnownFieldTypes.Attributes)(target, propName);

        WidgetMetadata.registerPropertyMetadata(target, propName, 'LengthDependsOn', LengthDependsOn);
        DataModel(KeysValues)(target, propName);
    });
}
