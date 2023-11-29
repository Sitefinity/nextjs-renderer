import React from 'react';
import { PageViewModel } from './interfaces/PageViewModel';
import { getClass } from './utils';
import { classNames } from '../../editor';

export function Vertical(props: {
    items: any;
    className?: string;
 }) {
    const {items, ...customAttrs } = props;
    const renderSubLevelsRecursive: any = (node: PageViewModel) => {

        return (<li className="nav-item">
          <a className={classNames('nav-link',  getClass(node))} href={node.Url} target={node.LinkTarget}>{node.Title}</a>

          { node.ChildNodes.length > 0 &&
          <ul className="nav flex-column ms-3">
            {node.ChildNodes.map((node:PageViewModel, idx: number)=> {
                            return renderSubLevelsRecursive(node);
                            })
                        }
          </ul>}
        </li>);
    };
    return (
      <nav
        {...customAttrs}
        >

        <ul className="nav flex-column">
          {
                items.map((node:PageViewModel, idx: number)=> {
                    return renderSubLevelsRecursive(node);
                })
            }
        </ul>
      </nav>
    );
}
