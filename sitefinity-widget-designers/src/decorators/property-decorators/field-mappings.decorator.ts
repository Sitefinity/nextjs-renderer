import { keys } from '../../symbols/known-keys';
import { WidgetMetadata } from '../../metadata/widget-metadata';
import { Model } from '../widget-entity.decorator';
import { DataModel, DataType } from './data-type.decorator';
import { PropertyDecoratorBase } from './common/property-decorator-wrapper';
import { ViewMetaModel } from './css-field-mappings.decorator';

@Model()
export class FieldMapping {
    @DataType('string')
    FriendlyName: string | null = null;

    @DataType('string')
    Name: string | null = null;
}

export function FieldMappings(viewMeta: ViewMetaModel) {
    const mappings: {[key: string]: any} = {
        'ViewMetaData': JSON.stringify(viewMeta)
    };

    return PropertyDecoratorBase((target: any, propName: string) => {
        WidgetMetadata.register(target);
        WidgetMetadata.registerPropertyMetadata(target, propName, keys.fieldMappings, mappings);
        WidgetMetadata.registerPropertyMetadata(target, propName, keys.type, 'listFieldMapping');
        DataModel(FieldMapping)(target, propName);
    });
}
