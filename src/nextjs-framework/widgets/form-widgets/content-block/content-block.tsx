import React from 'react';
import { WidgetContext, htmlAttributes } from '../../../editor';
import { ContentBlock } from '../../content-block/content-block';

export async function FormContentBlock(props: WidgetContext<any>) {
    const dataAttributes = htmlAttributes(props);
    const defaultRendering = (<ContentBlock {...props} />);
    return (props.requestContext.isEdit
        ? <div {...dataAttributes}> {defaultRendering} </div>
        :defaultRendering);
}

export interface ContentBlockEntity {
}
