import React from 'react';
import { StyleGenerator } from '../styling/style-generator.service';
import { WidgetContext, htmlAttributes, generateAnchorAttrsFromLink, getCustomAttributes, combineClassNames } from '../../editor';
import { CallToActionEntity } from './call-to-action.entity';

export type CTAPart = 'Wrapper' | 'Primary' | 'Secondary';

export async function CallToAction(props: WidgetContext<CallToActionEntity>) {
    const properties = {
        ...props.model.Properties
    };
    const dataAttributes = htmlAttributes(props);

    const primaryAnchorAttributes = generateAnchorAttrsFromLink(properties.PrimaryActionLink);
    const secondaryAnchorAttributes = generateAnchorAttrsFromLink(properties.SecondaryActionLink);
    const wrapperCustomAttributes = getCustomAttributes(properties.Attributes, 'Wrapper');
    const primaryCustomAttributes = getCustomAttributes(properties.Attributes, 'Primary');
    const secondaryCustomAttributes = getCustomAttributes(properties.Attributes, 'Secondary');
    const primaryClass = properties.Style && properties.Style.Primary ? properties.Style.Primary.DisplayStyle : 'Primary';
    const secondaryClass = properties.Style && properties.Style.Secondary ? properties.Style.Secondary.DisplayStyle : 'Secondary';
    const primaryButtonClass = StyleGenerator.getButtonClasses(primaryClass);
    const secondaryButtonClass = StyleGenerator.getButtonClasses(secondaryClass);

    const defaultClass = combineClassNames('d-flex align-items-center', properties.CssClass);
    const positionClass = StyleGenerator.getAlignmentClasses(properties.Position ? properties.Position.CTA.Alignment : 'Left');
    const marginClass = properties.Margins && StyleGenerator.getMarginClasses(properties.Margins);
    dataAttributes['className'] = combineClassNames(defaultClass, positionClass, marginClass);

    return (
      <div
        {...dataAttributes}
        {...wrapperCustomAttributes}
        >
        {
                props.model.Properties.PrimaryActionLabel && <a {...primaryAnchorAttributes}
                  className={combineClassNames('me-3', primaryButtonClass)}
                  data-call-to-action=""
                  {...primaryCustomAttributes}>
                    {props.model.Properties.PrimaryActionLabel}
                </a>
        }
        {
                props.model.Properties.SecondaryActionLabel && <a {...secondaryAnchorAttributes}
                  className={secondaryButtonClass}
                  data-call-to-action=""
                  {...secondaryCustomAttributes}>
                    {props.model.Properties.SecondaryActionLabel}
                </a>
        }
      </div>
    );
}

