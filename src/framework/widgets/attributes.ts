import { WidgetContext } from "./widget-context";

export function htmlAttributes(widgetContext: WidgetContext<any>, error: string | undefined = undefined) {
    const model = widgetContext.model;
    const attributes: any = {
        "data-sfname": model.Name,
        "data-sftitle": widgetContext.metadata?.editorMetadata?.Title || model.Name,
        "data-sfid" : model.Id,
        "data-sfisorphaned": false
    }

    const editorMetadata = widgetContext.metadata?.editorMetadata;
    if (editorMetadata) {
        if (editorMetadata.EmptyIcon) {
            attributes["data-sfemptyicon"] = editorMetadata.EmptyIcon;
        }

        if (editorMetadata.EmptyIconAction) {
            attributes["data-sfemptyiconaction"] = editorMetadata.EmptyIconAction;
        }

        if (editorMetadata.EmptyIconText) {
            attributes["data-sfemptyicontext"] = editorMetadata.EmptyIconText;
        }
    }

    attributes["data-sfiscontentwidget"] = widgetContext.metadata?.selectorCategory !== "Layout";
    attributes["data-sfisemptyvisualhidden"] = false;

    if (error) {
        attributes["data-sferror"] = error;
    }

    return attributes;
}
