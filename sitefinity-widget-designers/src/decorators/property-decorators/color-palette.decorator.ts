import { keys } from '../../symbols/known-keys';
import { PropertyDecoratorBase } from './common/property-decorator-wrapper';
import { WidgetMetadata } from '../../metadata/widget-metadata';

/**
 * Defines the color palette for the property.
 * @param {string} paletteName The name of the chosen palette
 * @param stylingConfig A styling config that would hold the defined color values
 */
export function ColorPalette(paletteName: string, stylingConfig: any) {
    const colors = stylingConfig.ColorPalettes[paletteName]?.Colors;

    return PropertyDecoratorBase((target: any, propName: string) => {
        if (colors) {
            WidgetMetadata.registerPropertyMetadata(target, propName, keys.colorPaletteColors, { [keys.colorPaletteColors]: colors.join(',') });
        }
    });
}
