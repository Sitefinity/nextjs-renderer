import { ImageClickAction } from './ImageClickAction';
import { ImageDisplayMode } from './ImageDisplayMode';
import { LinkModel } from 'sitefinity-react-framework/interfaces/LinkModel';

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
