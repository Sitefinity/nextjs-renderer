import { DataType, DisplayName, MaxLength, Model, Placeholder } from '@progress/sitefinity-widget-designers-sdk';

@Model()
export class LabelModel {
    @DataType('string')
    @DisplayName('LABEL')
    @Placeholder('type a label...')
    @MaxLength(30)
    Label: string | null = null;
}
