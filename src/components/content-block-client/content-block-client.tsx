'use client';

import React, { useEffect } from "react";
import { htmlAttributes } from "sitefinity-react-framework/widgets/attributes";
import { RestService } from "sitefinity-react-framework/sdk/rest-service";
import { WidgetContext } from "sitefinity-react-framework/widgets/widget-context";
import { ContentBlockEntity } from "../content-block/content-block";

export function ContentBlockClient(props: WidgetContext<ContentBlockEntity>) {
    const [content, setContent] = React.useState(props.model.Properties.Content);
    const dataAttributes = htmlAttributes(props);
    if (props.model.Properties.WrapperCssClass)
        dataAttributes["className"] = props.model.Properties.WrapperCssClass;

    useEffect(() => {
        if (props.model.Properties && props.model.Properties.SharedContentID) {
            RestService.getSharedContent(props.model.Properties.SharedContentID, props.requestContext.culture).then((contentItem) => {
                setContent(contentItem.Content);
            });
        }
    }, [props.model.Properties, props.requestContext.culture]);

    return (
        <div {...dataAttributes as any} dangerouslySetInnerHTML={{ __html: content || "" }} />
    );
}
