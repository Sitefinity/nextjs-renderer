import { Choices, ConditionalVisibility, DataType, DisplayName, KnownFieldTypes, Model } from 'sitefinity-widget-designers/decorators';
import { BackgroundBase } from './background-base';

@Model()
export class SimpleBackgroundStyle {
    @DisplayName('Type')
    @DataType(KnownFieldTypes.ChipChoice)
    @Choices({
        Choices: [
            { Value: 'None' },
            { Value: 'Color' }
        ]
    })
    BackgroundType: BackgroundBase = 'None';

    @DisplayName('Value')
    @DataType(KnownFieldTypes.Color)
    @ConditionalVisibility(
        {conditions:[{ fieldName:'BackgroundType', operator:'Equals', value:'Color' }]}
    )
    Color: string = '#DCECF5';
}
