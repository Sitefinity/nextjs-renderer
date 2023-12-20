import { waitFor } from '@testing-library/react';
import { RenderType, WidgetTester } from './framework/widget-tester';
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

test('image rendered with original size', async () => {
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

test('image with selected image item(Image_OriginalSize_Rendered)', async () => {
    await WidgetTester.testWidgetRender<ImageEntity>({
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

test('removed image throws exception (RemovedImage_Throws_Exception)', async () => {
    await WidgetTester.testWidgetRender<ImageEntity>({
        name: 'SitefinityImage',
        properties: {
            Item: {
                Id: '30668382-47d9-4363-ab90-8c3ac70b87e9',
                Provider: sdkItem.Provider
            }
        },
        render: RenderType.Edit,
        errorMessage: 'You are trying to access MediaContent item with id 30668382-47d9-4363-ab90-8c3ac70b87e9 that no longer exists. The most probable reason is that it has been deleted by another user'
    });
});

test('image css class rendered (Image_CssClass_Rendered)', async () => {
    await WidgetTester.testWidgetRender<ImageEntity>({
        name: 'SitefinityImage',
        properties: {
            Item: {
                Id: sdkItem.Id,
                Provider: sdkItem.Provider
            },
            FitToContainer: false,
            CssClass: 'myclass',
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
