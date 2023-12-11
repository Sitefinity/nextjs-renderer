import { LoginForm, LoginFormEntity } from '@progress/sitefinity-react-framework';
import { render, waitFor } from '@testing-library/react';
import { RequestContext, WidgetModel } from '../src/nextjs-framework/editor';

it('should render login form', async () => {
    const contentList = await LoginForm({ model, requestContext, metadata });
    const { container } = render(contentList);

    const labels = container.getElementsByTagName('label');
    for (let label of labels) {
        const value = label.getAttribute('for');
        if (value !== null) {
            label.setAttribute('for', `${value.split('--')[0]}--f754`);
        }
    }

    const inputs = container.getElementsByTagName('input');
    for (let input of inputs) {
        const value = input.getAttribute('id');
        if (value !== null) {
            input.setAttribute('id', `${value.split('--')[0]}--f754`);
        }
    }

    await waitFor(() => {
        expect(container).toMatchSnapshot();
    });
});

const metadata = {
    designerMetadata: {
        Name: 'SitefinityLoginForm',
        Caption: 'Login form',
        PropertyMetadata: [Array]
    },
    componentType: [LoginForm],
    editorMetadata: { Title: 'LoginForm' },
    ssr: true
};

const model: WidgetModel<LoginFormEntity> = {
    Id: 'b116390e-23ae-410a-b323-6354a04aaddc',
    Name: 'SitefinityLoginForm',
    PlaceHolder: 'Column1',
    Caption: '',
    ViewName: '',
    Lazy: false,
    Properties: { Margins: undefined, RememberMe: true },
    Children: []
};

const requestContext: RequestContext = {
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
    searchParams: {
        sf_site: '4c922118-f076-4e24-9193-93e004f50107',
        sfaction: 'edit',
        sf_version: '80'
    },
    detailItem: null,
    culture: 'en',
    isEdit: true,
    isPreview: false,
    isLive: false,
    cookie: undefined
};
