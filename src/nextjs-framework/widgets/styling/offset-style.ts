import { Choices, DataType, KnownFieldTypes, Model, Offset_Choices } from '@progress/sitefinity-widget-designers';
import { OffsetSize } from './offset-size';

@Model()
export class OffsetStyle {
    @DataType(KnownFieldTypes.ChipChoice)
    @Choices(Offset_Choices)
    Top: OffsetSize = 'None';

    @DataType(KnownFieldTypes.ChipChoice)
    @Choices(Offset_Choices)
    Bottom: OffsetSize = 'None';

    @DataType(KnownFieldTypes.ChipChoice)
    @Choices(Offset_Choices)
    Left: OffsetSize = 'None';

    @DataType(KnownFieldTypes.ChipChoice)
    @Choices(Offset_Choices)
    Right: OffsetSize = 'None';
}
