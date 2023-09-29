import { RenderWidgetService } from "../services/render-widget-service";
import { RequestContext } from "../services/request-context";
import { EditorMetadata } from "./widget-editor-metadata";

export interface WidgetMetadata {
    componentType: any;
    designerMetadata: any;
    selectorCategory?: string;
    editorMetadata?: EditorMetadata
}
