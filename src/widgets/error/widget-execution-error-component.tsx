import { htmlAttributes } from '@/framework/editor/widgets/attributes';
import { WidgetContext } from '@/framework/editor/widgets/widget-context';
import React from 'react';


export async function WidgetExecutionError(props: { error: string, context: WidgetContext<any>}) {
    const dataAttributes = htmlAttributes(props.context, props.error);

    return (
      <div {...dataAttributes as any} />
    );
}

