
import { waitFor } from '@testing-library/react';
import { WidgetTester } from './framework/widget-tester';
import { RestSdkTypes, RestService, SdkItem } from '../src/nextjs-framework/rest-sdk';
import { CreateArgs } from '../src/nextjs-framework/rest-sdk/services/args/create-args';


test('Content block render Content property', async () => {
    await WidgetTester.testWidgetRender({
        name: 'SitefinityContentBlock',
        properties: {
            Content: 'c11'
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

// beforeAll(async () => {
//     const originalFunc = RestService.createItem;
//     RestService.createItem = async (args: CreateArgs) => {
//         const actualResult = await originalFunc(args);
//         createdItems.push({ type: args.Type, id: actualResult.Id });

//         return actualResult as any;
//     };
// });

// afterEach(async () => {
//     for (let i = 0; i < createdItems.length; i++) {
//         const createdItem = createdItems[i];
//         await RestService.deleteItem({
//             Id: createdItem.id,
//             Type: createdItem.type
//         });

//     }
// });
