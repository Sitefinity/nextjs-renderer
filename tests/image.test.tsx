import { render, waitFor } from '@testing-library/react';
import { Image } from '../src/nextjs-framework/widgets/image/image';

describe('should render image', () => {
    it('default state', async () => {
        const model = {
            '@odata.context': 'https://localhost:5001/sf/system/$metadata#Telerik.Sitefinity.Renderer.Editor.HierarchicalWidgetModelResponse',
            'Id': '568481ca-45db-4f02-a62e-f76122532902',
            'SiblingId': '00000000-0000-0000-0000-000000000000',
            'Name': 'SitefinityImage',
            'PlaceHolder': 'Column1',
            'Caption': null,
            'ViewName': null,
            'Lazy': false,
            'Key': '568481ca-45db-4f02-a62e-f76122532902',
            'AddAllowed': false,
            'DeleteAllowed': true,
            'EditAllowed': true,
            'MoveAllowed': true,
            'LabelTooltip': '',
            'IsPersonalized': false,
            'WidgetSegmentId': null,
            'WidgetState': [
                {
                    'Key': '568481ca-45db-4f02-a62e-f76122532902',
                    'Name': 'SitefinityImage',
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
                'sf_page_node': '9cc9526f-ab01-4262-b550-d6d361c16a2f',
                'model': 'eyJAb2RhdGEuY29udGV4dCI6Imh0dHBzOi8vbG9jYWxob3N0OjUwMDEvc2Yvc3lzdGVtLyRtZXRhZGF0YSNUZWxlcmlrLlNpdGVmaW5pdHkuUmVuZGVyZXIuRWRpdG9yLkhpZXJhcmNoaWNhbFdpZGdldE1vZGVsUmVzcG9uc2UiLCJJZCI6IjU2ODQ4MWNhLTQ1ZGItNGYwMi1hNjJlLWY3NjEyMjUzMjkwMiIsIlNpYmxpbmdJZCI6IjAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMCIsIk5hbWUiOiJTaXRlZmluaXR5SW1hZ2UiLCJQbGFjZUhvbGRlciI6IkNvbHVtbjEiLCJDYXB0aW9uIjpudWxsLCJWaWV3TmFtZSI6bnVsbCwiTGF6eSI6ZmFsc2UsIktleSI6IjU2ODQ4MWNhLTQ1ZGItNGYwMi1hNjJlLWY3NjEyMjUzMjkwMiIsIkFkZEFsbG93ZWQiOmZhbHNlLCJEZWxldGVBbGxvd2VkIjp0cnVlLCJFZGl0QWxsb3dlZCI6dHJ1ZSwiTW92ZUFsbG93ZWQiOnRydWUsIkxhYmVsVG9vbHRpcCI6IiIsIklzUGVyc29uYWxpemVkIjpmYWxzZSwiV2lkZ2V0U2VnbWVudElkIjpudWxsLCJXaWRnZXRTdGF0ZSI6W3siS2V5IjoiNTY4NDgxY2EtNDVkYi00ZjAyLWE2MmUtZjc2MTIyNTMyOTAyIiwiTmFtZSI6IlNpdGVmaW5pdHlJbWFnZSIsIkFkZEFsbG93ZWQiOnRydWUsIkRlbGV0ZUFsbG93ZWQiOnRydWUsIkVkaXRBbGxvd2VkIjp0cnVlLCJNb3ZlQWxsb3dlZCI6dHJ1ZSwiTGFiZWxUb29sdGlwIjoiIiwiSXNQZXJzb25hbGl6ZWQiOmZhbHNlLCJXaWRnZXRTZWdtZW50SWQiOm51bGx9XSwiUHJvcGVydGllcyI6e30sIkNoaWxkcmVuIjpbXX0='
            },
            'isEdit': true,
            'isPreview': false,
            'isLive': false,
            'culture': 'en'

        };

        const component = await Image({ model, requestContext, metadata });
        const { container } = render(component as JSX.Element);

        await waitFor(() => {
            expect(container).toMatchSnapshot();
        });
    });
});

const metadata = {
    designerMetadata: {
        Name: 'SitefinityImage',
        Caption: 'Image',
        PropertyMetadata: [Array]
    },
    componentType: [Image],
    editorMetadata: {
        Title: 'Image',
        Section: 'Basic',
        EmptyIcon: 'picture-o',
        EmptyIconAction: 'Edit',
        EmptyIconText: 'Select image'
    },
    ssr: true
};
