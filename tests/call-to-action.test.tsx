import { waitFor } from '@testing-library/react';
import { RenderType, WidgetTester } from './framework/widget-tester';
import { CallToActionEntity } from '../src/nextjs-framework/widgets/call-to-action/call-to-action.entity';
import { StylingConfig } from '../src/nextjs-framework/widgets/styling/styling-config';

beforeEach(() => {
    StylingConfig.ButtonClasses['Primary'].Value = 'btn btn-primary';
});

test('primary class overriden (Button_PrimaryClass_Overriden)', async () => {
    const originalValue = StylingConfig.ButtonClasses['Primary'].Value;
    StylingConfig.ButtonClasses['Primary'].Value = 'btn asd';

    await WidgetTester.testWidgetRender<CallToActionEntity>({
        name: 'SitefinityButton',
        properties: {
            PrimaryActionLabel: 'Primary Label',
            PrimaryActionLink: {
                href: 'kisela-krastavichka.jpg'
            } as any
        },
        assert: async (element) => {
            await waitFor(() => {
                expect(element).toMatchSnapshot();
            });
        }
    });

    StylingConfig.ButtonClasses['Primary'].Value = originalValue;
});

test('primary button rendered (Button_PrimaryOnly_Rendered)', async () => {
    await WidgetTester.testWidgetRender<CallToActionEntity>({
        name: 'SitefinityButton',
        properties: {
            PrimaryActionLabel: 'Primary Label',
            PrimaryActionLink: {
                href: 'kisela-krastavichka.jpg',
                queryParams: 'a=b',
                anchor: 'c'
            } as any
        },
        assert: async (element) => {
            await waitFor(() => {
                expect(element).toMatchSnapshot();
            });
        }
    });
});

test('secondary button rendered (Button_SecondaryOnly_Rendered)', async () => {
    await WidgetTester.testWidgetRender<CallToActionEntity>({
        name: 'SitefinityButton',
        properties: {
            SecondaryActionLabel: 'Secondary Label',
            SecondaryActionLink: {
                href: 'kisela-krastavichka.jpg'
            } as any
        },
        assert: async (element) => {
            await waitFor(() => {
                expect(element).toMatchSnapshot();
            });
        }
    });
});

test('both buttons rendered (Button_Both_Rendered)', async () => {
    await WidgetTester.testWidgetRender<CallToActionEntity>({
        name: 'SitefinityButton',
        properties: {
            PrimaryActionLabel: 'Primary Label',
            PrimaryActionLink: {
                href: 'kisela-krastavichka.jpg'
            } as any,
            SecondaryActionLabel: 'Secondary Label',
            SecondaryActionLink: {
                href: 'kisela-krastavichka-2.jpg'
            } as any
        },
        assert: async (element) => {
            await waitFor(() => {
                expect(element).toMatchSnapshot();
            });
        }
    });
});

test('button styling (Button_Styling_Rendered)', async () => {
    await WidgetTester.testWidgetRender<CallToActionEntity>({
        name: 'SitefinityButton',
        properties: {
            PrimaryActionLabel: 'Primary Label',
            PrimaryActionLink: {
                href: 'kisela-krastavichka.jpg'
            } as any,
            Style: {
                Primary: {
                    DisplayStyle: 'Secondary'
                }
            },
            Position: {
                CTA: {
                    Alignment: 'Center'
                }
            }
        },
        assert: async (element) => {
            await waitFor(() => {
                expect(element).toMatchSnapshot();
            });
        }
    });
});

test('button margins rendered (Button_Margins_Rendered)', async () => {
    await WidgetTester.testWidgetRender<CallToActionEntity>({
        name: 'SitefinityButton',
        properties: {
            PrimaryActionLabel: 'Primary Label',
            PrimaryActionLink: {
                href: 'kisela-krastavichka.jpg'
            } as any,
            Margins: {
                Left: 'L',
                Bottom: 'M'
            } as any
        },
        assert: async (element) => {
            await waitFor(() => {
                expect(element).toMatchSnapshot();
            });
        }
    });
});

test('button attributes rendered (Button_Attributes_Rendered)', async () => {
    await WidgetTester.testWidgetRender<CallToActionEntity>({
        name: 'SitefinityButton',
        properties: {
            PrimaryActionLabel: 'Primary Label',
            PrimaryActionLink: {
                href: 'kisela-krastavichka.jpg'
            } as any,
            SecondaryActionLabel: 'Secondary Label',
            SecondaryActionLink: {
                href: 'kisela-krastavichka-2.jpg'
            } as any,
            Attributes: {
                Wrapper: [{
                    Key: 'wrapper-attribute-key',
                    Value: 'rapper-attribute-value'
                }],
                Primary: [{
                    Key: 'primary-attribute-key',
                    Value: 'primary-attribute-value'
                }],
                Secondary: [{
                    Key: 'secondary-attribute-key',
                    Value: 'secondary-attribute-value'
                }]
            }
        },
        assert: async (element) => {
            await waitFor(() => {
                expect(element).toMatchSnapshot();
            });
        }
    });
});
