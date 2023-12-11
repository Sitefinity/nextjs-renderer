import { PageLayoutServiceResponse, SdkItem } from '../rest-sdk';
import { DetailItem } from './detail-item';

export interface RequestContext {
    layout?: PageLayoutServiceResponse;
    searchParams?: { [key: string]: string; };
    detailItem: DetailItem | null;
    culture: string;
    isEdit: boolean;
    isPreview: boolean;
    isLive: boolean;
}
