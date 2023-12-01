export const CONTENT_LIST_DESIGNER = Object.freeze(
   {
      'Name': 'SitefinityContentList',
      'Caption': 'Content list',
      'PropertyMetadata': [
          {
              'Name': 'Basic',
              'Sections': [
                  {
                      'Name': 'Select content to display',
                      'Title': 'Select content to display',
                      'Properties': [
                          {
                              'Name': 'SelectedItems',
                              'DefaultValue': null,
                              'Title': '',
                              'Type': 'content',
                              'SectionName': 'Select content to display',
                              'CategoryName': null,
                              'Properties': {
                                  'Meta_Content_Type': null,
                                  'Meta_Content_IsFilterable': 'False',
                                  'Meta_Content_AllowMultipleItemsSelection': 'True',
                                  'Meta_Content_OpenMultipleItemsSelection': 'False',
                                  'Meta_Content_LiveData': 'False',
                                  'Meta_Content_Provider': null,
                                  'Meta_Content_DisableInteraction': 'False',
                                  'Meta_Content_ShowSiteSelector': 'False',
                                  'Meta_Content_AllowCreate': 'True',
                                  'Meta_Content_ForceShouldShowAll': 'False'
                              },
                              'TypeChildProperties': [],
                              'Position': 0
                          },
                          {
                              'Name': 'SfViewName',
                              'DefaultValue': 'CardsList',
                              'Title': 'List template',
                              'Type': 'viewSelector',
                              'SectionName': 'Select content to display',
                              'CategoryName': null,
                              'Properties': {
                                  'Meta_Choices': '[{\u0022Title\u0022:\u0022Cards list\u0022,\u0022Name\u0022:\u0022CardsList\u0022,\u0022Value\u0022:\u0022CardsList\u0022,\u0022Icon\u0022:null},{\u0022Title\u0022:\u0022External list\u0022,\u0022Name\u0022:\u0022ExternalList\u0022,\u0022Value\u0022:\u0022ExternalList\u0022,\u0022Icon\u0022:null},{\u0022Title\u0022:\u0022List with image\u0022,\u0022Name\u0022:\u0022ListWithImage\u0022,\u0022Value\u0022:\u0022ListWithImage\u0022,\u0022Icon\u0022:null},{\u0022Title\u0022:\u0022List with summary\u0022,\u0022Name\u0022:\u0022ListWithSummary\u0022,\u0022Value\u0022:\u0022ListWithSummary\u0022,\u0022Icon\u0022:null}]',
                                  'Meta_Choices_AllowMultiple': 'False'
                              },
                              'TypeChildProperties': [],
                              'Position': 1
                          },
                          {
                              'Name': 'ListFieldMapping',
                              'DefaultValue': null,
                              'Title': 'Field mapping',
                              'Type': 'listFieldMapping',
                              'SectionName': 'Select content to display',
                              'CategoryName': null,
                              'Properties': {
                                  'Meta_Description_Description': 'Specify which fields from the content type you have selected to be displayed in the list.',
                                  'Meta_ViewMetaData': '{\r\n  \u0022CardsList\u0022: [\r\n    {\r\n      \u0022fieldTitle\u0022: \u0022Image\u0022,\r\n      \u0022fieldType\u0022: \u0022RelatedImage\u0022\r\n    },\r\n    {\r\n      \u0022fieldTitle\u0022: \u0022Title\u0022,\r\n      \u0022fieldType\u0022: \u0022ShortText\u0022\r\n    },\r\n    {\r\n      \u0022fieldTitle\u0022: \u0022Text\u0022,\r\n      \u0022fieldType\u0022: \u0022Text\u0022\r\n    }\r\n  ],\r\n\r\n  \u0022ListWithSummary\u0022: [\r\n    {\r\n      \u0022fieldTitle\u0022: \u0022Title\u0022,\r\n      \u0022fieldType\u0022: \u0022ShortText\u0022\r\n    },\r\n    {\r\n      \u0022fieldTitle\u0022: \u0022Text\u0022,\r\n      \u0022fieldType\u0022: \u0022Text\u0022\r\n    },\r\n    {\r\n      \u0022fieldTitle\u0022: \u0022Publication date\u0022,\r\n      \u0022fieldType\u0022: \u0022DateTime\u0022\r\n    }\r\n  ],\r\n  \u0022ListWithImage\u0022: [\r\n    {\r\n      \u0022fieldTitle\u0022: \u0022Title\u0022,\r\n      \u0022fieldType\u0022: \u0022ShortText\u0022\r\n    },\r\n    {\r\n      \u0022fieldTitle\u0022: \u0022Image\u0022,\r\n      \u0022fieldType\u0022: \u0022RelatedImage\u0022\r\n    },\r\n    {\r\n      \u0022fieldTitle\u0022: \u0022Text\u0022,\r\n      \u0022fieldType\u0022: \u0022Text\u0022\r\n    }\r\n  ]\r\n}'
                              },
                              'TypeChildProperties': [
                                  {
                                      'Name': 'FriendlyName',
                                      'DefaultValue': null,
                                      'Title': 'FriendlyName',
                                      'Type': 'string',
                                      'SectionName': null,
                                      'CategoryName': null,
                                      'Properties': {},
                                      'TypeChildProperties': [],
                                      'Position': 0
                                  },
                                  {
                                      'Name': 'Name',
                                      'DefaultValue': null,
                                      'Title': 'Name',
                                      'Type': 'string',
                                      'SectionName': null,
                                      'CategoryName': null,
                                      'Properties': {},
                                      'TypeChildProperties': [],
                                      'Position': 0
                                  }
                              ],
                              'Position': 2
                          }
                      ],
                      'CategoryName': 'Basic'
                  },
                  {
                      'Name': 'List settings',
                      'Title': 'List settings',
                      'Properties': [
                          {
                              'Name': 'ListSettings',
                              'DefaultValue': null,
                              'Title': 'Number of list items',
                              'Type': 'listSettings',
                              'SectionName': 'List settings',
                              'CategoryName': null,
                              'Properties': {},
                              'TypeChildProperties': [],
                              'Position': 0
                          },
                          {
                              'Name': 'OrderBy',
                              'DefaultValue': 'PublicationDate DESC',
                              'Title': 'Sort items',
                              'Type': 'dynamicChoicePerItemType',
                              'SectionName': 'List settings',
                              'CategoryName': null,
                              'Properties': {
                                  'Meta_Choice_Choices': null,
                                  'Meta_Choice_ServiceUrl': '/Default.Sorters()?frontend=True',
                                  'Meta_Choice_ServiceCallParameters': null,
                                  'Meta_Choice_ServiceWarningMessage': null,
                                  'Meta_Choice_ShowFriendlyName': 'False',
                                  'Meta_Choice_ActionTitle': null,
                                  'Meta_Choice_ButtonTitle': null,
                                  'Meta_Choice_NotResponsive': 'False',
                                  'Meta_Choice_SideLabel': null
                              },
                              'TypeChildProperties': [],
                              'Position': 1
                          }
                      ],
                      'CategoryName': 'Basic'
                  },
                  {
                      'Name': 'Single item settings',
                      'Title': 'Single item settings',
                      'Properties': [
                          {
                              'Name': 'DetailPageMode',
                              'DefaultValue': 'SamePage',
                              'Title': 'Open single item in...',
                              'Type': 'radioChoices',
                              'SectionName': 'Single item settings',
                              'CategoryName': null,
                              'Properties': {
                                  'Meta_Choices': '[{\u0022Title\u0022:\u0022Auto-generated page - same layout as the list page\u0022,\u0022Name\u0022:\u0022SamePage\u0022,\u0022Value\u0022:\u0022SamePage\u0022,\u0022Icon\u0022:null},{\u0022Title\u0022:\u0022Select existing page\u0022,\u0022Name\u0022:\u0022ExistingPage\u0022,\u0022Value\u0022:\u0022ExistingPage\u0022,\u0022Icon\u0022:null}]',
                                  'Meta_Choices_AllowMultiple': 'False'
                              },
                              'TypeChildProperties': [],
                              'Position': 0
                          },
                          {
                              'Name': 'SfDetailViewName',
                              'DefaultValue': 'Details.BlogPosts.Default',
                              'Title': 'Single item template',
                              'Type': 'viewSelector',
                              'SectionName': 'Single item settings',
                              'CategoryName': null,
                              'Properties': {
                                  'Meta_Choices': '[{\u0022Title\u0022:\u0022Details.Blog posts.Default\u0022,\u0022Name\u0022:\u0022Details.BlogPosts.Default\u0022,\u0022Value\u0022:\u0022Details.BlogPosts.Default\u0022,\u0022Icon\u0022:null},{\u0022Title\u0022:\u0022Details.Dynamic.Default\u0022,\u0022Name\u0022:\u0022Details.Dynamic.Default\u0022,\u0022Value\u0022:\u0022Details.Dynamic.Default\u0022,\u0022Icon\u0022:null},{\u0022Title\u0022:\u0022Details.Events.Default\u0022,\u0022Name\u0022:\u0022Details.Events.Default\u0022,\u0022Value\u0022:\u0022Details.Events.Default\u0022,\u0022Icon\u0022:null},{\u0022Title\u0022:\u0022Details.List items.Default\u0022,\u0022Name\u0022:\u0022Details.ListItems.Default\u0022,\u0022Value\u0022:\u0022Details.ListItems.Default\u0022,\u0022Icon\u0022:null},{\u0022Title\u0022:\u0022Details.News.Default\u0022,\u0022Name\u0022:\u0022Details.News.Default\u0022,\u0022Value\u0022:\u0022Details.News.Default\u0022,\u0022Icon\u0022:null}]',
                                  'Meta_Choices_AllowMultiple': 'False'
                              },
                              'TypeChildProperties': [],
                              'Position': 1
                          },
                          {
                              'Name': 'DetailPage',
                              'DefaultValue': null,
                              'Title': '',
                              'Type': 'content',
                              'SectionName': 'Single item settings',
                              'CategoryName': null,
                              'Properties': {
                                  'Meta_Content_Type': 'Telerik.Sitefinity.Pages.Model.PageNode',
                                  'Meta_Content_IsFilterable': 'False',
                                  'Meta_Content_AllowMultipleItemsSelection': 'False',
                                  'Meta_Content_OpenMultipleItemsSelection': 'False',
                                  'Meta_Content_LiveData': 'False',
                                  'Meta_Content_Provider': null,
                                  'Meta_Content_DisableInteraction': 'False',
                                  'Meta_Content_ShowSiteSelector': 'False',
                                  'Meta_Content_AllowCreate': 'True',
                                  'Meta_Content_ForceShouldShowAll': 'False',
                                  'Meta_ConditionalVisibility_Condition': '{\u0022conditions\u0022:[{\u0022fieldName\u0022:\u0022DetailPageMode\u0022,\u0022operator\u0022:\u0022Equals\u0022,\u0022value\u0022:\u0022ExistingPage\u0022}],\u0022inline\u0022:\u0022true\u0022}'
                              },
                              'TypeChildProperties': [],
                              'Position': 1
                          }
                      ],
                      'CategoryName': 'Basic'
                  }
              ]
          },
          {
              'Name': 'Advanced',
              'Sections': [
                  {
                      'Name': 'AdvancedMain',
                      'Title': null,
                      'Properties': [
                          {
                              'Name': 'SfWidgetLabel',
                              'DefaultValue': 'Content list',
                              'Title': 'Label',
                              'Type': null,
                              'SectionName': null,
                              'CategoryName': 'Advanced',
                              'Properties': {
                                  'Meta_Description_Description': 'Custom labels are displayed in the page editor for your convenience. You can change the generic name with a specific one only for this widget.',
                                  'Meta_MaxLength_Length': '30'
                              },
                              'TypeChildProperties': [],
                              'Position': 0
                          },
                          {
                              'Name': 'ContentViewDisplayMode',
                              'DefaultValue': 'Automatic',
                              'Title': 'Content view display mode',
                              'Type': 'choices',
                              'SectionName': '',
                              'CategoryName': 'Advanced',
                              'Properties': {
                                  'Meta_Choices': '[{\u0022Title\u0022:\u0022Automatic\u0022,\u0022Name\u0022:\u0022Automatic\u0022,\u0022Value\u0022:\u0022Automatic\u0022,\u0022Icon\u0022:null},{\u0022Title\u0022:\u0022Master\u0022,\u0022Name\u0022:\u0022Master\u0022,\u0022Value\u0022:\u0022Master\u0022,\u0022Icon\u0022:null},{\u0022Title\u0022:\u0022Detail\u0022,\u0022Name\u0022:\u0022Detail\u0022,\u0022Value\u0022:\u0022Detail\u0022,\u0022Icon\u0022:null}]',
                                  'Meta_Choices_AllowMultiple': 'False',
                                  'Meta_Description_Description': '[{\u0022Type\u0022:1,\u0022Chunks\u0022:[{\u0022Value\u0022:\u0022Based on your selection the items will be\u0022,\u0022Presentation\u0022:[]},{\u0022Value\u0022:\u0022displayed as follows:\u0022,\u0022Presentation\u0022:[2]}]},{\u0022Type\u0022:1,\u0022Chunks\u0022:[{\u0022Value\u0022:\u0022Automatic\u0022,\u0022Presentation\u0022:[0]},{\u0022Value\u0022:\u0022- handles detail item urls like\u0022,\u0022Presentation\u0022:[]},{\u0022Value\u0022:\u0022page/2021/01/01/news.\u0022,\u0022Presentation\u0022:[2]}]},{\u0022Type\u0022:1,\u0022Chunks\u0022:[{\u0022Value\u0022:\u0022Master\u0022,\u0022Presentation\u0022:[0]},{\u0022Value\u0022:\u0022 - as a list that does not handle\u0022,\u0022Presentation\u0022:[]},{\u0022Value\u0022:\u0022detail item urls.\u0022,\u0022Presentation\u0022:[2]},{\u0022Value\u0022:\u0022E.g. page/2021/01/01/news will throw 404.\u0022,\u0022Presentation\u0022:[2]}]},{\u0022Type\u0022:1,\u0022Chunks\u0022:[{\u0022Value\u0022:\u0022Detail\u0022,\u0022Presentation\u0022:[0]},{\u0022Value\u0022:\u0022- shows a selected item in detail\u0022,\u0022Presentation\u0022:[]},{\u0022Value\u0022:\u0022mode only.\u0022,\u0022Presentation\u0022:[2]}]}]'
                              },
                              'TypeChildProperties': [],
                              'Position': 1
                          },
                          {
                              'Name': 'SelectionGroupLogicalOperator',
                              'DefaultValue': 'AND',
                              'Title': 'Selection group logical operator',
                              'Type': 'radioChoices',
                              'SectionName': '',
                              'CategoryName': 'Advanced',
                              'Properties': {
                                  'Meta_Choices': '[{\u0022Title\u0022:\u0022AND\u0022,\u0022Name\u0022:\u0022AND\u0022,\u0022Value\u0022:\u0022AND\u0022,\u0022Icon\u0022:null},{\u0022Title\u0022:\u0022OR\u0022,\u0022Name\u0022:\u0022OR\u0022,\u0022Value\u0022:\u0022OR\u0022,\u0022Icon\u0022:null}]',
                                  'Meta_Choices_AllowMultiple': 'False',
                                  'Meta_Description_Description': 'Controls the logic of the filters - whether all conditions should be true (AND) or whether one of the conditions should be true (OR).'
                              },
                              'TypeChildProperties': [],
                              'Position': 2
                          },
                          {
                              'Name': 'FilterExpression',
                              'DefaultValue': null,
                              'Title': 'Filter expression',
                              'Type': 'string',
                              'SectionName': '',
                              'CategoryName': 'Advanced',
                              'Properties': {
                                  'Meta_Description_Description': 'Custom filter expression added to already selected filters.'
                              },
                              'TypeChildProperties': [],
                              'Position': 3
                          },
                          {
                              'Name': 'SortExpression',
                              'DefaultValue': 'PublicationDate DESC',
                              'Title': 'Sort expression',
                              'Type': 'string',
                              'SectionName': '',
                              'CategoryName': 'Advanced',
                              'Properties': {
                                  'Meta_Description_Description': 'Custom sort expression, used if default sorting is not suitable.'
                              },
                              'TypeChildProperties': [],
                              'Position': 4
                          },
                          {
                              'Name': 'SelectExpression',
                              'DefaultValue': '*',
                              'Title': 'Select expression',
                              'Type': 'string',
                              'SectionName': '',
                              'CategoryName': 'Advanced',
                              'Properties': {
                                  'Meta_Description_Description': 'Custom expression for selecting the fields of the content type. By default \u0027*\u0027 (asterisk) selects all. Use \u0027;\u0027 (semicolon) when listing specific fields. Example: Id; Title; Thumbnail(Id, Title)'
                              },
                              'TypeChildProperties': [],
                              'Position': 5
                          },
                          {
                              'Name': 'DetailItemSelectExpression',
                              'DefaultValue': '*',
                              'Title': 'Detail item select expression',
                              'Type': 'string',
                              'SectionName': '',
                              'CategoryName': 'Advanced',
                              'Properties': {
                                  'Meta_Description_Description': 'Custom expression for selecting the fields of the content type. By default \u0027*\u0027 (asterisk) selects all. Use \u0027;\u0027 (semicolon) when listing specific fields. Example: Id; Title; Thumbnail(Id, Title)'
                              },
                              'TypeChildProperties': [],
                              'Position': 6
                          },
                          {
                              'Name': 'DisableCanonicalUrlMetaTag',
                              'DefaultValue': 'False',
                              'Title': 'Disable canonical URL meta tag',
                              'Type': 'bool',
                              'SectionName': '',
                              'CategoryName': 'Advanced',
                              'Properties': {
                                  'Meta_Description_Description': 'Disables the canonocal URL generation on widget level.'
                              },
                              'TypeChildProperties': [],
                              'Position': 6
                          },
                          {
                              'Name': 'PagerMode',
                              'DefaultValue': 'URLSegments',
                              'Title': 'Paging mode',
                              'Type': 'radioChoices',
                              'SectionName': '',
                              'CategoryName': 'Advanced',
                              'Properties': {
                                  'Meta_Choices': '[{\u0022Title\u0022:\u0022URL segments\u0022,\u0022Name\u0022:\u0022URLSegments\u0022,\u0022Value\u0022:\u0022URLSegments\u0022,\u0022Icon\u0022:null},{\u0022Title\u0022:\u0022Query parameter\u0022,\u0022Name\u0022:\u0022QueryParameter\u0022,\u0022Value\u0022:\u0022QueryParameter\u0022,\u0022Icon\u0022:null}]',
                                  'Meta_Choices_AllowMultiple': 'False',
                                  'Meta_Description_Description': 'Controls whether the paging works with URL segments or a query parameter.'
                              },
                              'TypeChildProperties': [],
                              'Position': 7
                          },
                          {
                              'Name': 'PagerTemplate',
                              'DefaultValue': '-page-{{pageNumber}}-',
                              'Title': 'Template for paging URL segments',
                              'Type': 'string',
                              'SectionName': '',
                              'CategoryName': 'Advanced',
                              'Properties': {
                                  'Meta_EmptyValues_EmptyValues': '[\u0022\u0022]',
                                  'Meta_Description_Description': 'Template for the URL segments the widget\u0027s paging will work with. Use {{pageNumber}} for the current page number.',
                                  'Meta_ConditionalVisibility_Condition': '{\u0022conditions\u0022:[{\u0022fieldName\u0022:\u0022PagerMode\u0022,\u0022operator\u0022:\u0022Equals\u0022,\u0022value\u0022:\u0022URLSegments\u0022}]}'
                              },
                              'TypeChildProperties': [],
                              'Position': 8
                          },
                          {
                              'Name': 'PagerQueryTemplate',
                              'DefaultValue': 'page',
                              'Title': 'Template for paging query parameter',
                              'Type': 'string',
                              'SectionName': '',
                              'CategoryName': 'Advanced',
                              'Properties': {
                                  'Meta_EmptyValues_EmptyValues': '[\u0022\u0022]',
                                  'Meta_Description_Description': 'Template for the query parameter the widget\u0027s paging will work with.',
                                  'Meta_ConditionalVisibility_Condition': '{\u0022conditions\u0022:[{\u0022fieldName\u0022:\u0022PagerMode\u0022,\u0022operator\u0022:\u0022Equals\u0022,\u0022value\u0022:\u0022QueryParameter\u0022}]}'
                              },
                              'TypeChildProperties': [],
                              'Position': 9
                          }
                      ],
                      'CategoryName': 'Advanced'
                  },
                  {
                      'Name': 'Custom CSS classes',
                      'Title': 'Custom CSS classes',
                      'Properties': [
                          {
                              'Name': 'CssClasses',
                              'DefaultValue': null,
                              'Title': '',
                              'Type': 'listFieldMappingCss',
                              'SectionName': 'Custom CSS classes',
                              'CategoryName': 'Advanced',
                              'Properties': {
                                  'Meta_CssFieldMappings_ShowWrapperClasses': 'True',
                                  'Meta_ViewMetaData': '{\r\n  \u0022CardsList\u0022: [\r\n    {\r\n      \u0022fieldTitle\u0022: \u0022Image\u0022,\r\n      \u0022fieldType\u0022: \u0022RelatedImage\u0022\r\n    },\r\n    {\r\n      \u0022fieldTitle\u0022: \u0022Title\u0022,\r\n      \u0022fieldType\u0022: \u0022ShortText\u0022\r\n    },\r\n    {\r\n      \u0022fieldTitle\u0022: \u0022Text\u0022,\r\n      \u0022fieldType\u0022: \u0022Text\u0022\r\n    }\r\n  ],\r\n\r\n  \u0022ListWithSummary\u0022: [\r\n    {\r\n      \u0022fieldTitle\u0022: \u0022Title\u0022,\r\n      \u0022fieldType\u0022: \u0022ShortText\u0022\r\n    },\r\n    {\r\n      \u0022fieldTitle\u0022: \u0022Text\u0022,\r\n      \u0022fieldType\u0022: \u0022Text\u0022\r\n    },\r\n    {\r\n      \u0022fieldTitle\u0022: \u0022Publication date\u0022,\r\n      \u0022fieldType\u0022: \u0022DateTime\u0022\r\n    }\r\n  ],\r\n  \u0022ListWithImage\u0022: [\r\n    {\r\n      \u0022fieldTitle\u0022: \u0022Title\u0022,\r\n      \u0022fieldType\u0022: \u0022ShortText\u0022\r\n    },\r\n    {\r\n      \u0022fieldTitle\u0022: \u0022Image\u0022,\r\n      \u0022fieldType\u0022: \u0022RelatedImage\u0022\r\n    },\r\n    {\r\n      \u0022fieldTitle\u0022: \u0022Text\u0022,\r\n      \u0022fieldType\u0022: \u0022Text\u0022\r\n    }\r\n  ]\r\n}'
                              },
                              'TypeChildProperties': [
                                  {
                                      'Name': 'FieldName',
                                      'DefaultValue': null,
                                      'Title': 'FieldName',
                                      'Type': 'string',
                                      'SectionName': null,
                                      'CategoryName': null,
                                      'Properties': {},
                                      'TypeChildProperties': [],
                                      'Position': 0
                                  },
                                  {
                                      'Name': 'CssClass',
                                      'DefaultValue': null,
                                      'Title': 'CssClass',
                                      'Type': 'string',
                                      'SectionName': null,
                                      'CategoryName': null,
                                      'Properties': {},
                                      'TypeChildProperties': [],
                                      'Position': 0
                                  }
                              ],
                              'Position': 0
                          }
                      ],
                      'CategoryName': 'Advanced'
                  },
                  {
                      'Name': 'Displaying hierarchical content',
                      'Title': 'Displaying hierarchical content',
                      'Properties': [
                          {
                              'Name': 'ShowListViewOnChildDetailsView',
                              'DefaultValue': 'True',
                              'Title': 'Show parent list view on child details view',
                              'Type': 'bool',
                              'SectionName': 'Displaying hierarchical content',
                              'CategoryName': 'Advanced',
                              'Properties': {
                                  'Meta_Description_Description': 'Show or hide the parent list view of this widget when on the same page there is another widget displaying details view of a child item.'
                              },
                              'TypeChildProperties': [],
                              'Position': 2
                          },
                          {
                              'Name': 'ShowDetailsViewOnChildDetailsView',
                              'DefaultValue': 'False',
                              'Title': 'Show parent details view on child details view',
                              'Type': 'bool',
                              'SectionName': 'Displaying hierarchical content',
                              'CategoryName': 'Advanced',
                              'Properties': {
                                  'Meta_Description_Description': 'Show or hide the parent details view of this widget when on the same page there is another widget displaying details view of a child item.'
                              },
                              'TypeChildProperties': [],
                              'Position': 2
                          },
                          {
                              'Name': 'ShowListViewOnEmptyParentFilter',
                              'DefaultValue': 'False',
                              'Title': 'Show child list view if no parent selected',
                              'Type': 'bool',
                              'SectionName': 'Displaying hierarchical content',
                              'CategoryName': 'Advanced',
                              'Properties': {
                                  'Meta_Description_Description': 'Show or hide the child list view of this widget when on the same page there is another widget displaying parent items and no parent item is selected to filter the child\u0027s list.'
                              },
                              'TypeChildProperties': [],
                              'Position': 2
                          }
                      ],
                      'CategoryName': 'Advanced'
                  },
                  {
                      'Name': 'Metadata fields',
                      'Title': 'Metadata fields',
                      'Properties': [
                          {
                              'Name': 'SeoEnabled',
                              'DefaultValue': 'True',
                              'Title': 'SEO enabled',
                              'Type': 'chipchoice',
                              'SectionName': 'Metadata fields',
                              'CategoryName': 'Advanced',
                              'Properties': {
                                  'Meta_Choice_Choices': '[{\u0022Title\u0022:\u0022Yes\u0022,\u0022Name\u0022:\u0022Yes\u0022,\u0022Value\u0022:\u0022True\u0022,\u0022Icon\u0022:null},{\u0022Title\u0022:\u0022No\u0022,\u0022Name\u0022:\u0022No\u0022,\u0022Value\u0022:\u0022False\u0022,\u0022Icon\u0022:null}]',
                                  'Meta_Choice_ServiceUrl': null,
                                  'Meta_Choice_ServiceCallParameters': null,
                                  'Meta_Choice_ServiceWarningMessage': null,
                                  'Meta_Choice_ShowFriendlyName': 'False',
                                  'Meta_Choice_ActionTitle': null,
                                  'Meta_Choice_ButtonTitle': null,
                                  'Meta_Choice_NotResponsive': 'False',
                                  'Meta_Choice_SideLabel': null
                              },
                              'TypeChildProperties': [],
                              'Position': 0
                          },
                          {
                              'Name': 'MetaTitle',
                              'DefaultValue': null,
                              'Title': 'Meta title',
                              'Type': 'string',
                              'SectionName': 'Metadata fields',
                              'CategoryName': 'Advanced',
                              'Properties': {},
                              'TypeChildProperties': [],
                              'Position': 1
                          },
                          {
                              'Name': 'MetaDescription',
                              'DefaultValue': null,
                              'Title': 'Meta description',
                              'Type': 'string',
                              'SectionName': 'Metadata fields',
                              'CategoryName': 'Advanced',
                              'Properties': {},
                              'TypeChildProperties': [],
                              'Position': 2
                          },
                          {
                              'Name': 'PageTitleMode',
                              'DefaultValue': 'Replace',
                              'Title': 'Page title mode',
                              'Type': 'choices',
                              'SectionName': 'Metadata fields',
                              'CategoryName': 'Advanced',
                              'Properties': {
                                  'Meta_Choices': '[{\u0022Title\u0022:\u0022Replace\u0022,\u0022Name\u0022:\u0022Replace\u0022,\u0022Value\u0022:\u0022Replace\u0022,\u0022Icon\u0022:null},{\u0022Title\u0022:\u0022Append\u0022,\u0022Name\u0022:\u0022Append\u0022,\u0022Value\u0022:\u0022Append\u0022,\u0022Icon\u0022:null},{\u0022Title\u0022:\u0022Hierarchy\u0022,\u0022Name\u0022:\u0022Hierarchy\u0022,\u0022Value\u0022:\u0022Hierarchy\u0022,\u0022Icon\u0022:null},{\u0022Title\u0022:\u0022Do not set\u0022,\u0022Name\u0022:\u0022DoNotSet\u0022,\u0022Value\u0022:\u0022DoNotSet\u0022,\u0022Icon\u0022:null}]',
                                  'Meta_Choices_AllowMultiple': 'False',
                                  'Meta_Description_Description': '[{\u0022Type\u0022: 1,\u0022Chunks\u0022: [{\u0022Value\u0022: \u0022Setting Page title mode\u0022,\u0022Presentation\u0022: [0]},{\u0022Value\u0022: \u0022Replace \u2013 page title is replaced by the\u0022,\u0022Presentation\u0022: [2]},{\u0022Value\u0022: \u0022item\u0027s title.\u0022,\u0022Presentation\u0022: [2]},{\u0022Value\u0022: \u0022Append \u2013 item title is appended to the\u0022,\u0022Presentation\u0022: [2]},{\u0022Value\u0022: \u0022page title.\u0022,\u0022Presentation\u0022: [2]},{\u0022Value\u0022: \u0022Hierarchy \u2013 page title will be built by the\u0022,\u0022Presentation\u0022: [2]},{\u0022Value\u0022: \u0022item\u0027s title and its parent\u0027s title. Value is\u0022,\u0022Presentation\u0022: [2]},{\u0022Value\u0022: \u0022relevant for the Forums widget only.\u0022,\u0022Presentation\u0022: [2]},{\u0022Value\u0022: \u0022Do not set \u2013 page title will not be altered.\u0022,\u0022Presentation\u0022: []}]}]'
                              },
                              'TypeChildProperties': [],
                              'Position': 3
                          },
                          {
                              'Name': 'OpenGraphEnabled',
                              'DefaultValue': 'True',
                              'Title': 'OpenGraph enabled',
                              'Type': 'chipchoice',
                              'SectionName': 'Metadata fields',
                              'CategoryName': 'Advanced',
                              'Properties': {
                                  'Meta_Choice_Choices': '[{\u0022Title\u0022:\u0022Yes\u0022,\u0022Name\u0022:\u0022Yes\u0022,\u0022Value\u0022:\u0022True\u0022,\u0022Icon\u0022:null},{\u0022Title\u0022:\u0022No\u0022,\u0022Name\u0022:\u0022No\u0022,\u0022Value\u0022:\u0022False\u0022,\u0022Icon\u0022:null}]',
                                  'Meta_Choice_ServiceUrl': null,
                                  'Meta_Choice_ServiceCallParameters': null,
                                  'Meta_Choice_ServiceWarningMessage': null,
                                  'Meta_Choice_ShowFriendlyName': 'False',
                                  'Meta_Choice_ActionTitle': null,
                                  'Meta_Choice_ButtonTitle': null,
                                  'Meta_Choice_NotResponsive': 'False',
                                  'Meta_Choice_SideLabel': null
                              },
                              'TypeChildProperties': [],
                              'Position': 4
                          },
                          {
                              'Name': 'OpenGraphTitle',
                              'DefaultValue': null,
                              'Title': 'OpenGraph title',
                              'Type': 'string',
                              'SectionName': 'Metadata fields',
                              'CategoryName': 'Advanced',
                              'Properties': {},
                              'TypeChildProperties': [],
                              'Position': 5
                          },
                          {
                              'Name': 'OpenGraphDescription',
                              'DefaultValue': null,
                              'Title': 'OpenGraph description',
                              'Type': 'string',
                              'SectionName': 'Metadata fields',
                              'CategoryName': 'Advanced',
                              'Properties': {},
                              'TypeChildProperties': [],
                              'Position': 6
                          },
                          {
                              'Name': 'OpenGraphImage',
                              'DefaultValue': null,
                              'Title': 'OpenGraph image',
                              'Type': 'string',
                              'SectionName': 'Metadata fields',
                              'CategoryName': 'Advanced',
                              'Properties': {},
                              'TypeChildProperties': [],
                              'Position': 7
                          },
                          {
                              'Name': 'OpenGraphVideo',
                              'DefaultValue': null,
                              'Title': 'OpenGraph video',
                              'Type': 'string',
                              'SectionName': 'Metadata fields',
                              'CategoryName': 'Advanced',
                              'Properties': {},
                              'TypeChildProperties': [],
                              'Position': 8
                          },
                          {
                              'Name': 'OpenGraphType',
                              'DefaultValue': 'article',
                              'Title': 'OpenGraph type',
                              'Type': 'string',
                              'SectionName': 'Metadata fields',
                              'CategoryName': 'Advanced',
                              'Properties': {},
                              'TypeChildProperties': [],
                              'Position': 9
                          }
                      ],
                      'CategoryName': 'Advanced'
                  },
                  {
                      'Name': 'Attributes',
                      'Title': 'Attributes',
                      'Properties': [
                          {
                              'Name': 'Attributes',
                              'DefaultValue': null,
                              'Title': 'Attributes for...',
                              'Type': 'attributes',
                              'SectionName': 'Attributes',
                              'CategoryName': 'Advanced',
                              'Properties': {
                                  'Meta_LengthDependsOn_PropertyName': null,
                                  'Meta_LengthDependsOn_DisplayName': '',
                                  'Meta_LengthDependsOn_DisplayTitle': '',
                                  'Meta_LengthDependsOn_ExtraRecords': '[{\u0022Name\u0022: \u0022ContentList\u0022, \u0022Title\u0022: \u0022Content list\u0022}]'
                              },
                              'TypeChildProperties': [
                                  {
                                      'Name': 'Keys',
                                      'DefaultValue': null,
                                      'Title': 'Keys',
                                      'Type': null,
                                      'SectionName': null,
                                      'CategoryName': null,
                                      'Properties': {
                                          'Validations_Readonly': 'True'
                                      },
                                      'TypeChildProperties': [],
                                      'Position': 0
                                  },
                                  {
                                      'Name': 'Values',
                                      'DefaultValue': null,
                                      'Title': 'Values',
                                      'Type': null,
                                      'SectionName': null,
                                      'CategoryName': null,
                                      'Properties': {
                                          'Validations_Readonly': 'True'
                                      },
                                      'TypeChildProperties': [],
                                      'Position': 0
                                  }
                              ],
                              'Position': 0
                          }
                      ],
                      'CategoryName': 'Advanced'
                  }
              ]
          }
      ],
      'PropertyMetadataFlat': [
          {
              'Name': 'SelectedItems',
              'DefaultValue': null,
              'Title': '',
              'Type': 'content',
              'SectionName': 'Select content to display',
              'CategoryName': null,
              'Properties': {
                  'Meta_Content_Type': null,
                  'Meta_Content_IsFilterable': 'False',
                  'Meta_Content_AllowMultipleItemsSelection': 'True',
                  'Meta_Content_OpenMultipleItemsSelection': 'False',
                  'Meta_Content_LiveData': 'False',
                  'Meta_Content_Provider': null,
                  'Meta_Content_DisableInteraction': 'False',
                  'Meta_Content_ShowSiteSelector': 'False',
                  'Meta_Content_AllowCreate': 'True',
                  'Meta_Content_ForceShouldShowAll': 'False'
              },
              'TypeChildProperties': [],
              'Position': 0
          },
          {
              'Name': 'SfViewName',
              'DefaultValue': 'CardsList',
              'Title': 'List template',
              'Type': 'viewSelector',
              'SectionName': 'Select content to display',
              'CategoryName': null,
              'Properties': {
                  'Meta_Choices': '[{\u0022Title\u0022:\u0022Cards list\u0022,\u0022Name\u0022:\u0022CardsList\u0022,\u0022Value\u0022:\u0022CardsList\u0022,\u0022Icon\u0022:null},{\u0022Title\u0022:\u0022External list\u0022,\u0022Name\u0022:\u0022ExternalList\u0022,\u0022Value\u0022:\u0022ExternalList\u0022,\u0022Icon\u0022:null},{\u0022Title\u0022:\u0022List with image\u0022,\u0022Name\u0022:\u0022ListWithImage\u0022,\u0022Value\u0022:\u0022ListWithImage\u0022,\u0022Icon\u0022:null},{\u0022Title\u0022:\u0022List with summary\u0022,\u0022Name\u0022:\u0022ListWithSummary\u0022,\u0022Value\u0022:\u0022ListWithSummary\u0022,\u0022Icon\u0022:null}]',
                  'Meta_Choices_AllowMultiple': 'False'
              },
              'TypeChildProperties': [],
              'Position': 1
          },
          {
              'Name': 'ListFieldMapping',
              'DefaultValue': null,
              'Title': 'Field mapping',
              'Type': 'listFieldMapping',
              'SectionName': 'Select content to display',
              'CategoryName': null,
              'Properties': {
                  'Meta_Description_Description': 'Specify which fields from the content type you have selected to be displayed in the list.',
                  'Meta_ViewMetaData': '{\r\n  \u0022CardsList\u0022: [\r\n    {\r\n      \u0022fieldTitle\u0022: \u0022Image\u0022,\r\n      \u0022fieldType\u0022: \u0022RelatedImage\u0022\r\n    },\r\n    {\r\n      \u0022fieldTitle\u0022: \u0022Title\u0022,\r\n      \u0022fieldType\u0022: \u0022ShortText\u0022\r\n    },\r\n    {\r\n      \u0022fieldTitle\u0022: \u0022Text\u0022,\r\n      \u0022fieldType\u0022: \u0022Text\u0022\r\n    }\r\n  ],\r\n\r\n  \u0022ListWithSummary\u0022: [\r\n    {\r\n      \u0022fieldTitle\u0022: \u0022Title\u0022,\r\n      \u0022fieldType\u0022: \u0022ShortText\u0022\r\n    },\r\n    {\r\n      \u0022fieldTitle\u0022: \u0022Text\u0022,\r\n      \u0022fieldType\u0022: \u0022Text\u0022\r\n    },\r\n    {\r\n      \u0022fieldTitle\u0022: \u0022Publication date\u0022,\r\n      \u0022fieldType\u0022: \u0022DateTime\u0022\r\n    }\r\n  ],\r\n  \u0022ListWithImage\u0022: [\r\n    {\r\n      \u0022fieldTitle\u0022: \u0022Title\u0022,\r\n      \u0022fieldType\u0022: \u0022ShortText\u0022\r\n    },\r\n    {\r\n      \u0022fieldTitle\u0022: \u0022Image\u0022,\r\n      \u0022fieldType\u0022: \u0022RelatedImage\u0022\r\n    },\r\n    {\r\n      \u0022fieldTitle\u0022: \u0022Text\u0022,\r\n      \u0022fieldType\u0022: \u0022Text\u0022\r\n    }\r\n  ]\r\n}'
              },
              'TypeChildProperties': [
                  {
                      'Name': 'FriendlyName',
                      'DefaultValue': null,
                      'Title': 'FriendlyName',
                      'Type': 'string',
                      'SectionName': null,
                      'CategoryName': null,
                      'Properties': {},
                      'TypeChildProperties': [],
                      'Position': 0
                  },
                  {
                      'Name': 'Name',
                      'DefaultValue': null,
                      'Title': 'Name',
                      'Type': 'string',
                      'SectionName': null,
                      'CategoryName': null,
                      'Properties': {},
                      'TypeChildProperties': [],
                      'Position': 0
                  }
              ],
              'Position': 2
          },
          {
              'Name': 'ListSettings',
              'DefaultValue': null,
              'Title': 'Number of list items',
              'Type': 'listSettings',
              'SectionName': 'List settings',
              'CategoryName': null,
              'Properties': {},
              'TypeChildProperties': [],
              'Position': 0
          },
          {
              'Name': 'OrderBy',
              'DefaultValue': 'PublicationDate DESC',
              'Title': 'Sort items',
              'Type': 'dynamicChoicePerItemType',
              'SectionName': 'List settings',
              'CategoryName': null,
              'Properties': {
                  'Meta_Choice_Choices': null,
                  'Meta_Choice_ServiceUrl': '/Default.Sorters()?frontend=True',
                  'Meta_Choice_ServiceCallParameters': null,
                  'Meta_Choice_ServiceWarningMessage': null,
                  'Meta_Choice_ShowFriendlyName': 'False',
                  'Meta_Choice_ActionTitle': null,
                  'Meta_Choice_ButtonTitle': null,
                  'Meta_Choice_NotResponsive': 'False',
                  'Meta_Choice_SideLabel': null
              },
              'TypeChildProperties': [],
              'Position': 1
          },
          {
              'Name': 'DetailPageMode',
              'DefaultValue': 'SamePage',
              'Title': 'Open single item in...',
              'Type': 'radioChoices',
              'SectionName': 'Single item settings',
              'CategoryName': null,
              'Properties': {
                  'Meta_Choices': '[{\u0022Title\u0022:\u0022Auto-generated page - same layout as the list page\u0022,\u0022Name\u0022:\u0022SamePage\u0022,\u0022Value\u0022:\u0022SamePage\u0022,\u0022Icon\u0022:null},{\u0022Title\u0022:\u0022Select existing page\u0022,\u0022Name\u0022:\u0022ExistingPage\u0022,\u0022Value\u0022:\u0022ExistingPage\u0022,\u0022Icon\u0022:null}]',
                  'Meta_Choices_AllowMultiple': 'False'
              },
              'TypeChildProperties': [],
              'Position': 0
          },
          {
              'Name': 'SfDetailViewName',
              'DefaultValue': 'Details.BlogPosts.Default',
              'Title': 'Single item template',
              'Type': 'viewSelector',
              'SectionName': 'Single item settings',
              'CategoryName': null,
              'Properties': {
                  'Meta_Choices': '[{\u0022Title\u0022:\u0022Details.Blog posts.Default\u0022,\u0022Name\u0022:\u0022Details.BlogPosts.Default\u0022,\u0022Value\u0022:\u0022Details.BlogPosts.Default\u0022,\u0022Icon\u0022:null},{\u0022Title\u0022:\u0022Details.Dynamic.Default\u0022,\u0022Name\u0022:\u0022Details.Dynamic.Default\u0022,\u0022Value\u0022:\u0022Details.Dynamic.Default\u0022,\u0022Icon\u0022:null},{\u0022Title\u0022:\u0022Details.Events.Default\u0022,\u0022Name\u0022:\u0022Details.Events.Default\u0022,\u0022Value\u0022:\u0022Details.Events.Default\u0022,\u0022Icon\u0022:null},{\u0022Title\u0022:\u0022Details.List items.Default\u0022,\u0022Name\u0022:\u0022Details.ListItems.Default\u0022,\u0022Value\u0022:\u0022Details.ListItems.Default\u0022,\u0022Icon\u0022:null},{\u0022Title\u0022:\u0022Details.News.Default\u0022,\u0022Name\u0022:\u0022Details.News.Default\u0022,\u0022Value\u0022:\u0022Details.News.Default\u0022,\u0022Icon\u0022:null}]',
                  'Meta_Choices_AllowMultiple': 'False'
              },
              'TypeChildProperties': [],
              'Position': 1
          },
          {
              'Name': 'DetailPage',
              'DefaultValue': null,
              'Title': '',
              'Type': 'content',
              'SectionName': 'Single item settings',
              'CategoryName': null,
              'Properties': {
                  'Meta_Content_Type': 'Telerik.Sitefinity.Pages.Model.PageNode',
                  'Meta_Content_IsFilterable': 'False',
                  'Meta_Content_AllowMultipleItemsSelection': 'False',
                  'Meta_Content_OpenMultipleItemsSelection': 'False',
                  'Meta_Content_LiveData': 'False',
                  'Meta_Content_Provider': null,
                  'Meta_Content_DisableInteraction': 'False',
                  'Meta_Content_ShowSiteSelector': 'False',
                  'Meta_Content_AllowCreate': 'True',
                  'Meta_Content_ForceShouldShowAll': 'False',
                  'Meta_ConditionalVisibility_Condition': '{\u0022conditions\u0022:[{\u0022fieldName\u0022:\u0022DetailPageMode\u0022,\u0022operator\u0022:\u0022Equals\u0022,\u0022value\u0022:\u0022ExistingPage\u0022}],\u0022inline\u0022:\u0022true\u0022}'
              },
              'TypeChildProperties': [],
              'Position': 1
          },
          {
              'Name': 'SfWidgetLabel',
              'DefaultValue': 'Content list',
              'Title': 'Label',
              'Type': null,
              'SectionName': null,
              'CategoryName': 'Advanced',
              'Properties': {
                  'Meta_Description_Description': 'Custom labels are displayed in the page editor for your convenience. You can change the generic name with a specific one only for this widget.',
                  'Meta_MaxLength_Length': '30'
              },
              'TypeChildProperties': [],
              'Position': 0
          },
          {
              'Name': 'ContentViewDisplayMode',
              'DefaultValue': 'Automatic',
              'Title': 'Content view display mode',
              'Type': 'choices',
              'SectionName': '',
              'CategoryName': 'Advanced',
              'Properties': {
                  'Meta_Choices': '[{\u0022Title\u0022:\u0022Automatic\u0022,\u0022Name\u0022:\u0022Automatic\u0022,\u0022Value\u0022:\u0022Automatic\u0022,\u0022Icon\u0022:null},{\u0022Title\u0022:\u0022Master\u0022,\u0022Name\u0022:\u0022Master\u0022,\u0022Value\u0022:\u0022Master\u0022,\u0022Icon\u0022:null},{\u0022Title\u0022:\u0022Detail\u0022,\u0022Name\u0022:\u0022Detail\u0022,\u0022Value\u0022:\u0022Detail\u0022,\u0022Icon\u0022:null}]',
                  'Meta_Choices_AllowMultiple': 'False',
                  'Meta_Description_Description': '[{\u0022Type\u0022:1,\u0022Chunks\u0022:[{\u0022Value\u0022:\u0022Based on your selection the items will be\u0022,\u0022Presentation\u0022:[]},{\u0022Value\u0022:\u0022displayed as follows:\u0022,\u0022Presentation\u0022:[2]}]},{\u0022Type\u0022:1,\u0022Chunks\u0022:[{\u0022Value\u0022:\u0022Automatic\u0022,\u0022Presentation\u0022:[0]},{\u0022Value\u0022:\u0022- handles detail item urls like\u0022,\u0022Presentation\u0022:[]},{\u0022Value\u0022:\u0022page/2021/01/01/news.\u0022,\u0022Presentation\u0022:[2]}]},{\u0022Type\u0022:1,\u0022Chunks\u0022:[{\u0022Value\u0022:\u0022Master\u0022,\u0022Presentation\u0022:[0]},{\u0022Value\u0022:\u0022 - as a list that does not handle\u0022,\u0022Presentation\u0022:[]},{\u0022Value\u0022:\u0022detail item urls.\u0022,\u0022Presentation\u0022:[2]},{\u0022Value\u0022:\u0022E.g. page/2021/01/01/news will throw 404.\u0022,\u0022Presentation\u0022:[2]}]},{\u0022Type\u0022:1,\u0022Chunks\u0022:[{\u0022Value\u0022:\u0022Detail\u0022,\u0022Presentation\u0022:[0]},{\u0022Value\u0022:\u0022- shows a selected item in detail\u0022,\u0022Presentation\u0022:[]},{\u0022Value\u0022:\u0022mode only.\u0022,\u0022Presentation\u0022:[2]}]}]'
              },
              'TypeChildProperties': [],
              'Position': 1
          },
          {
              'Name': 'SelectionGroupLogicalOperator',
              'DefaultValue': 'AND',
              'Title': 'Selection group logical operator',
              'Type': 'radioChoices',
              'SectionName': '',
              'CategoryName': 'Advanced',
              'Properties': {
                  'Meta_Choices': '[{\u0022Title\u0022:\u0022AND\u0022,\u0022Name\u0022:\u0022AND\u0022,\u0022Value\u0022:\u0022AND\u0022,\u0022Icon\u0022:null},{\u0022Title\u0022:\u0022OR\u0022,\u0022Name\u0022:\u0022OR\u0022,\u0022Value\u0022:\u0022OR\u0022,\u0022Icon\u0022:null}]',
                  'Meta_Choices_AllowMultiple': 'False',
                  'Meta_Description_Description': 'Controls the logic of the filters - whether all conditions should be true (AND) or whether one of the conditions should be true (OR).'
              },
              'TypeChildProperties': [],
              'Position': 2
          },
          {
              'Name': 'FilterExpression',
              'DefaultValue': null,
              'Title': 'Filter expression',
              'Type': 'string',
              'SectionName': '',
              'CategoryName': 'Advanced',
              'Properties': {
                  'Meta_Description_Description': 'Custom filter expression added to already selected filters.'
              },
              'TypeChildProperties': [],
              'Position': 3
          },
          {
              'Name': 'SortExpression',
              'DefaultValue': 'PublicationDate DESC',
              'Title': 'Sort expression',
              'Type': 'string',
              'SectionName': '',
              'CategoryName': 'Advanced',
              'Properties': {
                  'Meta_Description_Description': 'Custom sort expression, used if default sorting is not suitable.'
              },
              'TypeChildProperties': [],
              'Position': 4
          },
          {
              'Name': 'SelectExpression',
              'DefaultValue': '*',
              'Title': 'Select expression',
              'Type': 'string',
              'SectionName': '',
              'CategoryName': 'Advanced',
              'Properties': {
                  'Meta_Description_Description': 'Custom expression for selecting the fields of the content type. By default \u0027*\u0027 (asterisk) selects all. Use \u0027;\u0027 (semicolon) when listing specific fields. Example: Id; Title; Thumbnail(Id, Title)'
              },
              'TypeChildProperties': [],
              'Position': 5
          },
          {
              'Name': 'DetailItemSelectExpression',
              'DefaultValue': '*',
              'Title': 'Detail item select expression',
              'Type': 'string',
              'SectionName': '',
              'CategoryName': 'Advanced',
              'Properties': {
                  'Meta_Description_Description': 'Custom expression for selecting the fields of the content type. By default \u0027*\u0027 (asterisk) selects all. Use \u0027;\u0027 (semicolon) when listing specific fields. Example: Id; Title; Thumbnail(Id, Title)'
              },
              'TypeChildProperties': [],
              'Position': 6
          },
          {
              'Name': 'DisableCanonicalUrlMetaTag',
              'DefaultValue': 'False',
              'Title': 'Disable canonical URL meta tag',
              'Type': 'bool',
              'SectionName': '',
              'CategoryName': 'Advanced',
              'Properties': {
                  'Meta_Description_Description': 'Disables the canonocal URL generation on widget level.'
              },
              'TypeChildProperties': [],
              'Position': 6
          },
          {
              'Name': 'PagerMode',
              'DefaultValue': 'URLSegments',
              'Title': 'Paging mode',
              'Type': 'radioChoices',
              'SectionName': '',
              'CategoryName': 'Advanced',
              'Properties': {
                  'Meta_Choices': '[{\u0022Title\u0022:\u0022URL segments\u0022,\u0022Name\u0022:\u0022URLSegments\u0022,\u0022Value\u0022:\u0022URLSegments\u0022,\u0022Icon\u0022:null},{\u0022Title\u0022:\u0022Query parameter\u0022,\u0022Name\u0022:\u0022QueryParameter\u0022,\u0022Value\u0022:\u0022QueryParameter\u0022,\u0022Icon\u0022:null}]',
                  'Meta_Choices_AllowMultiple': 'False',
                  'Meta_Description_Description': 'Controls whether the paging works with URL segments or a query parameter.'
              },
              'TypeChildProperties': [],
              'Position': 7
          },
          {
              'Name': 'PagerTemplate',
              'DefaultValue': '-page-{{pageNumber}}-',
              'Title': 'Template for paging URL segments',
              'Type': 'string',
              'SectionName': '',
              'CategoryName': 'Advanced',
              'Properties': {
                  'Meta_EmptyValues_EmptyValues': '[\u0022\u0022]',
                  'Meta_Description_Description': 'Template for the URL segments the widget\u0027s paging will work with. Use {{pageNumber}} for the current page number.',
                  'Meta_ConditionalVisibility_Condition': '{\u0022conditions\u0022:[{\u0022fieldName\u0022:\u0022PagerMode\u0022,\u0022operator\u0022:\u0022Equals\u0022,\u0022value\u0022:\u0022URLSegments\u0022}]}'
              },
              'TypeChildProperties': [],
              'Position': 8
          },
          {
              'Name': 'PagerQueryTemplate',
              'DefaultValue': 'page',
              'Title': 'Template for paging query parameter',
              'Type': 'string',
              'SectionName': '',
              'CategoryName': 'Advanced',
              'Properties': {
                  'Meta_EmptyValues_EmptyValues': '[\u0022\u0022]',
                  'Meta_Description_Description': 'Template for the query parameter the widget\u0027s paging will work with.',
                  'Meta_ConditionalVisibility_Condition': '{\u0022conditions\u0022:[{\u0022fieldName\u0022:\u0022PagerMode\u0022,\u0022operator\u0022:\u0022Equals\u0022,\u0022value\u0022:\u0022QueryParameter\u0022}]}'
              },
              'TypeChildProperties': [],
              'Position': 9
          },
          {
              'Name': 'CssClasses',
              'DefaultValue': null,
              'Title': '',
              'Type': 'listFieldMappingCss',
              'SectionName': 'Custom CSS classes',
              'CategoryName': 'Advanced',
              'Properties': {
                  'Meta_CssFieldMappings_ShowWrapperClasses': 'True',
                  'Meta_ViewMetaData': '{\r\n  \u0022CardsList\u0022: [\r\n    {\r\n      \u0022fieldTitle\u0022: \u0022Image\u0022,\r\n      \u0022fieldType\u0022: \u0022RelatedImage\u0022\r\n    },\r\n    {\r\n      \u0022fieldTitle\u0022: \u0022Title\u0022,\r\n      \u0022fieldType\u0022: \u0022ShortText\u0022\r\n    },\r\n    {\r\n      \u0022fieldTitle\u0022: \u0022Text\u0022,\r\n      \u0022fieldType\u0022: \u0022Text\u0022\r\n    }\r\n  ],\r\n\r\n  \u0022ListWithSummary\u0022: [\r\n    {\r\n      \u0022fieldTitle\u0022: \u0022Title\u0022,\r\n      \u0022fieldType\u0022: \u0022ShortText\u0022\r\n    },\r\n    {\r\n      \u0022fieldTitle\u0022: \u0022Text\u0022,\r\n      \u0022fieldType\u0022: \u0022Text\u0022\r\n    },\r\n    {\r\n      \u0022fieldTitle\u0022: \u0022Publication date\u0022,\r\n      \u0022fieldType\u0022: \u0022DateTime\u0022\r\n    }\r\n  ],\r\n  \u0022ListWithImage\u0022: [\r\n    {\r\n      \u0022fieldTitle\u0022: \u0022Title\u0022,\r\n      \u0022fieldType\u0022: \u0022ShortText\u0022\r\n    },\r\n    {\r\n      \u0022fieldTitle\u0022: \u0022Image\u0022,\r\n      \u0022fieldType\u0022: \u0022RelatedImage\u0022\r\n    },\r\n    {\r\n      \u0022fieldTitle\u0022: \u0022Text\u0022,\r\n      \u0022fieldType\u0022: \u0022Text\u0022\r\n    }\r\n  ]\r\n}'
              },
              'TypeChildProperties': [
                  {
                      'Name': 'FieldName',
                      'DefaultValue': null,
                      'Title': 'FieldName',
                      'Type': 'string',
                      'SectionName': null,
                      'CategoryName': null,
                      'Properties': {},
                      'TypeChildProperties': [],
                      'Position': 0
                  },
                  {
                      'Name': 'CssClass',
                      'DefaultValue': null,
                      'Title': 'CssClass',
                      'Type': 'string',
                      'SectionName': null,
                      'CategoryName': null,
                      'Properties': {},
                      'TypeChildProperties': [],
                      'Position': 0
                  }
              ],
              'Position': 0
          },
          {
              'Name': 'ShowListViewOnChildDetailsView',
              'DefaultValue': 'True',
              'Title': 'Show parent list view on child details view',
              'Type': 'bool',
              'SectionName': 'Displaying hierarchical content',
              'CategoryName': 'Advanced',
              'Properties': {
                  'Meta_Description_Description': 'Show or hide the parent list view of this widget when on the same page there is another widget displaying details view of a child item.'
              },
              'TypeChildProperties': [],
              'Position': 2
          },
          {
              'Name': 'ShowDetailsViewOnChildDetailsView',
              'DefaultValue': 'False',
              'Title': 'Show parent details view on child details view',
              'Type': 'bool',
              'SectionName': 'Displaying hierarchical content',
              'CategoryName': 'Advanced',
              'Properties': {
                  'Meta_Description_Description': 'Show or hide the parent details view of this widget when on the same page there is another widget displaying details view of a child item.'
              },
              'TypeChildProperties': [],
              'Position': 2
          },
          {
              'Name': 'ShowListViewOnEmptyParentFilter',
              'DefaultValue': 'False',
              'Title': 'Show child list view if no parent selected',
              'Type': 'bool',
              'SectionName': 'Displaying hierarchical content',
              'CategoryName': 'Advanced',
              'Properties': {
                  'Meta_Description_Description': 'Show or hide the child list view of this widget when on the same page there is another widget displaying parent items and no parent item is selected to filter the child\u0027s list.'
              },
              'TypeChildProperties': [],
              'Position': 2
          },
          {
              'Name': 'SeoEnabled',
              'DefaultValue': 'True',
              'Title': 'SEO enabled',
              'Type': 'chipchoice',
              'SectionName': 'Metadata fields',
              'CategoryName': 'Advanced',
              'Properties': {
                  'Meta_Choice_Choices': '[{\u0022Title\u0022:\u0022Yes\u0022,\u0022Name\u0022:\u0022Yes\u0022,\u0022Value\u0022:\u0022True\u0022,\u0022Icon\u0022:null},{\u0022Title\u0022:\u0022No\u0022,\u0022Name\u0022:\u0022No\u0022,\u0022Value\u0022:\u0022False\u0022,\u0022Icon\u0022:null}]',
                  'Meta_Choice_ServiceUrl': null,
                  'Meta_Choice_ServiceCallParameters': null,
                  'Meta_Choice_ServiceWarningMessage': null,
                  'Meta_Choice_ShowFriendlyName': 'False',
                  'Meta_Choice_ActionTitle': null,
                  'Meta_Choice_ButtonTitle': null,
                  'Meta_Choice_NotResponsive': 'False',
                  'Meta_Choice_SideLabel': null
              },
              'TypeChildProperties': [],
              'Position': 0
          },
          {
              'Name': 'MetaTitle',
              'DefaultValue': null,
              'Title': 'Meta title',
              'Type': 'string',
              'SectionName': 'Metadata fields',
              'CategoryName': 'Advanced',
              'Properties': {},
              'TypeChildProperties': [],
              'Position': 1
          },
          {
              'Name': 'MetaDescription',
              'DefaultValue': null,
              'Title': 'Meta description',
              'Type': 'string',
              'SectionName': 'Metadata fields',
              'CategoryName': 'Advanced',
              'Properties': {},
              'TypeChildProperties': [],
              'Position': 2
          },
          {
              'Name': 'PageTitleMode',
              'DefaultValue': 'Replace',
              'Title': 'Page title mode',
              'Type': 'choices',
              'SectionName': 'Metadata fields',
              'CategoryName': 'Advanced',
              'Properties': {
                  'Meta_Choices': '[{\u0022Title\u0022:\u0022Replace\u0022,\u0022Name\u0022:\u0022Replace\u0022,\u0022Value\u0022:\u0022Replace\u0022,\u0022Icon\u0022:null},{\u0022Title\u0022:\u0022Append\u0022,\u0022Name\u0022:\u0022Append\u0022,\u0022Value\u0022:\u0022Append\u0022,\u0022Icon\u0022:null},{\u0022Title\u0022:\u0022Hierarchy\u0022,\u0022Name\u0022:\u0022Hierarchy\u0022,\u0022Value\u0022:\u0022Hierarchy\u0022,\u0022Icon\u0022:null},{\u0022Title\u0022:\u0022Do not set\u0022,\u0022Name\u0022:\u0022DoNotSet\u0022,\u0022Value\u0022:\u0022DoNotSet\u0022,\u0022Icon\u0022:null}]',
                  'Meta_Choices_AllowMultiple': 'False',
                  'Meta_Description_Description': '[{\u0022Type\u0022: 1,\u0022Chunks\u0022: [{\u0022Value\u0022: \u0022Setting Page title mode\u0022,\u0022Presentation\u0022: [0]},{\u0022Value\u0022: \u0022Replace \u2013 page title is replaced by the\u0022,\u0022Presentation\u0022: [2]},{\u0022Value\u0022: \u0022item\u0027s title.\u0022,\u0022Presentation\u0022: [2]},{\u0022Value\u0022: \u0022Append \u2013 item title is appended to the\u0022,\u0022Presentation\u0022: [2]},{\u0022Value\u0022: \u0022page title.\u0022,\u0022Presentation\u0022: [2]},{\u0022Value\u0022: \u0022Hierarchy \u2013 page title will be built by the\u0022,\u0022Presentation\u0022: [2]},{\u0022Value\u0022: \u0022item\u0027s title and its parent\u0027s title. Value is\u0022,\u0022Presentation\u0022: [2]},{\u0022Value\u0022: \u0022relevant for the Forums widget only.\u0022,\u0022Presentation\u0022: [2]},{\u0022Value\u0022: \u0022Do not set \u2013 page title will not be altered.\u0022,\u0022Presentation\u0022: []}]}]'
              },
              'TypeChildProperties': [],
              'Position': 3
          },
          {
              'Name': 'OpenGraphEnabled',
              'DefaultValue': 'True',
              'Title': 'OpenGraph enabled',
              'Type': 'chipchoice',
              'SectionName': 'Metadata fields',
              'CategoryName': 'Advanced',
              'Properties': {
                  'Meta_Choice_Choices': '[{\u0022Title\u0022:\u0022Yes\u0022,\u0022Name\u0022:\u0022Yes\u0022,\u0022Value\u0022:\u0022True\u0022,\u0022Icon\u0022:null},{\u0022Title\u0022:\u0022No\u0022,\u0022Name\u0022:\u0022No\u0022,\u0022Value\u0022:\u0022False\u0022,\u0022Icon\u0022:null}]',
                  'Meta_Choice_ServiceUrl': null,
                  'Meta_Choice_ServiceCallParameters': null,
                  'Meta_Choice_ServiceWarningMessage': null,
                  'Meta_Choice_ShowFriendlyName': 'False',
                  'Meta_Choice_ActionTitle': null,
                  'Meta_Choice_ButtonTitle': null,
                  'Meta_Choice_NotResponsive': 'False',
                  'Meta_Choice_SideLabel': null
              },
              'TypeChildProperties': [],
              'Position': 4
          },
          {
              'Name': 'OpenGraphTitle',
              'DefaultValue': null,
              'Title': 'OpenGraph title',
              'Type': 'string',
              'SectionName': 'Metadata fields',
              'CategoryName': 'Advanced',
              'Properties': {},
              'TypeChildProperties': [],
              'Position': 5
          },
          {
              'Name': 'OpenGraphDescription',
              'DefaultValue': null,
              'Title': 'OpenGraph description',
              'Type': 'string',
              'SectionName': 'Metadata fields',
              'CategoryName': 'Advanced',
              'Properties': {},
              'TypeChildProperties': [],
              'Position': 6
          },
          {
              'Name': 'OpenGraphImage',
              'DefaultValue': null,
              'Title': 'OpenGraph image',
              'Type': 'string',
              'SectionName': 'Metadata fields',
              'CategoryName': 'Advanced',
              'Properties': {},
              'TypeChildProperties': [],
              'Position': 7
          },
          {
              'Name': 'OpenGraphVideo',
              'DefaultValue': null,
              'Title': 'OpenGraph video',
              'Type': 'string',
              'SectionName': 'Metadata fields',
              'CategoryName': 'Advanced',
              'Properties': {},
              'TypeChildProperties': [],
              'Position': 8
          },
          {
              'Name': 'OpenGraphType',
              'DefaultValue': 'article',
              'Title': 'OpenGraph type',
              'Type': 'string',
              'SectionName': 'Metadata fields',
              'CategoryName': 'Advanced',
              'Properties': {},
              'TypeChildProperties': [],
              'Position': 9
          },
          {
              'Name': 'Attributes',
              'DefaultValue': null,
              'Title': 'Attributes for...',
              'Type': 'attributes',
              'SectionName': 'Attributes',
              'CategoryName': 'Advanced',
              'Properties': {
                  'Meta_LengthDependsOn_PropertyName': null,
                  'Meta_LengthDependsOn_DisplayName': '',
                  'Meta_LengthDependsOn_DisplayTitle': '',
                  'Meta_LengthDependsOn_ExtraRecords': '[{\u0022Name\u0022: \u0022ContentList\u0022, \u0022Title\u0022: \u0022Content list\u0022}]'
              },
              'TypeChildProperties': [
                  {
                      'Name': 'Keys',
                      'DefaultValue': null,
                      'Title': 'Keys',
                      'Type': null,
                      'SectionName': null,
                      'CategoryName': null,
                      'Properties': {
                          'Validations_Readonly': 'True'
                      },
                      'TypeChildProperties': [],
                      'Position': 0
                  },
                  {
                      'Name': 'Values',
                      'DefaultValue': null,
                      'Title': 'Values',
                      'Type': null,
                      'SectionName': null,
                      'CategoryName': null,
                      'Properties': {
                          'Validations_Readonly': 'True'
                      },
                      'TypeChildProperties': [],
                      'Position': 0
                  }
              ],
              'Position': 0
          }
      ]
  }
);
