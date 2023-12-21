import { Choice,DataType, KnownFieldTypes, Model, Offset_Choices } from '@progress/sitefinity-widget-designers-sdk';
import { OffsetSize } from './offset-size';

@Model()
export class OffsetStyle {
    @DataType(KnownFieldTypes.ChipChoice)
    @Choice(Offset_Choices)
    Top: OffsetSize = 'None';

    @DataType(KnownFieldTypes.ChipChoice)
    @Choice(Offset_Choices)
    Bottom: OffsetSize = 'None';

    @DataType(KnownFieldTypes.ChipChoice)
    @Choice(Offset_Choices)
    Left: OffsetSize = 'None';

    @DataType(KnownFieldTypes.ChipChoice)
    @Choice(Offset_Choices)
    Right: OffsetSize = 'None';
}
