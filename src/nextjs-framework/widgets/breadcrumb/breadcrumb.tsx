import React from 'react';
import { StyleGenerator } from '../styling/style-generator.service';
import { OffsetStyle } from '../styling/offset-style';
import { BreadcrumbRestService } from './breadcrumb.service';
import { getCustomAttributes, htmlAttributes } from '../..';
import { WidgetContext } from '../..';
import { classNames } from '../..';

const PAGE_MISSING_MESSAGE = 'Breadcrumb is visible when you are on a particular page.';

export async function Breadcrumb(props: WidgetContext<BreadcrumbEntity>) {
    const model = props.model;
    const properties = model.Properties;
    const dataAttributes = htmlAttributes(props);
    const restService = props.restService || BreadcrumbRestService;
    const items = await restService.getItems(model.Properties, model, props.requestContext);
    const defaultClass =  properties.WrapperCssClass;
    const marginClass = properties.Margins && StyleGenerator.getMarginClasses(properties.Margins);
    const breadcrumbCustomAttributes = getCustomAttributes(properties.Attributes, 'Breadcrumb');

    dataAttributes['className'] = classNames(
        defaultClass,
        marginClass
    );
    dataAttributes['data-sfhasquickeditoperation'] = true;

    if (!props.requestContext.pageNode && props.requestContext.isEdit) {
        return  (<div {...dataAttributes}>
          {PAGE_MISSING_MESSAGE}
        </div>);
    }

    return (
      <div
        {...dataAttributes}
        {...breadcrumbCustomAttributes}
            >

        <nav aria-label="Full path to the current page">
          <ol className="breadcrumb">
            {
                        items.value.map((node: any, idx: number) => {
                            if (idx === items.value.length - 1) {
                                return  <li key={idx} className="breadcrumb-item active" aria-current="page">{node.Title}</li>;
                            }
                            return <li key={idx} className="breadcrumb-item"><a href={node.ViewUrl}>{node.Title}</a></li>;
                        })
                    }
          </ol>
        </nav>
      </div>
    );
}

export enum BreadcrumbIncludeOption {
    CurrentPageFullPath,
    SpecificPagePath,
}

export class BreadcrumbEntity {
    WrapperCssClass?: string;
    Margins?: OffsetStyle;
    BreadcrumbIncludeOption?: BreadcrumbIncludeOption;
    SelectedPage?: any; // MixedContentContext
    AddHomePageLinkAtBeginning?: boolean;
    AddCurrentPageLinkAtTheEnd?: boolean;
    IncludeGroupPages?: boolean;
    AllowVirtualNodes?: boolean;
    SfViewName?: string;
    Attributes?: any[];
}
