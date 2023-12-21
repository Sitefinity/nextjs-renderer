
import React from 'react';
import { WidgetContext, htmlAttributes } from '../../editor';
import { RestService } from '../../rest-sdk';
import { ContentBlockEntity } from './content-block.entity';

export async function ContentBlock(props: WidgetContext<ContentBlockEntity>) {
    const dataAttributes = htmlAttributes(props);
    if (props.model.Properties.WrapperCssClass) {
        dataAttributes['className'] = props.model.Properties.WrapperCssClass;
    }

    let content = props.model.Properties.Content;
    if (props.model.Properties && props.model.Properties.SharedContentID) {
        const contentItem = await RestService.getSharedContent(props.model.Properties.SharedContentID, props.requestContext.culture);
        content = contentItem.Content;
    }

    return (
      <div {...dataAttributes as any} dangerouslySetInnerHTML={{ __html: content || '' }} />
    );
}
