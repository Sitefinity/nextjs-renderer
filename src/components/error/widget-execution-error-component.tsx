import React from "react";
import { htmlAttributes } from "sitefinity-react-framework/widgets/attributes";
import { WidgetContext } from "sitefinity-react-framework/widgets/widget-context";

export async function WidgetExecutionError(props: { error: string, context: WidgetContext<any>}) {
    const dataAttributes = htmlAttributes(props.context, props.error);

    return (
        <div {...dataAttributes as any} />
    );
}

