'use client'

import React from "react";
import { TextBox } from "@progress/kendo-react-inputs";
import { WidgetContext } from "sitefinity-react-framework/widgets/widget-context";
import { htmlAttributes } from "sitefinity-react-framework/widgets/attributes";

export function TextBoxComponent(props: WidgetContext<TextBoxEntity>) {
    const dataAttributes = htmlAttributes(props);
    return (
        <div {...dataAttributes} >
            <TextBox value={props.model.Properties.Value} placeholder={props.model.Properties.Placeholder}></TextBox>
        </div>
    );
}

interface TextBoxEntity {
    Value: string,
    Placeholder: string,
}
