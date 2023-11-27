import { ContentBlock } from '@/components/content-block/content-block';
import { render, waitFor } from '@testing-library/react';

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

const model = {
    '@odata.context': 'https://localhost:5001/sf/system/$metadata#Telerik.Sitefinity.Renderer.Editor.HierarchicalWidgetModelResponse',
    Id: 'f07f4e6a-b827-48f0-b6a2-1305c80d9abb',
    SiblingId: '00000000-0000-0000-0000-000000000000',
    Name: 'SitefinityContentBlock',
    PlaceHolder: 'Column1',
    Caption: null,
    ViewName: null,
    Lazy: false,
    Key: 'f07f4e6a-b827-48f0-b6a2-1305c80d9abb',
    AddAllowed: false,
    DeleteAllowed: true,
    EditAllowed: true,
    MoveAllowed: true,
    LabelTooltip: '',
    IsPersonalized: false,
    WidgetSegmentId: null,
    WidgetState: [[Object]],
    Properties: {
        Content: '<h1 style="text-align:center;">Title</h1><p>&nbsp;</p><p>First paragraph.</p><p><strong>Bold test</strong></p><p><strong></strong><strong><a href="https://www.progress.com/" title="This is link to progress.com" data-sf-ec-immutable="">https://www.progress.com/</a></strong></p><p><strong></strong><img src="/images/default-source/backend-images/standard-collection-1.png?sfvrsn=be8438f4_1" alt="" sf-size="2191" sfref="[images%7COpenAccessDataProvider]671a7697-6e9e-4e22-bd45-b73fcc1dd941" /></p><p>&nbsp;</p>'
    },
    Children: []
};

const requestContext = {
    detailItem: null,
    searchParams: {
        sfaction: 'edit',
        sf_culture: 'en',
        sf_site: '4c922118-f076-4e24-9193-93e004f50107',
        sf_page_node: '831706cd-10e1-4184-b2e5-ef9f9ad0fdb5',
        model: {
            '@odata.context': 'https://localhost:5001/sf/system/$metadata#Telerik.Sitefinity.Renderer.Editor.HierarchicalWidgetModelResponse',
            'Id': 'f07f4e6a-b827-48f0-b6a2-1305c80d9abb',
            'SiblingId': '00000000-0000-0000-0000-000000000000',
            'Name': 'SitefinityContentBlock',
            'PlaceHolder': 'Column1',
            'Caption': null,
            'ViewName': null,
            'Lazy': false,
            'Key': 'f07f4e6a-b827-48f0-b6a2-1305c80d9abb',
            'AddAllowed': false,
            'DeleteAllowed': true,
            'EditAllowed': true,
            'MoveAllowed': true,
            'LabelTooltip': '',
            'IsPersonalized': false,
            'WidgetSegmentId': null,
            'WidgetState': [
                {
                    'Key': 'f07f4e6a-b827-48f0-b6a2-1305c80d9abb',
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
                'Content': '<h1 style=\'text-align:center;\'>Title</h1><p>&nbsp;</p><p>First paragraph.</p><p><strong>Bold test</strong></p><p><strong></strong><strong><a href=\'https://www.progress.com/\' title=\'This is link to progress.com\' data-sf-ec-immutable=\'\'>https://www.progress.com/</a></strong></p><p><strong></strong><img src=\'/images/default-source/backend-images/standard-collection-1.png?sfvrsn=be8438f4_1\' alt=\'\' sf-size=\'2191\' sfref=\'[images%7COpenAccessDataProvider]671a7697-6e9e-4e22-bd45-b73fcc1dd941\' /></p><p>&nbsp;</p>'
            },
            'Children': []
        }
    },
    isEdit: true,
    isPreview: false,
    culture: 'en'
};
