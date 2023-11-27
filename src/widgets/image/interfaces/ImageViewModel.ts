import { LinkModel } from '@progress/sitefinity-react-framework';
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
        Thumbnails: any[];
        ViewName?: string;
        Width: number;
        Height: number;
        Attributes?: any[];
    }
