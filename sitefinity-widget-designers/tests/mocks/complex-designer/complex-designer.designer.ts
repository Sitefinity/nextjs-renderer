export const COMLPEX_DESIGNER_DESIGNER = Object.freeze({
    Name: 'ComplexWitget',
    Caption: 'Complex witget',
    'PropertyMetadata': [
        {
            'Name': 'Basic',
            'Sections': [
                {
                    'Name': 'Main',
                    'Title': null,
                    'Properties': [

                        {
                            'Name': 'Complex',
                            'DefaultValue': null,
                            'Title': 'Complex',
                            'Type': 'complex',
                            'SectionName': null,
                            'CategoryName': null,
                            'Properties': {},
                            'TypeChildProperties': [
                                {
                                    'Name': 'ChildString',
                                    'DefaultValue': 'test',
                                    'Title': 'String prop',
                                    'Type': 'string',
                                    'SectionName': null,
                                    'CategoryName': null,
                                    'Properties': {},
                                    'TypeChildProperties': [],
                                    'Position': 0
                                },
                                {
                                    'Name': 'ChildInt',
                                    'DefaultValue': '42',
                                    'Title': 'Int prop',
                                    'Type': 'number',
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
                            'Name': 'ComplexWithContent',
                            'DefaultValue': null,
                            'Title': 'ComplexWithContent',
                            'Type': 'complex',
                            'SectionName': null,
                            'CategoryName': null,
                            'Properties': {},
                            'TypeChildProperties': [
                                {
                                    'Name': 'Events',
                                    'DefaultValue': null,
                                    'Title': 'Events',
                                    'Type': 'content',
                                    'SectionName': null,
                                    'CategoryName': null,
                                    'Properties': {
                                        'Meta_Content_Type': 'Telerik.Sitefinity.Events.Model.Event',
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
                                }
                            ],
                            'Position': 0
                        },
                        {
                            'Name': 'ComplexTable',
                            'DefaultValue': null,
                            'Title': 'ComplexTable',
                            'Type': 'complex',
                            'SectionName': null,
                            'CategoryName': null,
                            'Properties': {
                                'Meta_TableView_ColumnTitle': 'TableTitle',
                                'Meta_TableView_Enabled': 'True',
                                'Meta_TableView_Reorderable': 'False',
                                'Meta_TableView_Selectable': 'False',
                                'Meta_TableView_MultipleSelect': 'False',
                                'Meta_TableView_AllowEmptyState': 'False'
                            },
                            'TypeChildProperties': [
                                {
                                    'Name': 'ChildString',
                                    'DefaultValue': 'test',
                                    'Title': 'String prop',
                                    'Type': 'string',
                                    'SectionName': null,
                                    'CategoryName': null,
                                    'Properties': {},
                                    'TypeChildProperties': [],
                                    'Position': 0
                                },
                                {
                                    'Name': 'ChildInt',
                                    'DefaultValue': '42',
                                    'Title': 'Int prop',
                                    'Type': 'number',
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
                            'Name': 'MultiLevelComplexObject',
                            'DefaultValue': null,
                            'Title': 'MultiLevelComplexObject',
                            'Type': 'complex',
                            'SectionName': null,
                            'CategoryName': null,
                            'Properties': {},
                            'TypeChildProperties': [
                                {
                                    'Name': 'ChildString',
                                    'DefaultValue': 'testouter',
                                    'Title': 'String prop',
                                    'Type': 'string',
                                    'SectionName': null,
                                    'CategoryName': null,
                                    'Properties': {},
                                    'TypeChildProperties': [],
                                    'Position': 0
                                },
                                {
                                    'Name': 'ChildComplexObject',
                                    'DefaultValue': null,
                                    'Title': 'Child complex prop',
                                    'Type': 'complex',
                                    'SectionName': null,
                                    'CategoryName': null,
                                    'Properties': {},
                                    'TypeChildProperties': [
                                        {
                                            'Name': 'ChildString',
                                            'DefaultValue': 'test',
                                            'Title': 'String prop',
                                            'Type': 'string',
                                            'SectionName': null,
                                            'CategoryName': null,
                                            'Properties': {},
                                            'TypeChildProperties': [],
                                            'Position': 0
                                        },
                                        {
                                            'Name': 'ChildInt',
                                            'DefaultValue': '42',
                                            'Title': 'Int prop',
                                            'Type': 'number',
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
                            'Position': 0
                        },
                        {
                            'Name': 'BigComplexTable',
                            'DefaultValue': null,
                            'Title': 'BigComplexTable',
                            'Type': 'complex',
                            'SectionName': null,
                            'CategoryName': null,
                            'Properties': {
                                'Meta_TableView_ColumnTitle': 'BigTableTitle',
                                'Meta_TableView_Enabled': 'True',
                                'Meta_TableView_Reorderable': 'False',
                                'Meta_TableView_Selectable': 'False',
                                'Meta_TableView_MultipleSelect': 'False',
                                'Meta_TableView_AllowEmptyState': 'False'
                            },
                            'TypeChildProperties': [
                                {
                                    'Name': 'ChildString1',
                                    'DefaultValue': 'test1',
                                    'Title': 'String prop1',
                                    'Type': 'string',
                                    'SectionName': null,
                                    'CategoryName': null,
                                    'Properties': {},
                                    'TypeChildProperties': [],
                                    'Position': 0
                                },
                                {
                                    'Name': 'ChildString2',
                                    'DefaultValue': 'test2',
                                    'Title': 'String prop2',
                                    'Type': 'string',
                                    'SectionName': null,
                                    'CategoryName': null,
                                    'Properties': {},
                                    'TypeChildProperties': [],
                                    'Position': 0
                                },
                                {
                                    'Name': 'ChildString3',
                                    'DefaultValue': 'test3',
                                    'Title': 'String prop3',
                                    'Type': 'string',
                                    'SectionName': null,
                                    'CategoryName': null,
                                    'Properties': {},
                                    'TypeChildProperties': [],
                                    'Position': 0
                                },
                                {
                                    'Name': 'ChildString4',
                                    'DefaultValue': 'test4',
                                    'Title': 'String prop4',
                                    'Type': 'string',
                                    'SectionName': null,
                                    'CategoryName': null,
                                    'Properties': {},
                                    'TypeChildProperties': [],
                                    'Position': 0
                                },
                                {
                                    'Name': 'ChildString5',
                                    'DefaultValue': 'test5',
                                    'Title': 'String prop5',
                                    'Type': 'string',
                                    'SectionName': null,
                                    'CategoryName': null,
                                    'Properties': {},
                                    'TypeChildProperties': [],
                                    'Position': 0
                                },
                                {
                                    'Name': 'ChildString6',
                                    'DefaultValue': 'test6',
                                    'Title': 'String prop6',
                                    'Type': 'string',
                                    'SectionName': null,
                                    'CategoryName': null,
                                    'Properties': {},
                                    'TypeChildProperties': [],
                                    'Position': 0
                                }
                            ],
                            'Position': 0
                        },{
                            'Name': 'ListComplexObject',
                            'DefaultValue': null,
                            'Title': 'ListComplexObject',
                            'Type': 'enumerable',
                            'SectionName': null,
                            'CategoryName': null,
                            'Properties': {},
                            'TypeChildProperties': [
                                {
                                    'Name': 'ChildString',
                                    'DefaultValue': 'test',
                                    'Title': 'String prop',
                                    'Type': 'string',
                                    'SectionName': null,
                                    'CategoryName': null,
                                    'Properties': {},
                                    'TypeChildProperties': [],
                                    'Position': 0
                                },
                                {
                                    'Name': 'ChildInt',
                                    'DefaultValue': '42',
                                    'Title': 'Int prop',
                                    'Type': 'number',
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
                            'Name': 'ListTableView',
                            'DefaultValue': null,
                            'Title': 'ListTableView',
                            'Type': 'enumerable',
                            'SectionName': null,
                            'CategoryName': null,
                            'Properties': {
                                'Meta_TableView_ColumnTitle': null,
                                'Meta_TableView_Enabled': 'True',
                                'Meta_TableView_Reorderable': 'True',
                                'Meta_TableView_Selectable': 'True',
                                'Meta_TableView_MultipleSelect': 'True',
                                'Meta_TableView_AllowEmptyState': 'False'
                            },
                            'TypeChildProperties': [
                                {
                                    'Name': 'ChildString',
                                    'DefaultValue': 'test',
                                    'Title': 'String prop',
                                    'Type': 'string',
                                    'SectionName': null,
                                    'CategoryName': null,
                                    'Properties': {},
                                    'TypeChildProperties': [],
                                    'Position': 0
                                },
                                {
                                    'Name': 'ChildInt',
                                    'DefaultValue': '42',
                                    'Title': 'Int prop',
                                    'Type': 'number',
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
                    'CategoryName': 'Basic'
                }
            ],
            'CategoryName': 'Basic'
        }
    ]
});
