import { PageSiteMapNode } from "./PageSiteMapNode";

export interface PageViewModel {
    Key: string;
    Title:string;
    Url: string;
    LinkTarget: string;
    IsCurrentlyOpened: boolean;
    HasChildOpen: boolean;
    PageSiteMapNode: PageSiteMapNode;
    ChildNodes: any[];
  }
