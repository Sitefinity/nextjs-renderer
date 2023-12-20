import { Choice,ColorPalette, ConditionalVisibility, DataType, DisplayName, KnownFieldTypes, Model } from '@progress/sitefinity-widget-designers';
import { BackgroundBase } from './background-base';
import { StylingConfig } from './styling-config';

@Model()
export class SimpleBackgroundStyle {
    @DisplayName('Type')
    @DataType(KnownFieldTypes.ChipChoice)
    @Choice([
            { Value: 'None' },
            { Value: 'Color' }
        ])
    BackgroundType: BackgroundBase = 'None';

    @DisplayName('Value')
    @DataType(KnownFieldTypes.Color)
    @ColorPalette('Default', StylingConfig)
    @ConditionalVisibility(
        {conditions:[{ fieldName:'BackgroundType', operator:'Equals', value:'Color' }]}
    )
    Color: string = '#DCECF5';
}
