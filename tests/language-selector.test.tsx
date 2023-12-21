import { render, waitFor } from '@testing-library/react';
import { LanguageSelector } from '../src/nextjs-framework/widgets/language-selector/language-selector';

// Skipped becase of https://github.com/Sitefinity/nextjs-renderer/issues/32
describe('should render language selector', () => {
    it.skip('default state', async () => {
        const model = {
            '@odata.context': 'https://localhost:5001/sf/system/$metadata#Telerik.Sitefinity.Renderer.Editor.HierarchicalWidgetModelResponse',
            'Id': '2b364251-f1ac-4b56-8f8e-94a5e5b15877',
            'SiblingId': '00000000-0000-0000-0000-000000000000',
            'Name': 'LanguageSelector',
            'PlaceHolder': 'Column1',
            'Caption': null,
            'ViewName': null,
            'Lazy': false,
            'Key': '2b364251-f1ac-4b56-8f8e-94a5e5b15877',
            'AddAllowed': false,
            'DeleteAllowed': true,
            'EditAllowed': true,
            'MoveAllowed': true,
            'LabelTooltip': '',
            'IsPersonalized': false,
            'WidgetSegmentId': null,
            'WidgetState': [
                {
                    'Key': '2b364251-f1ac-4b56-8f8e-94a5e5b15877',
                    'Name': 'LanguageSelector',
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
                'model': 'eyJAb2RhdGEuY29udGV4dCI6Imh0dHBzOi8vbG9jYWxob3N0OjUwMDEvc2Yvc3lzdGVtLyRtZXRhZGF0YSNUZWxlcmlrLlNpdGVmaW5pdHkuUmVuZGVyZXIuRWRpdG9yLkhpZXJhcmNoaWNhbFdpZGdldE1vZGVsUmVzcG9uc2UiLCJJZCI6IjJiMzY0MjUxLWYxYWMtNGI1Ni04ZjhlLTk0YTVlNWIxNTg3NyIsIlNpYmxpbmdJZCI6IjAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMCIsIk5hbWUiOiJMYW5ndWFnZVNlbGVjdG9yIiwiUGxhY2VIb2xkZXIiOiJDb2x1bW4xIiwiQ2FwdGlvbiI6bnVsbCwiVmlld05hbWUiOm51bGwsIkxhenkiOmZhbHNlLCJLZXkiOiIyYjM2NDI1MS1mMWFjLTRiNTYtOGY4ZS05NGE1ZTViMTU4NzciLCJBZGRBbGxvd2VkIjpmYWxzZSwiRGVsZXRlQWxsb3dlZCI6dHJ1ZSwiRWRpdEFsbG93ZWQiOnRydWUsIk1vdmVBbGxvd2VkIjp0cnVlLCJMYWJlbFRvb2x0aXAiOiIiLCJJc1BlcnNvbmFsaXplZCI6ZmFsc2UsIldpZGdldFNlZ21lbnRJZCI6bnVsbCwiV2lkZ2V0U3RhdGUiOlt7IktleSI6IjJiMzY0MjUxLWYxYWMtNGI1Ni04ZjhlLTk0YTVlNWIxNTg3NyIsIk5hbWUiOiJMYW5ndWFnZVNlbGVjdG9yIiwiQWRkQWxsb3dlZCI6dHJ1ZSwiRGVsZXRlQWxsb3dlZCI6dHJ1ZSwiRWRpdEFsbG93ZWQiOnRydWUsIk1vdmVBbGxvd2VkIjp0cnVlLCJMYWJlbFRvb2x0aXAiOiIiLCJJc1BlcnNvbmFsaXplZCI6ZmFsc2UsIldpZGdldFNlZ21lbnRJZCI6bnVsbH1dLCJQcm9wZXJ0aWVzIjp7fSwiQ2hpbGRyZW4iOltdfQ=='
            },
            'isEdit': true,
            'isPreview': false,
            'isLive': false,
            'culture': 'en'
        };

        const component = await LanguageSelector({ model, requestContext, metadata });
        const { container } = render(component as JSX.Element);

        await waitFor(() => {
            expect(container).toMatchSnapshot();
        });
    });
});

const metadata = {
    designerMetadata: {
        Name: 'LanguageSelector',
        Caption: 'Language selector',
        PropertyMetadata: [Array]
    },
    componentType: [LanguageSelector],
    editorMetadata: { Title: 'Language Selector' },
    ssr: true
};
