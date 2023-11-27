import { Breadcrumb } from '@/components/breadcrumb/breadcrumb';
import { render, waitFor } from '@testing-library/react';
import { MockedBreadcrumbRestService } from './mocks/mock-breadcrumb.service';

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
