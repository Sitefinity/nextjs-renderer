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
import { Tabs } from "./tabs.tsx";

export type NavgationViewName = "Horizontal" | "Tabs" | "Accordion" | "Vertical";

export async function Navigation(props: WidgetContext<NavigationEntity>) {
    const properties = props.model.Properties;
    const dataAttributes = htmlAttributes(props);
    const viewName = props.model.Properties.SfViewName;

    const items = await NavigationRestService.getItems(props.model.Properties, props.model);

    // const defaultClass =  `d-flex align-items-center ${properties.CssClass}`.trim();
    // const positionClass = StyleGenerator.getAlignmentClasses(properties.Position ? properties.Position.CTA.Alignment : 'Left');
    // const marginClass = properties.Margins && StyleGenerator.getMarginClasses(properties.Margins);
    // const primaryAnchorAttributes = generateAnchorAttrsFromLink(properties.PrimaryActionLink);
    // const secondaryAnchorAttributes =generateAnchorAttrsFromLink(properties.PrimaryActionLink);
    // const wrapperCustomAttributes = getCustomAttributes(properties.Attributes, 'Wrapper');
    // const primaryCustomAttributes = getCustomAttributes(properties.Attributes, 'Primary');
    // const secondaryCustomAttributes = getCustomAttributes(properties.Attributes, 'Secondary');
    // const primaryClass = properties.Style ? properties.Style.Primary.DisplayStyle : 'Primary';
    // const secondaryClass = properties.Style ? properties.Style.Secondary.DisplayStyle : 'Secondary';
    // const primaryButtonClass = StyleGenerator.getButtonClasses(primaryClass)
    // const secondaryButtonClass = StyleGenerator.getButtonClasses(secondaryClass)

    // dataAttributes["className"] = classNames(
    //     defaultClass,
    //     positionClass,
    //     marginClass
    //     );
    // dataAttributes["data-sfemptyicontext"] = "Create call to action";

    return (
        <div
            {...dataAttributes}
      //      {...wrapperCustomAttributes}
        >
            { !viewName && <Accordion items={items.value} />}
            { viewName === 'Horizontal' && <Horizontal items={items.value} />}
            { viewName === 'Tabs' && <Tabs items={items.value} />}
            { viewName === 'Vertical' && <Vertical items={items.value} />}
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
