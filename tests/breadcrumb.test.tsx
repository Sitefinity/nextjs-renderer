
import { render, waitFor } from '@testing-library/react';
import { MockedBreadcrumbRestService } from './mocks/mock-breadcrumb.service';
import { Breadcrumb, BreadcrumbEntity } from '@progress/sitefinity-react-framework';
import { RequestContext, WidgetModel } from '../src/nextjs-framework/editor';

describe('should render breadcrumb', () => {
    it('with empty model', async () => {
        const model = {
            '@odata.context': 'https://localhost:5001/sf/system/$metadata#Telerik.Sitefinity.Renderer.Editor.HierarchicalWidgetModelResponse',
            'Id': 'dbd6fe0e-eaea-426a-bab6-8689ea755a39',
            'SiblingId': '00000000-0000-0000-0000-000000000000',
            'Name': 'SitefinityBreadcrumb',
            'PlaceHolder': 'Body',
            'Caption': null,
            'ViewName': null,
            'Lazy': false,
            'Key': 'dbd6fe0e-eaea-426a-bab6-8689ea755a39',
            'AddAllowed': false,
            'DeleteAllowed': true,
            'EditAllowed': true,
            'MoveAllowed': true,
            'LabelTooltip': '',
            'IsPersonalized': false,
            'WidgetSegmentId': null,
            'WidgetState': [
                {
                    'Key': 'dbd6fe0e-eaea-426a-bab6-8689ea755a39',
                    'Name': 'SitefinityBreadcrumb',
                    'AddAllowed': true,
                    'DeleteAllowed': true,
                    'EditAllowed': true,
                    'MoveAllowed': true,
                    'LabelTooltip': '',
                    'IsPersonalized': false,
                    'WidgetSegmentId': null
                }
            ],
            'Properties': {},
            'Children': []
        };

        const requestContext = {
            'detailItem': null,
            'searchParams': {
                'sfaction': 'edit',
                'sf_culture': 'en',
                'sf_site': '4c922118-f076-4e24-9193-93e004f50107',
                'sf_page_node': '951c4a3b-e984-465b-9dff-641b01197b9c',
                'model': 'eyJAb2RhdGEuY29udGV4dCI6Imh0dHBzOi8vbG9jYWxob3N0OjUwMDEvc2Yvc3lzdGVtLyRtZXRhZGF0YSNUZWxlcmlrLlNpdGVmaW5pdHkuUmVuZGVyZXIuRWRpdG9yLkhpZXJhcmNoaWNhbFdpZGdldE1vZGVsUmVzcG9uc2UiLCJJZCI6ImRiZDZmZTBlLWVhZWEtNDI2YS1iYWI2LTg2ODllYTc1NWEzOSIsIlNpYmxpbmdJZCI6IjAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMCIsIk5hbWUiOiJTaXRlZmluaXR5QnJlYWRjcnVtYiIsIlBsYWNlSG9sZGVyIjoiQm9keSIsIkNhcHRpb24iOm51bGwsIlZpZXdOYW1lIjpudWxsLCJMYXp5IjpmYWxzZSwiS2V5IjoiZGJkNmZlMGUtZWFlYS00MjZhLWJhYjYtODY4OWVhNzU1YTM5IiwiQWRkQWxsb3dlZCI6ZmFsc2UsIkRlbGV0ZUFsbG93ZWQiOnRydWUsIkVkaXRBbGxvd2VkIjp0cnVlLCJNb3ZlQWxsb3dlZCI6dHJ1ZSwiTGFiZWxUb29sdGlwIjoiIiwiSXNQZXJzb25hbGl6ZWQiOmZhbHNlLCJXaWRnZXRTZWdtZW50SWQiOm51bGwsIldpZGdldFN0YXRlIjpbeyJLZXkiOiJkYmQ2ZmUwZS1lYWVhLTQyNmEtYmFiNi04Njg5ZWE3NTVhMzkiLCJOYW1lIjoiU2l0ZWZpbml0eUJyZWFkY3J1bWIiLCJBZGRBbGxvd2VkIjp0cnVlLCJEZWxldGVBbGxvd2VkIjp0cnVlLCJFZGl0QWxsb3dlZCI6dHJ1ZSwiTW92ZUFsbG93ZWQiOnRydWUsIkxhYmVsVG9vbHRpcCI6IiIsIklzUGVyc29uYWxpemVkIjpmYWxzZSwiV2lkZ2V0U2VnbWVudElkIjpudWxsfV0sIlByb3BlcnRpZXMiOnt9LCJDaGlsZHJlbiI6W119'
            },
            'isEdit': true,
            'isPreview': false,
            'isLive': false,
            'culture': 'en'
        };

        const callToAction = await Breadcrumb({
            model,
            requestContext,
            metadata,
            restService: MockedBreadcrumbRestService
        });
        const { container } = render(callToAction);

        await waitFor(() => {
            expect(container).toMatchSnapshot();
        });
    });

    it('with full path to current page', async () => {
        const model = {
            Id: 'c53ba795-8c6c-4b4e-a5f3-531e8f8e8122',
            SiblingId: '00000000-0000-0000-0000-000000000000',
            Name: 'SitefinityBreadcrumb',
            PlaceHolder: 'Body',
            Caption: null,
            ViewName: null,
            Lazy: false,
            Key: null,
            AddAllowed: false,
            DeleteAllowed: false,
            EditAllowed: false,
            MoveAllowed: false,
            LabelTooltip: null,
            IsPersonalized: false,
            WidgetSegmentId: null,
            Properties: {},
            Children: []
        };

        const requestContext = {
            pageNode: {
                '@odata.context': 'https://localhost:5001/api/default/$metadata#Telerik.Sitefinity.Renderer.Web.Services.Dto.PageDtoWithContext',
                Culture: 'en',
                SiteId: '4c922118-f076-4e24-9193-93e004f50107',
                MetadataHash: '-1129976431',
                Id: '3b13e28b-21ee-44f4-8cd8-22eed0e84b00',
                TemplateName: 'Default',
                Renderer: 'React',
                UrlParameters: [],
                HasVariations: false,
                Site: [Object],
                User: null,
                ComponentContext: [Object],
                Scripts: [],
                DetailItem: null,
                MetaInfo: [Object],
                Fields: [Object]
            },
            searchParams: {
                sf_site: '4c922118-f076-4e24-9193-93e004f50107',
                sfaction: 'edit',
                sf_version: '11'
            },
            detailItem: null,
            culture: 'en',
            isEdit: true,
            isPreview: false
        };


        const callToAction = await Breadcrumb({
            model,
            requestContext,
            metadata,
            restService: MockedBreadcrumbRestService
        });
        const { container } = render(callToAction);

        await waitFor(() => {
            expect(container).toMatchSnapshot();
        });
    });

    it('with margins', async () => {
        const model = {
            'Id': '52a11ccb-95b7-4b99-b09d-7e4ccf24668d',
            'SiblingId': '00000000-0000-0000-0000-000000000000',
            'Name': 'SitefinityBreadcrumb',
            'PlaceHolder': 'Column1',
            'Caption': null,
            'ViewName': null,
            'Lazy': false,
            'Key': null,
            'AddAllowed': false,
            'DeleteAllowed': false,
            'EditAllowed': false,
            'MoveAllowed': false,
            'LabelTooltip': null,
            'IsPersonalized': false,
            'WidgetSegmentId': null,
            'Properties': {
                'SelectedPage': {
                    'ItemIdsOrdered': [
                        '6a008144-632b-470e-83ff-aac1ea4675e6'
                    ],
                    'Content': [
                        {
                            'Variations': [
                                {
                                    'Source': null,
                                    'Filter': {
                                        'Key': 'Ids',
                                        'Value': '6a008144-632b-470e-83ff-aac1ea4675e6'
                                    }
                                }
                            ]
                        }
                    ]
                },
                'BreadcrumbIncludeOption': 'SpecificPagePath',
                'Margins': {
                    'Top': 'None',
                    'Right': 'S',
                    'Bottom': 'M',
                    'Left': 'L'
                },
                'AllowVirtualNodes': true,
                'IncludeGroupPages': true
            },
            'Children': []
        };

        const requestContext = {
            'pageNode': {
                '@odata.context': 'https://localhost:5001/api/default/$metadata#Telerik.Sitefinity.Renderer.Web.Services.Dto.PageDtoWithContext',
                'Culture': 'en',
                'SiteId': '4c922118-f076-4e24-9193-93e004f50107',
                'MetadataHash': '-1129976431',
                'Id': '951c4a3b-e984-465b-9dff-641b01197b9c',
                'TemplateName': 'Default',
                'Renderer': 'React',
                'UrlParameters': [],
                'HasVariations': false,
                'Site': {
                    'Id': '4c922118-f076-4e24-9193-93e004f50107',
                    'Name': 'Quantum International',
                    'DefaultCulture': 'en',
                    'Cultures': [
                        'en',
                        'es'
                    ],
                    'TimeZone': 'UTC;0;UTC;UTC;UTC;;',
                    'IsSubFolder': false
                },
                'User': null,
                'ComponentContext': {
                    'HasLazyComponents': false,
                    'OrphanedControls': [],
                    'Components': [
                        {
                            'Id': 'ea79683c-9ba2-408b-8a86-4f1562cfa4f7',
                            'SiblingId': '00000000-0000-0000-0000-000000000000',
                            'Name': 'SitefinitySection',
                            'PlaceHolder': 'Body',
                            'Caption': null,
                            'ViewName': null,
                            'Lazy': false,
                            'Key': null,
                            'AddAllowed': false,
                            'DeleteAllowed': false,
                            'EditAllowed': false,
                            'MoveAllowed': false,
                            'LabelTooltip': null,
                            'IsPersonalized': false,
                            'WidgetSegmentId': null,
                            'Properties': {
                                'ColumnsCount': 1,
                                'ColumnProportionsInfo': '[12]'
                            },
                            'Children': [
                                {
                                    'Id': '52a11ccb-95b7-4b99-b09d-7e4ccf24668d',
                                    'SiblingId': '00000000-0000-0000-0000-000000000000',
                                    'Name': 'SitefinityBreadcrumb',
                                    'PlaceHolder': 'Column1',
                                    'Caption': null,
                                    'ViewName': null,
                                    'Lazy': false,
                                    'Key': null,
                                    'AddAllowed': false,
                                    'DeleteAllowed': false,
                                    'EditAllowed': false,
                                    'MoveAllowed': false,
                                    'LabelTooltip': null,
                                    'IsPersonalized': false,
                                    'WidgetSegmentId': null,
                                    'Properties': {
                                        'SelectedPage': {
                                            'ItemIdsOrdered': [
                                                '6a008144-632b-470e-83ff-aac1ea4675e6'
                                            ],
                                            'Content': [
                                                {
                                                    'Variations': [
                                                        {
                                                            'Source': null,
                                                            'Filter': {
                                                                'Key': 'Ids',
                                                                'Value': '6a008144-632b-470e-83ff-aac1ea4675e6'
                                                            }
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        'BreadcrumbIncludeOption': 'SpecificPagePath',
                                        'Margins': {
                                            'Top': 'None',
                                            'Right': 'S',
                                            'Bottom': 'M',
                                            'Left': 'L'
                                        },
                                        'AllowVirtualNodes': true,
                                        'IncludeGroupPages': true
                                    },
                                    'Children': []
                                }
                            ]
                        }
                    ],
                    'Fields': null,
                    'Site': null,
                    'User': null
                },
                'Scripts': [],
                'DetailItem': null,
                'MetaInfo': {
                    'Title': 'qa-breadcrumb',
                    'Description': '',
                    'HtmlInHeadTag': null,
                    'OpenGraphTitle': 'qa-breadcrumb',
                    'OpenGraphDescription': '',
                    'OpenGraphImage': null,
                    'OpenGraphVideo': null,
                    'OpenGraphType': null,
                    'OpenGraphSite': null,
                    'CanonicalUrl': 'https://localhost:5001/qa-breadcrumb'
                },
                'Fields': {
                    'Title': 'qa-breadcrumb',
                    'UrlName': 'qa-breadcrumb',
                    'LastModified': '2023-11-24T07:23:52.010Z',
                    'DateCreated': '2023-11-24T07:23:52.010Z',
                    'Crawlable': true,
                    'ParentId': 'f669d9a7-009d-4d83-ddaa-000000000002',
                    'RootId': 'f669d9a7-009d-4d83-ddaa-000000000002',
                    'IsHomePage': false,
                    'AvailableLanguages@odata.type': '#Collection(String)',
                    'AvailableLanguages': [
                        'en'
                    ],
                    'ViewUrl': '/qa-breadcrumb'
                }
            },
            'searchParams': {
                'sf_site': '4c922118-f076-4e24-9193-93e004f50107',
                'sfaction': 'preview',
                'slug': [
                    'qa-breadcrumb'
                ]
            },
            'detailItem': null,
            'culture': 'en',
            'isEdit': false,
            'isPreview': true,
            'isLive': false,
            'cookie': 'sf_site=4c922118-f076-4e24-9193-93e004f50107; _cfuvid=SaBGhy4cTAD.P31sJ6sOjY68E.MiFc5pO6pQMx4oSVw-1700810533367-0-604800000; 5001SF-TokenId=da47868a-172d-461f-8f9e-97fccd0b8974; sf-data-intell-subject=d60440b9-8483-4329-8323-3cb1545a0f53; 5001.AspNet.Cookies=OqIiyWszfkjb9Z99floGmwBYTYHiWppAc-GeR6c2LS_SObj7djYxKJiv6TNFV1iTVhM1JpgKVpZhdk5KhX8WzhyJrNkz-WEHCgvn2dCQcXbX5ALF26FPBwxTuYyk5hlYxY6e6RIaf_XmkxaWrGNPJA_Azw6c-9DWlmOYTQDPSgbYLQ9hEpGwYkNzw4d9VnI9kuZaukmg9Gbb7kZWGgESWIUs-BqaQvHlHfTdBwUjRa4whSeweAhVw2K81Hudb5yN0Tkb9G3maHyGINBSLDp_XwJ4hBeil8bMB5iDRLocB3akmAnyDFSie3UYKwtiFIaHyUxHF2NQ4TABWuvrp2ZMx9unkX9CajMfmOwPFKH87xMsEzrl0kUvLmtYabdal-0ppo8xOiYNR9KmvdHmkf4ig6LaqMLGN1I4Rfm-AHsigSrPzQ2HC5M9DQCYyqTihuN25G883KdoRYfoA9SBM6sDnXqZZOJd6Our_3_2Eyxr2dkkK01k0WnIy6SzybNyTiUptSCDt5J8ePEASF6Z70C0tjGrSkKCGw8d4UUlPt1dgYl20FZRKq1K10PBSda0hate4EIfsCBHOT6FXekhqkYsnS4nmW6xRy8ElhL92TLAeJko3khyj8Ml29xBOuHKSo_3nqk5e23EZWJPJHdv2sd7KmT0R9gcaRzQfCJMtj4pH6mtdunxLWMna-0_E0JvRQbKC5jY1NXYldIqrDk3gKUbPRUNS4_QH87ZRS8FEl9tHjyULDBk6bUW4qduSN42mM66kSZqZBKJYDnTS-rHA8IjBzTwgQKNCmvi32kBgyTYsnYsIhbwU9DnIUrKRRMNLoeqUe8deGSKMNDb_KWf53JjQoxCRelvUn1KNOeRK9wUH_iUlHwurN9Xyau4Vl4wTMMFbs5UfbobguocUXbrsmeGp3gFpkHshsCNPMP51vp4V85364LjFEwZHvmXLHC8z-tUkWmdHpvvaVSCV9ChRFj9DPYDC_R9fVmMpbR1wnh6Po1QNbdBJxZ1zcKqgtHqAc1b8SUTnC2d7MV0IytfUmO4X9TnxP5eUvB4am1hTts3sq3JGu5-WbmpNlWcL2xXPVWi_wWSrOGCZtsph8jNFwiHxqkAeJBwB7TAuyzKT5NLtdENRfoxdsXvm4mn3TPAfLnG0oWp11rfzYebONKN1n1X8vHIm2R_c3sKFVS4lWEimvuuX4kVfBiNCAqzDpbu9c8sc8t02RWpxoFgOLAqhF2YbmJDTd8yfSYpq-152Mc6TS7GoIZ1vABdRVykm6H9hZUYLCsh5lkZN5YcpORALTtqeQ; sf_timezoneoffset=-120; __cfruid=6adc7cf60fee17243584b5c901540b170a1645b2-1700810541'
        };

        const callToAction = await Breadcrumb({
            model,
            requestContext,
            metadata,
            restService: MockedBreadcrumbRestService
        });
        const { container } = render(callToAction);

        await waitFor(() => {
            expect(container).toMatchSnapshot();
        });
    });
});

const metadata = {
    designerMetadata: {
        Name: 'SitefinityBreadcrumb',
        Caption: 'Breadcrumb',
        PropertyMetadata: [Array]
    },
    componentType: [Breadcrumb],
    editorMetadata: { Title: 'Breadcrumb' },
    ssr: true
};

const model: WidgetModel<BreadcrumbEntity> = {
    Id: 'c53ba795-8c6c-4b4e-a5f3-531e8f8e8122',
    Name: 'SitefinityBreadcrumb',
    PlaceHolder: 'Body',
    Caption: 'Breadcrumb',
    ViewName: '',
    Lazy: false,
    Properties: {},
    Children: []
};

const requestContext: RequestContext = {
    pageNode: {
        Culture: 'en',
        SiteId: '4c922118-f076-4e24-9193-93e004f50107',
        MetadataHash: '-1129976431',
        Id: '831706cd-10e1-4184-b2e5-ef9f9ad0fdb5',
        TemplateName: 'Default',
        Renderer: 'React',
        UrlParameters: [],
        HasVariations: false,
        Site: {
            Id: '4c922118-f076-4e24-9193-93e004f50107',
            Name: 'Quantum International',
            DefaultCulture: 'en',
            Cultures: [Array],
            TimeZone: 'UTC;0;UTC;UTC;UTC;;',
            IsSubFolder: false
        },
        User: null,
        ComponentContext: {
            HasLazyComponents: false,
            OrphanedControls: [],
            Components: [Array],
            Fields: null,
            Site: null,
            User: null
        },
        Scripts: [],
        DetailItem: null,
        MetaInfo: {
            Title: 'integration-test',
            Description: '',
            HtmlInHeadTag: null,
            OpenGraphTitle: 'integration-test',
            OpenGraphDescription: '',
            OpenGraphImage: null,
            OpenGraphVideo: null,
            OpenGraphType: null,
            OpenGraphSite: null,
            CanonicalUrl: 'https://localhost:5001/integration-test'
        },
        Fields: {
            Title: 'integration-test',
            UrlName: 'integration-test',
            LastModified: '2023-11-13T13:13:09.183Z',
            DateCreated: '2023-11-13T13:13:09.183Z',
            Crawlable: true,
            ParentId: 'f669d9a7-009d-4d83-ddaa-000000000002',
            RootId: 'f669d9a7-009d-4d83-ddaa-000000000002',
            IsHomePage: false,
            'AvailableLanguages@odata.type': '#Collection(String)',
            AvailableLanguages: [Array],
            ViewUrl: '/integration-test'
        }
    },
    searchParams: {
        sf_site: '4c922118-f076-4e24-9193-93e004f50107',
        sfaction: 'edit',
        sf_version: '11'
    },
    detailItem: null,
    culture: 'en',
    isEdit: true,
    isPreview: false,
    isLive: false
};
