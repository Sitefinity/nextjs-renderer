'use client';

import React, { Fragment } from 'react';
import {
    AppBar,
    AppBarSection,
    AppBarSpacer,
    AppBarThemeColor
  } from '@progress/kendo-react-layout';
import { getUniqueId } from 'sitefinity-react-framework/utils/getUniqueId';


export function AppBarClient(props: AppBarClientModel) {
    const id = getUniqueId('appBarClient');

    return (
      <AppBar themeColor={props.themeColor} className={props.wrapperCssClass}>
        {props.children.map((child, index) => {
            const currentName = `Column${index + 1}`;
            const columnClasses = props.columnsCssClasses[currentName] ? props.columnsCssClasses[currentName].Class : null;

                return (
                  <Fragment key={index}>
                    <div data-sfcontainer={currentName}>
                      <AppBarSection className={columnClasses}>
                        {child.section}
                      </AppBarSection>
                    </div>
                    {child.spacerWidth &&
                    <AppBarSpacer />
                    }
                  </Fragment>
                );
            })}
      </AppBar>
    );
}

export interface AppBarClientModel {
    children: AppBarClientChild[];
    themeColor: AppBarThemeColor;
    wrapperCssClass: string;
    columnsCssClasses: any;
}

export interface AppBarClientChild {
    section: any;
    spacerWidth?: number;
}
