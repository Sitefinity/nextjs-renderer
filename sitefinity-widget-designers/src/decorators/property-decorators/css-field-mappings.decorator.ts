
import { keys } from '../../symbols/known-keys';
import { WidgetMetadata } from '../../metadata/widget-metadata';
import { Model } from '../widget-entity.decorator';
import { DataModel, DataType } from './data-type.decorator';
import { PropertyDecoratorBase } from './common/property-decorator-wrapper';

export interface ViewMetaModel {
    [key: string]: { fieldTitle: string, fieldType: string }[]
}

@Model()
export class CssClassMapping {
    @DataType('string')
    FieldName: string | null = null;

    @DataType('string')
    CssClass: string | null = null;
}

export function CssFieldMappings(viewMeta: ViewMetaModel | null = null, showWrapperClasses: boolean = false) {
    const classes: {[key: string]: any} = {
        'ShowWrapperClasses': showWrapperClasses
    };

    if (viewMeta != null) {
        classes['ViewMetaData'] = JSON.stringify(viewMeta);
    }

    return PropertyDecoratorBase((target: any, propName: string) => {
        WidgetMetadata.register(target);
        WidgetMetadata.registerPropertyMetadata(target, propName, keys.cssClasses, classes);
        WidgetMetadata.registerPropertyMetadata(target, propName, keys.type, 'listFieldMappingCss');
        DataModel(CssClassMapping)(target, propName);
    });
}
