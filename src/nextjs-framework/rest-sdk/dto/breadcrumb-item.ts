export interface BreadcrumbItem {
    Id: string;
    ParentId: string;
    Title: string;
    HasChildren: string;
    AvailableLanguages: string[];
    Breadcrumb: string[];
    IsHomePage: boolean;
    Children: BreadcrumbItem[];
    ViewUrl: string;
    PageType: 'Standard' | 'Group' | 'Redirect'
}
