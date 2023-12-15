
import { waitFor } from '@testing-library/react';
import { RenderType, WidgetTester } from './framework/widget-tester';
import { RestSdkTypes, RestService } from '../src/nextjs-framework/rest-sdk';
import { ContentBlockEntity } from '../src/nextjs-framework/widgets';

test('Content block render Content property', async () => {
    await WidgetTester.testWidgetRender<ContentBlockEntity>({
        name: 'SitefinityContentBlock',
        properties: {
            Content: 'Test content'
        },
        pageTitle: 'Content block render Content property',
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

    await WidgetTester.testWidgetRender<ContentBlockEntity>({
        name: 'SitefinityContentBlock',
        properties: {
            SharedContentID: contentItem.Id
        },
        pageTitle: 'Content block render with Content item',
        assert: async (element) => {
            await waitFor(() => {
                expect(element).toMatchSnapshot();
            });
        }
    });
});

test('Content block html metadata assert during edit', async () => {
    await WidgetTester.testWidgetRender<ContentBlockEntity>({
        name: 'SitefinityContentBlock',
        properties: {
            Content: 'Test content'
        },
        pageTitle: 'Content block html metadata assert during edit',
        assert: (element) => {
            const actualElement = element.querySelector('[data-sfid]');
            actualElement?.setAttribute('data-sfid', 'static');
            expect(element).toMatchSnapshot();
        },
        render: RenderType.Edit
    });
});
