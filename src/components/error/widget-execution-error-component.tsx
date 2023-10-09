import React from "react";
import { htmlAttributes } from "@/framework/widgets/attributes";
import { WidgetContext } from "@/framework/widgets/widget-context";

export async function WidgetExecutionError(props: { error: string, context: WidgetContext<any>}) {
    const dataAttributes = htmlAttributes(props.context, props.error);

    return (
        <div {...dataAttributes as any} />
    );
}

