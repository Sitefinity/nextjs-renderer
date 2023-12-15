
import { waitFor } from '@testing-library/react';
import { WidgetTester } from './framework/widget-tester';
import { RestSdkTypes, RestService } from '../src/nextjs-framework/rest-sdk';
import fs from 'fs';


test('Image with selected image item', async () => {
    const base64Image = fs.readFileSync('./tests/data/1.jpg', { encoding: 'base64' });

    let libraryId = '4BA7AD46-F29B-4e65-BE17-9BF7CE5BA1FB';
    const imageItem = await RestService.uploadItem({
        Title: 'Image',
        Type: RestSdkTypes.Image,
        ContentType: 'image/jpeg',
        FileName: 'test.jpg',
        ParentId: libraryId,
        BinaryData: base64Image
    });

    await WidgetTester.testWidgetRender({
        name: 'SitefinityImage',
        properties: {
            Item: {
                Id: imageItem.Id,
                Provider: imageItem.Provider
            }
        },
        assert: async (element) => {
            await waitFor(() => {
                const sourceElement = element.querySelector('source');

                // remove dynamic elements from snapshot assert
                expect(sourceElement?.getAttribute('srcset')).toBeDefined();
                sourceElement?.removeAttribute('srcset');

                const imgElement = element.querySelector('img');
                expect(imgElement?.getAttribute('src')).toBeDefined();
                imgElement?.removeAttribute('src');

                expect(element).toMatchSnapshot();
            });
        }
    });
});
