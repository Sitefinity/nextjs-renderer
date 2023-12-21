import { LinkModel } from '../../../editor';
import { ImageItem, ThumbnailItem } from '../../../rest-sdk';
import { ImageClickAction } from './ImageClickAction';
import { ImageDisplayMode } from './ImageDisplayMode';

export interface ImageViewModel {
    Item: ImageItem;
    ClickAction: ImageClickAction;
    SelectedImageUrl: string;
    Title: string;
    AlternativeText: string;
    ActionLink: string;
    ImageSize: ImageDisplayMode;
    FitToContainer: boolean;
    Thumbnails: ThumbnailItem[];
    Width?: number;
    Height?: number;
    Attributes: { [key: string]: Array<{ Key: string; Value: string }> };
}
