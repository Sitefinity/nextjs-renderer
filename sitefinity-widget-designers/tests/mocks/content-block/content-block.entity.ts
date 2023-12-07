import { Attributes, Category, Choices, ContentContainer, ContentSection, DataModel, DataType, Description, DisplayName, KnownFieldTypes, MaxLength, Model, Offset_Choices, RegularExpression, TableView, WidgetEntity, WidgetLabel } from '../../../src/decorators/';

export type OffsetSize = 'None' | 'M' | 'L' | 'S';

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

@WidgetEntity('SitefinityContentBlock', 'Content block')
export class ContentBlockEntity {
    @ContentContainer()
    @DataType(KnownFieldTypes.Html)
    Content: string | null = null;

    @DataType('string')
    ProviderName: string | null = null;

    @DataType('uuid')
    SharedContentID: string | null = null;

    //Advanced
    @WidgetLabel()
    SfWidgetLabel: string = 'Content block';

    @Category('Advanced')
    @DisplayName('CSS class')
    @DataType('string')
    WrapperCssClass: string | null = null;

    @Category('Advanced')
    @DisplayName('Tag name')
    @RegularExpression('^[a-zA-Z]{1,20}$', 'Up to twenty characters in the range a-z and A-Z are allowed.')
    TagName: string = 'div';

    @Category('Advanced')
    @ContentSection('Display settings', 1)
    @DisplayName('Padding')
    @DataModel(OffsetStyle)
    @TableView('Content block')
    Paddings: OffsetStyle | null = null;

    @Category('Advanced')
    @ContentSection('Display settings', 2)
    @DisplayName('Margins')
    @DataModel(OffsetStyle)
    @TableView('Content block')
    Margins: OffsetStyle | null = null;

    @Attributes('ContentBlock', 'Content block', 1)
    Attributes: { [key: string]: Array<{ Key: string; Value: string; }>; } | null = null;
}
