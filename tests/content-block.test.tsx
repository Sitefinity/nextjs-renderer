import { ContentBlock, ContentBlockEntity } from '@progress/sitefinity-react-framework';
import { render, waitFor } from '@testing-library/react';
import { RequestContext, WidgetModel } from '../src/nextjs-framework/editor';

describe('should render content block', () => {
    it('with empty model', async () => {
        const model = {
            '@odata.context': 'https://localhost:5001/sf/system/$metadata#Telerik.Sitefinity.Renderer.Editor.HierarchicalWidgetModelResponse',
            'Id': '731d793d-4fe1-4bf6-878d-7cc973c2be3f',
            'SiblingId': '00000000-0000-0000-0000-000000000000',
            'Name': 'SitefinityContentBlock',
            'PlaceHolder': 'Body',
            'Caption': null,
            'ViewName': null,
            'Lazy': false,
            'Key': '731d793d-4fe1-4bf6-878d-7cc973c2be3f',
            'AddAllowed': false,
            'DeleteAllowed': true,
            'EditAllowed': true,
            'MoveAllowed': true,
            'LabelTooltip': '',
            'IsPersonalized': false,
            'WidgetSegmentId': null,
            'WidgetState': [
                {
                    'Key': '731d793d-4fe1-4bf6-878d-7cc973c2be3f',
                    'Name': 'SitefinityContentBlock',
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
                'sf_page_node': '402424c2-0ae5-4aed-aad6-7171af7e7249',
                'model': 'eyJAb2RhdGEuY29udGV4dCI6Imh0dHBzOi8vbG9jYWxob3N0OjUwMDEvc2Yvc3lzdGVtLyRtZXRhZGF0YSNUZWxlcmlrLlNpdGVmaW5pdHkuUmVuZGVyZXIuRWRpdG9yLkhpZXJhcmNoaWNhbFdpZGdldE1vZGVsUmVzcG9uc2UiLCJJZCI6IjczMWQ3OTNkLTRmZTEtNGJmNi04NzhkLTdjYzk3M2MyYmUzZiIsIlNpYmxpbmdJZCI6IjAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMCIsIk5hbWUiOiJTaXRlZmluaXR5Q29udGVudEJsb2NrIiwiUGxhY2VIb2xkZXIiOiJCb2R5IiwiQ2FwdGlvbiI6bnVsbCwiVmlld05hbWUiOm51bGwsIkxhenkiOmZhbHNlLCJLZXkiOiI3MzFkNzkzZC00ZmUxLTRiZjYtODc4ZC03Y2M5NzNjMmJlM2YiLCJBZGRBbGxvd2VkIjpmYWxzZSwiRGVsZXRlQWxsb3dlZCI6dHJ1ZSwiRWRpdEFsbG93ZWQiOnRydWUsIk1vdmVBbGxvd2VkIjp0cnVlLCJMYWJlbFRvb2x0aXAiOiIiLCJJc1BlcnNvbmFsaXplZCI6ZmFsc2UsIldpZGdldFNlZ21lbnRJZCI6bnVsbCwiV2lkZ2V0U3RhdGUiOlt7IktleSI6IjczMWQ3OTNkLTRmZTEtNGJmNi04NzhkLTdjYzk3M2MyYmUzZiIsIk5hbWUiOiJTaXRlZmluaXR5Q29udGVudEJsb2NrIiwiQWRkQWxsb3dlZCI6dHJ1ZSwiRGVsZXRlQWxsb3dlZCI6dHJ1ZSwiRWRpdEFsbG93ZWQiOnRydWUsIk1vdmVBbGxvd2VkIjp0cnVlLCJMYWJlbFRvb2x0aXAiOiIiLCJJc1BlcnNvbmFsaXplZCI6ZmFsc2UsIldpZGdldFNlZ21lbnRJZCI6bnVsbH1dLCJQcm9wZXJ0aWVzIjp7fSwiQ2hpbGRyZW4iOltdfQ=='
            },
            'isEdit': true,
            'isPreview': false,
            'isLive': false,
            'culture': 'en'
        };

        const component = await ContentBlock({ model, requestContext, metadata });
        const { container } = render(component);

        await waitFor(() => {
            expect(container).toMatchSnapshot();
        });
    });

    it('with content', async () => {
        const model = {
            '@odata.context': 'https://localhost:5001/sf/system/$metadata#Telerik.Sitefinity.Renderer.Editor.HierarchicalWidgetModelResponse',
            'Id': '731d793d-4fe1-4bf6-878d-7cc973c2be3f',
            'SiblingId': '00000000-0000-0000-0000-000000000000',
            'Name': 'SitefinityContentBlock',
            'PlaceHolder': 'Body',
            'Caption': null,
            'ViewName': null,
            'Lazy': false,
            'Key': '731d793d-4fe1-4bf6-878d-7cc973c2be3f',
            'AddAllowed': false,
            'DeleteAllowed': true,
            'EditAllowed': true,
            'MoveAllowed': true,
            'LabelTooltip': '',
            'IsPersonalized': false,
            'WidgetSegmentId': null,
            'WidgetState': [
                {
                    'Key': '731d793d-4fe1-4bf6-878d-7cc973c2be3f',
                    'Name': 'SitefinityContentBlock',
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
                'Content': '<p>Title</p><h1>Heading 1</h1><p>Paragraph 1</p><p><img src="/images/default-source/backend-images/standard-collection-1.png?sfvrsn=be8438f4_1" alt="" sf-size="2191" sfref="[images%7COpenAccessDataProvider]671a7697-6e9e-4e22-bd45-b73fcc1dd941" /></p><p>List</p><ul><li>List Item 1</li><li>List Item 2</li></ul><p><a href="https://github.com/" title="GitHub" data-sf-ec-immutable="">github.com</a></p><table><tbody><tr style="height:50%;"><td style="width:50%;">cell1</td><td style="width:50%;">cell2</td></tr><tr style="height:50%;"><td style="width:50%;">cell3</td><td style="width:50%;">&nbsp;</td></tr></tbody></table><p>&nbsp;</p>'
            },
            'Children': []
        };

        const requestContext = {
            'detailItem': null,
            'searchParams': {
                'sfaction': 'edit',
                'sf_culture': 'en',
                'sf_site': '4c922118-f076-4e24-9193-93e004f50107',
                'sf_page_node': '402424c2-0ae5-4aed-aad6-7171af7e7249',
                'model': 'eyJAb2RhdGEuY29udGV4dCI6Imh0dHBzOi8vbG9jYWxob3N0OjUwMDEvc2Yvc3lzdGVtLyRtZXRhZGF0YSNUZWxlcmlrLlNpdGVmaW5pdHkuUmVuZGVyZXIuRWRpdG9yLkhpZXJhcmNoaWNhbFdpZGdldE1vZGVsUmVzcG9uc2UiLCJJZCI6IjczMWQ3OTNkLTRmZTEtNGJmNi04NzhkLTdjYzk3M2MyYmUzZiIsIlNpYmxpbmdJZCI6IjAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMCIsIk5hbWUiOiJTaXRlZmluaXR5Q29udGVudEJsb2NrIiwiUGxhY2VIb2xkZXIiOiJCb2R5IiwiQ2FwdGlvbiI6bnVsbCwiVmlld05hbWUiOm51bGwsIkxhenkiOmZhbHNlLCJLZXkiOiI3MzFkNzkzZC00ZmUxLTRiZjYtODc4ZC03Y2M5NzNjMmJlM2YiLCJBZGRBbGxvd2VkIjpmYWxzZSwiRGVsZXRlQWxsb3dlZCI6dHJ1ZSwiRWRpdEFsbG93ZWQiOnRydWUsIk1vdmVBbGxvd2VkIjp0cnVlLCJMYWJlbFRvb2x0aXAiOiIiLCJJc1BlcnNvbmFsaXplZCI6ZmFsc2UsIldpZGdldFNlZ21lbnRJZCI6bnVsbCwiV2lkZ2V0U3RhdGUiOlt7IktleSI6IjczMWQ3OTNkLTRmZTEtNGJmNi04NzhkLTdjYzk3M2MyYmUzZiIsIk5hbWUiOiJTaXRlZmluaXR5Q29udGVudEJsb2NrIiwiQWRkQWxsb3dlZCI6dHJ1ZSwiRGVsZXRlQWxsb3dlZCI6dHJ1ZSwiRWRpdEFsbG93ZWQiOnRydWUsIk1vdmVBbGxvd2VkIjp0cnVlLCJMYWJlbFRvb2x0aXAiOiIiLCJJc1BlcnNvbmFsaXplZCI6ZmFsc2UsIldpZGdldFNlZ21lbnRJZCI6bnVsbH1dLCJQcm9wZXJ0aWVzIjp7IkNvbnRlbnQiOiI8cD5UaXRsZTwvcD48aDE+SGVhZGluZyAxPC9oMT48cD5QYXJhZ3JhcGggMTwvcD48cD48aW1nIHNyYz1cIi9pbWFnZXMvZGVmYXVsdC1zb3VyY2UvYmFja2VuZC1pbWFnZXMvc3RhbmRhcmQtY29sbGVjdGlvbi0xLnBuZz9zZnZyc249YmU4NDM4ZjRfMVwiIGFsdD1cIlwiIHNmLXNpemU9XCIyMTkxXCIgc2ZyZWY9XCJbaW1hZ2VzJTdDT3BlbkFjY2Vzc0RhdGFQcm92aWRlcl02NzFhNzY5Ny02ZTllLTRlMjItYmQ0NS1iNzNmY2MxZGQ5NDFcIiAvPjwvcD48cD5MaXN0PC9wPjx1bD48bGk+TGlzdCBJdGVtIDE8L2xpPjxsaT5MaXN0IEl0ZW0gMjwvbGk+PC91bD48cD48YSBocmVmPVwiaHR0cHM6Ly9naXRodWIuY29tL1wiIHRpdGxlPVwiR2l0SHViXCIgZGF0YS1zZi1lYy1pbW11dGFibGU9XCJcIj5naXRodWIuY29tPC9hPjwvcD48dGFibGU+PHRib2R5Pjx0ciBzdHlsZT1cImhlaWdodDo1MCU7XCI+PHRkIHN0eWxlPVwid2lkdGg6NTAlO1wiPmNlbGwxPC90ZD48dGQgc3R5bGU9XCJ3aWR0aDo1MCU7XCI+Y2VsbDI8L3RkPjwvdHI+PHRyIHN0eWxlPVwiaGVpZ2h0OjUwJTtcIj48dGQgc3R5bGU9XCJ3aWR0aDo1MCU7XCI+Y2VsbDM8L3RkPjx0ZCBzdHlsZT1cIndpZHRoOjUwJTtcIj4mbmJzcDs8L3RkPjwvdHI+PC90Ym9keT48L3RhYmxlPjxwPiZuYnNwOzwvcD4ifSwiQ2hpbGRyZW4iOltdfQ=='
            },
            'isEdit': true,
            'isPreview': false,
            'isLive': false,
            'culture': 'en'
        };

        const component = await ContentBlock({ model, requestContext, metadata });
        const { container } = render(component);

        await waitFor(() => {
            expect(container).toMatchSnapshot();
        });
    });
});

const metadata = {
    designerMetadata: {
        Name: 'SitefinityContentBlock',
        Caption: 'Content block',
        PropertyMetadata: [Array]
    },
    componentType: [ContentBlock],
    editorMetadata: { Title: 'Content block' },
    ssr: true
};

const model: WidgetModel<ContentBlockEntity> = {
    Id: 'f07f4e6a-b827-48f0-b6a2-1305c80d9abb',
    Name: 'SitefinityContentBlock',
    PlaceHolder: 'Column1',
    Lazy: false,
    Properties: {
        Content: '<h1 style="text-align:center;">Title</h1><p>&nbsp;</p><p>First paragraph.</p><p><strong>Bold test</strong></p><p><strong></strong><strong><a href="https://www.progress.com/" title="This is link to progress.com" data-sf-ec-immutable="">https://www.progress.com/</a></strong></p><p><strong></strong><img src="/images/default-source/backend-images/standard-collection-1.png?sfvrsn=be8438f4_1" alt="" sf-size="2191" sfref="[images%7COpenAccessDataProvider]671a7697-6e9e-4e22-bd45-b73fcc1dd941" /></p><p>&nbsp;</p>',
        ExcludeFromSearchIndex: false,
        ProviderName: '',
        SharedContentID: '',
        WrapperCssClass: ''
    },
    Children: [],
    Caption: 'Content block',
    ViewName: ''
};

const requestContext: RequestContext = {
    detailItem: null,
    searchParams: {
        sfaction: 'edit',
        sf_culture: 'en',
        sf_site: '4c922118-f076-4e24-9193-93e004f50107',
        sf_page_node: '831706cd-10e1-4184-b2e5-ef9f9ad0fdb5'
    },
    layout: {
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
    isEdit: true,
    isPreview: false,
    culture: 'en',
    isLive: false
};
