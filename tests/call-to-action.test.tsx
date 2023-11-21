import { CallToAction } from '@/components/call-to-action/call-to-action';
import { render, waitFor } from '@testing-library/react';

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

const model = {
    '@odata.context': 'https://localhost:5001/sf/system/$metadata#Telerik.Sitefinity.Renderer.Editor.HierarchicalWidgetModelResponse',
    Id: 'c1b4772b-1bd3-4e88-b444-9c6ffa40976e',
    SiblingId: 'f07f4e6a-b827-48f0-b6a2-1305c80d9abb',
    Name: 'SitefinityButton',
    PlaceHolder: 'Column1',
    Caption: null,
    ViewName: null,
    Lazy: false,
    Key: 'c1b4772b-1bd3-4e88-b444-9c6ffa40976e',
    AddAllowed: false,
    DeleteAllowed: true,
    EditAllowed: true,
    MoveAllowed: true,
    LabelTooltip: '',
    IsPersonalized: false,
    WidgetSegmentId: null,
    WidgetState: [[Object]],
    Properties: {
        PrimaryActionLink: [Object],
        PrimaryActionLabel: 'Login',
        Margins: [Object],
        SecondaryActionLabel: 'Register',
        SecondaryActionLink: [Object]
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
            'Id': 'c1b4772b-1bd3-4e88-b444-9c6ffa40976e',
            'SiblingId': 'f07f4e6a-b827-48f0-b6a2-1305c80d9abb',
            'Name': 'SitefinityButton',
            'PlaceHolder': 'Column1',
            'Caption': null,
            'ViewName': null,
            'Lazy': false,
            'Key': 'c1b4772b-1bd3-4e88-b444-9c6ffa40976e',
            'AddAllowed': false,
            'DeleteAllowed': true,
            'EditAllowed': true,
            'MoveAllowed': true,
            'LabelTooltip': '',
            'IsPersonalized': false,
            'WidgetSegmentId': null,
            'WidgetState': [
                {
                    'Key': 'c1b4772b-1bd3-4e88-b444-9c6ffa40976e',
                    'Name': 'SitefinityButton',
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
                'PrimaryActionLink': '{\r\n  \'href\': \'https://www.progress.com/\',\r\n  \'text\': \'Login\',\r\n  \'queryParams\': \'\',\r\n  \'anchor\': \'\',\r\n  \'tooltip\': \'Login\',\r\n  \'type\': \'URL\',\r\n  \'classList\': [],\r\n  \'id\': \'10e56803-be2a-4ebd-bac0-c53f3b0aca78\'\r\n}',
                'PrimaryActionLabel': 'Login',
                'Margins': '{\'Top\':\'M\',\'Right\':\'M\',\'Bottom\':\'M\',\'Left\':\'M\'}',
                'SecondaryActionLabel': 'Register',
                'SecondaryActionLink': '{\r\n  \'href\': \'https://www.telerik.com/\',\r\n  \'text\': \'Register\',\r\n  \'queryParams\': \'\',\r\n  \'anchor\': \'\',\r\n  \'tooltip\': \'Register\',\r\n  \'type\': \'URL\',\r\n  \'classList\': [],\r\n  \'id\': \'5efb15ef-8b33-4aeb-a669-e2e8133fb639\'\r\n}'
            },
            'Children': []
        }
    },
    isEdit: true,
    isPreview: false,
    culture: 'en'
};
