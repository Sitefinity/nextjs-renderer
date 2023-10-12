import React from "react";
import { generateAnchorAttrsFromLink, getCustomAttributes, htmlAttributes } from "@/framework/widgets/attributes";
import { WidgetContext } from "@/framework/widgets/widget-context";
import { classNames } from "@/framework/utils/classNames";
import { LinkModel } from "@/framework/interfaces/LinkModel";
import { StyleGenerator } from "../styling/style-generator.service";
import { OffsetStyle } from "../styling/offset-style";
import { Alignment } from "../styling/alignment";
import { ButtonType } from "../styling/button-types";

export type CTAPart = "Wrapper" | "Primary" | "Secondary";

export async function Classification(props: WidgetContext<ClassificationEntity>) {
    const properties = props.model.Properties;
    const dataAttributes = htmlAttributes(props);

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

        </div>
    );
}

export class ClassificationEntity {
    PrimaryActionLabel?: string;
    PrimaryActionLink?: LinkModel;
    SecondaryActionLabel?: string;
    SecondaryActionLink?: LinkModel;
    Style?: {
        Primary: {
            DisplayStyle: ButtonType
        },
        Secondary: {
            DisplayStyle: ButtonType
        }
    };
    Attributes?: any[];
    Position?: {
        CTA: {
            Alignment: Alignment
        };
    };
    CssClass?: string;
    Margins?: OffsetStyle;
}
