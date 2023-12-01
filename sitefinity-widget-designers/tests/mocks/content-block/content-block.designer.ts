export const CONTENT_BLOCK_DESIGNER = Object.freeze(
    {
    'Name': 'SitefinityContentBlock',
    'Caption': 'Content block',
    'PropertyMetadata': [
        {
            'Name': 'Basic',
            'Sections': [
                {
                    'Name': 'Main',
                    'Title': null,
                    'Properties': [
                        {
                            'Name': 'Content',
                            'DefaultValue': null,
                            'Title': 'Content',
                            'Type': 'html',
                            'SectionName': null,
                            'CategoryName': null,
                            'Properties': {
                                'Meta_DynamicLinksContainer_HasLinks': 'True',
                                'Meta_ContentContainer_HasContent': 'True'
                            },
                            'TypeChildProperties': [],
                            'Position': 0
                        },
                        {
                            'Name': 'ProviderName',
                            'DefaultValue': null,
                            'Title': 'ProviderName',
                            'Type': 'string',
                            'SectionName': null,
                            'CategoryName': null,
                            'Properties': {},
                            'TypeChildProperties': [],
                            'Position': 0
                        },
                        {
                            'Name': 'SharedContentID',
                            'DefaultValue': null,
                            'Title': 'SharedContentID',
                            'Type': 'uuid',
                            'SectionName': null,
                            'CategoryName': null,
                            'Properties': {},
                            'TypeChildProperties': [],
                            'Position': 0
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
                            'DefaultValue': 'Content block',
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
                            'Name': 'WrapperCssClass',
                            'DefaultValue': null,
                            'Title': 'CSS class',
                            'Type': 'string',
                            'SectionName': null,
                            'CategoryName': 'Advanced',
                            'Properties': {},
                            'TypeChildProperties': [],
                            'Position': 0
                        },
                        {
                            'Name': 'TagName',
                            'DefaultValue': 'div',
                            'Title': 'Tag name',
                            'Type': 'string',
                            'SectionName': null,
                            'CategoryName': 'Advanced',
                            'Properties': {
                                'Validations_Regex': '^[a-zA-Z]{1,20}$',
                                'Validations_RegexErrorMsg': 'Up to twenty characters in the range a-z and A-Z are allowed.'
                            },
                            'TypeChildProperties': [],
                            'Position': 0
                        }
                    ],
                    'CategoryName': 'Advanced'
                },
                {
                    'Name': 'Display settings',
                    'Title': 'Display settings',
                    'Properties': [
                        {
                            'Name': 'Paddings',
                            'DefaultValue': null,
                            'Title': 'Padding',
                            'Type': 'complex',
                            'SectionName': 'Display settings',
                            'CategoryName': 'Advanced',
                            'Properties': {
                                'Meta_TableView_ColumnTitle': 'Content block',
                                'Meta_TableView_Enabled': 'True',
                                'Meta_TableView_Reorderable': 'False',
                                'Meta_TableView_Selectable': 'False',
                                'Meta_TableView_MultipleSelect': 'False',
                                'Meta_TableView_AllowEmptyState': 'False'
                            },
                            'TypeChildProperties': [
                                {
                                    'Name': 'Top',
                                    'DefaultValue': 'None',
                                    'Title': 'Top',
                                    'Type': 'chipchoice',
                                    'SectionName': null,
                                    'CategoryName': null,
                                    'Properties': {
                                        'Meta_Choices': '[{\u0022Title\u0022:\u0022None\u0022,\u0022Name\u0022:\u0022None\u0022,\u0022Value\u0022:\u0022None\u0022,\u0022Icon\u0022:null},{\u0022Title\u0022:\u0022Small\u0022,\u0022Name\u0022:\u0022S\u0022,\u0022Value\u0022:\u0022S\u0022,\u0022Icon\u0022:null},{\u0022Title\u0022:\u0022Medium\u0022,\u0022Name\u0022:\u0022M\u0022,\u0022Value\u0022:\u0022M\u0022,\u0022Icon\u0022:null},{\u0022Title\u0022:\u0022Large\u0022,\u0022Name\u0022:\u0022L\u0022,\u0022Value\u0022:\u0022L\u0022,\u0022Icon\u0022:null}]',
                                        'Meta_Choices_AllowMultiple': 'False'
                                    },
                                    'TypeChildProperties': [],
                                    'Position': 0
                                },
                                {
                                    'Name': 'Right',
                                    'DefaultValue': 'None',
                                    'Title': 'Right',
                                    'Type': 'chipchoice',
                                    'SectionName': null,
                                    'CategoryName': null,
                                    'Properties': {
                                        'Meta_Choices': '[{\u0022Title\u0022:\u0022None\u0022,\u0022Name\u0022:\u0022None\u0022,\u0022Value\u0022:\u0022None\u0022,\u0022Icon\u0022:null},{\u0022Title\u0022:\u0022Small\u0022,\u0022Name\u0022:\u0022S\u0022,\u0022Value\u0022:\u0022S\u0022,\u0022Icon\u0022:null},{\u0022Title\u0022:\u0022Medium\u0022,\u0022Name\u0022:\u0022M\u0022,\u0022Value\u0022:\u0022M\u0022,\u0022Icon\u0022:null},{\u0022Title\u0022:\u0022Large\u0022,\u0022Name\u0022:\u0022L\u0022,\u0022Value\u0022:\u0022L\u0022,\u0022Icon\u0022:null}]',
                                        'Meta_Choices_AllowMultiple': 'False'
                                    },
                                    'TypeChildProperties': [],
                                    'Position': 0
                                },
                                {
                                    'Name': 'Bottom',
                                    'DefaultValue': 'None',
                                    'Title': 'Bottom',
                                    'Type': 'chipchoice',
                                    'SectionName': null,
                                    'CategoryName': null,
                                    'Properties': {
                                        'Meta_Choices': '[{\u0022Title\u0022:\u0022None\u0022,\u0022Name\u0022:\u0022None\u0022,\u0022Value\u0022:\u0022None\u0022,\u0022Icon\u0022:null},{\u0022Title\u0022:\u0022Small\u0022,\u0022Name\u0022:\u0022S\u0022,\u0022Value\u0022:\u0022S\u0022,\u0022Icon\u0022:null},{\u0022Title\u0022:\u0022Medium\u0022,\u0022Name\u0022:\u0022M\u0022,\u0022Value\u0022:\u0022M\u0022,\u0022Icon\u0022:null},{\u0022Title\u0022:\u0022Large\u0022,\u0022Name\u0022:\u0022L\u0022,\u0022Value\u0022:\u0022L\u0022,\u0022Icon\u0022:null}]',
                                        'Meta_Choices_AllowMultiple': 'False'
                                    },
                                    'TypeChildProperties': [],
                                    'Position': 0
                                },
                                {
                                    'Name': 'Left',
                                    'DefaultValue': 'None',
                                    'Title': 'Left',
                                    'Type': 'chipchoice',
                                    'SectionName': null,
                                    'CategoryName': null,
                                    'Properties': {
                                        'Meta_Choices': '[{\u0022Title\u0022:\u0022None\u0022,\u0022Name\u0022:\u0022None\u0022,\u0022Value\u0022:\u0022None\u0022,\u0022Icon\u0022:null},{\u0022Title\u0022:\u0022Small\u0022,\u0022Name\u0022:\u0022S\u0022,\u0022Value\u0022:\u0022S\u0022,\u0022Icon\u0022:null},{\u0022Title\u0022:\u0022Medium\u0022,\u0022Name\u0022:\u0022M\u0022,\u0022Value\u0022:\u0022M\u0022,\u0022Icon\u0022:null},{\u0022Title\u0022:\u0022Large\u0022,\u0022Name\u0022:\u0022L\u0022,\u0022Value\u0022:\u0022L\u0022,\u0022Icon\u0022:null}]',
                                        'Meta_Choices_AllowMultiple': 'False'
                                    },
                                    'TypeChildProperties': [],
                                    'Position': 0
                                }
                            ],
                            'Position': 1
                        },
                        {
                            'Name': 'Margins',
                            'DefaultValue': null,
                            'Title': 'Margins',
                            'Type': 'complex',
                            'SectionName': 'Display settings',
                            'CategoryName': 'Advanced',
                            'Properties': {
                                'Meta_TableView_ColumnTitle': 'Content block',
                                'Meta_TableView_Enabled': 'True',
                                'Meta_TableView_Reorderable': 'False',
                                'Meta_TableView_Selectable': 'False',
                                'Meta_TableView_MultipleSelect': 'False',
                                'Meta_TableView_AllowEmptyState': 'False'
                            },
                            'TypeChildProperties': [
                                {
                                    'Name': 'Top',
                                    'DefaultValue': 'None',
                                    'Title': 'Top',
                                    'Type': 'chipchoice',
                                    'SectionName': null,
                                    'CategoryName': null,
                                    'Properties': {
                                        'Meta_Choices': '[{\u0022Title\u0022:\u0022None\u0022,\u0022Name\u0022:\u0022None\u0022,\u0022Value\u0022:\u0022None\u0022,\u0022Icon\u0022:null},{\u0022Title\u0022:\u0022Small\u0022,\u0022Name\u0022:\u0022S\u0022,\u0022Value\u0022:\u0022S\u0022,\u0022Icon\u0022:null},{\u0022Title\u0022:\u0022Medium\u0022,\u0022Name\u0022:\u0022M\u0022,\u0022Value\u0022:\u0022M\u0022,\u0022Icon\u0022:null},{\u0022Title\u0022:\u0022Large\u0022,\u0022Name\u0022:\u0022L\u0022,\u0022Value\u0022:\u0022L\u0022,\u0022Icon\u0022:null}]',
                                        'Meta_Choices_AllowMultiple': 'False'
                                    },
                                    'TypeChildProperties': [],
                                    'Position': 0
                                },
                                {
                                    'Name': 'Right',
                                    'DefaultValue': 'None',
                                    'Title': 'Right',
                                    'Type': 'chipchoice',
                                    'SectionName': null,
                                    'CategoryName': null,
                                    'Properties': {
                                        'Meta_Choices': '[{\u0022Title\u0022:\u0022None\u0022,\u0022Name\u0022:\u0022None\u0022,\u0022Value\u0022:\u0022None\u0022,\u0022Icon\u0022:null},{\u0022Title\u0022:\u0022Small\u0022,\u0022Name\u0022:\u0022S\u0022,\u0022Value\u0022:\u0022S\u0022,\u0022Icon\u0022:null},{\u0022Title\u0022:\u0022Medium\u0022,\u0022Name\u0022:\u0022M\u0022,\u0022Value\u0022:\u0022M\u0022,\u0022Icon\u0022:null},{\u0022Title\u0022:\u0022Large\u0022,\u0022Name\u0022:\u0022L\u0022,\u0022Value\u0022:\u0022L\u0022,\u0022Icon\u0022:null}]',
                                        'Meta_Choices_AllowMultiple': 'False'
                                    },
                                    'TypeChildProperties': [],
                                    'Position': 0
                                },
                                {
                                    'Name': 'Bottom',
                                    'DefaultValue': 'None',
                                    'Title': 'Bottom',
                                    'Type': 'chipchoice',
                                    'SectionName': null,
                                    'CategoryName': null,
                                    'Properties': {
                                        'Meta_Choices': '[{\u0022Title\u0022:\u0022None\u0022,\u0022Name\u0022:\u0022None\u0022,\u0022Value\u0022:\u0022None\u0022,\u0022Icon\u0022:null},{\u0022Title\u0022:\u0022Small\u0022,\u0022Name\u0022:\u0022S\u0022,\u0022Value\u0022:\u0022S\u0022,\u0022Icon\u0022:null},{\u0022Title\u0022:\u0022Medium\u0022,\u0022Name\u0022:\u0022M\u0022,\u0022Value\u0022:\u0022M\u0022,\u0022Icon\u0022:null},{\u0022Title\u0022:\u0022Large\u0022,\u0022Name\u0022:\u0022L\u0022,\u0022Value\u0022:\u0022L\u0022,\u0022Icon\u0022:null}]',
                                        'Meta_Choices_AllowMultiple': 'False'
                                    },
                                    'TypeChildProperties': [],
                                    'Position': 0
                                },
                                {
                                    'Name': 'Left',
                                    'DefaultValue': 'None',
                                    'Title': 'Left',
                                    'Type': 'chipchoice',
                                    'SectionName': null,
                                    'CategoryName': null,
                                    'Properties': {
                                        'Meta_Choices': '[{\u0022Title\u0022:\u0022None\u0022,\u0022Name\u0022:\u0022None\u0022,\u0022Value\u0022:\u0022None\u0022,\u0022Icon\u0022:null},{\u0022Title\u0022:\u0022Small\u0022,\u0022Name\u0022:\u0022S\u0022,\u0022Value\u0022:\u0022S\u0022,\u0022Icon\u0022:null},{\u0022Title\u0022:\u0022Medium\u0022,\u0022Name\u0022:\u0022M\u0022,\u0022Value\u0022:\u0022M\u0022,\u0022Icon\u0022:null},{\u0022Title\u0022:\u0022Large\u0022,\u0022Name\u0022:\u0022L\u0022,\u0022Value\u0022:\u0022L\u0022,\u0022Icon\u0022:null}]',
                                        'Meta_Choices_AllowMultiple': 'False'
                                    },
                                    'TypeChildProperties': [],
                                    'Position': 0
                                }
                            ],
                            'Position': 2
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
                                'Meta_LengthDependsOn_ExtraRecords': '[{\u0022Name\u0022:\u0022ContentBlock\u0022,\u0022Title\u0022:\u0022Content block\u0022}]'
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
                            'Position': 1
                        }
                    ],
                    'CategoryName': 'Advanced'
                }
            ]
        }
    ]}
);
