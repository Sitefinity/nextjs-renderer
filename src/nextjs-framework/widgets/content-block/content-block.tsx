
import React from 'react';
import { WidgetContext, getCustomAttributes, htmlAttributes } from '../../editor';
import { RestService } from '../../rest-sdk';
import { StyleGenerator } from '../styling/style-generator.service';
import { ContentBlockEntity } from './content-block.entity';

export async function ContentBlock(props: WidgetContext<ContentBlockEntity>) {

    let dataAttributes = htmlAttributes(props);

    let content = props.model.Properties.Content;
    if (props.model.Properties && props.model.Properties.SharedContentID) {
        const contentItem = await RestService.getSharedContent(props.model.Properties.SharedContentID, props.requestContext.culture);
        content = contentItem.Content;
    }

    const tagName = props.model.Properties.TagName || 'div';
    dataAttributes.dangerouslySetInnerHTML = {
        __html: content || ''
    };

    let cssClasses = [];
    if (props.model.Properties.WrapperCssClass) {
        cssClasses.push(props.model.Properties.WrapperCssClass);
    }

    if (props.model.Properties.Paddings) {
        cssClasses.push(StyleGenerator.getPaddingClasses(props.model.Properties.Paddings));
    }

    if (props.model.Properties.Margins) {
        cssClasses.push(StyleGenerator.getMarginClasses(props.model.Properties.Margins));
    }

    if (cssClasses.length > 0) {
        dataAttributes['className'] = cssClasses.join(' ');
    }

    const customAttributes = getCustomAttributes(props.model.Properties.Attributes, 'SitefinityContentBlock');
    dataAttributes = Object.assign(dataAttributes, customAttributes);

    return React.createElement(tagName, dataAttributes);
}
