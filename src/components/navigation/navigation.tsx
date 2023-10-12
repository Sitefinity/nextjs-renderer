import React from "react";
import { generateAnchorAttrsFromLink, getCustomAttributes, htmlAttributes } from "@/framework/widgets/attributes";
import { WidgetContext } from "@/framework/widgets/widget-context";
import { classNames } from "@/framework/utils/classNames";
import { LinkModel } from "@/framework/interfaces/LinkModel";
import { StyleGenerator } from "../styling/style-generator.service";
import { OffsetStyle } from "../styling/offset-style";
import { Alignment } from "../styling/alignment";
import { ButtonType } from "../styling/button-types";
import { NavigationRestService } from "./navigation.service";
import { Horizontal } from "./horizontal.tsx";
import { Accordion } from "./accordion.tsx";
import { Vertical } from "./vertical.tsx";
import { VerticalSitemap } from "./vertical-sitemap.tsx";
import { Tabs } from "./tabs.tsx";

export type NavgationViewName = "Horizontal" | "Tabs" | "Accordion" | "Vertical" | "VerticalSitemap";

export async function Navigation(props: WidgetContext<NavigationEntity>) {
    const properties = props.model.Properties;
    const dataAttributes = htmlAttributes(props);
    const viewName = props.model.Properties.SfViewName;
    const items = await NavigationRestService.getItems(props.model.Properties, props.model);
    const marginClass = properties.Margins && StyleGenerator.getMarginClasses(properties.Margins);
    const primaryCustomAttributes = getCustomAttributes(properties.Attributes, 'Navigation');

    dataAttributes["className"] = classNames(
        marginClass
    );
    dataAttributes["data-sfemptyicontext"] = "No pages have been published";
    dataAttributes["data-sfhasquickeditoperation"] = true;
    dataAttributes["data-sfemptyiconaction"] = 'None';
    dataAttributes["data-sfemptyicon"] = 'file-text-o';

    return (
        <div
            {...dataAttributes}
            {...primaryCustomAttributes}
        >
            { !viewName && <Accordion items={items.value || []} />}
            { viewName === 'Horizontal' && <Horizontal items={items.value || []} />}
            { viewName === 'Tabs' && <Tabs items={items.value || []} />}
            { viewName === 'Vertical' && <Vertical items={items.value || []} />}
            { viewName === 'VerticalSitemap' && <VerticalSitemap items={items.value || []} />}
        </div>
    );
}

export class NavigationEntity {
    SelectionMode?: any;
    SelectedPage?: any;
    CustomSelectedPages?: any;
    SfViewName?: string;
    LevelsToInclude?: number;
    ShowParentPage?: boolean;
    Attributes?: any[];
    WrapperCssClass?: string;
    Margins?: OffsetStyle;
}
