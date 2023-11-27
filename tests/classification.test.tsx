import { Classification } from '@/components/classification/classification';
import { render, waitFor } from '@testing-library/react';

it.skip('should render classification', async () => {
    const callToAction = await Classification({ model, requestContext, metadata });
    const { container } = render(callToAction);

    await waitFor(() => {
        expect(container).toMatchSnapshot();
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

const model = {
    Id: '41ffac2c-113c-426d-a997-14fd7e0338cf',
    SiblingId: '00000000-0000-0000-0000-000000000000',
    Name: 'SitefinityClassification',
    PlaceHolder: 'Column1',
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
        Margins: {},
        OrderBy: null
    },
    Children: []
};

const requestContext = {
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
    isPreview: false
};
