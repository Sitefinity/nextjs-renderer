import { Choices, DataType, KnownFieldTypes, Model, Offset_Choices } from 'sitefinity-widget-designers/decorators';
import { OffsetSize } from './offset-size';

@Model()
export class OffsetStyle {
    @DataType(KnownFieldTypes.ChipChoice)
    @Choices({
        Choices: Offset_Choices
    })
    Top: OffsetSize = 'None';

    @DataType(KnownFieldTypes.ChipChoice)
    @Choices({
        Choices: Offset_Choices
    })
    Bottom: OffsetSize = 'None';

    @DataType(KnownFieldTypes.ChipChoice)
    @Choices({
        Choices: Offset_Choices
    })
    Left: OffsetSize = 'None';

    @DataType(KnownFieldTypes.ChipChoice)
    @Choices({
        Choices: Offset_Choices
    })
    Right: OffsetSize = 'None';
}
