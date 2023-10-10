import { LoginForm } from '@/components/login-form/login-form';
import { render, waitFor } from '@testing-library/react';

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

const model = {
    Id: 'b116390e-23ae-410a-b323-6354a04aaddc',
    SiblingId: '75c6e799-1e66-4269-bb54-0868cbb062f9',
    Name: 'SitefinityLoginForm',
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
    Properties: { Margins: {}, RememberMe: true },
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
        sf_version: '80'
    },
    detailItem: null,
    culture: 'en',
    isEdit: true,
    isPreview: false
};
