import { ContentBlock, ContentBlockEntity } from '@progress/sitefinity-react-framework';
import { render, waitFor } from '@testing-library/react';
import { RequestContext, WidgetModel } from '../src/nextjs-framework/editor';

it('should render content block', async () => {
    const contentBlock = await ContentBlock({ model, requestContext, metadata });
    const { container } = render(contentBlock);

    await waitFor(() => {
        expect(container).toMatchSnapshot();
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
    isEdit: true,
    isPreview: false,
    culture: 'en',
    isLive: false
};
