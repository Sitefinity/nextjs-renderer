import { DetailItem } from '..';

export interface RequestContext {
    pageNode?: any;
    searchParams?: { [key: string]: string; };
    detailItem: DetailItem | null;
    culture: string;
    isEdit: boolean;
    isPreview: boolean;
    isLive: boolean;
    cookie?: string;
}
