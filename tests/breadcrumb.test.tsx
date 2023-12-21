import { WidgetTester } from './framework/widget-tester';
import { BreadcrumbEntity } from '../src/nextjs-framework/widgets/breadcrumb/breadcrumb.entity';

test('default behavior (RenderDefaultBehavior)', async () => {

    await WidgetTester.testWidgetRender<BreadcrumbEntity>({
        name: 'SitefinityBreadcrumb',
        pageTitle: 'current page',
        assert: async (element) => {
            const listWithItems = element.getElementsByTagName('ol')[0];
            const items = listWithItems.getElementsByTagName('li');

            expect(items.length).toEqual(2);

            const homePageLink = items[0].getElementsByTagName('a');
            expect(homePageLink).toBeTruthy();

            expect(items[1].innerHTML).toContain('current page');
        }
    });
});

test('render without home page (RenderWithoutHomePage)', async () => {

    await WidgetTester.testWidgetRender<BreadcrumbEntity>({
        name: 'SitefinityBreadcrumb',
        properties: {
            AddHomePageLinkAtBeginning: false
        },
        pageTitle: 'current page',
        assert: async (element) => {
            const listWithItems = element.getElementsByTagName('ol')[0];
            const items = listWithItems.getElementsByTagName('li');

            expect(items.length).toEqual(1);

            const homePageLink = element.getElementsByTagName('a');
            expect(homePageLink.length).toBe(0);

            expect(items[0].innerHTML).toContain('current page');
        }
    });
});

test('render without current page (RenderWithoutCurrentPage)', async () => {

    await WidgetTester.testWidgetRender<BreadcrumbEntity>({
        name: 'SitefinityBreadcrumb',
        properties: {
            AddCurrentPageLinkAtTheEnd: false
        },
        pageTitle: 'current page custom',
        assert: async (element) => {
            const listWithItems = element.getElementsByTagName('ol')[0];
            const items = listWithItems.getElementsByTagName('li');

            expect(items.length).toEqual(1);

            const homePageLink = items[0].getElementsByTagName('a');
            expect(homePageLink).toBeTruthy();

            expect(element.innerHTML).not.toContain('current page custom');
        }
    });
});

test('render margins and attributes (RenderMarginsAndAttributes)', async () => {

    await WidgetTester.testWidgetRender<BreadcrumbEntity>({
        name: 'SitefinityBreadcrumb',
        properties: {
            Margins: {
                Top: 'L',
                Bottom: 'M'
            } as any,
            Attributes: {
                'Breadcrumb': [{ Key: 'test-attribute-key', Value: 'test-attribute-value' }]
            }
        },
        pageTitle: 'current page custom',
        assert: async (element) => {
            const containerElement = element.querySelector('div[test-attribute-key=\'test-attribute-value\']');
            expect(containerElement).toBeTruthy();

            expect(containerElement?.className).toContain('mt-5 mb-4');
        }
    });
});
