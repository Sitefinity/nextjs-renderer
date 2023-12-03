import { SdkItem } from './sdk-item';
import { ThumbnailItem } from './thumbnail-item';

export interface ImageItem extends SdkItem {
    Url: string;
    Title: string;
    AlternativeText: string;
    Width: number;
    Height: number;
    Thumbnails: ThumbnailItem[]
}
