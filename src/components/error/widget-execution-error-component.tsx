import React from "react";
import { WidgetContext } from "sitefinity-react-framework/widgets/widget-context";
import { htmlAttributes } from "sitefinity-react-framework/widgets/attributes";


export async function WidgetExecutionError(props: { error: string, context: WidgetContext<any>}) {
    const dataAttributes = htmlAttributes(props.context, props.error);

    return (
        <div {...dataAttributes as any} />
    );
}

