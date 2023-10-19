'use client'

import React, { useEffect } from "react";

import { Button, ButtonProps } from "@progress/kendo-react-buttons";
import { RestService } from "sitefinity-react-framework/sdk/rest-service";
import { htmlAttributes } from "sitefinity-react-framework/widgets/attributes";
import { MixedContentContext } from "sitefinity-react-framework/widgets/entities/mixed-content-context";
import { WidgetContext } from "sitefinity-react-framework/widgets/widget-context";

export function ButtonComponent(props: WidgetContext<ButtonEntity>) {
    const [imgUrl, setImagUrl] = React.useState('');
    const dataAttributes = htmlAttributes(props);
    const onClick = async () => {
        if (props.model.Properties.Pages) {
            const page =  await RestService.getItem("Telerik.Sitefinity.Pages.Model.PageNode", props.model.Properties.Pages.ItemIdsOrdered[0], '');
            window.location.href = page.ViewUrl;
        } else if (props.requestContext.isPreview) {
            alert('No page configured');
        }
    };
    const buttonProperties: ButtonProps = {
        className: 'dx-button',
        themeColor: props.model.Properties.ThemeColor,
        onClick: onClick,
        imageUrl: imgUrl
    };

    useEffect(() => {
        if (props.model.Properties.Image) {
            RestService.getItem("Telerik.Sitefinity.Libraries.Model.Image", props.model.Properties.Image.ItemIdsOrdered[0], '').then((image) => {
                setImagUrl(image.Url);
            });
        }
      }, [props.model.Properties.Image])

    return (
        <div {...dataAttributes} >
            <Button {...buttonProperties}>{props.model.Properties.Text}</Button>
        </div>
    );
}


interface ButtonEntity {
    Text: string,
    Icon: string,
    ThemeColor: 'secondary',
    Pages: MixedContentContext,
    Image: {
        Css: string;
        Title: string;
        AlternativeText: string;
        Url: string,
        ItemIdsOrdered: string[];
    }
}
