import React from "react";
import { classNames } from '../../framework/utils/classNames'
import { getUniqueId } from '../../framework/utils/getUniqueId'
import { PageViewModel } from './interfaces/PageViewModel'

const getClass = (node: PageViewModel) => {
    if (node.IsCurrentlyOpened)
    {
        return "active";
    }

    return null;
}

const getAccordionButtonStateClass = (node: PageViewModel) =>{
    if (!node.IsCurrentlyOpened && !node.HasChildOpen)
    {
        return "collapsed";
    }

    return null;
}

const getAccordionContentStateClass = (node: PageViewModel) => {
    if (node.IsCurrentlyOpened || node.HasChildOpen)
    {
        return "show";
    }

    return null;
}

const isActive = (node: PageViewModel) => {
    if (node.IsCurrentlyOpened || node.HasChildOpen)
    {
        return "true";
    }

    return "false";
}



export function Accordion(props: {
    items: any;
    className?: string;
 }) {
    var accordionId = getUniqueId('accordion');
    const items = props.items;

    const renderSubLevelsRecursive = (node: PageViewModel, nested: boolean = false) => {
        { node.ChildNodes.Count > 0 &&
            <ul class={classNames('nav', 'flex-column', {"ms-3" : nested})}>
               {
                    node.ChildNodes.map((childNode, idx: number) =>
                        {
                            return <li key={idx} className="nav-item">
                                    <a className={classNames('nav-link', 'd-inline-block', getClass(childNode))}
                                href={childNode.Url} target={childNode.LinkTarget}>{childNode.Title}</a>
                                {renderSubLevelsRecursive(childNode, true)}
                            </li>
                        }
                    )
                }
            </ul>
        }
    }

    return (
        <nav className="accordion"
            id={accordionId}
            //  @Html.BuildAttributes(Model.Attributes)
        >
            {
                items.map((node: PageViewModel, idx: number) => {
                    const headingId = getUniqueId(`heading-${node.Key}`);
                    const collapseId =  getUniqueId(`collapse-${node.Key}`);
                    return <div key={node.Key} className="accordion-item">
                        {node.ChildNodes.length === 0 && <h2 className="accordion-header">
                            <span className={classNames('accordion-button', 'empty', getAccordionButtonStateClass(node))}>
                                <a
                                title={node.Title}
                                className="nav-link d-inline-block p-0 text-truncate"
                                href={node.Url} target={node.LinkTarget}>
                                    {node.Title}
                                </a>
                            </span>
                        </h2>
                        }
                        {node.ChildNodes.length > 0 && [
                            <h2 key={node.Key} className="accordion-header sc-accordion-header" id={headingId}>
                                <button aria-label={`Expander for parent page ${node.Title}`}
                                    className={classNames('accordion-button', getAccordionButtonStateClass(node))}
                                    type="button" data-bs-toggle="collapse"
                                    data-bs-target={`#${collapseId}`} aria-expanded={isActive(node)} aria-controls={collapseId}>

                                    { node.PageSiteMapNode.PageType === 'Group' &&
                                        <span title="@node.Title" className="nav-link sc-accordion-link sf-group p-0 text-truncate">{node.Title}</span>
                                    }
                                </button>
                                { node.PageSiteMapNode.PageType !== 'Group' &&
                                    <a title={node.Title} className="nav-link sc-accordion-link p-0 text-truncate"
                                    href={node.Url} target={node.LinkTarget}>
                                        {node.Title}
                                        </a>
                                }
                            </h2>,
                            <div key={node.Key + idx} id={collapseId} className={classNames('accordion-collapse', 'collapse', getAccordionContentStateClass(node))}
                                aria-labelledby={headingId} data-bs-parent={`#${accordionId}`}>
                                <div className="accordion-body">
                                    {renderSubLevelsRecursive(node)}
                                </div>
                            </div>]
                        }
                    </div>;
                })

            }
        </nav>
    )
}
