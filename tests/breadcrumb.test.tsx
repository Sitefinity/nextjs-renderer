
import { render, waitFor } from '@testing-library/react';
import { MockedBreadcrumbRestService } from './mocks/mock-breadcrumb.service';
import { Breadcrumb, BreadcrumbEntity } from '@progress/sitefinity-react-framework';
import { RequestContext, WidgetModel } from '../src/nextjs-framework/editor';

it('should render breadcrumb', async () => {
    const callToAction = await Breadcrumb({
        model,
        requestContext,
        metadata,
        restService: MockedBreadcrumbRestService });
    const { container } = render(callToAction);

    await waitFor(() => {
        expect(container).toMatchSnapshot();
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
