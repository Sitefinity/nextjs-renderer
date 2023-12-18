import React from 'react';
import { StyleGenerator } from '../styling/style-generator.service';
import { OffsetStyle } from '../styling/offset-style';
import { BreadcrumbRestService } from './breadcrumb.service';
import { MixedContentContext, WidgetContext, classNames, getCustomAttributes, htmlAttributes } from '../../editor';
import { defaultMixedContent } from '../common/defaults';

const PAGE_MISSING_MESSAGE = 'Breadcrumb is visible when you are on a particular page.';

export async function Breadcrumb(props: WidgetContext<BreadcrumbEntity>) {
    const model = props.model;
    const dataAttributes = htmlAttributes(props);
    const entities = {
        AddHomePageLinkAtBeginning: true,
        AddCurrentPageLinkAtTheEnd: true,
        SelectedPage: defaultMixedContent,
        ...model.Properties
    };
    const restService = props.restService || BreadcrumbRestService;
    const items = await restService.getItems(entities, props.requestContext);
    const defaultClass =  entities.WrapperCssClass;
    const marginClass = entities.Margins && StyleGenerator.getMarginClasses(entities.Margins);
    const breadcrumbCustomAttributes = getCustomAttributes(entities.Attributes, 'Breadcrumb');

    dataAttributes['className'] = classNames(
        defaultClass,
        marginClass
    );
    dataAttributes['data-sfhasquickeditoperation'] = true;

    if (props.requestContext.isEdit) {
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
                        items.value.map((node: { Title: string, ViewUrl: string }, idx: number) => {
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
    SelectedPage?: MixedContentContext;
    AddHomePageLinkAtBeginning?: boolean;
    AddCurrentPageLinkAtTheEnd?: boolean;
    IncludeGroupPages?: boolean;
    AllowVirtualNodes?: boolean;
    SfViewName?: string;
    Attributes?: { [key: string]: Array<{ Key: string, Value: string}> };
}
