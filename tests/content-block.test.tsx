
import { waitFor } from '@testing-library/react';
import { RenderType, WidgetTester } from './framework/widget-tester';
import { RestSdkTypes, RestService } from '../src/nextjs-framework/rest-sdk';


test('Content block render Content property', async () => {
    await WidgetTester.testWidgetRender({
        name: 'SitefinityContentBlock',
        properties: {
            Content: 'Test content'
        },
        assert: async (element) => {
            await waitFor(() => {
                expect(element).toMatchSnapshot();
            });
        }
    });
});

test('Content block render with Content item', async () => {
    const contentItem = await RestService.createItem({
        Type: RestSdkTypes.GenericContent,
        Data: {
            Title: 'Test content block',
            Content: 'Test content block content'
        }
    });

    await WidgetTester.testWidgetRender({
        name: 'SitefinityContentBlock',
        properties: {
            SharedContentID: contentItem.Id
        },
        assert: async (element) => {
            await waitFor(() => {
                expect(element).toMatchSnapshot();
            });
        }
    });
});

test('Content block html metadata assert during edit', async () => {
    await WidgetTester.testWidgetRender({
        name: 'SitefinityContentBlock',
        properties: {
            Content: 'Test content'
        },
        assert: (element) => {
            const actualElement = element.querySelector('[data-sfid]');
            actualElement?.setAttribute('data-sfid', 'static');
            expect(element).toMatchSnapshot();
        },
        render: RenderType.Edit
    });
});
