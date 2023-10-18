'use client'

import React from "react";

import { Button } from "@progress/kendo-react-buttons";
import { RestService } from "sitefinity-react-framework/sdk/rest-service";
import { htmlAttributes } from "sitefinity-react-framework/widgets/attributes";
import { MixedContentContext } from "sitefinity-react-framework/widgets/entities/mixed-content-context";
import { WidgetContext } from "sitefinity-react-framework/widgets/widget-context";

export function ButtonComponent(props: WidgetContext<ButtonEntity>) {
    const dataAttributes = htmlAttributes(props);
    const onClick = async () => {
        if (props.model.Properties.Pages) {
            const page =  await RestService.getItem("Telerik.Sitefinity.Pages.Model.PageNode", props.model.Properties.Pages.ItemIdsOrdered[0], '');
            window.location.href = page.ViewUrl;
        } else if (props.requestContext.isPreview) {
            alert('No page configured');
        }
    };

    return (
        <div {...dataAttributes} >
            <Button onClick={onClick} themeColor={props.model.Properties.ThemeColor} icon={props.model.Properties.Icon}>{props.model.Properties.Text}</Button>
        </div>
    );
}


interface ButtonEntity {
    Text: string,
    Icon: string,
    ThemeColor: 'secondary',
    Pages: MixedContentContext,
}
