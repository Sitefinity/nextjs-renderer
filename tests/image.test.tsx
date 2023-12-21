import { waitFor } from '@testing-library/react';
import { RenderType, WidgetTester } from './framework/widget-tester';
import { RestSdkTypes, RestService, SdkItem } from '../src/nextjs-framework/rest-sdk';
import fs from 'fs';
import { ImageEntity } from '../src/nextjs-framework/widgets/image/image';
import { ImageDisplayMode } from '../src/nextjs-framework/widgets/image/interfaces/ImageDisplayMode';
import { ImageClickAction } from '../src/nextjs-framework/widgets/image/interfaces/ImageClickAction';

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
        BinaryData: base64Image,
        Fields: {
            AlternativeText: 'ImageAlternativeText'
        }
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

test('image attributes rendered (Image_Attributes_Rendered)', async () => {
    await WidgetTester.testWidgetRender<ImageEntity>({
        name: 'SitefinityImage',
        properties: {
            Item: {
                Id: sdkItem.Id,
                Provider: sdkItem.Provider
            },
            FitToContainer: false,
            Attributes: {
                'Image': [{Key: 'test-attribute-key', Value: 'test-attribute-value'}, {Key: 'test-attribute-key-second', Value: 'test-attribute-value-second'}]
            },
            Title: 'custom title'
        },
        assert: async (element) => {
            await waitFor(() => {
                const imgElement = element.querySelector('img');
                expect(imgElement?.getAttribute('src')).toBeDefined();
                imgElement?.setAttribute('src', 'https://systemvalforsnapshot');

                const sourceElement = element.querySelector('source');
                expect(sourceElement?.getAttribute('srcset')).toBeDefined();
                sourceElement?.setAttribute('srcset', 'https://systemvalforsnapshot');

                expect(element).toMatchSnapshot();
            });
        }
    });
});

test('image margins rendered (Image_Margins_Rendered)', async () => {
    await WidgetTester.testWidgetRender<ImageEntity>({
        name: 'SitefinityImage',
        properties: {
            Item: {
                Id: sdkItem.Id,
                Provider: sdkItem.Provider
            },
            FitToContainer: false,
            ImageSize: ImageDisplayMode.OriginalSize,
            Margins: {
                Left: 'L',
                Bottom: 'M'
            },
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

test('image fit to container (Image_FitToContainer_Rendered)', async () => {
    await WidgetTester.testWidgetRender<ImageEntity>({
        name: 'SitefinityImage',
        properties: {
            Item: {
                Id: sdkItem.Id,
                Provider: sdkItem.Provider
            },
            FitToContainer: true,
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

test('responsive image (Image_Responsive_Rendered)', async () => {
    await WidgetTester.testWidgetRender<ImageEntity>({
        name: 'SitefinityImage',
        properties: {
            Item: {
                Id: sdkItem.Id,
                Provider: sdkItem.Provider
            },
            FitToContainer: true,
            ImageSize: ImageDisplayMode.Responsive,
            Title: 'custom title'
        },
        assert: async (element) => {
            await waitFor(() => {
                const sourceElement = element.querySelector('source');
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

test('responsive image should not be rendered (Image_Responsive_Source_Should_Not_Be_Rendered)', async () => {
    let libraryId = '4BA7AD46-F29B-4e65-BE17-9BF7CE5BA1FB';
    const base64Image = fs.readFileSync('./tests/data/2.jpg', { encoding: 'base64' });

    const secondImage = await RestService.uploadItem({
        Title: 'Image',
        UrlName: 'image-test',
        Type: RestSdkTypes.Image,
        ContentType: 'image/jpeg',
        FileName: 'test.jpg',
        ParentId: libraryId,
        BinaryData: base64Image
    });

    await WidgetTester.testWidgetRender<ImageEntity>({
        name: 'SitefinityImage',
        properties: {
            Item: {
                Id: secondImage.Id,
                Provider: secondImage.Provider
            },
            FitToContainer: true,
            ImageSize: ImageDisplayMode.Responsive,
            Title: 'custom title'
        },
        assert: async (element) => {
            await waitFor(() => {
                const sourceElement = element.querySelector('source');
                expect(sourceElement).toBeFalsy();

                const imgElement = element.querySelector('img');
                expect(imgElement?.getAttribute('src')).toBeDefined();
                imgElement?.setAttribute('src', 'https://systemvalforsnapshot');

                expect(element).toMatchSnapshot();
            });
        }
    });
});

test('image with custom size (Image_CustomSize_Rendered)', async () => {
    await WidgetTester.testWidgetRender<ImageEntity>({
        name: 'SitefinityImage',
        properties: {
            Item: {
                Id: sdkItem.Id,
                Provider: sdkItem.Provider
            },
            FitToContainer: false,
            ImageSize: ImageDisplayMode.CustomSize,
            Title: 'custom title',
            CustomSize: {
                Height: 60,
                Width: 50
            }
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

test('image with custom width only (Image_CustomWidthOnly_Rendered)', async () => {
    await WidgetTester.testWidgetRender<ImageEntity>({
        name: 'SitefinityImage',
        properties: {
            Item: {
                Id: sdkItem.Id,
                Provider: sdkItem.Provider
            },
            FitToContainer: false,
            ImageSize: ImageDisplayMode.CustomSize,
            Title: 'custom title',
            CustomSize: {
                Width: 50
            }
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

test('image title and alternative text do not fallback (ImageTitleAndAlternativeTextDoNotFallbackIfSet)', async () => {
    await WidgetTester.testWidgetRender<ImageEntity>({
        name: 'SitefinityImage',
        properties: {
            Item: {
                Id: sdkItem.Id,
                Provider: sdkItem.Provider
            },
            FitToContainer: false,
            ImageSize: ImageDisplayMode.CustomSize,
            Title: 'custom title',
            AlternativeText: 'custom alternative text',
            CustomSize: {
                Width: 50
            }
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

test('image title and alternative text fallback if not set (ImageTitleAndAlternativeTextFallbackIfNotSet)', async () => {
    await WidgetTester.testWidgetRender<ImageEntity>({
        name: 'SitefinityImage',
        properties: {
            Item: {
                Id: sdkItem.Id,
                Provider: sdkItem.Provider
            },
            FitToContainer: false,
            ImageSize: ImageDisplayMode.CustomSize,
            CustomSize: {
                Width: 50
            }
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

test('image as link should set margins to anchor (ImageAsLinkShouldSetMarginsToAnchor)', async () => {
    await WidgetTester.testWidgetRender<ImageEntity>({
        name: 'SitefinityImage',
        properties: {
            Item: {
                Id: sdkItem.Id,
                Provider: sdkItem.Provider
            },
            FitToContainer: false,
            ImageSize: ImageDisplayMode.Responsive,
            ClickAction: ImageClickAction.OpenLink,
            Margins: {
                Left: 'L',
                Bottom: 'M'
            },
            ActionLink: {
                href: 'www.tarator.oz'
            } as any
        },
        assert: async (element) => {
            await waitFor(() => {

                const sourceElement = element.querySelector('source');
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

test('render image in edit mode with responsive setting', async () => {
    await WidgetTester.testWidgetRender<ImageEntity>({
        name: 'SitefinityImage',
        properties: {
            Item: {
                Id: sdkItem.Id,
                Provider: sdkItem.Provider
            },
            FitToContainer: false,
            ImageSize: ImageDisplayMode.Responsive
        },
        render: RenderType.Edit,
        assert: async (element) => {
            await waitFor(() => {

                const actualElement = element.querySelector('[data-sfid]');
                actualElement?.setAttribute('data-sfid', 'static');

                const sourceElement = element.querySelector('source');
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

test('render image in edit mode with original size', async () => {
    await WidgetTester.testWidgetRender<ImageEntity>({
        name: 'SitefinityImage',
        properties: {
            Item: {
                Id: sdkItem.Id,
                Provider: sdkItem.Provider
            },
            FitToContainer: false,
            ImageSize: ImageDisplayMode.OriginalSize
        },
        render: RenderType.Edit,
        assert: async (element) => {
            await waitFor(() => {
                const actualElement = element.querySelector('[data-sfid]');
                actualElement?.setAttribute('data-sfid', 'static');

                const imgElement = element.querySelector('img');
                expect(imgElement?.getAttribute('src')).toBeDefined();
                imgElement?.setAttribute('src', 'https://systemvalforsnapshot');

                expect(element).toMatchSnapshot();
            });
        }
    });
});
