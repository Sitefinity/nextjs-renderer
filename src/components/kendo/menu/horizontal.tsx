'use client';

import React from 'react';
import { Menu, MenuItem } from '@progress/kendo-react-layout';
import { PageViewModel } from '@/components/navigation/interfaces/PageViewModel';

export function KendoHorizontal(props: {
    items: any;
    className?: string;
 }) {
    const {items, ...customAttrs } = props;

    return (
      <Menu>
        {items.map((item: any, idx: number) => {
          return (<MenuItem key={idx} text={item.Title} url={item.Url} >
            {renderSubLevelsRecursive(item)}
          </MenuItem>);
        })}
      </Menu>
    );
}

const renderSubLevelsRecursive: any = (node: PageViewModel) => {
        { node.ChildNodes.length > 0 &&
            node.ChildNodes.map((childNode, idx: number) => {
                    if (childNode.ChildNodes.length) {
                        return  (
                          <MenuItem key={idx} text={childNode.Title} url={childNode.Url} >
                            {renderSubLevelsRecursive(childNode)}
                          </MenuItem>);
                    }

                    return  (
                      <MenuItem key={idx} text={childNode.Title} url={childNode.Url} />
                    );
                }
            );
        }
    };
