import React from "react";
import { classNames } from 'sitefinity-react-framework/utils/classNames'
import { getUniqueId } from 'sitefinity-react-framework/utils/getUniqueId'
import { PageViewModel } from './interfaces/PageViewModel'
import { getClass } from './utils';

export function Tabs(props: {
    items: any;
    className?: string;
 }) {
    const {items, ...customAttrs } = props;
    const renderSubLevelsRecursive: any = (nodes: PageViewModel[]) => {
        const selectedNode = nodes.find(node => node.IsCurrentlyOpened || node.HasChildOpen);

        if (selectedNode)
        {
            <ul className="nav">
               {selectedNode.ChildNodes.map((node:PageViewModel, idx: number)=> {
                   return <li key={idx} className="nav-item">
                        <a className={classNames('nav-link', getClass(node))} href={node.Url} target={node.LinkTarget}>{node.Title}</a>
                    </li>
                })
              }
            </ul>
            {renderSubLevelsRecursive(selectedNode.ChildNodes)}
        }
    }
    return (
        <nav
        {...customAttrs}
        >
            <ul className="nav nav-tabs">
            {
                items.map((node: PageViewModel, idx: number) => {
                    return <li key={idx} className="nav-item">
                            <a className={classNames('nav-link', getClass(node))} href={node.Url} target={node.LinkTarget}>
                                {node.Title}
                            </a>
                        </li>
                })
            }
            </ul>
            {
                renderSubLevelsRecursive(items)
            }
    </nav>
    )
}
