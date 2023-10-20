
import { BackgroundStyle } from '../styling/background-style';
import { CustomCssModel } from '../styling/custom-css-model';
import { OffsetStyle } from '../styling/offset-style';
import { SimpleBackgroundStyle } from '../styling/simple-background-style';
import { LabelModel } from './label-model';

export interface SectionEntity {
    ColumnsCount: number,
    CssSystemGridSize: number,
    ColumnProportionsInfo: string[],
    SectionPadding: OffsetStyle,
    SectionMargin: OffsetStyle,
    SectionBackground: BackgroundStyle,
    ColumnsPadding: { [key: string]: OffsetStyle },
    ColumnsBackground: { [key: string]: SimpleBackgroundStyle },
    CustomCssClass: { [key: string]: CustomCssModel },
    Labels: { [key: string]: LabelModel };
    Attributes: { [key: string]: Array<{ Key: string, Value: string }> };
}
