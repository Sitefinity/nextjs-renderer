import { Attributes, Category, Choice, ConditionalVisibility, Content, ContentSection, DataModel, DataType, DefaultValue, DisplayName, Group, KnownFieldTypes, TableView, WidgetEntity, WidgetLabel } from '@progress/sitefinity-widget-designers';
import { MixedContentContext } from '../../editor/widget-framework/mixed-content-context';
import { OffsetStyle } from '../styling/offset-style';
import { BreadcrumbIncludeOption } from './breadcrumb';

@WidgetEntity('SitefinityBreadcrumb', 'Breadcrumb')
export class BreadcrumbEntity {
    @DisplayName('Include in the breadcrumb...')
    @ContentSection('Breadcrumb setup', 0)
    @DataType(KnownFieldTypes.RadioChoice)
    @DefaultValue(BreadcrumbIncludeOption.CurrentPageFullPath)
    @Choice([
        { Title: 'Full path to the current page',  Value: 'CurrentPageFullPath'},
        { Title: 'Path starting from a specific page...', Value: 'SpecificPagePath'}
    ])
    BreadcrumbIncludeOption?: BreadcrumbIncludeOption;

    @ContentSection('Breadcrumb setup', 0)
    @DisplayName('')
    @Content({
        Type: 'Telerik.Sitefinity.Pages.Model.PageNode',
        AllowMultipleItemsSelection: false
    })
    @ConditionalVisibility('{\u0022conditions\u0022:[{\u0022fieldName\u0022:\u0022BreadcrumbIncludeOption\u0022,\u0022operator\u0022:\u0022Equals\u0022,\u0022value\u0022:\u0022SpecificPagePath\u0022}],\u0022inline\u0022:\u0022true\u0022}')

    SelectedPage?: MixedContentContext;

    @DisplayName('Home page link')
    @DefaultValue(true)
    @DataType(KnownFieldTypes.CheckBox)
    @ContentSection('Breadcrumb setup', 1)
    @Group('Display...')
    AddHomePageLinkAtBeginning?: boolean;

    @DisplayName('Current page in the end of the breadcrumb')
    @DefaultValue(true)
    @DataType(KnownFieldTypes.CheckBox)
    @ContentSection('Breadcrumb setup', 1)
    @Group('Display...')
    AddCurrentPageLinkAtTheEnd?: boolean;

    @DisplayName('Group pages in the breadcrumb')
    @DefaultValue(false)
    @DataType(KnownFieldTypes.CheckBox)
    @ContentSection('Breadcrumb setup', 1)
    @Group('Display...')
    IncludeGroupPages?: boolean;

    @DisplayName('Detail items in the breadcrumb')
    @DefaultValue(false)
    @DataType(KnownFieldTypes.CheckBox)
    @ContentSection('Breadcrumb setup', 1)
    @Group('Display...')
    AllowVirtualNodes?: boolean;

    @ContentSection('Display settings', 2)
    @DisplayName('Margins')
    @DataModel(OffsetStyle)
    @TableView('Breadcrumb')
    Margins?: OffsetStyle;

    // Advanced
    @WidgetLabel()
    @Category('Advanced')
    SfWidgetLabel: string = 'Classification';

    @Category('Advanced')
    @DisplayName('CSS class')
    @DataType('string')
    WrapperCssClass?: string;

    @Attributes('Breadcrumb')
    Attributes?: { [key: string]: Array<{ Key: string, Value: string}> };
}
