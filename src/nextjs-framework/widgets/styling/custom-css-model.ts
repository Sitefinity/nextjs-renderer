import { DataType, DisplayName, Model, Placeholder } from '@progress/sitefinity-widget-designers';

@Model()
export class CustomCssModel {
    @DataType('string')
    @DisplayName('CLASS')
    @Placeholder('type CSS class...')
    Class: string | null = null;
}
