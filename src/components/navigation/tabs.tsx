import React from "react";
import { classNames } from '../../framework/utils/classNames'
import { getUniqueId } from '../../framework/utils/getUniqueId'
import { PageViewModel } from './interfaces/PageViewModel'
import { getClass } from './utils';

export function Tabs(props: {
    items: any;
    className?: string;
 }) {
    const items = props.items;
    const renderSubLevelsRecursive = (nodes: PageViewModel[]) => {

        var selectedNode = nodes.some(node => node.IsCurrentlyOpened || node.HasChildOpen);

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
       // @Html.BuildAttributes(Model.Attributes)
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
