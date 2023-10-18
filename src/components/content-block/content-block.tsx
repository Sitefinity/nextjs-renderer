import React from "react";
import { htmlAttributes } from "sitefinity-react-framework/widgets/attributes";
import { RestService } from "sitefinity-react-framework/sdk/rest-service";
import { WidgetContext } from "sitefinity-react-framework/widgets/widget-context";

export async function ContentBlock(props: WidgetContext<ContentBlockEntity>) {

    const dataAttributes = htmlAttributes(props);
    if (props.model.Properties.WrapperCssClass)
        dataAttributes["className"] = props.model.Properties.WrapperCssClass;

    let content = props.model.Properties.Content;
    if (props.model.Properties && props.model.Properties.SharedContentID) {
        const contentItem = await RestService.getSharedContent(props.model.Properties.SharedContentID, props.requestContext.culture);
        content = contentItem.Content;
    }

    return (
        <div {...dataAttributes as any} dangerouslySetInnerHTML={{ __html: content || "" }} />
    );
}

export class ContentBlockEntity {
    Content!: string;
    ExcludeFromSearchIndex!: boolean;
    ProviderName!: string;
    SharedContentID!: string;
    WrapperCssClass!: string;
}
