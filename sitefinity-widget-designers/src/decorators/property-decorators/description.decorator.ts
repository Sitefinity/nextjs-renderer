import { keys } from '../../symbols/known-keys';
import { WidgetMetadata } from '../../metadata/widget-metadata';
import { PropertyDecoratorBase } from './common/property-decorator-wrapper';

export function Description(description: string): any;
export function Description(description: RichDescription[]): any;
export function Description(description?: string | RichDescription[]) {
    return PropertyDecoratorBase((target: any, propName: string) => {
        const data: { [key: string]: any } = {};

        if (description) {
            if (typeof(description) === 'object' && description != null) {
                description = JSON.stringify(description);
            }
            data['Description'] = description;
        }

        WidgetMetadata.registerPropertyMetadata(target, propName, keys.description, data);
    });
}

export class DescriptionExtenedSettings {
    Description?: string = '';

    InlineDescription?: string = '';

    InstructionalNotes?: string | null = null;
}

export function DescriptionExtened(descriptionSettings: DescriptionExtenedSettings) {
    return PropertyDecoratorBase((target: any, propName: string) => {
        const data: DescriptionExtenedSettings = new DescriptionExtenedSettings();
        WidgetMetadata.registerPropertyMetadata(target, propName, keys.description, Object.assign(data, descriptionSettings));
    });
}

export interface RichDescription {
    Type: number;
    Chunks: { Value: string, Presentation: number[]}[];
}
