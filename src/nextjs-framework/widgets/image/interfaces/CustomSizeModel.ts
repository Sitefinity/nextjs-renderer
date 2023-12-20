import { DataType, Model } from '@progress/sitefinity-widget-designers';

@Model()
export class CustomSizeModel {
    @DataType('number')
    Width?: number;

    @DataType('number')
    Height?: number;

    @DataType('number')
    OriginalWidth?: number;

    @DataType('number')
    OriginalHeight?: number;

    ConstrainToProportions: boolean = true;
}
