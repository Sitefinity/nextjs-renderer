import { htmlAttributes } from '@progress/sitefinity-react-framework';
import { WidgetContext } from '@progress/sitefinity-react-framework';
import React from 'react';


export async function WidgetExecutionError(props: { error: string, context: WidgetContext<any>}) {
    const dataAttributes = htmlAttributes(props.context, props.error);

    return (
      <div {...dataAttributes as any} />
    );
}

