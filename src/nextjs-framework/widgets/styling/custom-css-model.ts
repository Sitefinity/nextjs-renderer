import { DataType, DisplayName, Model, Placeholder } from '@progress/sitefinity-widget-designers-sdk';

@Model()
export class CustomCssModel {
    @DataType('string')
    @DisplayName('CLASS')
    @Placeholder('type CSS class...')
    Class: string | null = null;
}
