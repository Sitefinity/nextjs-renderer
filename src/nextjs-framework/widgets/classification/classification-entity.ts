import { Attributes, Category, Choices, ContentSection, CssFieldMappings, DataModel, DataType, Description, DisplayName, KnownFieldTypes, Margins, MaxLength, Model, Placeholder, Required, WidgetEntity } from '@progress/sitefinity-widget-designers';
import { OffsetStyle } from '../styling/offset-style';

@Model()
export class ClassificationSettingsInterface {
    @DataType('string')
    selectedTaxonomyId: string | null = null;

    @DataType('string')
    selectedTaxonomyUrl: string | null = null;

    @DataType('string')
    selectedTaxonomyName: string | null = null;

    @DataType('string')
    selectedTaxonomyTitle: string | null = null;

    @Choices({
        Choices: [
            { Value: 'All' },
            { Value: 'TopLevel' },
            { Value: 'UnderParent' },
            { Value: 'Selected' },
            { Value: 'ByContentType' }
        ]
    })
    selectionMode: string = 'All';

    @DataType('enumerable')
    selectedTaxaIds: string []  | null = null;

    @DataType('string')
    byContentType: string | null = null;
  }

@WidgetEntity('SitefinityClassification', 'Classification')
export class ClassificationEntity {
    @ContentSection('Select classification to display', 0)
    @DisplayName('Classification')
    @DataType('taxonSelector')
    @DataModel(ClassificationSettingsInterface)
    @Required('Please select a classification')
    @Placeholder('Select classification')
    ClassificationSettings?: ClassificationSettingsInterface;

    // List settings
    @ContentSection('List settings', 0)
    @Choices({
        ServiceUrl: '{0}/Default.Sorters()?frontend=True',
        ServiceCallParameters: '[{ \u0022taxaUrl\u0022 : \u0022{0}\u0022}]'
    })
    @DisplayName('Sort items')
    OrderBy: string = 'Title ASC';

    @ContentSection('List settings', 1)
    @DisplayName('Display item count')
    @DataType(KnownFieldTypes.ChipChoice)
    @Choices({
        Choices: [
            { Title: 'Yes', Value: true},
            { Title: 'No', Value: false}
        ]
    })
    ShowItemCount: boolean = true;

    @ContentSection('List settings', 2)
    @DisplayName('Display empty tags or categories')
    @DataType(KnownFieldTypes.ChipChoice)
    @Choices({
        Choices: [
            { Title: 'Yes', Value: true},
            { Title: 'No', Value: false}
        ]
    })
    ShowEmpty: boolean = false;

    // Display settings
    @ContentSection('Display settings')
    @DisplayName('Classification template')
    @DataType('viewSelector')
    @Choices({
        Choices: [
            { Value: 'Default'}
        ]
    })
    SfViewName: string = 'Default';

    @ContentSection('Display settings', 1)
    @Margins()
    Margins?: OffsetStyle;

    // Advanced
    @Category('Advanced')
    @DataType('string')
    @DisplayName('Label')
    @Description('Custom labels are displayed in the page editor for your convenience. You can change the generic name with a specific one only for this widget.')
    @MaxLength(30)
    SfWidgetLabel: string | null = null;

    @Category('Advanced')
    @CssFieldMappings()
    CssClass?: string;

    @Category('Advanced')
    @DisplayName('Sort expression')
    @DataType('string')
    @Description('Custom sort expression, used if default sorting options are not suitable.')
    SortExpression: string | null = null;

    @Attributes('Classification')
    Attributes?: any[];
}
