import { keys } from '../../symbols/known-keys';
import { WidgetMetadata } from '../../metadata/widget-metadata';
import { DataModel, DataType, KnownFieldTypes } from './data-type.decorator';
import { Choices } from './choice.decorator';
import { Model } from '../widget-entity.decorator';

export function Margins() {
    return function (target: any, propName: string) {

        const tableView = {
            'ColumnTitle': 'Classification',
            'Enabled': true,
            'Reordarable': false,
            'Selectable': false,
            'MultipleSelect': false,
            'AllowEmptyState': false
        };

        WidgetMetadata.register(target);
        WidgetMetadata.registerPropertyMetadata(target, propName, 'TableView', tableView);

        DataModel(MarginsProperties)(target, propName);
    };
}

export type MarginValues = 'None' | 'S' | 'M' | 'L';

export const Offset_Choices = [
    { Title: 'None', Value: 'None' },
    { Title: 'Small', Value: 'S' },
    { Title: 'Medium', Value: 'M' },
    { Name: 'Large', Value: 'L' }
];

@Model()
export class MarginsProperties {
    @DataType(KnownFieldTypes.ChipChoice)
    @Choices({
        Choices: Offset_Choices
    })
    Top: MarginValues = 'None';

    @DataType(KnownFieldTypes.ChipChoice)
    @Choices({
        Choices: Offset_Choices
    })
    Right: MarginValues = 'None';

    @DataType(KnownFieldTypes.ChipChoice)
    @Choices({
        Choices: Offset_Choices
    })
    Bottom: MarginValues = 'None';

    @DataType(KnownFieldTypes.ChipChoice)
    @Choices({
        Choices: Offset_Choices
    })
    Left: MarginValues = 'None';
}
