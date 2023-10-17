import React from "react";
import { StyleGenerator } from "../styling/style-generator.service";
import { OffsetStyle } from "../styling/offset-style";
import { Alignment } from "../styling/alignment";
import { ButtonType } from "../styling/button-types";
import { generateAnchorAttrsFromLink, getCustomAttributes, htmlAttributes } from "sitefinity-react-framework/widgets/attributes";
import { classNames } from "sitefinity-react-framework/utils/classNames";
import { WidgetContext } from "sitefinity-react-framework/widgets/widget-context";
import { LinkModel } from "sitefinity-react-framework/interfaces/LinkModel";

export type CTAPart = "Wrapper" | "Primary" | "Secondary";

export async function CallToAction(props: WidgetContext<CallToActionEntity>) {
    const properties = props.model.Properties;
    const dataAttributes = htmlAttributes(props);

    const defaultClass =  `d-flex align-items-center ${properties.CssClass}`.trim();
    const positionClass = StyleGenerator.getAlignmentClasses(properties.Position ? properties.Position.CTA.Alignment : 'Left');
    const marginClass = properties.Margins && StyleGenerator.getMarginClasses(properties.Margins);
    const primaryAnchorAttributes = generateAnchorAttrsFromLink(properties.PrimaryActionLink);
    const secondaryAnchorAttributes =generateAnchorAttrsFromLink(properties.PrimaryActionLink);
    const wrapperCustomAttributes = getCustomAttributes(properties.Attributes, 'Wrapper');
    const primaryCustomAttributes = getCustomAttributes(properties.Attributes, 'Primary');
    const secondaryCustomAttributes = getCustomAttributes(properties.Attributes, 'Secondary');
    const primaryClass = properties.Style ? properties.Style.Primary.DisplayStyle : 'Primary';
    const secondaryClass = properties.Style ? properties.Style.Secondary.DisplayStyle : 'Secondary';
    const primaryButtonClass = StyleGenerator.getButtonClasses(primaryClass)
    const secondaryButtonClass = StyleGenerator.getButtonClasses(secondaryClass)

    dataAttributes["className"] = classNames(
        defaultClass,
        positionClass,
        marginClass
        );
    dataAttributes["data-sfemptyicontext"] = "Create call to action";
    dataAttributes["data-sfhasquickeditoperation"] = true;
    return (
        <div
            {...dataAttributes}
            {...wrapperCustomAttributes}
        >
            {
             props.model.Properties.PrimaryActionLabel && <a {...primaryAnchorAttributes}
                className={classNames('me-3', primaryButtonClass)}
                data-call-to-action=''
                {...primaryCustomAttributes}>
               {props.model.Properties.PrimaryActionLabel}
                </a>
            }
            {
             props.model.Properties.SecondaryActionLabel && <a {...secondaryAnchorAttributes}
                className={secondaryButtonClass}
                data-call-to-action=''
                {...secondaryCustomAttributes}>
               {props.model.Properties.SecondaryActionLabel}
                </a>
            }
        </div>
    );
}

export class CallToActionEntity {
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
