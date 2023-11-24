import { htmlAttributes } from '@/framework/editor/widgets/attributes';
import { WidgetContext } from '@/framework/editor/widgets/widget-context';
import { RestService } from '@/framework/rest-sdk/rest-service';
import React from 'react';

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

export class ContentBlockEntity {
    Content!: string;
    ExcludeFromSearchIndex!: boolean;
    ProviderName!: string;
    SharedContentID!: string;
    WrapperCssClass!: string;
}
