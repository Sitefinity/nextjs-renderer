import { CallToAction, CallToActionEntity } from '@progress/sitefinity-react-framework';
import { render, waitFor } from '@testing-library/react';
import { RequestContext, WidgetModel } from '../src/nextjs-framework/editor';

it.skip('should render call to action', async () => {
    const callToAction = await CallToAction({ model, requestContext, metadata });
    const { container } = render(callToAction);

    await waitFor(() => {
        expect(container).toMatchSnapshot();
    });
});

const metadata = {
    designerMetadata: {
        Name: 'SitefinityButton',
        Caption: 'Call to action',
        PropertyMetadata: [Array]
    },
    componentType: [CallToAction],
    editorMetadata: { Title: 'Call to action' },
    ssr: true
};

const model: WidgetModel<CallToActionEntity> = {
    Id: 'c1b4772b-1bd3-4e88-b444-9c6ffa40976e',
    Name: 'SitefinityButton',
    PlaceHolder: 'Column1',
    Caption: 'Call to action',
    ViewName: '',
    Lazy: false,
    Properties: {
        PrimaryActionLink: undefined,
        PrimaryActionLabel: 'Login',
        Margins: undefined,
        SecondaryActionLabel: 'Register',
        SecondaryActionLink: undefined
    },
    Children: []
};

const requestContext: RequestContext = {
    detailItem: null,
    searchParams: {
        sfaction: 'edit',
        sf_culture: 'en',
        sf_site: '4c922118-f076-4e24-9193-93e004f50107',
        sf_page_node: '831706cd-10e1-4184-b2e5-ef9f9ad0fdb5'
    },
    isEdit: true,
    isPreview: false,
    isLive: false,
    culture: 'en',
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
    }
};
