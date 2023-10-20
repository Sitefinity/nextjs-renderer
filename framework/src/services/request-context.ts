import { DetailItem } from '../sdk/services/detail-item';

export interface RequestContext {
    pageNode?: any;
    searchParams?: { [key: string]: string; };
    detailItem: DetailItem | null;
    culture: string;
    isEdit: boolean;
    isPreview: boolean;
}
