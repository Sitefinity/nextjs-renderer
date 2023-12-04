
import { LinkModel } from '../../../editor';
import { ThumbnailItem } from '../../../rest-sdk';
import { ImageClickAction } from './ImageClickAction';
import { ImageDisplayMode } from './ImageDisplayMode';

export interface ImageViewModel
    {
        ClickAction?: ImageClickAction;
        SelectedImageUrl: string;
        Title?: string;
        AlternativeText?: string;
        ActionLink?: LinkModel;
        ImageSize?: ImageDisplayMode;
        FitToContainer: boolean;
        Thumbnails: ThumbnailItem[];
        ViewName?: string;
        Width: number;
        Height: number;
        Attributes?: { [key: string]: Array<{ Key: string, Value: string}> };
    }
