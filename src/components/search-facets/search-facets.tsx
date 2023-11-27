import React from 'react';
import { getCustomAttributes, htmlAttributes } from 'sitefinity-react-framework/widgets/attributes';
import { WidgetContext } from 'sitefinity-react-framework/widgets/widget-context';
import { classNames } from 'sitefinity-react-framework/utils/classNames';
import { StyleGenerator } from '../styling/style-generator.service';
import { OffsetStyle } from '../styling/offset-style';
import { SearchFacetsService } from './search-facets.service';

export async function SearchFacets(props: WidgetContext<SearchFacetsEntity>) {
    const model = props.model;
    const dataAttributes = htmlAttributes(props);
    const entity = {

        ...model.Properties
    };

    const context = props.requestContext;
    const searchParams = context.searchParams || {};
    const restService = props.restService || SearchFacetsService;




    const defaultClass =  entity.CssClass;
    const marginClass = entity.Margins && StyleGenerator.getMarginClasses(entity.Margins);
    const searchFacetsCustomAttributes = getCustomAttributes(entity.Attributes, 'SearchFacets');

    dataAttributes['className'] = classNames(
        defaultClass,
        marginClass
    );
    dataAttributes['data-sfhasquickeditoperation'] = true;

    return (
      <div
        {...dataAttributes}
        {...searchFacetsCustomAttributes}
        />
    );
}


export class SearchFacetsEntity {
    CssClass?: string;
    Margins?: OffsetStyle;
    Attributes?: { [key: string]: Array<{ Key: string, Value: string}> };
}
