import { keys } from '../../symbols/known-keys';
import { PropertyDecoratorBase } from './common/property-decorator-wrapper';
import { WidgetMetadata } from '../../metadata/widget-metadata';

export function ColorPalette(paletteName: string, stylingConfig: any) {
    const colors = stylingConfig.ColorPalettes[paletteName]?.Colors;

    return PropertyDecoratorBase((target: any, propName: string) => {
        if (colors) {
            WidgetMetadata.registerPropertyMetadata(target, propName, keys.colorPaletteColors, { [keys.colorPaletteColors]: colors.join(',') });
        }
    });
}
