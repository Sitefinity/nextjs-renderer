import { DetailItem } from '../../../editor/detail-item';

export interface GetBreadcrumbArgs {
    addStartingPageAtEnd?: boolean;
    addHomePageAtBeginning?: boolean;
    includeGroupPages?: boolean;
    currentPageId: string;
    detailItemInfo?: DetailItem;
    startingPageId?: string;
    currentPageUrl: string;
}
