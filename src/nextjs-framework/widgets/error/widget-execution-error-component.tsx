
import React from 'react';
import { WidgetContext, htmlAttributes } from '../../editor';


export async function WidgetExecutionError(props: { error: string, context: WidgetContext<any>}) {
    const dataAttributes = htmlAttributes(props.context, props.error);

    return (
      <div {...dataAttributes as any} />
    );
}

