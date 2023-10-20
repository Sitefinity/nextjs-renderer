import React from 'react';
import { classNames } from 'sitefinity-react-framework/utils/classNames';
import { PageViewModel } from './interfaces/PageViewModel';
import { getClass } from './utils';

export function VerticalSitemap(props: {
    items: any;
    className?: string;
 }) {
    const {items, ...customAttrs } = props;
    const renderSubLevelsRecursive: any = (node: PageViewModel) => {

        return (<li className="nav-item">
          <a className={classNames('nav-link qu-nav-sitemap__link -wrapper',  getClass(node))} href={node.Url} target={node.LinkTarget}>{node.Title}</a>

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
        className={'qu-nav-sitemap'}
        {...customAttrs}
        >

        <ul className="nav">
          {
                items.map((node:PageViewModel, idx: number)=> {
                    return renderSubLevelsRecursive(node);
                })
            }
        </ul>
      </nav>
    );
}
