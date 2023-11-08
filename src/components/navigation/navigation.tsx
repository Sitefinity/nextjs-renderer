import React from 'react';
import { getCustomAttributes, htmlAttributes } from 'sitefinity-react-framework/widgets/attributes';
import { WidgetContext } from 'sitefinity-react-framework/widgets/widget-context';
import { classNames } from 'sitefinity-react-framework/utils/classNames';
import { StyleGenerator } from '../styling/style-generator.service';
import { OffsetStyle } from '../styling/offset-style';
import { NavigationRestService } from './navigation.service';
import { Horizontal } from './horizontal';
import { Accordion } from './accordion';
import { Vertical } from './vertical';
import { VerticalSitemap } from './vertical-sitemap';
import { Tabs } from './tabs';
import { KendoMenu } from './kendo-menu';

export type NavgationViewName = 'Horizontal' | 'Tabs' | 'Accordion' | 'Vertical' | 'VerticalSitemap';

export async function Navigation(props: WidgetContext<NavigationEntity>) {
    const properties = props.model.Properties;
    const dataAttributes = htmlAttributes(props);
    const viewName = props.model.Properties.SfViewName;
    const items = await NavigationRestService.getItems(props.model.Properties, props.model, props.requestContext);
    const marginClass = properties.Margins && StyleGenerator.getMarginClasses(properties.Margins);
    const navCustomAttributes = getCustomAttributes(properties.Attributes, 'Navigation');

    dataAttributes['className'] = classNames(
        marginClass
    );
    dataAttributes['data-sfemptyicontext'] = 'No pages have been published';
    dataAttributes['data-sfhasquickeditoperation'] = true;
    dataAttributes['data-sfemptyiconaction'] = 'None';
    dataAttributes['data-sfemptyicon'] = 'tag';

    // TODO: Fix empty widget as this needs to be updated in the sitefinity-react-framework project
    if (viewName === 'KendoMenu') {
        dataAttributes['data-sfiscontentwidget'] = false;
    }

    return (
      <div
        {...dataAttributes}
        >
        { !viewName && <Accordion items={items.value || []} {...navCustomAttributes}/>}
        { viewName === 'Horizontal' && <Horizontal items={items.value || []} {...navCustomAttributes}/>}
        { viewName === 'Tabs' && <Tabs items={items.value || []} {...navCustomAttributes}/>}
        { viewName === 'Vertical' && <Vertical items={items.value || []}{...navCustomAttributes}/>}
        { viewName === 'VerticalSitemap' && <VerticalSitemap items={items.value || []}{...navCustomAttributes}/>}
        { viewName === 'KendoMenu' && <KendoMenu items={items.value || []}{...navCustomAttributes}/>}
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
