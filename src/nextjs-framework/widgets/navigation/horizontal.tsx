import React from 'react';
import { PageViewModel } from './interfaces/PageViewModel';
import { getClass } from './utils';
import { classNames } from '../..';
import { getUniqueId } from '../..';

export function Horizontal(props: {
    items: any;
    className?: string;
 }) {
    let navbarId = getUniqueId('navbar');
    const {items, ...customAttrs } = props;

    const renderSubLevelsRecursive: any = (node: PageViewModel) => {
        { node.ChildNodes.length > 0 &&
            node.ChildNodes.map((childNode, idx: number) => {
                    if (childNode.ChildNodes.length) {
                        return  (<li key={idx} className="dropdown-submenu">
                          <a className={classNames('dropdown-item', getClass(childNode))} href={childNode.Url} target={childNode.LinkTarget}>
                            {childNode.Title}
                            <svg xmlns="https://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-right-fill" viewBox="0 0 16 16">
                              <path d="M12.14 8.753l-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                            </svg>
                          </a>
                          <ul className="dropdown-menu">
                            {renderSubLevelsRecursive(childNode)}
                          </ul>
                        </li>);
                    }

                    return  (<li key={idx}>
                      <a className={classNames('dropdown-item', getClass(childNode))} href={childNode.Url} target={childNode.LinkTarget}>
                        {childNode.Title}
                      </a>
                    </li>);
                }
            );
        }
    };

    return (
      <nav className="navbar navbar-expand-md navbar-light bg-light"
        {...customAttrs}
             >
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Navbar</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target={`#${navbarId}`} aria-controls="@navbarId"
            aria-expanded="false" aria-label="Toggle Navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="@navbarId">
            <ul className="navbar-nav me-auto mb-2 mb-md-0 flex-wrap">
              {
                                items.map((node: PageViewModel, idx: number) => {
                                    const navbarDropdownId = getUniqueId(`navbarDropdownMenuLink-${node.Key}`);
                                    if (node.ChildNodes.length > 0) {
                                        { return (<li key={idx} className={classNames('nav-item', 'dropdown', getClass(node))}>
                                          <a className="nav-link dropdown-toggle" href="#" id={navbarDropdownId}
                                            data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{node.Title}</a>
                                          <ul className="dropdown-menu" aria-labelledby={navbarDropdownId}>
                                            {renderSubLevelsRecursive(node)}
                                          </ul>
                                        </li>);
                                        }
                                    }
                                    return (<li key={idx} className="nav-item">
                                      <a className={classNames('nav-link', getClass(node))} href={node.Url}
                                        target={node.LinkTarget}>{node.Title}</a>
                                    </li>);
                                })
                            }
            </ul>
          </div>
        </div>
      </nav>
    );
}
