import { WidgetMetadata } from "./widget-metadata"

export interface WidgetRegistry {
    widgets: {
        [key: string]: WidgetMetadata
    }
}