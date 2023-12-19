import { EditorMetadata } from './widget-editor-metadata';

export interface WidgetMetadata {
    componentType: any;
    designerMetadata: any;
    editorMetadata?: EditorMetadata;
    ssr?: boolean;
}
