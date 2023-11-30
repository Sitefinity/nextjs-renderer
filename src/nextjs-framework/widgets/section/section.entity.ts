
import { WidgetEntity, Range, Category, LengthDependsOn, DisplayName, DataType, ContentSection, DataModel, TableView } from '@progress/sitefinity-widget-designers';
import { BackgroundStyle } from '../styling/background-style';
import { CustomCssModel } from '../styling/custom-css-model';
import { OffsetStyle } from '../styling/offset-style';
import { SimpleBackgroundStyle } from '../styling/simple-background-style';
import { LabelModel } from './label-model';

@WidgetEntity('SitefinitySection', 'Section')
export class SectionEntity {
    // Quick edit
    @Range(1, 12, 'Column\u0027s count must be between 1 and 12.')
    @Category('QuickEdit')
    ColumnsCount: number = 1;

    @Category('QuickEdit')
    CssSystemGridSize: number = 12;

    @Category('QuickEdit')
    @DisplayName('Proportions')
    @LengthDependsOn('ColumnsCount', 'Column', 'Column')
    @DataType('enumerable')
    ColumnProportionsInfo: string[] | null = null;

    // Basic
    @ContentSection('Section style', 0)
    @DisplayName('Padding')
    @DataModel(OffsetStyle)
    @TableView('Section')
    SectionPadding: OffsetStyle | null = null;

    @ContentSection('Section style', 1)
    @DisplayName('Margin')
    @DataModel(OffsetStyle)
    @TableView('Section')
    SectionMargin: OffsetStyle | null = null;

    @ContentSection('Section style', 1)
    @DisplayName('Background')
    @DataModel(BackgroundStyle)
    @TableView('Section')
    SectionBackground: BackgroundStyle | null = null;

    // Column style
    @ContentSection('Column style', 0)
    @DisplayName('Padding')
    @LengthDependsOn('ColumnsCount', 'Column', 'Column ')
    @DataModel(OffsetStyle)
    @DataType('dictionary')
    ColumnsPadding: { [key: string]: OffsetStyle } | null = null;

    @ContentSection('Column style', 2)
    @DisplayName('Background')
    @LengthDependsOn('ColumnsCount', 'Column', 'Column ')
    @DataModel(SimpleBackgroundStyle)
    @DataType('dictionary')
    ColumnsBackground: { [key: string]: SimpleBackgroundStyle } | null = null;

    CustomCssClass?: { [key: string]: CustomCssModel };
    Labels?: { [key: string]: LabelModel };
    Attributes?: { [key: string]: Array<{ Key: string, Value: string }> };
}
