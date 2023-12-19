import { waitFor } from '@testing-library/react';
import { WidgetTester } from './framework/widget-tester';
import { RestSdkTypes, RestService, SdkItem } from '../src/nextjs-framework/rest-sdk';
import fs from 'fs';
import { ImageEntity } from '../src/nextjs-framework/widgets/image/image';
import { ImageDisplayMode } from '../src/nextjs-framework/widgets/image/interfaces/ImageDisplayMode';

let sdkItem: SdkItem;
beforeEach(async () => {
    const base64Image = fs.readFileSync('./tests/data/1.jpg', { encoding: 'base64' });

    let libraryId = '4BA7AD46-F29B-4e65-BE17-9BF7CE5BA1FB';
    sdkItem = await RestService.uploadItem({
        Title: 'Image',
        UrlName: 'image-test',
        Type: RestSdkTypes.Image,
        ContentType: 'image/jpeg',
        FileName: 'test.jpg',
        ParentId: libraryId,
        BinaryData: base64Image
    });
});

test('Image rendered with original size', async () => {
    await WidgetTester.testWidgetRender<ImageEntity>({
        name: 'SitefinityImage',
        properties: {
            Item: {
                Id: sdkItem.Id,
                Provider: sdkItem.Provider
            },
            FitToContainer: false,
            ImageSize: ImageDisplayMode.OriginalSize,
            Title: 'custom title'
        },
        assert: async (element) => {
            await waitFor(() => {
                const imgElement = element.querySelector('img');
                expect(imgElement?.getAttribute('src')).toBeDefined();
                imgElement?.setAttribute('src', 'https://systemvalforsnapshot');
                expect(element).toMatchSnapshot();
            });
        }
    });
});

test('Image with selected image item', async () => {
    await WidgetTester.testWidgetRender({
        name: 'SitefinityImage',
        properties: {
            Item: {
                Id: sdkItem.Id,
                Provider: sdkItem.Provider
            }
        },
        assert: async (element) => {
            await waitFor(() => {
                const sourceElement = element.querySelector('source');

                // remove dynamic elements from snapshot assert
                expect(sourceElement?.getAttribute('srcset')).toBeDefined();
                sourceElement?.setAttribute('srcset', 'https://systemvalforsnapshot');

                const imgElement = element.querySelector('img');
                expect(imgElement?.getAttribute('src')).toBeDefined();
                imgElement?.setAttribute('src', 'https://systemvalforsnapshot');

                expect(element).toMatchSnapshot();
            });
        }
    });
});
