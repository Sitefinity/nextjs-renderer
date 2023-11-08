import React, { Fragment } from 'react';
import { htmlAttributes } from 'sitefinity-react-framework/widgets/attributes';
import { AppBarClient, AppBarClientChild } from './app-bar.client';
import { AppBarThemeColor } from '@progress/kendo-react-layout';
import { WidgetContext } from 'sitefinity-react-framework/widgets/widget-context';
import { widgetRegistry } from '@/widget-registry';
import { RenderWidgetService } from 'sitefinity-react-framework/services/render-widget-service';

// TODO:
// - when initially adding widget it is rendered outside appsection after refresh its ok
export function AppBar(props: WidgetContext<AppBarModel>) {
    const themeColor: AppBarThemeColor = props.model.Properties.ThemeColor || 'light';
    const columnsCssClasses: any[] = props.model.Properties.CustomCssClass || [];
    const wrapperCssClass: string = (columnsCssClasses as any)['Wrapper']?.Class;
    const dataAttributes = htmlAttributes(props);
    // TODO: Fix empty widget as this needs to be updated in the sitefinity-react-framework project
    dataAttributes['data-sfiscontentwidget'] = false;
    const children: AppBarClientChild[] = getAppBarChildren(props);

    return (
      <div {...dataAttributes} >
        <AppBarClient children={children} themeColor={themeColor} wrapperCssClass={wrapperCssClass} columnsCssClasses={columnsCssClasses} />
      </div>
    );
}

function getAppBarChildren(context: WidgetContext<AppBarModel>): AppBarClientChild[] {
    const columnsCount: number = context.model.Properties.Columns || 1;
    const children: AppBarClientChild[] = [];

    for (let i = 0; i < columnsCount; i++) {
        let currentName = `Column${i + 1}`;

        const child = context.model.Children.filter(x => x.PlaceHolder === currentName).map((x => {
            let ret: WidgetContext<any> = {
                model: x,
                metadata: widgetRegistry.widgets[x.Name],
                requestContext: context.requestContext
            };

            return ret;
        }));

        children.push({
            section: (<Fragment>
              {child.length > 0 && child.map(y => {
                                return RenderWidgetService.createComponent(y.model, context.requestContext);
                            })}
            </Fragment>)
        });
    }

    return children;
}

interface AppBarModel {
    Columns: number;
    ThemeColor: AppBarThemeColor;
    WrapperCssClass: string;
    CustomCssClass: any;
}
