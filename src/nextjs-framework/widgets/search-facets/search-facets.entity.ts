import { Category, Choices, ComlexType, ConditionalVisibility, ContentSection, ContentSectionTitles, DataModel, DataType, DefaultValue, Description, DisplayName, KeysValues, KnownFieldTypes, LengthDependsOn, Margins, Placeholder, PropertyCategory, Required, TableView, ViewSelector, WidgetEntity, WidgetLabel } from '@progress/sitefinity-widget-designers';
import { OffsetStyle } from '../styling/offset-style';
import { FacetField } from './interfaces/FacetField';

@WidgetEntity('SitefinityFacets', 'Search facets')
export class SearchFacetsEntity {
    @ContentSection('Search facets setup', 0)
    @DisplayName('Search index')
    @Placeholder('Select search index')
    @Required('Select search index')
    @DataType(KnownFieldTypes.Choices)
    @Choices({
        ServiceUrl: 'Default.GetFacetableIndexes',
        ServiceWarningMessage: 'No search index with facetable fields has been created yet. To manage search indexes, go to Administration > Search indexes, or contact your administrator for assistance.'
    })
    @Description('[{"Type":1,"Chunks":[{"Value":"To display facetable fields on your site,","Presentation":[]},{"Value":"select the same search index as the one","Presentation":[]},{"Value":"selected in the Search box widget.","Presentation":[]}]}]')
    IndexCatalogue: string | null = null;

    @ContentSection('Search facets setup', 0)
    @TableView({Reorderable: true, Selectable: false, MultipleSelect: false})
    @DisplayName('Set facetable fields')
    @ConditionalVisibility('{"conditions":[{"fieldName":"IndexCatalogue","operator":"NotEquals","value":null }]}')
    @DataModel(FacetField)
    @DataType(ComlexType.Enumerable)
    @DefaultValue(null)
    SelectedFacets: FacetField[] = [];

    @ContentSection('Search facets setup', 0)
    @DisplayName('Sort fields')
    @DataType(KnownFieldTypes.Choices)
    @ConditionalVisibility('{"conditions":[{"fieldName":"IndexCatalogue","operator":"NotEquals","value":null }]}')
    @Choices({Choices:[{'Title':'As set manually','Name':'0','Value':0,'Icon':'ban'},{'Title':'Alphabetically','Name':'2','Value':2,'Icon':null}]})
    @DefaultValue(null)
    SortType?: string;

    @ContentSection('Search facets setup', 1)
    @DisplayName('Display item count')
    @DataType(KnownFieldTypes.ChipChoice)
    @Choices({Choices: [{'Title':'Yes','Name':'Yes','Value':'True','Icon':null},{'Title':'No','Name':'No','Value':'False','Icon':null}]})
    @ConditionalVisibility('{"conditions":[{"fieldName":"IndexCatalogue","operator":"NotEquals","value":null }]}')
    DisplayItemCount: boolean = true;

    @ContentSection('Search facets setup', 1)
    @DisplayName('Collapse large facet lists')
    @DataType( KnownFieldTypes.ChipChoice)
    @Choices({Choices: [{'Title':'Yes','Name':'Yes','Value':'True','Icon':null},{'Title':'No','Name':'No','Value':'False','Icon':null}]})
    @ConditionalVisibility('{"conditions":[{"fieldName":"IndexCatalogue","operator":"NotEquals","value":null }]}')
    @Description('[{"Type":1,"Chunks":[{"Value":"Specifies whether to collapse facet lists on","Presentation":[]}, {"Value":"your site with more than 10 entries. If \'No\'","Presentation":[2]}, {"Value":"is selected, all facets are displayed.","Presentation":[2]}]}]')
    IsShowMoreLessButtonActive: boolean = true;

    @ContentSection(ContentSectionTitles.DisplaySettings, 0)
    @ViewSelector([{Title:'Default', Name: 'Default',Value: 'Default',Icon: null}])
    @DisplayName('Template')
    SfViewName: string = 'Default';

    @ContentSection(ContentSectionTitles.DisplaySettings, 1)
    @Margins('Search facets')
    Margins?: OffsetStyle | null = null;

    @WidgetLabel()
    SfWidgetLabel: string = 'Search facets';

    @Category(PropertyCategory.Advanced)
    @DisplayName('CSS class')
    @DataType('string')
    WidgetCssClass: string | null = null;

    @Category(PropertyCategory.Advanced)
    @DisplayName('Search fields')
    @Description('[{"Type":1,"Chunks":[{"Value":"List of fields to be used in the search facets. These fields must be the same as those specified in the Search results widget.","Presentation":[]}]}]')
    @DataType('string')
    SearchFields?: string | null = null;

    @Category(PropertyCategory.Advanced)
    @ContentSection('Labels and messages', 0)
    @DisplayName('Search facets header')
    FilterResultsLabel?: string = 'Filter results';

    @Category(PropertyCategory.Advanced)
    @ContentSection('Labels and messages', 1)
    @DisplayName('Search facets label')
    AppliedFiltersLabel?: string = 'Applied filters';

    @Category(PropertyCategory.Advanced)
    @ContentSection('Labels and messages', 2)
    @DisplayName('Clear facets link')
    ClearAllLabel?: string = 'Clear all';

    @Category(PropertyCategory.Advanced)
    @ContentSection('Labels and messages', 3)
    @DisplayName('Show more link')
    ShowMoreLabel?: string = 'Show more';

    @Category(PropertyCategory.Advanced)
    @ContentSection('Labels and messages', 4)
    @DisplayName('Show less link')
    ShowLessLabel?: string = 'Show less';

    @Category(PropertyCategory.Advanced)
    @ContentSection(ContentSectionTitles.Attributes, 0)
    @DisplayName('Data attributes for...')
    @LengthDependsOn(null, '', '', '[{"Name": "SearchFacets", "Title": "Search facets"}]')
    @DataType(KnownFieldTypes.Attributes)
    @DataModel(KeysValues)
    Attributes: { [key: string]: Array<{ Key: string, Value: string}> } | null = null;
}
