import { Classification, ClassificationEntity } from '@progress/sitefinity-react-framework';
import { render, waitFor } from '@testing-library/react';
import { RequestContext, WidgetModel } from '../src/nextjs-framework/editor';
import { MockedClassificationRestService } from './mocks/mock-classification.service';

describe.skip('should render classification', () => {
    it('with empty model', async () => {
        const model = {
            '@odata.context': 'https://localhost:5001/sf/system/$metadata#Telerik.Sitefinity.Renderer.Editor.HierarchicalWidgetModelResponse',
            'Id': '3609cd2e-549c-4b18-9339-01eb2f0b4471',
            'SiblingId': '00000000-0000-0000-0000-000000000000',
            'Name': 'SitefinityClassification',
            'PlaceHolder': 'Body',
            'Caption': null,
            'ViewName': null,
            'Lazy': false,
            'Key': '3609cd2e-549c-4b18-9339-01eb2f0b4471',
            'AddAllowed': false,
            'DeleteAllowed': true,
            'EditAllowed': true,
            'MoveAllowed': true,
            'LabelTooltip': '',
            'IsPersonalized': false,
            'WidgetSegmentId': null,
            'WidgetState': [
                {
                    'Key': '3609cd2e-549c-4b18-9339-01eb2f0b4471',
                    'Name': 'SitefinityClassification',
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
                'sf_page_node': '40f2ad77-472d-49c0-a0a0-47dea77914de',
                'model': 'eyJAb2RhdGEuY29udGV4dCI6Imh0dHBzOi8vbG9jYWxob3N0OjUwMDEvc2Yvc3lzdGVtLyRtZXRhZGF0YSNUZWxlcmlrLlNpdGVmaW5pdHkuUmVuZGVyZXIuRWRpdG9yLkhpZXJhcmNoaWNhbFdpZGdldE1vZGVsUmVzcG9uc2UiLCJJZCI6IjM2MDljZDJlLTU0OWMtNGIxOC05MzM5LTAxZWIyZjBiNDQ3MSIsIlNpYmxpbmdJZCI6IjAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMCIsIk5hbWUiOiJTaXRlZmluaXR5Q2xhc3NpZmljYXRpb24iLCJQbGFjZUhvbGRlciI6IkJvZHkiLCJDYXB0aW9uIjpudWxsLCJWaWV3TmFtZSI6bnVsbCwiTGF6eSI6ZmFsc2UsIktleSI6IjM2MDljZDJlLTU0OWMtNGIxOC05MzM5LTAxZWIyZjBiNDQ3MSIsIkFkZEFsbG93ZWQiOmZhbHNlLCJEZWxldGVBbGxvd2VkIjp0cnVlLCJFZGl0QWxsb3dlZCI6dHJ1ZSwiTW92ZUFsbG93ZWQiOnRydWUsIkxhYmVsVG9vbHRpcCI6IiIsIklzUGVyc29uYWxpemVkIjpmYWxzZSwiV2lkZ2V0U2VnbWVudElkIjpudWxsLCJXaWRnZXRTdGF0ZSI6W3siS2V5IjoiMzYwOWNkMmUtNTQ5Yy00YjE4LTkzMzktMDFlYjJmMGI0NDcxIiwiTmFtZSI6IlNpdGVmaW5pdHlDbGFzc2lmaWNhdGlvbiIsIkFkZEFsbG93ZWQiOnRydWUsIkRlbGV0ZUFsbG93ZWQiOnRydWUsIkVkaXRBbGxvd2VkIjp0cnVlLCJNb3ZlQWxsb3dlZCI6dHJ1ZSwiTGFiZWxUb29sdGlwIjoiIiwiSXNQZXJzb25hbGl6ZWQiOmZhbHNlLCJXaWRnZXRTZWdtZW50SWQiOm51bGx9XSwiUHJvcGVydGllcyI6e30sIkNoaWxkcmVuIjpbXX0='
            },
            'isEdit': true,
            'isPreview': false,
            'isLive': false,
            'culture': 'en'
        };

        const component = await Classification({ model, requestContext, metadata, restService: MockedClassificationRestService });
        const { container } = render(component);

        await waitFor(() => {
            expect(container).toMatchSnapshot();
        });
    });

    it('by catagories', async () => {
        const model = {
            '@odata.context': 'https://localhost:5001/sf/system/$metadata#Telerik.Sitefinity.Renderer.Editor.HierarchicalWidgetModelResponse',
            'Id': '3609cd2e-549c-4b18-9339-01eb2f0b4471',
            'SiblingId': '00000000-0000-0000-0000-000000000000',
            'Name': 'SitefinityClassification',
            'PlaceHolder': 'Body',
            'Caption': null,
            'ViewName': null,
            'Lazy': false,
            'Key': '3609cd2e-549c-4b18-9339-01eb2f0b4471',
            'AddAllowed': false,
            'DeleteAllowed': true,
            'EditAllowed': true,
            'MoveAllowed': true,
            'LabelTooltip': '',
            'IsPersonalized': false,
            'WidgetSegmentId': null,
            'WidgetState': [
                {
                    'Key': '3609cd2e-549c-4b18-9339-01eb2f0b4471',
                    'Name': 'SitefinityClassification',
                    'AddAllowed': true,
                    'DeleteAllowed': true,
                    'EditAllowed': true,
                    'MoveAllowed': true,
                    'LabelTooltip': '',
                    'IsPersonalized': false,
                    'WidgetSegmentId': null
                }
            ],
            'Properties': {
                'ClassificationSettings': {
                    'selectedTaxonomyId': 'e5cd6d69-1543-427b-ad62-688a99f5e7d4',
                    'selectedTaxonomyUrl': 'hierarchy-taxa',
                    'selectedTaxonomyName': 'Categories',
                    'selectedTaxonomyTitle': 'Categories',
                    'selectionMode': 'All',
                    'byContentType': '',
                    'selectedTaxaIds': []
                },
                'Margins': {
                    'Top': 'None',
                    'Right': 'S',
                    'Bottom': 'M',
                    'Left': 'L'
                },
                'OrderBy': null
            },
            'Children': []
        };

        const requestContext = {
            'detailItem': null,
            'searchParams': {
                'sfaction': 'edit',
                'sf_culture': 'en',
                'sf_site': '4c922118-f076-4e24-9193-93e004f50107',
                'sf_page_node': '40f2ad77-472d-49c0-a0a0-47dea77914de',
                'model': 'eyJAb2RhdGEuY29udGV4dCI6Imh0dHBzOi8vbG9jYWxob3N0OjUwMDEvc2Yvc3lzdGVtLyRtZXRhZGF0YSNUZWxlcmlrLlNpdGVmaW5pdHkuUmVuZGVyZXIuRWRpdG9yLkhpZXJhcmNoaWNhbFdpZGdldE1vZGVsUmVzcG9uc2UiLCJJZCI6IjM2MDljZDJlLTU0OWMtNGIxOC05MzM5LTAxZWIyZjBiNDQ3MSIsIlNpYmxpbmdJZCI6IjAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMCIsIk5hbWUiOiJTaXRlZmluaXR5Q2xhc3NpZmljYXRpb24iLCJQbGFjZUhvbGRlciI6IkJvZHkiLCJDYXB0aW9uIjpudWxsLCJWaWV3TmFtZSI6bnVsbCwiTGF6eSI6ZmFsc2UsIktleSI6IjM2MDljZDJlLTU0OWMtNGIxOC05MzM5LTAxZWIyZjBiNDQ3MSIsIkFkZEFsbG93ZWQiOmZhbHNlLCJEZWxldGVBbGxvd2VkIjp0cnVlLCJFZGl0QWxsb3dlZCI6dHJ1ZSwiTW92ZUFsbG93ZWQiOnRydWUsIkxhYmVsVG9vbHRpcCI6IiIsIklzUGVyc29uYWxpemVkIjpmYWxzZSwiV2lkZ2V0U2VnbWVudElkIjpudWxsLCJXaWRnZXRTdGF0ZSI6W3siS2V5IjoiMzYwOWNkMmUtNTQ5Yy00YjE4LTkzMzktMDFlYjJmMGI0NDcxIiwiTmFtZSI6IlNpdGVmaW5pdHlDbGFzc2lmaWNhdGlvbiIsIkFkZEFsbG93ZWQiOnRydWUsIkRlbGV0ZUFsbG93ZWQiOnRydWUsIkVkaXRBbGxvd2VkIjp0cnVlLCJNb3ZlQWxsb3dlZCI6dHJ1ZSwiTGFiZWxUb29sdGlwIjoiIiwiSXNQZXJzb25hbGl6ZWQiOmZhbHNlLCJXaWRnZXRTZWdtZW50SWQiOm51bGx9XSwiUHJvcGVydGllcyI6eyJDbGFzc2lmaWNhdGlvblNldHRpbmdzIjoie1wic2VsZWN0ZWRUYXhvbm9teUlkXCI6XCJlNWNkNmQ2OS0xNTQzLTQyN2ItYWQ2Mi02ODhhOTlmNWU3ZDRcIixcInNlbGVjdGVkVGF4b25vbXlVcmxcIjpcImhpZXJhcmNoeS10YXhhXCIsXCJzZWxlY3RlZFRheG9ub215TmFtZVwiOlwiQ2F0ZWdvcmllc1wiLFwic2VsZWN0ZWRUYXhvbm9teVRpdGxlXCI6XCJDYXRlZ29yaWVzXCIsXCJzZWxlY3Rpb25Nb2RlXCI6XCJBbGxcIixcImJ5Q29udGVudFR5cGVcIjpcIlwiLFwic2VsZWN0ZWRUYXhhSWRzXCI6W119IiwiTWFyZ2lucyI6IntcIlRvcFwiOlwiTm9uZVwiLFwiUmlnaHRcIjpcIlNcIixcIkJvdHRvbVwiOlwiTVwiLFwiTGVmdFwiOlwiTFwifSIsIk9yZGVyQnkiOm51bGx9LCJDaGlsZHJlbiI6W119'
            },
            'isEdit': true,
            'isPreview': false,
            'isLive': false,
            'culture': 'en'
        };

        const component = await Classification({ model, requestContext, metadata, restService: MockedClassificationRestService });
        const { container } = render(component);

        await waitFor(() => {
            expect(container).toMatchSnapshot();
        });
    });

    it('by tags', async () => {
        const model = {
            '@odata.context': 'https://localhost:5001/sf/system/$metadata#Telerik.Sitefinity.Renderer.Editor.HierarchicalWidgetModelResponse',
            'Id': '3609cd2e-549c-4b18-9339-01eb2f0b4471',
            'SiblingId': '00000000-0000-0000-0000-000000000000',
            'Name': 'SitefinityClassification',
            'PlaceHolder': 'Body',
            'Caption': null,
            'ViewName': null,
            'Lazy': false,
            'Key': '3609cd2e-549c-4b18-9339-01eb2f0b4471',
            'AddAllowed': false,
            'DeleteAllowed': true,
            'EditAllowed': true,
            'MoveAllowed': true,
            'LabelTooltip': '',
            'IsPersonalized': false,
            'WidgetSegmentId': null,
            'WidgetState': [
                {
                    'Key': '3609cd2e-549c-4b18-9339-01eb2f0b4471',
                    'Name': 'SitefinityClassification',
                    'AddAllowed': true,
                    'DeleteAllowed': true,
                    'EditAllowed': true,
                    'MoveAllowed': true,
                    'LabelTooltip': '',
                    'IsPersonalized': false,
                    'WidgetSegmentId': null
                }
            ],
            'Properties': {
                'ClassificationSettings': {
                    'selectedTaxonomyId': 'cb0f3a19-a211-48a7-88ec-77495c0f5374',
                    'selectedTaxonomyUrl': 'flat-taxa',
                    'selectedTaxonomyName': 'Tags',
                    'selectedTaxonomyTitle': 'Tags',
                    'selectionMode': 'Selected',
                    'byContentType': '',
                    'selectedTaxaIds': [
                        '6d41f4a4-1d60-6822-81ac-ff0000da1875',
                        '42d5fda4-1d60-6822-81ac-ff0000da1875'
                    ]
                },
                'ShowEmpty': 'True',
                'Margins': {
                    'Top': 'None',
                    'Right': 'S',
                    'Bottom': 'M',
                    'Left': 'L'
                },
                'OrderBy': null
            },
            'Children': []
        };

        const requestContext = {
            'detailItem': null,
            'searchParams': {
                'sfaction': 'edit',
                'sf_culture': 'en',
                'sf_site': '4c922118-f076-4e24-9193-93e004f50107',
                'sf_page_node': '40f2ad77-472d-49c0-a0a0-47dea77914de',
                'model': 'eyJAb2RhdGEuY29udGV4dCI6Imh0dHBzOi8vbG9jYWxob3N0OjUwMDEvc2Yvc3lzdGVtLyRtZXRhZGF0YSNUZWxlcmlrLlNpdGVmaW5pdHkuUmVuZGVyZXIuRWRpdG9yLkhpZXJhcmNoaWNhbFdpZGdldE1vZGVsUmVzcG9uc2UiLCJJZCI6IjM2MDljZDJlLTU0OWMtNGIxOC05MzM5LTAxZWIyZjBiNDQ3MSIsIlNpYmxpbmdJZCI6IjAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMCIsIk5hbWUiOiJTaXRlZmluaXR5Q2xhc3NpZmljYXRpb24iLCJQbGFjZUhvbGRlciI6IkJvZHkiLCJDYXB0aW9uIjpudWxsLCJWaWV3TmFtZSI6bnVsbCwiTGF6eSI6ZmFsc2UsIktleSI6IjM2MDljZDJlLTU0OWMtNGIxOC05MzM5LTAxZWIyZjBiNDQ3MSIsIkFkZEFsbG93ZWQiOmZhbHNlLCJEZWxldGVBbGxvd2VkIjp0cnVlLCJFZGl0QWxsb3dlZCI6dHJ1ZSwiTW92ZUFsbG93ZWQiOnRydWUsIkxhYmVsVG9vbHRpcCI6IiIsIklzUGVyc29uYWxpemVkIjpmYWxzZSwiV2lkZ2V0U2VnbWVudElkIjpudWxsLCJXaWRnZXRTdGF0ZSI6W3siS2V5IjoiMzYwOWNkMmUtNTQ5Yy00YjE4LTkzMzktMDFlYjJmMGI0NDcxIiwiTmFtZSI6IlNpdGVmaW5pdHlDbGFzc2lmaWNhdGlvbiIsIkFkZEFsbG93ZWQiOnRydWUsIkRlbGV0ZUFsbG93ZWQiOnRydWUsIkVkaXRBbGxvd2VkIjp0cnVlLCJNb3ZlQWxsb3dlZCI6dHJ1ZSwiTGFiZWxUb29sdGlwIjoiIiwiSXNQZXJzb25hbGl6ZWQiOmZhbHNlLCJXaWRnZXRTZWdtZW50SWQiOm51bGx9XSwiUHJvcGVydGllcyI6eyJDbGFzc2lmaWNhdGlvblNldHRpbmdzIjoie1wic2VsZWN0ZWRUYXhvbm9teUlkXCI6XCJjYjBmM2ExOS1hMjExLTQ4YTctODhlYy03NzQ5NWMwZjUzNzRcIixcInNlbGVjdGVkVGF4b25vbXlVcmxcIjpcImZsYXQtdGF4YVwiLFwic2VsZWN0ZWRUYXhvbm9teU5hbWVcIjpcIlRhZ3NcIixcInNlbGVjdGVkVGF4b25vbXlUaXRsZVwiOlwiVGFnc1wiLFwic2VsZWN0aW9uTW9kZVwiOlwiU2VsZWN0ZWRcIixcImJ5Q29udGVudFR5cGVcIjpcIlwiLFwic2VsZWN0ZWRUYXhhSWRzXCI6W1wiNmQ0MWY0YTQtMWQ2MC02ODIyLTgxYWMtZmYwMDAwZGExODc1XCIsXCI0MmQ1ZmRhNC0xZDYwLTY4MjItODFhYy1mZjAwMDBkYTE4NzVcIl19IiwiU2hvd0VtcHR5IjoiVHJ1ZSIsIk1hcmdpbnMiOiJ7XCJUb3BcIjpcIk5vbmVcIixcIlJpZ2h0XCI6XCJTXCIsXCJCb3R0b21cIjpcIk1cIixcIkxlZnRcIjpcIkxcIn0iLCJPcmRlckJ5IjpudWxsfSwiQ2hpbGRyZW4iOltdfQ=='
            },
            'isEdit': true,
            'isPreview': false,
            'isLive': false,
            'culture': 'en'
        };

        const component = await Classification({ model, requestContext, metadata, restService: MockedClassificationRestService });
        const { container } = render(component);

        await waitFor(() => {
            expect(container).toMatchSnapshot();
        });
    });
});

const metadata = {
    designerMetadata: {
        Name: 'SitefinityClassification',
        Caption: 'Classification',
        PropertyMetadata: [[Object], [Object]]
    },
    componentType: [Classification],
    editorMetadata: { Title: 'Classification' },
    ssr: true
};

const model: WidgetModel<ClassificationEntity> = {
    Id: '41ffac2c-113c-426d-a997-14fd7e0338cf',
    Name: 'SitefinityClassification',
    PlaceHolder: 'Column1',
    Caption: 'Classification',
    ViewName: '',
    Lazy: false,
    Properties: {
        ClassificationSettings: {
            selectedTaxonomyId: 'e5cd6d69-1543-427b-ad62-688a99f5e7d4',
            selectedTaxonomyUrl: 'hierarchy-taxa',
            selectedTaxonomyName: 'Categories',
            selectedTaxonomyTitle: 'Categories',
            selectionMode: 'All',
            byContentType: '',
            selectedTaxaIds: []
        },
        Margins: { Bottom:'L', Left: 'L', Right: 'L', Top: 'L' },
        OrderBy: undefined
    },
    Children: []
};

const requestContext: RequestContext = {
    pageNode: {
        '@odata.context': 'https://localhost:5001/api/default/$metadata#Telerik.Sitefinity.Renderer.Web.Services.Dto.PageDtoWithContext',
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
        sf_version: '80'
    },
    detailItem: null,
    culture: 'en',
    isEdit: true,
    isPreview: false,
    isLive: false
};
