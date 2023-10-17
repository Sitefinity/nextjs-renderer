export interface PageSiteMapNode {
    Id: string;
    ParentId: string;
    Title: string;
    HasChildren: boolean;
    AvailableLanguages: string[];
    Breadcrumb: any[];
    IsHomePage: boolean;
    ViewUrl: string;
    PageType: PageType;
    Children: any[];
  }
