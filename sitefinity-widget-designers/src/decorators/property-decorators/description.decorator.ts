import { keys } from '../../symbols/known-keys';
import { WidgetMetadata } from '../../metadata/widget-metadata';
import { PropertyDecoratorBase } from './common/property-decorator-wrapper';

export function Description(description: string): any;
export function Description(description: RichDescription[]): any;
export function Description(description: string | RichDescription[], inlineDescription?: string, instructionalNotes?: string ) {
    const data: { [key: string]: any } = {
        Description: description
    };

    if (inlineDescription) {
        data['InlineDescription'] = inlineDescription;
    }

    if (instructionalNotes) {
        data['InstructionalNotes'] = instructionalNotes;
    }

    return PropertyDecoratorBase((target: any, propName: string) => {
        if (Array.isArray(description)) {
            description = JSON.stringify(description);
        }

        WidgetMetadata.registerPropertyMetadata(target, propName, keys.description, data);
    });
}

export interface RichDescription {
    Type: number;
    Chunks: { Value: string, Presentation: number[]}[];
}
