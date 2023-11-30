import { WidgetMetadata } from './widget-metadata';

export class WidgetRegistry {
    static get widgets(): { [key: string]: WidgetMetadata } | null {
        return null;
    }
}
