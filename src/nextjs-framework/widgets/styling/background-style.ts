import { SdkItem } from '../..';
import { ImagePosition } from './image-position';

export interface BackgroundStyle {
    BackgroundType: 'None' | 'Color' | 'Image' | 'Video';
    Color: string,
    ImageItem: SdkItem;
    VideoItem: SdkItem;
    Position: ImagePosition;
}
