import { CombinedFilter } from 'sitefinity-react-framework/sdk/filters/combined-filter';
import { FilterClause } from 'sitefinity-react-framework/sdk/filters/filter-clause';
import { RelationFilter } from 'sitefinity-react-framework/sdk/filters/relation-filter';
import { ContentListSettings } from 'sitefinity-react-framework/widgets/entities/content-list-settings';
import { MixedContentContext } from 'sitefinity-react-framework/widgets/entities/mixed-content-context';
import { Attributes, Category, Choices, ConditionalVisibility, Content, ContentSection, CssFieldMappings, DataModel, DataType, DefaultValue, Description, DisplayName, FallbackToDefaultValueWhenEmpty, KnownFieldTypes, MaxLength, Model, WidgetEntity } from 'sitefinity-widget-designers/decorators';

@Model()
export class ListFieldMapping {
    @DataType('string')
    FriendlyName: string | null = null;

    @DataType('string')
    Name: string | null = null;
}

const viewMeta = {
    CardsList: [
        { fieldTitle: 'Image', fieldType: 'RelatedImage' },
        { fieldTitle: 'Title', fieldType: 'ShortText' },
        { fieldTitle: 'Text', fieldType: 'Text' }
    ],
    ListWithSummary: [
        { fieldTitle: 'Title', fieldType: 'ShortText'},
        { fieldTitle: 'Text', fieldType: 'Text'},
        { fieldTitle: 'Publication date', fieldType: 'DateTime'}
    ],
    ListWithImage: [
        { fieldTitle: 'Title', fieldType: 'ShortText' },
        { fieldTitle: 'Image', fieldType: 'RelatedImage' },
        { fieldTitle: 'Text', fieldType: 'Text' }
    ]
};

@WidgetEntity('SitefinityContentList', 'Content list')
export class ContentListEntity {
    // Content section
    @Content()
    @ContentSection('Select content to display', 0)
    SelectedItems: MixedContentContext | null = null;

    @DefaultValue('CardsList')
    @DisplayName('List template')
    @DataType('viewSelector')
    @ContentSection('Select content to display', 0)
    @Choices({
        Choices: [
            { Title: 'Cards list', Value: 'CardsList'},
            { Title: 'List with image', Value: 'ListWithImage'},
            { Title: 'List with summary', Value: 'ListWithSummary'}
        ]
    })
    SfViewName: string = '';

    @DisplayName('Field mapping')
    @ContentSection('Select content to display', 0)
    @Description('Specify which fields from the content type you have selected to be displayed in the list.')
    @DataModel(ListFieldMapping)
    ListFieldMapping: Array<ListFieldMapping> = [];

    // List setting section
    @DisplayName('Number of list items')
    @ContentSection('List settings', 1)
    @DataType('listSettings')
    ListSettings!: ContentListSettings;

    @DisplayName('Sort Items')
    @ContentSection('List settings', 1)
    @DataType('dynamicChoicePerItemType')
    @Choices({ ServiceUrl: '/Default.Sorters()?frontend=True' })
    OrderBy: string = 'PublicationDate DESC';

    // Single item settings
    @DisplayName('Open single item in...')
    @ContentSection('Single item settings', 2)
    @DataType(KnownFieldTypes.RadioChoice)
    @Choices({ Choices: [
        { Title: 'Auto-generated page - same layout as the list page',  Value: 'SamePage'},
        { Title: 'Select existing page', Value: 'ExistingPage'}
    ] })
    DetailPageMode: 'SamePage' | 'ExistingPage' = 'SamePage';

    @ContentSection('Single item settings', 2)
    @Content({
        Type: 'Telerik.Sitefinity.Pages.Model.PageNode',
        AllowMultipleItemsSelection: false
    })
    @ConditionalVisibility('{\u0022conditions\u0022:[{\u0022fieldName\u0022:\u0022DetailPageMode\u0022,\u0022operator\u0022:\u0022Equals\u0022,\u0022value\u0022:\u0022ExistingPage\u0022}],\u0022inline\u0022:\u0022true\u0022}')
    DetailPage: MixedContentContext | null = null;

    @DisplayName('Single item template')
    @ContentSection('Single item settings', 2)
    @DataType('viewSelector')
    @Choices({
        Choices: [
            {Title: 'Blog posts', Value: 'BlogPosts'},
            {Title: 'Dynamic', Value: 'Dynamic'},
            {Title: 'Events', Value: 'Events'},
            {Title: 'List items', Value: 'ListItems'},
            {Title: 'News', Value: 'News'}
        ]
    })
    SfDetailViewName: string = 'Details.BlogPosts.Default';

    // Advanced
    @Category('Advanced')
    @Description('Custom labels are displayed in the page editor for your convenience. You can change the generic name with a specific one only for this widget.')
    @MaxLength(30)
    Label: string | null = null;

    @Category('Advanced')
    @DisplayName('Content view display mode')
    @DataType(KnownFieldTypes.Choices)
    @Choices({
        Choices: [
            { Value: 'Automatic'},
            { Value: 'Master'},
            { Value: 'Detail'}
        ]
    })
    @Description('[{\u0022Type\u0022:1,\u0022Chunks\u0022:[{\u0022Value\u0022:\u0022Based on your selection the items will be\u0022,\u0022Presentation\u0022:[]},{\u0022Value\u0022:\u0022displayed as follows:\u0022,\u0022Presentation\u0022:[2]}]},{\u0022Type\u0022:1,\u0022Chunks\u0022:[{\u0022Value\u0022:\u0022Automatic\u0022,\u0022Presentation\u0022:[0]},{\u0022Value\u0022:\u0022- handles detail item urls like\u0022,\u0022Presentation\u0022:[]},{\u0022Value\u0022:\u0022page/2021/01/01/news.\u0022,\u0022Presentation\u0022:[2]}]},{\u0022Type\u0022:1,\u0022Chunks\u0022:[{\u0022Value\u0022:\u0022Master\u0022,\u0022Presentation\u0022:[0]},{\u0022Value\u0022:\u0022 - as a list that does not handle\u0022,\u0022Presentation\u0022:[]},{\u0022Value\u0022:\u0022detail item urls.\u0022,\u0022Presentation\u0022:[2]},{\u0022Value\u0022:\u0022E.g. page/2021/01/01/news will throw 404.\u0022,\u0022Presentation\u0022:[2]}]},{\u0022Type\u0022:1,\u0022Chunks\u0022:[{\u0022Value\u0022:\u0022Detail\u0022,\u0022Presentation\u0022:[0]},{\u0022Value\u0022:\u0022- shows a selected item in detail\u0022,\u0022Presentation\u0022:[]},{\u0022Value\u0022:\u0022mode only.\u0022,\u0022Presentation\u0022:[2]}]}]')
    ContentViewDisplayMode: 'Automatic' | 'Master' | 'Detail' = 'Automatic';


    @Category('Advanced')
    @DisplayName('Selection group logical operator')
    @DataType(KnownFieldTypes.RadioChoice)
    @Description('Controls the logic of the filters - whether all conditions should be true (AND) or whether one of the conditions should be true (OR).')
    @Choices({
        Choices: [
            { Value: 'AND'},
            { Value: 'OR'}
        ]
    })
    SelectionGroupLogicalOperator: 'AND' | 'OR' = 'AND';

    @Category('Advanced')
    @DisplayName('Filter expression')
    @DataType('string')
    @Description('Custom filter expression added to already selected filters.')
    FilterExpression: CombinedFilter | FilterClause | RelationFilter | null = null;

    @Category('Advanced')
    @DisplayName('Sort expression')
    @Description('Custom sort expression, used if default sorting is not suitable.')
    SortExpression: string = 'PublicationDate DESC';

    @Category('Advanced')
    @DisplayName('Select expression')
    @Description('Custom expression for selecting the fields of the content type. By default \u0027*\u0027 (asterisk) selects all. Use \u0027;\u0027 (semicolon) when listing specific fields. Example: Id; Title; Thumbnail(Id, Title)')
    SelectExpression: string = '*';

    @Category('Advanced')
    @DisplayName('Disable canonical URL meta tag')
    @Description('Disables the canonocal URL generation on widget level.')
    DisableCanonicalUrlMetaTag: boolean = false;

    @Category('Advanced')
    @DisplayName('Paging mode')
    @DataType(KnownFieldTypes.RadioChoice)
    @Description('Controls whether the paging works with URL segments or a query parameter.')
    @Choices({ Choices: [
        { Value: 'URLSegments', Title: 'URL Segments'},
        { Value: 'QueryParameter', Title: 'Query parameter'}
    ]})
    PagerMode: 'URLSegments' | 'QueryParameter' = 'URLSegments';

    @Category('Advanced')
    @DisplayName('Template for paging URL segments')
    @Description('Template for the URL segments the widget\u0027s paging will work with. Use {{pageNumber}} for the current page number.')
    @FallbackToDefaultValueWhenEmpty()
    @ConditionalVisibility('{\u0022conditions\u0022:[{\u0022fieldName\u0022:\u0022PagerMode\u0022,\u0022operator\u0022:\u0022Equals\u0022,\u0022value\u0022:\u0022URLSegments\u0022}]}')
    PagerTemplate: string = '-page-{{pageNumber}}-';

    @Category('Advanced')
    @DisplayName('Template for paging query parameter')
    @Description('Template for the query parameter the widget\u0027s paging will work with.')
    @FallbackToDefaultValueWhenEmpty()
    @ConditionalVisibility('{\u0022conditions\u0022:[{\u0022fieldName\u0022:\u0022PagerMode\u0022,\u0022operator\u0022:\u0022Equals\u0022,\u0022value\u0022:\u0022QueryParameter\u0022}]}')
    PagerQueryTemplate: string = 'page';

    // Metadata fields
    @Category('Advanced')
    @ContentSection('Metadata fields')
    @DisplayName('SEO enabled')
    SeoEnabled: boolean = true;

    @Category('Advanced')
    @ContentSection('Metadata fields')
    @DisplayName('Meta title')
    @DataType('string')
    MetaTitle: string | null = null;

    @Category('Advanced')
    @ContentSection('Metadata fields')
    @DisplayName('Meta description')
    @DataType('string')
    MetaDescription: string | null = null;

    @Category('Advanced')
    @ContentSection('Metadata fields')
    @DisplayName('Page title mode')
    @Description('[{\u0022Type\u0022: 1,\u0022Chunks\u0022: [{\u0022Value\u0022: \u0022Setting Page title mode\u0022,\u0022Presentation\u0022: [0]},{\u0022Value\u0022: \u0022Replace \u2013 page title is replaced by the\u0022,\u0022Presentation\u0022: [2]},{\u0022Value\u0022: \u0022item\u0027s title.\u0022,\u0022Presentation\u0022: [2]},{\u0022Value\u0022: \u0022Append \u2013 item title is appended to the\u0022,\u0022Presentation\u0022: [2]},{\u0022Value\u0022: \u0022page title.\u0022,\u0022Presentation\u0022: [2]},{\u0022Value\u0022: \u0022Hierarchy \u2013 page title will be built by the\u0022,\u0022Presentation\u0022: [2]},{\u0022Value\u0022: \u0022item\u0027s title and its parent\u0027s title. Value is\u0022,\u0022Presentation\u0022: [2]},{\u0022Value\u0022: \u0022relevant for the Forums widget only.\u0022,\u0022Presentation\u0022: [2]},{\u0022Value\u0022: \u0022Do not set \u2013 page title will not be altered.\u0022,\u0022Presentation\u0022: []}]}]')
    @DataType(KnownFieldTypes.Choices)
    @Choices(
        { Choices: [
            { Value: 'Replace' },
            { Value: 'Append' },
            { Value: 'Hierarchy' },
            { Value: 'DoNotSet', Title: 'Do not set' }
        ]}
    )
    PageTitleMode: 'Replace' | 'Append' | 'Hierarchy' | 'DoNotSet' = 'Replace';

    @Category('Advanced')
    @ContentSection('Metadata fields')
    @DisplayName('OpenGraph enabled')
    OpenGraphEnabled: boolean = true;

    @Category('Advanced')
    @ContentSection('Metadata fields')
    @DisplayName('OpenGraph title')
    @DataType('string')
    OpenGraphTitle: string | null = null;

    @Category('Advanced')
    @ContentSection('Metadata fields')
    @DisplayName('OpenGraph description')
    @DataType('string')
    OpenGraphDescription: string | null = null;

    @Category('Advanced')
    @ContentSection('Metadata fields')
    @DisplayName('OpenGraph image')
    @DataType('string')
    OpenGraphImage: string | null = null;

    @Category('Advanced')
    @ContentSection('Metadata fields')
    @DisplayName('OpenGraph video')
    @DataType('string')
    OpenGraphVideo: string | null = null;

    @Category('Advanced')
    @ContentSection('Metadata fields')
    @DisplayName('OpenGraph type')
    @DataType('string')
    OpenGraphType: string | null = null;

    // Custom CSS classes
    @Category('Advanced')
    @ContentSection('Custom CSS classes', 1)
    @DataType('listFieldMappingCss')
    @CssFieldMappings(viewMeta, true)
    CssClasses: Array<{ FieldName: string; CssClass: string; }> | null = null;

    // Displaying hierarchical content
    @Category('Advanced')
    @ContentSection('Displaying hierarchical content', 2)
    @DisplayName('Show parent list view on child details view')
    @Description('Show or hide the parent list view of this widget when on the same page there is another widget displaying details view of a child item.')
    ShowListViewOnChildDetailsView: boolean = true;

    @Category('Advanced')
    @ContentSection('Displaying hierarchical content', 2)
    @DisplayName('Show parent details view on child details view')
    @Description('Show or hide the parent details view of this widget when on the same page there is another widget displaying details view of a child item.')
    ShowDetailsViewOnChildDetailsView: boolean = false;

    @Category('Advanced')
    @ContentSection('Displaying hierarchical content', 2)
    @DisplayName('Show child list view if no parent selected')
    @Description('Show or hide the child list view of this widget when on the same page there is another widget displaying parent items and no parent item is selected to filter the child\u0027s list.')
    ShowListViewOnEmptyParentFilter: boolean = false;

    @Attributes('ContentList')
    Attributes: { [key: string]: Array<{ Key: string; Value: string; }>; } | null = null;
}
