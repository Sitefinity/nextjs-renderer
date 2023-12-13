import { keys } from '../../symbols/known-keys';
import { WidgetMetadata } from '../../metadata/widget-metadata';
import { DataModel, DataType, KnownFieldTypes } from './data-type.decorator';
import { Choices } from './choice.decorator';
import { Model } from '../widget-entity.decorator';
import { PropertyDecoratorBase } from './common/property-decorator-wrapper';

/**
 * Defines the property as a preconfigured margins property.
 * Internally calls {@link DataType} as 'complex', {@link DataModel} with {@link MarginsProperties}, and {@link TableView}.
 * @param widgetName The name of the widget.
 */
export function Margins(widgetName: string) {
    return PropertyDecoratorBase((target: any, propName: string) => {
        const tableView = {
            'ColumnTitle': widgetName,
            'Enabled': true,
            'Reorderable': false,
            'Selectable': false,
            'MultipleSelect': false,
            'AllowEmptyState': false
        };

        WidgetMetadata.registerPropertyMetadata(target, propName, keys.tableView, tableView);

        DataType('complex')(target, propName);
        DataModel(MarginsProperties)(target, propName);
    });
}

/**
 * Predefined margin values.
 */
export type MarginValues = 'None' | 'S' | 'M' | 'L';

/**
 * Predefined margin values choice items.
 */
export const Offset_Choices = [
    { Title: 'None', Name: 'None', Value: 'None' },
    { Title: 'Small', Name: 'S', Value: 'S' },
    { Title: 'Medium', Name: 'M', Value: 'M' },
    { Title: 'Large', Name: 'L', Value: 'L' }
];

/**
 * Represents the default preconfiguration {@link DataModel} for a property, decorated with {@link Margins} decorator.
 */
@Model()
export class MarginsProperties {
    @DataType(KnownFieldTypes.ChipChoice)
    @Choices(Offset_Choices)
    Top: MarginValues = 'None';

    @DataType(KnownFieldTypes.ChipChoice)
    @Choices(Offset_Choices)
    Right: MarginValues = 'None';

    @DataType(KnownFieldTypes.ChipChoice)
    @Choices(Offset_Choices)
    Bottom: MarginValues = 'None';

    @DataType(KnownFieldTypes.ChipChoice)
    @Choices(Offset_Choices)
    Left: MarginValues = 'None';
}
