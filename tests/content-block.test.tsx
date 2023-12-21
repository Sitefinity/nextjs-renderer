
import { waitFor } from '@testing-library/react';
import { RenderType, WidgetTester } from './framework/widget-tester';
import { RestSdkTypes, RestService } from '../src/nextjs-framework/rest-sdk';
import { ContentBlockEntity } from '../src/nextjs-framework/widgets/content-block/content-block.entity';

test('Content block render Content property', async () => {
    await WidgetTester.testWidgetRender<ContentBlockEntity>({
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

    await WidgetTester.testWidgetRender<ContentBlockEntity>({
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
    await WidgetTester.testWidgetRender<ContentBlockEntity>({
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

test('Content block with custom tag name(CB_TagName_Rendered)', async () => {
    await WidgetTester.testWidgetRender<ContentBlockEntity>({
        name: 'SitefinityContentBlock',
        properties: {
            Content: 'Test content',
            TagName: 'h1'
        },
        assert: (element) => {
            expect(element).toMatchSnapshot();
        }
    });
});

test('Content block with custom attributes', async () => {
    await WidgetTester.testWidgetRender<ContentBlockEntity>({
        name: 'SitefinityContentBlock',
        properties: {
            Content: 'Test content',
            Attributes: {
                'SitefinityContentBlock': [
                    {
                        Key: 'test-attribute-key',
                        Value: 'test-attribute-value'
                    }
                ]
            }
        },
        assert: (element) => {
            expect(element).toMatchSnapshot();
        }
    });
});

