import { DetailItem } from "../sdk/services/detail-item";

export interface RequestContext {
    detailItem: DetailItem | null;
    culture: string;
    isEdit: boolean;
    isPreview: boolean;
}
